<template>
  <div>
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
        userTotal: 0
      },
      options: {},
      options2: {}
    };
  },
  components: {
    Schart
  },
  created() {
    let that = this;
    that.loadUser();
    that.loadData();
    // that.initWeekData();
  },
  computed: {},
  methods: {
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
    loadUser() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 999;
      Server.post(Path.queryUserList, params, res => {
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
      Server.post(Path.querySerProList, params, res => {
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
              text: "近7天服务商新增情况"
            },
            xRorate: 25,
            labels: serTime,
            datasets: [
              {
                label: "服务商",
                data: serData
              }
            ]
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
              text: "近7天商户新增情况"
            },
            xRorate: 25,
            labels: merTime,
            datasets: [
              {
                label: "商户",
                data: merData
              }
            ]
          };
        }
      });
    }
  }
};
</script>


<style scoped>
.schart {
  width: 100%;
  height: 300px;
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
</style>
