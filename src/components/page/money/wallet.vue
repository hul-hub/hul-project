<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="80px" label-position="left" size="small">
          <el-row :gutter="36" type="flex">
            <el-col :span="6" style="margin: auto;">
              <el-form-item label="商户编码:" class="query-form-item">
                <el-input v-model="query.serProCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-row justify="end" type="flex">
                <el-button type="primary" icon="el-icon-search" size="small" @click="queryFun">查询</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-s-finance"
          class="handle-del mr10"
          @click="moneyModal = true"
        >充值</el-button>
        <p class="balance">
          可用余额:
          <span>{{balance}}</span>
          元
        </p>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="rolename" label="订单号" align="center"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
      </el-table>
    </div>
    <template>
      <Modal v-model="moneyModal" :closable="false" :mask-closable="false" width="780" title="扫描充值">
        <el-form ref="serItem" :model="serItem" :rules="rules" label-width="110px">
          <el-row :gutter="36" type="flex">
            <el-col :span="12">
              <el-form-item label="商户编码：" prop="serprocode">
                <el-input v-model="serItem.serprocode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充值金额：" prop="orderamount">
                <el-input-number
                  v-model="serItem.orderamount"
                  :controls="false"
                  :min="0.01"
                  style="width:100%"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36" type="flex">
            <el-col :span="12">
              <el-form-item label="支付方式：" prop="payType">
                <el-select v-model="serItem.payType" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in payTypeList"
                    :key="index"
                    :label="item.paytypename"
                    :value="item.paytypecode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <img :src="qrcodeUrl" alt />
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelFun">取 消</el-button>
          <el-button type="primary" @click="okFun">确 定</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "wallet",
  data() {
    return {
      tableData: [],
      payTypeList: [],
      balance: 0.0,
      qrcodeUrl: "",
      moneyModal: false,
      query: {
        serProCode: "5922218727791888"
      },
      rules: {
        serprocode: [
          { required: true, message: "请输入商户编码", trigger: "blur" }
        ],
        orderamount: [
          { required: true, message: "请输入充值金额", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ]
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: ""
      },
      serItem: {
        serprocode: "",
        payType: ""
      }
    };
  },
  created() {
    let that = this;
    that.queryBasePayType();
  },
  methods: {
    okFun() {
      let that = this;
      that.$refs.serItem.validate(valid => {
        if (valid) {
          let jsonData = {
            mchOrderId: that.ran(13),
            orderAmount: that.serItem.orderamount * 100,
            serProCode: that.serItem.serprocode,
            payTypeCode: that.serItem.payType,
            profitSharing: "N",
            spbill_create_ip: "195.15.6.52",
            goodsName: "手机",
            flag: "1",
            userId: "123",
            backUrl: "https://baidu.com",
            product_id: "10"
          };
          Server.post(Path.recharge, jsonData, res => {
            let { code, msg, respCode, code_url } = res;
            if (code_url) {
              that.qrcodeUrl = code_url;
            } else {
              that.$message.error(msg);
            }
          });
        }
      });
    },
    cancelFun() {
      let that = this;
      that.moneyModal = false;
      that.serItem = {
        serprocode: "",
        payType: ""
      };
      that.$refs.serItem.resetFields();
    },
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
    loadBalance() {
      let that = this;
      Server.post(
        Path.queryBalance,
        { serProCode: that.query.serProCode },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            if (data) {
              that.balance = data.balance / 100;
            }
          }
        }
      );
    },
    loadData() {
      let that = this;
      let params = {};
      params["pageNum"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["serprocode"] = that.query.serProCode;
      Server.post(Path.queryRechargeRecord, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableData = data;
        }
      });
    },
    ran(m) {
      m = m > 13 ? 13 : m;
      var num = new Date().getTime();
      return num.toString().substring(13 - m);
      num.toString().substring(13 - m);
    },
    queryFun: function() {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
      that.loadBalance();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
  display: flex;
}

.table {
  width: 100%;
  font-size: 14px;
}
.balance {
  font-size: 14px;
  margin-left: 20px;
}
.balance > span {
  color: rgb(52, 201, 137);
  font-size: 18px;
}
</style>
