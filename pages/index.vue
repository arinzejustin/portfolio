<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CraftsData from "@/assets/json/crafts.json";
import type { Craft } from "@/types/crafts";
import { Icon } from "@iconify/vue";
import Skills from "@/components/Skills.vue";
import Moving from "@/components/Moving.vue";
import MovingIcons from "@/components/MovingIcons.vue";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default defineComponent({
    components: {
        Icon,
        Moving,
        Skills,
        MovingIcons,
    },

    setup() {
        useHead({
            title: "Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects",
            meta: [
                {
                    name: "description",
                    content: "Discover Justin Arinze, a Nigerian software engineer, tech lead, and founder of Axiolot Hub. Explore his portfolio, innovative projects, and expertise in web, app, and cloud development.",
                },
                // ... (keeping other metas standard)
            ]
        });

        const typingText = ref<HTMLSpanElement | null>(null);
        const placement = ref("top-full");
        const buttonRef = ref<HTMLElement | null>(null);
        const modalRef = ref<HTMLElement | null>(null);
        const showModal = ref(false);

        const toggleModal = () => {
            showModal.value = !showModal.value;

            if (showModal.value && buttonRef.value && modalRef.value) {
                const rect = buttonRef.value.getBoundingClientRect();
                const modalHeight = modalRef.value.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;

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

        return {
            typingText,
            buttonRef,
            modalRef,
            showModal,
            placement,
            toggleModal,
            downloadPdf,
        };
    },

    data() {
        return {
            Crafts: CraftsData as Craft[],
            experiences: [
                { year: "2025 - Present", role: "Assistant Tech Supervisor", company: "PPSMB (School Board) Enugu" },
                { year: "2022 - Present", role: "Tech Lead & Founder", company: "Axiolot Hub" },
                { year: "2023 - 2024", role: "Frontend Developer", company: "Kada Sales" },
                { year: "2022 - 2024", role: "Frontend Developer", company: "Freelance @ Upwork" },
                { year: "2021 - 2023", role: "Software Developer", company: "CIC Enugu" },
            ],
        };
    },

    methods: {
        openUrl(url: string) {
            window.open(url, "_blank");
        },
    },

    mounted() {
        // Init GSAP Animations
        const tl = gsap.timeline();

        // Reveal Hero Elements Staggered
        tl.from(".hero-element", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Typing Effect
        if (this.typingText) {
            const texts = ["Download", "My Resume"];
            let index = 0;

            const typeNext = () => {
                const nextText = texts[index];
                gsap.to(this.typingText, {
                    duration: 1.5,
                    text: nextText,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.delayedCall(2, () => {
                            index = (index + 1) % texts.length;
                            typeNext();
                        });
                    },
                });
            };
            typeNext();
        }

        // Close modal on outside click
        document.addEventListener("click", (e) => {
            if (this.showModal && !this.buttonRef?.contains(e.target as Node) && !this.modalRef?.contains(e.target as Node)) {
                this.showModal = false;
            }
        });

        // Scroll Animations for Sections
        gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    }
                }
            );
        });
    },
});
</script>

