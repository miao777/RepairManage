<template>
  <div id="printMe" class="download">
    <!-- 头部标题 -->
    <header>
      <h1>成都国际商贸城</h1>
      <h1>{{ content.title }}</h1>
    </header>

    <!-- 开头标语 -->
    <section class="synopsis">
      <p>尊敬的商家朋友：</p>
      <!-- 简介 -->
      <p>{{ content.summary }}</p>
      <p>问卷调查内容:</p>
      <!-- 商户信息 -->
      <div class="merchant">
        <p>商家信息：&nbsp;
          <span>{{ parameter.shop.region }}</span>
          <!-- <span>区</span> -->
          <span>{{ parameter.shop.floor }}</span>
          <span>楼</span>
          <span>{{ parameter.shop.shopNo }}</span>
          <span>号</span>
        </p>
        <p>姓名：&nbsp;<span>{{ parameter.shop.name }}</span></p>
        <p>联系电话：&nbsp;<span>{{ parameter.shop.tel }}</span></p>
      </div>
    </section>

    <!-- 选择题 -->
    <section class="choice">
      <div v-for="(item,index) in content.questions" :key="index">
        <div v-if="!item.hasOtherAnswer">
          <p>{{ (item.sortNo)+' '+item.topic+"（"+title(item.selectType)+"题）" }}</p>
          <section class="checktext">
            <div v-for="(text,indexs) in item.questionOptions" :key="indexs" class="itemtext">
              <el-checkbox v-if="text.otherAnswer==''" v-model="text.checked">{{ text.content }}</el-checkbox>
              <el-checkbox v-else-if="text.otherAnswer!=='' && !text.checked">{{ text.content }}（{{ text.otherAnswer }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）</el-checkbox>
              <el-checkbox v-else v-model="text.checked">{{ text.content }}（{{ text.otherAnswer }}）</el-checkbox>
            </div>
          </section>
        </div>
        <section v-if="item.hasOtherAnswer">
          <p>{{ (item.sortNo)+' '+item.topic+"（"+title(item.selectType)+"题）" }}</p>
          <section class="inputtable">{{ item.answers }}</section>
        </section>
      </div>
    </section>

    <!-- 打印按钮 -->
    <button v-print="'#printMe'" class="btndy">打印页面</button>
  </div>
</template>

<script>
import { askList, getvolumeType, volumeAnswer } from '@/api/volume'

export default {
  data() {
    return {
      parameter: {},
      searchForm: {
        filters: [
          { field: 'id', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 10 }
      },
      answersearchForm: {
        filters: [
          { field: 'answerSheet.id', op: 'EQ', value: '' }
        ],
        page: { page: 0, size: 100 }
      },
      titletypes: [], // 题目类型
      content: [], // 打印数据，
      contentst: []
    }
  },
  beforeCreate: function() {
    // document.getElementsByTagName('body')[0].style = 'overflow: auto;'
    document.getElementsByTagName('body')[0].style = 'overflow: auto;background-color:white;'
  },
  created() {
    this.parameter = JSON.parse(decodeURIComponent(this.$route.query.answertext))
    this.askList()
  },
  methods: {
    async askList() {
      this.searchForm.filters[0].value = this.parameter.id
      const resp = await askList(this.searchForm)
      if (resp.success) {
        resp.rows[0].questions.sort(this.sortData)
        this.contentst = resp.rows[0]
        // console.log(this.contentst, '12121sadsad')
        this.getvolumeType()
      }
    },
    // 题目类型
    async getvolumeType() {
      const resp = await getvolumeType()
      if (resp.success) {
        this.titletypes = resp.rows
        this.getAnswerList()
      }
    },
    // 返回题目类型
    title(data) {
      let text = ''
      this.titletypes.map(item => {
        if (item.name === data) {
          text = item.value
        }
      })
      return text
    },
    // 查询答案
    async getAnswerList() {
      this.answersearchForm.filters[0].value = this.parameter.answerid
      const resp = await volumeAnswer(this.answersearchForm)
      if (resp.success) {
        const data = resp.rows
        this.contentst.questions.map(item => {
          data.map(k => {
            if (item.id === k.question.id) {
              item.answers = k.answers
              if (item.selectType === 'QA' && k.question.selectType === 'QA') {
                item.answers = k.content
              }
            }
          })
          this.seclection(item)
        })
        this.content = this.contentst
      }
    },
    seclection(data) {
      if (data.selectType !== 'QA') {
        if (data.answers !== undefined && data.answers.length > 0) {
          data.questionOptions.map(q => {
            data.answers.map(t => {
              if (q.id === t.questionOption.id) {
                q.checked = true
                const marks = Object.assign(t.otherAnswer).split('').pop()
                if (marks === '：') {
                  q.otherAnswer = t.otherAnswer + '未填写'
                } else {
                  q.otherAnswer = t.otherAnswer
                }
                // q.otherAnswer = t.otherAnswer
              } else {
                if (!q.checked) {
                  q.checked = false
                }
              }
            })
          })
        } else {
          data.questionOptions.map(r => {
            r.checked = false
          })
        }
      }
    },
    sortData(a, b) {
      return a.sortNo - b.sortNo
    }
  }
}
</script>

<style scoped lang='scss'>
.download{
  width: 1200px;
  padding: 0 100px;
  margin: 0 auto;
  background-color: white;
  height: 100%;
  position: relative;
  header{
    width: 100%;
    text-align: center;
    border-bottom: 2px dashed rgb(225, 225, 225);
    padding-top: 40px;
    padding-bottom: 30px;
    h1{
      color: black;
      vertical-align: bottom;
      span{
         display: inline-block;
         border-bottom: 1px solid rgb(50, 50, 50);
      }
      span:first-child{
        width: 120px;
      }
      span:last-child{
        width: 80px;
      }
    }
  }
  .synopsis{
    color: black;
    font-size: 16px;
    p:nth-child(2){
      text-indent: 3em;
      line-height: 2.4em;
    }
    .merchant{
      width: 100%;
      display: flex;
      align-items: center;
      height: 50px;
      vertical-align: bottom;
      p:first-child{
        width: 370px;
        display: flex;
        justify-content: space-between;
        vertical-align: bottom;
        span{
          display: inline-block;
        }
        span:first-child,span:nth-child(3),span:nth-child(5){
          width: 60px;
          text-align: center;
          font-weight: bold;
        }
      }
      p:nth-child(2),p:last-child{
        width: 280px;
        span{
          color: black;
          margin-top: 10px;
          font-weight: bold;
        }
      }
    }
  }
  .choice{
    color: black;
    font-size: 16px;
    padding-bottom: 40px;
    .checktext{
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      line-height: 2em;
      .itemtext label{
        min-width: 250px;
        max-width: 1000px;
        color: black;
      }
    }
    .inputtable{
        width: 100%;
        min-height: 100px;
        border: 1px dashed black;
        line-height: 2em;
        padding: 4px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
        word-wrap:break-word;
      }
  }
  .btndy{
    position: absolute;
    top: 10px;
    right: -100px;
  }
}
/deep/.el-checkbox__input.is-disabled+span.el-checkbox__label{
  color: black;
}
/deep/.el-checkbox__input.is-disabled .el-checkbox__inner{
  background-color: white;
  border-color: black;
}
</style>
