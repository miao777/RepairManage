<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="省份" prop="provinceId">
        <el-select v-model="form.provinceId" placeholder="请选择省份" value-key="id" @change="getCityByProvince">
          <el-option v-for="item in ProvinceList" :key="item.id" :value="item" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="cityId">
        <el-select v-model="form.cityId" placeholder="请选择城市" value-key="id" @change="getDistrictByCity">
          <el-option v-for="item in CityList" :key="item.id" :value="item" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="区县" prop="districtId">
        <el-select v-model="form.districtId" placeholder="请选择区县" value-key="id">
          <el-option v-for="item in DistrictList" :key="item.id" :value="item" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="type" placeholder="请选择类型" @change="changeType">
          <el-option :value="1" label="企业" />
          <el-option :value="2" label="家庭" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="type == 1" label="企业" prop="enterpriseId">
        <el-select v-model="form.enterpriseId">
          <el-option v-for="item in EnterPriseList" :key="item.id" :value="item.id" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" type="text" size="small" placeholder="请输入详细地址" @blur="getLongitudeAndLatitude" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" type="text" placeholder="请输入省份编码" />
      </el-form-item>

      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import ElementIcon from '@/icons'
import ProvinceApi from '@/api/province'
import CityApi from '@/api/city'
import EnterPrise from '@/api/enterprise'
import DistrictApi from '@/api/district'
import AddressApi from '@/api/address'
// import axios from 'axios'
export default {
  props: {
    title: {
      type: String,
      default: '新增'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      levels: [
        {
          label: this.$t('menu.title1'),
          value: 1
        },
        {
          label: this.$t('menu.title2'),
          value: 2
        }
      ],
      parents: [],
      icons: ElementIcon,
      showParent: false,
      form: {
        address: '',
        cityId: '',
        contactMan: '',
        districtId: '',
        enterpriseId: '',
        familyId: '',
        latitude: '',
        longitude: '',
        mobileNo: '',
        provinceId: '',
        id: ''
      },
      rules: {
        name: [{ required: true, message: '请输入省份', trigger: 'blur,change' }],
        code: [{ required: true, message: '请输入省份编码', trigger: 'blur,change' }]
      },
      type: '', // 选择企业或家庭  默认为空
      ProvinceList: [], // 省份列表
      EnterPriseList: [], // 企业列表
      FamilyList: [], // 家庭列表
      CityList: [], // 城市列表
      DistrictList: [], // 区县列表
      EnterPriseSearch: {
        page: {
          page: 0,
          size: 99999
        }
      },
      ProvinceSearch: {
        page: {
          page: 0,
          size: 9999999
        }
      },
      CitySearch: {
        filters: [{ field: 'province.id', op: 'EQ', value: '' }],
        page: {
          page: 0,
          size: 9999999
        }
      },
      DistrictSearch: {
        filters: [{ field: 'city.id', op: 'EQ', value: '' }],
        page: {
          page: 0,
          size: 9999999
        }
      }
    }
  },
  watch: {
    isShow: function(val) {
      if (val) {
        this.getAllProvince()
      }
    }
  },
  created() {
    // this.getAllProvince();
  },
  methods: {
    getLongitudeAndLatitude() {
      if (this.form.provinceId && this.form.cityId && this.form.districtId) {
        // console.log(this.form.provinceId.name, this.form.cityId.name, this.form.districtId.name, this.form.address)
        // axios.get('https://apis.map.qq.com/ws/geocoder/v1/?address=' + this.form.provinceId.name + this.form.cityId.name + this.form.districtId.name + this.form.address + '&key=SJRBZ-YNH6U-44AVY-2IJXM-ISBAZ-BMFI7', {
        //   headers: {
        //     'Access-Control-Allow-Origin': '*'
        //   }
        // }).then(res => {
        //   console.log(res)
        // })
        // this.$jsonp('https://apis.map.qq.com/ws/geocoder/v1/', {
        //   address: this.form.provinceId.name + this.form.cityId.name + this.form.districtId.name + this.form.address,
        //   key: 'SJRBZ-YNH6U-44AVY-2IJXM-ISBAZ-BMFI7'
        // }).then(res => {
        //   console.log(res)
        // })
      } else {
        this.$message.error('请先选择省市县')
      }
    },
    getAllEnterPrise() {
      EnterPrise.page(this.EnterPriseSearch).then(res => {
        if (res.success) {
          this.EnterPriseList = res.rows
        }
      })
    },
    getAllFaimly() {},
    getAllProvince() {
      ProvinceApi.page(this.ProvinceSearch).then(res => {
        if (res.success) {
          this.ProvinceList = res.rows
        }
      })
    },
    getCityByProvince(val) {
      // console.log(val)
      this.CitySearch.filters[0].value = val.id
      this.$set(this.form, 'cityId', '')
      this.$set(this.form, 'districtId', '')
      CityApi.page(this.CitySearch).then(res => {
        if (res.success) {
          this.CityList = res.rows
        }
      })
    },
    getDistrictByCity(val) {
      this.DistrictSearch.filters[0].value = val.id
      this.$set(this.form, 'districtId', '')
      DistrictApi.page(this.DistrictSearch).then(res => {
        if (res.success) {
          this.DistrictList = res.rows
        }
      })
    },
    changeType(val) {
      console.log(val)
      if (val === 1) this.getAllEnterPrise()
      // 选择企业
      else this.getAllFaimly() // 选择家庭
    },
    async addMenu() {
      delete this.form.id
      const resp = await AddressApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      const resp = await AddressApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    handleOpen() {
      if (!this.$props.isAdd) {
        this.form = this.$props.data
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.addMenu() : this.editMenu()
        }
      })
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      this.$emit('close')
    }
  }
}
</script>
<style>
    .icon-in-table {
        font-size: 18px;
        color: #f56c6c;
        margin-right: 5px;
    }
</style>
