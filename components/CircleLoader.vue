<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        height: {
            type: String as PropType<string>,
            default: '14px'
        },
        width: {
            type: String as PropType<string>,
            default: '14px'
        },
        auto: {
            type: String as PropType<string>,
            default: 'auto'
        },
        className: {
            type: String as PropType<string>,
            default: ''
        },
        divClass: {
            type: String as PropType<string>,
            default: ''
        }
    }
});
</script>
<template>
    <div :class="[divClass]">
        <span :style="{
            '--height': height,
            '--width': width,
            '--auto': auto
        }"
            :class="[className, 'animate-circle', className.includes('change') ? '' : 'dark:border-[black_black_transparent]', className.includes('change') ? '' : 'border-[white_white_transparent]', 'group-hover:dark:border-[white_white_transparent]', 'group-hover:border-[black_black_transparent]', 'h-[var(--height)]', 'mx-[var(--auto)]', 'w-[var(--width)]']"></span>
    </div>
</template>