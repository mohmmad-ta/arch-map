import {ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useDataStore = defineStore('data', () => {
  const allNews = ref([])



  return { allNews }
})