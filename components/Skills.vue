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

        const screen = () => {
            const width = window.innerWidth;
            if (width < 768) return 64;
            else if (width < 1024) return 80;
            else return 96;
        };

        const randomIndex = Math.floor(Math.random() * skills.value.length);

        onMounted(async () => {
            await nextTick();

            const container =
                document.querySelector<HTMLElement>("#skills-container");
            const boxes = gsap.utils.toArray<HTMLElement>(".skill-box");

            if (!container) return;

            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const boxSize = screen(); // w-24
            const padding = 0; // padding from container edges

            // Calculate how many balls fit per row
            const ballsPerRow = Math.floor((containerWidth - padding * 2) / boxSize);
            const actualRowWidth = ballsPerRow * boxSize;
            const startX = (containerWidth - actualRowWidth) / 2; // center the rows

            // Track occupied positions to avoid overlaps
            const occupiedPositions: Array<{ x: number; y: number }> = [];

            // Function to check if position is occupied
            const isPositionOccupied = (
                x: number,
                y: number,
                threshold = boxSize * 0.8
            ) => {
                return occupiedPositions.some(
                    (pos) =>
                        Math.abs(pos.x - x) < threshold && Math.abs(pos.y - y) < threshold
                );
            };

            // Function to find next available position
            const findNextPosition = () => {
                // Start from bottom and work up
                for (
                    let row = 0;
                    row < Math.ceil(boxes.length / ballsPerRow) + 2;
                    row++
                ) {
                    const y = containerHeight - boxSize - row * (boxSize * 0.99); // slight overlap for natural stacking

                    // Try each position in the row
                    for (let col = 0; col < ballsPerRow; col++) {
                        const x = startX + col * boxSize;

                        if (!isPositionOccupied(x, y)) {
                            return { x, y };
                        }
                    }

                    // If row is full, try offset positions (like balls settling between gaps)
                    for (let col = 0; col < ballsPerRow - 1; col++) {
                        const x = startX + col * boxSize + boxSize / 2; // offset by half

                        if (!isPositionOccupied(x, y)) {
                            return { x, y };
                        }
                    }
                }

                // Fallback - just stack higher
                return {
                    x: startX + Math.random() * (actualRowWidth - boxSize),
                    y:
                        containerHeight -
                        boxSize -
                        occupiedPositions.length * boxSize * 0.7,
                };
            };

            boxes.forEach((box: HTMLElement, i: number) => {
                // Find the next available position
                const finalPos = findNextPosition();
                occupiedPositions.push(finalPos);

                // Random starting position (like being poured from above)
                const startX =
                    containerWidth * 0.3 + Math.random() * (containerWidth * 0.4);
                const startY = -200 + gsap.utils.random(-100, 50);

                // Set initial position
                gsap.set(box, {
                    x: startX,
                    y: startY,
                    opacity: 1,
                    rotation: gsap.utils.random(-180, 180),
                    scale: 0.8,
                });

                // Create timeline for realistic ball physics
                const tl = gsap.timeline({
                    delay: i * 0.2 + gsap.utils.random(0, 0.3), // more random timing
                    scrollTrigger: {
                        trigger: "#skills-section",
                        start: "top 85%",
                    },
                });

                // Main fall with slight arc
                tl.to(box, {
                    x: finalPos.x + gsap.utils.random(-20, 20), // slight randomness in landing
                    y: finalPos.y,
                    duration: 1.0 + gsap.utils.random(0, 0.4),
                    ease: "power2.in",
                    rotation: `+=${gsap.utils.random(180, 720)}`,
                    scale: 1,
                })
                    // First bounce
                    .to(box, {
                        y: finalPos.y - gsap.utils.random(25, 45),
                        duration: 0.19,
                        ease: "power2.out",
                    })
                    .to(box, {
                        y: finalPos.y,
                        x: finalPos.x, // settle to exact position
                        duration: 0.19,
                        ease: "power2.in",
                    })
                    // Second bounce (smaller)
                    .to(box, {
                        y: finalPos.y - gsap.utils.random(10, 20),
                        duration: 0.12,
                        ease: "power2.out",
                    })
                    .to(box, {
                        y: finalPos.y,
                        duration: 0.12,
                        ease: "power2.in",
                    })
                    // Final tiny bounce
                    .to(box, {
                        y: finalPos.y - gsap.utils.random(3, 8),
                        duration: 0.1,
                        ease: "power2.out",
                    })
                    .to(box, {
                        y: finalPos.y,
                        duration: 0.1,
                        ease: "power2.in",
                        rotation: `+=${gsap.utils.random(-45, 45)}`, // final settle rotation
                    });
            });
        });

        return { skills, randomIndex };
    },
});
</script>

<template>
    <section id="skills-section" class="relative w-full py-8 pb-1 flex flex-col items-center">
        <h2 class="text-3xl font-bold mb-5 font-funky blur-text">What I'm Good At</h2>
        <p class="text-center mb-2 pb-6 max-w-2xl text-sm md:text-base blur-text">
            I have a diverse skill set in web, mobile and desktop development, from
            frontend to backend.
        </p>
        <!-- Container that fills up like a box -->
        <div id="skills-container"
            class="relative w-full max-w-3xl h-[320px] md:h-[290px] overflow-hidden border-b border-app">
            <div v-for="(skill, i) in [...skills].sort(() => Math.random() - 0.5)" :key="i"
                class="group absolute skill-box w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center font-bold border-2 cursor-app hover:border-4 border-app transition-all duration-300 opacity-100 hover:scale-110 hover:z-10"
                style="will-change: transform">
                <span
                    class="text-xs md:text-sm text-center leading-tight px-2 select-none blur-text">{{ skill.name }}</span>

                <!-- Popover -->
                <div
                    class="backdrop-blur-md hidden md:block glass absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg text-xs opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-[1000000] border border-app shadow-lg">
                    <p class="font-semibold text-base">{{ skill.level }}</p>
                    <p class="mt-1">{{ skill.detail }}</p>
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
