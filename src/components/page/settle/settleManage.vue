<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="90px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属服务商:">
                <el-select v-model="query.upserprocode" placeholder="请选择" style="width:100%">
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
              <el-form-item label="结算状态:">
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
            <el-col :span="12">
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
          icon="el-icon-money"
          class="handle-del mr10"
          @click="batchSettle"
        >批量结算</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :selectable="checkSelectable" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column
          prop="upSerProName"
          label="所属服务商"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="settleid"
          label="结算单号"
          min-width="160"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operatedate"
          label="创建日期"
          :show-overflow-tooltip="true"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column prop="framount" label="金额" min-width="80" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" min-width="140" align="center"></el-table-column>
        <el-table-column label="状态" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status | filterStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 9"
              type="primary"
              size="small"
              @click="closeSettle(scope.$index, scope.row)"
            >作废</el-button>
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
  name: "settleManage",
  components: {},
  data() {
    return {
      query: {
        upserprocode: "",
        status: ""
      },
      statusList: [
        { label: "未结算", value: "9" },
        { label: "已结算", value: "1" },
        { label: "结算中", value: "2" },
        { label: "已作废", value: "3" }
      ],
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      toSerproList: [],
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },

  methods: {
    checkSelectable(row, index) {
      let flag = true;
      if (row.status != 9) {
        flag = false;
      }
      return flag;
    },
    // 多选操作
    handleSelectionChange(val) {
      let that = this;
      that.multipleSelection = [];
      for (let item of val) {
        that.multipleSelection.push(item.settleid);
      }
      console.log(that.multipleSelection);
    },
    batchSettle() {
      let that = this;
      if (that.multipleSelection.length == 0) {
        that.$message.warning("至少选择一条数据！");
        return;
      }
      console.log(JSON.stringify(that.multipleSelection));
      that
        .$confirm(
          "确定要结算选择的" +
            that.multipleSelection.length +
            "条数据吗？点击确定则结算所选数据！",
          "批量结算",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.postJson(
            Path.createSpacc,
            JSON.stringify(that.multipleSelection),
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("结算成功");
              } else {
                that.$message.warning(msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    closeSettle(index, row) {
      let that = this;
      that
        .$confirm("确定要作废该数据吗？点击确定则作废该数据！", "作废", {
          type: "warning"
        })
        .then(() => {
          Server.post(
            Path.closehoopayOrderid,
            { settleid: row.settleid },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("作废成功");
              } else {
                that.$message.warning(msg);
              }
            }
          );
        })
        .catch(() => {});
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
        upserprocode: ""
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
      params["status"] = that.query.status;
      params["upserprocode"] = that.query.upserprocode;
      Server.post(Path.querySettleList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    querySerProListByCode() {
      let that = this;
      Server.post(
        Path.querySerProListByCode,
        { token: localStorage.getItem("tokenData"), serviceType: "" },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.toSerproList = data;
          }
        }
      );
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
    filterStatus(val) {
      let status = "";
      switch (val) {
        case "9":
          status = "未结算";
          break;
        case "1":
          status = "已结算";
          break;
        case "2":
          status = "结算中";
          break;
        case "3":
          status = "已作废";
          break;
      }
      return status;
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
</style>
