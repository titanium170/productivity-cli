<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HttpService from '../services/http.service';
import TimerProgress from './TimerProgress.vue';

defineProps<{
    remainingTime: string
}>()


type Timer = { remaining: number, paused: boolean, type: 'focus' | 'break' }

const timer = ref<Timer>();
onMounted(async () => {
    // should create a local timer
    timer.value = (await HttpService.get('getTimer')) as Timer;
    const timeLeft = timer.value.remaining;
    timer.value.remaining = timeLeft > 60 * 1000 ? timeLeft / 1000 / 60 : timeLeft / 1000;
});
</script>

<template>
    <div v-if="timer">
        <div>{{ timer.type }}</div>
        <TimerProgress :remaining-time="timer.remaining" :max-time="(timer.type === 'focus' ? 25 : 5)">
        </TimerProgress>
        <div>{{ timer.paused + '' }}</div>
    </div>
</template>

<style scoped></style>
