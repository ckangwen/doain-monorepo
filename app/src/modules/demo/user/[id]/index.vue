<script lang="ts" setup>
import { watchPageDetailRoute } from "doain/toolkit";

watchPageDetailRoute((id, query) => {
  console.log(id, query);
});
</script>

<template>
  <div>UserDetail</div>
</template>
