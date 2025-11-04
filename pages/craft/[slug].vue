<template>
    <div class="relative">
        <div class="w-full relative z-50 md:max-w-4xl mx-auto px-4 py-8">
            <div v-if="loading" class="flex min-h-[50vh] justify-center">
                <CircleLoader
                    :height="'80px'"
                    :width="'80px'"
                    :auto="'auto'"
                    divClass="flex justify-center flex-col min-h-[50vh]"
                    className="dark:border-[white_white_transparent] border-[black_black_transparent] change"
                />
            </div>
            <Transition name="blur">
                <div v-if="!loading" class="my-4 py-4 pb-1">
                    <div class="flex flex-col gap-4 mb-4">
                        <h1
                            class="text-[32px] blur-text md:text-[42px] font-bold tracking-[-.03em] leading-[110%] font-mono"
                        >
                            {{ currentCraft?.title }}
                        </h1>
                        <p
                            class="md:text-[18px] blur-text font-display text-on-light/60 dark:text-on-dark/80"
                        >
                            {{ currentCraft?.subtitle }}
                        </p>
                    </div>
                    <div
                        class="gap-6 [background:linear-gradient(45deg,#f1f1f1,theme(colors.surface.light)_50%,#f0f0f0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] dark:[background:linear-gradient(45deg,#121212,theme(colors.surface.dark)_50%,#151515)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] border-transparent animate-border p-6 md:p-8 rounded-[20px] border-[0.5px] border-app mt-6"
                    >
                        <div class="prose max-w-none">
                            <h3 class="text-[16px] font-bold mb-2 blur-text">
                                Description
                            </h3>
                            <p
                                class="text-[16px] text-on-light/60 dark:text-on-dark/80 leading-relaxed blur-text"
                            >
                                {{ currentCraft?.description }}
                            </p>
                        </div>
                        <div class="border-b border-app my-[25px]"></div>
                        <div>
                            <h3
                                class="text-[16px] font-semibold my-2 blur-text"
                            >
                                Technologies
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="tech in currentCraft?.techstack"
                                    :key="tech"
                                    class="bg-[#e1f9dc] text-[#178d00] px-3 py-1 rounded-full text-sm font-sans blur-text"
                                    >{{ tech }}</span
                                >
                            </div>
                        </div>
                        <div class="border-b border-app my-[25px]"></div>
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3"
                        >
                            <div>
                                <h3 class="text-[16px] font-semibold mb-2">
                                    Date
                                </h3>
                                <p
                                    class="text-[14px] text-on-light/60 dark:text-on-dark/80 blur-text"
                                >
                                    {{ currentCraft?.date }}
                                </p>
                            </div>
                            <div>
                                <h3 class="text-[16px] font-semibold mb-2">
                                    Features
                                </h3>
                                <div
                                    class="text-[14px] text-on-light/60 dark:text-on-dark/80 blur-text"
                                >
                                    <ul class="list-disc list-inside">
                                        <li
                                            v-for="(
                                                feature, i
                                            ) in currentCraft?.features"
                                            :key="i"
                                        >
                                            {{ feature }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="">
                                <h3 class="text-[16px] font-semibold mb-2">
                                    Client
                                </h3>
                                <p
                                    class="text-[14px] text-on-light/60 dark:text-on-dark/80 blur-text"
                                >
                                    {{ currentCraft?.client }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="pt-6 mt-6 mb-0 pb-0 flex flex-col md:flex-row justify-between items-center align-middle gap-y-5 md:gap-y-0"
                    >
                        <div>
                            <NuxtLink
                                target="_blank"
                                role="button"
                                :to="currentCraft?.liveUrl"
                                class="relative inline-flex items-center justify-center px-6 py-3 rounded-3xl text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:pr-4 transition-all duration-700"
                            >
                                <!-- Animated gradient border -->
                                <span
                                    class="gradient-ring pointer-events-none"
                                ></span>

                                <!-- Button text -->
                                <span
                                    class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans"
                                >
                                    Live Page
                                    <Icon
                                        icon="fluent:open-24-regular"
                                        width="22"
                                        height="22"
                                        inline
                                        class="group-hover:text-on-light group-hover:dark:text-on-dark text-on-dark dark:text-on-light inline ml-1 mr-2"
                                    />
                                </span>
                            </NuxtLink>
                        </div>
                        <div class="flex justify-between gap-x-4">
                            <NuxtLink
                                v-if="prevCraft"
                                :to="prevCraft.link"
                                class="relative inline-flex items-center justify-center px-4 py-3 rounded-3xl text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-5 transition-all duration-700"
                            >
                                <!-- Animated gradient border -->
                                <span
                                    class="gradient-ring pointer-events-none"
                                ></span>

                                <!-- Button text -->
                                <span
                                    class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans"
                                >
                                    <Icon
                                        icon="si:chevron-left-duotone"
                                        width="22"
                                        height="22"
                                        inline
                                        class="group-hover:text-on-light group-hover:dark:text-on-dark text-on-dark dark:text-on-light inline mr-1"
                                    />
                                    Previous
                                </span>
                            </NuxtLink>
                            <NuxtLink
                                v-if="nextCraft"
                                :to="nextCraft.link"
                                class="relative inline-flex items-center justify-center px-4 py-3 rounded-3xl text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-5 transition-all duration-700"
                            >
                                <!-- Animated gradient border -->
                                <span
                                    class="gradient-ring pointer-events-none"
                                ></span>

                                <!-- Button text -->
                                <span
                                    class="relative z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300 blur-text font-sans"
                                >
                                    Next
                                    <Icon
                                        icon="si:chevron-right-duotone"
                                        width="22"
                                        height="22"
                                        inline
                                        class="group-hover:text-on-light group-hover:dark:text-on-dark text-on-dark dark:text-on-light inline ml-1"
                                    />
                                </span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="border-b border-app my-8 mb-5"></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import gsap from "gsap";
import { Icon } from "@iconify/vue";
import CraftsData from "@/assets/json/crafts.json";
import type { Craft } from "~/types/crafts";

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
        this.animate();
        this.findCraft();
        this.updateHead();

        await new Promise((resolve) => setTimeout(resolve, 800));
        this.loading = false;

        // Wait 1.2s (simulate loading or transitions)
        await new Promise((resolve) => setTimeout(resolve, 500));
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
                                start: "top 85%", // when element is 85% from top
                                toggleActions: "play none none none",
                            },
                            onComplete: () => {
                                gsap.set(el, { clearProps: "all" }); // Clear all inline styles after animation
                            },
                        },
                    );
                });

            // Animate divs with slide-in
            gsap.utils
                .toArray<HTMLElement>(".slide-app")
                .forEach((el: HTMLElement) => {
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
                        onComplete: () => {
                            gsap.set(el, { clearProps: "all" }); // Clear all inline styles after animation
                        },
                    });
                });
        },
    },
});
</script>
