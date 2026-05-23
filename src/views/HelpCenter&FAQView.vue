<template>


    <!-- MAIN CONTENT -->
    <main class="flex-grow flex flex-col">

      <!-- HERO / SEARCH SECTION -->
      <section class="relative bg-neutral-900 border-b border-neutral-800 py-16 lg:py-24">
        <!-- Subtle background pattern overlay -->
        <div class="absolute inset-0 opacity-20 hero-pattern bg-cover bg-center"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900"></div>

        <div class="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 class="text-4xl md:text-5xl font-black text-white uppercase brand-font mb-4">
            How can we <span class="text-rose-600">help you?</span>
          </h1>
          <p class="text-neutral-400 mb-8 max-w-2xl mx-auto text-lg">
            Search our knowledge base or browse categories below to find answers to your questions.
          </p>

          <!-- Help Center Search -->
          <div class="max-w-2xl mx-auto relative focus-within:text-white text-neutral-400 transition-colors">
            <i class="fa-solid fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-lg"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search for shipping, returns, sizes..."
              class="w-full bg-neutral-950 border border-neutral-700 text-lg rounded-full pl-14 pr-6 py-4 focus:outline-none focus:border-rose-600 transition-colors text-white shadow-xl"
            />
          </div>
        </div>
      </section>

      <!-- CATEGORY QUICK LINKS -->
      <section class="py-12 bg-neutral-950">
        <div class="container mx-auto px-4 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative -mt-20 z-20">

            <!-- Category 1 -->
            <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-rose-500 hover:-translate-y-1 transition-all cursor-pointer shadow-lg group">
              <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <i class="fa-solid fa-box text-white text-xl"></i>
              </div>
              <h3 class="text-white font-bold text-lg mb-2 uppercase brand-font">Orders & Shipping</h3>
              <p class="text-neutral-400 text-sm">Track your package, delivery times, and shipping rates.</p>
            </div>

            <!-- Category 2 -->
            <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-rose-500 hover:-translate-y-1 transition-all cursor-pointer shadow-lg group">
              <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <i class="fa-solid fa-rotate-left text-white text-xl"></i>
              </div>
              <h3 class="text-white font-bold text-lg mb-2 uppercase brand-font">Returns & Exchanges</h3>
              <p class="text-neutral-400 text-sm">Learn about our 30-day return policy and how to start a return.</p>
            </div>

            <!-- Category 3 -->
            <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-rose-500 hover:-translate-y-1 transition-all cursor-pointer shadow-lg group">
              <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <i class="fa-solid fa-shirt text-white text-xl"></i>
              </div>
              <h3 class="text-white font-bold text-lg mb-2 uppercase brand-font">Product & Sizing</h3>
              <p class="text-neutral-400 text-sm">Size charts, apparel care instructions, and stock inquiries.</p>
            </div>

            <!-- Category 4 -->
            <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-rose-500 hover:-translate-y-1 transition-all cursor-pointer shadow-lg group">
              <div class="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-600 transition-colors">
                <i class="fa-solid fa-user-gear text-white text-xl"></i>
              </div>
              <h3 class="text-white font-bold text-lg mb-2 uppercase brand-font">Account Issues</h3>
              <p class="text-neutral-400 text-sm">Password resets, managing addresses, and order history.</p>
            </div>

          </div>
        </div>
      </section>

      <!-- FAQ ACCORDION SECTION -->
      <section class="py-16 bg-neutral-950 flex-grow">
        <div class="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-black text-white uppercase brand-font">Frequently Asked Questions</h2>
            <div class="w-24 h-1 bg-rose-600 mx-auto mt-4"></div>
          </div>

          <!-- FAQ List -->
          <div class="space-y-4">
            <div
              v-for="(faq, index) in filteredFaqs"
              :key="index"
              class="bg-neutral-900 border rounded-lg overflow-hidden transition-colors duration-300"
              :class="openFaqIndex === index ? 'border-rose-600' : 'border-neutral-800'"
            >
              <!-- Question Button -->
              <button
                @click="toggleFaq(index)"
                class="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span class="font-bold text-white text-lg">{{ faq.question }}</span>
                <i
                  class="fa-solid text-rose-500 transition-transform duration-300"
                  :class="openFaqIndex === index ? 'fa-minus transform rotate-180' : 'fa-plus'"
                ></i>
              </button>

              <!-- Answer Panel -->
              <div
                v-show="openFaqIndex === index"
                class="px-6 pb-6 pt-2 text-neutral-400 border-t border-neutral-800/50 leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>

            <!-- Empty State for Search -->
            <div v-if="filteredFaqs.length === 0" class="text-center py-10 bg-neutral-900 border border-neutral-800 rounded-lg">
              <i class="fa-solid fa-magnifying-glass text-4xl text-neutral-600 mb-4"></i>
              <h3 class="text-white font-bold text-xl mb-2">No results found</h3>
              <p class="text-neutral-400">We couldn't find any articles matching "{{ searchQuery }}".</p>
            </div>
          </div>

        </div>
      </section>

      <!-- CONTACT CALL TO ACTION -->
      <section class="py-16 bg-neutral-900 border-t border-neutral-800 text-center">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-black text-white uppercase brand-font mb-4">Still Need Help?</h2>
          <p class="text-neutral-400 mb-8 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our garage crew is standing by to help you out with any issues.
          </p>
          <button class="bg-white text-black hover:bg-rose-600 hover:text-white font-bold uppercase tracking-wider py-4 px-10 rounded transition-colors brand-font shadow-lg">
            <i class="fa-regular fa-envelope mr-2"></i> Contact Support
          </button>
        </div>
      </section>

    </main>


