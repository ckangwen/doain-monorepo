import { defineComponent, h } from "vue";
import { RouterView } from "vue-router";

export const NoneLayout = defineComponent({
  name: "NoneLayout",
  render() {
    return h(
      "div",
      {
        class: "global-none-layout",
      },
      [h(RouterView)],
    );
  },
});
