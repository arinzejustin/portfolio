<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";

export default defineComponent({
  mounted() {
    // GSAP text blur (start blurred, then clear)
    gsap.fromTo(
      ".blur-text",
      { filter: "blur(8px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
      }
    );

    // GSAP slide-in for divs
    gsap.from(".slide-div", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: "power3.out",
    });

    // Zigzag line drawing
    gsap.fromTo(
      ".svg-path",
      { strokeDasharray: 200, strokeDashoffset: 200 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.3 }
    );
  },
});
</script>

<template>
  <div class="relative">
    <div class="w-full md:max-w-4xl lg:max-w-3xl mx-auto px-4 py-8">
      <!-- Circle div -->
      <div class="rounded-full bg-teal-400 h-20 w-20 slide-div"></div>

      <div class="text-center slide-div mt-6">
        <!-- Texts all start blurred -->
        <h2
          class="blur-text text-[26px] font-display md:text-[42px] lg:text-[58px] font-bold tracking-[-.03em] leading-[110%] mb-2 md:mb-2"
        >
          JUSTIN ARINZE
        </h2>
        <p
          class="blur-text py-2 font-funky text-lg md:text-xl lg:text-2xl text-teal-400 text-shadow"
        >
          Is A
        </p>
        <h3
          class="blur-text text-xl font-sans md:text-4xl font-bold tracking-[-.03em] leading-[110%] mb-2 md:mb-2"
        >
          Software Engineer
        </h3>

        <!-- Zigzag + arrow -->
        <div class="flex justify-center my-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="100"
            viewBox="0 0 24 24"
            class="rotated-svg"
          >
            <g
              fill="none"
              stroke="#14b8a6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0.5"
            >
              <path class="svg-path" d="m14 7l-4-4l-4 4" />
              <path
                class="svg-path"
                d="M10 3v4.394A6.74 6.74 0 0 0 13 13a6.74 6.74 0 0 1 3 5.606V21"
              />
            </g>
          </svg>
        </div>

        <p class="blur-text text-sm md:text-lg font-display text-on-light dark:text-on-dark">
          and creative mind blending technology, design, and strategy to build
          experiences that inspire. Passionate about code, problem-solving, and
          innovation, I craft solutions that connect people and ideas with
          impact.
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Rotate whole SVG 180deg to flip arrow downward */
.rotated-svg {
  transform: rotate(180deg);
}
</style>
