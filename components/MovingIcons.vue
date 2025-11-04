<template>
    <div class="w-40 overflow-hidden relative mx-auto slide-app">
        <!-- Moving Track -->
        <div ref="track" class="flex flex-row relative w-full">
            <!-- Duplicate the icons array twice for seamless looping -->
            <div
                v-for="(icon, i) in [...icons, ...icons]"
                :key="i"
                class="flex-shrink-0 w-8 h-8 mx-3 flex items-center justify-center"
            >
                <Icon :icon="icon" class="w-8 h-8 text-foreground" />
            </div>
        </div>

        <!-- Gradient Overlays -->
        <div
            class="absolute top-0 left-0 w-[4rem] z-10 h-full bg-gradient-to-r from-surface-light dark:from-surface-dark to-transparent pointer-events-none"
        ></div>
        <div
            class="absolute top-0 right-0 w-[4rem] z-10 h-full bg-gradient-to-l from-surface-light dark:from-surface-dark to-transparent pointer-events-none"
        ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";

export default defineComponent({
    name: "LanguageMarquee",
    components: { Icon },
    setup() {
        const icons = ref([
            "logos:html-5",
            "logos:css-3",
            "logos:tailwindcss-icon",
            "logos:javascript",
            "logos:typescript-icon",
            "logos:vue",
            "logos:sass",
            "logos:nodejs-icon",
            "logos:nuxt-icon",
            "logos:electron",
            "logos:flutter",
            "logos:php",
            "logos:python",
            "devicon:svelte",
            "devicon:git",
            "devicon:go",
            "devicon:docker",
            "devicon:github",
            "devicon:postman",
        ]);

        const track = ref<HTMLElement | null>(null);

        onMounted(async () => {
            await nextTick();

            if (track.value) {
                const halfWidth = track.value.scrollWidth / 2;

                gsap.to(track.value, {
                    x: -halfWidth,
                    duration: 30,
                    ease: "linear",
                    repeat: -1,
                    onRepeat: () => {
                        gsap.set(track.value, { x: 0 });
                    },
                });
            }
        });

        return { icons, track };
    },
});
</script>
