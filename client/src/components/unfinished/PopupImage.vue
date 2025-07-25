<template>
  <div>
    <!-- Popup Overlay -->
    <div v-if="store.slidOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <!-- Draggable/Resizable Image Box -->
      <div
          class="absolute bg-white border shadow-lg cursor-move"
          :style="popupStyle"
          @mousedown="startDrag"
      >
        <!-- Resizable Corner -->
        <div
            class="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize z-50"
            @mousedown.stop="startResize"
        ></div>

        <!-- Image -->
        <img :src="image" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted } from 'vue'
import { useCompStore } from '@/stores/StoreCompleted.js'
const store = useCompStore();
const prop =defineProps({
  image: String
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
