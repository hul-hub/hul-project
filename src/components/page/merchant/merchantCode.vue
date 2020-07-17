<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="74px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="商户ID:">
                <el-input v-model="query.serprocode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="query.serproname"></el-input>
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
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="serprocode" label="商户编码" min-width="120" align="center"></el-table-column>
        <el-table-column prop="serproname" label="商户名称" min-width="180" align="center"></el-table-column>
        <el-table-column prop="routeSecretKey" label="商户密钥" min-width="150" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="refreshSecretkey(scope.$index, scope.row)"
              v-if="hasPerm('serpro_resetting')"
            >重置密钥</el-button>
            <el-button
              type="primary"
              size="small"
              @click="detailFun(scope.$index, scope.row)"
              v-if="hasPerm('key_info')"
            >详情</el-button>
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
  name: "merchantCode",
  components: {},
  data() {
    return {
      query: {
        serprocode: "",
        serproname: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
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
        serprocode: "",
        serproname: ""
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
      params["serviceType"] = 2;
      params["serprocode"] = that.query.serprocode;
      params["serproname"] = that.query.serproname;
      Server.post(Path.serproTemplate, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    // 详情页
    detailFun(index, row) {
      let that = this;
      console.log(row.serprocode);
      that.$router.push({
        path: "/merchantCodeDetail?from=merchantCode",
        query: {
          id: row.serprocode
        }
      });
    },
    refreshSecretkey(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要重置商户密钥吗？点击确定则重置该商户密钥！",
          "重置密钥",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(
            Path.generateMerchantKey,
            { serProCode: row.serprocode },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("重置密钥成功!");
              } else {
                that.$message.success(msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      console.log(row);
      let that = this;
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
