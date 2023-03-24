<script lang="ts" setup>
import PageContainer from "~components/PageContainer.vue";
import { createColumns } from "~utils";

import { createInputSchema, createSchemaPipeline } from "@charrue/schema-form-next";
import { PaginationView } from "doain/components";

const searchSchema = createSchemaPipeline(
  createInputSchema("title", "Title"),
  createInputSchema("title2", "Title2"),
  createInputSchema("title3", "Title3"),
);
const columns = createColumns([
  ["ID", "id"],
  ["Title", "title"],
]);
</script>

<template>
  <PageContainer>
    <PaginationView :schema="searchSchema" :columns="columns" url="/user/list" />
    <template #actions="scope">
      <div>
        <router-link :to="`/user/${scope.row.id}`">
          <el-button>edit</el-button>
        </router-link>
        <el-button type="text"> Delete </el-button>
      </div>
    </template>
  </PageContainer>
</template>

<route>
  {
    "meta": {
      "keepAlive": true
    }
  }
</route>
