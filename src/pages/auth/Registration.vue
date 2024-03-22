<template>
  <div class="w-full h-screen ring-1 flex items-center justify-center">
    <el-form
        ref="loginFormRef"
        :model="form"
        :rules="rules"
        class="grid grid-cols-2 gap-4 w-8/12 h-fit"
        label-position="top"
        @click="submitForm(loginFormRef)"
    >
      <div class="flex gap-2 items-center">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
        </div>
        <h1 class="font-bold text-2xl">Fleet Manager</h1>
      </div>

      <h2 class="font-bold text-gray-400">Registration</h2>

      <el-form-item label="First Name" prop="user_first_name">
        <el-input
            v-model="form.user_first_name"
            :prefix-icon="UserIcon"
            placeholder="username"
            size="large"
            type="text"
        />
      </el-form-item>

      <el-form-item label="Last Name" prop="user_last_name">
        <el-input
            v-model="form.user_last_name"
            :prefix-icon="UserIcon"
            placeholder="last name"
            size="large"
            type="text"
        />
      </el-form-item>
      <el-form-item label="Username" prop="username">
        <el-input
            v-model="form.username"
            :prefix-icon="UserIcon"
            placeholder="username"
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
      <el-form-item label="Password" prop="password">
        <el-input
            v-model="form.password"
            :prefix-icon="LockClosedIcon"
            placeholder="password"
            show-password
            size="large"
            type="password"
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
        >
          Register
        </el-button>
      </div>
      <div class="text-sm">
        <span class="text-gray-400"> Already have an Account ? </span>
        <router-link :to="{name:'login'}" class="text-blue-400 hover:text-blue-500 hover:font-bold">
          Sign In </router-link>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { LockClosedIcon, UserIcon } from "@heroicons/vue/24/solid";
import { FormInstance, FormRules } from "element-plus";
import store from "../../store/index";
import router from "../../routes/index";
import {Female, Suitcase} from "@element-plus/icons-vue";
import {FolderOpenIcon} from "@heroicons/vue/16/solid";

const loading = ref(false);
const form = ref({
  username: "",
  password: "",
  user_first_name: '',
  user_last_name: '',
  user_email: 'eugene@gmail.com'
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
const submitForm = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
          .dispatch("postData", {
            url: "user",
            data: form,
          })
          .then((resp) => {
          });
    } else {
    }
  });
};
</script>

<style scoped></style>
