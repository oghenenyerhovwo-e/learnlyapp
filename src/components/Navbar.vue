<template>
  <nav class="navbar">
    <div class="lesson-text">
      Lesson {{ lesson }}
    </div>
    <div class="progress-container">
      <div
        v-for="index in totalSteps"
        :key="index"
        :class="['progress-bar', { active: index <= currentStep }]"
      />
    </div>
  </nav>
</template>

<script lang="ts" setup>
defineProps<{
  lesson: string
  currentStep: number
  totalSteps: number
}>()
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #cbc1c1;
  flex-wrap: wrap;
}

.lesson-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.progress-container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.progress-bar {
  width: 20px;
  height: 6px;
  background-color: #cbc1c1;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.progress-bar.active {
  background-color: #4f46e5; /* Indigo */
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
