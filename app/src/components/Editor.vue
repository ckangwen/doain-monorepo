<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IEditorConfig } from "@wangeditor/editor";
import { DomEditor } from "@wangeditor/editor";

type InsertFnType = (url: string, alt: string, href: string) => void;
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    const toolbar = DomEditor.getToolbar(editorRef.value);
    console.log(toolbar);

    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

// function toggleEnabled(value: boolean) {
//       if (!editorRef.value) {
//         return;
//       }
//       if (value) {
//         editorRef.value.enable();
//       } else {
//         editorRef.value.disable();
//       }
//     }

const toolbarConfig = {
  excludeKeys: ["group-video"],
};
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
  // customAlert
  MENU_CONF: {
    uploadImage: {
      maxFileSize: 2 * 1024 * 1024,
      maxNumberOfFiles: 10,
      allowedFileTypes: ["image/*"],
      customUpload(file: File, insertFn: InsertFnType) {
        console.log("customUpload", file);
        insertFn("https://www.baidu.com/img/flexible/logo/pc/result.png", "", "");
        // const { url } = res.data;
        // insertFn(url, "", "");
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor;
};

const mode = "default"; // 或 'simple'
</script>
