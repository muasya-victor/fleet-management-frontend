<script setup lang="ts">
  import {ref, onMounted  } from 'vue';
  import {ElScrollbar} from "element-plus";

  const fleet = ref([
    {
      label:'G Wagon KBV459X',
      value: 1
    }
  ]);

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

  <div class="flex flex-col gap-4">
<!--    <el-select-->
<!--        v-model="formData.vehicle"-->
<!--        placeholder="Select Vehicle"-->
<!--        size="large"-->
<!--        style="width: 240px"-->
<!--    >-->
<!--      <el-option-->
<!--          v-for="item in fleet"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--      />-->
<!--    </el-select>-->

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

      <el-input v-model="searchPart" size="large"
                class="w-[400px]"
                placeholder="Search Vehicle Part" clearable />

      <el-scrollbar ref="scrollbarRef"  height="350px" always @scroll="scroll">
        <div ref="innerRef" class="flex flex-wrap gap-4" >
          <el-card v-for="item in vehicleParts"
              class="box-card w-[250px] cursor-pointer">
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