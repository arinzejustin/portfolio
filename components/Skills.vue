<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, nextTick } from "vue";
import { Icon } from "@iconify/vue";

const GRAVITY = 0.4;
const FRICTION = 0.98;
const BOUNCE = 0.6;
const MOUSE_REPULSION = 1.5;

interface Ball {
    id: number;
    name: string;
    level: string;
    icon: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

export default defineComponent({
    name: "Skills",
    components: { Icon },
    setup() {
        const containerRef = ref<HTMLElement | null>(null);
        const sectionRef = ref<HTMLElement | null>(null);
        const balls = ref<Ball[]>([]);
        const hasStarted = ref(false);
        let animationFrame: number;
        let containerWidth = 0;
        let containerHeight = 0;
        const mouseX = ref(-1000);
        const mouseY = ref(-1000);
        let observer: IntersectionObserver | null = null;

        const techStack = [
            { name: "HTML 5", color: "#E34F26", icon: "vscode-icons:file-type-html" },
            { name: "CSS", color: "#1572B6", icon: "vscode-icons:file-type-css" },
            { name: "SASS", color: "#1572B6", icon: "vscode-icons:file-type-sass" },
            { name: "JS", color: "#F7DF1E", icon: "logos:javascript" },
            { name: "Vue", color: "#4FC08D", icon: "logos:vue" },
            { name: "Nuxt", color: "#00DC82", icon: "logos:nuxt-icon" },
            { name: "Tailwind", color: "#06B6D4", icon: "devicon:tailwindcss" },
            { name: "GSAP", color: "#88CE02", icon: "logos:greensock-icon" },
            { name: "TS", color: "#3178C6", icon: "logos:typescript-icon" },
            { name: "NodeJs", color: "#339933", icon: "logos:nodejs-icon" },
            { name: "Svelte", color: "#61DAFB", icon: "logos:svelte-icon" },
            { name: "Git", color: "#F05032", icon: "logos:git-icon" },
            { name: "Electron", color: "#47848F", icon: "logos:electron" },
            { name: "PHP", color: "#F24E1E", icon: "logos:php" },
            { name: "Supabase", color: "#3FCF8E", icon: "logos:supabase-icon" },
            { name: "Golang", color: "#3776AB", icon: "logos:go" },
            { name: "MySQL", color: "#4479A1", icon: "logos:mysql" },
            { name: "PostgreSQL", color: "#4479A1", icon: "logos:postgresql" },
            { name: "Firebase", color: "#4479A1", icon: "logos:firebase" },
            { name: "Bun", color: "#4479A1", icon: "logos:bun" },
            { name: "Dart", color: "#4479A1", icon: "logos:dart" },
            { name: "Flutter", color: "#4479A1", icon: "logos:flutter" },
        ];

        const initBalls = () => {
            if (!containerRef.value) return;

            containerWidth = containerRef.value.clientWidth;
            containerHeight = containerRef.value.clientHeight;

            balls.value = techStack.map((tech, i) => ({
                id: i,
                name: tech.name,
                level: "Pro",
                icon: tech.icon,
                x: Math.random() * (containerWidth - 60) + 30,
                y: -Math.random() * 500 - 100,
                vx: (Math.random() - 0.5) * 4,
                vy: 0,
                radius: 35,
                color: tech.color
            }));
        };

        const updatePhysics = () => {
            if (!hasStarted.value) {
                animationFrame = requestAnimationFrame(updatePhysics);
                return;
            }

            balls.value.forEach(ball => {
                ball.vy += GRAVITY;
                ball.vx *= FRICTION;
                ball.vy *= FRICTION;

                if (containerRef.value) {
                    const rect = containerRef.value.getBoundingClientRect();
                    const relativeMouseX = mouseX.value - rect.left;
                    const relativeMouseY = mouseY.value - rect.top;

                    const dx = ball.x - relativeMouseX;
                    const dy = ball.y - relativeMouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        const angle = Math.atan2(dy, dx);
                        ball.vx += Math.cos(angle) * force * MOUSE_REPULSION;
                        ball.vy += Math.sin(angle) * force * MOUSE_REPULSION;
                    }
                }
                ball.x += ball.vx;
                ball.y += ball.vy;

                if (ball.y + ball.radius > containerHeight) {
                    ball.y = containerHeight - ball.radius;
                    ball.vy *= -BOUNCE;
                    if (Math.abs(ball.vy) < GRAVITY * 2) ball.vy = 0;
                }

                if (ball.x + ball.radius > containerWidth) {
                    ball.x = containerWidth - ball.radius;
                    ball.vx *= -BOUNCE;
                } else if (ball.x - ball.radius < 0) {
                    ball.x = ball.radius;
                    ball.vx *= -BOUNCE;
                }
            });

            for (let i = 0; i < balls.value.length; i++) {
                for (let j = i + 1; j < balls.value.length; j++) {
                    const b1 = balls.value[i];
                    const b2 = balls.value[j];

                    const dx = b2.x - b1.x;
                    const dy = b2.y - b1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = b1.radius + b2.radius;

                    if (dist < minDist) {
                        const angle = Math.atan2(dy, dx);
                        const sin = Math.sin(angle);
                        const cos = Math.cos(angle);

                        const overlap = minDist - dist;
                        const moveX = (overlap / 2) * cos;
                        const moveY = (overlap / 2) * sin;

                        b1.x -= moveX;
                        b1.y -= moveY;
                        b2.x += moveX;
                        b2.y += moveY;

                        const vx1 = b1.vx * cos + b1.vy * sin;
                        const vy1 = b1.vy * cos - b1.vx * sin;
                        const vx2 = b2.vx * cos + b2.vy * sin;
                        const vy2 = b2.vy * cos - b2.vx * sin;

                        const vx1Final = vx2;
                        const vx2Final = vx1;

                        b1.vx = vx1Final * cos - vy1 * sin;
                        b1.vy = vy1 * cos + vx1Final * sin;
                        b2.vx = vx2Final * cos - vy2 * sin;
                        b2.vy = vy2 * cos + vx2Final * sin;

                        b1.vx *= 0.9; b1.vy *= 0.9;
                        b2.vx *= 0.9; b2.vy *= 0.9;
                    }
                }
            }

            animationFrame = requestAnimationFrame(updatePhysics);
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX.value = e.clientX;
            mouseY.value = e.clientY;
        };

        const onResize = () => {
            if (containerRef.value) {
                containerWidth = containerRef.value.clientWidth;
                containerHeight = containerRef.value.clientHeight;
            }
        };

        const startSimulation = () => {
            if (hasStarted.value) return;
            hasStarted.value = true;
        };

        onMounted(async () => {
            await nextTick();
            initBalls();
            window.addEventListener('resize', onResize);
            window.addEventListener('mousemove', onMouseMove);
            animationFrame = requestAnimationFrame(updatePhysics);

            if (sectionRef.value) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                startSimulation();
                                observer?.disconnect();
                            }
                        });
                    },
                    {
                        threshold: 0.15,
                    }
                );
                observer.observe(sectionRef.value);
            }
        });

        onUnmounted(() => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            observer?.disconnect();
        });

        return { containerRef, sectionRef, balls, hasStarted };
    }
});
</script>

