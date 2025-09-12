<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import CraftsData from "@/assets/json/crafts.json";
import type { Craft } from "@/types/crafts";
import { Icon } from "@iconify/vue";

gsap.registerPlugin(TextPlugin);

export default defineComponent({
  components: {
    Icon,
  },

  setup() {

    useHead({
      title: "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects",
      meta: [
        { name: "description", content: "Discover Justin Arinze, a Nigerian software engineer, tech lead, and founder of Axiolot Hub. Explore his portfolio, innovative projects, and expertise in web, app, and cloud development." },
        { name: "keywords", content: "Justin Arinze, Software Engineer, Tech Lead, Axiolot Hub, Portfolio, Web Developer, App Developer, Cloud Computing, Nigerian Developer, Software Projects, Innovative Solutions" },
        { name: "author", content: "Justin Arinze" },
        { property: "og:title", content: "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects" },
        { property: "og:description", content: "Explore the portfolio and projects of Justin Arinze, a passionate software engineer and founder of Axiolot Hub, delivering innovative solutions in technology." },
        { property: "og:image", content: "/image/pfp.png" },
        { property: "og:image:alt", content: "Justin Arinze's Profile Picture" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://arinzejustin.com" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects" },
        { name: "twitter:description", content: "Explore the portfolio and projects of Justin Arinze, a passionate software engineer and founder of Axiolot Hub, delivering innovative solutions in technology." },
        { name: "twitter:image", content: "/image/pfp.png" },
        { name: "twitter:image:alt", content: "Justin Arinze's Profile Picture" },
        { name: "twitter:site", content: "@justin_axo" },
        { name: "twitter:creator", content: "@justin_axo" }
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "canonical", href: "https://arinzejustin.com" }
      ]
    })

    const typingText = ref<HTMLSpanElement | null>(null);
    const placement = ref("top-full"); // default top
    const buttonRef = ref<HTMLElement | null>(null);
    const modalRef = ref<HTMLElement | null>(null);
    const showModal = ref(false);

    const toggleModal = () => {
      showModal.value = !showModal.value;

      if (showModal.value && buttonRef.value && modalRef.value) {
        const rect = buttonRef.value.getBoundingClientRect();
        const modalHeight = modalRef.value.offsetHeight;
        const spaceBelow = window.innerHeight - rect.bottom;

        // place below if space, otherwise above
        placement.value = spaceBelow > modalHeight ? "top-full mt-2" : "bottom-full mb-2";
      }
    };

    const downloadPdf = (url: string) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop() || "file.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Adjust modal on mobile: always centered under buttons
    const mobileModalStyle = computed(() => {
      return window.innerWidth < 768 && modalRef.value
        ? {
          top: "calc(100% + 0.5rem)",
          left: "50%",
          transform: "translateX(-50%)",
        }
        : {};
    });

    return {
      typingText,
      buttonRef,
      modalRef,
      showModal,
      placement,
      toggleModal,
      downloadPdf,
      mobileModalStyle,
    };
  },

  data() {
    return {
      Crafts: CraftsData as Craft[],
      experiences: [
        {
          year: "2025 - Present",
          role: "Assistant Tech Supervisor",
          company: "PPSMB (School Board) Enugu",
        },
        {
          year: "2022 - Present",
          role: "Tech Lead & Founder",
          company: "Axiolot Hub",
        },
        {
          year: "2023 - 2024",
          role: "Frontend Developer",
          company: "Kada Sales",
        },
        {
          year: "2022 - 2024",
          role: "Frontend Developer",
          company: "Freelance @ Upwork",
        },
        {
          year: "2021 - 2023",
          role: "Software Developer",
          company: "CIC Enugu",
        }
      ],
    };
  },

  mounted() {
    // Zigzag line drawing
    gsap.fromTo(
      ".svg-path",
      { strokeDasharray: 200, strokeDashoffset: 200 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.3 }
    );

    if (this.typingText) {
      const texts = ["Download", "My Resume"];
      let index = 0;

      const typeNext = () => {
        const nextText = texts[index];
        gsap.to(this.typingText, {
          duration: 3.4,
          text: nextText,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.delayedCall(1.2, () => {
              index = (index + 1) % texts.length;
              typeNext();
            });
          },
        });
      };

      typeNext();
    }

    document.addEventListener("click", (e) => {
      if (
        this.showModal &&
        !this.buttonRef?.contains(e.target as Node) &&
        !this.modalRef?.contains(e.target as Node)
      ) {
        this.showModal = false;
      }
    });
  },
});
</script>

