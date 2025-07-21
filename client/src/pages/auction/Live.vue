<script setup>
import defaulteUerImage from '../../assets/defualtUser.jpeg';
import logo from '../../assets/download.png';

const statArray = [
  
]
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg w-full flex flex-col sm:max-w-3xl sm:mx-auto min-h-screen relative">

    <!-- Sticky Header (inside scroll context) -->
    <div class="sticky top-0 bg-white z-20 px-4 py-4 border-b">
      <div class="grid grid-cols-5 gap-2 items-center">
        <div class="col-span-2 flex justify-center">
          <img :src="defaulteUerImage" alt="User" class="w-12 h-12 rounded-full sm:w-20 sm:h-20">
        </div>
        <div class="col-span-2 flex flex-col">
          <p class="text-sm sm:text-lg font-bold text-gray-800 truncate">Player Name</p>
          <p class="text-sm text-gray-600 truncate">Country</p>
          <p class="text-sm text-gray-600 truncate">Role</p>
        </div>
        <div class="col-span-1 text-center">
          <div class="text-lg font-bold text-gray-800">60</div>
        </div>
      </div>
    </div>

    <div class="sm:grid sm:grid-cols-3 hidden p-2 gap-2 m-2 ">
      <div class="border-2 border-solid border-gray-500 text-center flex flex-col">
        <div>a</div>
        <div>b</div>
      </div>
      <div class="border-2 border-solid border-gray-500 text-center flex flex-col">
        <div>a</div>
        <div>b</div>
      </div>
      <div class="border-2 border-solid border-gray-500 text-center flex flex-col">
        <div>a</div>
        <div>b</div>
      </div>
      <div class="border-2 border-solid border-gray-500 text-center flex flex-col">
        <div>a</div>
        <div>b</div>
      </div>
      <div class="border-2 border-solid border-gray-500 text-center flex flex-col">
        <div>a</div>
        <div>b</div>
      </div>
      <div class="border-2 border-solid border-gray-500 text-center flex flex-col">
        <div>a</div>
        <div>b</div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 px-4 py-4 pb-36 sm:pb-10"> <!-- Extra bottom padding to avoid overlapping -->
      <table class="w-full text-center">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2">Logo</th>
            <th class="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2">
              <img :src="logo" alt="Logo" class="w-12 h-12 rounded-full mx-auto">
            </td>
            <td class="py-2">$100</td>
          </tr>
        </tbody>
      </table>

      <!-- Desktop input -->
      <div class="hidden sm:flex justify-between sm:w-1/2 gap-2 mt-6">
        <input type="text" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Your message">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </div>
    </div>

    <!-- Mobile fixed bottom input -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden z-30">
      <div class="flex justify-between gap-2">
        <input type="text" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Your message">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </div>
    </div>
  </div>
</template>
