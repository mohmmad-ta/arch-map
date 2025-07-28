<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import { useAboutStore } from '@/stores/StoreAboutUs.js'
import axios from "axios";
const router = useRouter();

const store = useAboutStore();
const getOneMap = async (id) => {
  try {
    store.slidOpen = false;
    const response = await axios.get(`/video/${id}`,);
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
  <main :class="store.slidOpen === true ? 'right-0' : 'right-[-20rem]'" class="duration-200 z-50 fixed justify-center w-80 right-0 top-16 h-full bg-white p-5">
    <div @click="getOneMap(data.id)" v-for="data in store.slidData" :class="data.id === store.id? 'border-co3-950 ':'border-secondary-100 hover:border-secondary-200'" class="w-full cursor-pointer gap-2 flex overflow-hidden justify-center p-2.5 border  hover:scale-105 duration-150 rounded-md bg-secondary-50 mb-1.5">
      <h1 class="text-secondary-950 text-wrap text-right w-full text-sm">{{ data.name.length >= 100 ? data.name.slice(0, 100) + '...' : data.name }}</h1>
      <div class="size-4 p-1 bg-co3-950 mt-0.5 rounded-full"></div>
    </div>
  </main>
</template>