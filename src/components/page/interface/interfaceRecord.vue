<template>
  <div>
    <div class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
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
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    let that = this;
    that.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      let params = {};
      params['pageNum'] = that.pageInfo.pageIndex;
      params['limit'] = that.pageInfo.pageSize;
      params['serprocode'] = "5922218727791888";
      Server.post(Path.queryUsedRecord, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableData = data;
        }
      });
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
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
</style>
