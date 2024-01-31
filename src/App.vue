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

    <div v-if="gameStarted" class="flex flex-col items-center mt-4">
      <p class="mb-2">Moves: {{ moves }}</p>
      <p class="mb-4">Counter: {{ counter }}</p>

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

<script setup>
import { ref, onMounted } from "vue";

const tiles = ref([]);
const moves = ref(0);
const counter = ref(0);
const gameStarted = ref(false);

const startGame = () => {
  gameStarted.value = true;
  shuffle();
};

const shuffle = () => {
  tiles.value = shuffleArray([...Array(16).keys()]);
  moves.value = 0;
  counter.value = 0;
};

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const moveTile = (index) => {
  const emptyIndex = tiles.value.indexOf(0);
  if (isValidMove(index, emptyIndex)) {
    moves.value++;
    counter.value++;
    [tiles.value[index], tiles.value[emptyIndex]] = [
      tiles.value[emptyIndex],
      tiles.value[index],
    ];
    if (isSolved()) {
      alert("Congratulations! Puzzle solved.");
      gameStarted.value = false;
    }
  }
};

const isValidMove = (index, emptyIndex) => {
  const row = Math.floor(index / 4);
  const col = index % 4;

  const emptyRow = Math.floor(emptyIndex / 4);
  const emptyCol = emptyIndex % 4;

  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  );
};

const isSolved = () => {
  for (let i = 0; i < tiles.value.length - 1; i++) {
    if (tiles.value[i] !== i + 1) {
      return false;
    }
  }
  return true;
};

onMounted(() => {
  shuffle();
});
</script>

<style scoped></style>
