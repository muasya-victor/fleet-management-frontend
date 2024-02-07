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

          <div class="flex items-center py-2 justify-between w-full">
            <div class="flex flex-col w-fit h-fit">
              <p class="font-bold text-lg">Hello Eugene ,</p>

              <p class="text-gray-600 ">We are happy to have you</p>
            </div>
            <div class="flex items-center gap-10 justify-between w-fit">

              <el-select
                  v-model="formData.vehicle"
                  placeholder="Select Vehicle"
                  size="large"
                  style="width: 240px"
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