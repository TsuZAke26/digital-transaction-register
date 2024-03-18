<template>
  <button
    @click="$router.push({ name: route, params: routeParams })"
    :class="currentRouteMatches ? 'active' : ''"
  >
    <slot name="icon"></slot>
    <span class="btm-nav-label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  label: { type: String, required: true },
  route: { type: String, required: true },
  routeParams: Object,
  altRouteMatch: { type: String, required: false }
});

const vueRoute = useRoute();
const currentRouteMatches = computed(() => {
  const exactMatch = vueRoute.name === props.route;
  const routeStartsWith =
    vueRoute.path.startsWith(`/${props.route}/`) ||
    vueRoute.path.startsWith(`/${props.altRouteMatch}/`);

  return exactMatch || routeStartsWith;
});
</script>
