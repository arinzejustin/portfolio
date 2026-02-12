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
  <!-- Contact Section -->
  <section id="hireme" class="relative z-10 py-24 pb-10 px-4 md:px-8 text-center reveal-section">
    <div class="max-w-3xl mx-auto glass p-8 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden">

      <!-- Background Glow -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-accent-gold/10 blur-[80px] rounded-full"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full"></div>

      <h2 class="font-display text-4xl md:text-6xl font-bold mb-6 relative z-10">Let's work <span
          class="text-accent-gold font-serif italic">together</span></h2>
      <p class="text-on-muted text-lg max-w-xl mx-auto mb-10 relative z-10">
        Have a project in mind? Looking for a developer who cares about the details? Let's build something
        extraordinary.
      </p>

      <div class="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
        <a href="mailto:codewitharinzejustin@gmail.com"
          class="px-8 py-4 bg-on-light dark:bg-white text-surface-light dark:text-surface-dark font-bold rounded-full hover:scale-105 transition-transform duration-300 flex items-center gap-3">
          <Icon icon="ph:envelope-simple" class="w-5 h-5" />
          <span>codewitharinzejustin@gmail.com</span>
        </a>
        <div class="flex gap-4">
          <a href="https://x.com/justin_axo" target="_blank"
            class="p-4 bg-surface-dark/50 hover:bg-surface-dark border border-white/10 rounded-full transition-colors group">
            <Icon icon="pajamas:twitter" class="w-5 h-5 text-on-muted group-hover:text-white" />
          </a>
          <a href="https://www.linkedin.com/in/justin-arinze-627137382" target="_blank"
            class="p-4 bg-surface-dark/50 hover:bg-surface-dark border border-white/10 rounded-full transition-colors group">
            <Icon icon="skill-icons:linkedin" class="w-5 h-5 grayscale group-hover:grayscale-0" />
          </a>
          <a href="https://github.com/arinzejustin" target="_blank"
            class="p-4 bg-surface-dark/50 hover:bg-surface-dark border border-white/10 rounded-full transition-colors group">
            <Icon icon="iconoir:github" class="w-5 h-5 text-on-muted group-hover:text-white" />
          </a>
        </div>
      </div>

    </div>

    <footer class="mt-16 text-center text-sm text-on-muted font-mono opacity-50">
      &copy; {{ new Date().getFullYear() }} Justin Arinze.
    </footer>
  </section>
</template>