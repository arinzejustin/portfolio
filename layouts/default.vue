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
