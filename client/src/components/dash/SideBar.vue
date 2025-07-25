<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import { useDashStore } from '@/stores/StoreDash.js'
const store = useDashStore();
import axios from "axios";

const router = useRouter();
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
</script>

<template>
  <main :class="store.slidOpen === true ? 'right-0' : 'right-[-20rem]'" class="duration-200 z-50 fixed justify-center w-80 right-0 top-16 h-full bg-white p-5">
    <div @click="store.removeData()" class="w-full cursor-pointer gap-2 flex overflow-hidden justify-center p-2.5 border border-secondary-100 hover:border-secondary-200 hover:scale-105 duration-150 rounded-md bg-secondary-50 mb-1.5">
      <h1 class="text-secondary-950 text-wrap text-right w-full text-sm">{{$t('dash_sidebar_add')}}</h1>
    </div>
    <div @click="getOneMap(data.id)" v-for="data in store.slidData" class="w-full cursor-pointer gap-2 flex overflow-hidden justify-center p-2.5 border border-secondary-100 hover:border-secondary-200 hover:scale-105 duration-150 rounded-md bg-secondary-50 mb-1.5">
      <h1 class="text-secondary-950 text-wrap text-right w-full text-sm">{{ data.name.length >= 100 ? data.name.slice(0, 100) + '...' : data.name }}</h1>
      <div v-if="data.category === 'completed'" class="size-4 p-1 bg-co1-950 mt-0.5 rounded-full"></div>
      <div v-else-if="data.category === 'planned'" class="size-4 p-1 bg-co2-950 mt-0.5 rounded-full"></div>
      <div v-else-if="data.category === 'unfinished'" class="size-4 p-1 bg-co3-950 mt-0.5 rounded-full"></div>
    </div>
    <div class="h-fit w-full px-10 relative md:absolute bottom-8">
      <button class="text-right duration-150 w-full p-2 mt-2 text-secondary-950 bg-secondary-100 text-sm hover:bg-red-100 hover:text-red-700 rounded" type="button">{{$t('dash_logout')}}<i class="mx-0.5  fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>
  </main>
</template>