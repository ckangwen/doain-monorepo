<template>
  <el-form class="el-form--grid" :model="form" label-width="120px">
    <el-form-item data-prop="name" label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item data-prop="region" label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item data-prop="date1" label="Activity time">
      <el-date-picker
        v-model="form.date1"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item data-prop="delivery" label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item data-prop="type" label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item data-prop="resource" label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item data-prop="desc" label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item data-prop="action">
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style>
.el-form--grid {
  display: grid;
  grid-template-areas:
    "name name name"
    "region date1 delivery"
    "type type resource"
    "desc desc ."
    "action action action";
}
[data-prop="name"] {
  grid-area: name;
}
[data-prop="region"] {
  grid-area: region;
}
[data-prop="date1"] {
  grid-area: date1;
}
[data-prop="delivery"] {
  grid-area: delivery;
}
[data-prop="type"] {
  grid-area: type;
}
[data-prop="resource"] {
  grid-area: resource;
}
[data-prop="desc"] {
  grid-area: desc;
}
[data-prop="action"] {
  grid-area: action;
}
</style>
