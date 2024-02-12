<template>
  <div class="game-container">
    <div class="flex flex-col items-center mt-8">
      <h1 class="text-3xl font-bold mb-4">15 Puzzle Game</h1>

      <div v-if="!gameStarted" class="mb-4" @click="playbackgroudSound()">
        <button
          @click="startGame('easy')"
          class="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Easy
        </button>
        <button
          @click="startGame('medium')"
          class="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Medium
        </button>
        <button
          @click="startGame('hard')"
          class="bg-blue-500 text-white py-2 px-4 rounded"
        >
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
            <div
              v-for="(tile, index) in tiles"
              :key="index"
              @click="
                () => {
                  moveTile(index);
                  playMoveSound();
                }
              "
              :class="tile === index + 1 ? correctTileStyle : normalTileStyle"
            >
              {{ tile === 0 ? "" : tile }}
            </div>
          </div>
        </div>
        <div class="flex-2">
          <!-- add click with sound effect -->
          <button
            @click="
              () => {
                shuffle();
                playShuffleSound();
              }
            "
            class="m-2 mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Shuffle
          </button>
          <!-- add button to complete the game (โกง)-->
          <button
            @click="isComplete"
            class="m-2 mt-4 bg-green-500 text-white py-2 px-4 rounded"
          >
            Complete (โกง)
          </button>
          <button
            @click="restart"
            class="m-2 mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// เปลี่ยนเป็น script setup
import { ref, onMounted } from "vue";
import shuffleSound from "./assets/sounds/sound1.mp3";
import moveSound from "./assets/sounds/sound2.mp3";
import backgroudSound from "./assets/sounds/sound3.mp3";

// เพิ่มประกาศตัวแปร timerInterval
let timerInterval = null;

const normalTileStyle = `w-16 h-16 border border-gray-300 flex items-center justify-center text-2xl cursor-pointer bg-white`;
const correctTileStyle = `w-16 h-16 border border-green-500 flex items-center justify-center text-2xl cursor-pointer bg-white text-green-500`;

const difficultyLevels = {
  easy: { size: 4 },
  medium: { size: 5 },
  hard: { size: 6 },
};

const tiles = ref([]);
const moves = ref(0);
const gameStarted = ref(false);
const time = ref(0);
let gridSize = 4; // Default grid size

//all sounds
const sound1 = new Audio(shuffleSound);
const sound2 = new Audio(moveSound);
const sound3 = new Audio(backgroudSound);

const startGame = (difficulty) => {
  gameStarted.value = true;
  gridSize = difficultyLevels[difficulty].size;

  // เพิ่มยกเลิก setInterval เก่า
  clearInterval(timerInterval);
  time.value = 0;
  initializeGame();
  shuffle();
  Timer();
};

const playShuffleSound = () => {
  sound1.play();
};

const playMoveSound = () => {
  sound2.play();
};

const playbackgroudSound = () => {
  sound3.play();
  sound3.loop = true;
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
  //เพิ่มตัวแปร timerInterval

  timerInterval = setInterval(() => {
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

const isTileInCorrectPosition = (index) => {
  return tiles.value[index] === index + 1;
};

// const isTileInCorrectPosition = (index) => {
//   return tiles.value[index] === index + 1;
// };

const isSolved = () => {
  for (let i = 0; i < tiles.value.length - 1; i++) {
    if (tiles.value[i] !== i + 1) {
      return false;
    }
  }
  return true;
};

const isSolvable = (tilesArray) => {
  let inversions = 0;
  const length = tilesArray.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if (
        tilesArray[i] > tilesArray[j] &&
        tilesArray[i] !== 0 &&
        tilesArray[j] !== 0
      ) {
        inversions++;
      }
    }
  }
  const gridSizeEven = gridSize % 2 === 0;
  const blankOnEvenRowFromBottom = (length - tilesArray.indexOf(0)) % 2 === 0;
  return (
    (gridSizeEven && !blankOnEvenRowFromBottom) ||
    (!gridSizeEven && inversions % 2 === 0)
  );
};

const isComplete = () => {
  tiles.value.sort((a, b) => a - b);
  const emptyIndex = tiles.value.indexOf(0);
  if (emptyIndex === 0) {
    tiles.value.shift();
    tiles.value.push(emptyIndex);
  }
};

onMounted(() => {
  initializeGame();
  Timer();
});

const restart = () => {
  gameStarted.value = false;

  // ยกเลิก setInterval เก่า

  clearInterval(timerInterval);
  time.value = 0;
};
</script>

<style scoped>
.game-container {
  font-family: "MN Pu Khem", "sans-serif";
}

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
