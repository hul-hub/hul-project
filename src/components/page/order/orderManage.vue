<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="90px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属商户:">
                <el-select v-model="query.querySerprocode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in toSerproList"
                    :key="index"
                    :label="item.serproname"
                    :value="item.serprocode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商户订单号:">
                <el-input v-model="query.mchOrderid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付方式:">
                <el-select
                  v-model="query.paycodeArr"
                  @change="changePay"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in payTypeWayList"
                    :key="index"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交易状态:">
                <el-select v-model="query.paystatus" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36" align="center">
            <el-col :span="18">
              <el-form-item label="交易时间:" class="query-form-item">
                <el-date-picker
                  v-model="query.reqtransstartdate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间"
                ></el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="query.reqtransenddate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="结束时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-row justify="end" type="flex">
                <el-button type="primary" icon="el-icon-search" size="small" @click="queryFun">查询</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh-left"
                  size="small"
                  @click="refreshFun"
                >重 置</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <div></div>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-download"
          class="handle-del mr10"
          @click="exportExcel"
        >导出Excel</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        show-summary
        :summary-method="getSummaries"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column
          prop="serproname"
          label="商户名称"
          min-width="220"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mchOrderid"
          label="商户订单号"
          min-width="140"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="hoopayOrderid"
          min-width="140"
          :show-overflow-tooltip="true"
          label="系统订单号"
          align="center"
        ></el-table-column>
        <!-- <el-table-column prop="createdate" label="上游订单号" align="center"></el-table-column> -->
        <el-table-column prop="orderamount" label="交易金额" sortable min-width="110" align="center"></el-table-column>
        <el-table-column prop="commission" label="手续费" sortable min-width="100" align="center"></el-table-column>
        <el-table-column label="交易状态" min-width="95" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paystatus | filterOrderStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paytypecode | filterPaytype}}</span>
            <span>{{scope.row.paywaycode | filterGetPayWay}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">开始：{{scope.row.reqtransstartdate}}</span>
            <span class="table-cell-span">结束：{{scope.row.reqtransenddate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="queryOrderByCode(scope.$index, scope.row)"
              v-if="hasPerm('hoopayQueryOrder')"
            >查询</el-button>
            <el-button
              type="primary"
              size="small"
              v-if=" scope.row.paystatus == 'SUCCESS' && hasPerm('hoopayRefundOrder')"
              @click="handleRefund(scope.$index, scope.row)"
            >退款</el-button>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import { timestampToTimeHHMMSS } from "@/util/util.js";
import moment from "moment";
export default {
  name: "orderManage",
  components: {},
  data() {
    return {
      query: {
        querySerprocode: "",
        paytypecode: "",
        paywaycode: "",
        paystatus: "",
        reqtransstartdate: "",
        reqtransenddate: "",
        mchOrderid: "",
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      payTypeWayList: [],
      toSerproList: [],
      statusList: [
        { label: "支付成功", value: "SUCCESS" },
        { label: "转入退款", value: "REFUND" },
        { label: "未支付", value: "NOTPAY" },
        { label: "已关闭", value: "CLOSED" },
        { label: "已冲正", value: "REVERSE" },
        { label: "已撤销", value: "REVOK" },
      ],
      serProList: [],
      tableData: [],
    };
  },
  created() {
    let that = this;
    that.initDate();
    that.loadData();
    that.queryPayTypeAndWay();
    that.querySerProListSelect();
  },

  methods: {
    // 今天是2020年7月27日，工资还是没有发，公司的人连个解释都没有。
    // 后台开发人员全部都提出了离职。
    // 我想我也快了把。
    exportExcel() {
      let that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("vendor/Export2Excel");

        const tHeader = [
          "商户名称",
          "商户订单号",
          "系统订单号",
          "上游订单号",
          "交易金额",
          "支付状态",
          "支付类型",
          "交易开始时间",
          "交易结束时间",
          "手续费",
        ];

        const filterVal = [
          "serproname",
          "mchOrderid",
          "hoopayOrderid",
          "createdate",
          "orderamount",
          "paystatus",
          "paytypecode",
          "reqtransstartdate",
          "reqtransenddate",
          "commission",
        ];
        let tList = this.tableData.filter((element, index, self) => {
          element.paystatus = this.filterOrderStatus(element.paystatus);
          element.paytypecode =
            this.filterPaytype(element.paytypecode) +
            this.filterGetPayWay(element.paywaycode);
          return element;
        });
        console.log(tList);
        const list = tList;
        const data = this.formatJson(filterVal, list);
        console.log(data);
        export_json_to_excel(tHeader, data, "交易流水记录");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (
          column.property === "orderamount" ||
          column.property === "commission"
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "--";
        }
      });

      return sums;
    },
    changePay(arrStr) {
      let that = this;
      that.query.paytypecode = arrStr.split("-")[0];
      that.query.paywaycode = arrStr.split("-")[1];
    },
    queryFun: function () {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    initDate() {
      let that = this;
      let date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      that.query.reqtransstartdate = timestampToTimeHHMMSS(
        new Date(year, month, day)
      );
      that.query.reqtransenddate = timestampToTimeHHMMSS(
        new Date(year, month, day, 23, 59, 59)
      );
    },
    refreshFun: function () {
      let that = this;
      that.query = {
        querySerprocode: "",
        paytypecode: "",
        paywaycode: "",
        paystatus: "",
        reqtransstartdate: "",
        reqtransenddate: "",
        mchOrderid: "",
      };
      that.initDate();
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    loadData() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["querySerprocode"] = that.query.querySerprocode;
      params["paytypecode"] = that.query.paytypecode;
      params["paywaycode"] = that.query.paywaycode;
      params["paystatus"] = that.query.paystatus;
      params["reqtransstartdate"] = that.query.reqtransstartdate;
      params["reqtransenddate"] = that.query.reqtransenddate;
      params["mchOrderid"] = that.query.mchOrderid;
      Server.post(Path.orderQueryOrderList, params, (res) => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    querySerProListSelect() {
      let that = this;
      Server.post(Path.querySerProListSelect, { serviceType: 2 }, (res) => {
        that.toSerproList = res;
      });
    },
    // <!-- 目前只能查银联得订单，其他接口订单海没有配置 -->
    queryOrderByCode(index, row) {
      let that = this;
      var jsonData = {
        mchOrderId: row.mchOrderid,
        hooPayOrderId: row.hoopayOrderid, // 取信宝订单号
        routeOrderId: row.routeOrderid, // 第三方订单号
        serProCode: row.serprocode,
        flag: "1", // 用于判断是内部系统还是外部系统
        sign_type: "", //签名类型
        signature: "", //签名
      };
      Server.postJson(
        Path.hoopayQueryOrder,
        JSON.stringify(jsonData),
        (res) => {
          let { respCode, respMsg, payStatus } = res;
          // console.log(data);s
          if (respCode == "00") {
            switch (payStatus) {
              case "00":
                that.$message.success("支付成功");
                break;
              case "01":
                that.$message.success("转入退款");
                break;
              case "02":
                that.$message.success("交易结果未明");
                break;
              case "03":
                that.$message.success("已关闭");
                break;
              case "04":
                that.$message.success("已撤销（付款码支付）");
                break;
              case "05":
                that.$message.success("用户支付中");
                break;
              case "06":
                that.$message.success("支付失败");
                break;
            }
          } else {
            that.$message.error(respMsg);
          }
          that.loadData();
        }
      );
    },
    queryPayTypeAndWay() {
      let that = this;
      let params = {};
      Server.get(Path.queryPayTypeAndWay, {}, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payTypeWayList = data;
        }
      });
    },
    ran(m) {
      m = m > 13 ? 13 : m;
      var num = new Date().getTime();
      return num.toString().substring(13 - m);
      num.toString().substring(13 - m);
    },
    // 退款操作
    handleRefund(index, row) {
      let that = this;
      if (row.status == 5) {
        that.$message.warning("订单已结算无法发起退款！");
        return;
      }
      var jsonData = {
        mchOrderId: row.mchOrderid,
        hooPayOrderId: row.hoopayOrderid,
        orderAmount: parseInt(row.orderamount * 100),
        refundAmount: parseInt(row.orderamount * 100),
        mchRefundId: that.ran(13),
        serProCode: row.serprocode,
        flag: "1",
      };
      that
        .$confirm("确定要退款吗？点击确定则退款！", "退款", {
          type: "warning",
        })
        .then(() => {
          Server.postJson(
            Path.hoopayRefundOrder,
            JSON.stringify(jsonData),
            (res) => {
              let { respMsg, respCode } = res;
              if (respCode == "00") {
                that.loadData();
                that.$message.success("退款成功");
              } else {
                that.$message.warning(respMsg);
              }
            }
          );
        })
        .catch(() => {});
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
    },
    filterPaytype(paytypecode) {
      switch (paytypecode) {
        case "01":
          return "微信-";
        case "02":
          return "支付宝-";
        case "03":
          return "银联-";
        case "04":
          return "百度-";
        case "05":
          return "京东-";
        case "06":
          return "QQ钱包-";
        default:
          return "暂无-";
      }
    },
    filterGetPayWay(payWayCode) {
      switch (payWayCode) {
        case "AP":
          return "APP支付";
        case "DF":
          return "代付";
        case "FK":
          return "付款码支付";
        case "FW":
          return "服务窗支付";
        case "GZ":
          return "公众号支付";
        case "H5":
          return "H5支付";
        case "KJ":
          return "快捷支付";
        case "SM":
          return "扫码支付";
        case "WG":
          return "网关支付";
        default:
          return "支付方式未知";
      }
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
  },
  filters: {
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
    },
    filterPaytype(paytypecode) {
      switch (paytypecode) {
        case "01":
          return "微信-";
        case "02":
          return "支付宝-";
        case "03":
          return "银联-";
        case "04":
          return "百度-";
        case "05":
          return "京东-";
        case "06":
          return "QQ钱包-";
        default:
          return "暂无-";
      }
    },
    filterGetPayWay(payWayCode) {
      switch (payWayCode) {
        case "AP":
          return "APP支付";
        case "DF":
          return "代付";
        case "FK":
          return "付款码支付";
        case "FW":
          return "服务窗支付";
        case "GZ":
          return "公众号支付";
        case "H5":
          return "H5支付";
        case "KJ":
          return "快捷支付";
        case "SM":
          return "扫码支付";
        case "WG":
          return "网关支付";
        default:
          return "支付方式未知";
      }
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
.el-date-editor--daterange {
  width: 100%;
}

/deep/ .el-range-separator {
  width: 24px !important;
}
</style>