<template>
    <section id="skills-section" ref="sectionRef"
        class="relative w-full py-10 pb-5 flex flex-col items-center overflow-hidden">
        <div class="z-10 text-center mb-8">
            <h2 class="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">Technical <span
                    class="text-accent-gold font-serif italic">Arsenal</span></h2>
            <p class="text-on-muted max-w-lg mx-auto">
                The tools I might use in building your next project. A call away from we creating something amazing.
            </p>
        </div>

        <div ref="containerRef"
            class="relative w-full max-w-5xl h-[350px] lg:h-[250px] border-b border-app rounded-b-3xl overflow-hidden cursor-crosshair">
            <div v-for="ball in balls" :key="ball.id"
                class="absolute flex items-center justify-center rounded-full shadow-[inset_0_-4px_6px_rgba(0,0,0,0.3)] border border-white/20 glass transition-transform active:scale-95"
                :style="{
                    width: (ball.radius * 2) + 'px',
                    height: (ball.radius * 2) + 'px',
                    transform: `translate(${ball.x - ball.radius}px, ${ball.y - ball.radius}px)`,
                    backgroundColor: 'rgba(255,255,255,0.03)'
                }">
                <div class="text-center group flex flex-col items-center justify-center gap-1">
                    <Icon :icon="ball.icon" class="w-8 h-8 filter drop-shadow-lg" />
                    <span class="text-[10px] font-bold uppercase tracking-wider opacity-60">{{ ball.name }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.glass {
    backdrop-filter: blur(8px);
    box-shadow:
        inset 0 0 20px rgba(255, 255, 255, 0.05),
        0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
