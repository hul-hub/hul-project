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
            <el-col :span="6">
              <el-form-item label="结算状态:">
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
        <el-table-column
          prop="upSerProName"
          label="所属服务商"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="accno"
          label="账单号"
          min-width="160"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column prop="framount" label="分润金额" min-width="100" align="center"></el-table-column>
        <el-table-column prop="operatedate" label="创建日期" min-width="160" align="center"></el-table-column>
        <el-table-column label="状态" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status | filterStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发票" min-width="100" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.invoice" :src="scope.row.invoice" alt style="height:40px" />
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 9"
              type="primary"
              size="small"
              @click="closeBill(scope.$index, scope.row)"
            >作废</el-button>
            <el-button
              v-if="scope.row.status == 9"
              type="primary"
              size="small"
              @click="uploadBill(scope.$index, scope.row)"
            >上传发票</el-button>
            <el-button
              v-if="scope.row.status == 9"
              type="primary"
              size="small"
              @click="okMoney(scope.$index, scope.row)"
            >确认打款</el-button>
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
      <Modal
        v-model="uploadBillVisiable"
        :closable="false"
        :mask-closable="false"
        :title="billItem.rolecode?'编辑':'新增'"
      >
        <el-form ref="billItem" :model="billItem" :rules="rules" label-width="90px">
          <el-form-item label="账单号：">
            <el-input disabled v-model="billItem.accno"></el-input>
          </el-form-item>
          <el-form-item label="发票" prop="invoice">
            <upload-file
              :param="invoice"
              :cosImage="billItem.invoice"
              @catchData="ChildToParentinvoice"
            ></upload-file>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelUploadBill">取 消</el-button>
          <el-button type="primary" @click="saveUploadBill">确 定</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import uploadFile from "@/components/common/uploadFile/index.vue";
export default {
  name: "settleBillManage",
  components: { "upload-file": uploadFile },
  data() {
    return {
      query: {
        upserprocode: "",
        status: ""
      },
      statusList: [
        { label: "新增", value: "9" },
        { label: "已结算", value: "1" },
        { label: "结算中", value: "2" },
        { label: "已作废", value: "3" }
      ],
      uploadBillVisiable: false,
      invoice: "invoice",
      billItem: {
        accno: "",
        invoice: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      toSerproList: [],
      tableData: [],
      multipleSelection: [],
      rules: {
        invoice: [{ required: true, message: "请选择发票" }]
      }
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },

  methods: {
    cancelUploadBill() {
      let that = this;
      that.uploadBillVisiable = false;
      that.$refs.billItem.resetFields();
    },
    saveUploadBill() {
      let that = this;
      that.$refs.billItem.validate(valid => {
        if (valid) {
          let params = {};
          params["accno"] = that.billItem.accno;
          params["invoice"] = that.billItem.invoice;
          Server.post(Path.uploadBillFile, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.uploadBillVisiable = false;
              that.loadData();
              that.$message.success("操作成功!");
            } else {
              that.$message.warning("操作成功!");
            }
          });
        }
      });
    },

    closeBill(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要作废该账单数据吗？点击确定则作废该数据！",
          "作废账单",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(Path.closeSpaccByCode, { spaccId: row.accno }, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.loadData();
              that.$message.success("作废成功");
            } else {
              that.$message.warning(msg);
            }
          });
        })
        .catch(() => {});
    },
    uploadBill(index, row) {
      let that = this;
      that.uploadBillVisiable = true;
      that.billItem.invoice = row.invoice;
      that.billItem.accno = row.accno;
    },
    ChildToParentinvoice(val) {
      let that = this;
      that.billItem.invoice = val;
    },
    okMoney(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要打款该账单数据吗？点击确定则打款该订单！",
          "确认打款",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(Path.remitSettle, { accno: row.accno }, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.loadData();
              that.$message.success("打款成功");
            } else {
              that.$message.warning(msg);
            }
          });
        })
        .catch(() => {});
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
      params["status"] = that.query.status;
      params["upserprocode"] = that.query.upserprocode;
      Server.post(Path.querySpaccList, params, res => {
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
        { token: localStorage.getItem("tokenData"), serviceType: "" },
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
  },
  filters: {
    filterStatus(val) {
      let status = "";
      switch (val) {
        case "9":
          status = "新增";
          break;
        case "1":
          status = "已结算";
          break;
        case "2":
          status = "结算中";
          break;
        case "3":
          status = "已作废";
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
</style>
