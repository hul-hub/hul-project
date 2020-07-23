<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="80px" label-position="left" size="small">
          <el-row :gutter="36" type="flex">
            <el-col :span="6" style="margin: auto;">
              <el-form-item label="所属商户:" class="query-form-item">
                <!-- <el-input v-model="query.serProCode"></el-input> -->
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
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="serProName" label="商户名称" align="center"></el-table-column>
        <el-table-column prop="apiName" label="接口名称" align="center"></el-table-column>
        <el-table-column prop="price" label="单价(厘)" align="center"></el-table-column>
        <el-table-column prop="operatetime" label="调用时间" align="center"></el-table-column>
        <el-table-column prop="rescontent" label="返回内容" align="center"></el-table-column>
        <el-table-column prop="status" label="调用结果" align="center"></el-table-column>
        <el-table-column prop="statusdec" label="调用结果描述" align="center"></el-table-column>
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
  name: "interfaceRecord",
  data() {
    return {
      tableData: [],
      toSerproList: [],
      query: {
        serProCode: "",
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  methods: {
    querySerProListByCode() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = 2;
      Server.post(Path.querySerProListByCode, params, (res) => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
    },
    loadData() {
      let that = this;
      let params = {};
      params["pageNum"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["serprocode"] = that.query.serProCode;
      Server.post(Path.queryUsedRecord, params, (res) => {
        let { code, data, msg, total } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = total;
        }
      });
    },
    refreshFun: function () {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.query.serProCode = "";
      that.loadData();
    },
    queryFun: function () {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    // 分页导航
    handlePageChange(val) {
      let that = this;
      // that.$set(that.pageInfo, "pageIndex", 1);
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
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
</style>
