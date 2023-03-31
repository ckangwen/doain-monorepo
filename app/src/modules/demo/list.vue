<script lang="ts" setup>
import { PaginationView } from "doain/components";
import { createColumns } from "~utils";
import { createSchemaPipeline, createInputSchema } from "@charrue/schema-form-next";

const url = "/user/list";
const columns = createColumns([
  ["ID", "id"],
  ["UserId", "userId"],
  ["Title", "title"],
]);
const schema = createSchemaPipeline(
  createInputSchema("ID", "id"),
  createInputSchema("UserId", "userId"),
  createInputSchema("Title", "title"),
);
</script>

<template>
  <page-container>
    <PaginationView
      :form-props="{
        labelWidth: '80px',
      }"
      :url="url"
      :columns="columns"
      :schema="schema"
    ></PaginationView>
  </page-container>
</template>
