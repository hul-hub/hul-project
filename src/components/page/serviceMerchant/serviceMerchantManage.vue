<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="94px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属服务商:">
                <el-select v-model="query.upSerProName" placeholder="请选择" style="width:100%">
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
              <el-form-item label="服务商名称:">
                <el-input v-model="query.serProName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="负责人:">
                <el-input v-model="query.contactsname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号码:">
                <el-input v-model="query.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36">
            <el-col :span="6">
              <el-form-item label="审核状态:" class="query-form-item">
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
          @click="addFun"
          v-if="hasPerm('service_add')"
        >新增</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="serprocode" label="服务商编码" min-width="150" align="center"></el-table-column>
        <el-table-column prop="serproname" label="服务商名称" min-width="180" align="center"></el-table-column>
        <el-table-column prop="upserproname" label="所属服务商" min-width="150" align="center"></el-table-column>
        <el-table-column prop="contactsname" label="负责人" align="center"></el-table-column>
        <el-table-column
          prop="mobile"
          :show-overflow-tooltip="true"
          min-width="80"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createdate"
          label="创建日期"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status | filterStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small"  v-if="hasPerm('service_edit')" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
  name: "serviceMerchantManage",
  components: {},
  data() {
    return {
      query: {
        serviceType: 1,
        upSerProName: "",
        serProName: "",
        contactsname: "",
        mobile: "",
        status: ""
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
      ]
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  activated() {
    let that = this;
    that.loadData();
  },
  methods: {
    addFun() {
      let that = this;
      that.$router.push({
        path: "/serviceMerchantAdd?from=serviceMerchantManage",
        query: {}
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
        serviceType: 1,
        upSerProName: "",
        serProName: "",
        contactsname: "",
        mobile: "",
        status: ""
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
      params["serviceType"] = that.query.serviceType;
      params["upSerProName"] = that.query.upSerProName;
      params["serProName"] = that.query.serProName;
      params["contactsname"] = that.query.contactsname;
      params["mobile"] = that.query.mobile;
      params["status"] = that.query.status;
      Server.post(Path.querySerProList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    querySerProListByCode() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = 1;
      Server.post(Path.querySerProListByCode, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
    },
    // 编辑操作
    handleEdit(index, row) {
      let that = this;
      that.$router.push({
        path: "/serviceMerchantAdd?from=serviceMerchantManage",
        query: {
          id: row.serprocode
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
    //scope.row.status==1?"已通过":(scope.row.status==2?"已拒绝"
    //:(scope.row.status==4?"待审核":(scope.row.status==5?"已关闭":(
    //Fscope.row.status==6?"已变更":"新增"))))
    filterStatus(val) {
      let type = parseInt(val);
      let status = "";
      switch (type) {
        case 1:
          status = "已通过";
          break;
        case 2:
          status = "已拒绝";
          break;
        case 4:
          status = "待审核";
          break;
        case 5:
          status = "已关闭";
          break;
        case 6:
          status = "已变更";
          break;
        default:
          status = "新增";
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
/* .el-range-editor--small .el-range-separator {
  width: 24px !important;
} */
</style>
