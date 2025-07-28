<script setup>
import { useRouter } from 'vue-router';
import SideBar from "@/components/aboutus/SideBar.vue";
import { useAboutStore } from '@/stores/StoreAboutUs.js'
import {onMounted} from 'vue';
import axios from "axios";
const store = useAboutStore();

const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('/video?category=about&fields=name,createAt&sort=-createAt',)
    store.slidData = response.data.data
    getOneMap(store.slidData[0].id)

  } catch (error) {
    console.error('Upload failed:', error)
  }
});

const getOneMap = async (id) => {
  try {
    const response = await axios.get(`/video/${id}`);
    const map = response.data?.data;
    if (!map) {
      console.error('No map data found');
      return;
    }
    store.id = map.id || '';
    store.imageCoverUp = map.video || null;
    store.name = map.name || '';

    console.log('Fetched map:', map);
  } catch (error) {
    console.error('Fetching map failed:', error);
  }
};

</script>

<template>
  <main>
    <header class="w-full z-50 h-16 fixed bg-white">
      <nav class="container w-full h-full flex items-center justify-between">
        <i @click="router.back()"  class="fa-solid fa-arrow-left text-purple-500 text-3xl cursor-pointer"></i>
        <h2 class="font-bold text-primary-950">{{ store.name.length >= 100 ? store.name.slice(0, 100) + '...' : store.name }}</h2>
        <Transition v-if="store.slidOpen">
          <i @click="store.slidOpen = false" class="fa-solid fa-bars-staggered text-purple-500 text-3xl cursor-pointer"></i>
        </Transition>
        <Transition v-else>
          <i @click="store.slidOpen = true" class="fa-solid fa-bars text-purple-500 text-3xl cursor-pointer"></i>
        </Transition>
      </nav>
    </header>

    <div class="w-full h-16"></div>

    <TransitionGroup>
      <div v-if="store.imageCoverUp" class="mt-2 flex justify-center">
        <div class="relative mx-24 w-full h-[90%] overflow-hidden inline-block" >
          <video
              crossorigin="anonymous"
              :src="store.imageCoverUp"
              controls
              class="w-full h3dVideo rounded-md object-contain"
          ></video>
        </div>
      </div>
      <div v-else class="w-full flex py-32 items-center justify-center">
        <p class="text-center text-secondary-950 text-sm">{{ $t('dash_alert_no_map') }}</p>
      </div>
    </TransitionGroup>

    <Transition>
      <SideBar />
    </Transition>
  </main>
</template>

<style scoped>
.h3dVideo{
  height: 90vh !important;
}
</style>