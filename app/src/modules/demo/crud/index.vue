<script lang="ts" setup>
import config from "./config";
import { CrudPage } from "doain/components";
</script>

<template>
  <page-container>
    <CrudPage :config="config"></CrudPage>
  </page-container>
</template>
