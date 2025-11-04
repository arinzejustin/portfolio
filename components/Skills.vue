<script lang="ts">
import { defineComponent, onMounted, onUnmounted, nextTick, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default defineComponent({
    name: "Skills",
    setup() {
        const skills = ref([
            {
                name: "HTML",
                level: "Professional",
                detail: "Expert in semantic HTML5, accessibility standards (WCAG), and SEO-optimized markup.",
            },
            {
                name: "CSS",
                level: "Professional",
                detail: "Advanced responsive design, CSS Grid, Flexbox, animations, and modern layout techniques.",
            },
            {
                name: "JavaScript",
                level: "Professional",
                detail: "Proficient in ES6+, async/await, DOM manipulation, Fetch API, and modern JS patterns.",
            },
            {
                name: "Vue",
                level: "Professional",
                detail: "Building scalable SPAs with Vue 3 Composition API, state management, and component architecture.",
            },
            {
                name: "Nuxt",
                level: "Intermediate",
                detail: "Server-side rendering (SSR), static site generation, and full-stack applications with Nuxt 3.",
            },
            {
                name: "Tailwind",
                level: "Professional",
                detail: "Expert in utility-first CSS, custom configurations, responsive design, and design systems.",
            },
            {
                name: "GSAP",
                level: "Intermediate",
                detail: "Creating complex animations, scroll-triggered effects, and interactive timeline-based animations.",
            },
            {
                name: "Electron",
                level: "Intermediate",
                detail: "Building cross-platform desktop applications with web technologies and native integrations.",
            },
            {
                name: "TypeScript",
                level: "Intermediate",
                detail: "Type-safe development, interfaces, generics, and improved developer experience with strong typing.",
            },
            {
                name: "Node.js",
                level: "Professional",
                detail: "Backend development with Express, RESTful APIs, middleware, and server-side JavaScript.",
            },
            {
                name: "MySQL",
                level: "Professional",
                detail: "Database design, complex queries, joins, indexing, optimization, and relational data modeling.",
            },
            {
                name: "Git",
                level: "Professional",
                detail: "Version control workflows, branching strategies, merge conflict resolution, and team collaboration.",
            },
            {
                name: "Postman",
                level: "Professional",
                detail: "API testing, documentation, automation, collection management, and environment configurations.",
            },
            {
                name: "Python",
                level: "Intermediate",
                detail: "Scripting, automation, data processing, and backend development with modern Python libraries.",
            },
            {
                name: "PHP",
                level: "Professional",
                detail: "Server-side web development, database integration, MVC patterns, and dynamic content generation.",
            },
            {
                name: "Linux",
                level: "Intermediate",
                detail: "Command-line proficiency, shell scripting, system administration, and server management basics.",
            },
            {
                name: "Go",
                level: "Intermediate",
                detail: "Concurrency, efficient memory management, and building scalable network services.",
            },
            {
                name: "Rust",
                level: "Beginner",
                detail: "Memory safety, ownership system, concurrency, and high-performance systems programming.",
            },
            {
                name: "Svelte",
                level: "Professional",
                detail: "Building reactive user interfaces with minimal boilerplate and optimal performance.",
            },
            {
                name: "Github",
                level: "Professional",
                detail: "Repository management, CI/CD workflows, pull requests, and collaborative development.",
            },
            {
                name: "Flutter",
                level: "Intermediate",
                detail: "Cross-platform mobile apps with Dart, widget composition, and Material/Cupertino design.",
            },
        ]);

        const scrollTriggerInstances = ref<ScrollTrigger[]>([]);

        const getBoxSize = () => {
            const width = window.innerWidth;
            if (width < 768) return 64;
            else if (width < 1024) return 80;
            else return 96;
        };

        onMounted(async () => {
            await nextTick();

            const container =
                document.querySelector<HTMLElement>("#skills-container");
            const boxes = gsap.utils.toArray<HTMLElement>(".skill-box-wrapper");

            if (!container) return;

            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const boxSize = getBoxSize();
            const padding = 16;

            // Calculate grid layout
            const ballsPerRow = Math.floor(
                (containerWidth - padding * 2) / boxSize,
            );
            const actualRowWidth = ballsPerRow * boxSize;
            const startX = (containerWidth - actualRowWidth) / 2;

            // FIXED: Calculate from TOP instead of bottom to prevent overflow
            const occupiedPositions: Array<{ x: number; y: number }> = [];

            const isPositionOccupied = (
                x: number,
                y: number,
                threshold = boxSize * 0.85,
            ) => {
                return occupiedPositions.some(
                    (pos) =>
                        Math.abs(pos.x - x) < threshold &&
                        Math.abs(pos.y - y) < threshold,
                );
            };

            const findNextPosition = () => {
                const rowHeight = boxSize * 1.0; // Better spacing
                const startFromTop = boxSize / 2 + padding; // Start from top with padding

                for (let row = 0; row < 15; row++) {
                    const y = startFromTop + row * rowHeight;

                    // Don't place balls below visible area
                    if (y > containerHeight - boxSize / 2) continue;

                    // Try regular positions
                    for (let col = 0; col < ballsPerRow; col++) {
                        const x = startX + col * boxSize + boxSize / 2;
                        if (!isPositionOccupied(x, y)) {
                            return { x, y };
                        }
                    }

                    // Try offset positions
                    for (let col = 0; col < ballsPerRow - 1; col++) {
                        const x = startX + col * boxSize + boxSize;
                        if (!isPositionOccupied(x, y)) {
                            return { x, y };
                        }
                    }
                }

                // Fallback - safe position
                return {
                    x: containerWidth / 2,
                    y:
                        startFromTop +
                        (occupiedPositions.length % 4) * rowHeight,
                };
            };

            boxes.forEach((wrapper: HTMLElement, i: number) => {
                const finalPos = findNextPosition();
                occupiedPositions.push(finalPos);

                // Random starting position (falling from above)
                const startX =
                    containerWidth * 0.3 +
                    Math.random() * (containerWidth * 0.4);
                const startY = -150 + gsap.utils.random(-50, 50);

                // FIXED: Animate wrapper, not inner content
                gsap.set(wrapper, {
                    x: startX,
                    y: startY,
                    opacity: 1,
                    rotation: gsap.utils.random(-180, 180),
                    scale: 0.8,
                });

                const tl = gsap.timeline({
                    delay: i * 0.12 + gsap.utils.random(0, 0.15),
                    scrollTrigger: {
                        trigger: "#skills-section",
                        start: "top 80%",
                    },
                });

                // Main fall
                tl.to(wrapper, {
                    x: finalPos.x + gsap.utils.random(-8, 8),
                    y: finalPos.y,
                    duration: 0.7 + gsap.utils.random(0, 0.25),
                    ease: "power2.in",
                    rotation: `+=${gsap.utils.random(360, 540)}`,
                    scale: 1,
                })
                    // First bounce
                    .to(wrapper, {
                        y: finalPos.y - gsap.utils.random(15, 25),
                        duration: 0.12,
                        ease: "power2.out",
                    })
                    .to(wrapper, {
                        y: finalPos.y,
                        x: finalPos.x,
                        duration: 0.12,
                        ease: "power2.in",
                    })
                    // Second bounce
                    .to(wrapper, {
                        y: finalPos.y - gsap.utils.random(6, 12),
                        duration: 0.09,
                        ease: "power2.out",
                    })
                    .to(wrapper, {
                        y: finalPos.y,
                        duration: 0.09,
                        ease: "power2.in",
                    })
                    // Final tiny bounce
                    .to(wrapper, {
                        y: finalPos.y - gsap.utils.random(2, 4),
                        duration: 0.06,
                        ease: "power2.out",
                    })
                    .to(wrapper, {
                        y: finalPos.y,
                        duration: 0.06,
                        ease: "power2.in",
                        rotation: `+=${gsap.utils.random(-20, 20)}`,
                    });

                if (tl.scrollTrigger) {
                    scrollTriggerInstances.value.push(tl.scrollTrigger);
                }
            });
        });

        onUnmounted(() => {
            scrollTriggerInstances.value.forEach((st) => st.kill());
            scrollTriggerInstances.value = [];
        });

        return { skills };
    },
});
</script>

<template>
    <section
        id="skills-section"
        class="relative w-full py-8 pb-1 flex flex-col items-center z-[9999] overflow-hidden"
    >
        <h2 class="text-3xl font-bold mb-5 font-funky blur-text">
            What I'm Good At
        </h2>
        <p
            class="text-center mb-2 pb-6 max-w-2xl text-sm md:text-base blur-text"
        >
            I have a diverse skill set in web, mobile and desktop development,
            from frontend to backend.
        </p>

        <!-- Container -->
        <div
            id="skills-container"
            class="relative w-full mx-auto h-[400px] md:h-[360px] overflow-hidden border-b border-app"
        >
            <div
                v-for="(skill, i) in [...skills].sort(
                    () => Math.random() - 0.5,
                )"
                :key="i"
                class="skill-box-wrapper absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            >
                <div
                    class="skill-box group relative w-full h-full rounded-full flex items-center justify-center font-bold border-2 cursor-pointer hover:border-4 border-app transition-all duration-200 hover:scale-105"
                >
                    <span
                        class="text-xs font-sans md:text-sm text-center leading-tight px-2 select-none pointer-events-none"
                    >
                        {{ skill.name }}
                    </span>

                    <!-- Tooltip on hover -->
                    <div
                        class="tooltip hidden md:block absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-60 p-4 rounded-xl text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[9999] bg-white dark:bg-black border-2 border-app shadow-2xl pointer-events-none"
                    >
                        <div
                            class="text-sm font-bold mb-2 text-blue-600 dark:text-blue-400"
                        >
                            {{ skill.level }}
                        </div>
                        <p
                            class="text-xs leading-relaxed text-gray-700 dark:text-gray-300"
                        >
                            {{ skill.detail }}
                        </p>
                        <!-- Arrow -->
                        <div
                            class="absolute top-full left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-white dark:border-t-gray-900"
                        ></div>
                        <div
                            class="absolute top-full left-1/2 -translate-x-1/2 -mt-[11px] w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-app"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.skill-box-wrapper {
    /* Wrapper gets animated */
    will-change: transform;
}

.skill-box {
    transform-origin: center center;
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.15),
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
}

.dark .skill-box {
    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.4),
        inset 0 2px 4px rgba(255, 255, 255, 0.05);
}

/* Tooltip styling */
.tooltip {
    backdrop-filter: blur(12px);
}

/* Ensure tooltip stays on top */
.skill-box:hover {
    z-index: 10000 !important;
}

.group:hover .tooltip {
    animation: tooltipFadeIn 0.3s ease-out;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, 10px);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>
