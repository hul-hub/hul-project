<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="74px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="商户名称:">
                <el-input v-model="query.serProName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="通道名称:">
                <el-input v-model="query.routename"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审核状态:">
                <el-select v-model="query.verifyStatus" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in verifyStatusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="进件状态:" class="query-form-item">
                <el-select v-model="query.activeStatus" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in activestatusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36">
            <el-col :span="24">
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
        <!-- <el-table-column
          prop="routeid"
          label="平台商户号"
          min-width="120"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>-->
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

        <!-- <el-table-column
          prop="serprocode"
          label="商户编码"
          min-width="120"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>-->
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
        <el-table-column label="进件状态" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.activestatus==1?"已报件":(scope.row.activestatus==2?"已激活":(scope.row.activestatus==3?"激活失败":(scope.row.activestatus==4?"已冻结":"待报件")))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="scope.row.verifystatus == 2 && scope.row.templatecode != 13 && hasPerm('route_push')"
              size="small"
              @click="handleInpart(scope.$index, scope.row)"
            >进件</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleCheck(scope.$index, scope.row)"
              v-if="hasPerm('route_auditing')"
            >审核</el-button>
            <el-button
              type="primary"
              size="small"
              v-if="scope.row.templatecode != 13 && hasPerm('route_query')"
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
    <template>
      <Modal v-model="checkVisable" :closable="false" :mask-closable="false" title="商户进件审核">
        <el-form ref="rateItem" :model="rateItem" label-width="110px">
          <el-form-item label="商户名称：">
            <el-input v-model="rateItem.serproname" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付通道：">
            <el-input v-model="rateItem.routename" disabled></el-input>
          </el-form-item>
          <el-form-item label="结算费率：">
            <el-input-number
              v-model="rateItem.feeratedown"
              placeholder="请输入费率（例如0.26）"
              :controls="false"
              disabled
              :min="0"
              :max="1"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelCheck">取 消</el-button>
          <el-button type="primary" @click="okCheck" :disabled="rateItem.verifystatus == 2">审核通过</el-button>
          <el-button type="primary" @click="refuseCheck" :disabled="rateItem.verifystatus == 3">审核拒绝</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "merchantIncomingPart",
  components: {},
  data() {
    return {
      query: {
        serviceType: 2,
        serProName: "",
        routename: "",
        verifyStatus: "",
        activeStatus: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      checkVisable: false,
      rateItem: {
        serproname: "",
        serprocode: "",
        routecode: "",
        routename: "",
        feerate: "",
        feeratedown: "",
        verifystatus: "",
        verifystatus: ""
      },
      tableData: [],
      verifyStatusList: [
        { label: "待审核", value: "1" },
        { label: "审核通过", value: "2" },
        { label: "审核拒绝", value: "3" },
        { label: "关闭", value: "4" },
        { label: "变更", value: "5" },
        { label: "提交中", value: "6" }
      ],
      activestatusList: [
        { label: "已报件", value: "1" },
        { label: "已激活", value: "2" },
        { label: "激活失败", value: "3" },
        { label: "已冻结", value: "4" },
        { label: "待报件", value: "5" }
      ]
    };
  },
  created() {
    let that = this;
    that.loadData();
  },
  methods: {
    handleResultSearch(index, row) {
      let that = this;
      Server.post(
        Path.quertRouteAuditStatus,
        {
          serprocode: row.serprocode,
          templatecode: row.templatecode,
          routecode: row.routecode
        },
        res => {
          let { code, data, msg } = res;
          var statusMsg;
          switch (data.examineStatus) {
            case "0":
              statusMsg = "待审核，";
              break;
            case "1":
              statusMsg = "审核通过，";
              break;
            case "2":
              statusMsg = "审核不通过，";
              break;
            case "3":
              statusMsg = "需再次审核，";
              break;
          }
          switch (data.activateStatus) {
            case "0":
              statusMsg += "未激活！";
              break;
            case "1":
              statusMsg += "激活成功！";
              break;
            case "2":
              statusMsg += "激活失败！";
              break;
            case "3":
              statusMsg += "需再次激活！";
              break;
            default:
              statusMsg += "暂无！";
          }
          that.$message.warning(statusMsg);
        }
      );
    },
    updexamineStatus(routecode, serprocode, status) {
      let that = this;
      Server.post(
        Path.updexamineStatus,
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
    cancelCheck() {
      let that = this;
      that.checkVisable = false;
    },
    okCheck() {
      let that = this;
      that.doCheck(2);
    },
    refuseCheck() {
      let that = this;
      that.doCheck(3);
    },
    doCheck(status) {
      let that = this;
      Server.post(
        Path.updateRouteStatus,
        {
          routecode: that.rateItem.routecode,
          verifystatus: status,
          serprocode: that.rateItem.serprocode
        },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.loadData();
            that.checkVisable = false;
            that.$message.success("商户进件审核成功!");
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
        serviceType: 2,
        serProName: "",
        routename: "",
        verifyStatus: "",
        activeStatus: ""
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
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = that.query.serviceType;
      params["serProName"] = that.query.serProName;
      params["routename"] = that.query.routename;
      params["verifyStatus"] = that.query.verifyStatus;
      params["activeStatus"] = that.query.activeStatus;
      Server.post(Path.queryPayWayByCurrentSerPro, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
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
          if (data.templatename == "UnionPay") {
            that.sendRouteAudit(row);
          } else if (data.templatename == "wx") {
            that.wxComingPart(row);
          }
        }
      });
    },
    doWxComingPart(row) {
      let that = this;
      Server.post(Path.wxInitSerpro, { serProCode: row.serprocode }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.$message.success(msg);
        } else {
          that.$message.error(msg);
        }
      });
    },
    wxComingPart(row) {
      let that = this;
      Server.post(
        Path.querySerproWechatMainByCode,
        { serProCode: row.serprocode },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.doWxComingPart(row);
          } else {
            that.$message.warning("请先为该商户配置超级管理员信息！");
          }
        }
      );
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
            that.$message.error(msg);
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
