import userDoainConfig from "~doain/config";

import { CharrueLayout } from "@charrue/layout-next";
import { Transition, computed, defineComponent, h, ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from "element-plus";
import { removeToken } from "../../core/storage/index";
import { useUserData, useUserStore } from "../../core/store/index";

const Fullscreen = h(
  "svg",
  { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: "width: 24px; height: 24px" },
  [
    h("title", null, "全屏"),
    h("path", {
      d: "M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z",
    }),
  ],
);
const FullscreenExit = h(
  "svg",
  { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: "width: 24px; height: 24px" },
  [
    h("title", null, "退出全屏"),
    h("path", {
      d: "M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z",
    }),
  ],
);

enum UserAction {
  Logout = "logout",
}

export const GlobalHeaderRight = defineComponent({
  name: "GlobalHeaderRight",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const userData = useUserData();

    const { isFullscreen, toggle: toggleFullscreen } = useFullscreen();
    const username = computed(() => userData.value.username);

    const onLogout = () => {
      removeToken();
      userStore.clearUserInfo();

      const loginRoute = userDoainConfig?.router?.loginRoute;
      if (loginRoute) {
        router.push(loginRoute);
      }
    };

    const onCommand = (command: UserAction) => {
      if (command === UserAction.Logout) {
        onLogout();
      }
    };

    return {
      username,
      isFullscreen,

      toggleFullscreen,
      onCommand,
    };
  },
  render() {
    const { isFullscreen, username, onCommand, toggleFullscreen } = this;
    return h("div", { class: "global-header-right-area" }, [
      h("div", { class: "header-action" }, [
        h(
          ElIcon,
          {
            onClick: toggleFullscreen,
            style: {
              width: "20px",
              height: "20px",
            },
          },
          {
            default() {
              return isFullscreen ? FullscreenExit : Fullscreen;
            },
          },
        ),
      ]),

      h(
        ElDropdown,
        {
          onCommand,
        },
        {
          default() {
            return h("div", null, [h("span", { class: "login-name" }, username)]);
          },
          dropdown() {
            return h(ElDropdownMenu, null, {
              default() {
                return [h(ElDropdownItem, { command: "logout" }, "退出登录")];
              },
            });
          },
        },
      ),
    ]);
  },
});

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
    const { fullPath, $slots } = this;
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
            ...$slots,
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
