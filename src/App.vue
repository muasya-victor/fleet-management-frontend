<script setup>
import Dashboard from "./components/layout/Dashboard.vue";
import FleetHealth from "@/pages/fleet/FleetHealth.vue";
</script>

<template>
  <div class="">
    <Dashboard>
      <router-view/>
    </Dashboard>
  </div>
</template>

<style scoped>

</style>
