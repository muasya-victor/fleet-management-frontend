<script setup>
import {ref} from 'vue';
const profilePhotoUrl = ref('https://source.unsplash.com/featured/?profile');

</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="font-semibold text-xl text-hbr-primary">Notifications</p>

    <div class="max-w-[600px] rounded ">
      <el-radio-group>
        <el-radio-button>Pending</el-radio-button>
        <el-radio-button>Resolved</el-radio-button>
        <el-radio-button>Archived</el-radio-button>
      </el-radio-group>
    </div>

    <!--    notification card -->
    <!--    [resolved, pending, archived] -->
    <el-scrollbar height="500px" class="shadow py-4 bg-gray-50">
      <div class="flex gap-2 flex-wrap px-2">
        <div v-for="item in 10" class="w-fit max-w-[600px] shadow rounded-md p-3">
          <div class="flex gap-4 items-start h-18">
            <!--          <div class="rounded-[100%] h-4 w-4 bg-hbr-primary"/>-->
            <!--          <img :src="profilePhotoUrl" class="h-10 w-10 rounded"/>-->

            <div class="flex flex-col  justify-center">
              <div class=" flex gap-1 flex-wrap">
                <p class="font-semibold">Brake Pads</p>
                <p> are due replacement Tomorrow</p>
              </div>

              <p>2 hrs ago</p>

              <div class="flex gap-2 flex-wrap">
                <el-button>Ignore</el-button>
                <el-button type="primary" plain>Resolve</el-button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </el-scrollbar>

  </div>
</template>

<style scoped>

</style>