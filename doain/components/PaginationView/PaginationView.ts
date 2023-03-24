import userDoainConfig from "~doain/config";

import { CharrueSchemaForm, FormSchemaDef } from "@charrue/schema-form-next";
import { CharrueSchemaTable } from "@charrue/schema-table-next";
import { useVModel } from "@vueuse/core";
import { vLoading } from "element-plus";
import { ExtractPropTypes, PropType, computed, defineComponent, h, ref, withDirectives } from "vue";

import { DoainClientConfig } from "../../config/index";
import { useInternalPaginationView } from "./usePaginationView";
import { useTable } from "./useTable";

type DFormProps = NonNullable<
  NonNullable<NonNullable<DoainClientConfig["component"]>["paginationView"]>["formProps"]
>;
type DTableProps = NonNullable<
  NonNullable<NonNullable<DoainClientConfig["component"]>["paginationView"]>["tableProps"]
>;

const paginationViewProps = {
  url: {
    type: String,
    required: true,
    default: "",
  },
  columns: {
    type: Array as PropType<any[]>,
    required: true,
    default: () => [],
  },
  formData: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  schema: {
    type: Object as PropType<Record<string, FormSchemaDef>>,
    default: () => ({}),
  },
  queryData: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  paginationField: {
    type: String,
    default: "list",
  },
  formatRow: {
    type: Function,
  },
  showExtraColumn: {
    type: Boolean,
    default: true,
  },
  getHeaderScopeData: {
    type: Function,
  },
  extraColumnProps: {
    type: Object,
    default: () => ({}),
  },
  formatSearchData: {
    type: Function as PropType<(data: Record<string, any>) => Record<string, any>>,
  },
  formProps: {
    type: Object as PropType<DFormProps>,
    default() {
      return {};
    },
  },
  tableProps: {
    type: Object as PropType<DTableProps>,
    default() {
      return {};
    },
  },
};

export type PaginationViewProps = ExtractPropTypes<typeof paginationViewProps>;

export const PaginationView = defineComponent({
  name: "PaginationView",
  props: paginationViewProps,
  setup(props, { emit, expose }) {
    const schemaTableRef = ref();
    const schemaFormRef = ref();
    const innerValue = useVModel(props, "formData", emit);
    const shouldHideForm = computed(() => {
      return Object.keys(props.schema).length === 0;
    });
    const searchData = computed(() => {
      const defaultValue = {
        ...innerValue.value,
        ...props.queryData,
      };
      if (typeof props.formatSearchData === "function") {
        return props.formatSearchData(defaultValue);
      }
      return defaultValue;
    });

    const [sharedMethods] = useInternalPaginationView();

    const {
      loading,
      page,
      pageSize,
      total,
      tableData,
      headerScopeData,

      fetchData,
      onSizeChange,
      onPageChange,
    } = useTable(searchData);

    sharedMethods.value = {
      reload: fetchData,
      getTableData: () => {
        console.log(tableData, page);
        return tableData.value;
      },
      getSearchData: () => searchData.value,
      getSchemaFormRef: () => schemaFormRef,
      getSchemaTableRef: () => schemaTableRef,
    };

    fetchData();

    expose({
      fetchData,
      tableData,
      searchData,
      schemaFormRef,
      schemaTableRef,
    });

    return {
      innerValue,
      schemaTableRef,
      schemaFormRef,
      shouldHideForm,
      loading,
      tableData,
      total,
      page,
      pageSize,
      headerScopeData,

      onSizeChange,
      onPageChange,
    };
  },
  render() {
    const { header, ...rest } = this.$slots;
    return h(
      "div",
      {
        class: "pagination-view-root",
      },
      [
        this.shouldHideForm
          ? []
          : h(
              "div",
              {
                class: "pagination-view__form",
              },
              [
                h(CharrueSchemaForm, {
                  ref: "schemaFormRef",
                  ...(userDoainConfig.component?.paginationView?.formProps || {}),
                  ...(this.formProps || {}),
                  modelValue: this.innerValue,
                  schema: this.schema,
                  "onUpdate:modelValue": (value: Record<string, any>) => {
                    this.innerValue = value;
                  },
                }),
              ],
            ),

        h(
          "div",
          {
            class: "pagination-view__table",
          },
          [
            withDirectives(
              h(
                CharrueSchemaTable,
                {
                  ref: "schemaTableRef",
                  columns: this.columns,
                  data: this.tableData,
                  currentPage: this.page,
                  pageSize: this.pageSize,
                  total: this.total,
                  showExtraColumn: this.showExtraColumn,
                  tableProps: {
                    ...(userDoainConfig.component?.paginationView?.tableProps || {}),
                    ...(this.tableProps || {}),
                  },
                  extraColumnProps: this.extraColumnProps,
                  onSizeChange: this.onSizeChange,
                  onCurrentChange: this.onPageChange,
                  pagination: this.pagination
                    ? userDoainConfig.component?.paginationView?.paginationProps || {}
                    : false,
                },
                {
                  header: header
                    ? () => {
                        return header({ scope: this.headerScopeData });
                      }
                    : null,
                  ...rest,
                },
              ),
              [[vLoading, this.loading]],
            ),
          ],
        ),
      ],
    );
  },
});
