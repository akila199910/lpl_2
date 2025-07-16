<script setup>
import defaulteUerImage from '../../assets/defualtUser.jpeg';
import logo from '../../assets/download.png';
</script>

<template>

  <div class="bg-white shadow-lg gap-y-2 rounded-lg m-4 p-4 flex flex-col sm:max-w-3xl sm:mx-auto sm:gap-y-5">

    <div class="grid grid-cols-5 gap-2 items-center">

      <div class="col-span-2 flex justify-center">
        <img :src="defaulteUerImage" alt="" class="w-12 h-12 rounded-full sm:w-32 sm:h-32">
      </div>

      <div class="col-span-2 flex flex-col">
        <h3 class="text-lg font-bold text-gray-800 ">Player Name</h3>
        <p class="text-sm text-gray-600">Country</p>
        <p class="text-sm text-gray-600">Role</p>
      </div>

      <div class="col-span-1">
        <div class="text-lg font-bold text-gray-800">60</div>
      </div>

    </div>
    <hr>

    <div class="w-full justify-evenly gap-x-2 sm:w-1/2">
      <table class="w-full text-center">
        <thead class=" ">
          <tr class="bg-gray-200">
            <th class="py-2 ">Logo</th>
            <th class="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 justify-items-center">
              <img :src="logo" alt="" class="w-12 h-12 rounded-full">
            </td>
            <td class="py-2">$100</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>