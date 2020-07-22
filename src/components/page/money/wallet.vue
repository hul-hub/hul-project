<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="80px" label-position="left" size="small">
          <el-row :gutter="36" type="flex">
            <el-col :span="6" style="margin: auto;">
              <el-form-item label="商户编码:" class="query-form-item">
                <el-select v-model="query.serProCode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in toSerproList"
                    :key="index"
                    :label="item.serproname"
                    :value="item.serprocode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-row justify="end" type="flex">
                <el-button type="primary" icon="el-icon-search" size="small" @click="queryFun">查询</el-button>
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
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-s-finance"
          class="handle-del mr10"
          v-if="hasPerm('packet_top_uo')"
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
        <el-table-column prop="serproName" label="商户名称" align="center"></el-table-column>
        <el-table-column prop="orderid" label="订单号" align="center"></el-table-column>
        <el-table-column label="充值金额" align="center">
          <template slot-scope="scope">{{scope.row.amount/100}}</template>
        </el-table-column>
        <el-table-column label="充值方式" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.payTypeCode | filterPaytype}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="finishtime" label="充值时间" align="center"></el-table-column>
        <!-- <el-table-column label="充值状态" align="center">
           <template slot-scope="scope">
            <span>{{scope.row.status | filterOrderStatus}}</span>
          </template>
        </el-table-column>-->
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="pageInfo.pageIndex"
          :page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, prev, pager, next,sizes"
          :total="pageInfo.total"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
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
      toSerproList: [],
      balance: 0.0,
      qrcodeUrl: "",
      moneyModal: false,
      query: {
        serProCode: ""
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
        total: 0
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
    that.querySerProListByCode();
  },
  methods: {
    querySerProListByCode() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = 2;
      Server.post(Path.querySerProListByCode, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
    },
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
        let { code, data, msg, total } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = total;
        }
      });
    },
    ran(m) {
      m = m > 13 ? 13 : m;
      var num = new Date().getTime();
      return num.toString().substring(13 - m);
      num.toString().substring(13 - m);
    },
    // 分页导航
    handlePageChange(val) {
      let that = this;
      that.pageInfo.pageIndex = val;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    // 更改分页大小
    handleSizeChange(val) {
      let that = this;
      that.tableData = [];
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = val;
      that.loadData();
    },
    refreshFun: function() {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.query.serProCode = "";
      that.balance = 0;
      that.loadData();
    },
    queryFun: function() {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
      that.loadBalance();
    }
  },
  filters: {
    filterPaytype(paytypecode) {
      switch (paytypecode) {
        case "01":
          return "微信";
        case "02":
          return "支付宝";
        default:
          return "其他";
      }
    },
    filterOrderStatus(val) {
      let payStatus = "";
      switch (val) {
        case "SUCCESS":
          payStatus = "支付成功";
          break;
        case "REFUND":
          payStatus = "转入退款";
          break;
        case "NOTPAY":
          payStatus = "未支付";
          break;
        case "CLOSE":
          payStatus = "已关闭";
          break;
        case "REVERSE":
          payStatus = "已冲正";
          break;
        case "REVOK":
          payStatus = "已撤销";
          break;
      }
      return payStatus;
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
