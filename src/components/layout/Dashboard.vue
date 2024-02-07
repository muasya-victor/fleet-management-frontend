<script setup>
import RouterLinks from "@/components/RouterLinks.vue";
import {ref} from "vue";

const profilePhotoUrl = 'https://source.unsplash.com/featured/?profile';
const formData = ref({
  vehicle : {
    label:'G Wagon KBV459X',
    value: 1
  }
})

const menuDialog = ref(false)
const toggleMenuDialog = ()=>{
  menuDialog.value = !menuDialog.value
}


const fleet = ref([
  {
    label:'G Wagon KBV459X',
    value: 1
  }
]);

</script>

<template>
  <el-container class="h-screen">
    <el-container>
      <el-aside class="sm:hidden md:flex"
                style="padding: 7px"
          width="200px">
        <div class="w-full flex flex-col items-center h-full">
          <el-avatar class=""
                     src="src/assets/images/car.png"
                     fit="cover"
                     style="background-color: white; color: black"
                     :size="100"/>

          <p class="font-semibold text-hbr-primary">Fleet Manager</p>

          <RouterLinks/>
        </div>

      </el-aside>

      <el-main style="padding: 7px">
        <div class="bg-gray-100 w-full h-full rounded p-4">

          <el-dialog v-model="menuDialog" title="Menu" class="sm:w-[300px] md:w-[800px]">
            <div class="w-full flex flex-col items-center h-full">
              <el-avatar class=""
                         src="src/assets/images/car.png"
                         fit="cover"
                         style="background-color: white; color: black"
                         :size="100"/>

              <p class="font-semibold text-hbr-primary">Fleet Manager</p>

              <RouterLinks/>
            </div>
          </el-dialog>

          <div class="w-full p-1 sm:flex justify-end items-center md:hidden">
            <span class="cursor-pointer" @click="toggleMenuDialog">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </span>
          </div>

          <div class="flex flex-wrap items-center py-2 justify-between w-full">
            <div class="flex-col w-fit h-fit sm:hidden md:flex">
              <p class="font-bold text-lg">Hello Eugene ,</p>

              <p class="text-gray-600 ">We are happy to have you</p>
            </div>
            <div class="flex items-center gap-10 justify-between w-fit">

              <el-select
                  v-model="formData.vehicle"
                  placeholder="Select Vehicle"
                  size="large"
                  style="width: 200px"
              >
                <el-option
                    v-for="item in fleet"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>


              <el-avatar class=""
                         :src="profilePhotoUrl"
                         fit="cover"
                         style="background-color: white; color: black"
                         :size="36"/>

            </div>
          </div>
          <slot>

          </slot>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>