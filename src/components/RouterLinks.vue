<script setup>

import router from "@/routes/index.js";

const navigateToSelectedPage = (index)=>{
  router.push({name: index})
}

</script>

<template>
    <div class="flex flex-col gap-2 w-full h-fit items-center ">
      <p class=" font-bold">{{new Date().toDateString()}}</p>

      <el-menu
          class=""
          style="border: none"
          @select="navigateToSelectedPage"
      >
        <el-menu-item index="home">Home</el-menu-item>
        <el-menu-item index="notifications">Notifications</el-menu-item>
        <el-sub-menu >
          <template #title>
<!--            <el-icon><location /></el-icon>-->
            <span>Settings</span>
          </template>
          <el-menu-item index="vehicle-details">Vehicle Details</el-menu-item>
          <el-menu-item index="profile">Profile</el-menu-item>
        </el-sub-menu>
      </el-menu>

    </div>
</template>

<style scoped>

</style>