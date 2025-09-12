<template>
    <div
        class="w-full relative md:min-w-[360px] md:max-w-[400px] border-dashed border-app [background:linear-gradient(45deg,#f1f1f1,theme(colors.surface.light)_50%,#f0f0f0)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] dark:[background:linear-gradient(45deg,#121212,theme(colors.surface.dark)_50%,#151515)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.teal.500)_86%,_theme(colors.teal.300)_90%,_theme(colors.sky.500)_94%,_theme(colors.purple.600/.48))_border-box] border border-transparent animate-border rounded-xl glass glass-lg">
        <Transition name="blur">
            <div v-if="subscribe" class="relative">
                <div class="p-5">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="flex space-x-2 items-center mb-0.5">
                                <div class="text-2xl font-bold mb-2 font-mono">Code. Create. Innovate</div>
                            </div>
                            <div class="text-sm font-medium text-slate-500 font-mono">Fresh updates every 2 days on AI,
                                coding and
                                the tech shaping tomorrow.</div>
                        </div>
                        <button @click="close"
                            class="w-8 h-8 flex justify-center items-center text-slate-500 hover:text-slate-400">
                            <span class="sr-only">Close menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-miterlimit="10" stroke-width="1.5"
                                    d="m7.757 16.243l8.486-8.486m0 8.486L7.757 7.757" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="p-5 my-2 w-full">
                    <div>
                        <input type="email" :disabled="loading" v-model="email" placeholder="Your Email"
                            class="w-full px-4 py-3.5 rounded-full border border-app focus:ring-2 focus:ring-teal-400 focus:outline-none bg-slate-50 dark:bg-[#121212] placeholder:text-on-light dark:placeholder:text-on-dark text-on-light dark:text-on-dark" />
                    </div>
                    <div class="my-3 mb-2 w-3/4 mx-auto">
                        <button @click="request()" :disabled="loading" type="submit"
                            :class="{ 'pointer-events-none opacity-70': loading }"
                            class="group w-full relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-medium bg-surface-dark dark:bg-surface-light dark:hover:bg-transparent hover:bg-transparent transition-all duration-500">
                            <span class="gradient-ring pointer-events-none"></span>
                            <span v-if="loading">
                                <span class="sr-only">Loading...</span>
                                <CircleLoader :height="'20px'" :width="'20px'" :auto="'auto'" />
                            </span>
                            <span v-else
                                class="relative blur-text z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300">
                                Subscribe
                            </span>
                        </button>
                    </div>
                    <p class="text-slate-500 hover:text-slate-400 underline text-center text-sm w-full cursor-app"
                        @click="subscribe = false">Unsubscribe</p>
                </div>
            </div>
        </Transition>
        <Transition name="blur">
            <div v-if="cancel">
                <div class="p-5 py-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="flex space-x-2 items-center mb-0.5">
                                <div class="text-2xl font-bold mb-2 font-mono">Leaving me ?</div>
                            </div>
                            <div class="text-sm font-medium text-slate-500 font-mono">I will surely miss you buddy or is
                                there anything you want me to improve on ?

                                <NuxtLink target="_blank" to="//wa.me/+2347073184665"
                                    class="text-emerald-300 font-display">Reach
                                    out
                                    to me
                                </NuxtLink>
                            </div>
                        </div>
                        <button @click="close"
                            class="w-8 h-8 flex justify-center items-center text-slate-500 hover:text-slate-400">
                            <span class="sr-only">Close menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-miterlimit="10" stroke-width="1.5"
                                    d="m7.757 16.243l8.486-8.486m0 8.486L7.757 7.757" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="p-5 my-2 py-0 w-full">
                    <div>
                        <input type="email" :disabled="loading" v-model="email" placeholder="Your Email"
                            class="w-full px-4 py-3.5 rounded-full border border-app focus:ring-2 focus:ring-teal-400 focus:outline-none bg-slate-50 dark:bg-[#121212] placeholder:text-on-light dark:placeholder:text-on-dark text-on-light dark:text-on-dark" />
                    </div>
                    <div class="my-3 mb-2 w-3/4 mx-auto">
                        <button @click="request('unsubscribe')" :disabled="loading" type="submit"
                            :class="{ 'pointer-events-none opacity-70': loading }"
                            class="group w-full relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-medium bg-surface-dark dark:bg-surface-light dark:hover:bg-transparent hover:bg-transparent transition-all duration-500">
                            <span class="gradient-ring pointer-events-none"></span>
                            <span v-if="loading">
                                <span class="sr-only">Loading...</span>
                                <CircleLoader :height="'20px'" :width="'20px'" :auto="'auto'" />
                            </span>
                            <span v-else
                                class="relative blur-text z-10 text-on-dark dark:text-on-light group-hover:text-teal-400 transition-colors duration-300">
                                Unsubscribe
                            </span>
                        </button>
                    </div>
                    <p class="text-slate-500 hover:text-slate-400 underline text-center text-sm w-full cursor-app"
                        @click="cancel = false">Cancel</p>
                </div>
            </div>
        </Transition>
        <div class="pb-4 text-base font-mono text-center" :class="color">
            {{ message }}
        </div>
        <span class="hidden text-red-500 text-green-500"></span>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    methods: {
        close() {
            this.$emit('close', false);
            localStorage.setItem('nextTime', (Number(Date.now().toString()) + 60 * 60 * 5 * 1000).toString());
        },

        validate() {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.email).toLowerCase());
        },

        request(type: string = "subscribe") {
            this.message = '';
            this.color = '';

            if (!this.validate()) {
                this.color = 'text-red-500';
                this.message = 'Please enter a valid email address.';
                return;
            }

            this.loading = true;
            const url = type === "subscribe" ? '/api/newsletter/subscribe' : '/api/newsletter/unsubscribe';

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({ email: this.email }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status) {
                        this.color = 'text-green-500';
                        this.message = type === "subscribe" ? 'Subscription successful! Thank you for subscribing.' : 'You have been unsubscribed successfully.';
                        this.email = '';
                    } else {
                        this.color = 'text-red-500';
                        this.message = res.message || 'An error occurred. Please try again later.';
                    }
                    this.loading = false;
                })
                .catch(() => {
                    this.color = 'text-red-500';
                    this.message = 'An error occurred. Please try again later.';
                    this.loading = false;
                });
        }
    },
    data() {
        return {
            subscribe: true,
            cancel: false,
            email: '',
            color: '',
            message: '',
            loading: false
        }
    },

    watch: {
        subscribe: {
            handler(newValue: boolean) {
                if (!newValue) {
                    const timeout = setTimeout(() => {
                        this.cancel = true;
                        clearTimeout(timeout)
                    }, 650)
                }
            },
            deep: true,
            immediate: true
        },

        cancel: {
            handler(newValue: boolean) {
                if (!newValue) {
                    const timeout = setTimeout(() => {
                        this.subscribe = true;
                        clearTimeout(timeout)
                    }, 650)
                }
            },
            deep: true,
            immediate: true
        }
    }
})
</script>
