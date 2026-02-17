<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: {
    Icon,
  },

  setup() {
    useHead({
      title: "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects",
      meta: [
        {
          name: "description",
          content:
            "Discover Justin Arinze, a Nigerian software engineer, tech lead, and founder of Axiolot Hub. Explore his portfolio, innovative projects, and expertise in web, app, and cloud development.",
        },
        {
          name: "keywords",
          content:
            "Justin Arinze, Software Engineer, Tech Lead, Axiolot Hub, Portfolio, Web Developer, App Developer, Cloud Computing, Nigerian Developer, Software Projects, Innovative Solutions",
        },
        { name: "author", content: "Justin Arinze" },
        {
          property: "og:title",
          content:
            "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects",
        },
        {
          property: "og:description",
          content:
            "Explore the portfolio and projects of Justin Arinze, a passionate software engineer and founder of Axiolot Hub, delivering innovative solutions in technology.",
        },
        { property: "og:image", content: "/image/profile.jpg" },
        {
          property: "og:image:alt",
          content: "Justin Arinze's Profile Picture",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://arinzejustin.netlify.app",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content:
            "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects",
        },
        {
          name: "twitter:description",
          content:
            "Explore the portfolio and projects of Justin Arinze, a passionate software engineer and founder of Axiolot Hub, delivering innovative solutions in technology.",
        },
        { name: "twitter:image", content: "/image/profile.jpg" },
        {
          name: "twitter:image:alt",
          content: "Justin Arinze's Profile Picture",
        },
        { name: "twitter:site", content: "@justin_axo" },
        { name: "twitter:creator", content: "@justin_axo" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        {
          rel: "shortcut icon",
          type: "image/png",
          href: "/favicon.png",
        },
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/image/favicon.png",
        },
        { rel: "canonical", href: "https://arinzejustin.netlify.app" },
      ],
    });
    const { theme, toggleTheme } = useTheme();
    const newsLetter = ref<boolean>(false);

    return {
      theme,
      toggleTheme,
      newsLetter
    };
  },
  mounted() {
    const timeout = setTimeout(() => {
      const nextTime = localStorage.getItem('nextTime');
      if (!nextTime) return this.newsLetter = true;
      this.newsLetter = Date.now() > Number(nextTime);
      clearTimeout(timeout)
    }, 3000)
  }
});
</script>
<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtLoadingIndicator class="navigateLoader" />
      <NuxtPage />
      <CustomCursor />
    </NuxtLayout>
    <button @click="toggleTheme"
      class="fixed bottom-5 md:top-6 md:bottom-auto right-5 rounded-full glass glass-lg border border-app p-2.5 z-[100000]">
      <Icon :icon="theme === 'dark' ? 'solar:sun-line-duotone' : 'solar:moon-broken'"
        class="w-6 h-6 text-on-light dark:text-on-dark" />
    </button>
    <Transition name="circle">
      <div v-if="newsLetter" class="fixed bottom-5 left-2 z-[100000]">
        <NewsLetter @close="newsLetter = false" />
      </div>
    </Transition>
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
  background: repeating-linear-gradient(to right,
      var(--load-color-1) 0%,
      var(--load-color-2) 50%,
      var(--load-color-3) 100%) !important;
  box-shadow: 0px 2px 8px var(--load-shadow) !important;
  transition: width 0.1s, opacity 0.4s, background 0.3s, height 0.4s ease-in-out !important;
}
</style>