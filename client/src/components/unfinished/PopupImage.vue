<template>
  <div>
    <!-- Popup Overlay -->
    <div v-if="store.showPopup" class="">
      <!-- Draggable/Resizable Image Box -->
      <div
          class="absolute bg-white rounded-lg overflow-hidden border shadow-lg z-50 cursor-move"
          :style="popupStyle"
          @mousedown="startDrag"
          @touchstart="startDrag"
      >
        <!-- Resizable Corner -->
        <div
            class="absolute bottom-0 right-0 py-1 px-2 rounded-tl-lg text-primary-950 backdrop-blur-sm bg-black bg-opacity-20 cursor-se-resize z-50"
            @mousedown.stop="startResize"
            @touchstart.stop="startResize"
        ><i class="fa-solid fa-up-right-and-down-left-from-center text-sm"></i></div>
        <div
            class="absolute top-0 right-0 backdrop-blur-sm bg-black bg-opacity-20 rounded-tr-lg text-secondary-950 hover:text-red-500 duration-150 rounded-bl-lg w-8 h-8 flex justify-center items-center cursor-se-resize z-50"
            @click="store.removeImagePop(index)"
        ><i class="fa-solid fa-xmark text-lg"></i></div>

        <!-- Image -->
        <img crossorigin="anonymous" :src="image" class="w-full rounded-lg h-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, defineProps, onMounted, computed} from 'vue'
import { useUnfinishedStore } from '@/stores/StoreUnfinshed.js'
const store = useUnfinishedStore();
const prop =defineProps({
  image: String,
  index: Number,
});
const popup = reactive({
  x: 100,
  y: 100,
  width: 300,
  height: 200
})

const dragging = ref(false)
const resizing = ref(false)
const start = { x: 0, y: 0, width: 0, height: 0 }

const popupStyle = computed(() => ({
  left: popup.x + 'px',
  top: popup.y + 'px',
  width: popup.width + 'px',
  height: popup.height + 'px'
}))

function getEventPosition(e) {
  if (e.touches) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  } else {
    return { x: e.clientX, y: e.clientY }
  }
}

function startDrag(e) {
  const pos = getEventPosition(e)
  dragging.value = true
  start.x = pos.x - popup.x
  start.y = pos.y - popup.y

  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopAll)
  document.addEventListener('touchmove', drag)
  document.addEventListener('touchend', stopAll)
}

function drag(e) {
  if (!dragging.value) return
  const pos = getEventPosition(e)
  popup.x = pos.x - start.x
  popup.y = pos.y - start.y
}

function startResize(e) {
  const pos = getEventPosition(e)
  resizing.value = true
  start.x = pos.x
  start.y = pos.y
  start.width = popup.width
  start.height = popup.height

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopAll)
  document.addEventListener('touchmove', resize)
  document.addEventListener('touchend', stopAll)
}

function resize(e) {
  if (!resizing.value) return
  const pos = getEventPosition(e)
  popup.width = start.width + (pos.x - start.x)
  popup.height = start.height + (pos.y - start.y)
}

function stopAll() {
  dragging.value = false
  resizing.value = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopAll)
  document.removeEventListener('touchmove', drag)
  document.removeEventListener('touchend', stopAll)
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('touchmove', resize)
}
</script>

<style scoped>
img {
  user-select: none;
  pointer-events: none;
}
</style>
