import { watchThrottled } from "@vueuse/core";
import { ComputedRef, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useProp } from "../../composables/index";
import { httpClient } from "../../core/index";
import { showSingleNotify } from "../../toolkit/showNotify";

interface QueryData {
  page?: number;
  limit?: number;
  [key: string]: any;
}

export const useTable = (queryData?: ComputedRef<Record<string, any>>) => {
  const shouldPagination = useProp("pagination", true);
  const url = useProp("url", "");
  const paginationField = useProp("paginationField", "list");
  const getHeaderScopeData = useProp<
    ((data: Record<string, any>) => Record<string, any>) | undefined
  >("getHeaderScopeData", undefined);

  const router = useRouter();
  const route = useRoute();
  const headerScopeData = shallowRef<Record<string, any>>({});
  const loading = shallowRef(false);
  const page = shallowRef(1);
  const pageSize = shallowRef(10);
  const total = shallowRef(0);
  const tableData = shallowRef<any[]>([]);

  const reset = () => {
    loading.value = false;
    page.value = 1;
    pageSize.value = 10;
    total.value = 0;
    tableData.value = [];
    headerScopeData.value = {};
  };

  // eslint-disable-next-line consistent-return
  const fetchData = async (overrideQueryData: QueryData = {}) => {
    if (loading.value) return Promise.resolve();
    loading.value = true;

    const paginationParams: QueryData = shouldPagination.value
      ? {
          page: Math.max(page.value, 1),
          limit: pageSize.value,
        }
      : {};

    const { success, message, data, error } = await httpClient.request({
      url: url.value,
      method: "POST",
      data: {
        ...paginationParams,
        ...(queryData ? queryData.value : {}),
        ...overrideQueryData,
      },
    });
    if (success) {
      if (typeof getHeaderScopeData.value === "function") {
        headerScopeData.value = getHeaderScopeData.value(data);
      }
      const list = paginationField.value ? data[paginationField.value] : data;
      tableData.value = Array.isArray(list) ? list : [];
      total.value = Number(data.total) || 0;
      loading.value = false;
    }
    if (success === false && !error) {
      reset();
      showSingleNotify(message, "warning");
    }
    if (error) {
      reset();
      showSingleNotify("网络错误", "error");
    }
  };

  watchThrottled(
    queryData || {},
    (val) => {
      fetchData(val || {});
    },
    {
      throttle: 200,
      deep: true,
    },
  );
  watch(
    () => route.query,
    () => {
      page.value = Number(route.query.page) || 1;
      pageSize.value = Number(route.query.size) || 10;
      fetchData();
    },
    {
      immediate: true,
      deep: true,
    },
  );

  const onSizeChange = (size: number) => {
    if (size) {
      pageSize.value = size;
      page.value = 1;
    }

    router.push({
      path: route.path,
      query: {
        ...route.query,
        size,
      },
    });
  };
  const onPageChange = (p: number) => {
    if (p) {
      page.value = p;
    }

    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: p,
      },
    });
  };

  return {
    loading,
    page,
    pageSize,
    total,
    tableData,
    headerScopeData,

    fetchData,
    onSizeChange,
    onPageChange,
  };
};
