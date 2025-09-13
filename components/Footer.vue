<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
  setup() { },
  components: {
    Icon,
  },
  data() {
    return {
      message: "",
      email: "",
      name: "",
      loading: false,
      status: "",
      textColor: 'text-green-400'
    };
  },
  methods: {
    async sendMessage() {
      this.loading = true;
      try {
        const res = await $fetch<{ status: boolean, message: string }>("/api/mail", {
          method: "POST",
          body: { name: this.name, email: this.email, message: this.message },
        });
        if (res.status) {
          this.status = "✅ Message sent!";
          this.textColor = 'text-green-400'
        } else {
          this.status = "❌ " + res.message;
          this.textColor = 'text-red-400'
        }
      } catch (e) {
        this.status = "❌ Failed to send message.";
        this.textColor = 'text-red-400'
      } finally {
        this.loading = false;

        const timeout = setTimeout(() => {
          this.status = "";
          clearTimeout(timeout);
        }, 4000);
      }
    },
  },

  mounted() {
    // Animate each child div of the container
    gsap.utils
      .toArray<HTMLElement>("#hireme > div")
      .forEach((el: HTMLElement, i: number) => {
        gsap.from(el, {
          yPercent: 30, // smoother & doesn’t cause scrollbar
          autoAlpha: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 93%",
          },
        });
      });

    // Animate the footer section too
    gsap.from("#hireme > div:last-child", {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#hireme > div:last-child",
        start: "top 85%",
      },
    });
  },
});
</script>


<template>
  <div class="relative w-full mx-auto py-16 md:pb-10 overflow-hidden" id="hireme">
    <div class="flex flex-col px-4 md:flex-row justify-center items-start gap-10 md:gap-12 md:max-w-4xl mx-auto w-full">
      <!-- Mobile First: Social Links -->
      <div class="order-1 md:hidden md:order-3 w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
        <h2 class="font-funky text-3xl md:text-4xl font-bold mb-2 text-center md:text-left blur-text">
          Contact Me Directly
        </h2>
        <p class="mb-5 text-center md:text-left blur-text">
          I'm always interested in exploring new opportunities, collaborating,
          or exchanging ideas.
        </p>
        <div class="flex flex-row space-x-10">
          <a href="https://wa.me/2347073184665" target="_blank" class="flex items-center gap-2">
            <Icon icon="mdi:whatsapp" class="w-7 h-7 text-on-light dark:text-on-dark" />
          </a>
          <a href="mailto:codewitharinzejustin@gmail.com" class="flex items-center gap-2">
            <Icon icon="entypo:email" class="text-on-light dark:text-on-dark w-7 h-7" />
          </a>
          <a href="imessage:arinzejustinng@gmail.com" class="flex items-center gap-2">
            <Icon icon="streamline-logos:imessage-logo" class="text-on-light dark:text-on-dark w-7 h-7" />
          </a>
        </div>
      </div>

      <!-- OR Separator -->
      <div
        class="order-2 md:hidden md:order-2 flex items-center justify-center w-full md:h-full md:w-auto my-2 md:my-0">
        <div class="border-t border-gray-300 dark:border-gray-600 w-full md:w-24"></div>
        <span class="px-4 text-gray-500 dark:text-gray-400">OR</span>
        <div class="border-t border-gray-300 dark:border-gray-600 w-full md:w-24"></div>
      </div>

      <!-- Contact Form -->
      <div class="order-3 md:order-1 w-full md:w-1/2">
        <h2 class="font-funky blur-text text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
          Send me a message
        </h2>
        <p class="text-sm blur-text font-sans mb-7 text-center">
          Feel free to book a call or email me if you'd like to see my portfolio
          deck or to discuss a potential project.
        </p>
        <div class="space-y-6">
          <input type="text" :disabled="loading" placeholder="Your Name" v-model="name"
            class="w-full px-4 py-5 rounded-full border border-app focus:ring-2 focus:ring-teal-400 focus:outline-none bg-slate-50 dark:bg-[#121212] placeholder:text-on-light dark:placeholder:text-on-dark text-on-light dark:text-on-dark" />
          <input type="email" :disabled="loading" v-model="email" placeholder="Your Email"
            class="w-full px-4 py-5 rounded-full border border-app focus:ring-2 focus:ring-teal-400 focus:outline-none bg-slate-50 dark:bg-[#121212] placeholder:text-on-light dark:placeholder:text-on-dark text-on-light dark:text-on-dark" />
          <textarea rows="5" :disabled="loading" v-model="message" placeholder="Your Message"
            class="w-full px-4 py-5 bg-slate-50 dark:bg-[#121212] placeholder:text-on-light dark:placeholder:text-on-dark resize-none rounded-3xl border border-app focus:ring-2 focus:ring-teal-400 focus:outline-none text-on-light dark:text-on-dark"></textarea>

          <a @click="sendMessage()" :disabled="loading" type="submit"
            :class="{ 'pointer-events-none opacity-70': loading }"
            class="group w-full relative inline-flex items-center justify-center rounded-full px-6 py-4 text-base font-medium bg-surface-dark dark:bg-surface-light dark:hover:bg-transparent hover:bg-transparent transition-all duration-500">
            <span class="gradient-ring pointer-events-none"></span>
            <span v-if="loading">
              <span class="sr-only">Loading...</span>
              <CircleLoader :height="'20px'" :width="'20px'" :auto="'auto'" />
            </span>
            <span v-else
              class="relative blur-text z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300">
              Submit
            </span>
          </a>
        </div>
        <p class="my-5 text-center font-sans" :class="textColor">{{ status }}</p>
      </div>
    </div>
    <div class="border-t border-app my-8 mb-5"></div>
    <div class="flex px-4 justify-center flex-col space-y-4 w-full md:pb-8 mx-auto md:max-w-4xl">
      <p class="text-sm text-center">
        Copyright &copy; {{ new Date().getFullYear() }} Arinze Justin
      </p>
      <div class="flex flex-row justify-center space-x-6 items-center">
        <NuxtLink to="https://x.com/justin_axo" target="_blank" class="hover:text-teal-400">
          <Icon icon="pajamas:twitter" width="28" height="28" />
        </NuxtLink>
        <NuxtLink to="https://github.com/arinzejustin" target="_blank" class="hover:text-teal-400">
          <Icon icon="iconoir:github" width="28" height="28" />
        </NuxtLink>
        <NuxtLink to="mailto:codewithjustinarinze@gmail.com" class="hover:text-teal-400">
          <Icon icon="entypo:email" width="28" height="28" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>