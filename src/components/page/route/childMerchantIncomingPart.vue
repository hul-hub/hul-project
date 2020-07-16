<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="94px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属服务商:" class="shanchu">
                <el-select
                  v-model="query.serProCode"
                  @change="changeSerpro"
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
            <el-col :span="6">
              <el-form-item label="子商户名称:" class="shanchu">
                <el-select
                  v-model="query.subAccountId"
                  @change="changeSub"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in childSerproList"
                    :key="index"
                    :label="item.subAccountName"
                    :value="item.subAccountId"
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
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        :empty-text="emptyText"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column
          prop="serproname"
          label="商户名称"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="routename"
          label="通道名称"
          min-width="150"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column prop="createdate" label="创建日期" min-width="100" align="center"></el-table-column>
        <el-table-column label="费率类型" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.hasmorefeerate==1?"多费率":"单费率"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="feeratedown" label="下游费率" align="center" width="100"></el-table-column>
        <el-table-column label="激活状态" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.routeStatus==0?"未激活":(scope.row.routeStatus==2?"激活失败":"已激活")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleInpart(scope.$index, scope.row)">进件</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleResultSearch(scope.$index, scope.row)"
            >进件结果查询</el-button>
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
    <template></template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "childMerchantIncomingPart",
  components: {},
  data() {
    return {
      toSerproList: [],
      childSerproList: [],
      query: {
        serProCode: "",
        subAccountId: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      checkVisable: false,
      emptyText: "",
      tableData: [],
      outMerchantId: "" // 商户进件查询参数
    };
  },
  created() {
    let that = this;
    that.querySerProListByCode();
    that.loadData();
  },
  methods: {
    changeSub(val) {
      let that = this;
      let arr = that.childSerproList.filter(function(element, index, self) {
        return element.subAccountId == val;
      });
      that.outMerchantId = arr[0].outMerchantId;
      that.loadData();
      console.log(that.outMerchantId);
    },
    changeSerpro(val) {
      let that = this;
      that.query.subAccountId = "";
      let params = {};
      params["serProCode"] = val;
      Server.post(Path.listSubSerpro, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.childSerproList = data;
        }
      });
    },
    querySerProListByCode() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = 2;
      Server.post(Path.querySerProByIsSubAccountList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
    },
    handleResultSearch(index, row) {
      let that = this;
      Server.post(
        Path.queryPush,
        {
          mchId: that.outMerchantId
        },
        res => {
          let { code, data, msg } = res;
          var message;
          if (code == 200) {
            that.subrelationUpdate(
              row.routecode,
              row.serprocode,
              data.examineStatus
            );
          } else {
            message = "查询失败！";
          }
          that.$message.warning(message);
        }
      );
    },
    subrelationUpdate(routecode, serprocode, status) {
      let that = this;
      Server.post(
        Path.subrelationUpdate,
        {
          routecode: routecode,
          serprocode: serprocode,
          activestatus: status
        },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.loadData();
          } else {
            that.$message.warning(msg);
          }
        }
      );
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
        serProCode: "",
        subAccountId: ""
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
      params["serprocode"] = that.query.serProCode;
      params["subAccountId"] = that.query.subAccountId;
      Server.post(Path.queryPayWayBySubSerPro, params, res => {
        let { code, data, msg, count } = res;
        console.log(code);
        if (code == 200) {
          that.tableData = data;
          if (that.tableData.length == 0) {
            that.emptyText = "暂无数据";
          }
          that.pageInfo.total = count;
        } else {
          that.emptyText = "请输入查询条件";
          that.tableData = [];
        }
      });
    },
    // 开启
    handleInpart(index, row) {
      let that = this;
      Server.post(Path.queryPayWayByCode, { routecode: row.routecode }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          console.log(data.templatename);
          if (data.templatename == "UnionPay") {
            that.sendRouteAudit(row);
          }
        }
      });
    },
    sendRouteAudit(row) {
      console.log(row);
      let that = this;
      Server.post(
        Path.push,
        {
          routeId: row.routeId,
          serProCode: row.serprocode,
          subId: row.subAccoutId
        },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success(msg);
          } else {
            that.$message.warning(msg);
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
.shanchu > /deep/ .el-form-item__label::before {
  content: "*";
  color: red;
}
</style>
