<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: {
    Icon,
  },

  setup() {
    const { theme, toggleTheme } = useTheme();

    return {
      theme,
      toggleTheme,
    };
  },
});
</script>
<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtLoadingIndicator class="navigateLoader" />
      <NuxtPage />
      <CustomCursor />
    </NuxtLayout>
    <button
      @click="toggleTheme"
      class="fixed bottom-5 md:top-6 md:bottom-auto right-5 rounded-full glass glass-lg border border-app p-2.5"
    >
      <Icon
        :icon="theme === 'dark' ? 'solar:sun-line-duotone' : 'solar:moon-broken'"
        class="w-6 h-6 text-on-light dark:text-on-dark"
      />
    </button>
  </div>
</template>

<style scoped>
/* assets/css/loading.css */

/* Default (light theme) */
:root {
  --load-color-1: #000000;
  --load-color-2: #222222;
  --load-color-3: #444444;
  --load-shadow: rgba(0, 0, 0, 0.6);
}

/* Dark theme */
.dark {
  --load-color-1: #ffffff;
  --load-color-2: #cccccc;
  --load-color-3: #aaaaaa;
  --load-shadow: rgba(255, 255, 255, 0.6);
}

.navigateLoader {
  background: repeating-linear-gradient(
    to right,
    var(--load-color-1) 0%,
    var(--load-color-2) 50%,
    var(--load-color-3) 100%
  ) !important;
  box-shadow: 0px 2px 8px var(--load-shadow) !important;
  transition: width 0.1s, opacity 0.4s, background 0.3s, height 0.4s ease-in-out !important;
}
</style>