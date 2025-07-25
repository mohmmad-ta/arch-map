<script setup>
import { useRouter } from 'vue-router';
import SideBar from "@/components/dash/SideBar.vue";
import { useDashStore } from '@/stores/StoreDash'
import {onBeforeUnmount, onMounted, ref} from 'vue';
import ButtonUpload from "@/components/dash/ButtonUpload.vue";
import axios from "axios";
import Swal from 'sweetalert2';

const store = useDashStore();
const router = useRouter();
import Login from "@/components/dash/Login.vue";

import {useI18n} from "vue-i18n";

const { t } = useI18n()

const imageRef = ref(null);
const addPin = (event) => {

  const rect = imageRef.value.getBoundingClientRect();
  const x = event.clientX - rect.left;

  const y = event.clientY - rect.top;
  store.addPin( x, y );

};
const imageUrl = ref(null);

const fileInput = ref(null);
function handleDrop(event) {
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    updateImage(file);
  } else {
    alert('Please drop a valid image file.');
  }

}
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    updateImage(file);
  } else {
    alert('Please select a valid image file.');
  }

}
function triggerFileInput() {
  fileInput.value.click();

}
function updateImage(file) {
  store.imageCover = file
  if (store.imageCoverUp) {
    URL.revokeObjectURL(store.imageCoverUp);
  }

  store.imageCoverUp = URL.createObjectURL(file);

}
const options = [
  { label: t('dash_select_completed'), value: 'completed' },
  { label: t('dash_select_planned'), value: 'planned' },
  { label: t('dash_select_unfinished'), value: 'unfinished' },
]

const submitNewMap = async () => {
  const formData = new FormData()
  formData.append('name', store.name)
  formData.append('imageCover', store.imageCover)
  formData.append('category', store.category)
  formData.append('pins', JSON.stringify(store.pinsData))
  store.pinsData.forEach((pin, index) => {
    pin.images.forEach((imageFile) => {
      formData.append(`${index}`, imageFile);
    });
  });

  try {
    const response = await axios.post('/map', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    Swal.fire(t('dash_alert_title'), t('dash_alert_disc'));

  } catch (error) {
    console.error('Upload failed:', error)
  }
}
const deleteMap = async () => {
  if (store.id){
    try {
      const response = await axios.delete(`/map/${store.id}`,)
      store.removeOnePinIn()
      store.removeData()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }else {
    store.removeData()
  }

}

onMounted(async () => {
  try {
    axios.get('/auth/me',).then(()=>{
      store.isLogin = true
    })
    const response = await axios.get('/map?fields=name,createAt,category&sort=-createAt',)
    store.slidData = response.data.data
  } catch (error) {
    console.error('Upload failed:', error)
  }
});
</script>

<template>
  <main>
    <header class="w-full z-50 h-16 fixed bg-white">
      <nav class="container w-full h-full flex items-center justify-between">
        <i @click="router.back()"  class="fa-solid fa-arrow-left text-blue-400 text-3xl cursor-pointer"></i>
        <div v-if="store.isLogin">
          <Transition v-if="store.slidOpen">
            <i @click="store.slidOpen = false" class="fa-solid fa-bars-staggered text-blue-400 text-3xl cursor-pointer"></i>
          </Transition>
          <Transition v-else>
            <i @click="store.slidOpen = true" class="fa-solid fa-bars text-blue-400 text-3xl cursor-pointer"></i>
          </Transition>
        </div>
      </nav>
    </header>

    <div class="w-full h-16"></div>

    <Transition>
      <div v-if="store.imageCoverUp" class="overflow-scroll mt-2 flex justify-center">
        <div class="relative inline-block" @click="addPin">
          <img ref="imageRef" class="w-[1540px] h-[900px] rounded-md" crossorigin="anonymous" :src="store.imageCoverUp" alt="Map" />

          <div
              v-for="(pin, index) in store.pins"
              :key="index"
              class="absolute p-2 bg-primary-100 backdrop-blur-sm rounded-full"
              :style="{ left: pin.x -15 + 'px', top: pin.y -15 + 'px' }"
          >
            <i class="fa-solid fa-thumbtack text-red-600 text-2xl cursor-pointer"></i>
          </div>
        </div>
      </div>
    </Transition>

    <div class="w-full pt-6 pb-20">
      <div class="p-6 container bg-white shadow-lg justify-center border-secondary-50 border-2 rounded-lg shadow-primary-200">
        <div class="w-full block lg:flex gap-6">
          <div class="w-full">
            <div class="flex gap-8 mb-4 items-center justify-end">
              <div class="flex gap-2 items-center justify-end">
                <div>
                  <select
                      v-model="store.category"
                      class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option disabled value="">{{ $t('dash_select') }}</option>
                    <option v-for="option in options" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </div>
                <h2 class="font-bold text-blue-500"> : {{ $t('dash_select_title') }}</h2>
              </div>
              <div class="flex gap-2 items-center justify-end">
                <input type="text" v-model="store.name" placeholder="Name Rome" class="bg-secondary-50 border w-60 lg:w-96 border-secondary-200 text-sm text-right px-2 py-1 rounded-md">
                <h2 class="font-bold text-blue-500"> : {{ $t('dash_map_title') }}</h2>
              </div>
            </div>
            <div v-if="store.pins.length !== 0" class="flex gap-4 items-center justify-end mb-2" v-for="(pin, index) in store.pins">
              <ButtonUpload :index="index" />
              <input type="text" v-model="store.pinsData[index].name" placeholder="Name Rome" class="bg-secondary-50 border border-secondary-200 text-sm text-right px-2 py-1 rounded-md">
              <div class="size-4 bg-blue-500 rounded-full"></div>
              <i @click="store.removePin(index)" class="fa-solid cursor-pointer fa-xmark text-xl text-secondary-950 hover:text-red-400 duration-200"></i>
            </div>
            <div v-else class="flex gap-4 items-center justify-end mb-2">
              <p class="text-secondary-950 text-sm">{{ $t('dash_alert_no_map') }}</p>
              <div class="size-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <!--    start input map     -->
          <div>
            <!-- Drop zone + Clickable area -->
            <div
                @dragover.prevent
                @drop.prevent="handleDrop"
                @click="triggerFileInput"
                class="w-64 h-40 border-2 p-2 border-dashed text-secondary-950 duration-150 hover:text-blue-500 hover:border-blue-500 border-gray-400 flex items-center justify-center rounded-md cursor-pointer relative"
            >
              <p v-if="!store.imageCoverUp" class="w-full text-center ">{{ $t('dash_image_drop') }}</p>
              <img v-else crossorigin="anonymous" :src="store.imageCoverUp" alt="Preview" class="max-h-full rounded-lg max-w-full object-contain" />
            </div>

            <!-- Hidden file input -->
            <input
                type="file"
                ref="fileInput"
                accept="image/*"
                @change="handleFileChange"
                class="hidden"
            />
          </div>
          <!--    end input map     -->
        </div>
        <div class="w-full pt-6 gap-8 flex items-center justify-center">
          <button v-if="store.id" @click="deleteMap" class="bg-secondary-950 hover:bg-red-100 hover:text-red-600 min-w-40 duration-150 text-white px-4 py-2 rounded-md" type="button">
            {{ $t('dash_delete') }}
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <button v-else @click="submitNewMap" class="bg-blue-500 hover:bg-blue-600 min-w-40 duration-150 text-white px-4 py-2 rounded-md" type="button">{{ $t('dash_Save') }}</button>
        </div>
      </div>


    </div>

    <Transition>
      <SideBar />
    </Transition>
    <Login />


  </main>
</template>

<style scoped>

</style>