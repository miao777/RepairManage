<template>
  <el-dialog :title="title" :visible.sync="isShow" width="50%" :before-close="handleClose" :close-on-click-modal="false" @open="handleOpen">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="省份" prop="provinceId">
        <el-select v-model="form.provinceIdtow" filterable placeholder="请选择省份" value-key="id" @change="getCityByProvince">
          <el-option v-for="item in ProvinceList" :key="item.id" :value="item" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="cityId">
        <el-select v-model="form.cityIdtow" filterable placeholder="请选择城市" value-key="id" @change="getDistrictByCity">
          <el-option v-for="item in CityList" :key="item.id" :value="item" :label="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="区县" prop="districtId">
        <el-select
          v-model="form.districtIdtow"
          filterable
          placeholder="请选择区县"
          value-key="id"
          @change="getqu"
        >
          <el-option v-for="item in DistrictList" :key="item.id" :value="item" :label="item.name" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型" @change="changeType">
          <el-option :value="1" label="企业" />
          <el-option :value="2" label="家庭" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="企业" prop="enterpriseId">
        <el-select v-model="form.enterpriseId" filterable placeholder="请选择企业">
          <el-option v-for="item in EnterPriseList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系人" prop="contactMan">
        <el-input v-model="form.contactMan" type="text" size="small" placeholder="请输入电话号码" />
      </el-form-item>
      <el-form-item label="联系电话" prop="mobileNo">
        <el-input v-model="form.mobileNo" type="text" size="small" maxlength="11" placeholder="请输入电话号码" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address" type="text" size="small" placeholder="请输入详细地址" @input="adderget" />
      </el-form-item>
      <el-form-item label="经纬度">
        <el-form-item prop="longitude" style="width:400px;display:inline-block;margin-right:13px;">
          <el-input v-model="form.longitude" type="text" size="small" placeholder="（经度）通过点击地图设置经度" disabled />
        </el-form-item>
        <el-form-item prop="latitude" style="width:400px;display:inline-block;">
          <el-input v-model="form.latitude" type="text" size="small" placeholder="（维度）通过点击地图设置维度" disabled />
        </el-form-item>
      </el-form-item>
      <el-form-item label="定位">
        <div class="padd20">
          <mapselect v-if="openMapType" :mapcenter="centerLatLng" :oldmarker="oldMarker" :addrposition="addrposition" @mapclick="pointChange" />
        </div>
      </el-form-item>
      <el-form-item class="form-footer" style="margin: 0">
        <el-button type="primary" icon="el-icon-check" @click="handleSubmit">{{ $t('common.confirm') }}</el-button>
        <el-button type="default" icon="el-icon-close" @click="handleClose">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import ElementIcon from '@/icons'
