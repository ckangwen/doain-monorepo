import userDoainConfig from "~doain/config";

import { CharrueLayout } from "@charrue/layout-next";
import { Transition, defineComponent, h, ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

export const DefaultLayout = defineComponent({
  name: "DefaultLayout",
  setup() {
    const collapse = ref(false);
    const router = useRouter();
    const route = useRoute();
    const fullPath = computed(() => {
      return route.fullPath;
    });

    const keepAliveRoutes = router
      .getRoutes()
      .filter((r) => r.meta?.keepAlive)
      ?.map((item: any) => {
        return item?.components?.default?.name;
      })
      ?.filter((name) => name);

    console.log(keepAliveRoutes);
    return {
      collapse,
      fullPath,
      keepAliveRoutes,
    };
  },

  render() {
    const { fullPath } = this;
    return h(
      "div",
      {
        class: "global-layout-container",
      },
      [
        h(
          CharrueLayout,
          {
            ...(userDoainConfig.layout || {}),
            modelValue: this.collapse,
            "onUpdate:modelValue": (val: boolean) => {
              this.collapse = val;
            },
          },
          {
            // "header-right": () => {},
            default() {
              return h(RouterView, null, {
                default({ Component }: any) {
                  return h(
                    Transition,
                    {
                      name: userDoainConfig.layout.transitionName,
                      mode: "out-in",
                    },
                    {
                      default() {
                        return [
                          h(Component, {
                            key: fullPath,
                          }),
                        ];
                      },
                    },
                  );
                },
              });
            },
          },
        ),
      ],
    );
  },
});
