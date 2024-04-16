<script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext } from 'element-plus'
  import BaseDialog from "../../../components/BaseDialog.vue";
  import EditVehiclePart from "./EditVehiclePart.vue";

  const activeName = ref('first')

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
</script>


<template>
  <BaseDialog>
    <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
    >
      <el-tab-pane label="Vehicle Part" name="first">
        <div class="py-2 ">
          <EditVehiclePart/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Service" name="second">
        <div class="flex flex-col gap-4">

          <el-date-picker
              v-model="value"
              type="daterange"
              start-placeholder="Start date"
              end-placeholder="End date"
          />

          <p>Previous Dates of service</p>

          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="prev_date" label="Begin Date" width="180" />
            <el-table-column prop="end_date" label="End Date" width="180" />
            <el-table-column prop="notes" label="Notes" />
          </el-table>

        </div>

      </el-tab-pane>
    </el-tabs>
  </BaseDialog>

</template>

<style scoped>

</style>