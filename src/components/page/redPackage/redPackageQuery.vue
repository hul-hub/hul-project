<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="90px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="红包订单号:" class="query-form-item">
                <el-input v-model="query.hoopayHbOrderid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="红包类型:" class="query-form-item">
                <el-select v-model="query.hbType" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in hbTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="红包状态:" class="query-form-item">
                <el-select v-model="query.hbstatus" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in hbstatusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
                >重置</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        :lazy="true"
        ref="multipleTable"
        header-cell-class-name="table-header"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <!-- type="expand" 需要slot-scope="props",否则数据无法渲染 -->
          <template slot-scope="props">
            <el-table :data="childTableData" border style="width: 100%">
              <el-table-column prop="openid" label="领取红包用户openid"></el-table-column>
              <el-table-column prop="amount" label="领取金额"></el-table-column>
              <el-table-column prop="rcvTime" label="领取时间"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="sendName" label="商户名称" align="center"></el-table-column>
        <el-table-column prop="hoopayHbOrderid" label="红包订单号" align="center"></el-table-column>
        <el-table-column prop="orderamount " label="红包金额" align="center"></el-table-column>
        <el-table-column prop="totalNum" label="发放总人数" align="center"></el-table-column>
        <el-table-column prop="wishing" label="祝福语" align="center"></el-table-column>
        <el-table-column label="红包类型" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.hbType | filterhbType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="红包状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.hbstatus | filterhbStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="sendTime" min-width="100" label="发放时间" align="center"></el-table-column>
        <!-- <el-table-column label="交易时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">开始：{{scope.row.reqtransstartdate}}</span>
            <span class="table-cell-span">结束：{{scope.row.reqtransenddate}}</span>
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
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "redPackageQuery",
  data() {
    return {
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      query: {
        hbType: "",
        hbstatus: "",
        hoopayHbOrderid: ""
        // templatecode:"",
      },
      hbTypeList: [
        { label: "裂变红包", value: "GROUP" },
        { label: "普通红包", value: "NORMAL" }
      ],
      hbstatusList: [
        { label: "发放中", value: "SENDING" },
        { label: "已发放待领取", value: "SENT" },
        { label: "发放失败", value: "FAILED" },
        { label: "已领取", value: "RECEIVED" },
        { label: "退款中", value: "RFUND_ING" },
        { label: "已退款", value: "REFUND" }
      ],
      tableData: [],
      childTableData: [],
      expands: [],
      getRowKeys(row) {
        return row.hoopayHbOrderid;
      }
    };
  },
  created() {
    let that = this;
    that.loadData();
  },
  methods: {
    // 查看指派评估详情
    expandChange(row) {
      let temp = this.expands;
      this.expands = [];
      this.expands.push(row.hoopayHbOrderid);
      if (temp.length === 1 && temp[0] === row.hoopayHbOrderid) {
        console.log(temp);
        // 收起展开行
        this.expands = [];
      } else {
        Server.postJson(
          Path.queryOrderHbDetailList,
          { hoopayHbOrderid: row.hoopayHbOrderid },
          res => {
            let { code, data, msg } = res;
            if (code == 200) {
              this.childTableData = data;
              console.log(this.childTableData);
            }
          }
        );
      }
    },
    loadData() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["hoopayHbOrderid"] = that.query.hoopayHbOrderid;
      params["hbType"] = that.query.hbType;
      params["hbstatus"] = that.query.hbstatus;
      Server.postJson(Path.queryRedpacketList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
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
        hbType: "",
        hbstatus: "",
        hoopayHbOrderid: ""
        // templatecode:"",
      };
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    }
  },
  filters: {
    filterhbType(val) {
      let hbType = "";
      switch (val) {
        case "GROUP":
          hbType = "裂变红包";
          break;
        case "NORMAL":
          hbType = "普通红包";
          break;
      }
      return hbType;
    },
    filterhbStatus(val) {
      let hbstatus = "";
      switch (val) {
        case "SENDING":
          hbstatus = "发放中";
          break;
        case "SENT":
          hbstatus = "已发放待领取";
          break;
        case "FAILED":
          hbstatus = "发放失败";
          break;
        case "RECEIVED":
          hbstatus = "已领取";
          break;
        case "RFUND_ING":
          hbstatus = "退款中";
          break;
        case "REFUND":
          hbstatus = "已退款";
          break;
      }
      return hbstatus;
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
</style>
