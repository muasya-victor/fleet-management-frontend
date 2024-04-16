<script setup>
import RouterLinks from "@/components/RouterLinks.vue";
import {ref} from "vue";
import store from "@/store/index.js";
import {deleteLocalStorageInformation} from "../../utils/functions.js";
import router from "../../routes/index.js";

const profilePhotoUrl = 'https://source.unsplash.com/featured/?profile';
const formData = ref({
  vehicle:1
})

const menuDialog = ref(false)
const toggleMenuDialog = ()=>{
  menuDialog.value = !menuDialog.value
}


const fleet = ref({});

const getFleet = ()=>{
  store.dispatch('fetchList', {url: 'vehicle/'}).then((res)=>{
    fleet.value = res?.data?.results
  })
}
getFleet()

const setVehicleDetails = ()=>{
  console.log(formData.value.vehicle )
  store.commit('setVehicleDetails',formData.value.vehicle )
}

const signOut = ()=>{
  deleteLocalStorageInformation()
  router.push({name: 'login'})
}

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
              <div class="flex gap-2 items-center">
                <el-select
                    v-model="formData.vehicle"
                    @change="setVehicleDetails"
                    placeholder="Select Vehicle"
                    size="large"
                    style="width: 200px"
                >
                  <el-option
                      v-for="item in fleet"
                      :key="item.id"
                      :label="item?.vehicle_plate_number"
                      :value="item?.id"
                  />
                </el-select>

                <el-button size="large" @click="$router.push({name: 'new-vehicle'})" title="add vehicle">
                  <el-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </el-icon>
                </el-button>
              </div>


              <el-popover
                  placement="bottom"
                  title="Profile"
                  :width="200"
                  trigger="click"
              >
                <template #default>
                  <h1 class="mb-4"> open profile</h1>


                  <el-button type="danger"
                             size="large"
                             @click="signOut"
                             class="bg-red-400 flex gap-4 items-center">
                    sign out
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                  </el-button>
                </template>
                <template #reference>
                  <el-avatar class=""
                             :src="profilePhotoUrl"
                             fit="cover"
                             style="background-color: white; color: black"
                             :size="36"/>
                </template>
              </el-popover>


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