<template>
    <div class="relative bg-surface-light dark:bg-surface-dark transition-colors duration-500 overflow-x-hidden">

        <!-- Subtle Background Texture -->
        <div class="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0 bg-[url('/image/noise.png')]">
        </div>

        <!-- Hero Section -->
        <section
            class="relative z-10 w-full min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-start pt-24 pb-12 px-4 md:px-16 max-w-[1400px] mx-auto gap-12 md:gap-20 overflow-y-hidden">

            <!-- Profile Column (Left Side) -->
            <div class="hero-element relative flex-shrink-0 w-48 h-48 md:w-[400px] md:h-[500px]">
                <div
                    class="absolute inset-0 bg-gradient-to-tr from-accent-gold/20 to-teal-400/20 blur-[40px] rounded-full animate-pulse-slow">
                </div>

                <!-- Premium Image Container -->
                <div
                    class="w-full h-full rounded-[40px] md:rounded-none md:rounded-tl-[80px] md:rounded-br-[80px] overflow-hidden border border-white/10 relative z-10 group bg-surface-dark">
                    <div
                        class="absolute inset-0 bg-accent-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    </div>
                    <NuxtImg src="/image/profile.jpg" alt="Justin Arinze"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                </div>

                <!-- Floating Badge -->
                <div
                    class="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-surface-dark border border-white/10 p-4 rounded-2xl glass shadow-2xl z-20 hidden md:block animate-float">
                    <div class="flex items-center gap-3">
                        <div class="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                        <span class="font-mono text-xs text-on-muted">Open to Work</span>
                    </div>
                </div>
            </div>

            <!-- Content Column (Right Side) -->
            <div class="flex-1 text-center md:text-left space-y-6 md:space-y-8 max-w-2xl">

                <div class="space-y-2">
                    <h2 class="hero-element font-serif italic text-2xl md:text-3xl text-accent-gold">
                        Hello, I'm
                    </h2>
                    <h1
                        class="hero-element font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-on-light dark:text-white leading-[0.9]">
                        JUSTIN<br />ARINZE
                    </h1>
                </div>

                <!-- Dynamic Role Text -->
                <div class="hero-element overflow-hidden h-8 md:h-12 relative flex justify-center md:justify-start">
                    <h3
                        class="font-sans font-bold text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
                        Software Engineer
                    </h3>
                </div>

                <!-- Bio -->
                <p
                    class="hero-element text-on-muted text-lg md:text-xl leading-relaxed font-sans max-w-xl mx-auto md:mx-0">
                    Architecting <strong class="text-on-light dark:text-white">digital ecosystems</strong> that merge
                    high-performance engineering with cinematic aesthetics.
                </p>

                <!-- Actions -->
                <div class="hero-element flex flex-col md:flex-row items-center gap-4 pt-4">
                    <NuxtLink to="/#hireme"
                        class="w-full md:w-auto px-8 py-4 bg-accent-gold text-surface-dark font-bold font-display uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-sm text-center">
                        Initiate Project
                    </NuxtLink>

                    <button @click="toggleModal" ref="buttonRef"
                        class="w-full md:w-auto px-8 py-4 border border-white/20 hover:border-accent-gold text-on-light dark:text-white font-mono uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-3 group rounded-sm">
                        <span>Resume</span>
                        <Icon icon="ph:arrow-right" class="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <!-- Modal (Re-positioned for left alignment context) -->
                    <div v-if="showModal" ref="modalRef"
                        :class="['absolute top-full left-0 mt-4 z-50 p-1 bg-surface-dim border border-white/10 shadow-2xl min-w-[200px] flex flex-col']">
                        <a href="/pdf/resume.pdf" target="_blank"
                            class="text-left py-3 px-6 hover:bg-white/5 text-sm font-mono text-white transition-colors border-b border-white/5">VIew
                            PDF</a>
                        <button @click="downloadPdf('/pdf/resume.pdf')"
                            class="text-left py-3 px-6 hover:bg-white/5 text-sm font-mono text-white transition-colors">Download</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Marquee Separator -->
        <div class="w-full overflow-hidden py-10 border-y border-app reveal-section">
            <Moving />
        </div>

        <!-- Skills Section -->
        <section class="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto reveal-section">
            <Skills />
        </section>

        <!-- Divider -->
        <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-6">
        </div>

        <!-- Crafts Section -->
        <section class="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <h2 class="text-center font-display text-4xl mb-6 reveal-section">Selected <span
                    class="text-accent-gold font-serif italic">Crafts</span></h2>

            <MovingIcons />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <NuxtLink v-for="(craft, i) in Crafts.slice(0, 4)" :key="i" :to="craft.link"
                    class="group relative block rounded-2xl overflow-hidden glass border border-white/10 hover:border-accent-gold/30 transition-all duration-500 reveal-section">
                    <div class="aspect-video w-full overflow-hidden">
                        <NuxtImg :src="craft.image" :alt="craft.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <!-- Overlay -->
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span
                                class="px-6 py-2 rounded-full border border-white text-white font-medium tracking-wide">View
                                Project</span>
                        </div>
                    </div>

                    <div class="p-6">
                        <h3
                            class="text-2xl font-display font-medium mb-2 group-hover:text-accent-gold transition-colors">
                            {{ craft.title }}</h3>
                        <p class="text-on-muted text-sm line-clamp-2">{{ craft.description }}</p>
                    </div>
                </NuxtLink>
            </div>

            <div class="text-center mt-12 reveal-section">
                <NuxtLink to="/crafts"
                    class="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-app hover:bg-white/5 transition-all duration-300">
                    <span>View All Crafts</span>
                    <Icon icon="ph:arrow-right" />
                </NuxtLink>
            </div>
        </section>

        <!-- Divider -->
        <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-6">
        </div>

        <!-- Experience & Bio (Combined for better flow) -->
        <section class="relative z-10 py-10 px-4 md:px-8 max-w-5xl mx-auto mb-20">
            <h2 class="text-center font-display text-4xl mb-16 reveal-section">My Developer <span
                    class="italic font-serif text-teal-400">Life</span></h2>

            <div class="grid md:grid-cols-2 gap-16">
                <!-- Bio Cards -->
                <div class="space-y-6 reveal-section">
                    <div class="p-6 rounded-2xl glass border border-white/10">
                        <p class="text-on-muted leading-relaxed font-sans">
                            I like to craft solid and scalable products with exceptional user experiences, focusing on
                            innovation and problem-solving across various industries.
                        </p>
                    </div>

                    <div class="flex gap-4">
                        <a href="https://www.instagram.com/justin_axo" target="_blank"
                            class="flex-1 p-6 rounded-2xl glass border border-white/10 hover:border-pink-500/50 transition-colors group text-center cursor-pointer">
                            <Icon icon="skill-icons:instagram"
                                class="w-8 h-8 mx-auto mb-3 grayscale group-hover:grayscale-0 transition-all" />
                            <span class="block text-xs font-mono opacity-60">@justin_axo</span>
                        </a>
                        <a href="https://www.linkedin.com/in/justin-arinze-627137382" target="_blank"
                            class="flex-1 p-6 rounded-2xl glass border border-white/10 hover:border-blue-500/50 transition-colors group text-center cursor-pointer">
                            <Icon icon="skill-icons:linkedin"
                                class="w-8 h-8 mx-auto mb-3 grayscale group-hover:grayscale-0 transition-all" />
                            <span class="block text-xs font-mono opacity-60">@arinzejustin</span>
                        </a>
                    </div>
                </div>

                <!-- Timeline -->
                <div class="space-y-8 reveal-section">
                    <div v-for="(exp, i) in experiences" :key="i" class="relative pl-8 border-l border-app">
                        <span
                            class="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-surface-dark border-2 border-accent-gold"></span>
                        <span class="text-xs font-mono text-accent-gold/80 block mb-1">{{ exp.year }}</span>
                        <h4 class="text-lg font-medium text-on-light dark:text-white">{{ exp.role }}</h4>
                        <div class="flex items-center gap-2 mt-1 opacity-70">
                            <Icon icon="ph:buildings" class="w-4 h-4" />
                            <span class="text-sm">{{ exp.company }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Divider -->
        <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-6">
        </div>
    </div>
</template>

<style scoped>
.glass {
    @apply bg-white/5 backdrop-blur-md;
}

.animate-spin-slow {
    animation: spin 10s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-bounce-slow {
    animation: bounce 2s infinite;
}

.animate-gradient-p {
    background-size: 200% 200%;
    animation: gradientShift 5s ease infinite;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
