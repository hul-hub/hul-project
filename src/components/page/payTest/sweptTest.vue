<template>
  <div style="height:100%">
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="80px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="商户编码:" class="shanchu">
                <el-input v-model="query.serprocode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="金额:" class="shanchu">
                <el-input-number
                  v-model="query.orderamount"
                  placeholder="请输入测试金额"
                  :controls="false"
                  :min="0"
                  style="width:100%"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款码:" class="shanchu">
                <el-input v-model="query.payCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-row justify="end" type="flex">
                <el-button type="primary" icon="el-icon-s-finance" size="small" @click="saveEdit">支付</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh-left"
                  size="small"
                  @click="refreshFun"
                >重置</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <!-- <div class="container">
      <el-row type="flex" justify="center">
        <div>
          <img :src="qrcodeUrl" alt />
        </div>
      </el-row>
    </div>-->
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "sweptTest",
  data() {
    return {
      query: {
        serprocode: "",
        payCode: ""
      },
      qrcodeUrl: "",
      payTypeList: []
    };
  },
  created() {
    let that = this;
    that.queryBasePayType();
  },
  methods: {
    queryBasePayType() {
      let that = this;
      let params = {};
      Server.get(Path.queryBasePayType, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payTypeList = data;
        }
      });
    },
    refreshFun: function() {
      let that = this;
      that.query = {
        serprocode: "",
        payCode: ""
      };
      that.qrcodeUrl = "";
    },
    ran(m) {
      m = m > 13 ? 13 : m;
      var num = new Date().getTime();
      return num.toString().substring(13 - m);
      num.toString().substring(13 - m);
    },
    saveEdit() {
      let that = this;
      if (
        !that.query.serprocode ||
        !that.query.orderamount ||
        !that.query.payCode
      ) {
        that.$message.warning("必填项不能为空！");
        return;
      }
      let jsonData = {
        mchOrderId: that.ran(13),
        orderAmount: that.query.orderamount * 100,
        serProCode: that.query.serprocode,
        payCode: that.query.payCode,
        payTypeCode: "01",
        backUrl: "www.baidu.com",
        spbill_create_ip: "195.15.6.52",
        goodsName: "手机",
        flag: "1"
      };
      Server.postJson(Path.micropayPushOrder, JSON.stringify(jsonData), res => {
        let { code, msg } = res;
        if (msg) {
          that.$message.warning(msg);
        }
        that.$message.warning(res.respMsg);
        // let data = JSON.parse(res);
        // that.$message.warning(data.respMsg);
      });
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.shanchu > /deep/ .el-form-item__label::before {
  content: "*";
  color: red;
}
</style>