</template>

<script setup>
import { ref, computed } from 'vue';


// Search state
const searchQuery = ref('');

// Accordion state (tracks which FAQ is currently open)
const openFaqIndex = ref(null);

const toggleFaq = (index) => {
  // If clicking the already open FAQ, close it. Otherwise, open the clicked one.
  openFaqIndex.value = openFaqIndex.value === index ? null : index;
};

// FAQ Data
const faqs = ref([
  {
    category: 'shipping',
    question: 'How long will it take to get my order?',
    answer: 'All standard orders require 1-2 weeks for processing before they are shipped. Once shipped, domestic delivery takes 3-5 business days. International shipping can take 2-4 weeks depending on the destination and customs processing.'
  },
  {
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We accept returns on unworn, unwashed merchandise within 30 days of delivery. Custom builds, autographed items, and clearance merchandise are final sale and cannot be returned. To start a return, please visit our Returns Center.'
  },
  {
    category: 'shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to most countries worldwide. Please note that international customers are responsible for any customs duties, taxes, or import fees applied by their local government.'
  },
  {
    category: 'sizing',
    question: 'Are your shirts true to size?',
    answer: 'Our standard tees are a modern, slightly athletic fit. If you prefer a looser fit for working in the garage, we highly recommend ordering one size up. Check our Size Guide on any product page for exact measurements.'
  },
  {
    category: 'account',
    question: 'Can I change my shipping address after placing an order?',
    answer: 'If your order has not yet entered the fulfillment stage, we may be able to update your address. Please contact Support immediately with your Order Number and the correct address. Once an order has shipped, we cannot reroute it.'
  },
  {
    category: 'general',
    question: 'Are the products actually made in the Gotham Garage?',
    answer: 'While our heavy metal fabrications are done in-house, our apparel is professionally manufactured and screen-printed by our trusted merch partners to ensure the highest quality and durability for our fans.'
  }
]);

// Computed property to filter FAQs based on the search bar
const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs.value;

  const query = searchQuery.value.toLowerCase();
  return faqs.value.filter(faq =>
    faq.question.toLowerCase().includes(query) ||
    faq.answer.toLowerCase().includes(query)
  );
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.app-wrapper {
  font-family: 'Inter', sans-serif;
  background-color: #0a0a0a;
  color: #f3f4f6;
}

h1, h2, h3, h4, .brand-font {
  font-family: 'Orbitron', sans-serif;
}

/* Subtle hero background */
.hero-pattern {
  background-image: url('https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
}
</style>
