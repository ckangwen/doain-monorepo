<script lang="ts" setup>
import { useUserData } from "doain/core";

const userData = useUserData();
</script>

<template>
  <div class="w-full bg-white p-4 box-border">
    <div>Username: {{ userData.username }}</div>
  </div>
</template>
