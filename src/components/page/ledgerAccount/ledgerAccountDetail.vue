<template>
  <div class="tab-container">
    <div class="search marginTwo">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <span class="detail-title">订单分账详情</span>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" justify="end">
            <el-button type="primary" icon="el-icon-arrow-left" @click="goBack" size="small">返回</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="订单基本信息">
          <div>
            <div class="left-item">
              <p>
                <span>系统订单号：</span>
                &nbsp;&nbsp;
                {{id}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>商户名称：</span>
                &nbsp;&nbsp;
                {{orderItem.serproname}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>订单金额：</span>
                &nbsp;&nbsp;
                {{orderItem.orderamount}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>分账订单号：</span>
                &nbsp;&nbsp;
                {{orderItem.hoopay_fz_orderid}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>商品名称：</span>
                &nbsp;&nbsp;
                {{orderItem.goodsname}}
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="分账人列表">
          <el-table
            :data="tableTemplate"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="分账人全称" min-width="120" align="center"></el-table-column>
            <el-table-column label="分账类型" min-width="95" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.type == "MERCHANT_ID"?"商户":"个人"}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="account" label="分账人账号" min-width="120" align="center"></el-table-column>
            <el-table-column label="默认比例" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.defaultrate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="分账金额(分)" width="120" align="center"></el-table-column>
            <el-table-column label="分账状态" min-width="95" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.status | filterStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="finish_time" label="完成时间" min-width="110" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  v-if="scope.row.type == 'MERCHANT_ID' && scope.row.status == 'SUCCESS'"
                  @click="handleRefund(scope.$index, scope.row)"
                >回退</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleRefundQuery(scope.$index, scope.row)"
                >查询回退</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <template>
      <Modal
        v-model="refundVisable"
        :closable="false"
        :mask-closable="false"
        title="分账回退"
        width="580"
      >
        <el-form ref="refundItem" :model="refundItem" :rules="rules" label-width="110px">
          <el-form-item label="分账金额(分)：">
            <el-input v-model="refundItem.amount" disabled></el-input>
          </el-form-item>
          <el-form-item label="回退金额(分)：">
            <el-input v-model="refundItem.returnAmount"></el-input>
          </el-form-item>
          <el-form-item label="回退描述：" prop="description">
            <el-input v-model="refundItem.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelRefund">取 消</el-button>
          <el-button type="primary" @click="okRefund">确 定</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "ledgerAccountDetail",
  components: {},
  data() {
    return {
      id: "",
      serprocode: "",
      tableTemplate: [],
      orderItem: {
        serproname: "",
        orderamount: "",
        hoopay_fz_orderid: "",
        goodsname: ""
      },
      refundItem: {
        hoopayFzOrderid: "",
        amount: "",
        returnAmount: "",
        description: "",
        returnAccount: ""
      },
      refundVisable: false,
      rules: {
        description: [
          { required: true, message: "请输入回退描述", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let that = this;
    that.id = that.$route.query.id;
    that.serprocode = that.$route.query.serprocode;
    that.orderItem.serproname = that.$route.query.serproname;
    that.orderItem.orderamount = that.$route.query.orderamount;
    that.orderItem.hoopay_fz_orderid = that.$route.query.hoopay_fz_orderid;
    that.orderItem.goodsname = that.$route.query.goodsname;
    that.loadTableData();
  },
  methods: {
    cancelRefund() {
      let that = this;
      that.refundVisable = false;
      that.$refs.refundItem.resetFields();
    },
    handleRefundQuery(index, row) {
      let that = this;
      Server.post(
        Path.profitReturnSubOrderQuery,
        {
          serProCode: that.serprocode,
          hoopayFzRefundId: row.hoopay_fz_refundid,
          hoopayFzOrderId: row.hoopay_fz_orderid,
          sign_type: "WITHOUT"
        },
        res => {
          let { respCode, respMsg } = res;
          if (respCode == "200") {
            that.loadTableData();
            that.$message.success(respMsg);
          } else {
            that.$message.error(respMsg);
          }
        }
      );
    },
    handleRefund(index, row) {
      let that = this;
      that.refundItem.hoopayFzOrderid = row.hoopay_fz_orderid;
      that.refundItem.amount = row.amount;
      that.refundItem.returnAccount = row.account;
      that.refundItem.returnAmount = row.amount;
      that.refundVisable = true;
    },
    okRefund() {
      let that = this;
      that.$refs.refundItem.validate(valid => {
        if (valid) {
          let params = {};
          params["serProCode"] = that.serprocode;
          params["hoopayFzOrderId"] = that.refundItem.hoopayFzOrderid;
          params["returnAccount"] = that.refundItem.returnAccount;
          params["returnAmount"] = that.refundItem.returnAmount;
          params["description"] = that.refundItem.description;
          params["sign_type"] = "WITHOUT";
          Server.post(Path.spoNsorOrderFzRefund, params, res => {
            let { respCode, respMsg } = res;
            if (respCode == "200") {
              that.loadTableData();
              that.refundVisable = false;
              that.$message.success("回退成功");
            } else {
              that.$message.error(respMsg);
            }
          });
        }
      });
    },
    goBack() {
      let that = this;
      that.$router.go(-1);
    },
    loadTableData() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 99;
      params["hoopayOrderid"] = that.id;
      Server.post(Path.getSubAccountOrderDetails, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableTemplate = data;
        } else {
          that.tableTemplate = [];
        }
      });
    }
  },
  filters: {
    filterStatus(val) {
      let status = "";
      switch (val) {
        case "PENDING":
          status = "待分账";
          break;
        case "SUCCESS":
          status = "分账成功";
          break;
        case "ADJUST":
          status = "分账失败待调账";
          break;
        case "RETURNED":
          status = "已转回分账方";
          break;
        case "CLOSED":
          status = "已关闭";
          break;
        default:
          status = val;
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
.left-item {
  margin-bottom: 41px;
}
.left-item > p {
  font-size: 14px;
}
.left-item > p > span {
  color: #000000;
  font-size: 14px;
  font-weight: 550;
  display: inline-block;
  width: 90px;
  text-align: right;
}
</style>
