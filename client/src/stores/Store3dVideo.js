import {ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const use3dStore = defineStore('video3dData', {
  state: () => ({
    id: '',
    pins: [],
    name: "",
    pinsData: [],
    category: "",
    imageCover: null,
    imageCoverUp: '',
    slidOpen: false,
    slidData: [],
    showPopup: false,
    imagesPopup: [],
  }),

  actions: {
    addImagePop(image) {
      if (!this.imagesPopup.includes(image)) {
        this.imagesPopup.push(image);
      }
    },
    removeImagePop(index) {
      this.imagesPopup.splice(index, 1);
    },

    addPin(x, y) {
      this.pins.push({ x, y, images: [], name: '' });
      this.pinsData.push({ x, y, images: [], name: '' });
    },
    removePin(index) {
      this.pins.splice(index, 1);
      this.pinsData.splice(index, 1);
    },

    addImageToPin(index, data) {
      if (this.pins[index]) {
        this.pins[index].images.push(data);
      }
    },
    addImageToPinData(index, data) {
      if (this.pinsData[index]) {
        this.pinsData[index].images.push(data);
      }
    },
    removeImageToPin(index) {
      this.pins[index].images.splice(index, 1);
      this.pinsData[index].images.splice(index, 1);
    },
    removeData() {
      this.id= ''
      this.pins= []
      this.name= ""
      this.pinsData= []
      this.category= ""
      this.imageCover= null
      this.imageCoverUp= ''
    },
  }
});