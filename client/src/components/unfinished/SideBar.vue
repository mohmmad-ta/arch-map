<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import { useCompStore } from '@/stores/StoreCompleted.js'
const router = useRouter();
const datas = ref([
  {name: "mohammed", id: 1},
  {name: "mohammed", id: 2},
  {name: "mohammed", id: 3},
  {name: "mohammed", id: 4},
  {name: "mohammed", id: 5},
  {name: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi beatae deserunt doloremque dolores inventore nesciunt recusandae sed unde! A accusamus commodi consequatur doloremque eius error ipsam itaque obcaecati sit totam.", id: 6},
])

const store = useCompStore();
</script>

<template>
  <main :class="store.slidOpen === true ? 'right-0' : 'right-[-20rem]'" class="duration-200 z-50 fixed justify-center w-80 right-0 top-16 h-full bg-white p-5">
    <div v-for="data in datas" class="w-full flex items-center overflow-hidden justify-center p-2.5 border border-secondary-100 rounded-sm bg-secondary-50 mb-1.5">
      <h1 class="text-secondary-950 text-wrap text-right w-full text-sm">{{ data.name.length >= 100 ? data.name.slice(0, 100) + '...' : data.name }}</h1>
    </div>
    <div class="h-fit w-full px-10 relative md:absolute bottom-8">
      <button class="text-right duration-150 w-full p-2 mt-2 text-secondary-950 bg-secondary-100 text-sm hover:bg-red-100 hover:text-red-700 rounded" type="button">log out <i class="mx-0.5  fa-solid fa-arrow-right-from-bracket"></i></button>
    </div>
  </main>
</template>