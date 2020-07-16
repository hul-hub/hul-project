<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="75px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :xs="12" :sm="12" :md="12" :lg="5">
              <el-form-item label="所属商户:">
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
            <el-col :xs="12" :sm="12" :md="12" :lg="5">
              <el-form-item label="交易类型:">
                <el-select v-model="query.iscollect" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in iscollectList"
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
                <el-date-picker v-model="query.reqtransenddate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="结束时间"></el-date-picker>
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
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column
          prop="serprocode"
          label="商户号"
          min-width="160"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="serproname"
          label="商户名称"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column prop="collectnumber" label="汇总金额" min-width="95" align="center"></el-table-column>
        <el-table-column prop="collectsum" label="汇总笔数" min-width="95" align="center"></el-table-column>
        <el-table-column label="微信" min-width="120" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">交易金额：{{scope.row.collectwxnumber}}</span>
            <span class="table-cell-span">交易笔数：{{scope.row.collectwxsum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付宝" min-width="120" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">交易金额：{{scope.row.collectzfbnumber}}</span>
            <span class="table-cell-span">交易笔数：{{scope.row.collectzfbsum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="银联" min-width="120" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">交易金额：{{scope.row.collectylnumber}}</span>
            <span class="table-cell-span">交易笔数：{{scope.row.collectylsum}}</span>
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
export default {
  name: "orderCollect",
  components: {},
  data() {
    return {
      query: {
        serprocode: "",
        iscollect: "0",
        reqtransDate: [],
        reqtransstartdate: "",
        reqtransenddate: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      payTypeWayList: [],
      toSerproList: [],
      iscollectList: [
        { label: "穿透查询", value: "1" },
        { label: "非穿透查询", value: "0" }
      ],
      serProList: [],
      tableData: []
    };
  },
  created() {
    let that = this;
    that.initDate();
    that.loadData();
    that.querySerProList();
  },

  methods: {
    changePay(arrStr) {
      let that = this;
      that.query.paytypecode = arrStr.split("-")[0];
      that.query.paywaycode = arrStr.split("-")[1];
    },
    queryFun: function() {
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
    refreshFun: function() {
      let that = this;
      that.query = {
        serprocode: "",
        iscollect: "0",
        reqtransstartdate: "",
        reqtransenddate: ""
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
      params["serprocode"] = that.query.serprocode;
      params["iscollect"] = that.query.iscollect;
      params["reqtransstartdate"] = that.query.reqtransstartdate;
      params["reqtransenddate"] = that.query.reqtransenddate;

      Server.post(Path.queryOrderCollect, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    querySerProList() {
      let that = this;
      Server.post(Path.querySerProListSelect, { serviceType: 2 }, res => {
        that.toSerproList = res;
        // let { code, data, msg } = res;
        // if (code == 200) {

        // }
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

/deep/ .el-range-separator {
  width: 24px !important;
}
.table-cell-span {
  display: inline-block;
  width: 100%;
  text-align: left;
}
</style>
