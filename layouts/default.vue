<template>
  <div class="relative min-h-screen flex flex-col">
    <ClientOnly>
      <Header />
    </ClientOnly>
    <div class="mt-20 md:mt-28 flex-[1] overflow-hidden relative">
      <slot />
    </div>
    <ClientOnly>
      <Footer />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">


let observer: MutationObserver;

onMounted(() => {
  const { animateElements } = useGsapAnimations();
  const router = useRouter();

  animateElements();

  // Observe new DOM nodes (e.g. from client-side navigation)
  observer = new MutationObserver(() => {
    animateElements();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also re-run on route changes
  router.afterEach(() => {
    setTimeout(() => animateElements(), 100);
  });
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>
