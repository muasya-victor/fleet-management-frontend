<script setup>
import {ref} from "vue";

const dialogVisible = ref(true)
const handleClose = ()=>{

}
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="800"
      :before-close="handleClose"
  >
    <slot></slot>

    <template #footer >
      <div class="w-full flex border-t py-2 ">
        <el-button
            :loading="loading"
            class="w-fit bg-red-400"
            size="large"
            style="border-radius: 4px"
            type="danger"
            @click="$router.go(-1)"
        >
          <!--                @click="submitForm(loginFormRef)"-->

          Cancel
        </el-button>
      </div>

    </template>

  </el-dialog>
</template>

<style scoped>

</style>