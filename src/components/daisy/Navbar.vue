<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <slot name="start"></slot>
    </div>
    <div class="navbar-center">
      <slot name="center"></slot>
    </div>
    <div class="navbar-end">
      <slot name="end"></slot>
    </div>
  </div>
</template>
