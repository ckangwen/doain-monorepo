import { ElButton } from "element-plus";
import { defineComponent, h, PropType } from "vue";
import { RouterLink, useRoute, RouteLocationRaw } from "vue-router";
import { noop } from "@charrue/toolkit";
import { RequiredCrudConfig } from "./defineCrudPage";
import { PaginationView } from "../PaginationView/index";
import { createDeleteAction } from "../../toolkit/createDeleteAction";

export const CrudPage = defineComponent({
  name: "CrudPage",
  props: {
    config: {
      type: Object as PropType<RequiredCrudConfig>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();

    const onDelete = props.config.url.delete
      ? createDeleteAction({
          url: props.config.url.delete,
          formatDeleteParams(data) {
            return {
              id: data.id,
            };
          },
        })
      : noop;
    const getViewRoute = (row: any): RouteLocationRaw => {
      const { id, query } = props.config.actions.params.view(row);
      return {
        path: `${route.path}/${id}`,
        query,
      };
    };

    return {
      onDelete,
      getViewRoute,
    };
  },
  render() {
    const { config, onDelete, getViewRoute } = this;
    return h(
      "div",
      {
        class: "crud-page--default",
      },
      [
        h(
          PaginationView,
          {
            url: config.url.list,
            columns: config.columns,
            schema: config.querySchema,
            ...config.paginationViewProps,
          },
          {
            actions(scope: any) {
              return [
                config.actions.enable.view &&
                  h(
                    RouterLink,
                    {
                      to: getViewRoute(scope.row),
                    },
                    {
                      default() {
                        return h(
                          ElButton,
                          {
                            link: true,
                            type: "primary",
                          },
                          {
                            default() {
                              return [config.actions.text.view];
                            },
                          },
                        );
                      },
                    },
                  ),
                config.actions.enable.delete &&
                  h(
                    ElButton,
                    {
                      link: true,
                      type: "danger",
                      onClick() {
                        onDelete(scope.row);
                      },
                    },
                    {
                      default() {
                        return [config.actions.text.delete];
                      },
                    },
                  ),
              ];
            },
          },
        ),
      ],
    );
  },
});