import ProvinceApi from '@/api/province'
import CityApi from '@/api/city'
import EnterPrise from '@/api/enterprise'
import DistrictApi from '@/api/district'
import AddressApi from '@/api/address'
import qqMapSelectPoint from './selectPoint.vue'
import { checkMobile } from '@/tools/date.js'
export default {
  components: {
    mapselect: qqMapSelectPoint
  },
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
    },
    isId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      openMapType: false, // 地图充值状态
      // 地图
      pointName: '成都',
      qqmap: null,
      centerLatLng: '34.759666,113.648071',
      oldMarker: '34.759666,113.648071',
      newMarker: null,
      addrposition: { sn: '', si: '', qu: '', addr: '' },
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
        id: '',
        provinceIdtow: '',
        cityIdtow: '',
        districtIdtow: ''
      },
      rules: {
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur,change' }],
        cityId: [{ required: true, message: '请选择城市', trigger: 'blur,change' }],
        contactMan: [{ required: true, message: '请输入联系人', trigger: 'blur,change' }],
        districtId: [{ required: true, message: '请选择区县', trigger: 'blur,change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur,change' }],
        enterpriseId: [{ required: true, message: '请选择企业', trigger: 'blur,change' }],
        latitude: [{ required: true, message: '请点击地图设置维度', trigger: 'blur,change' }],
        longitude: [{ required: true, message: '请点击地图设置经度', trigger: 'blur,change' }],
        mobileNo: [{ required: true, validator: checkMobile, trigger: 'blur' }],
        provinceId: [{ required: true, message: '请选择省份', trigger: 'blur,change' }]
      },
      ProvinceList: [], // 省份列表
      EnterPriseList: [], // 企业列表
      FamilyList: [], // 家庭列表
      CityList: [], // 城市列表
      DistrictList: [], // 区县列表
      EnterPriseSearch: { filters: [{ field: 'id', op: 'EQ', value: '' }], page: { page: 0, size: 99999 }},
      ProvinceSearch: { page: { page: 0, size: 9999999 }},
      CitySearch: { filters: [{ field: 'province.id', op: 'EQ', value: '' }],
        page: { page: 0, size: 9999999 }
      },
      DistrictSearch: { filters: [{ field: 'city.id', op: 'EQ', value: '' }],
        page: { page: 0, size: 9999999 }
      }
    }
  },
  watch: {
    isShow: function(val) {
      if (val) {
        this.openMapType = true
        this.getAllProvince()
        this.getAllEnterPrise()
        if (!this.$props.isAdd) {
          this.form.id = this.$props.data.id
          this.form.provinceId = this.$props.data.province.id
          this.form.provinceIdtow = this.$props.data.province
          this.form.cityId = this.$props.data.city.id
          this.form.cityIdtow = this.$props.data.city
          this.form.districtId = this.$props.data.district.id
          this.form.districtIdtow = this.$props.data.district
          this.form.enterpriseId = this.$props.data.enterprise.id
          this.getCityByProvince(this.$props.data.province, true)
          this.getDistrictByCity(this.$props.data.city, true)
          this.addrposition = {
            sn: this.$props.data.province.name,
            si: this.$props.data.city.name,
            qu: this.$props.data.district.name,
            addr: this.$props.data.address
          }
          this.form.address = this.$props.data.address
          this.oldMarker = this.$props.data.latitude + ',' + this.$props.data.longitude
          this.form.latitude = this.$props.data.latitude
          this.form.longitude = this.$props.data.longitude
          this.form.contactMan = this.$props.data.contactMan
          this.form.mobileNo = this.$props.data.mobileNo
        }
      } else {
        this.form = {
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
          id: '',
          provinceIdtow: '',
          cityIdtow: '',
          districtIdtow: ''
        }
      }
    }
  },
  created() {
    // this.getAllProvince();
  },
  methods: {
    // 用户点击滴入获取坐标
    pointChange(ev) {
      // console.log('捕获到点击坐标', ev)
      this.form.longitude = ev.lng
      this.form.latitude = ev.lat
    },
    getAllEnterPrise() {
      EnterPrise.page(this.EnterPriseSearch).then(res => {
        if (res.success) {
          this.EnterPriseList = res.rows
        }
      })
    },
    // 家庭用户
    // getAllFaimly() {},
    getAllProvince() {
      ProvinceApi.page(this.ProvinceSearch).then(res => {
        if (res.success) {
          this.ProvinceList = res.rows
        }
      })
    },
    getCityByProvince(val, type = false) {
      this.addrposition.sn = val.name
      this.form.provinceId = val.id
      this.CitySearch.filters[0].value = val.id
      if (!type) {
        this.$set(this.form, 'cityIdtow', '')
        this.$set(this.form, 'districtIdtow', '')
        this.$set(this.form, 'address', '')
        this.$set(this.addrposition, 'si', '')
        this.$set(this.addrposition, 'qu', '')
        this.$set(this.addrposition, 'addr', '')
        this.$set(this.form, 'latitude', '')
        this.$set(this.form, 'longitude', '')
      }
      CityApi.page(this.CitySearch).then(res => {
        if (res.success) {
          this.CityList = res.rows
        }
      })
    },
    getDistrictByCity(val, type = false) {
      this.addrposition.si = val.name
      this.form.cityId = val.id
      this.DistrictSearch.filters[0].value = val.id
      if (!type) {
        this.$set(this.form, 'districtIdtow', '')
        this.$set(this.form, 'address', '')
        this.$set(this.addrposition, 'qu', '')
        this.$set(this.addrposition, 'addr', '')
        this.$set(this.form, 'latitude', '')
        this.$set(this.form, 'longitude', '')
      }
      DistrictApi.page(this.DistrictSearch).then(res => {
        if (res.success) {
          this.DistrictList = res.rows
        }
      })
    },
    getqu(val) {
      this.form.districtId = val.id
      this.addrposition.qu = val.name
      this.form.address = ''
      this.form.longitude = ''
      this.form.latitude = ''
      this.addrposition.addr = ''
    },
    adderget(val) {
      this.addrposition.addr = val
      this.$set(this.form, 'latitude', '')
      this.$set(this.form, 'longitude', '')
    },
    // changeType(val) {
    //   console.log(val)
    //   if (val === 1) this.getAllEnterPrise()
    //   // 选择企业
    //   else this.getAllFaimly() // 选择家庭
    // },
    async addMenu() {
      delete this.form.id
      delete this.form.provinceIdtow
      delete this.form.cityIdtow
      delete this.form.districtIdtow
      const resp = await AddressApi.add(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    async editMenu() {
      delete this.form.provinceIdtow
      delete this.form.cityIdtow
      delete this.form.districtIdtow
      const resp = await AddressApi.edit(this.form)
      if (resp.success) {
        this.handleClose()
      }
    },
    // 默认打开窗口事件
    handleOpen() {
      this.EnterPriseSearch.filters[0].value = this.isId
      // if (!this.$props.isAdd) {
      // }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.isAdd ? this.addMenu() : this.editMenu()
        }
      })
    },
    handleClose(done) {
      this.openMapType = false
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
    .qqmap {
        width: 800px;
        height: 600px;
        position: relative;
    }
    .positions {
        width: 800px;
        height: 600px;
        background-color: rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 0;
    }
</style>
