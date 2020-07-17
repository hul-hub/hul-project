<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="90px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="商户名称:" class="query-form-item">
                <el-input v-model="query.serProName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商户账号:" class="query-form-item">
                <el-input v-model="query.serProCode"></el-input>
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
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          class="handle-del mr10"
          @click="editVisible = true"
          v-if="hasPerm('accountadd')"
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
        <el-table-column prop="serproname" label="商户名称" align="center"></el-table-column>
        <el-table-column label="接收方类型" width="110" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.type | typeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="接收方帐号" align="center"></el-table-column>
        <el-table-column prop="name" label="接收方全称" align="center"></el-table-column>
        <el-table-column label="与分账接收方关系类型" width="120" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.relationType | relationTypeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="默认比例" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.defaultrate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="自定义的分账关系" width="100" prop="customRelation" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)" v-if="hasPerm('remove')">删除</el-button>
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
      <Modal
        v-model="editVisible"
        :closable="false"
        :mask-closable="false"
        title="新增接收方"
        width="820"
      >
        <el-form
          ref="ledgerItemone"
          :model="ledgerItem"
          :rules="ledgerItemRules"
          v-if="isNext"
          label-width="110px"
        >
          <el-form-item label="支付通道：" prop="templatecode">
            <el-select v-model="ledgerItem.templatecode" placeholder="请选择" style="width:100%">
              <el-option
                v-for="(item,index) in payTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form ref="ledgerItem" :model="ledgerItem" v-else :rules="rules" label-width="170px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商户名称：" prop="serprocode">
                <el-select
                  v-model="ledgerItem.serprocode"
                  filterable
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in serProList"
                    :key="index"
                    :label="item.serproname"
                    :value="item.serprocode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收方全称：" prop="name">
                <el-input v-model="ledgerItem.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="接收方类型：" prop="type">
                <el-select
                  v-model="ledgerItem.type"
                  v-if="ledgerItem.templatecode == 11"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in typeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="ledgerItem.type" v-else placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in typeZFBList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收方账号：" prop="account">
                <el-input v-model="ledgerItem.account">
                  <span slot="append">
                    <el-tooltip class="item" effect="dark" placement="bottom-end">
                      <div slot="content">
                        {{accountText}}
                        <br />
                        {{accountText2}}
                      </div>
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </span>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-col :span="12">
                <el-form-item label="默认比例：" prop="defaultrate">
                  <el-input-number
                    v-model="ledgerItem.defaultrate"
                    placeholder="请输入比例（例如0.26）"
                    :controls="false"
                    :precision="2"
                    :min="0"
                    :max="1"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-form-item label="与分账方的关系类型：" prop="relationType">
                <el-select
                  v-model="ledgerItem.relationType"
                  @change="changerelationType"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in relationTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-if="ledgerItem.relationType == 'CUSTOM'">
              <el-form-item label="自定义的分账关系：" prop="customRelation">
                <el-input
                  type="text"
                  @blur="customRelationBlur"
                  v-model="ledgerItem.customRelation"
                  maxlength="10"
                >
                  <span slot="append">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="与分账方的关系类型为自定义时，此项必填"
                      placement="bottom-end"
                    >
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </span>
                </el-input>
                <div v-if="iscustomRelation" class="error-div">{{customRelationError}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-else>
              <el-form-item label="自定义的分账关系：">
                <el-input type="text" v-model="ledgerItem.customRelation" maxlength="10">
                  <span slot="append">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="与分账方的关系类型为自定义时，此项必填"
                      placement="bottom-end"
                    >
                      <i class="el-icon-warning-outline"></i>
                    </el-tooltip>
                  </span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收人状态：">
                <el-radio class="radio" v-model="ledgerItem.status" label="1">开启</el-radio>
                <el-radio class="radio" v-model="ledgerItem.status" label="0">关闭</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="ledgerItem.templatecode == 13">
            <el-col :span="12">
              <el-form-item label="appId：" prop="appId">
                <el-input type="text" v-model="ledgerItem.appId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelEdit">取 消</el-button>
          <el-button type="primary" v-if="!isNext" @click="pre">上一步</el-button>
          <el-button type="primary" v-if="isNext" @click="next">下一步</el-button>
          <el-button type="primary" v-else @click="saveEdit">提交</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "ledgerAccountSetting",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.ledgerItem.relationType == "CUSTOM") {
        console.log(value);
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.ledgerItem.customRelation !== "") {
            this.$refs.ledgerItem.validateField("customRelation");
          }
          callback();
        }
      }
    };
    return {
      query: {
        serProCode: "",
        serProName: ""
      },
      customRelationError: "请输入自定义的分账关系",
      iscustomRelation: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },

      tableData: [],
      ledgerItem: {
        appId: "",
        receiverid: "", //分账接收人Id
        serprocode: "", //服务商/商户ID
        templatecode: "", //支付通道模板Id
        type: "", //分账接收方类型
        account: "", //分账接收方账号
        defaultrate: "", //	接收默认比例
        name: "", // 接收方全称
        relationType: "", //与分账方的关系类型
        customRelation: "", // 自定义的分账关系(当字段relationType的值为CUSTOM时，本字段必填)
        status: "1" // 接收人状态
      },
      accountText: "",
      accountText2: "",
      typeList: [
        { label: "商户", value: "MERCHANT_ID" },
        { label: "个人", value: "PERSONAL_OPENID" }
      ],
      typeZFBList: [
        { label: "支付宝用户号", value: "userId" },
        { label: "支付宝登录号", value: "loginName" }
      ],
      payTypeList: [
        { label: "微信", value: "12" },
        { label: "支付宝", value: "13" }
      ],
      serProList: [],
      relationTypeList: [
        { value: "SERVICE_PROVIDER", label: "服务商" },
        { value: "STORE", label: "门店" },
        { value: "STAFF", label: "员工" },
        { value: "STORE_OWNER", label: "店主" },
        { value: "PARTNER", label: "合作伙伴" },
        { value: "HEADQUARTER", label: "总部" },
        { value: "BRAND", label: "品牌方" },
        { value: "DISTRIBUTOR", label: "分销商" },
        { value: "USER", label: "用户" },
        { value: "SUPPLIER", label: "供应商" },
        { value: "CUSTOM", label: "自定义" }
      ],
      ledgerItemRules: {
        templatecode: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ]
      },
      isNext: true,
      rules: {
        serprocode: [
          { required: true, message: "请选择商户名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请选择分账接收方类型", trigger: "change" }
        ],
        relationType: [
          {
            required: true,
            message: "请选择接收方与分账方的关系类型",
            trigger: "change"
          }
        ],
        account: [
          { required: true, message: "请输入分账接收方账号", trigger: "blur" }
        ],
        customRelation: [
          {
            required: true
          }
        ],
        defaultrate: [
          { required: true, message: "请输入分账接收默认比例", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入分账接收方全称呼", trigger: "blur" }
        ],
        appId: [{ required: true, message: "请输入appId", trigger: "blur" }]
      },
      editVisible: false,
      detailVisible: false
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.loadSerproList();
  },
  methods: {
    changerelationType() {
      let that = this;
      that.customRelationBlur();
    },
    customRelationBlur() {
      let that = this;
      console.log(!that.ledgerItem.customRelation);
      if (
        that.ledgerItem.relationType == "CUSTOM" &&
        !that.ledgerItem.customRelation
      ) {
        that.iscustomRelation = true;
        return;
      } else {
        that.iscustomRelation = false;
      }
    },
    reseItem() {
      let that = this;
      that.ledgerItem = {
        receiverid: "", //分账接收人Id
        serprocode: "", //服务商/商户ID
        templatecode: "", //支付通道模板Id
        type: "", //分账接收方类型
        account: "", //分账接收方账号
        defaultrate: "", //	接收默认比例
        name: "", // 接收方全称
        relationType: "", //与分账方的关系类型
        customRelation: "", // 自定义的分账关系
        status: "" // 接收人状态
      };
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.isNext = true;
      that.reseItem();
      that.$refs.ledgerItem.resetFields();
    },
    pre() {
      let that = this;
      that.isNext = true;
    },
    next() {
      let that = this;
      if (that.ledgerItem.templatecode == 12) {
        that.accountText =
          "接收方类型是商户时，是商户ID。接收方类型是个人时，是个人openid。";
        that.accountText2 = "";
      } else {
        that.accountText =
          "当分账方类型是支付宝用户号时，本参数为用户的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；";
        that.accountText2 =
          "当分账方类型是支付宝登陆号时，本参数为用户的支付宝登录号。";
      }
      that.$refs.ledgerItemone.validate(async valid => {
        if (valid) {
          that.isNext = false;
        }
      });
    },
    // 保存编辑
    saveEdit() {
      let that = this;
      that.$refs.ledgerItem.validate(valid => {
        if (
          that.ledgerItem.relationType == "CUSTOM" &&
          !that.ledgerItem.customRelation
        ) {
          that.iscustomRelation = true;
          return;
        }
        if (valid) {
          let params = {};
          params["serprocode"] = that.ledgerItem.serprocode;
          params["type"] = that.ledgerItem.type;
          params["account"] = that.ledgerItem.account;
          params["defaultrate"] = that.ledgerItem.defaultrate;
          params["name"] = that.ledgerItem.name;
          params["relationType"] = that.ledgerItem.relationType;
          params["customRelation"] = that.ledgerItem.customRelation;
          params["status"] = that.ledgerItem.status;
          params["templatecode"] = that.ledgerItem.templatecode;
          params["appId"] = that.ledgerItem.appId;
          Server.post(Path.addReceive, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisible = false;
              that.isNext = true;
              that.loadData();
              that.reseItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.error(msg);
            }
          });
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
        serProCode: "",
        serProName: ""
      };
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    loadData() {
      let that = this;
      let params = {};
      params["limit"] = that.pageInfo.pageIndex;
      params["size"] = that.pageInfo.pageSize;
      params["serProCode"] = that.query.serProCode;
      params["serProName"] = that.query.serProName;
      Server.post(Path.listReceive, params, res => {
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
    // 删除操作
    handleDelete(index, row) {
      let that = this;
      that
        .$confirm("确定要删除接收配置吗？点击确定则删除该选项！", "删除", {
          type: "warning"
        })
        .then(() => {
          Server.post(
            Path.removeReceive,
            { receiverId: row.receiverid },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("删除成功!");
              } else {
                that.$message.error(msg);
              }
            }
          );
        })
        .catch(() => {});
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
    typeFilter(val) {
      let type;
      switch (val) {
        case "MERCHANT_ID":
          type = "商户";
          break;
        case "PERSONAL_OPENID":
          type = "个人";
          break;
        case "userId":
          type = "支付宝用户号";
          break;
        case "loginName":
          type = "支付宝登陆号";
          break;
      }
      return type;
    },
    relationTypeFilter(val) {
      let relationType;
      switch (val) {
        case "SERVICE_PROVIDER":
          relationType = "服务商";
          break;
        case "STORE":
          relationType = "门店";
          break;
        case "STAFF":
          relationType = "员工";
          break;
        case "STORE_OWNER":
          relationType = "店主";
          break;
        case "PARTNER":
          relationType = "合作伙伴";
          break;
        case "HEADQUARTER":
          relationType = "总部";
          break;
        case "BRAND":
          relationType = "品牌方";
          break;
        case "DISTRIBUTOR":
          relationType = "分销商";
          break;
        case "USER":
          relationType = "用户";
          break;
        case "SUPPLIER":
          relationType = "供应商";
          break;
        case "CUSTOM":
          relationType = "自定义";
          break;
      }
      return relationType;
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
.error-div {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
</style>
