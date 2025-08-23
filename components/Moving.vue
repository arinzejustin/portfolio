<template>
  <div class="relative">
    <!-- Marquee Wrapper -->
    <div class="marquee overflow-hidden flex flex-row relative w-full">
      <div
        ref="track"
        class="marquee-track flex flex-row items-center flex-[0_0_auto]"
        :class="{ paused: isPaused }"
        @click="togglePause"
      >
        <!-- Loop items twice for seamless infinite scroll -->
        <div
          v-for="(item, i) in [...items, ...items]"
          :key="i"
          class="flex px-6 md:px-3"
        >
          <div
            class="marquee-item flex min-w-[400px] w-full glass rounded-xl overflow-hidden border-[1.5px] border-app relative transition-all hover:scale-[1.01] bg-slate-50"
          >
            <!-- Image container -->
            <div
              class="p-8 rounded-xl"
              style="box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 16px -3px"
            >
              <div
                class="relative"
                style="filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 10px 7px)"
              >
                <NuxtImg
                  :alt="item.title"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-[250px] object-cover rounded-xl"
                  :src="item.image"
                />
              </div>
            </div>

            <!-- Decorative dots -->
            <div
              class="absolute w-2 h-2 top-4 left-4 rounded-full bg-[#e6e6e6] dark:bg-[#121212]"
              style="
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px inset,
                  rgb(255, 255, 255) 0px -0.5px 0px 0px inset;
              "
            ></div>
            <div
              class="absolute w-2 h-2 bottom-4 left-4 rounded-full bg-[#e6e6e6] dark:bg-[#121212]"
              style="
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px inset,
                  rgb(255, 255, 255) 0px -0.5px 0px 0px inset;
              "
            ></div>
            <div
              class="absolute w-2 h-2 top-4 right-4 rounded-full bg-[#e6e6e6] dark:bg-[#121212]"
              style="
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px inset,
                  rgb(255, 255, 255) 0px -0.5px 0px 0px inset;
              "
            ></div>
            <div
              class="absolute w-2 h-2 bottom-4 right-4 rounded-full bg-[#e6e6e6] dark:bg-[#121212]"
              style="
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px inset,
                  rgb(255, 255, 255) 0px -0.5px 0px 0px inset;
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  name: "ProjectsMarquee",
  setup() {
    const items = ref([
      { title: "RunMeCV AI", image: "/image/pxxl.webp" },
      { title: "Portfolio Site", image: "/image/pxxl.webp" },
      { title: "E-Commerce UI", image: "/image/pxxl.webp" },
      { title: "Dashboard Design", image: "/image/pxxl.webp" },
    ]);

    const isPaused = ref(false);
    const track = ref<HTMLElement | null>(null);
    let marqueeTween: gsap.core.Tween | null = null;

    const togglePause = () => {
      isPaused.value = !isPaused.value;
      if (marqueeTween) {
        marqueeTween.paused(isPaused.value);
      }
    };

    onMounted(() => {
      if (track.value) {
        const trackWidth = track.value.scrollWidth / 2; // width of one full loop

        marqueeTween = gsap.to(track.value, {
          x: -trackWidth,
          duration: 30,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => `${parseFloat(x) % -trackWidth}px`, // seamless loop
          },
          scrollTrigger: {
            trigger: track.value,
            start: "top 90%",
            toggleActions: "play none none none", // only play once when in view
          },
        });
      }
    });

    return { items, isPaused, togglePause, track };
  },
});
</script>

<style scoped>
.marquee-item {
  box-shadow: rgb(255, 255, 255) 0px 3px 0px 0px inset;
}

.dark .marquee-item {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 0px 0px inset;
}

/* pause when hovering individual card */
.marquee-item:hover {
  transform: scale(1.02);
}
</style>
