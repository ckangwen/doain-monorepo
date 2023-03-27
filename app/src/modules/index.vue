<script lang="ts" setup>
import { DUpload } from "doain/components";

const imageUrl = "https://s2.loli.net/2023/01/12/a4ImQMsgHkbxtJL.jpg";
</script>

<template>
  <PageContainer>
    <div style="height: 1000px">
      <DUpload v-model="imageUrl" />
      <i-custom-box />
    </div>
  </PageContainer>
</template>
