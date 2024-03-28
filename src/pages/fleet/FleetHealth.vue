<script setup lang="ts">
  import {ref, onMounted  } from 'vue';
  import {ElScrollbar} from "element-plus";
  import store from "../../store/index"
  import Dashboard from "../../components/layout/Dashboard.vue";
  import {ArrowDownIcon} from "@heroicons/vue/16/solid";
  import router from "../../routes/index"

  const fleet = ref([

  ]);

  const getFleet = ()=>{
    store.dispatch('fetchList', {url: 'vehicle/'}).then((res)=>{
      fleet.value = res?.data?.results
    })
  }
  const downloadReport = ()=>{
    store.dispatch('fetchList', {url: 'pdf-report/'}).then((res)=>{
      console.log(res.data)
      const blob = new Blob([res.data], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'vehicle_report.pdf';

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    })
        .catch(error => {
          console.error('Error generating PDF:', error);
        });
    }
  getFleet()

  const formData = ref({

  })

  const searchPart = ref(null)
  const vehiclePart = ref({})

  const getVehicleParts = ()=>{
    store.dispatch('fetchList', {url: 'vehicle-part/'}).then((res)=>{
      vehiclePart.value = res?.data?.results
    })
  }
  getVehicleParts()

  const activeName = ref('first')
  const serviceDialog = ref(false)

  const check_by_part = ref({})

  const toggleServiceDialog = (id)=>{
    // serviceDialog.value = !serviceDialog.value
    console.log(id)
    router.push({name: 'editVehiclePart', params: {partId: id}})
  }

  const max = ref(0)
  const value = ref(0)
  const innerRef = ref<HTMLDivElement>()
  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

  onMounted(() => {
    max.value = innerRef.value!.clientHeight - 30
  })

  const inputSlider = (value: number) => {
    scrollbarRef.value!.setScrollTop(value)
  }
  const scroll = ({ scrollTop }) => {
    value.value = scrollTop
  }
  const formatTooltip = (value: number) => {
    return `${value} px`
  }


</script>

<template>
  <Dashboard>
    <div class="flex flex-col gap-4">

      <el-dialog v-model="serviceDialog" title="Shipping address" class="sm:w-[350px] md:w-[800px]">
        <template #header>
          <el-tabs
              v-model="activeName"
              type="card"
              class="demo-tabs"
              @tab-click="handleClick"
          >
            <el-tab-pane label="History Of Service" name="first">
              <div class="flex flex-col gap-4">
                <el-tag type="success" size="large" class="w-fit">Engine is Healthy</el-tag>

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

            <el-tab-pane label="Service +" name="second">
              <div class="flex flex-col gap-4">

                <h3 class="font-semibold text-lg">Fill service details</h3>

                <el-form label-position="top">
                  <el-form-item label="Vehicle">

                    <el-select
                        v-model="formData.vehicle"
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
                  </el-form-item>

                  <el-form-item label="Service Type">
                    <el-select
                        v-model="formData.vehicle"
                        placeholder="Select Vehicle"
                        size="large"
                        style="width: 200px"
                    >
                      <el-option
                          v-for="item in fleet"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Next Service Date">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="Pick a day"
                        size="large"
                    />
                  </el-form-item>





                </el-form>


              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-dialog>


      <div class="w-full py-2 px-4 flex justify-between items-center bg-white rounded">

        <el-tag v-if="store?.getters?.getVehicleDetails?.vehicle_general_condition === 'healthy'" size="large"
                type="success" class="text-md">Your Moti is Healthy</el-tag>

        <el-tag v-if="store?.getters?.getVehicleDetails?.vehicle_general_condition && store?.getters?.getVehicleDetails?.vehicle_general_condition !== 'healthy'"
                size="large"
                type="warning" class="text-md">Your Moti Needs Service</el-tag>

        <div class="flex gap-2 items-center w-fit">
          <div class="flex flex-col gap-1 text-hbr-primary">
            <p class="font-bold">Next Service Date</p>
            <p>{{new Date().toDateString()}}</p>
          </div>
        </div>

        <el-button type="danger"
                   @click="downloadReport"
                   class="w-fit" size="large" plain>
          <el-icon class="mr-2">
            <ArrowDownIcon/>
          </el-icon>
          Vehicle Report
        </el-button>
      </div>
      <div class="flex flex-col gap-4">


        <el-input v-model="searchPart" size="large"
                  class="w-[250px] hidden"
                  placeholder="Search Vehicle Part" clearable />

        <div ref="innerRef" class="flex flex-wrap gap-4" >
          <el-card v-for="item in vehiclePart"
                   @click="toggleServiceDialog(item?.id)"
                   class="box-card w-[200px] cursor-pointer">
            <template #header>
              <div class="flex items-start flex-col justify-start gap-2">
                <span class="font-bold">{{item?.vehicle_part_name}}</span>
                <el-tag size="large"
                        class=""
                        v-if="item?.vehicle_part_working_condition === true"
                        type="success">Healthy
                </el-tag>
                <el-tag
                    size="large"
                    type="warning"
                    v-else> Needs To be checked
                </el-tag>
              </div>
            </template>
            <!--            <img class="h-[150px]"-->
            <!--                       :src="item?.imageLink"-->
            <!--                       style="background-color: white; color: black"/>-->
            <el-text class="w-150px mb-2" truncated :title="item?.vehicle_part_comments">
              {{item?.vehicle_part_comments}}
            </el-text>

          </el-card>

        </div>
      </div>

    </div>
  </Dashboard>




</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
</style>