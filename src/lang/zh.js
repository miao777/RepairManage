export default {
  common: {
    search: '查询',
    reset: '重置',
    add: '新增',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    close: '关闭',
    confirm: '确认',
    printing: '打印',
    sort: '排序',
    start: '启用',
    stop: '停用',
    option: '操作',
    Jurisdiction: '权限',
    loading: '数据拼命加载中……',
    empty: '暂时还没有数据可以显示',
    index: '序号',
    description: '描述',
    notLoading: '无法加载...',
    noImgLoading: '暂未上传...',
    detail: '详情',
    info: '提示',
    oper: '操作',
    check: '查看',
    beginDate: '开始日期',
    endDate: '结束日期',
    to: '至',
    all: '全部',
    coin: '元',
    person: '人',
    please: {
      enter: '请输入',
      select: '请选择',
      selectQuery: '请选择（可搜索）',
      check: '请勾选',
      confirm: '请确认'
    },
    batch: {
      delete: '批量删除'
    },
    alert: {
      delete: '您是否要删除选中的记录？',
      batchDeletePre: '您是否要删除选中的',
      batchDeleteSuf: '条记录？删除后数据将无法恢复',
      notDeleteRow: '请选择要删除的记录'
    },
    dateRange: {
      lastWeek: '最近一周',
      lastMonth: '最近一个月',
      lastQuarter: '最近三个月'
    },
    upload: {
      size: '只能上传小于10M大小的图片'
    }
  },
  error: {
    login: {
      username: {
        empty: '请输入用户名'
      },
      password: {
        empty: '请输入密码'
      }
    }
  },
  login: {
    title: '欢迎使用家维后台管理系统',
    tip: '系统登录',
    version: 'V 1.10',
    login: '登　　录',
    username: '账号',
    password: '密码'
  },

  role: {
    name: '角色名',
    key: '角色键值',
    type: '角色类型',
    url: '跳转地址'
  },
  menu: {
    title: '菜单名称',
    title1: '一级菜单',
    title2: '二级菜单',
    icon: '菜单图标',
    href: '路由跳转链接',
    sortNo: '排序序号',
    parentId: '父菜单',
    level: '菜单级别',
    deleteLevel1Menu: '是否要选中的一级菜单？该操作会同时删除它下面所有的子菜单，并且无法恢复。',
    platform: '平台'
  },
  keywords: {
    name: '关键字',
    recommend: '是否推荐',
    searchCount: '搜索次数',
    createDate: '第一次搜索时间',
    lastModifiedDate: '上次搜索时间'
  },
  browsePage: {
    code: '标识符',
    content: '页面内容'
  },
  signRecord: {
    name: '签到人',
    shopNo: '店铺号',
    shopName: '店铺名称',
    status: '签到状态',
    mobileNo: '签到号码',
    signInDate: '签到时间',
    distance: '签到距离',
    shops: '签到店铺',
    statuses: [{ label: '全部', value: '' }, { label: '成功', value: true }, { label: '失败', value: false }]
  },
  // 商管员
  supervisor: {
    region: '区域',
    bindShop: '绑定商铺',
    unbindShop: '解绑商铺',
    shopCount: '已绑定商铺',
    shopCountUnit: '个',
    likeCount: '点赞次数',
    signCount: '签到次数',
    searchunBindShop: '请输入店铺号搜索',
    notBindRow: '请选择商铺记录',
    exchange: '转移商铺',
    selectTransferError: '请通过操作中的 添加商铺迁移 选择2条商管员的记录',
    selectTransferNumberError: '最多只能选择两条商管员记录',
    transfer: '商铺迁移',
    transferAdd: '添加商铺迁移',
    transferSelected: '已选择迁移商铺',
    transferSource: '请选择（旧）',
    transferTarget: '请选择（新）',
    transferTitle: '商管员',
    countShop: '重新统计商铺数量',
    countShopInfo: '请确认是否重新统计所有的商管员绑定的商铺数量？',
    status: '状态',
    statusTrue: '有效',
    statusFalse: '无效',
    male: '男',
    female: '女',
    rules: {
      username: '长度不能超过255个字符',
      supervisorNull: '商管员不能为空',
      supervisorRepeat: '不能选择相同的商管员'
    }
  },
  user: {
    username: '账号',
    password: '密码',
    name: '姓名',
    mobileNo: '电话',
    status: '状态',
    headerUrl: '头像',
    sex: '性别',
    email: '邮箱',
    resetPwd: '重置密码',
    blacklist: '黑名单',
    createDate: '注册时间',
    lastLoginTime: '上次登录时间',
    resetPwdInfo: '请确定是否用户重置密码？',
    statuses: [{ label: '全部', value: '' }, { label: '有效', value: true }, { label: '无效', value: false }]
  },
  updateOwn: {
    updatePwd: '修改密码',
    usedPwd: '旧密码',
    newPwd: '新密码',
    confirmNewPaw: '确认新密码'
  }
}

