<template>
  <div>
    <!-- Popup Overlay -->
    <div v-if="store.showPopup" class="">
      <!-- Draggable/Resizable Image Box -->
      <div
          class="absolute bg-white rounded-lg overflow-hidden border shadow-lg z-50 cursor-move"
          :style="popupStyle"
          @mousedown="startDrag"
      >
        <!-- Resizable Corner -->
        <div
            class="absolute bottom-0 right-0 py-1 px-2 rounded-tl-lg text-primary-950 backdrop-blur-sm bg-black bg-opacity-20 cursor-se-resize z-50"
            @mousedown.stop="startResize"
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
import { useCompStore } from '@/stores/StoreCompleted.js'
const store = useCompStore();
const prop =defineProps({
  image: String,
  index: Number,
});
const show = ref(false)

const popup = reactive({
  x: 100,
  y: 100,
  width: 300,
  height: 200
})

const dragging = ref(false)
const resizing = ref(false)
const start = { x: 0, y: 0 }

const popupStyle = computed(() => ({
  left: popup.x + 'px',
  top: popup.y + 'px',
  width: popup.width + 'px',
  height: popup.height + 'px'
}))

function startDrag(e) {
  dragging.value = true
  start.x = e.clientX - popup.x
  start.y = e.clientY - popup.y

  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopAll)
}

function drag(e) {
  if (dragging.value) {
    popup.x = e.clientX - start.x
    popup.y = e.clientY - start.y
  }
}

function startResize(e) {
  resizing.value = true
  start.x = e.clientX
  start.y = e.clientY
  start.width = popup.width
  start.height = popup.height

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopAll)
}

function resize(e) {
  if (resizing.value) {
    popup.width = start.width + (e.clientX - start.x)
    popup.height = start.height + (e.clientY - start.y)
  }
}

function stopAll() {
  dragging.value = false
  resizing.value = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopAll)
}
</script>

<style scoped>
img {
  user-select: none;
  pointer-events: none;
}
</style>
