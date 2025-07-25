<script setup>
import {useRouter} from "vue-router";
const router = useRouter();
import axios from "axios";
import {ref} from "vue";
import { useDashStore } from '@/stores/StoreDash.js'
import {useI18n} from "vue-i18n";
const store = useDashStore();
let alertLogin = ref('')
let data = ref({
  email: "",
  password: "",
})
const { t } = useI18n()
const login = ()=>{
  if (data.value.email !== '' && data.value.password !== ''){
    axios.post(`auth/login`, data.value).then((data)=>{
      localStorage.setItem("token", data.data.token);
      store.isLogin = true;
      router.push("/Dashboard");
    }).catch((err)=>{
      alertLogin.value = t('login_alert')
    })
  }else {
    alertLogin.value = t('login_alert_required')
    return 0
  }
}
</script>

<template>
  <main v-if="!store.isLogin" class="fixed bg-white z-40 top-0 left-0 w-full h-full">
    <div class="min-h-screen w-full flex items-center justify-center">
      <div class="p-5 w-96">
        <!--    logo    -->
        <div class="items-center flex gap-4 mb-4 justify-center w-full">
          <h2 class="font-bold text-primary-950">{{ $t('login_logo') }}</h2>
        </div>
        <!--    input     -->
        <form class="text-right">

          <!--   input user name   -->
          <label class="text-secondary-950">{{ $t('login_email') }}</label>
          <div class="flex gap-2 mt-1 text-sm">
            <input v-model="data.email" type="email" class="outline-none w-full text-right border-zinc-200 border-1 text-white transition px-3 py-2 bg-inputColor-950 rounded-md">
          </div>
          <!--   input user name   -->
          <label class="text-secondary-950">{{ $t('login_password') }}</label>
          <div class="flex gap-2 mt-1 text-sm">
            <input v-model="data.password" type="password" class="outline-none w-full text-right border-zinc-200 border-1 text-white transition px-3 py-2 bg-inputColor-950 rounded-md">
          </div>
          <Transition>
            <p v-if="alertLogin !== ''" class="p-2 text-sm bg-red-200 text-red-700 rounded">{{alertLogin}}</p>
          </Transition>


          <div class="flex justify-center py-4 items-center gap-4">
            <button @click="login()" type="button" class="w-3/4 bg-main-50 py-2 font-bold text-white rounded">{{ $t('login_button') }}</button>
          </div>

        </form>
      </div>
    </div>

  </main>
</template>