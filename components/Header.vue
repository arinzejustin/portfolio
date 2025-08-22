<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";

export default defineComponent({
  components: {
    Icon,
  },

  data() {
    return {
      isApple: false,
      animate: false,
    };
  },

  computed: {
    messageLink(): string {
      return this.isApple
        ? "imessage:arinzejustinng@gmail.com"
        : "sms:07073184665";
    },
  },

  methods: {
    animateGradient() {
      if (this.animate) return;
      gsap.to(".gradient-ring", {
        duration: 2,
        rotation: 360,
        ease: "linear",
        repeat: -1,
      });
    },
  },

  mounted() {
    this.isApple =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  },
});
</script>

<template>
  <div
    class="fixed w-full z-[100000] md:mx-auto md:w-auto top-6 md:top-10 md:left-1/2 md:-translate-x-1/2 flex items-center justify-between py-2.5 px-3 md:px-6 rounded-full border border-app glass lg:glass-lg"
  >
    <!-- Left: Icons -->
    <div
      class="flex justify-evenly w-full items-center gap-y-5 gap-x-3 md:gap-5 text-black dark:text-white"
    >
      <!-- Home -->
      <NuxtLink
        to="/"
        role="button"
        class="rounded-full p-2.5 hover-bg hover:mx-0.5 hover:md:mx-2 transition-all duration-300 ease-in-out border-app border-r"
      >
        <Icon
          icon="solar:home-2-linear"
          class="text-on-light dark:text-on-dark w-4 h-4 md:w-6 md:h-6"
        />
      </NuxtLink>

      <div class="border-r border-app h-10"></div>

      <!-- Social Media Icons -->
      <a
        role="button"
        href="https://github.com/arinzejustin"
        target="_blank"
        class="rounded-full p-2.5 hover-bg hover:mx-0.5 hover:md:mx-2 transition-all duration-300 ease-in-out border-app border-l"
      >
        <Icon
          icon="iconoir:github"
          class="text-on-light dark:text-on-dark w-4 h-4 md:w-6 md:h-6"
        />
      </a>
      <a
        role="button"
        href="https://x.com/justin_axo"
        target="_blank"
        class="rounded-full p-2.5 hover-bg hover:mx-0.5 hover:md:mx-2 transition-all duration-300 ease-in-out border-app border-r"
      >
        <Icon
          icon="pajamas:twitter"
          class="text-on-light dark:text-on-dark w-4 h-4 md:w-6 md:h-6"
        />
      </a>
      <a
        role="button"
        :href="messageLink"
        target="_blank"
        class="rounded-full p-2.5 hover-bg hover:mx-0.5 hover:md:mx-2 transition-all duration-300 ease-in-out border-l border-app"
      >
        <Icon
          icon="streamline-logos:imessage-logo"
          class="text-on-light dark:text-on-dark w-4 h-4 md:w-6 md:h-6"
        />
      </a>
      <a
        role="button"
        href="https://arinzejustin.me/resume.pdf"
        target="_blank"
        class="rounded-full p-2.5 hover-bg hover:mx-0.5 hover:md:mx-2 transition-all duration-300 ease-in-out border-r border-app mr-4"
      >
        <Icon
          icon="duo-icons:file"
          class="text-on-light dark:text-on-dark w-4 h-4 md:w-6 md:h-6"
        />
      </a>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-3 border-solid border-app border-l pl-4">
      <a
        @mouseenter="animateGradient, (animate = true)"
        @mouseleave="animate = false"
        role="button"
        href="/#hireme"
        class="relative inline-flex items-center justify-center px-3 md:px-4 py-1.5 md:py-2.5 rounded-full text-sm font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent"
      >
        <!-- Animated gradient border -->
        <span class="gradient-ring pointer-events-none"></span>

        <!-- Button text -->
        <span
          class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300"
        >
          Work?
        </span>
      </a>
    </div>
  </div>
</template>
  