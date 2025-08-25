<template>
  <div
    ref="cursor"
    class="fixed top-0 left-0 w-7 h-7 mix-blend-difference rounded-full pointer-events-none flex items-center justify-center bg-white/10 backdrop-blur-[5px] border-2 border-white/70 shadow-lg transition-transform duration-[50ms] z-[999999999]"
    :class="cursorClass"
  >
    <!-- Show icon when hovering -->
    <Icon
      v-if="cursorClass === 'cursor-point'"
      icon="arcticons:quick-cursor"
      class="w-16 h-16"
    />

    <Icon
      v-if="cursorClass === 'cursor-text'"
      icon="ph:cursor-text-thin"
      class="w-16 h-16"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import { Icon } from "@iconify/vue"; // <-- import Iconify

const cursor = ref<HTMLElement | null>(null);
const cursorClass = ref("");
let observer: MutationObserver | null = null;

function bindHoverListeners(root: Document | HTMLElement = document) {
  // For clickable items
  root.querySelectorAll("a, button, .cursor-app").forEach((el) => {
    if (!(el as HTMLElement).dataset.cursorBoundAction) {
      el.addEventListener(
        "mouseenter",
        () => (cursorClass.value = "cursor-point")
      );
      el.addEventListener("mouseleave", () => (cursorClass.value = ""));
      (el as HTMLElement).dataset.cursorBoundAction = "true";
    }
  });

  // For text inputs
  root.querySelectorAll("input, textarea").forEach((el) => {
    if (!(el as HTMLElement).dataset.cursorBoundText) {
      el.addEventListener(
        "mouseenter",
        () => (cursorClass.value = "cursor-text")
      );
      el.addEventListener("mouseleave", () => (cursorClass.value = ""));
      (el as HTMLElement).dataset.cursorBoundText = "true";
    }
  });
}

// Track mouse position
onMounted(() => {
  document.addEventListener("mousemove", (e) => {
    if (cursor.value) {
      cursor.value.style.transform = `translate(${e.clientX - 14}px, ${
        e.clientY - 14
      }px)`;
    }
  });

  // Initial bind
  bindHoverListeners();

  // Watch for new DOM nodes
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          bindHoverListeners(node); // bind for new content
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

onBeforeMount(() => {
  if (observer) {
    observer.disconnect(); // Clean up observer on component unmount
  }
  cursor.value = null; // Clear cursor reference
});
</script>

<style scoped>
div {
  transition: transform 0.15s ease, background-color 0.2s ease, border 0.2s ease;
  transform-origin: center; /* prevents jump on scale */
}

.cursor-point,
.cursor-text {
  background-color: transparent !important;
  border: 0px solid white !important;
  transform: scale(2);
  @apply w-12 h-12 rounded-none backdrop-blur-0 mix-blend-normal shadow-none !important;
}
</style>
