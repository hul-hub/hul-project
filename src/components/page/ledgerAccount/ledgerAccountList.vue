<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="90px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :xs="12" :sm="12" :md="12" :lg="5">
              <el-form-item label="商户名称:" >
                <el-select v-model="query.querySerprocode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in serProList"
                    :key="index"
                    :label="item.serproname"
                    :value="item.serprocode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="5">
              <el-form-item label="分账状态:">
                <el-select v-model="query.status" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="14">
              <el-form-item label="交易时间:">
                <el-date-picker
                  v-model="query.reqtransstartdate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="开始时间"
                ></el-date-picker>
                <span>-</span>
                <el-date-picker
                  v-model="query.reqtransenddate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="结束时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row justify="end" type="flex">
            <el-button type="primary" icon="el-icon-search" size="small" @click="queryFun">查询</el-button>
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
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="serproname"
          label="商户名称"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商户订单号"
          prop="mchOrderid"
          :show-overflow-tooltip="true"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          label="系统订单号"
          prop="hoopayOrderid"
          :show-overflow-tooltip="true"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column prop="orderamount" label="交易金额" min-width="95" align="center"></el-table-column>
        <el-table-column prop="commission" label="手续费" align="center"></el-table-column>
        <!-- <el-table-column label="是否分账" min-width="95" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profitSharing == 'Y'?"是":"否"}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="分账状态" min-width="95" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.fzstatus | filterFzStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分账时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">开始：{{scope.row.fzreqtransstartdate}}</span>
            <span class="table-cell-span">结束：{{scope.row.fzreqtransenddate}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="交易状态" min-width="95" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paystatus | filterOrderStatus}}</span>
          </template>
        </el-table-column>-->
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
            <el-button type="primary" size="small" @click="handleQuery(scope.$index, scope.row)" v-if="hasPerm('querySubOrder')">查询</el-button>
            <el-button type="primary" size="small" @click="handleDetail(scope.$index, scope.row)" v-if="hasPerm('getSubAccountOrderDetails')">详情</el-button>
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
export default {
  name: "ledgerAccountList",
  components: {},
  data() {
    return {
      query: {
        querySerprocode: "",
        reqtransstartdate: "",
        reqtransenddate: "",
        status: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      statusList: [
        { label: "受理成功", value: "ACCEPTED" },
        { label: "处理中", value: "PROCESSING" },
        { label: "处理完成", value: "FINISHED" },
        { label: "已回退", value: "REFUND" },
        { label: "处理失败", value: "CLOSED" }
      ],
      serProList: [],
      editVisible: false,
      detailVisible: false
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.loadSerproList();
  },
  methods: {
    handleQuery(index, row) {
      console.log(row);
      let that = this;
      let params = {};
      params["serProCode"] = row.serprocode;
      params["hoopayFzOrderId"] = row.hoopayFzOrderid;
      params["sign_type"] = "WITHOUT";
      Server.post(Path.querySubOrder, params, res => {
        let { respCode, status, respMsg } = res;
        // ACCEPTED—受理成功 ，PROCESSING—处理中 ，FINISHED—处理完成，CLOSED—处理失败，已关单
        if (respCode == "200") {
          switch (status) {
            case "ACCEPTED":
              that.$message.success("受理成功");
              break;
            case "PROCESSING":
              that.$message.success("处理中");
              break;
            case "FINISHED":
              that.$message.success("处理完成");
              break;
            case "CLOSED":
              that.$message.success("处理失败，已关单");
              break;
          }
          that.loadData();
        } else {
          that.$message.error(respMsg);
        }
      });
    },
    handleDetail(index, row) {
      let that = this;
      that.$router.push({
        path: "/ledgerAccountDetail?from=ledgerAccountList",
        query: {
          id: row.hoopayOrderid,
          serprocode: row.serprocode,
          serproname: row.serproname,
          orderamount: row.orderamount,
          hoopay_fz_orderid: row.hoopay_fz_orderid,
          goodsname: row.goodsname
        }
      });
    },
    reseItem() {
      let that = this;
    },
    queryFun: function() {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    refreshFun: function() {
      let that = this;
      that.query = {
        serprocode: "",
        type: "",
        account: ""
      };
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
      params["reqtransstartdate"] = that.query.reqtransstartdate;
      params["reqtransenddate"] = that.query.reqtransenddate;
      params["status"] = that.query.status;
      Server.post(Path.getOrderFzListByPage, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    loadSerproList() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = "";
      Server.post(Path.querySerProListByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          let arr = [];
          for (let item of data) {
            let serPro = {};
            serPro["serprocode"] = item.serprocode;
            serPro["serproname"] = item.serproname;
            arr.push(serPro);
          }
          that.serProList = arr;
        }
      });
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
    }
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
        case "CLOSED":
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
    filterFzStatus(val) {
      let fzStatus = "";
      switch (val) {
        case "ACCEPTED":
          fzStatus = "受理成功";
          break;
        case "PROCESSING":
          fzStatus = "处理中";
          break;
        case "FINISHED":
          fzStatus = "处理完成";
          break;
        case "REFUND":
          fzStatus = "已回退";
          break;
        case "CLOSED":
          fzStatus = "处理失败";
          break;
      }
      return fzStatus;
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
.el-date-editor--daterange {
  width: 100%;
}
.error-div {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
