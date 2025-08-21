<template>
  <div class="relative min-h-screen">
    <ClientOnly>
      <Header />
    </ClientOnly>
    <div class="mt-20 md:mt-28">
      <slot />
    </div>
    <ClientOnly>
      <Footer />
    </ClientOnly>
  </div>
</template>