<template>
  <div class="relative">
    <div class="w-full relative z-50 md:max-w-4xl lg:max-w-3xl mx-auto px-4 py-8">
      <!-- Circle div -->
      <div
        class="rounded-full bg-gradient-to-tr to-teal-400 from-purple-400 h-28 w-28 slide-app p-0 m-0 flex items-center justify-center border border-app">
        <NuxtImg src="/image/pfp.png" class="rounded-full w-[100px] h-[100px] blur-text" alt="Profile picture" />
      </div>

      <div class="text-center slide-app mt-6">
        <!-- Texts all start blurred -->
        <h2
          class="blur-text text-[26px] font-display md:text-[42px] lg:text-[58px] font-bold tracking-[-.03em] leading-[110%] mb-2 md:mb-2">
          JUSTIN ARINZE
        </h2>
        <p class="blur-text py-2 font-funky text-lg md:text-xl lg:text-2xl text-teal-400 text-shadow">
          Is A
        </p>
        <h3 class="blur-text text-xl font-sans md:text-4xl font-bold tracking-[-.03em] leading-[110%] mb-0">
          Software Engineer
        </h3>

        <!-- Zigzag + arrow -->
        <div class="flex justify-center my-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="100" viewBox="0 0 24 24" class="rotated-svg">
            <g fill="none" stroke="#14b8a6" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5">
              <path class="svg-path" d="m14 7l-4-4l-4 4" />
              <path class="svg-path" d="M10 3v4.394A6.74 6.74 0 0 0 13 13a6.74 6.74 0 0 1 3 5.606V21" />
            </g>
          </svg>
        </div>

        <p class="blur-text text-sm md:text-lg font-display text-on-light dark:text-on-dark">
          and creative mind blending technology, design, and strategy to build
          experiences that inspire. Passionate about code, problem-solving, and
          innovation, I craft solutions that connect people and ideas with
          impact.
        </p>
        <div class="my-4 mt-10 flex flex-col md:flex-row md:justify-start md:items-center gap-4 md:gap-6 text-left">

          <!-- First row: Hire Me + Available -->
          <div class="flex flex-row justify-start gap-4 w-full md:w-auto">
            <!-- Hire Me -->
            <div class="rounded-full">
              <NuxtLink role="button" to="/#hireme"
                class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 transition-all duration-300">
                <span class="gradient-ring pointer-events-none"></span>
                <span
                  class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text">
                  Hire Me!
                </span>
              </NuxtLink>
            </div>

            <!-- Available -->
            <div class="flex items-center rounded-full text-base gap-2 px-6 py-3 bg-[#e1f9dc] shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#178d00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2z" />
                <path
                  d="M16.24 8.24a3.5 3.5 0 0 1 .76 4.24l-1.5-1.5a2.5 2.5 0 0 0-3.54-3.54l-1.5-1.5a3.5 3.5 0 0 1 4.24-.76z" />
                <path
                  d="M7.76 15.76a3.5 3.5 0 0 1-.76-4.24l1.5 1.5a2.5 2.5 0 0 0 3.54 3.54l1.5 1.5a3.5 3.5 0 0 1-4.24.76z" />
              </svg>
              <span class="text-[#178d00] font-sans hidden md:block blur-text">Available for project</span>
              <span class="text-[#178d00] font-sans md:hidden">Available</span>
            </div>
          </div>

          <!-- Second row: Resume/Download button -->
          <div class="flex justify-center md:justify-start mt-4 md:mt-0 w-full md:w-auto">
            <div @click="toggleModal" ref="buttonRef"
              class="gradient-border-wrapper p-[1px] rounded-full relative inline-block overflow-hidden border border-app slide-app">
              <NuxtLink
                class="relative z-10 flex items-center rounded-full bg-surface-light dark:bg-surface-dark text-on-light dark:text-on-dark px-5 py-2 blur-text">
                <Icon icon="ph:file-pdf-fill" width="24" height="24" class="mr-2" />
                <span ref="typingText"></span>
              </NuxtLink>
            </div>

            <!-- Modal -->
            <div v-if="showModal"
              :class="['absolute glass w-auto z-50 p-5 px-4 rounded-xl border-app border flex flex-row space-x-5 gap-2', placement]"
              ref="modalRef">
              <NuxtLink role="button" to="/pdf/resume.pdf" target="_blank"
                class="relative inline-flex items-center justify-center px-6 py-1 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:md:px-7 transition-all duration-300">
                <span class="gradient-ring pointer-events-none"></span>
                <span
                  class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text">
                  View
                </span>
              </NuxtLink>
              <NuxtLink role="button" @click="downloadPdf('/pdf/resume.pdf')"
                class="relative inline-flex items-center justify-center px-6 py-1.5 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:md:px-7 transition-all duration-300">
                <span class="gradient-ring pointer-events-none"></span>
                <span
                  class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text">
                  Save
                </span>
              </NuxtLink>
            </div>
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
        <span class="blur-text font-sans text-sm md:text-base md:mx-2">I like to craft solid and scalable products with
          exceptional user
          experiences, focusing on innovation and problem-solving across various
          industries.</span>
        <span class="blur-text font-sans text-sm md:text-base md:mx-2">
          I'm Justin Arinze, a {{ new Date().getFullYear() - 2002 }}-year-old Nigerian software developer, with
          {{ new Date().getFullYear() - 2021 }}+
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
      <div class="relative w-full md:max-w-2xl mx-auto h-12 my-8 md:my-12 group">
        <div
          class="slide-app cursor-app border-dashed border-app [background:linear-gradient(45deg,#f1f1f1,theme(colors.surface.light)_50%,#f0f0f0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] dark:[background:linear-gradient(45deg,#121212,theme(colors.surface.dark)_50%,#151515)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] border border-transparent animate-border absolute top-0 left-[1%] md:left-[20%] bg-surface-light dark:bg-surface-dark px-2 pt-2 -rotate-12 shadow-xl rounded-xl overflow-hidden transition-all duration-500 group-hover:-rotate-12 group-hover:-translate-x-4 group-hover:scale-105">
          <div class="w-[200px] h-[200px] rounded-lg border-teal-500 border border-dotted hidden">
            <NuxtImg alt="About image 1" loading="lazy" width="200" height="200" decoding="async" :custom="true"
              class="object-cover rounded-lg w-full h-full text-transparent" v-slot="{ src, isLoaded, imgAttrs }">
              <!-- Show the actual image when loaded -->
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

              <!-- Show a placeholder while loading -->
              <img v-else class="object-cover rounded-lg w-full h-full text-transparent"
                src="https://placehold.co/200x200" alt="placeholder" />
            </NuxtImg>
          </div>
          <span
            class="text-sm font-funky blur-text flex flex-col justify-center py-1 pb-3 italic text-center w-[200px]">
            @justin_axo
            <span class="border-b border-dotted border-app py-1"></span>
            <span class="font-mono text-xs block mt-1">on Instagram</span>
          </span>
        </div>
        <div
          class="slide-app cursor-app border-dashed border-app [background:linear-gradient(45deg,#f1f1f1,theme(colors.surface.light)_50%,#f0f0f0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] dark:[background:linear-gradient(45deg,#121212,theme(colors.surface.dark)_50%,#151515)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] border border-transparent animate-border absolute top-10 right-[1%] md:right-[20%] bg-surface-light dark:bg-surface-dark px-2 pt-2 rotate-12 shadow-xl rounded-xl overflow-hidden transition-all duration-500 group-hover:rotate-12 group-hover:translate-x-4 group-hover:scale-105">
          <div class="w-[200px] h-[200px] rounded-lg border-teal-500 border border-dotted hidden">
            <NuxtImg alt="About image 2" loading="lazy" width="200" height="200" decoding="async" :custom="true"
              class="object-cover rounded-lg w-full h-full text-transparent" v-slot="{ src, isLoaded, imgAttrs }">
              <!-- Show the actual image when loaded -->
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

              <!-- Show a placeholder while loading -->
              <img v-else class="object-cover rounded-lg w-full h-full text-transparent"
                src="https://placehold.co/200x200" alt="placeholder" />
            </NuxtImg>
          </div>
          <span
            class="text-sm font-funky blur-text flex flex-col justify-center py-1 pb-3 italic text-center w-[200px]">
            @arinzejustin
            <span class="border-b border-dotted border-app py-1"></span>
            <span class="font-mono block mt-1 text-xs">on Linkedin</span>
          </span>
        </div>
      </div>
    </div>
    <div class="border-b border-app my-2 mt-6"></div>
    <div class="w-full px-4 md:max-w-4xl py-8 mb-5 mx-auto slide-app">
      <h2 class="text-3xl font-bold py-5 font-funky blur-text text-center">
        Crafts put together so far
      </h2>
      <div class="my-4 mb-1 py-4 pb-8">
        <MovingIcons />
      </div>
      <div class="py-4 grid-cols-1 md:grid-cols-2 gap-8 grid align-middle items-center">
        <NuxtLink :to="craft.link" v-for="(craft, i) in Crafts" :key="i"
          class="w-full rounded-2xl overflow-hidden border-[1.5px] border-app relative transition-all shadow-lg bg-slate-50 dark:bg-[#121212]">
          <div class="px-5 pt-5 pb-7 rounded-2xl group">
            <div class="relative w-full h-[200px] overflow-hidden rounded-2xl">
              <NuxtImg :alt="craft.title" loading="lazy" width="700" height="380" decoding="async"
                class="w-full h-auto object-contain rounded-2xl text-transparent transition-transform duration-700 hover:scale-105"
                :custom="true" v-slot="{ src, isLoaded, imgAttrs }" :src="craft.image" :srcset="craft.image">
                <!-- Show the actual image when loaded -->
                <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

                <!-- Show a placeholder while loading -->
                <img v-else
                  class="w-full h-auto object-contain rounded-2xl text-transparent transition-transform duration-700 hover:scale-105"
                  src="https://placehold.co/700x380" srcset="https://placehold.co/700x380" :alt="craft.title" />
              </NuxtImg>
            </div>
          </div>
          <div class="px-7 pb-7 space-y-5">
            <h3 class="text-2xl font-semibold font-sans mb-2 pb-3 blur-text px-4 border-b border-app">
              {{ craft.title }}
            </h3>
            <p class="text-base line-clamp-3 blur-text">
              {{ craft.description }}
            </p>
            <a role="button"
              class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:pr-4 transition-all duration-700">
              <!-- Animated gradient border -->
              <span class="gradient-ring pointer-events-none"></span>

              <!-- Button text -->
              <span
                class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans">
                Details
                <Icon icon="uil:angle-right" width="24" height="24" inline
                  class="text-on-light dark:text-on-dark hidden group-hover:inline group-hover:ml-1" />
              </span>
            </a>
          </div>
        </NuxtLink>
      </div>
      <div class="flex justify-center align-middle items-center mt-5 pt-5">
        <NuxtLink to="/crafts" role="button"
          class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:md:px-7 transition-all duration-300">
          <!-- Animated gradient border -->
          <span class="gradient-ring pointer-events-none"></span>

          <!-- Button text -->
          <span
            class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans">
            More Crafts
            <Icon icon="uil:angle-right" width="24" height="24" inline
              class="text-on-dark dark:text-on-light group-hover:text-teal-400 inline group-hover:ml-1" />
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
        <div v-for="(experience, i) in experiences" :key="i"
          class="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between slide-app">
          <div class="relative">
            <span
              class="text-sm font-sans text-on-light dark:text-on-dark text-opacity-70 dark:text-opacity-60 blur-text">
              {{ experience.year }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-base md:text-lg text-on-light dark:text-on-dark blur-text">
              {{ experience.role }}
            </div>
            <div class="flex items-center gap-1 bg-teal-200/20 text-teal-400 px-3 py-1 rounded-2xl ml-1 md:ml-2">
              <div class="w-4 h-4 rounded-full flex items-center justify-center blur-text">
                <Icon icon="gis:location-poi" width="100" height="100" inline class="inline pr-1 text-teal-400" />
              </div>
              <span class="text-xs md:text-sm">{{ experience.company }}</span>
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

.gradient-border-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(from 0deg,
      theme('colors.teal.500'),
      theme('colors.purple.500'),
      theme('colors.sky.500'),
      theme('colors.teal.500'));
  animation: rotate-gradient 3s linear infinite;
  z-index: 0;
}

/* Ensure button stays above gradient */
.gradient-border-wrapper>* {
  position: relative;
  z-index: 1;
}

@keyframes rotate-gradient {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
