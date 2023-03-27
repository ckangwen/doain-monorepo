<template>
  <div class="global-page-container--default w-full h-full p-4 box-border">
    <div class="global-page-container-inner box-border w-full h-full p-4 rounded-md">
      <slot></slot>
    </div>
  </div>
</template>

<style>
.global-page-container--default {
  background-color: var(--doain-page-root-bg);
}

.global-page-container-inner {
  background-color: var(--doain-page-inner-bg);
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>
