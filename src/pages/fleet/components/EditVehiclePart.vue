<script setup lang="ts">

import {onMounted, reactive, ref} from "vue"
import store from "../../../store/index.js";
import {FormInstance, FormRules} from "element-plus";
import {useRouter} from "vue-router";

const dialogVisible = ref(true)
const loading = ref(false)
const form = ref({})
const handleClose = ()=>{

}

const router = ref(useRouter())

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({

});
const paramPartId = ref(router.value?.currentRoute?.params?.partId)

const getVehiclePart = ()=>{
  store.dispatch('fetchSingleItem', {url: 'vehicle-part', id: paramPartId.value})
      .then((res)=>{
        console.log(res?.data)
        form.value = {...res?.data}
      })
}

const handleSubmit = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.dispatch('patchData', {url: 'vehicle-part', id: paramPartId.value, data: form.value})
          .then((res) => {
            console.log(res?.data)
            loading.value = false
            form.value = {...res?.data}
            router.value.go(-1)
          })
          .catch((err)=>{
            loading.value = false
          })
    }})
}




onMounted(()=>{
  getVehiclePart()
})
</script>

<template>
  <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      class="flex flex-col gap-4 w-full h-fit"
      label-position="top">
    <div class="flex gap-2 items-center hidden">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      </div>
      <h1 class="font-bold text-2xl">Edit Part</h1>
    </div>


    <h2 class="font-bold text-gray-400">Edit Vhehicle Part</h2>

    <el-form-item label="Part Name" prop="vehicle_part_name">
      <el-input
          v-model="form.vehicle_part_name"
          placeholder="part name"
          size="large"
          type="text"
      />
    </el-form-item>

    <el-form-item label="Comments on Condition" prop="vehicle_part_comments">
      <el-input
          v-model="form.vehicle_part_comments"
          placeholder="comment on working condition"
          size="large"
          type="textarea"
      />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-radio-group v-model="form.vehicle_part_working_condition" size="large">
        <el-radio-button label="Is In Good Working Condition" :value="true" />
        <el-radio-button label="Requires Repair" :value="false" />
      </el-radio-group>
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