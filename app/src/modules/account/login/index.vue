<route>
  {
    "meta": {
      "layout": "none"
    }
  }
</route>
<script lang="ts" setup>
import { useLogin } from "./useLogin";

const { formValue, loading, formRules, elFormRef, doLogin } = useLogin();
const loginPageMeta = {
  logoUrl: "https://preview.pro.ant.design/logo.svg",
  title: "Ant Design Pro",
  description: "Ant Design is the most influential web design specification in Xihu district",
};
</script>
<template>
  <div class="login-page-container flex items-center w-screen h-screen bg-cover bg-no-repeat">
    <div class="login-form-root flex">
      <div
        class="login-form-container flex flex-col flex-grow-0 flex-shrink-0 items-center justify-center h-auto box-border"
      >
        <div class="login-form__header flex flex-col">
          <div class="flex justify-center items-center">
            <span class="w-44px h-44px mr-4">
              <img class="w-full h-full" alt="logo" :src="loginPageMeta.logoUrl" />
            </span>
            <span class="text-[30px] font-bold">{{ loginPageMeta.title }}</span>
          </div>
          <div class="w-full text-center text-sm mt-4 mb-10 text-[#848587]">
            {{ loginPageMeta.description }}
          </div>
        </div>
        <div class="w-full">
          <el-form
            ref="elFormRef"
            label-placement="left"
            size="large"
            :model="formValue"
            :rules="formRules"
          >
            <el-form-item path="username">
              <el-input v-model="formValue.username" placeholder="请输入用户名">
                <template #prefix>
                  <icon name="ic:baseline-email"></icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item path="password">
              <el-input
                v-model="formValue.password"
                type="password"
                show-password-on="click"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <icon name="ic:baseline-password"></icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item class="mb-0">
              <div class="w-full flex justify-between items-center">
                <div class="flex-initial">
                  <el-checkbox>自动登录</el-checkbox>
                </div>
                <el-button type="primary" link>忘记密码?</el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                class="w-full"
                type="primary"
                size="large"
                :loading="loading"
                @click="doLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@keyframes login-form-root-appear {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0px);
  }
}
.login-page-container {
  --pageBgColor: #fff;
  --pageBgImage: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  --pageJustifyCenter: center;
  --pagePadding: 20px;
  --formRootWidth: 400px;
  --formBorderRadius: 12px;
  --formBgImage: none;
  --formBoxShadow: 0px 10px 40px rgb(29 22 23 / 20%);
  --formBgColor: inherit;
  --formContainerWidth: 100%;

  background-color: var(--pageBgColor);
  background-image: var(--pageBgImage);
  justify-content: var(--pageJustifyCenter);
  padding: var(--pagePadding);
}
.login-form-root {
  transition: all 0.3s;
  width: var(--formRootWidth);
  border-radius: var(--formBorderRadius);
  background-image: var(--formBgImage);
  box-shadow: var(--formBoxShadow);
  transform: translateY(-100vh);
  animation: login-form-root-appear 0.8s ease-in-out forwards;
}

.login-form-container {
  background-color: var(--formBgColor);
  width: var(--formContainerWidth);
  padding: 40px 30px;
  // background: rgba(255, 255, 255, 0.8);
  // backdrop-filter: saturate(50%) blur(3px);
}
.login-form__left {
  flex-basis: var(--formLeftColumnWidth);
}

.setting-icon--opened.el-button.is-circle {
  position: fixed;
  top: 20px;
  right: 20px;
  box-shadow: 0 10px 40px #1d161733;
  background-color: #fff;
  z-index: 3;
  transition: all 0.3s;
  border-radius: 50%;
}
</style>
