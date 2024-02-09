<template>
  <div class="game-container">
  <div class="flex flex-col items-center mt-8">
    <h1 class="text-3xl font-bold mb-4">15 Puzzle Game</h1>

    <div class="mb-4">
      <button @click="startGame('easy')" class="bg-blue-500 text-white py-2 px-4 rounded mr-2">
        Easy
      </button>
      <button @click="startGame('medium')" class="bg-blue-500 text-white py-2 px-4 rounded mr-2">
        Medium
      </button>
      <button @click="startGame('hard')" class="bg-blue-500 text-white py-2 px-4 rounded">
        Hard
      </button>
    </div>

    <div v-if="gameStarted" class="flex flex-col items-center mt-4">

      <div class="flex">
        <div class="mb-2 m-2">Moves: {{ moves }}</div>
        <div class="mb-2 m-2">Time: {{ formatTime(time) }}</div>
      </div>
      <div class="flex">
        <div class="grid" :class="'grid-cols-' + gridSize + ' gap-2'">
          <div v-for="(tile, index) in tiles" :key="index" @click="moveTile(index)"
            :class="tile === index + 1 ? correctTileStyle : normalTileStyle">
            {{ tile === 0 ? '' : tile }}
          </div>
        </div>
      </div>
      <div class="flex-2">
        <button @click="shuffle" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Shuffle
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const difficultyLevels = {
  easy: { size: 4 },
  medium: { size: 5 },
  hard: { size: 6 }
};

const normalTileStyle = `w-16 h-16 border border-gray-300 flex items-center justify-center text-2xl cursor-pointer bg-white`;
const correctTileStyle = `w-16 h-16 border border-green-500 flex items-center justify-center text-2xl cursor-pointer bg-white text-green-500`;

const tiles = ref([]);
const moves = ref(0);
const gameStarted = ref(false);
const time = ref(0);
let gridSize = 4; // Default grid size

const startGame = (difficulty) => {
  gameStarted.value = true;
  gridSize = difficultyLevels[difficulty].size;
  initializeGame();
};

const initializeGame = () => {
  const totalTiles = gridSize * gridSize;
  const tilesArray = [...Array(totalTiles).keys()].slice(1); // Generate numbers from 1 to totalTiles - 1
  tilesArray.push(0); // Add the empty tile
  do {
    tilesArray.sort(() => Math.random() - 0.5); // Shuffle the tiles
  } while (!isSolvable(tilesArray));
  tiles.value = tilesArray;
  moves.value = 0;
  time.value = 0;
};

const Timer = () => {
  setInterval(() => {
    time.value++;
  }, 1000);
};

const formatTime = (time) => {
  const hours = `0${Math.floor(time / 3600)}`.slice(-2);
  const minutes = `0${Math.floor((time % 3600) / 60)}`.slice(-2);
  const seconds = `0${time % 60}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

const shuffle = () => {
  const totalTiles = gridSize * gridSize;
  const tilesArray = [...Array(totalTiles).keys()].slice(1); // Generate numbers from 1 to totalTiles - 1
  tilesArray.push(0); // Add the empty tile
  do {
    tilesArray.sort(() => Math.random() - 0.5); // Shuffle the tiles
  } while (!isSolvable(tilesArray));
  tiles.value = tilesArray;
  moves.value = 0;
  time.value = 0;
};

const moveTile = (index) => {
  const emptyIndex = tiles.value.indexOf(0);
  if (isValidMove(index, emptyIndex)) {
    moves.value++;
    [tiles.value[index], tiles.value[emptyIndex]] = [
      tiles.value[emptyIndex],
      tiles.value[index],
    ];
    if (isSolved()) {
      alert("Congratulations");
      gameStarted.value = false;
    }
  }
};

const isValidMove = (index, emptyIndex) => {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  const emptyRow = Math.floor(emptyIndex / gridSize);
  const emptyCol = emptyIndex % gridSize;

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

// Check if the puzzle is solvable
const isSolvable = (tilesArray) => {
  let inversions = 0;
  const length = tilesArray.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if (tilesArray[i] > tilesArray[j] && tilesArray[i] !== 0 && tilesArray[j] !== 0) {
        inversions++;
      }
    }
  }
  const gridSizeEven = gridSize % 2 === 0;
  const blankOnEvenRowFromBottom = (length - tilesArray.indexOf(0)) % 2 === 0;
  return (gridSizeEven && !blankOnEvenRowFromBottom) || (!gridSizeEven && inversions % 2 === 0);
};

onMounted(() => {
  initializeGame();
  Timer();
});
</script>

<style scoped>
  /* .game-container {
  background-image: url(................................); 
  background-size: cover;
  background-position: center;
} */
.grid {
  display: grid;
  gap: 2px;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-5 {
  grid-template-columns: repeat(5, 1fr);
}

.grid-cols-6 {
  grid-template-columns: repeat(6, 1fr);
}
</style>