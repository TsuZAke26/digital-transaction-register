<template>
  <div class="mx-4 border card">
    <div class="card-body">
      <div class="card-title">Test</div>
      <div>
        <div ref="container" class="container h-8 select-none" @click="reset">
          <!-- Base layer -->
          <div class="w-full h-full bg-base-200">
            <div class="float-right w-[100px] h-full text-center bg-info" @click="reset">Info</div>
            <div class="float-right w-[100px] h-full text-center bg-error" @click="reset">
              Delete
            </div>
          </div>
          <!-- Swipe layer -->
          <div
            ref="target"
            class="overlay z-[1]"
            :class="{ animated: !isSwiping }"
            :style="{ left }"
          >
            <p>Swipe left</p>
          </div>
        </div>
        <p class="status">
          Direction: {{ direction ? direction : '-' }} <br />
          lengthX: {{ lengthX }} | lengthY: {{ lengthY }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { UseSwipeDirection } from '@vueuse/core';
import { useSwipe } from '@vueuse/core';

const target = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const containerWidth = computed(() => container.value?.offsetWidth);
const left = ref('0');

function reset() {
  left.value = '0';
}

const { direction, isSwiping, lengthX, lengthY } = useSwipe(target, {
  passive: false,
  onSwipe(e: TouchEvent) {
    if (containerWidth.value && lengthX.value > 0) {
      const length = Math.abs(lengthX.value > 200 ? 200 : lengthX.value) * -1;
      left.value = `${length}px`;
    } else {
      left.value = '0';
    }
  },
  onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
    if (lengthX.value > 0 && containerWidth.value && Math.abs(lengthX.value) >= 100) {
      left.value = '200';
    }
  }
});
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  overflow: hidden;
}

.overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: #3fb983;
}

.overlay.animated {
  transition: all 0.2s ease-in-out;
}

.overlay > p {
  color: #fff;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}

.status {
  text-align: center;
}
</style>
