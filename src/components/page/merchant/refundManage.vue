<template>
  <div style="height:100%">
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="150px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="12">
              <el-form-item label="商户编码:" class="shanchu">
                <el-select v-model="query.serprocode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in toSerproList"
                    :key="index"
                    :label="item.serproname"
                    :value="item.serprocode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交易订单号:" class="shanchu">
                <el-input v-model="query.fontOrderid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36" align="center">
            <el-col :span="12">
              <el-form-item label="总金额(单位：元):" class="shanchu">
                <el-input v-model="query.total_fee"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退款金额(单位：元):" class="shanchu">
                <el-input v-model="query.refund_fee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="end" type="flex">
            <el-button type="primary" icon="el-icon-s-finance" size="small" @click="saveEdit">退款</el-button>
            <el-button
              type="primary"
              icon="el-icon-refresh-left"
              size="small"
              @click="refreshFun"
            >重置</el-button>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="container" v-if="qrcodeUrl">
      <el-row type="flex" justify="center">
        <div>
          <img :src="qrcodeUrl" alt />
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "payTest",
  data() {
    return {
      query: {
        serprocode: "",
        fontOrderid: "",
        total_fee: 0,
        refund_fee: 0,
        out_refund_no: "",
        op_user_id: "001",
      },
      qrcodeUrl: "",
      toSerproList: [],
    };
  },
  created() {
    let that = this;
    that.querySerProListSelect();
  },
  methods: {
    querySerProListSelect() {
      let that = this;
      Server.post(Path.querySerProListSelect, { serviceType: 2 }, (res) => {
        that.toSerproList = res;
      });
    },
    refreshFun: function () {
      let that = this;
      that.query = {
        serprocode: "",
        fontOrderid: "",
        total_fee: 0,
        refund_fee: 0,
        out_refund_no: "",
        op_user_id: "001",
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
      let jsonData = {
        fontOrderid: that.query.fontOrderid,
        total_fee: that.query.total_fee * 100,
        refund_fee: that.query.refund_fee * 100,
        serprocode: that.query.serprocode,
        op_user_id: that.query.op_user_id,
        out_refund_no: that.ran(13),
      };
      Server.post(
        Path.refund,
        { jsonData: JSON.stringify(jsonData) },
        (res) => {
          console.log(res);
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success(msg);
          } else {
            that.$message.error(msg);
          }
        }
      );
    },
  },
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
