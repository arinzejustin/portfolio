<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: {
    Icon,
  },

  mounted() {
    // GSAP text blur (start blurred, then clear)
    gsap.utils.toArray<HTMLElement>(".blur-text").forEach((el: HTMLElement) => {
      gsap.fromTo(
        el,
        { filter: "blur(8px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // when element is 85% from top
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Animate divs with slide-in
    gsap.utils.toArray<HTMLElement>(".slide-app").forEach((el: HTMLElement) => {
      gsap.from(el, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
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
      <div
        class="rounded-full bg-gradient-to-tr to-teal-400 from-purple-400 h-28 w-28 slide-app p-0 m-0 flex items-center justify-center border border-app"
      >
        <NuxtImg
          src="/image/pfp.png"
          class="rounded-full w-[100px] h-[100px] blur-text"
          alt="Profile picture"
        />
      </div>

      <div class="text-center slide-app mt-6">
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
          class="blur-text text-xl font-sans md:text-4xl font-bold tracking-[-.03em] leading-[110%] mb-0"
        >
          Software Engineer
        </h3>

        <!-- Zigzag + arrow -->
        <div class="flex justify-center my-0">
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

        <p
          class="blur-text text-sm md:text-lg font-display text-on-light dark:text-on-dark"
        >
          and creative mind blending technology, design, and strategy to build
          experiences that inspire. Passionate about code, problem-solving, and
          innovation, I craft solutions that connect people and ideas with
          impact.
        </p>
        <div
          class="my-4 mt-10 flex justify-start items-center space-x-6 flex-row text-left"
        >
          <div class="rounded-full">
            <NuxtLink
              role="button"
              to="/#hireme"
              class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:md:px-7 transition-all duration-300"
            >
              <!-- Animated gradient border -->
              <span class="gradient-ring pointer-events-none"></span>

              <!-- Button text -->
              <span
                class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text"
              >
                Hire Me!
              </span>
            </NuxtLink>
          </div>
          <div
            class="flex items-center rounded-full text-base gap-2 px-6 py-3 bg-[#e1f9dc]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#178d00"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6"
            >
              <path
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2z"
              />
              <path
                d="M16.24 8.24a3.5 3.5 0 0 1 .76 4.24l-1.5-1.5a2.5 2.5 0 0 0-3.54-3.54l-1.5-1.5a3.5 3.5 0 0 1 4.24-.76z"
              />
              <path
                d="M7.76 15.76a3.5 3.5 0 0 1-.76-4.24l1.5 1.5a2.5 2.5 0 0 0 3.54 3.54l1.5 1.5a3.5 3.5 0 0 1-4.24.76z"
              />
            </svg>
            <span class="text-[#178d00] font-sans hidden md:block blur-text"
              >Available for project</span
            >
            <span class="text-[#178d00] font-sans md:hidden">Available</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full overflow-hidden slide-app pb-6 slide-app">
      <Moving />
    </div>
    <div class="border-b border-app my-2 mt-6"></div>
    <div class="w-full md:max-w-4xl mx-auto px-4 py-4 slide-app">
      <Skills />
    </div>
    <div class="w-full px-4 md:max-w-4xl py-8 mb-16 mx-auto slide-app">
      <h2 class="text-3xl font-bold py-5 font-funky blur-text text-center">
        My Developer Life
      </h2>
      <div class="my-8 flex space-y-8 flex-col md:max-w-2xl mx-auto">
        <span class="blur-text font-sans text-sm md:text-base md:mx-2"
          >I like to craft solid and scalable products with exceptional user
          experiences, focusing on innovation and problem-solving across various
          industries.</span
        >
        <span class="blur-text font-sans text-sm md:text-base md:mx-2">
          I'm Justin Arinze, a 23-year-old Nigerian software developer, with 4+
          years of experience in web development, app development (Flutter),
          cloud computing, and desktop development (Electron Js). I specialize
          in building robust applications, cloud platforms, and cutting-edge
          tech solutions.
        </span>
        <span class="blur-text font-sans text-sm md:text-base md:mx-2">
          A self-taught programmer, ranked among the top programmers in Enugu
          State, Nigeria, I am an active speaker, and mentor passionate about
          empowering others in tech. I'm also the CEO and founder of Axiolot
          Hub, an information managament database for schools across Nigeria.
        </span>
      </div>
      <div
        class="relative w-full md:max-w-2xl mx-auto h-[250px] my-8 md:my-12 group"
      >
        <div
          class="slide-app cursor-app border border-app absolute top-0 left-[1%] md:left-[20%] bg-surface-light dark:bg-surface-dark px-2 pt-2 -rotate-12 shadow-xl rounded-xl overflow-hidden transition-all duration-500 group-hover:-rotate-12 group-hover:-translate-x-4 group-hover:scale-105"
        >
          <div
            class="w-[200px] h-[200px] rounded-lg border-teal-500 border border-dotted"
          >
            <NuxtImg
              alt="About image 1"
              loading="lazy"
              width="200"
              height="200"
              decoding="async"
              :custom="true"
              class="object-cover rounded-lg w-full h-full text-transparent"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <!-- Show the actual image when loaded -->
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

              <!-- Show a placeholder while loading -->
              <img
                v-else
                class="object-cover rounded-lg w-full h-full text-transparent"
                src="https://placehold.co/200x200"
                alt="placeholder"
            /></NuxtImg>
          </div>
          <span
            class="text-xs font-funky blur-text flex justify-center py-1 pb-3 italic w-full text-center"
            >@justin_axo</span
          >
        </div>
        <div
          class="slide-app cursor-app border border-app absolute top-10 right-[1%] md:right-[20%] bg-surface-light dark:bg-surface-dark px-2 pt-2 rotate-12 shadow-xl rounded-xl overflow-hidden transition-all duration-500 group-hover:rotate-12 group-hover:translate-x-4 group-hover:scale-105"
        >
          <div
            class="w-[200px] h-[200px] rounded-lg border-teal-500 border border-dotted"
          >
            <NuxtImg
              alt="About image 2"
              loading="lazy"
              width="200"
              height="200"
              decoding="async"
              :custom="true"
              class="object-cover rounded-lg w-full h-full text-transparent"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <!-- Show the actual image when loaded -->
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

              <!-- Show a placeholder while loading -->
              <img
                v-else
                class="object-cover rounded-lg w-full h-full text-transparent"
                src="https://placehold.co/200x200"
                alt="placeholder"
            /></NuxtImg>
          </div>
          <span
            class="text-xs font-funky blur-text flex justify-center py-1 pb-3 italic w-full text-center"
            >@arinzejustin</span
          >
        </div>
      </div>
    </div>
    <div class="border-b border-app my-2 mt-6"></div>
    <div class="w-full px-4 md:max-w-4xl py-8 mb-5 mx-auto slide-app">
      <h2 class="text-3xl font-bold py-5 font-funky blur-text text-center">
        Crafts put together so far
      </h2>
      <div class="my-4 mb-1 py-4 pb-8"></div>
      <div
        class="py-4 grid-cols-1 md:grid-cols-2 gap-8 grid align-middle items-center"
      >
        <NuxtLink
          to="/projects/pxxl"
          v-for="(_num, i) in 4"
          :key="i"
          class="w-full rounded-2xl overflow-hidden border-[1.5px] border-app relative transition-all shadow-lg bg-slate-50 dark:bg-[#121212]"
          ><div class="px-5 pt-5 pb-7 rounded-2xl">
            <div class="relative">
              <NuxtImg
                alt="Pxxl App Cloud Deployment Platform"
                loading="lazy"
                width="400"
                height="250"
                decoding="async"
                class="w-full h-auto object-contain rounded-2xl text-transparent"
                :custom="true"
                v-slot="{ src, isLoaded, imgAttrs }"
                src="/image/hell.png"
              >
                <!-- Show the actual image when loaded -->
                <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

                <!-- Show a placeholder while loading -->
                <img
                  v-else
                  class="w-full h-auto object-contain rounded-2xl text-transparent"
                  src="https://placehold.co/400x250"
                  alt="Pxxl App Cloud Deployment Platform"
              /></NuxtImg>
            </div>
          </div>
          <div class="px-7 pb-7 space-y-5">
            <h3
              class="text-2xl font-semibold font-sans mb-2 pb-3 blur-text px-4 border-b border-app"
            >
              Pxxl App
            </h3>
            <p class="text-base line-clamp-2 blur-text">
              Enterprise-grade cloud deployment platform enabling instant
              deployment of websites, APIs, and databases with zero
              configuration
            </p>
            <a
              role="button"
              class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:md:px-7 transition-all duration-300"
            >
              <!-- Animated gradient border -->
              <span class="gradient-ring pointer-events-none"></span>

              <!-- Button text -->
              <span
                class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans"
              >
                Details
                <Icon
                  icon="uil:angle-right"
                  width="24"
                  height="24"
                  inline
                  class="text-on-light dark:text-on-dark hidden group-hover:inline group-hover:ml-1"
                />
              </span>
            </a>
          </div>
        </NuxtLink>
      </div>
      <div class="flex justify-center align-middle items-center mt-5 pt-5">
        <NuxtLink
          to="/crafts"
          role="button"
          class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:md:px-7 transition-all duration-300"
        >
          <!-- Animated gradient border -->
          <span class="gradient-ring pointer-events-none"></span>

          <!-- Button text -->
          <span
            class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans"
          >
            More Crafts
            <Icon
              icon="uil:angle-right"
              width="24"
              height="24"
              inline
              class="text-on-dark dark:text-on-light group-hover:text-teal-400 inline group-hover:ml-1"
            />
          </span>
        </NuxtLink>
      </div>
    </div>
    <div class="border-b border-app my-2 mt-6"></div>
    <div class="w-full px-4 md:max-w-4xl py-8 mb-5 mx-auto slide-app">
      <h2 class="text-3xl font-bold py-5 font-funky blur-text text-center">
        Tech Experiences
      </h2>
      <div class="flex flex-col gap-8 w-full mt-8 pt-8">
        <div
          v-for="i in 4"
          :key="i"
          class="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between"
        >
          <div class="relative">
            <span
              class="text-sm font-sans text-on-light dark:text-on-dark text-opacity-40 dark:text-opacity-60 blur-text"
            >
              2025 - Present
            </span>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-lg text-on-light dark:text-on-dark blur-text">
              Frontend Developer at
            </div>
            <div
              class="flex items-center gap-1 bg-teal-200/20 text-teal-400 px-3 py-1 rounded-2xl ml-1 md:ml-2"
            >
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center blur-text"
              >
                <Icon
                  icon="gis:location-poi"
                  width="100"
                  height="100"
                  inline
                  class="inline pr-1 text-teal-400"
                />
              </div>
              <span>Axiolot Hub</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-b border-app my-2 mt-6"></div>
  </div>
</template>
<style scoped>
.rotated-svg {
  transform: rotate(180deg);
}
</style>
