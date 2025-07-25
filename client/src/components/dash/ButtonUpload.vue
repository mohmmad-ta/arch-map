<template>
  <div class="flex gap-4 items-center justify-end">
    <!-- Image previews (click to remove) -->
    <div class="flex items-center flex-wrap gap-4">
      <div
          v-for="(img, index) in store.pins[index].images"
          :key="index"
          class="relative w-16 h-12 group cursor-pointer"
          @click="store.removeImageToPin(index)"
      >
        <img crossorigin="anonymous" :src="img" class="w-full h-full object-cover rounded border" />
        <div class="absolute inset-0 bg-black duration-150 bg-opacity-20 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 rounded">
          <i class="fa-solid fa-xmark text-xl text-secondary-950 hover:text-red-400 duration-200"></i>
        </div>
      </div>
    </div>
    <!-- File input (styled as button) -->
    <label class="cursor-pointer bg-blue-500 text-white px-4 py-1 text-sm duration-150 rounded-lg hover:bg-blue-600">
      {{ $t('upload_image') }}
      <input
      type="file"
      class="hidden"
      multiple
      accept="image/*"
      @change="handleFiles"
      />
    </label>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDashStore } from '@/stores/StoreDash'
const store = useDashStore();
const prop =defineProps({
  index: Number
});

const handleFiles = (e) => {
  const files = e.target.files;

  Array.from(files).forEach((file) => {
    store.addImageToPinData(prop.index, file)
    const reader = new FileReader();
    reader.onload = () => {
      store.addImageToPin(prop.index, reader.result)
    };
    reader.readAsDataURL(file);
  });

  // Optional: clear the file input after selection
  e.target.value = '';
};

</script>
