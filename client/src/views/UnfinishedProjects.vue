<script setup>
import { useRouter } from 'vue-router';
import SideBar from "@/components/unfinished/SideBar.vue";
import { useUnfinishedStore } from '@/stores/StoreUnfinshed.js'
import {onMounted, ref} from 'vue';
import PopupImage from "@/components/unfinished/PopupImage.vue";
import axios from "axios";
const store = useUnfinishedStore();

const router = useRouter();

const imageRef = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('/map?category=unfinished&fields=name,createAt,category&sort=-createAt',)
    store.slidData = response.data.data
    getOneMap(store.slidData[0].id)

  } catch (error) {
    console.error('Upload failed:', error)
  }
});

const getOneMap = async (id) => {
  try {
    const response = await axios.get(`/map/${id}`);
    const map = response.data?.data;
    if (!map) {
      console.error('No map data found');
      return;
    }
    store.id = map.id || '';
    store.pins = map.pins || [];
    store.pinsData = map.pins || [];
    store.imageCoverUp = map.imageCover || null;
    store.name = map.name || '';
    store.category = map.category || '';

    console.log('Fetched map:', map);
  } catch (error) {
    console.error('Fetching map failed:', error);
  }
};

const radius = 100 // distance from the center in pixels

function getImagePosition(index, total) {
  const angle = (index / total) * 2 * Math.PI
  const x = 50 + (radius * Math.cos(angle)) / 144 * 100 // convert px to %
  const y = 50 + (radius * Math.sin(angle)) / 144 * 100

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)'
  }
}
const openButton  = ref(-1);
const openPop = (img)=>{
  store.addImagePop(img);
  store.showPopup = true;
}
</script>

<template>
  <main>
    <header class="w-full z-50 h-16 fixed bg-white">
      <nav class="container w-full h-full flex items-center justify-between">
        <i @click="router.back()"  class="fa-solid fa-arrow-left text-co3-950 text-3xl cursor-pointer"></i>
        <h2 class="font-bold text-primary-950">{{ store.name.length >= 100 ? store.name.slice(0, 100) + '...' : store.name }}</h2>
        <Transition v-if="store.slidOpen">
          <i @click="store.slidOpen = false" class="fa-solid fa-bars-staggered text-co3-950 text-3xl cursor-pointer"></i>
        </Transition>
        <Transition v-else>
          <i @click="store.slidOpen = true" class="fa-solid fa-bars text-co3-950 text-3xl cursor-pointer"></i>
        </Transition>
      </nav>
    </header>

    <div class="w-full h-16"></div>

    <TransitionGroup>
      <div v-if="store.imageCoverUp" class="mt-2 flex justify-center">
        <div class="relative mx-24 w-full h-[90%] overflow-hidden inline-block" >
          <img ref="imageRef" class="w-full h-full rounded-md" crossorigin="anonymous" :src="store.imageCoverUp" alt="Map" />

          <div
              v-for="(pin, index) in store.pins"
              :key="index"
              class="absolute border-gray-500 rounded-full"
              :style="{
                left: pin.x + '%',
                top: pin.y + '%',
                transform: 'translate(-50%, -50%)',
              }"
          >
            <div class="relative w-20 h-20 mx-auto">
              <!-- Center Button -->
              <button @click="openButton === index ? openButton=-1 : openButton=index" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-primary-100 backdrop-blur-sm text-white p-2 rounded-full">
                <i class="fa-solid fa-thumbtack text-co3-950 text-2xl cursor-pointer"></i>
              </button>

              <!-- Dynamic Images -->
              <TransitionGroup>
                <div
                    v-if="index === openButton"
                    v-for="(img, index) in pin.images"
                    :key="index"
                    class="absolute w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md"
                    :style="getImagePosition(index, pin.images.length)"
                >
                  <img @click="openPop(img)" crossorigin="anonymous" :src="img" alt="image" class="w-full cursor-pointer h-full object-cover" />
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-full flex py-32 items-center justify-center">
        <p class="text-center text-secondary-950 text-sm">{{ $t('dash_alert_no_map') }}</p>
      </div>
    </TransitionGroup>

    <Transition>
      <SideBar />
    </Transition>
    <div class="fixed w-screen h-screen top-0 left-0 pointer-events-none">
      <div v-for="(image, index) in store.imagesPopup">
        <Transition>
          <PopupImage class="pointer-events-auto" :index="index" :image="image" />
        </Transition>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>