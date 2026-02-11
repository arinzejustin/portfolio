<template>
  <div class="relative min-h-screen flex flex-col">
    <ClientOnly>
      <Header />
    </ClientOnly>
    <div class="flex-[1] mt-10">
      <slot />
    </div>
    <ClientOnly>
      <Footer />
    </ClientOnly>
  </div>
</template>
