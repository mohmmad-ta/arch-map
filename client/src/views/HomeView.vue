<script setup>
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
</script>

<template>
  <main class="relative">
    <img class="w-full h-full absolute top-0 left-0" src="../assets/back.jpg" alt="">
    <header class="w-full z-50 fixed  backdrop-blur-sm bg-white/5">
      <nav class="container w-full h-full flex items-center justify-between">
        <div class="flex items-center  gap-4 justify-center">
          <a class="size-8 flex items-center justify-center duration-150 rounded-full bg-main-50 hover:scale-105 hover:bg-main-200 text-white hover:text-main-50" href="https://www.facebook.com/profile.php?id=61578143796949">
            <i class="fa-brands fa-facebook-f text-lg"></i>
          </a>
          <a class="size-8 flex items-center justify-center duration-150 rounded-full bg-main-50 hover:scale-105 hover:bg-main-200 text-white hover:text-main-50" href="https://www.instagram.com/abraj.alomran.co/">
            <i class="fa-brands fa-instagram text-xl"></i>
          </a>
        </div>
        <img class="w-40" src="./../assets/logo.png" alt="">
      </nav>
    </header>
    <div class="container min-h-screen w-full flex justify-center items-center">
      <div class="loader w-52 h-52 relative ">
        <RouterLink :style="getImagePosition(0, 6)" to="/Dashboard" class="size-28 flex justify-center items-center rounded-full absolute top-0 left-0 bg-main-50">
          <i class="fa-solid fa-table-columns loader2 text-3xl text-white"></i>
        </RouterLink>
        <RouterLink :style="getImagePosition(1, 6)" to="/CompletedProjects" class="size-28 flex justify-center items-center rounded-full absolute top-0 right-0 bg-co1-950">
          <i class="fa-solid fa-city text-3xl loader2 text-white"></i>
        </RouterLink>
        <RouterLink :style="getImagePosition(2, 6)" to="/PlannedProjects" class="size-28 flex justify-center items-center rounded-full absolute bottom-0 left-0 bg-co2-950">
          <i class="fa-solid fa-building-circle-exclamation loader2 text-3xl text-white"></i>
        </RouterLink>
        <RouterLink :style="getImagePosition(3, 6)" to="/UnfinishedProjects" class="size-28 flex justify-center items-center rounded-full absolute bottom-0 right-0 bg-co3-950">
          <i class="fa-solid fa-map loader2 text-3xl text-white"></i>
        </RouterLink>
        <RouterLink :style="getImagePosition(4, 6)" to="/AboutUs" class="size-28 flex justify-center items-center rounded-full absolute bottom-0 right-0 bg-purple-500">
          <i class="fa-regular fa-building loader2 text-3xl text-white"></i>
        </RouterLink>
        <RouterLink :style="getImagePosition(5, 6)" to="/Page3DVideo" class="size-28 flex justify-center items-center rounded-full absolute bottom-0 right-0 bg-pink-600">
          <i class="fa-solid fa-map-location-dot loader2 text-3xl text-white"></i>
        </RouterLink>

      </div>
    </div>

  </main>
</template>

<style>
.loader {
  animation: spin 11s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader2 {
  animation: spin2 11s linear infinite;
}

@keyframes spin2 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
</style>
