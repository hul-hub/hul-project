<template>
  <div>
    <div class="container" v-if="serviceType == 2">
      <!-- <div class="container"> -->
      <div class="time">
        <p style="color:#fff;font-size:14px;">
          hello！，上午好！ 欢迎使用胡掌柜云服务管理系统。当前时间为：
          <span>{{nowTime}}</span>
          <span>{{week}}</span>
        </p>
      </div>
      <div class="hot">
        <span style="font-size:14px;font-weight:550;">最新公告</span>
        <img
          style="height: 20px;
    width: 20px;
    margin-left: 10px;"
          src="../../assets/img/hot.png"
          alt
        />
      </div>
      <div>
        <h2
          style="text-align:center;font-weight:400;margin-top:40px;font-size: 26px;"
        >{{noticeItem.noticetitle}}</h2>
        <div style="text-align:right;font-size: 16px;">
          <span>发布人:{{noticeItem.creatername}}</span>&nbsp;&nbsp;
          <span>发布时间:{{noticeItem.createdate}}</span>
        </div>
        <hr
          style="background-color: #e6e6e6;height: 1px;
    margin: 10px 0;
    border: 0;
    clear: both;"
        />
        <div v-html="noticeItem.noticecontent" style="margin-left: 75px;font-size: 16px;"></div>
      </div>
    </div>
    <div v-if="serviceType == 1">
      <div class="search">
        <el-card class="box-card">
          <div class="content-head">
            <div class="content-head-head">
              <div>
                <img src="@/assets/img/service_total.png" alt />
              </div>
              <div>
                <div>
                  <p class="head-title">服务商总数</p>
                  <p class="head-foot">{{totalItem.serviceTotal}}</p>
                </div>
              </div>
            </div>
            <div class="content-head-head">
              <div>
                <img src="@/assets/img/mer_total.png" alt />
              </div>
              <div>
                <div>
                  <p class="head-title">商户总数</p>
                  <p class="head-foot">{{totalItem.merTotal}}</p>
                </div>
              </div>
            </div>
            <div class="content-head-head" style="border-right:0;">
              <div>
                <img src="@/assets/img/user_total.png" alt />
              </div>
              <div>
                <div>
                  <p class="head-title">用户总数</p>
                  <p class="head-foot">{{totalItem.userTotal}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="dash-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover">
              <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Schart from "vue-schart";
import Server from "@/service/request";
import Path from "@/service/Path";
import moment from "moment";
export default {
  name: "dashboard",
  data() {
    return {
      totalItem: {
        serviceTotal: 0,
        merTotal: 0,
        userTotal: 0,
      },
      options: {},
      options2: {},
      noticeItem: {},
      nowTime: "",
      week: "",
      serviceType: 2,
    };
  },
  components: {
    Schart,
  },
  created() {
    let that = this;
    that.serviceType = localStorage.getItem("serviceType");
    if (that.serviceType == 1) {
      that.loadUser();
      that.loadData();
      that.initWeekData();
    } else {
      that.nowTimes();
      that.loadNotice();
    }
  },
  computed: {},
  methods: {
    //显示当前时间（年月日时分秒）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      this.getDay();
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    getDay() {
      var now = new Date();
      var day = now.getDay();
      var weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      this.week = weeks[day];
    },
    // 初始化近7天时间
    initWeekData() {
      var weekArray = [];
      for (var i = 7; i > 0; i--) {
        var obj = {};
        obj.date = moment()
          .subtract("days", i - 1)
          .format("YYYY-MM-DD");
        obj.data = 0;
        weekArray.push(obj);
      }
      return weekArray;
    },
    loadNotice() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 10;
      Server.post(Path.queryNoticeList, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.noticeItem = data[0];
        }
      });
    },
    loadUser() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 999;
      Server.post(Path.queryUserList, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.totalItem.userTotal = data.length;
        }
      });
    },
    loadData() {
      let that = this;
      let serWeekArr = that.initWeekData();
      let merWeekArr = that.initWeekData();
      let params = {};
      params["page"] = 1;
      params["limit"] = 999;
      Server.post(Path.querySerProList, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          let serArr = [];
          let merArr = [];
          for (let item of data) {
            if (item.servicetype == 1) {
              that.totalItem.serviceTotal++;
              for (let weekItem of serWeekArr) {
                if (item.createdate == weekItem.date) {
                  weekItem.data++;
                  break;
                }
              }
            } else {
              that.totalItem.merTotal++;
              for (let weekItem of merWeekArr) {
                if (item.createdate == weekItem.date) {
                  weekItem.data++;
                  break;
                }
              }
            }
          }
          var serTime = [];
          var serData = [];
          for (let ser of serWeekArr) {
            serTime.push(ser.date);
            serData.push(ser.data);
          }
          // 服务商
          that.options = {
            type: "bar",
            title: {
              text: "近7天服务商新增情况",
            },
            xRorate: 25,
            labels: serTime,
            datasets: [
              {
                label: "服务商",
                data: serData,
              },
            ],
          };
          var merTime = [];
          var merData = [];
          for (let ser of merWeekArr) {
            merTime.push(ser.date);
            merData.push(ser.data);
          }
          // 商户
          that.options2 = {
            type: "bar",
            title: {
              text: "近7天商户新增情况",
            },
            xRorate: 25,
            labels: merTime,
            datasets: [
              {
                label: "商户",
                data: merData,
              },
            ],
          };
        }
      });
    },
  },
};
</script>


<style scoped>
.time {
  margin-bottom: 20px;
  padding: 15px;
  line-height: 22px;
  border-left: 5px solid rgb(21, 74, 154);
  border-radius: 0 2px 2px 0;
  background-color: rgb(21, 74, 154) !important;
}
.hot {
  padding: 10px 15px;
  border-left: 5px solid rgb(21, 74, 154);
  border-radius: 0 2px 2px 0;
  background-color: #f2f2f2;
  line-height: 22px;
  display: flex;
  align-items: center;
}
.content-head {
  display: flex;
  min-height: 100px;
  align-items: center;
  background: #fff;
}
.content-head-head {
  display: flex;
  border-right: 1px solid #dddee1;
  width: 33.3%;
  justify-content: center;
}
.content-head-head div:nth-of-type(2) {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.content-head-head div:nth-of-type(2) > div {
  text-align: center;
}
.content-head-head div:nth-of-type(3) > div {
  margin-left: 26px;
}
.head-title {
  font-size: 16px;
  color: #333333;
}
.head-foot {
  font-size: 20px;
  color: #333333;
  font-weight: 550;
}
.dash-content {
  margin-top: 20px;
  margin-bottom: 60px;
}
.schart {
  width: 100%;
  height: 300px;
}
</style>
