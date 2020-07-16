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
              <el-form-item label="商户名称:">
                <el-input v-model="query.serProName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审核状态:">
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
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="serprocode" label="商户编码" min-width="150" align="center"></el-table-column>
        <el-table-column prop="serproname" label="商户名称" min-width="170" align="center"></el-table-column>
        <el-table-column prop="upserproname" label="所属服务商" min-width="170" align="center"></el-table-column>
        <el-table-column prop="contactsname" label="负责人" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" min-width="100" align="center"></el-table-column>
        <el-table-column prop="createdate" label="创建日期" min-width="90" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==1?"已通过":(scope.row.status==2?"已拒绝":(scope.row.status==4?"待审核":(scope.row.status==5?"已关闭":(scope.row.status==6?"已变更":"新增"))))}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="exportQrcode(scope.$index, scope.row)"
            >导出二维码</el-button>
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
      <Modal v-model="qrcodeVisible" :closable="false" :mask-closable="false" title="导出二维码">
        <div>
          <el-row type="flex" justify="center">
            <div id="qrCode" ref="qrCodeDiv">
              <img :src="qrcodeUrl" alt />
            </div>
          </el-row>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="exportFun">下载图片</el-button>
          <el-button type="primary" @click="cancelFun">取 消</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>
    
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "cashQrcode",
  components: {},
  data() {
    return {
      query: {
        serviceType: 2,
        upSerProName: "",
        serProName: "",
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
      ],
      qrcodeVisible: false,
      qrcodeUrl: ""
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  methods: {
    exportFun() {
      var a = document.createElement("a");
      a.download = name || "pic"; // 设置图片地址
      a.href = this.qrcodeUrl;
      a.click();
    },
    cancelFun() {
      let that = this;
      that.qrcodeVisible = false;
      that.qrcodeUrl = "";
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
        upSerProName: "",
        serProName: "",
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
    exportQrcode(index, row) {
      console.log(row);
      let that = this;
      Server.post(Path.makeQRCode, { serprocode: row.serprocode }, res => {
        console.log(res);
        that.qrcodeUrl = res;
        that.qrcodeVisible = true;
      }).catch(error => {
        that.$message.success(error.response.data);
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
  mounted() {}
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
</style>
