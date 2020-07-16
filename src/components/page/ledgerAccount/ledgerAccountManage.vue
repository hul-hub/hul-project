<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="90px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="商户名称:" class="query-form-item">
                <el-select v-model="query.serprocode" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in serProList"
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
        <el-table-column
          prop="serproname"
          label="商户名称"
          min-width="180"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商户订单号"
          prop="mchOrderid"
          :show-overflow-tooltip="true"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          label="系统订单号"
          prop="hoopayOrderid"
          :show-overflow-tooltip="true"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column prop="orderamount" label="交易金额" min-width="95" align="center"></el-table-column>
        <el-table-column prop="commission" label="手续费" align="center"></el-table-column>
        <el-table-column label="分账状态" min-width="95" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.profitSharingNumber == 0? "未分账":"已分账"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易状态" min-width="95" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paystatus | filterOrderStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.paytypecode | filterPaytype}}</span>
            <span>{{scope.row.paywaycode | filterGetPayWay}}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span class="table-cell-span">开始：{{scope.row.reqtransstartdate}}</span>
            <span class="table-cell-span">结束：{{scope.row.reqtransenddate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleUser(scope.$index, scope.row)">确认分账</el-button>
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

    <!-- 编辑弹出框 -->
    <template>
      <Modal v-model="userVisible" width="920" :closable="false" :mask-closable="false">
        <p slot="header" style="color: #387bff;">
          添加接收方
          <span style="float:right;color:black;">订单总金额：{{orderamount}}</span>
        </p>
        <el-table :data="tableDataEdit" class="tb-edit" style="width: 100%">
          <el-table-column label="接收方全称">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.receiverid"
                v-if="scope.row.isEdit"
                placeholder="请选择"
                style="width:100%"
                @change="changeAccount"
              >
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.name"
                  :value="item.receiverid"
                ></el-option>
              </el-select>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接收方帐号" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接收方类型" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.type== "MERCHANT_ID"?"商户":(scope.row.type== 'PERSONAL_OPENID')?"个人":""}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分账比例">
            <template slot-scope="scope">
              <el-input-number
                @change="changeDefaultrate"
                v-model="scope.row.defaultrate"
                :controls="false"
                v-if="scope.row.isEdit"
                :precision="2"
                :min="0"
                size="small"
                :max="1"
              ></el-input-number>
              <span v-else>{{scope.row.defaultrate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分账金额">
            <template slot-scope="scope">
              <el-input-number
                @change="changeAmout"
                v-model="scope.row.amount"
                :controls="false"
                v-if="scope.row.isEdit"
                :precision="2"
                :min="0"
                size="small"
                :max="orderamount"
              ></el-input-number>
              <span v-else>{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="small" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer">
          <el-button type="primary" @click="cancelUser">取 消</el-button>
          <el-button type="primary" @click="saveUser">确 定</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "ledgerAccountManage",
  components: {},
  data() {
    return {
      query: {
        serprocode: "",
        type: "",
        account: ""
      },
      orderamount: 0,
      iscustomRelation: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableDataEdit: [
        {
          account: "",
          amount: 0,
          defaultrate: 0,
          name: "",
          receiverid: "",
          relationType: "",
          serprocode: "",
          templatecode: "",
          type: "",
          description: "",
          isEdit: true
        }
      ],
      tableData: [],
      userItem: {
        flag: "",
        hoopayOrderid: "",
        list: [],
        mchFzOrderid: "",
        orderamount: "",
        routeFzOrderid: "",
        serProCode: "",
        signature: ""
      },
      typeList: [
        { label: "商户", value: "MERCHANT_ID" },
        { label: "个人", value: "PERSONAL_OPENID" }
      ],
      serProList: [],
      userVisible: false,
      userList: []
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.loadSerproList();
  },
  methods: {
    changeAmout(amount) {
      let that = this;
      // 重新计算退款金额
      that.tableDataEdit.forEach(function(item, index, input) {
        if (item.isEdit) {
          var defaultrate = (amount / that.orderamount).toFixed(2);
          item.defaultrate = defaultrate > 1 ? 1 : defaultrate;
        }
      });
    },
    changeDefaultrate(defaultrate) {
      let that = this;
      // 重新计算退款金额
      that.tableDataEdit.forEach(function(item, index, input) {
        if (item.isEdit) {
          var amount = (that.orderamount * defaultrate).toFixed(2);
          item.amount = amount < 0.01 ? 0 : amount;
        }
      });
    },
    handleAdd(index, row) {
      let that = this;
      row.isEdit = false;
      let item = {
        account: "",
        amount: 0,
        defaultrate: 0,
        name: "",
        receiverid: "",
        relationType: "",
        serprocode: "",
        templatecode: "",
        type: "",
        description: "",
        isEdit: true
      };
      that.tableDataEdit.splice(index + 1, 0, item);
    },
    // 其他行设置为不可编辑
    disableEditFun() {
      let that = this;
      that.tableDataEdit.forEach(function(item, index, input) {
        item.isEdit = false;
      });
    },
    changeAccount(val) {
      let that = this;
      let typeArr = that.userList.filter((item, index, array) => {
        return item.receiverid == val;
      });
      that.tableDataEdit.forEach(function(item, index, input) {
        if (item.isEdit) {
          item.type = typeArr[0].type;
          item.defaultrate = typeArr[0].defaultrate;
          var amount = (that.orderamount * item.defaultrate).toFixed(2);
          item.amount = amount < 0.01 ? 0 : amount;
          item.name = typeArr[0].name;
          item.account = typeArr[0].account;
          item.relationType = typeArr[0].relationType;
          item.serprocode = typeArr[0].serprocode;
          item.templatecode = typeArr[0].templatecode;
          item.description = typeArr[0].type;
          console.log(item);
        }
      });
    },
    handleEdit(index, row) {
      let that = this;
      that.disableEditFun();
      row.isEdit = true;
    },
    handleDelete(index, row) {
      let that = this;
      if (that.tableDataEdit.length == 1) {
        that.$message.warning("分账接收方至少一行！");
        return;
      }
      that.tableDataEdit.splice(index, 1);
    },
    reseItem() {
      let that = this;
      that.userItem = {
        flag: "",
        hoopayOrderid: "",
        list: [],
        mchFzOrderid: "",
        orderamount: "",
        routeFzOrderid: "",
        serProCode: "",
        signature: ""
      };
      that.tableDataEdit = [
        {
          account: "",
          amount: 0,
          defaultrate: 0,
          name: "",
          receiverid: "",
          relationType: "",
          serprocode: "",
          templatecode: "",
          type: "",
          description: "",
          isEdit: true
        }
      ];
    },
    cancelUser() {
      let that = this;
      that.userVisible = false;
      that.reseItem();
    },
    // 保存编辑
    saveUser() {
      let that = this;
      let sumAmount = 0;
      for (var i = 0; i < that.tableDataEdit.length; i++) {
        if (!that.tableDataEdit[i].account) {
          that.$message.warning("第" + (i + 1) + "行分账接收方全称为空！");
          return;
        }
        sumAmount = sumAmount + that.tableDataEdit[i].amount;
      }
      if (sumAmount > that.orderamount) {
        that.$message.warning("分账方金额合计大于订单总金额！");
        return;
      }
      let params = {};
      params["flag"] = "1";
      params["hoopayOrderid"] = that.userItem.hoopayOrderid;
      params["mchFzOrderid"] = that.userItem.mchFzOrderid;
      params["orderamount"] = that.userItem.orderamount * 100;
      params["routeFzOrderid"] = that.userItem.routeFzOrderid;
      params["serProCode"] = that.userItem.serProCode;
      console.log(that.tableDataEdit[0].amount);
      let list = that.tableDataEdit.map(element => {
        const obj = { ...element, amount: element.amount * 100 }; //避免原数组发生改变
        return obj;
      });
      console.log(that.tableDataEdit[0].amount);
      params["list"] = list;
      Server.postJson(Path.profitSharing, params, res => {
        let { respCode, data, respMsg } = res;
        if (respCode == 2018) {
          that.userVisible = false;
          that.loadData();
          that.$message.success(respMsg);
        } else {
          that.$message.error(respMsg);
        }
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
        serprocode: "",
        type: "",
        account: ""
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
      params["serprocode"] = that.query.serprocode;
      Server.post(Path.listFzOrder, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    loadSerproList() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = "";
      Server.post(Path.querySerProListByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          let arr = [];
          for (let item of data) {
            let serPro = {};
            serPro["serprocode"] = item.serprocode;
            serPro["serproname"] = item.serproname;
            arr.push(serPro);
          }
          that.serProList = arr;
        }
      });
    },
    listBySerProCode(serprocode, templatecode) {
      let that = this;
      let params = {};
      params["serProCode"] = serprocode;
      params["templatecode"] = templatecode;
      Server.post(Path.listBySerProCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          let arr = [];
          that.userList = data;
        }
      });
    },
    // 确认分账
    handleUser(index, row) {
      let that = this;
      that.userVisible = true;
      that.orderamount = row.orderamount;
      that.userItem.hoopayOrderid = row.hoopayOrderid;
      that.userItem.mchOrderid = row.mchFzOrderid;
      that.userItem.orderamount = row.orderamount;
      that.userItem.routeFzOrderid = row.routeOrderid;
      that.userItem.serProCode = row.serprocode;
      // 获取分账接收方
      that.listBySerProCode(row.serprocode, row.templatecode);
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
    filterOrderStatus(val) {
      let payStatus = "";
      switch (val) {
        case "SUCCESS":
          payStatus = "支付成功";
          break;
        case "REFUND":
          payStatus = "转入退款";
          break;
        case "NOTPAY":
          payStatus = "未支付";
          break;
        case "CLOSED":
          payStatus = "已关闭";
          break;
        case "REVERSE":
          payStatus = "已冲正";
          break;
        case "REVOK":
          payStatus = "已撤销";
          break;
      }
      return payStatus;
    },
    filterFzStatus(val) {
      let fzStatus = "";
      switch (val) {
        case "ACCEPTED":
          fzStatus = "受理成功";
          break;
        case "PROCESSING":
          fzStatus = "处理中";
          break;
        case "FINISHED":
          fzStatus = "处理完成";
          break;
        case "REFUND":
          fzStatus = "已回退";
          break;
        case "CLOSED":
          fzStatus = "处理失败";
          break;
      }
      return fzStatus;
    },
    filterPaytype(paytypecode) {
      switch (paytypecode) {
        case "01":
          return "微信-";
        case "02":
          return "支付宝-";
        case "03":
          return "银联-";
        case "04":
          return "百度-";
        case "05":
          return "京东-";
        case "06":
          return "QQ钱包-";
        default:
          return "暂无-";
      }
    },
    filterGetPayWay(payWayCode) {
      switch (payWayCode) {
        case "AP":
          return "APP支付";
        case "DF":
          return "代付";
        case "FK":
          return "付款码支付";
        case "FW":
          return "服务窗支付";
        case "GZ":
          return "公众号支付";
        case "H5":
          return "H5支付";
        case "KJ":
          return "快捷支付";
        case "SM":
          return "扫码支付";
        case "WG":
          return "网关支付";
        default:
          return "支付方式未知";
      }
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
.mine-header {
  border-bottom: 1px solid #e9eaec;
  padding: 14px 0px;
  line-height: 1;
  background-color: #ffffff;
  font-size: 14px;
}
.mine-header > p {
  height: 20px;
  line-height: 20px;
  font-weight: 600;
}
</style>
