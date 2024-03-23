<script setup lang="ts">
  import {ref, onMounted  } from 'vue';
  import {ElScrollbar} from "element-plus";
  import store from "../../store/index"
  import Dashboard from "../../components/layout/Dashboard.vue";
  import {ArrowDownIcon} from "@heroicons/vue/16/solid";

  const fleet = ref([
    {
      label:'G Wagon KBV459X',
      value: 1
    }
  ]);

  const getFleet = ()=>{
    store.dispatch('fetchList', {url: 'vehicle/'}).then((res)=>{
      console.log(res.data)
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
    vehicle : {
      label:'G Wagon KBV459X',
      value: 1
    }
  })

  const searchPart = ref(null)
  // const vehicleParts = ref({})
  const vehicleParts =  ref(
      [
        {
          id: 1,
          name: 'Engine',
          imageLink: 'https://source.unsplash.com/featured/?engine',
          status: 'Healthy',
        },
        {
          id: 2,
          name: 'Transmission',
          imageLink: 'https://source.unsplash.com/featured/?transmission',
          status: 'Healthy',
        },
        {
          id: 3,
          name: 'Brake System',
          imageLink: 'https://source.unsplash.com/featured/?brakes',
          status: 'Healthy',
        },
        {
          id: 4,
          name: 'Tires',
          imageLink: 'https://source.unsplash.com/featured/?tires',
          status: 'Healthy',
        },
      ]
  )
  const activeName = ref('first')
  const serviceDialog = ref(false)

  const check_by_part = ref({})

  const toggleServiceDialog = ()=>{
    serviceDialog.value = !serviceDialog.value
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
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
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
        <el-tag size="large" type="success" class="text-md">Your Moti is Healthy</el-tag>

        <div class="flex gap-2 items-center w-fit">
          <div class="flex flex-col gap-1 text-hbr-primary">
            <p class="font-bold">Next Service Date</p>
            <p>{{new Date().toDateString()}}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <el-button type="danger"
                   @click="downloadReport"
                   class="w-fit" size="large" plain>
          <el-icon class="mr-2">
            <ArrowDownIcon/>
          </el-icon>
          Report
        </el-button>

        <el-input v-model="searchPart" size="large"
                  class="w-[250px]"
                  placeholder="Search Vehicle Part" clearable />

        <el-scrollbar ref="scrollbarRef"  height="450px" always @scroll="scroll">
          <div ref="innerRef" class="flex flex-wrap gap-4" >
            <el-card v-for="item in vehicleParts"
                     @click="toggleServiceDialog"
                     class="box-card w-[200px] cursor-pointer">
              <template #header>
                <div class="flex items-start flex-col justify-start gap-2">
                  <span class="font-bold">{{item?.name}}</span>
                  <el-tag size="large"
                          class=""
                          v-if="item.status ==='Healthy'"
                          type="success">{{item?.status}}
                  </el-tag>
                  <el-tag
                      size="large"
                      type="warning"
                      v-else>{{item?.status}}
                  </el-tag>
                </div>
              </template>
              <!--            <img class="h-[150px]"-->
              <!--                       :src="item?.imageLink"-->
              <!--                       style="background-color: white; color: black"/>-->
              <el-text class="w-150px mb-2" truncated title="Prompt and seamless throttle response.">
                Smooth acceleration: Prompt and seamless throttle response.
              </el-text>
              <el-text class="w-150px mb-2" truncated title="Steady and stable idle speed.">
                Consistent idling: Steady and stable idle speed.
              </el-text>
              <el-text class="w-150px mb-2" truncated title="Clean emissions within limits.">
                Minimal exhaust emissions: Clean emissions within limits.
              </el-text>
            </el-card>

          </div>
        </el-scrollbar>
        <el-slider
            v-model="value"
            :max="max"
            :format-tooltip="formatTooltip"
            @input="inputSlider"
        />
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