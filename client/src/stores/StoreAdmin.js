import {ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useAdminStore = defineStore('admin', () => {
  const slidOpen = ref(true)


  return { slidOpen}
})
