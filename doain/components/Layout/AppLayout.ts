import userDoainConfig from "~doain/config";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { defineComponent, h } from "vue";
import { RouterView, useRouter } from "vue-router";
import { ensureUniqueEnv } from "../../core/storage";

export const AppLayout = defineComponent({
  name: "AppLayout",
  setup() {
    const router = useRouter();

    ensureUniqueEnv(userDoainConfig.fetch.baseUrl, () => {
      router.push(userDoainConfig.router.loginRoute || userDoainConfig.router.homeRoute || "/");
    });
  },
  render() {
    return h(
      ElConfigProvider,
      {
        locale: zhCn,
      },
      {
        default: () => {
          return h(RouterView);
        },
      },
    );
  },
});
