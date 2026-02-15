<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CraftsData from "@/assets/json/crafts.json";
import type { Craft } from "@/types/crafts";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
    setup() {
        useHead({
            title: "My Crafts | Justin Arinze – Software Engineer, Tech Lead, and Founder | Portfolio & Projects",
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
                    content: "https://arinzejustin.netlify.app/crafts",
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
                {
                    rel: "canonical",
                    href: "https://arinzejustin.netlify.app/crafts",
                },
            ],
        });

        const hoveredIndex = ref<number | null>(null);

        return { hoveredIndex };
    },

    data() {
        return {
            Crafts: CraftsData as Craft[],
        };
    },

    components: {
        Icon,
    },

    mounted() {
        // Hero header entrance
        gsap.from(".crafts-hero-text", {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.15,
        });

        // Orbital entrance
        gsap.fromTo(".orbital-container",
            { opacity: 0, scale: 0.6, rotate: -30 },
            { opacity: 1, scale: 1, rotate: 0, duration: 1.8, ease: "elastic.out(1, 0.6)", delay: 0.5 }
        );

        // Stagger-reveal craft cards
        gsap.utils.toArray<HTMLElement>(".craft-card").forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 80, scale: 0.96 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    }
                }
            );
        });
    },
});
</script>

<template>
    <div class="relative bg-surface-light dark:bg-surface-dark min-h-screen overflow-x-hidden">

        <!-- Background noise -->
        <div class="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0 bg-[url('/image/noise.png')]">
        </div>

        <!-- Hero Section -->
        <section class="relative z-10 pt-36 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div class="flex items-center justify-between gap-8">
                <!-- Left: Text Content -->
                <div class="space-y-5 max-w-3xl flex-1">
                    <div class="crafts-hero-text flex items-center gap-3">
                        <div class="w-12 h-px bg-accent-gold"></div>
                        <span class="text-accent-gold font-mono text-sm uppercase tracking-[0.2em]">Portfolio</span>
                    </div>
                    <h1
                        class="crafts-hero-text font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]">
                        Selected<br />
                        <span class="font-serif italic text-accent-gold">Crafts</span>
                    </h1>
                    <p class="crafts-hero-text text-on-muted text-lg md:text-xl max-w-lg leading-relaxed">
                        A curated collection of projects each one built with precision, pixel-perfect execution, and a
                        drive
                        for innovation.
                    </p>
                    <div class="crafts-hero-text flex items-center gap-4 pt-2">
                        <span class="text-on-muted font-mono text-sm">{{ Crafts.length }} Projects</span>
                        <div class="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></div>
                    </div>
                </div>

                <!-- Right: Animated Orbital Glassmorphic Design -->
                <div class="hidden md:flex items-center justify-center flex-shrink-0 orbital-container">
                    <div class="relative w-[320px] h-[320px] lg:w-[380px] lg:h-[380px]">

                        <!-- Ambient Glow -->
                        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-accent-gold/15 via-teal-400/10 to-purple-500/10 blur-[60px] animate-pulse-slow"></div>

                        <!-- Outer Orbit Ring -->
                        <div class="absolute inset-0 rounded-full border border-app orbit-ring-outer">
                            <!-- Orbiting Dot 1 -->
                            <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-gold shadow-[0_0_12px_rgba(212,175,55,0.6)]"></div>
                            <!-- Orbiting Dot 2 -->
                            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></div>
                        </div>

                        <!-- Middle Orbit Ring -->
                        <div class="absolute inset-10 lg:inset-12 rounded-full border border-app orbit-ring-middle">
                            <!-- Orbiting Dot -->
                            <div class="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        </div>

                        <!-- Inner Orbit Ring -->
                        <div class="absolute inset-[72px] lg:inset-[88px] rounded-full border border-dashed border-app orbit-ring-inner">
                            <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"></div>
                        </div>

                        <!-- Center Element -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="relative w-24 h-24 lg:w-28 lg:h-28 rounded-[24px] glass-card border border-app flex items-center justify-center center-float">
                                <!-- Inner glow -->
                                <div class="absolute inset-0 rounded-[24px] bg-gradient-to-br from-accent-gold/20 to-teal-400/10 opacity-60"></div>
                                <!-- Code Symbol -->
                                <div class="relative z-10 text-center">
                                    <span class="text-3xl lg:text-4xl font-mono font-bold text-accent-gold code-pulse">&lt;/&gt;</span>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Shapes -->
                        <!-- Diamond -->
                        <div class="absolute top-6 right-8 lg:top-8 lg:right-10 w-8 h-8 rotate-45 rounded-md glass-card border border-app shape-float-1"></div>
                        <!-- Circle -->
                        <div class="absolute bottom-10 left-4 lg:bottom-12 lg:left-6 w-6 h-6 rounded-full glass-card border border-teal-400/20 shape-float-2"></div>
                        <!-- Small square -->
                        <div class="absolute top-1/3 left-2 lg:left-3 w-5 h-5 rounded-sm glass-card border border-purple-400/20 shape-float-3"></div>
                        <!-- Dot cluster -->
                        <div class="absolute bottom-16 right-6 flex gap-1.5">
                            <div class="w-1.5 h-1.5 rounded-full bg-accent-gold/40 animate-pulse"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-teal-400/40 animate-pulse" style="animation-delay: 0.3s"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-pulse" style="animation-delay: 0.6s"></div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Project (First Craft - Hero Card) -->
        <section class="relative z-10 px-4 md:px-8 max-w-6xl mx-auto pb-16 craft-card">
            <NuxtLink :to="Crafts[0].link"
                class="group block relative rounded-[28px] overflow-hidden border border-app hover:border-accent-gold/30 transition-all duration-700"
                @mouseenter="hoveredIndex = -1" @mouseleave="hoveredIndex = null">

                <!-- Image -->
                <div class="relative w-full aspect-[16/8] md:aspect-[16/7] overflow-hidden">
                    <NuxtImg :src="Crafts[0].image" :alt="Crafts[0].title" loading="lazy" decoding="async"
                        class="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                        :custom="true" v-slot="{ src, isLoaded, imgAttrs }">
                        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
                        <div v-else class="w-full h-full skeleton-loader" />
                    </NuxtImg>

                    <!-- Gradient Overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500">
                    </div>

                    <!-- Featured Badge -->
                    <div
                        class="absolute top-6 left-6 px-4 py-1.5 bg-accent-gold/90 text-surface-dark text-xs font-bold font-mono uppercase tracking-widest rounded-full">
                        Featured
                    </div>

                    <!-- Content Overlay -->
                    <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                        <div class="max-w-2xl space-y-4">
                            <h2
                                class="text-white font-display text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
                                {{ Crafts[0].title }}
                            </h2>
                            <p class="text-white/70 text-base md:text-lg leading-relaxed line-clamp-2 max-w-xl">
                                {{ Crafts[0].description }}
                            </p>

                            <div class="flex flex-wrap gap-2 pt-2">
                                <span v-for="tech in Crafts[0].techstack.slice(0, 5)" :key="tech"
                                    class="px-3 py-1 text-xs font-mono border border-white/20 text-white/80 rounded-full backdrop-blur-sm">
                                    {{ tech }}
                                </span>
                                <span v-if="Crafts[0].techstack.length > 5"
                                    class="px-3 py-1 text-xs font-mono text-white/50">
                                    +{{ Crafts[0].techstack.length - 5 }} more
                                </span>
                            </div>

                            <div
                                class="inline-flex items-center gap-2 pt-4 text-accent-gold font-medium group-hover:gap-4 transition-all duration-500">
                                <span class="text-sm font-mono uppercase tracking-widest">View Case Study</span>
                                <Icon icon="ph:arrow-right"
                                    class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </section>

        <!-- Divider -->
        <div class="max-w-6xl mx-auto px-4 md:px-8">
            <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent">
            </div>
        </div>

        <!-- Project Grid -->
        <section class="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <NuxtLink v-for="(craft, i) in Crafts.slice(1)" :key="i" :to="craft.link"
                    class="craft-card group relative block rounded-[24px] overflow-hidden border border-white/10 hover:border-accent-gold/20 transition-all duration-500 bg-white/[0.02] dark:bg-white/[0.02]"
                    @mouseenter="hoveredIndex = i" @mouseleave="hoveredIndex = null">

                    <!-- Image Area -->
                    <div class="relative w-full aspect-video overflow-hidden">
                        <NuxtImg :src="craft.image" :alt="craft.title" loading="lazy" decoding="async"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            :custom="true" v-slot="{ src, isLoaded, imgAttrs }">
                            <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />
                            <div v-else class="w-full h-full skeleton-loader" />
                        </NuxtImg>

                        <!-- Hover Overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                            <div class="p-6 w-full">
                                <div class="flex flex-wrap gap-1.5">
                                    <span v-for="tech in craft.techstack.slice(0, 4)" :key="tech"
                                        class="px-2.5 py-1 text-[11px] font-mono border border-white/20 text-white/90 rounded-full backdrop-blur-sm">
                                        {{ tech }}
                                    </span>
                                    <span v-if="craft.techstack.length > 4"
                                        class="px-2.5 py-1 text-[11px] font-mono text-white/50">
                                        +{{ craft.techstack.length - 4 }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Date badge -->
                        <div
                            class="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white/70 text-xs font-mono rounded-full border border-white/10">
                            {{ craft.date }}
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6 md:p-7 space-y-3">
                        <div class="flex items-start justify-between gap-4">
                            <div class="space-y-1.5 flex-1">
                                <h3
                                    class="text-xl md:text-2xl font-display font-semibold tracking-tight group-hover:text-accent-gold transition-colors duration-300">
                                    {{ craft.title }}
                                </h3>
                                <p v-if="craft.subtitle" class="text-on-muted text-sm font-mono">
                                    {{ craft.subtitle }}
                                </p>
                            </div>
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-gold/40 group-hover:bg-accent-gold/10 transition-all duration-300">
                                <Icon icon="ph:arrow-up-right"
                                    class="w-4 h-4 text-on-muted group-hover:text-accent-gold transition-colors" />
                            </div>
                        </div>

                        <p class="text-on-muted text-sm leading-relaxed line-clamp-2">
                            {{ craft.description }}
                        </p>

                        <!-- Bottom Meta -->
                        <div class="flex items-center gap-3 pt-3 border-t border-white/5">
                            <span v-if="craft.client" class="text-xs font-mono text-on-muted">
                                <Icon icon="ph:buildings" class="w-3.5 h-3.5 inline mr-1 opacity-50" />
                                {{ craft.client }}
                            </span>
                            <span class="text-white/10">·</span>
                            <span class="text-xs font-mono text-on-muted">{{ craft.features.length }} Features</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </section>

        <!-- Bottom CTA -->
        <section class="relative z-10 py-20 px-4 md:px-8 max-w-4xl mx-auto text-center craft-card">
            <div
                class="p-12 md:p-16 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
                <h3 class="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Interested in <span class="font-serif italic text-accent-gold">working together?</span>
                </h3>
                <p class="text-on-muted text-lg mb-8 max-w-md mx-auto">
                    I'm always open to discussing new projects, creative ideas, or opportunities.
                </p>
                <NuxtLink to="#hireme"
                    class="inline-flex items-center gap-3 px-8 py-4 bg-accent-gold text-surface-dark font-bold font-display uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-sm">
                    <span>Get in Touch</span>
                    <Icon icon="ph:arrow-right" class="w-5 h-5" />
                </NuxtLink>
            </div>
        </section>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mb-4">
        </div>
    </div>
</template>

<style scoped>
/* Orbit Rotations */
.orbit-ring-outer {
    animation: orbitSpin 20s linear infinite;
}
.orbit-ring-middle {
    animation: orbitSpin 14s linear infinite reverse;
}
.orbit-ring-inner {
    animation: orbitSpin 10s linear infinite;
}

@keyframes orbitSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Center Float */
.center-float {
    animation: centerFloat 5s ease-in-out infinite;
}
@keyframes centerFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-8px) scale(1.03); }
}

/* Code symbol pulse */
.code-pulse {
    animation: codePulse 3s ease-in-out infinite;
}
@keyframes codePulse {
    0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
    50% { opacity: 0.8; text-shadow: 0 0 25px rgba(212, 175, 55, 0.6); }
}

/* Floating shapes */
.shape-float-1 {
    animation: shapeFloat1 6s ease-in-out infinite;
}
@keyframes shapeFloat1 {
    0%, 100% { transform: rotate(45deg) translateY(0); }
    50% { transform: rotate(45deg) translateY(-10px); }
}

.shape-float-2 {
    animation: shapeFloat2 7s ease-in-out infinite;
}
@keyframes shapeFloat2 {
    0%, 100% { transform: translateY(0) translateX(0); }
    33% { transform: translateY(-8px) translateX(4px); }
    66% { transform: translateY(4px) translateX(-4px); }
}

.shape-float-3 {
    animation: shapeFloat3 5s ease-in-out infinite;
}
@keyframes shapeFloat3 {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(10deg); }
}

/* Glass card effect */
.glass-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}

/* Slow pulse for ambient glow */
.animate-pulse-slow {
    animation: pulseSlow 4s ease-in-out infinite;
}
@keyframes pulseSlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
}
</style>
