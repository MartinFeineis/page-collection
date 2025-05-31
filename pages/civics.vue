<template>
  <div class="max-w-xl mx-auto mt-10 p-4 border rounded shadow bg-white text-gray-900">
    <h2 class="text-2xl font-semibold mb-4">Civics Question</h2>
    <div class="mb-4">
      <label for="questionSelect" class="block mb-1 font-medium">Select Question:</label>
      <select
        id="questionSelect"
        v-model="selectedId"
        @change="loadQuestion"
        class="border px-2 py-1 rounded text-gray-900 bg-gray-100"
      >
        <option v-for="i in 100" :key="i" :value="i">Question {{ i }}</option>
      </select>
      <button
        @click="nextQuestion"
        class="ml-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Next Question
      </button>
    </div>

    <div v-if="question">
      <p class="text-lg font-medium">{{ question.text }}</p>
      <button
        @click="showAnswers = !showAnswers"
        class="ml-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Check Answer
      </button>
      <ul v-if="showAnswers" class="mt-4 list-disc list-inside">
        <li v-for="(answer, index) in answers" :key="index">{{ answer.text }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Loading question...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFetch } from '#app'

const selectedId = ref(1)
const showAnswers = ref(false)
const question = ref(null)
const answers = ref([])

const loadQuestion = async () => {
  showAnswers.value = false
  const { data } = await useFetch(`/api/civics?id=${selectedId.value}`)
  question.value = data.value?.question?.[0] || null
  answers.value = data.value?.answers || []
}

const nextQuestion = () => {
  selectedId.value = selectedId.value >= 100 ? 1 : selectedId.value + 1
  loadQuestion()
}

await loadQuestion()
</script>

<style scoped>
</style>
