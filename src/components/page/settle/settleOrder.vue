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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column
          prop="upserproname"
          label="所属服务商"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="serproname"
          label="商户名称"
          min-width="160"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column prop="orderamount" label="交易金额" min-width="95" align="center"></el-table-column>
        <el-table-column prop="feerate" label="商户费率" min-width="95" align="center"></el-table-column>
        <el-table-column prop="feeratedown" label="服务商费率" min-width="110" align="center"></el-table-column>
        <el-table-column prop="framount" label="分润金额" min-width="95" align="center"></el-table-column>
        <el-table-column prop="endframount" label="最终分润金额" min-width="120" align="center"></el-table-column>
        <el-table-column prop="flag1" label="备注" min-width="120" align="center"></el-table-column>
        <el-table-column label="交易结果" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status == 5?"已结算":"未结算"}}</span>
          </template>
        </el-table-column>
        <!-- fixed="right" 最后一行按钮显示不全 -->
        <el-table-column label="操作" min-width="120" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editFlag1(scope.$index, scope.row)">编辑备注</el-button>
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
    <template>
      <!-- 新增编辑 -->
      <Modal v-model="editVisible" :closable="false" :mask-closable="false" title="编辑备注">
        <el-form ref="remarkItem" :model="remarkItem" label-width="110px">
          <el-form-item label="备注：" prop="flag1">
            <el-input v-model="remarkItem.flag1" maxlength="50"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "settleOrder",
  components: {},
  data() {
    return {
      query: {
        upserprocode: ""
      },
      editVisible: false,
      remarkItem: {
        flag1: "",
        hoopayOrderid: ""
      },
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
    // 多选操作
    handleSelectionChange(val) {
      let that = this;
      that.multipleSelection = [];
      for (let item of val) {
        that.multipleSelection.push(item.hoopayOrderid);
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
            Path.createSettle,
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
    editFlag1(index, row) {
      let that = this;
      that.remarkItem.flag1 = row.flag1;
      that.remarkItem.hoopayOrderid = row.hoopayOrderid;
      that.editVisible = true;
    },
    saveEdit() {
      let that = this;
      let params = {};
      params["hoopayOrderid"] = that.remarkItem.hoopayOrderid;
      params["flag1"] = that.remarkItem.flag1;
      Server.post(Path.updateEndframount, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.editVisible = false;
          that.loadData();
          that.$message.success("操作成功!");
        } else {
          that.$message.warning(msg);
        }
      });
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
      params["paystatus"] = "SUCCESS";
      params["upserprocode"] = that.query.upserprocode;
      Server.post(Path.queryOrderList, params, res => {
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
        { token: localStorage.getItem("tokenData"), serviceType: "1" },
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
