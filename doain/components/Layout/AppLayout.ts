import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { defineComponent, h } from "vue";
import { RouterView } from "vue-router";

export const AppLayout = defineComponent({
  name: "AppLayout",
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
