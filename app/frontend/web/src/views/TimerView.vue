<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Timer = defineAsyncComponent(() => (
    import('../components/Timer.vue')
));

</script>

<template>
    <div class="timer">
        <!-- <Suspense> -->
        <Timer remainingTime="3 min"></Timer>
        <!-- </Suspense> -->
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .timer {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
}
</style>