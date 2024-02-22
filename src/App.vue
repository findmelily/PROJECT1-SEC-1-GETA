<template>
  <div class="game-container">
    <button
      @click="toggleMute"
      class="m-2 mt-4 btn btn-warning py-1 px-4 rounded-2"
    >
      <img :src="soundMute ? muteImage : volumeImage" class="icon" />
    </button>

    <!-- Game title and difficulty selection -->
    <div class="flex flex-col items-center py-10 center">
      <h1 class="text-7xl text-white font-bold mb-10">15 Puzzle Game</h1>

      <div
        v-if="!gameStarted"
        class="mb-10 center1"
        @click="playbackgroudSound"
      >
        <button
          @click="startGame('easy')"
          class="btn btn-success text-white py-2 px-8 rounded-2 mr-10 size-auto font-light"
        >
          Easy
        </button>

        <button
          @click="startGame('medium')"
          class="btn btn-primary text-white py-2 px-4 rounded-2 mr-10 size-auto font-light"
        >
          Medium
        </button>
        <button
          @click="startGame('hard')"
          class="btn btn-error text-white py-2 px-4 rounded-2 mr-2 size-auto font-light"
        >
          Hard
        </button>
      </div>

      <!-- Game grid and controls -->
      <div v-if="gameStarted" class="flex flex-col items-center">
        <div class="flex">
          <div class="mb-2 m-2 text-white text-2xl">Move: {{ moves }}</div>
          <div class="mb-2 m-2 text-white text-2xl">
            Time: {{ formatTime(time) }}
          </div>
        </div>

        <!-- Puzzle grid -->
        <div class="flex">
          <div class="grid" :class="'grid-cols-' + gridSize + ' gap-2'">
            <div
              class="moveTitle"
              v-for="(tile, index) in tiles"
              :key="index"
              @click="
                () => {
                  moveTile(index)
                  playMoveSound()
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
                shuffle()
                playShuffleSound()
              }
            "
            class="m-2 mt-4 mr-20 btn btn-success py-1 px-6 rounded-2"
          >
            <img src="./components/shuffle-icon.png" alt="shuffle" />
          </button>
          <button
            @click="
              () => {
                home(), pauseAllSounds()
              }
            "
            class="m-2 mt-4 btn btn-success py-1 px-6 rounded-2"
          >
            <img src="./components/home-icon.png" alt="home" />
          </button>

          <!-- modal -->
          <dialog id="my_modal_1" class="modal" v-if="isSolved">
            <div class="modal-box flex flex-col items-center">
              <h4 class="font-bold text-4xl">🏆 Congratulations 🏆</h4>
              <div class="py-4">
                <h3 class="text-3xl text-center m-4 mb-3">Summary</h3>
                <div class="flex flex-col">
                  <div class="text-center">Your Move: {{ moves }}</div>
                  <br />
                  <div class="text-center -m-6 -mb-2">
                    Your Time: {{ formatTime(time) }}
                  </div>
                </div>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <button
                    class="btn1 py-2 px-8 rounded-2"
                    @click="
                      () => {
                        home(), pauseAllSounds()
                      }
                    "
                  >
                    Close and Go Home
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <button @click="isComplete" class="text-sm text-gray-500">
          Complete (โกง)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// เปลี่ยนเป็น script setup
import { ref, onMounted } from "vue"
import shuffleSound from "./assets/sounds/sound1.mp3"
import moveSound from "./assets/sounds/sound2.mp3"
import backgroudSound from "./assets/sounds/sound3.mp3"
import congratsSound from "./assets/sounds/sound4.mp3"
import volumeImage from "./components/volume-icon.png"
import muteImage from "./components/mute-icon.png"

// เพิ่มประกาศตัวแปร timerInterval
let timerInterval = null

const tiles = ref([])
const moves = ref(0)
const gameStarted = ref(false)
const time = ref(0)
let gridSize = 4 // Default grid size
const soundMute = ref(false)

const normalTileStyle = `boxshadow1 w-20 h-20  flex items-center justify-center text-3xl cursor-pointer bg-white border-gray-300`
const correctTileStyle = `boxshadow2 w-20 h-20  flex items-center justify-center text-3xl cursor-pointer bg-purple-700 text-warning`

//all sounds
const sound1 = new Audio(shuffleSound)
const sound2 = new Audio(moveSound)
const sound3 = new Audio(backgroudSound)
const sound4 = new Audio(congratsSound)

const difficultyLevels = {
  easy: { size: 4 },
  medium: { size: 5 },
  hard: { size: 6 },
}

const startGame = (difficulty) => {
  gameStarted.value = true
  gridSize = difficultyLevels[difficulty].size

  // เพิ่มยกเลิก setInterval เก่า

  clearInterval(timerInterval)
  time.value = 0
  initializeGame()
  shuffle()
  Timer()
}

const playShuffleSound = () => {
  if (!soundMute.value) {
    sound1.play()
  }
}

const playMoveSound = () => {
  if (!soundMute.value) {
    sound2.play()
  }
}

const playbackgroudSound = () => {
  if (!soundMute.value) {
    sound3.play()
    sound3.loop = true
  }
}

const playCongratsSound = () => {
  if (!soundMute.value) {
    sound4.play()
  }
}

const toggleMute = () => {
  soundMute.value = !soundMute.value

  if (soundMute.value) {
    pauseAllSounds()
  } else {
    if (sound3.currentTime === 0 || sound3.currentTime === sound3.duration) {
      playbackgroudSound()
    }
  }
}

