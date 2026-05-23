<template>
  <div class="video-gallery-wrapper bg-neutral-950 min-h-screen flex flex-col">
    <div class="bg-neutral-900 border-b border-neutral-800">
      <div class="container mx-auto px-4 lg:px-8 py-6">
        <nav class="text-xs text-neutral-500 mb-4 font-semibold tracking-wider uppercase">
          <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
          <span class="mx-2">&gt;</span>
          <span class="text-rose-500">Video Gallery</span>
        </nav>

        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 class="text-4xl font-black text-white uppercase brand-font">Watch The Builds</h1>
            <p class="text-neutral-400 mt-2 text-sm max-w-xl">
              Catch up on the latest projects, behind-the-scenes footage, and exclusive deep-dives from the Gotham Garage crew.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2 mt-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="changeCategory(category)"
              class="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full transition-colors border"
              :class="
                selectedCategory === category
                  ? 'bg-rose-600 text-white border-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-neutral-700'
              "
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="flex-grow container mx-auto px-4 lg:px-8 py-10">

      <div v-if="featuredVideo && selectedCategory === 'All Videos'" class="mb-12">
        <div
          :id="'video-' + featuredVideo.id"
          @click="openVideo(featuredVideo.youtubeId)"
          class="relative w-full aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer transition-all duration-300"
          :class="[
            focusedVideoId === featuredVideo.id
              ? 'border-4 border-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.6)] scale-[1.01] z-10'
              : 'border border-neutral-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]'
          ]"
        >
          <img :src="featuredVideo.thumbnail" :alt="featuredVideo.title" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-rose-600 flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.6)] group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" class="text-white ml-2">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            </div>
          </div>

          <div class="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
            <span class="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-3 inline-block">Featured</span>
            <h2 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white brand-font mb-2">{{ featuredVideo.title }}</h2>
            <div class="flex items-center gap-4 text-neutral-300 text-xs md:text-sm font-bold uppercase tracking-wider">
              <span>{{ featuredVideo.views }} Views</span>
              <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              <span>Duration: {{ featuredVideo.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-white uppercase brand-font mb-6 border-l-4 border-rose-600 pl-3">
        {{ selectedCategory === 'All Videos' ? 'More Episodes' : selectedCategory }}
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="video in filteredGridVideos"
          :key="video.id"
          :id="'video-' + video.id"
          @click="openVideo(video.youtubeId)"
          :class="[
            'bg-neutral-900 border rounded-lg overflow-hidden video-card-hover group cursor-pointer flex flex-col transition-all duration-300',
            // HIGHLIGHT LOGIC: Glows red if URL matched OR if Keyboard Focused!
            (route.query.highlight == video.id || focusedVideoId === video.id)
              ? 'border-2 border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)] scale-[1.03] z-10'
              : 'border-neutral-800 hover:border-neutral-700'
          ]"
        >
          <div class="relative aspect-video bg-black flex items-center justify-center">
            <img :src="video.thumbnail" :alt="video.title" class="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity">
            <div class="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(225,29,72,0.5)]">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="ml-1">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            </div>
            <span class="absolute bottom-2 right-2 bg-black/90 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">{{ video.duration }}</span>
          </div>

          <div class="p-4 flex flex-col flex-grow">
            <span class="text-rose-500 text-[10px] font-black uppercase tracking-widest mb-1">{{ video.category }}</span>
            <h4 class="text-white font-bold text-sm lg:text-base mb-2 line-clamp-2 leading-snug">{{ video.title }}</h4>
            <div class="mt-auto text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center justify-between">
              <span>{{ video.views }} Views</span>
              <span>Recently Added</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredGridVideos.length === 0" class="text-center py-20 text-neutral-500">
        <p class="text-lg font-bold brand-font uppercase">No videos found in this category.</p>
      </div>
    </section>

    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">

        <div class="absolute inset-0 bg-black/90 backdrop-blur-md" @click="closeModal"></div>

        <div class="relative z-[110] w-full max-w-6xl flex flex-col">
          <div class="flex justify-between items-center mb-4 text-neutral-400">
            <span class="text-xs uppercase font-bold tracking-widest">Press 'ESC' to Close • Press 'F' for Fullscreen</span>
            <button @click="closeModal" class="hover:text-rose-500 transition-colors flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
              Close Video
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div ref="videoWrapperRef" class="w-full aspect-video bg-black rounded-lg overflow-hidden border border-neutral-800 shadow-[0_0_50px_rgba(225,29,72,0.15)]">
            <iframe
              v-if="currentVideoId"
              :src="`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              class="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import videoData from '../data/videos.json'

const route = useRoute()

// --- STATE LOGIC ---
const selectedCategory = ref('All Videos')
const isModalOpen = ref(false)
const currentVideoId = ref(null)
const focusedVideoId = ref(null) // Tracks keyboard focus
const videoWrapperRef = ref(null) // Targets the iframe container for Fullscreen

const categories = computed(() => {
  const uniqueCategories = [...new Set(videoData.map(v => v.category))]
  const filteredCategories = uniqueCategories.filter(cat => cat !== 'Featured')
  return ['All Videos', ...filteredCategories]
})

const featuredVideo = computed(() => {
  return videoData.find(video => video.isFeatured === true)
})

const filteredGridVideos = computed(() => {
  if (selectedCategory.value === 'All Videos') {
    return videoData.filter(video => video.id !== featuredVideo.value?.id)
  } else {
    return videoData.filter(video => video.category === selectedCategory.value)
  }
})

// Combined list of ALL visible videos so the Arrow Keys know what to cycle through
const visibleVideos = computed(() => {
  const list = []
  if (featuredVideo.value && selectedCategory.value === 'All Videos') {
    list.push(featuredVideo.value)
  }
  list.push(...filteredGridVideos.value)
  return list
})

// Reset focus when user clicks a different filter category
const changeCategory = (category) => {
  selectedCategory.value = category
  focusedVideoId.value = null
}

// --- MODAL LOGIC ---
const openVideo = (youtubeId) => {
  if (!youtubeId) return
  currentVideoId.value = youtubeId
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  currentVideoId.value = null
  document.body.style.overflow = 'auto'
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoWrapperRef.value?.requestFullscreen().catch(err => console.log(err))
  } else {
    document.exitFullscreen()
  }
}

