<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import CraftsData from "@/assets/json/crafts.json";
import type { Craft } from "@/types/crafts";

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
    },

    data() {
        return {
            Crafts: CraftsData as Craft[],
        };
    },

    components: {
        Icon,
    },
});
</script>

<template>
    <div class="relative pt-32">
        <div class="w-full relative z-50 md:max-w-4xl mx-auto px-4 py-8">
            <div class="my-4 mb-1 py-4 pb-8">
                <MovingIcons />
            </div>
            <div
                class="py-4 grid-cols-1 md:grid-cols-2 gap-8 grid align-middle items-center"
            >
                <NuxtLink
                    :to="craft.link"
                    v-for="(craft, i) in Crafts"
                    :key="i"
                    class="w-full rounded-2xl overflow-hidden border-[1.5px] border-app relative transition-all shadow-lg bg-slate-50 dark:bg-[#121212]"
                >
                    <div class="px-5 pt-5 pb-7 rounded-2xl group">
                        <div
                            class="relative w-full h-[200px] overflow-hidden rounded-2xl"
                        >
                            <NuxtImg
                                :alt="craft.title"
                                loading="lazy"
                                width="700"
                                height="380"
                                decoding="async"
                                class="w-full h-auto object-contain rounded-2xl text-transparent transition-transform duration-700 hover:scale-105"
                                :custom="true"
                                v-slot="{ src, isLoaded, imgAttrs }"
                                :src="craft.image"
                                :srcset="craft.image"
                            >
                                <!-- Show the actual image when loaded -->
                                <img
                                    v-if="isLoaded"
                                    v-bind="imgAttrs"
                                    :src="src"
                                />

                                <!-- Show a placeholder while loading -->
                                <img
                                    v-else
                                    class="w-full h-auto object-contain rounded-2xl text-transparent transition-transform duration-700 hover:scale-105"
                                    src="https://placehold.co/700x380"
                                    srcset="https://placehold.co/700x380"
                                    :alt="craft.title"
                                />
                            </NuxtImg>
                        </div>
                    </div>
                    <div class="px-7 pb-7 space-y-5">
                        <h3
                            class="text-2xl font-semibold font-sans mb-2 pb-3 blur-text px-4 border-b border-app"
                        >
                            {{ craft.title }}
                        </h3>
                        <p class="text-base line-clamp-2 blur-text">
                            {{ craft.description }}
                        </p>
                        <a
                            role="button"
                            class="relative inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-medium overflow-hidden group bg-surface-dark dark:bg-surface-light text-on-light dark:text-on-dark hover:bg-transparent dark:hover:bg-transparent hover:px-7 hover:pr-4 transition-all duration-700"
                        >
                            <!-- Animated gradient border -->
                            <span
                                class="gradient-ring pointer-events-none"
                            ></span>

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
        </div>
        <div class="w-full my-8 border-b border-app mb-4"></div>
    </div>
</template>

<style scoped></style>
