<script setup>
const images = [
  'http://localhost:7050/public/images/products/1753313289459-imageCover.jpeg',
]

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
  <main class="">
    <div class="container min-h-screen w-full flex justify-center items-center">
      <div class="loader w-72 h-72 relative ">
        <RouterLink to="/Dashboard" class="w-24 flex justify-center items-center h-24 rounded-full absolute top-0 left-0 bg-blue-400">
          <i class="fa-solid fa-table-columns loader2 text-3xl text-white"></i>
        </RouterLink>
        <RouterLink to="/CompletedProjects" class="w-24 flex justify-center items-center h-24 rounded-full absolute top-0 right-0 bg-red-500">
          <i class="fa-solid fa-city text-3xl loader2 text-white"></i>
        </RouterLink>
        <RouterLink to="/PlannedProjects" class="w-24 flex justify-center items-center h-24 rounded-full absolute bottom-0 left-0 bg-green-600">
          <i class="fa-solid fa-building-circle-exclamation loader2 text-3xl text-white"></i>
        </RouterLink>
        <RouterLink to="/UnfinishedProjects" class="w-24 flex justify-center items-center h-24 rounded-full absolute bottom-0 right-0 bg-orange-400">
          <i class="fa-solid fa-map loader2 text-3xl text-white"></i>
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
