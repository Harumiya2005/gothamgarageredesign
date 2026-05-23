<template>



    <!-- MAIN PAGE CONTENT -->
    <main class="flex-grow bg-neutral-950">

      <!-- PAGE HEADER -->
      <div class="bg-neutral-900 border-b border-neutral-800 py-12">
        <div class="container mx-auto px-4 lg:px-8">
          <!-- Breadcrumbs -->
          <nav class="text-xs text-neutral-500 mb-4 font-semibold tracking-wider uppercase">
            <a href="#" class="hover:text-white transition-colors">Home</a>
            <span class="mx-2">&gt;</span>
            <span class="text-rose-500">Legal & Policies</span>
          </nav>
          <h1 class="text-3xl md:text-5xl font-black text-white uppercase brand-font">Store Policies</h1>
          <p class="text-neutral-400 mt-3 text-sm md:text-base max-w-2xl">
            Everything you need to know about shipping, returns, and how we protect your data. Last updated: February 2026.
          </p>
        </div>
      </div>

      <!-- CONTENT LAYOUT -->
      <div class="container mx-auto px-4 lg:px-8 py-12 flex flex-col md:flex-row gap-12 items-start">

        <!-- STICKY SIDEBAR NAVIGATION -->
        <aside class="w-full md:w-1/4 md:sticky md:top-32 hidden md:block">
          <nav class="flex flex-col space-y-2 border-l-2 border-neutral-800 pl-4">
            <a href="#returns" class="text-neutral-400 hover:text-rose-500 hover:border-rose-500 transition-colors py-2 font-bold uppercase tracking-wider text-sm">Return & Refund Policy</a>
            <a href="#shipping" class="text-neutral-400 hover:text-rose-500 hover:border-rose-500 transition-colors py-2 font-bold uppercase tracking-wider text-sm">Shipping Information</a>
            <a href="#privacy" class="text-neutral-400 hover:text-rose-500 hover:border-rose-500 transition-colors py-2 font-bold uppercase tracking-wider text-sm">Privacy Policy</a>
          </nav>
        </aside>

        <!-- WALL OF TEXT (FORMATTED FOR READABILITY) -->
        <div class="w-full md:w-3/4 space-y-20 text-neutral-300 leading-relaxed">

          <!-- 1. RETURN & REFUND POLICY -->
          <section id="returns" class="scroll-mt-32">
            <h2 class="text-2xl font-black text-white uppercase brand-font mb-6 pb-2 border-b border-neutral-800">Return & Refund Policy</h2>

            <div class="space-y-6">
              <p>
                At Gotham Garage, we stand behind the quality of our builds and our gear. If you are not completely satisfied with your purchase, we’re here to help.
              </p>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">30-Day Return Window</h3>
                <p>
                  You have 30 calendar days from the date of delivery to return eligible items. To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it. It must also be in the original packaging with all tags attached.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">Non-Returnable Items</h3>
                <ul class="list-disc pl-6 space-y-2 marker:text-rose-600">
                  <li>Custom-made or personalized apparel.</li>
                  <li>Autographed merchandise.</li>
                  <li>Gift cards.</li>
                  <li>Clearance items (marked as Final Sale).</li>
                </ul>
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">Refund Process</h3>
                <p>
                  Once we receive your item, we will inspect it and notify you of the status of your refund. If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within 5-10 business days, depending on your card issuer's policies. Shipping costs are non-refundable.
                </p>
              </div>
            </div>
          </section>

          <!-- 2. SHIPPING INFORMATION -->
          <section id="shipping" class="scroll-mt-32">
            <h2 class="text-2xl font-black text-white uppercase brand-font mb-6 pb-2 border-b border-neutral-800">Shipping Information</h2>

            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-bold text-white mb-2">Order Processing Time</h3>
                <p>
                  Because of high demand from the show, all standard apparel and accessory orders require <strong class="text-white">1-2 weeks for processing</strong> before they are shipped out from our warehouse. You will receive a confirmation email with a tracking number as soon as your package ships.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">Domestic Shipping (USA)</h3>
                <p>
                  We offer standard ground shipping via USPS and UPS. Once your order has been processed and shipped, domestic delivery typically takes 3-5 business days.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">International Shipping</h3>
                <p>
                  We proudly ship Gotham Garage merchandise worldwide. International shipping typically takes 2-4 weeks depending on the destination country and customs processing. <br><br>
                  <strong class="text-rose-500">Please Note:</strong> International customers are solely responsible for any customs duties, import taxes, or fees applied by their local government upon arrival.
                </p>
              </div>
            </div>
          </section>

          <!-- 3. PRIVACY POLICY -->
          <section id="privacy" class="scroll-mt-32">
            <h2 class="text-2xl font-black text-white uppercase brand-font mb-6 pb-2 border-b border-neutral-800">Privacy Policy</h2>

            <div class="space-y-6">
              <p>
                Your privacy is critically important to us. This Privacy Policy explains how SOA Marketing, LLC / Gotham Garage ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website.
              </p>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">Information We Collect</h3>
                <p>
                  When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers or PayPal details), email address, and phone number. We refer to this information as "Order Information."
                </p>
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">How We Use Your Information</h3>
                <ul class="list-disc pl-6 space-y-2 marker:text-rose-600">
                  <li>To fulfill any orders placed through the Site (processing payment, arranging shipping, providing invoices).</li>
                  <li>To communicate with you regarding your order or customer support inquiries.</li>
                  <li>To screen our orders for potential risk or fraud.</li>
                  <li>To provide you with information or advertising relating to our products (only if you opted into our newsletter).</li>
                </ul>
              </div>

              <div>
                <h3 class="text-lg font-bold text-white mb-2">Data Sharing & Security</h3>
                <p>
                  We do not sell your personal data to third parties. We share your Personal Information with trusted third parties only to help us use your Personal Information, as described above (e.g., Shopify to power our online store, or Stripe for secure payment processing).
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>




</template>

<script setup>

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

/* Offset for anchor links so they don't hide behind the sticky header */
.scroll-mt-32 {
  scroll-margin-top: 8rem;
}
</style>
