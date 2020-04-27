<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <!-- <svg-icon icon-class="peoples" class-name="card-panel-icon" /> -->
          <i class="el-icon-user" style="font-size:50px" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ '家庭用户' }}
          </div>
          <count-to :start-val="0" :end-val="formFirstColumnData.familyNumber" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="padding-left:0;padding-right:0;">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-office-building" style="font-size:50px" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ '企业用户' }}
          </div>
          <count-to :start-val="0" :end-val="formFirstColumnData.enterpriceNumber" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="padding-right:0;">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-shopping-bag-2" style="font-size:50px" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ '维修师傅' }}
          </div>
          <count-to :start-val="0" :end-val="formFirstColumnData.repairManNumber" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-share" style="font-size:50px" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ '完成订单' }}
          </div>
          <count-to :start-val="0" :end-val="formFirstColumnData.orderNumber" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import StatisticsApi from '@/api/statistics'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      formFirstColumnData: { familyNumber: 0, enterpriceNumber: 0, repairManNumber: 0, orderNumber: 0 }
    }
  },
  created() {
    this.familyNumber()
    this.enterpriceNumber()
    this.repairManNumber()
    this.orderNumber()
  },
  methods: {
    async familyNumber() {
      const resp = await StatisticsApi.familyNumber()
      if (resp.success) {
        this.formFirstColumnData.familyNumber = resp.data
      }
    },
    async enterpriceNumber() {
      const resp = await StatisticsApi.enterpriceNumber()
      if (resp.success) {
        this.formFirstColumnData.enterpriceNumber = resp.data
      }
    },
    async repairManNumber() {
      const resp = await StatisticsApi.repairManNumber()
      if (resp.success) {
        this.formFirstColumnData.repairManNumber = resp.data
      }
    },
    async orderNumber() {
      const resp = await StatisticsApi.orderNumber()
      if (resp.success) {
        this.formFirstColumnData.orderNumber = resp.data
      }
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #e61414;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    display: flex;
    justify-content: space-between;
    // &:hover {
      .card-panel-icon-wrapper i{
        color: #fff;

      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    // }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      width: 82px;
      height: 82px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: center;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
