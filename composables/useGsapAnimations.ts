import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
    gsap.registerPlugin(ScrollTrigger);
}

export function useGsapAnimations() {
    const animateElements = () => {
        if (!process.client) return;

        document.querySelectorAll<HTMLElement>(".blur-text:not([data-animated])").forEach((el) => {
            el.setAttribute("data-animated", "true");
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
                }
            );
        });

        document.querySelectorAll<HTMLElement>(".slide-app:not([data-animated])").forEach((el) => {
            el.setAttribute("data-animated", "true");
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
            });
        });
    };

    return { animateElements };
}
