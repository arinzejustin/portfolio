<template>
  <div
    ref="cursor"
    class="fixed top-0 left-0 w-7 h-7 mix-blend-difference rounded-full pointer-events-none flex items-center justify-center bg-white/10 backdrop-blur-[5px] border-2 border-white/70 shadow-lg transition-transform duration-[50ms] z-[999999999]"
    :class="cursorClass"
  >
    <!-- Show icon when hovering -->
    <Icon
      v-if="cursorClass === 'cursor-hover'"
      icon="arcticons:quick-cursor"
      class="w-16 h-16"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue"; // <-- import Iconify

const cursor = ref<HTMLElement | null>(null);
const cursorClass = ref("");

// Track mouse position
onMounted(() => {

  document.addEventListener("mousemove", (e) => {
    if (cursor.value) {
      cursor.value.style.transform = `translate(${e.clientX - 12}px, ${
        e.clientY - 12
      }px)`;
    }
  });

  // Detect hover over links & buttons
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener(
      "mouseenter",
      () => (cursorClass.value = "cursor-hover")
    );
    el.addEventListener("mouseleave", () => (cursorClass.value = ""));
  });

  document.querySelectorAll(".cursor-app").forEach((el) => {
    el.addEventListener(
      "mouseenter",
      () => (cursorClass.value = "cursor-hover")
    );
    el.addEventListener("mouseleave", () => (cursorClass.value = ""));
  });
});
</script>

<style scoped>
div {
  transition: transform 0.15s ease, background-color 0.2s ease, border 0.2s ease;
  transform-origin: center; /* prevents jump on scale */
}

.cursor-hover {
  background-color: transparent !important;
  border: 0px solid white !important;
  transform: scale(2);
  @apply w-12 h-12 rounded-none backdrop-blur-0 mix-blend-normal shadow-none dark:shadow-lg !important;
}
</style>
