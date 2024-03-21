<script setup lang="ts">
import { onMounted, ref } from 'vue';
type Props = {
    remainingTime: number,
    maxTime: number
}
const defaultTime = 25;

const { remainingTime = defaultTime, maxTime } = defineProps<Props>();

const getBarProgressCss = (remainingTime: number, maxTime: number): string => {
    const completionPercentage = (maxTime - remainingTime) / maxTime * 100;
    return `radial-gradient(closest-side, var(--color-background) 79%, transparent 80% 100%),conic-gradient(hsla(160, 100%, 37%, 1) ${completionPercentage}%, var(--color-border) 0)`
};

const displayTime = ref<string>();
const barProgress = ref<string>();

onMounted(() => {
    displayTime.value = `"${remainingTime}min"`;
    barProgress.value = getBarProgressCss(defaultTime, maxTime);
})

</script>

<template>
    <div class="progress-bar">
        <progress :value="remainingTime" min="0" :max="maxTime" style="visibility:hidden;height:0;width:0;">
            {{ displayTime }}
        </progress>
    </div>
</template>

<style scoped>
.progress-bar {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: v-bind(barProgress);
}

.progress-bar::before {
    content: v-bind(displayTime);
}
</style>
