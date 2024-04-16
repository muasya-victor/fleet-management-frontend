<template>
  <Dashboard>
    <div class="w-full mx-auto py-2">
      <el-form
          ref="loginFormRef"
          :model="form"
          :rules="rules"
          class="w-full gap-x-4 gap-y-8 h-fit mx-auto grid grid-cols-2 "
          label-position="top"
      >

        <el-form-item label="First Name" prop="user_first_name">
          <el-input
              v-model="form.user_first_name"
              placeholder="username"
              size="large"
              type="text"
          />
        </el-form-item>

        <el-form-item label="Last Name" prop="user_last_name">
          <el-input
              v-model="form.user_last_name"
              placeholder="last name"
              size="large"
              type="text"
          />
        </el-form-item>

        <el-form-item label="Email" prop="user_email">
          <el-input
              v-model="form.user_email"
              :prefix-icon="FolderOpenIcon"
              placeholder="email"
              size="large"
              type="email"
          />
        </el-form-item>

        <el-form-item label="User Type" prop="user_type">
          <el-select v-model="form.user_type" size="large">
            <el-option value="mechanic" label="Mechanic"/>
            <el-option value="vehicle_owner" label="Vehicle Owner"/>
          </el-select>
        </el-form-item>
        <!--            <el-input-->
        <div class="flex w-full ">
          <el-button
              :loading="loading"
              class="w-fit bg-blue-400"
              size="large"
              style="border-radius: 4px"
              type="primary"
              html-type="submit"
              @click="submitForm(loginFormRef)"
          >
            Submit
          </el-button>
        </div>
      </el-form>

    </div>
  </Dashboard>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "../../store/index";
import router from "../../routes/index";
import {Female, Suitcase} from "@element-plus/icons-vue";
import {FolderOpenIcon} from "@heroicons/vue/16/solid";
import Dashboard from "../../components/layout/Dashboard.vue";

const loading = ref(false);
const form = ref({

});

const loginFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "Please enter username",
    },
  ],
  password: {
    required: true,
    trigger: "blur",
    message: "Please enter password",
  },
});

const getProfile = ()=>{
  console.log('nn')
  store
      .dispatch("fetchList", {
        url: "current-user",
      })
      .then((resp) => {
        form.value = resp?.data[0]
      });
}
const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
          .dispatch("patchData", {
            url: "user",
            id: 1,
            data: {
              id: form.value?.id,
              ...form.value
            },
          })
          .then((resp) => {
            loading.value = false
          })
          .catch(err=>{
            loading.value = false
          })
      ;
    } else {
    }
  });
};

onMounted(()=>{
  getProfile()
})
</script>

<style scoped></style>
