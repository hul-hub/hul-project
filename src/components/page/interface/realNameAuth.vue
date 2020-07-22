<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form
          :model="authItem"
          label-width="100px"
          label-position="left"
          size="small"
          class="form"
        >
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="认证类型:" class="query-form-item">
                <el-select
                  v-model="authItem.authType"
                  @change="changeAuthType"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in authTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-form
            :model="identItem"
            label-width="100px"
            label-position="left"
            size="small"
            class="form"
            v-if="isIdent"
            ref="identItem"
            :rules="identItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model="identItem.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份证号码:" prop="idcard">
                  <el-input v-model="identItem.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="saveIdentItem"
                  >认 证</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refresIdentItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-form
            :model="bankItem"
            label-width="100px"
            label-position="left"
            size="small"
            class="form"
            v-if="isBank"
            ref="bankItem"
            :rules="bankItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="姓名:" prop="acct_name">
                  <el-input v-model="bankItem.acct_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身份证号码:" prop="cert_id">
                  <el-input v-model="bankItem.cert_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="银行卡账号:" prop="acct_pan">
                  <el-input v-model="bankItem.acct_pan "></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="绑定手机号:" prop="phone_num">
                  <el-input v-model="bankItem.phone_num "></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="end">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                @click="saveBankItem"
              >认 证</el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh-left"
                @click="refresBankItem"
              >重 置</el-button>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "realNameAuth",
  components: {},
  data() {
    return {
      authTypeList: [{ label: "银行卡", value: "2" }],
      authItem: {
        authType: "2"
      },
      isIdent: false,
      isBank: true,
      identItem: {
        flag: "1", // 判断是否为内部调用，随便填 ,
        idcard: "", //身份证号码 ,
        key: "", // 取信宝密钥，内部调用不用填 ,
        name: "" //身份证姓名
      },
      bankItem: {
        acct_name: "", // 持卡人姓名 ,
        acct_pan: "", // 银行卡账号 ,
        cert_id: "", // 开卡使用的证件号码 ,
        cert_type: "01", //开卡使用的证件类型；01:身份证，目前只支持身份证 ,
        phone_num: "" // 绑定手机号
      },
      identItemRules: {
        idcard: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      },
      bankItemRules: {
        cert_id: [
          { required: true, message: "身份证号码不能为空", trigger: "blur" }
        ],
        phone_num: [
          { required: true, message: "绑定手机号不能为空", trigger: "blur" }
        ],
        acct_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        acct_pan: [
          { required: true, message: "银行卡号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let that = this;
  },
  methods: {
    //选择基础配置
    changeAuthType(val) {
      let that = this;
      switch (val) {
        case "1":
          if (that.$refs.bankItem) {
            that.$refs.bankItem.resetFields();
          }
          if (that.$refs.identItem) {
            that.$refs.identItem.resetFields();
          }
          that.isIdent = true;
          that.isBank = false;
          break;
        case "2":
          if (that.$refs.identItem) {
            that.$refs.identItem.resetFields();
          }
          if (that.$refs.bankItem) {
            that.$refs.bankItem.resetFields();
          }
          that.isIdent = false;
          that.isBank = true;
          break;
        default:
          break;
      }
    },
    refresIdentItem() {
      let that = this;
      that.identItem = {
        flag: "1", // 判断是否为内部调用，随便填 ,
        idcard: "", //身份证号码 ,
        key: "", // 取信宝密钥，内部调用不用填 ,
        name: "" //身份证姓名
      };
      that.$refs.identItem.resetFields();
    },
    saveIdentItem() {
      let that = this;
      that.$refs.identItem.validate(valid => {
        if (valid) {
          let params = {};
          params["idcard"] = that.identItem.idcard;
          params["name"] = that.identItem.name;
          params["flag"] = that.identItem.flag;
          Server.postJson(Path.idAuthentication, params, res => {
            let { showapi_res_code, showapi_res_error } = res;
            if (showapi_res_code == 0) {
              that.refresIdentItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.error(showapi_res_error);
            }
          });
        }
      });
    },
    refresBankItem() {
      let that = this;
      that.bankItem = {
        acct_name: "",
        acct_pan: "",
        cert_id: "",
        cert_type: "01",
        phone_num: ""
      };
      that.$refs.bankItem.resetFields();
    },
    saveBankItem() {
      let that = this;
      that.$refs.bankItem.validate(valid => {
        if (valid) {
          let params = {};
          params["acct_name"] = that.bankItem.acct_name;
          params["acct_pan"] = that.bankItem.acct_pan;
          params["cert_id"] = that.bankItem.cert_id;
          params["cert_type"] = that.bankItem.cert_type;
          params["phone_num"] = that.bankItem.phone_num;
          Server.postJson(Path.bankAuthentication, params, res => {
            let { showapi_res_code, showapi_res_error } = res;
            if (showapi_res_code == 0) {
              that.refresBankItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.error(showapi_res_error);
            }
          });
        }
      });
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

.form {
  padding: 20px;
  border-top: 1px solid #ddd;
}
/deep/ .el-card__body {
  padding: 0;
}
</style>