// --- SCROLLING LOGIC ---
const scrollToVideo = async (videoId) => {
  await nextTick()
  const element = document.getElementById(`video-${videoId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// ==========================================
// KEYBOARD NAVIGATION LOGIC (Heuristic #7 & Accessibility)
// ==========================================
// ==========================================
// RESPONSIVE KEYBOARD NAVIGATION LOGIC (Heuristic #7 & #4)
// ==========================================
// Helper to figure out how many columns are currently on the screen
const getGridColumns = () => {
  const width = window.innerWidth
  if (width >= 1280) return 4 // xl:grid-cols-4
  if (width >= 1024) return 3 // lg:grid-cols-3
  if (width >= 640) return 2  // sm:grid-cols-2
  return 1                    // default grid-cols-1
}

const handleKeydown = (event) => {
  // 1. Prevent shortcuts if typing in a search bar
  const activeTag = document.activeElement?.tagName.toLowerCase()
  if (activeTag === 'input' || activeTag === 'textarea') return

  // 2. If Modal is Open (Watching a video)
  if (isModalOpen.value) {
    if (event.key === 'Escape') closeModal()
    if (event.key.toLowerCase() === 'f') toggleFullscreen()
    return // Stop executing here!
  }

  // 3. If Modal is Closed (Navigating the Gallery)
  if (visibleVideos.value.length === 0) return

  // Find where we currently are
  const currentIndex = visibleVideos.value.findIndex(v => v.id === focusedVideoId.value)

  // If they press an arrow key before highlighting anything, start at the first video
  if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) {
    event.preventDefault() // Stop browser scrolling

    if (currentIndex === -1) {
      focusedVideoId.value = visibleVideos.value[0].id
      scrollToVideo(focusedVideoId.value)
      return
    }

    let nextIndex = currentIndex
    const cols = getGridColumns()
    const hasFeatured = featuredVideo.value && selectedCategory.value === 'All Videos'

    // Calculate true spatial movements!
    if (event.key === 'ArrowRight') {
      nextIndex = Math.min(currentIndex + 1, visibleVideos.value.length - 1)
    }
    else if (event.key === 'ArrowLeft') {
      nextIndex = Math.max(currentIndex - 1, 0)
    }
    else if (event.key === 'ArrowDown') {
      // If on Featured (index 0), just drop into the grid (index 1)
      if (hasFeatured && currentIndex === 0) {
        nextIndex = 1
      } else {
        // Jump down an entire row
        nextIndex = Math.min(currentIndex + cols, visibleVideos.value.length - 1)
      }
    }
    else if (event.key === 'ArrowUp') {
      // If moving up would put them past the top row of the grid...
      if (hasFeatured && currentIndex > 0 && currentIndex <= cols) {
        nextIndex = 0 // ...jump back up to the big Featured video!
      } else {
        // Jump up an entire row
        nextIndex = Math.max(currentIndex - cols, 0)
      }
    }

    // Apply the highlight and scroll
    if (nextIndex !== currentIndex) {
      focusedVideoId.value = visibleVideos.value[nextIndex].id
      scrollToVideo(focusedVideoId.value)
    }
  }

  // 4. Press Enter to Play!
  else if (event.key === 'Enter' && focusedVideoId.value) {
    event.preventDefault()
    const vidToPlay = visibleVideos.value.find(v => v.id === focusedVideoId.value)
    if (vidToPlay) openVideo(vidToPlay.youtubeId)
  }
}

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  if (route.query.highlight) scrollToVideo(route.query.highlight)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(() => route.query.highlight, (newId) => {
  if (newId) scrollToVideo(newId)
})
</script>
