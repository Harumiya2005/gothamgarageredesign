<template>
  <main class="flex-grow bg-neutral-950 relative min-h-screen py-8 lg:py-12">
    <!-- Background Graphic -->
    <div class="absolute inset-0 opacity-10 hero-pattern pointer-events-none"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none"></div>

    <div class="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">

      <!-- BACK LINK & HEADER -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-neutral-800 pb-6 gap-4">
        <div>
          <RouterLink to="/profile" class="text-neutral-400 hover:text-white text-sm font-bold tracking-wider uppercase flex items-center gap-2 mb-4 transition-colors w-max">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Profile
          </RouterLink>
          <h1 class="text-3xl md:text-4xl font-black text-white uppercase brand-font">Order <span class="text-rose-600">#GG-104958</span></h1>
          <p class="text-neutral-400 mt-2 text-sm font-bold tracking-wider uppercase">Expected Delivery: <span class="text-rose-500">May 05, 2026</span></p>
        </div>

        <div class="bg-rose-900/20 border border-rose-500/30 px-6 py-3 rounded-full flex items-center gap-3">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <span class="text-rose-500 font-bold uppercase tracking-widest text-xs">In Transit</span>
        </div>
      </div>

      <!-- MAP SIMULATION -->
      <!-- We use a CSS filter on a Google Maps iframe to create a custom "Dark Mode" aesthetic -->
      <div class="w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden border border-neutral-800 mb-8 relative shadow-2xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043701!2d-118.24368492426027!3d34.05223417315694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648fa1d4803%3A0xdec27bf11f9fd336!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1682800000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style="border:0; filter: invert(90%) hue-rotate(180deg) grayscale(80%) contrast(120%);"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <!-- Inner shadow to blend map into the dark theme -->
        <div class="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(10,10,10,1)]"></div>
      </div>

      <!-- CONTENT GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- LEFT COLUMN: TRACKING TIMELINE -->
        <div class="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-8 shadow-xl">
          <h2 class="text-xl font-bold text-white uppercase brand-font mb-8 tracking-wide border-b border-neutral-800 pb-4">Tracking History</h2>

          <div class="relative pl-4 space-y-10">
            <!-- Vertical Line connecting steps -->
            <div class="absolute top-2 bottom-2 left-[27px] w-0.5 bg-neutral-800"></div>
            <div class="absolute top-2 bottom-[40%] left-[27px] w-0.5 bg-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.8)]"></div>

            <!-- Step 1: Left Facility -->
            <div class="relative flex items-start gap-6">
              <div class="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p class="text-white font-bold text-sm uppercase">Left Gotham Garage Facility</p>
                <p class="text-neutral-500 text-xs mt-1">Temecula, CA • May 01, 2026 - 08:30 AM</p>
              </div>
            </div>

            <!-- Step 2: Picked up by Carrier -->
            <div class="relative flex items-start gap-6">
              <div class="w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center flex-shrink-0 z-10 shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p class="text-white font-bold text-sm uppercase">Picked up by Courier (UPS)</p>
                <p class="text-neutral-500 text-xs mt-1">Riverside Distribution Center • May 02, 2026 - 02:15 PM</p>
              </div>
            </div>

            <!-- Step 3: Ongoing (Current Status) -->
            <div class="relative flex items-start gap-6">
              <div class="w-6 h-6 rounded-full bg-neutral-900 border-2 border-rose-500 flex items-center justify-center flex-shrink-0 z-10 relative">
                <span class="animate-ping absolute h-4 w-4 rounded-full bg-rose-500 opacity-50"></span>
                <span class="h-2 w-2 rounded-full bg-rose-500"></span>
              </div>
              <div>
                <p class="text-rose-500 font-bold text-sm uppercase">Ongoing to Destination</p>
                <p class="text-neutral-400 text-xs mt-1">Heading to Los Angeles, CA • May 03, 2026 - 10:45 AM</p>
              </div>
            </div>

            <!-- Step 4: Expected Delivery -->
            <div class="relative flex items-start gap-6 opacity-40">
              <div class="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center flex-shrink-0 z-10"></div>
              <div>
                <p class="text-neutral-400 font-bold text-sm uppercase">Expected Delivery</p>
                <p class="text-neutral-600 text-xs mt-1">Pending • Expected May 05, 2026</p>
              </div>
            </div>

          </div>
        </div>

        <!-- RIGHT COLUMN: ITEMS & INFO -->
        <div class="lg:col-span-5 space-y-8">

          <!-- Items Being Tracked -->
          <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
            <h3 class="text-white font-bold uppercase tracking-wider mb-6 border-b border-neutral-800 pb-4">
              Items in Shipment
            </h3>

            <div class="space-y-4">
              <!-- Item 1 -->
              <div class="flex items-center gap-4 bg-neutral-950 p-3 rounded border border-neutral-800">
                <div class="w-16 h-16 bg-neutral-800 rounded flex flex-shrink-0 items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80" alt="Hoodie" class="w-full h-full object-cover opacity-90" />
                </div>
                <div class="flex-grow">
                  <p class="text-white font-bold text-sm line-clamp-1">Signature Skull Hoodie</p>
                  <p class="text-neutral-500 text-xs mt-1">Qty: 1</p>
                </div>
              </div>

              <!-- Item 2 -->
              <div class="flex items-center gap-4 bg-neutral-950 p-3 rounded border border-neutral-800">
                <div class="w-16 h-16 bg-neutral-800 rounded flex flex-shrink-0 items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=200&q=80" alt="Hat" class="w-full h-full object-cover opacity-90" />
                </div>
                <div class="flex-grow">
                  <p class="text-white font-bold text-sm line-clamp-1">Mechanic Snapback</p>
                  <p class="text-neutral-500 text-xs mt-1">Qty: 1</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Details -->
          <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-xl">
             <h3 class="text-white font-bold uppercase tracking-wider mb-4 border-b border-neutral-800 pb-4">Shipping Info</h3>
             <div class="space-y-4">
               <div>
                 <p class="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Tracking Number</p>
                 <a href="#" class="text-rose-500 font-bold hover:underline transition-colors flex items-center gap-2">
                   1Z9999999999999999
                   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                 </a>
               </div>
               <div>
                 <p class="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Delivery Address</p>
                 <p class="text-neutral-300 text-sm">123 Main Street<br>Los Angeles, CA 90001</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// State logic removed to create an instant-load high-fidelity tracking dashboard.
// Real apps would fetch order details via a route param (e.g. useRoute().params.id)
// but for a prototype, this perfectly demonstrates the tracking UI flow.
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.brand-font {
  font-family: 'Orbitron', sans-serif;
}

.hero-pattern {
  background-image: linear-gradient(to right, rgba(10,10,10,0.9), rgba(10,10,10,0.4)), url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
}
</style>
