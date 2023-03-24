import userDoainConfig from "~doain/config";

import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";

export const PageNotFound = defineComponent({
  name: "PageNotFound",
  render() {
    return h(
      "div",
      {
        class: "page-not-found-container",
      },
      [
        h("div", { class: "pnf-container" }, [
          h("div", { class: "pnf-block" }, [
            h("img", {
              src: "https://s2.loli.net/2023/01/11/7ujk4K2gv8JcyCS.png",
              class: "pnf-404-image",
            }),
          ]),
          h(
            "div",
            {
              class: "pnf-block pnf-block-column",
            },
            [
              h("h1", ["404"]),
              h("h2", ["H OH! 页面丢失"]),
              h("p", ["您所寻找的页面不存在。你可以点击下面的按钮，返回主页。"]),
              h(
                RouterLink,
                {
                  to: userDoainConfig.router.homeRoute || "/",
                },
                {
                  default: () => {
                    return h("button", { class: "pnf-back" }, ["返回首页"]);
                  },
                },
              ),
            ],
          ),
        ]),
      ],
    );
  },
});
