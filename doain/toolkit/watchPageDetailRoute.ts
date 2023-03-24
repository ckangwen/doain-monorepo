import { watch } from "vue";
import { useRoute } from "vue-router";

export const watchPageDetailRoute = (
  cb: (queryId: string, query: Record<string, any>) => void,
  routePath?: string,
) => {
  const route = useRoute();
  watch(
    () => route.fullPath,
    () => {
      if (routePath && !route.path.startsWith(routePath)) return;

      const id = route.params?.id?.toString() || "";
      const { query } = route;

      if (!id) return;
      cb(id, query);
    },
    { immediate: true },
  );
};