const pauseAllSounds = () => {
  sound1.pause()
  sound2.pause()
  sound3.pause()
  // Reset the currentTime when paused
  sound3.currentTime = 0
  sound4.pause()
}

const initializeGame = () => {
  const totalTiles = gridSize * gridSize
  const tilesArray = [...Array(totalTiles).keys()].slice(1) // Generate numbers from 1 to totalTiles - 1
  tilesArray.push(0) // Add the empty tile
  do {
    tilesArray.sort(() => Math.random() - 0.5) // Shuffle the tiles
  } while (!isSolvable(tilesArray))
  tiles.value = tilesArray
  moves.value = 0
  time.value = 0
}

const isSolvable = (tilesArray) => {
  let inversions = 0
  const length = tilesArray.length
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if (
        tilesArray[i] > tilesArray[j] &&
        tilesArray[i] !== 0 &&
        tilesArray[j] !== 0
      ) {
        inversions++
      }
    }
  }
  return inversions % 2 === 0
}

const Timer = () => {
  //เพิ่มตัวแปร timerInterval
  timerInterval = setInterval(() => {
    time.value++
  }, 1000)
}

const formatTime = (time) => {
  const hours = `0${Math.floor(time / 3600)}`.slice(-2)
  const minutes = `0${Math.floor((time % 3600) / 60)}`.slice(-2)
  const seconds = `0${time % 60}`.slice(-2)
  return `${hours}:${minutes}:${seconds}`
}

const shuffle = () => {
  const totalTiles = gridSize * gridSize

  const tilesArray = [...Array(totalTiles).keys()].slice(1) // Generate numbers from 1 to totalTiles - 1
  tilesArray.push(0) // Add the empty tile

  do {
    tilesArray.sort(() => Math.random() - 0.5) // Shuffle the tiles
  } while (!isSolvable(tilesArray))
  tiles.value = tilesArray
  moves.value = 0
  time.value = 0
}

const moveTile = (index) => {
  const emptyIndex = tiles.value.indexOf(0)
  if (isValidMove(index, emptyIndex)) {
    moves.value++
    ;[tiles.value[index], tiles.value[emptyIndex]] = [
      tiles.value[emptyIndex],
      tiles.value[index],
    ]
    if (isSolved()) {
      clearInterval(timerInterval)
      setTimeout(() => {
        showModal()
      }, 400)
    }
  }
}
const isValidMove = (index, emptyIndex) => {
  const row = Math.floor(index / gridSize)
  const col = index % gridSize
  const emptyRow = Math.floor(emptyIndex / gridSize)
  const emptyCol = emptyIndex % gridSize
  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  )
}

const isTileInCorrectPosition = (index) => {
  return tiles.value[index] === index + 1
}

const isSolved = () => {
  for (let i = 0; i < tiles.value.length - 1; i++) {
    if (tiles.value[i] !== i + 1) {
      return false
    }
  }
  return true
}

const isComplete = () => {
  tiles.value.sort((a, b) => a - b)
  const emptyIndex = tiles.value.indexOf(0)
  if (emptyIndex === 0) {
    tiles.value.shift()
    tiles.value.push(emptyIndex)
  }
}
const home = () => {
  gameStarted.value = false

  // ยกเลิก setInterval เก่า
  clearInterval(timerInterval)
  time.value = 0
}

const showModal = () => {
  playCongratsSound()
  my_modal_1.showModal()
}

onMounted(() => {
  initializeGame()
  Timer()
})
</script>

<style scoped>
@font-face {
  font-family: "MNPuKhem";
  src: url("./assets/fonts/MNPuKhem.ttf");
}

body {
  font-family: "MNPuKhem", "sans-serif";
}

.game-container {
  height: 100vh;
  background-image: url("@/components/bgspace.png");
  background: cover;
  background-size: cover;
  background-repeat: no-repeat;
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

img {
  border-radius: 4px;
  padding: 3px;
  width: 35px;
}

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn {
  font-size: 50px;
}

.btn:hover {
  box-shadow: rgba(255, 255, 255, 0.2) 0 3px 15px inset,
    rgba(0, 0, 0, 0.1) 0 3px 5px, rgba(0, 0, 0, 0.1) 0 10px 13px;
  transform: scale(1.05);
  font-size: 50px;
}

.btn1 {
  font-size: 20px;
  background-color: rgb(255, 221, 0);
  border-radius: 10px;
}

.btn1:hover {
  box-shadow: rgba(255, 255, 255, 0.2) 0 3px 15px inset,
    rgba(0, 0, 0, 0.1) 0 3px 5px, rgba(0, 0, 0, 0.1) 0 10px 13px;
  transform: scale(1.05);
  font-size: 20px;
}

.boxshadow1 {
  box-shadow: rgba(9, 14, 87, 0.5) 0px 2px 4px 0px inset;
}

.boxshadow2 {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.icon {
  width: 35px; /* Set the desired width */
  height: 40px; /* Set the desired height */
  margin-right: 5px; /* Adjust margin as needed */
}

/* Responsive */
@media only screen and (max-width: 768px) {
  h1 {
    font-size: 50px;
  }
  .game-container {
    padding: 10px;
  }

  .center {
    width: 100%;
  }

  .center1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btn {
    font-size: 40px;

    margin-right: 2px;
    margin-top: 20px;
  }

  .btn:hover {
    font-size: 40px;
  }

  .grid {
    max-width: 300px;
    margin: 0 auto;
  }

  .boxshadow1,
  .boxshadow2 {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .btn1 {
    font-size: 20px;
  }
  .btn1:hover {
    font-size: 20px;
  }
}
</style>
