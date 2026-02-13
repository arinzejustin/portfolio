<template>
    <div class="relative bg-surface-light dark:bg-surface-dark min-h-screen overflow-x-hidden">

        <!-- Background noise -->
        <div class="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0 bg-[url('/image/noise.png')]">
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex min-h-[70vh] justify-center items-center relative z-10">
            <CircleLoader :height="'30px'" :width="'30px'" :auto="'auto'"
                divClass="flex justify-center flex-col min-h-[50vh]"
                className="dark:border-[white_white_transparent] border-[black_black_transparent] change" />
        </div>

        <Transition name="blur">
            <div v-if="!loading" class="relative z-10">

                <!-- Hero Image Banner -->
                <section class="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
                    <NuxtImg v-if="currentCraft" :src="currentCraft.image" :alt="currentCraft.title"
                        loading="lazy" decoding="async"
                        class="w-full h-full object-cover scale-105 craft-hero-img"
                        :custom="true" v-slot="{ src, isLoaded, imgAttrs }">
                        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
                        <img v-else
                            class="w-full h-full object-cover scale-105"
                            src="https://placehold.co/1400x600"
                            :alt="currentCraft.title" />
                    </NuxtImg>

                    <!-- Gradient overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-surface-light dark:from-surface-dark via-surface-light/60 dark:via-surface-dark/60 to-transparent">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-surface-light/40 dark:from-surface-dark/40 to-transparent">
                    </div>

                    <!-- Back button -->
                    <NuxtLink to="/crafts"
                        class="absolute top-28 left-4 md:left-8 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 dark:bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-mono hover:bg-black/50 dark:hover:bg-white/20 transition-all duration-300 slide-app">
                        <Icon icon="ph:arrow-left" class="w-4 h-4" />
                        <span>All Crafts</span>
                    </NuxtLink>

                    <!-- Title overlay at bottom -->
                    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">
                        <div class="space-y-3">
                            <div class="flex items-center gap-3 slide-app">
                                <span
                                    class="px-3 py-1 text-xs font-mono uppercase tracking-widest bg-accent-gold/90 text-surface-dark rounded-full font-bold">
                                    {{ currentCraft?.date }}
                                </span>
                                <span v-if="currentCraft?.client"
                                    class="text-xs font-mono text-on-muted">
                                    <Icon icon="ph:buildings" class="w-3.5 h-3.5 inline mr-1 opacity-60" />
                                    {{ currentCraft?.client }}
                                </span>
                            </div>
                            <h1
                                class="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] blur-text">
                                {{ currentCraft?.title }}
                            </h1>
                            <p v-if="currentCraft?.subtitle"
                                class="text-on-muted text-lg md:text-xl font-mono blur-text">
                                {{ currentCraft?.subtitle }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Main Content -->
                <section class="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        <!-- Left Column (Main Content) -->
                        <div class="lg:col-span-2 space-y-12">

                            <!-- Description -->
                            <div class="slide-app">
                                <div class="flex items-center gap-3 mb-5">
                                    <div class="w-8 h-px bg-accent-gold"></div>
                                    <span
                                        class="text-accent-gold font-mono text-xs uppercase tracking-[0.2em]">Overview</span>
                                </div>
                                <p
                                    class="text-on-light/80 dark:text-on-dark/80 text-lg md:text-xl leading-[1.8] font-sans blur-text">
                                    {{ currentCraft?.description }}
                                </p>
                            </div>

                            <!-- Features -->
                            <div class="slide-app">
                                <div class="flex items-center gap-3 mb-6">
                                    <div class="w-8 h-px bg-teal-400"></div>
                                    <span
                                        class="text-teal-400 font-mono text-xs uppercase tracking-[0.2em]">Key Features</span>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div v-for="(feature, i) in currentCraft?.features" :key="i"
                                        class="group flex items-start gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 blur-text">
                                        <div
                                            class="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center mt-0.5">
                                            <Icon icon="ph:check-bold"
                                                class="w-4 h-4 text-teal-400" />
                                        </div>
                                        <span class="text-on-light/70 dark:text-on-dark/70 text-sm leading-relaxed">{{ feature
                                            }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column (Sidebar) -->
                        <div class="space-y-6 lg:sticky lg:top-28 lg:self-start">

                            <!-- Tech Stack -->
                            <div
                                class="p-6 rounded-[20px] border border-white/10 bg-white/[0.02] dark:bg-white/[0.02] slide-app">
                                <h3
                                    class="text-sm font-mono uppercase tracking-[0.15em] text-on-muted mb-4">
                                    Tech Stack</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tech in currentCraft?.techstack" :key="tech"
                                        class="px-3 py-1.5 text-xs font-mono rounded-full border border-white/10 bg-white/5 text-on-light/70 dark:text-on-dark/70 hover:border-accent-gold/30 hover:text-accent-gold transition-all duration-300 blur-text">
                                        {{ tech }}
                                    </span>
                                </div>
                            </div>

                            <!-- Project Info -->
                            <div
                                class="p-6 rounded-[20px] border border-white/10 bg-white/[0.02] dark:bg-white/[0.02] space-y-5 slide-app">
                                <div>
                                    <span
                                        class="text-xs font-mono uppercase tracking-[0.15em] text-on-muted block mb-1.5">Year</span>
                                    <span
                                        class="text-on-light dark:text-on-dark font-display font-medium blur-text">{{ currentCraft?.date }}</span>
                                </div>
                                <div class="w-full h-px bg-white/5"></div>
                                <div v-if="currentCraft?.client">
                                    <span
                                        class="text-xs font-mono uppercase tracking-[0.15em] text-on-muted block mb-1.5">Client</span>
                                    <span
                                        class="text-on-light dark:text-on-dark font-display font-medium blur-text">{{ currentCraft?.client }}</span>
                                </div>
                                <div v-if="currentCraft?.client" class="w-full h-px bg-white/5"></div>
                                <div>
                                    <span
                                        class="text-xs font-mono uppercase tracking-[0.15em] text-on-muted block mb-1.5">Features</span>
                                    <span
                                        class="text-on-light dark:text-on-dark font-display font-medium blur-text">{{ currentCraft?.features.length
                                        }} Key Features</span>
                                </div>
                            </div>

                            <!-- Live Link CTA -->
                            <a v-if="currentCraft?.liveUrl && currentCraft.liveUrl !== 'https://'" :href="currentCraft.liveUrl"
                                target="_blank"
                                class="block w-full p-5 rounded-[20px] bg-accent-gold text-surface-dark font-bold font-display text-center uppercase tracking-widest hover:bg-white transition-colors duration-300 slide-app">
                                <div class="flex items-center justify-center gap-3">
                                    <span class="text-sm">Visit Live Project</span>
                                    <Icon icon="fluent:open-24-regular" class="w-5 h-5" />
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                <!-- Navigation -->
                <section class="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pb-16">
                    <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mb-10">
                    </div>
                    <div class="flex justify-between items-stretch gap-4">
                        <!-- Previous -->
                        <NuxtLink v-if="prevCraft" :to="prevCraft.link"
                            class="group flex-1 max-w-[45%] p-5 md:p-6 rounded-[20px] border border-white/10 hover:border-accent-gold/20 transition-all duration-300 bg-white/[0.02] slide-app">
                            <div class="flex items-center gap-2 mb-2 text-on-muted">
                                <Icon icon="ph:arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span class="text-xs font-mono uppercase tracking-widest">Previous</span>
                            </div>
                            <h4
                                class="text-on-light dark:text-on-dark font-display font-medium text-lg group-hover:text-accent-gold transition-colors truncate">
                                {{ prevCraft.title }}
                            </h4>
                        </NuxtLink>

                        <!-- Spacer if no prev -->
                        <div v-else></div>

                        <!-- Next -->
                        <NuxtLink v-if="nextCraft" :to="nextCraft.link"
                            class="group flex-1 max-w-[45%] p-5 md:p-6 rounded-[20px] border border-white/10 hover:border-accent-gold/20 transition-all duration-300 bg-white/[0.02] text-right slide-app">
                            <div class="flex items-center justify-end gap-2 mb-2 text-on-muted">
                                <span class="text-xs font-mono uppercase tracking-widest">Next</span>
                                <Icon icon="ph:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h4
                                class="text-on-light dark:text-on-dark font-display font-medium text-lg group-hover:text-accent-gold transition-colors truncate">
                                {{ nextCraft.title }}
                            </h4>
                        </NuxtLink>

                        <!-- Spacer if no next -->
                        <div v-else></div>
                    </div>
                </section>

                <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mb-4">
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/vue";
import CraftsData from "@/assets/json/crafts.json";
import type { Craft } from "~/types/crafts";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
    setup() {
        useHead({
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
                {
                    rel: "canonical",
                    href: "https://arinzejustin.netlify.app/crafts",
                },
            ],
        });

        const page = useRoute().path;

        return {
            page,
        };
    },

    components: {
        Icon,
    },

    data() {
        return {
            loading: true,
            crafts: CraftsData as Craft[],
            currentIndex: -1,
        };
    },

    computed: {
        currentCraft(): Craft | null {
            return this.currentIndex !== -1
                ? this.crafts[this.currentIndex]
                : null;
        },

        prevCraft(): Craft | null {
            return this.currentIndex > 0
                ? this.crafts[this.currentIndex - 1]
                : null;
        },

        nextCraft(): Craft | null {
            return this.currentIndex < this.crafts.length - 1
                ? this.crafts[this.currentIndex + 1]
                : null;
        },
    },

    async mounted() {
        this.findCraft();
        this.updateHead();

        await new Promise((resolve) => setTimeout(resolve, 600));
        this.loading = false;

        await new Promise((resolve) => setTimeout(resolve, 300));
        this.animate();
    },

    methods: {
        updateHead() {
            useHead({
                title: `${this.currentCraft?.title} | Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects`,
                meta: [
                    {
                        name: "description",
                        content: `${this.currentCraft?.description}`,
                    },
                    {
                        property: "og:description",
                        content: `${this.currentCraft?.description}`,
                    },
                    {
                        property: "og:url",
                        content: `https://arinzejustin.com/crafts/${this.page}`,
                    },
                ],
                link: [
                    {
                        rel: "canonical",
                        href: `https://arinzejustin.netlify.app/${this.page}`,
                    },
                ],
            });
        },

        findCraft() {
            const link = this.page;
            const index = this.crafts.findIndex((c) => c.link === link);
            this.currentIndex = index;
        },

        animate() {
            // Hero image parallax subtle zoom
            gsap.fromTo(".craft-hero-img",
                { scale: 1.15 },
                {
                    scale: 1.0,
                    duration: 1.8,
                    ease: "power2.out",
                });

            // Blur text animation
            gsap.utils
                .toArray<HTMLElement>(".blur-text")
                .forEach((el: HTMLElement) => {
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
                                start: "top 85%",
                                toggleActions: "play none none none",
                            },
                            onComplete: () => {
                                gsap.set(el, { clearProps: "all" });
                            },
                        },
                    );
                });

            // Slide in animation
            gsap.utils
                .toArray<HTMLElement>(".slide-app")
                .forEach((el: HTMLElement) => {
                    gsap.from(el, {
                        y: 60,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 92%",
                            toggleActions: "play none none none",
                        },
                        onComplete: () => {
                            gsap.set(el, { clearProps: "all" });
                        },
                    });
                });
        },
    },
});
</script>

<style scoped>
.blur-enter-active {
    transition: all 0.6s ease-out;
}

.blur-enter-from {
    opacity: 0;
    filter: blur(10px);
}

.blur-enter-to {
    opacity: 1;
    filter: blur(0);
}
</style>
