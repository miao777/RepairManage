<template>
  <div class="dashboard-container" style="height:100%;">
    <component :is="currentRole" style="height:108px; padding:0;" />
  </div>
</template>

<script>
// import banner from '@/images/bannner.jpg'
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import RaddarChart from './admin/components/RaddarChart'
// import moment from 'moment'//////
import Pagination from '@/components/Pagination'
export default {
  name: 'Dashboard',
  components: {
    adminDashboard,
    RaddarChart,
    Pagination },
  data() {
    return {
      currentRole: 'adminDashboard',
      raddarData: []
      // banner: banner
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.totitle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.titlelists{
  margin: 0;
  margin-bottom:10px;
  letter-spacing: 1px;
  color: rgb(82, 82, 82);
}
</style>
