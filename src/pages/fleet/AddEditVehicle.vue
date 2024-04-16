<script setup lang="ts">

import {reactive, ref} from "vue"
import store from "../../store/index.js";
import {FormInstance, FormRules} from "element-plus";
import router from "../../routes/index"
import {UserIcon} from "@heroicons/vue/24/solid";

const loading = ref(false)
const form = ref({})


const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({

});


const vehicleParts = ref([])
const getVehiclePart = ()=>{
  store.dispatch('fetchList', {url: 'vehicle-part'})
      .then((res)=>{
        console.log(res?.data)
        vehicleParts.value = res?.data?.results
      })
}

const vehicleOwners = ref([])
const getVehicleOwners = ()=>{
  store.dispatch('fetchList', {url: 'user', id: 1})
      .then((res)=>{
        console.log(res?.data)
        res?.data?.results?.forEach((user)=>{
          if (user?.user_type !== 'mechanic'){
            vehicleOwners.value.push(user)
          }
        })

      })
}
getVehicleOwners()

const handleSubmit = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch('postData', {url: 'vehicle', data: form.value})
          .then((res) => {
            console.log(res?.data)
            loading.value = false
            form.value = {...res?.data}
            router.go(-1)
          })
          .catch((err)=>{
            loading.value = false
          })
    }})
}
getVehiclePart()

</script>

<template>
  <h2 class="font-bold text-gray-400">Edit Vhehicle Part</h2>

  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      class="grid grid-cols-2 gap-4 w-full h-fit"
      label-position="top">
    <div class="flex gap-2 items-center hidden">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      </div>
      <h1 class="font-bold text-2xl">Edit Part</h1>
    </div>




    <el-form-item label="Owner's Name" prop="vehicle_owner" >
      <el-select
          v-model="form.vehicle_owner"
          placeholder="Select Vehicle"
          size="large"
      >
        <el-option
            v-for="item in vehicleOwners"
            :key="item.id"
            :label="item?.user_first_name +' - ' + item?.user_type"
            :value="item?.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Vehicle Parts Registered" prop="vehicle_parts">
      <el-select
          v-model="form.vehicle_parts"
          placeholder="Select Vehicle"
          size="large"
      >
        <el-option
            v-for="item in vehicleParts"
            :key="item?.id"
            :label="item?.vehicle_part_name"
            :value="item?.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Vehicle Type" prop="vehicle_type">
      <el-input
          v-model="form.vehicle_type"
          placeholder="saloon"
          size="large"
          type="text"
      />
    </el-form-item>

    <el-form-item label="Vehicle Plate Number" prop="vehicle_plate_number">
      <el-input
          v-model="form.vehicle_plate_number"
          placeholder="kbv465k"
          size="large"
          type="text"
      />
    </el-form-item>

    <el-form-item label="Vehicle Model" prop="vehicle_model">
      <el-input
          v-model="form.vehicle_model"
          placeholder="mercedes"
          size="large"
          type="text"
      />
    </el-form-item>

    <el-form-item label="Vehicle Engine Number" prop="vehicle_engine_number">
      <el-input
          v-model="form.vehicle_engine_number"
          placeholder="1308r"
          size="large"
          type="text"
      />
    </el-form-item>

    <el-form-item label="Vehicle Color" prop="vehicle_color">
      <el-input
          v-model="form.vehicle_color"
          placeholder="white"
          size="large"
          type="text"
      />
    </el-form-item>
    <!--            <el-input-->
    <div class="flex w-full flex-wrap justify-end">


      <el-button
          :loading="loading"
          class="w-fit bg-blue-400"
          size="large"
          style="border-radius: 4px"
          type="primary"
          @click="handleSubmit(ruleFormRef)"
      >
        <!--                @click="submitForm(loginFormRef)"-->

        Submit
      </el-button>
    </div>
  </el-form>


</template>

<style scoped>

</style>