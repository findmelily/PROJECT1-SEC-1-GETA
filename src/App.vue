<!-- <script setup>
 import { ref } from 'vue'

</script>
 
<template>
  <div class="text-center">
  <-- <div>
    <input type="radio" name="level" id="easy" value="1" v-model="level"/>
    <label for="easy" class="me-4">Easy</label>
    <input type="radio" name="level" id="medium" value="2" v-model="level" checked/>
    <label for="medium" class="me-4">Medium</label>
    <input type="radio" name="level" id="hard" value="3" v-model="level" />
    <label for="hard" class="me-4">Hard</label>
  </div> -->

<!-- <div>
    <button class="btn bg-green-600 text-white mt-3"
     @click="$emit('start-play',this.level)">START</button>
  </div>
  </div>
  

</template>
 
<style scoped></style> -->

<!-- App.vue -->
<template>
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-3xl font-bold mb-4">15 Puzzle Game</h1>

    <button
      v-if="!gameStarted"
      @click="startGame"
      class="bg-blue-500 text-white py-2 px-4 rounded"
    >
      Start
    </button>

    <div v-if="gameStarted" class="flex items-center mt-4">
      <div class="mb-2 flex-none">Moves: {{ moves }}</div>
      <div class="mb-2 flex-1">Counter: {{ counter }}</div>
      <!-- เพิ่ม Time -->
      <div class="mb-2 flex-1">Time: {{ formatTime(time) }}</div>

      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="(tile, index) in tiles"
          :key="index"
          @click="moveTile(index)"
          class="w-16 h-16 border border-gray-300 flex items-center justify-center text-2xl cursor-pointer bg-white"
        >
          {{ tile === 0 ? " " : tile }}
        </div>
      </div>

      <button
        @click="shuffle"
        class="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Shuffle
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"

export default {
  setup() {
    const tiles = ref([])
    const moves = ref(0)
    const counter = ref(0)
    const gameStarted = ref(false)
    // เพิ่ม time
    const time = ref(0)

    const startGame = () => {
      gameStarted.value = true
      shuffle()
      // เพิ่ม Timer function
      Timer()
    }

    // เพิ่ม Timer function
    const Timer = () => {
      setInterval(() => {
        time.value++
      }, 1000)
    }

    // เพิ่ม formatTime function
    const formatTime = (time) => {
      const hours = `0${Math.floor(time / 3600)}`.slice(-2)
      const minues = `0${Math.floor((time % 3600) / 60)}`.slice(-2)
      const seconds = `0${time % 60}`.slice(-2)
      return `${hours}:${minues}:${seconds}`
    }

    const shuffle = () => {
      tiles.value = shuffleArray([...Array(16).keys()])
      moves.value = 0
      counter.value = 0
      // เพิ่ม time value
      time.value = 0
    }

    const shuffleArray = (array) => {
      let currentIndex = array.length,
        randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ]
      }
      return array
    }

    const moveTile = (index) => {
      const emptyIndex = tiles.value.indexOf(0)
      if (isValidMove(index, emptyIndex)) {
        moves.value++
        counter.value++
        ;[tiles.value[index], tiles.value[emptyIndex]] = [
          tiles.value[emptyIndex],
          tiles.value[index],
        ]
        if (isSolved()) {
          alert("Congratulations! Puzzle solved.")
          gameStarted.value = false
        }
      }
    }

    const isValidMove = (index, emptyIndex) => {
      const row = Math.floor(index / 4)
      const col = index % 4

      const emptyRow = Math.floor(emptyIndex / 4)
      const emptyCol = emptyIndex % 4

      return (
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1)
      )
    }

    const isSolved = () => {
      for (let i = 0; i < tiles.value.length - 1; i++) {
        if (tiles.value[i] !== i + 1) {
          return false
        }
      }
      return true
    }

    onMounted(() => {
      shuffle()
    })

    // เพิ่ม return time Timer formatTime
    return {
      tiles,
      moves,
      counter,
      gameStarted,
      time,
      startGame,
      shuffle,
      moveTile,
      Timer,
      formatTime,
    }
  },
}
</script>

<style scoped></style>
