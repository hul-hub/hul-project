<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="94px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属商户:" class="query-form-item">
                <el-select
                  v-model="query.serProCode"
                  @change="loadData"
                  placeholder="请选择"
                  style="width:100%"
                >
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
          icon="el-icon-circle-plus-outline"
          class="handle-del mr10"
          @click="editVisible = true"
        >新增</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        :empty-text="emptyText"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="subAccountId" label="子账号ID" min-width="150" align="center"></el-table-column>
        <el-table-column prop="subAccountName" label="子账号名称" min-width="180" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.accountStatus==1?"已开启":"已关闭"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-if="scope.row.accountStatus == 1"
              @click="handleClose(scope.$index, scope.row)"
            >关闭</el-button>
            <el-button
              type="primary"
              size="small"
              v-else
              @click="handleOpen(scope.$index, scope.row)"
            >开启</el-button>
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
      <Modal v-model="editVisible" :closable="false" :mask-closable="false" title="新增子商户">
        <el-form ref="subMerchantItem" :model="subMerchantItem" :rules="rules" label-width="110px">
          <el-form-item label="商户编码：" prop="serprocode">
            <el-input v-model="subMerchantItem.serprocode"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="next">下一步</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "childMerchant",
  components: {},
  data() {
    return {
      query: {
        serProCode: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      emptyText: "",
      subMerchantItem: {
        serprocode: ""
      },
      editVisible: false,
      rules: {
        serprocode: [
          { required: true, message: "请输入商户编号", trigger: "blur" }
        ]
      },
      toSerproList: [],
      statusList: [
        { label: "已通过", value: "1" },
        { label: "已拒绝", value: "2" },
        { label: "待审核", value: "4" },
        { label: "已关闭", value: "5" },
        { label: "已变更", value: "6" },
        { label: "新增", value: "9" }
      ],
      detailVisible: false
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  // 添加keep-alive后会增加两个生命周期mounted>activated
  activated() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  methods: {
    queryFun: function() {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    refreshFun: function() {
      let that = this;
      that.query = {
        serProCode: ""
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
      params["serProCode"] = that.query.serProCode;
      Server.post(Path.listSubSerpro, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          if (that.tableData.length == 0 && !that.query.serProCode) {
            that.emptyText = "请选择所属商户！";
          }
          that.pageInfo.total = count;
        }
      });
    },
    querySerProListByCode() {
      let that = this;
      let params = {};
      Server.post(Path.querySerProByIsSubAccountList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.subMerchantItem = {
        serprocode: ""
      };
      that.$refs.subMerchantItem.resetFields();
    },
    next() {
      let that = this;
      let params = {};
      params["serProCode"] = that.subMerchantItem.serprocode;
      that.$refs.subMerchantItem.validate(valid => {
        if (valid) {
          Server.post(Path.querySerProByCode, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisible = false;

              that.$router.push({
                path: "/childMerchantAdd?from=childMerchant",
                query: {
                  id: that.subMerchantItem.serprocode
                }
              });
              that.subMerchantItem.serprocode = "";
            } else {
              that.$message.warning("商户编号不存在！");
            }
          });
        }
      });
    },
    // 开启
    handleOpen(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要开启该子商户吗？点击确定则开启该子商户！",
          "开启子商户",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(
            Path.updateSubAccountStatusBuId,
            { subId: row.id + "", status: "1" },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("子商户开启成功!");
              }
            }
          );
        })
        .catch(() => {});
    },
    // 关闭
    handleClose(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要关闭该子商户吗？点击确定则关闭该子商户！",
          "关闭子商户",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(
            Path.updateSubAccountStatusBuId,
            { subId: row.id + "", status: "0" },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("子商户关闭成功!");
              }
            }
          );
        })
        .catch(() => {});
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
/* .el-range-editor--small .el-range-separator {
  width: 24px !important;
} */
</style>
