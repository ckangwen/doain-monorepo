<script lang="ts" setup>
import { CharrueSchemaForm } from "@charrue/schema-form-next";
import { ElButton, ElFormItem } from "element-plus";

import { useLogin } from "./useLogin";

const {
  elFormRef,
  formValue,
  loading,
  disabled,
  formSchema,
  formRules,

  doLogin,
} = useLogin();
</script>
<template>
  <div class="w-400px m-auto pt-10">
    <CharrueSchemaForm
      ref="elFormRef"
      v-model="formValue"
      :schema="formSchema"
      :rules="formRules"
      label-width="100px"
      label-position="left"
    >
      <template #extra>
        <ElFormItem class="w-full">
          <ElButton
            :disabled="disabled"
            :loading="loading"
            class="w-full"
            type="primary"
            @click="doLogin"
          >
            Login
          </ElButton>
        </ElFormItem>
      </template>
    </CharrueSchemaForm>
  </div>
</template>

<route>
  {
    "meta": {
      "layout": "none"
    }
  }
</route>
