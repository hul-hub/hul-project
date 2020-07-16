<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="78px" ref="query" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="商户编码:" class="shanchu">
                <el-input v-model="query.currentSerProCode"></el-input>
                <!-- <el-select v-model="query.currentSerProCode" placeholder="请选择" filterable style="width:100%">
                  <el-option
                    v-for="(item,index) in serproList"
                    :key="index"
                    :label="item.serproname"
                    :value="item.serprocode"
                  ></el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付类型:">
                <el-select v-model="query.paywaycode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in payWayList"
                    :key="index"
                    :label="item.paywayname"
                    :value="item.paywaycode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付方式:">
                <el-select v-model="query.paytypecode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in payTypeList"
                    :key="index"
                    :label="item.paytypename"
                    :value="item.paytypecode"
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
      <el-table :data="tableData" :empty-text="emptyText" border class="table" ref="multipleTable">
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column
          prop="routename"
          label="通道名称"
          min-width="150"
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
        <el-table-column prop="createdate" label="创建日期" min-width="100" align="center"></el-table-column>
        <el-table-column label="费率类型" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.hasmorefeerate==1?"多费率":"单费率"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="feeratedown" label="下游费率" align="center" width="100"></el-table-column>
        <el-table-column label="审核状态" align="center" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.verifystatus==1?"待审核":(scope.row.verifystatus==2?"审核通过":(scope.row.verifystatus==3?"审核拒绝":(scope.row.verifystatus==4?"关闭":(scope.row.verifystatus==4?"变更":"提交中"))))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="激活状态" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.activestatus==1?"已报件":(scope.row.activestatus==2?"已激活":(scope.row.activestatus==3?"激活失败":(scope.row.activestatus==4?"已冻结":"待报件(新增)")))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="默认通道" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.defaultvalue"
              active-value="1"
              inactive-value="0"
              :disabled="scope.row.defaultvalue == 1"
              @change="changeDefaultValue(scope.$index, scope.row)"
            ></el-switch>
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
  name: "defaultRoute",
  components: {},
  data() {
    return {
      query: {
        paywaycode: "",
        currentSerProCode: "",
        paytypecode: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      emptyText: "",
      tableData: [],
      payWayList: [],
      payTypeList: [],
      serproList: []
    };
  },
  created() {
    let that = this;
    that.loadPayType();
    that.loadPayWay();
    that.loadData();
    // that.loadSerpro();
  },
  methods: {
    changeDefaultValue(index, row) {
      let that = this;
      Server.post(
        Path.setDefaultRoute,
        {
          routecode: row.routecode,
          serprocode: row.serprocode,
          paywaycode: row.paywaycode,
          templatecode: row.templatecode,
          payType: row.payType
        },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.loadData();
            that.$message.success("默认通道配置成功!");
          } else {
            that.$message.warning(msg);
          }
        }
      );
    },
    queryFun: function() {
      let that = this;
      if (!that.query.currentSerProCode) {
        that.$message.warning("商户编码不能为空！");
        return;
      }
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    refreshFun: function() {
      let that = this;
      that.query = {
        paywaycode: "",
        currentSerProCode: "",
        paytypecode: ""
      };
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    loadSerpro() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 999;
      Server.post(Path.querySerProList, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.serproList = data;
        }
      });
    },
    loadPayType() {
      let that = this;
      let params = {};
      Server.get(Path.queryBasePayType, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payTypeList = data;
        }
      });
    },
    loadPayWay() {
      let that = this;
      let params = {};
      Server.get(Path.queryAllBasePayWay, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payWayList = data;
        }
      });
    },
    loadData() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["currentSerProCode"] = that.query.currentSerProCode;
      params["paywaycode"] = that.query.paywaycode;
      params["paytypecode"] = that.query.paytypecode;
      Server.post(Path.queryRouteList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          if (that.tableData.length == 0 && !that.query.currentSerProCode) {
            that.emptyText = "请输入商户编码";
          } else if (that.tableData.length == 0) {
            that.emptyText = "暂无符合条件得数据！";
          }
          that.pageInfo.total = count;
        }
      });
    },
    handleCheck(index, row) {
      if (row.verifystatus == 4) {
        that.$message.success("该进件信息已经关闭，无法审核!");
        return;
      }
      let that = this;
      that.rateItem.routecode = row.routecode;
      that.rateItem.routename = row.routename;
      that.rateItem.serprocode = row.serprocode;
      that.rateItem.verifystatus = row.verifystatus;
      that.rateItem.serproname = row.serproname;
      that.rateItem.feeratedown = row.feeratedown;
      that.checkVisable = true;
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
      let that = this;
      Server.post(
        Path.sendRouteAudit,
        { routecode: row.routecode, serprocode: row.serprocode },
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
.el-date-editor--daterange {
  width: 100%;
}
.shanchu > /deep/ .el-form-item__label::before {
  content: "*";
  color: red;
}
</style>
