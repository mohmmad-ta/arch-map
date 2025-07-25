

import { defineStore } from 'pinia';

export const useDashStore = defineStore('map', {
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
    isLogin: false,
  }),

  actions: {
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
    removeOnePinIn() {
      const index = this.slidData.findIndex(item => item.id === this.id);
      if (index !== -1) {
        this.slidData.splice(index, 1);
      }
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