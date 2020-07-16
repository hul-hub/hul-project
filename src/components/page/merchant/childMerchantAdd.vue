<template>
  <div class="tab-container">
    <div class="search marginTwo">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <span class="detail-title">新增子商户</span>
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
        <el-tab-pane label="开户信息">
          <el-form
            ref="accountItem"
            :model="accountItem"
            :rules="accountItemRules"
            label-width="130px"
          >
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="账户姓名:" prop="accountname">
                  <el-input v-model="accountItem.accountname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户类型:" prop="accounttype">
                  <el-select v-model="accountItem.accounttype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in accounttypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户省份:" prop="province">
                  <el-select
                    v-model="accountItem.province"
                    @change="changeAccountProvince"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in provinceList"
                      :key="index"
                      :label="item.provinceName"
                      :value="item.provinceCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="开户城市:" prop="city">
                  <el-select
                    v-model="accountItem.city"
                    @change="changeAccountCity"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in cityAccountList"
                      :key="index"
                      :label="item.cityName"
                      :value="item.cityCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行:" prop="bankid">
                  <el-select
                    v-model="accountItem.bankid"
                    @change="changeBank"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in bankList"
                      :key="index"
                      :label="item.bankname"
                      :value="item.bankcode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行支行:" prop="branchid">
                  <el-select v-model="accountItem.branchid" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in bankBranchList"
                      :key="index"
                      :label="item.branchName"
                      :value="item.branchId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="证件类型:" prop="idcardtype">
                  <el-select v-model="accountItem.idcardtype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in idcardtypeAccountList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码:" prop="idcard">
                  <el-input v-model="accountItem.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持卡人地址:" prop="address">
                  <el-input v-model="accountItem.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="12">
                <el-form-item label="证件有效期:" prop="bcvaliddate">
                  <el-date-picker
                    v-model="accountItem.bcvaliddate"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="银行预留手机号:" prop="tel">
                  <el-input v-model="accountItem.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号:" prop="accountcode">
                  <el-input v-model="accountItem.accountcode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="通道类型:" prop="tempcode">
                  <el-select v-model="accountItem.tempcode" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in tempcodeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="银行卡正面:" prop="accountfrontimg">
                  <upload-file
                    :param="accountfrontimg"
                    :cosImage="accountItem.accountfrontimg"
                    @catchData="ChildToParentaccountfrontimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡反面:" prop="accountbackimg">
                  <upload-file
                    :param="accountbackimg"
                    :cosImage="accountItem.accountbackimg"
                    @catchData="ChildToParentaccountbackimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="okFun">提 交</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import uploadDefault from "@/assets/img/uploadImage.png";
import uploadFile from "@/components/common/uploadFile/index.vue";
export default {
  name: "childMerchantAdd",
  components: { "upload-file": uploadFile },
  data() {
    return {
      id: "",
      accept: [".jpg", ".jpeg", ".png"],
      uploadDefault: uploadDefault,
      accountItem: {
        serprocode: "",
        accountname: "",
        accounttype: "",
        province: "",
        city: "",
        bankid: "",
        bankname: "",
        branchid: "",
        branchname: "",
        idcardtype: "",
        idcard: "",
        bcvalidstartdate: "",
        bcvalidenddate: "",
        accountcode: "",
        tel: "",
        address: "",
        tempcode: "",
        accountfrontimg: "",
        file: "",
        accountbackimg: "",
        status: 0,
        bcvaliddate: [],
        flag: ""
      },
      accountfrontimg: "accountfrontimg",
      accountbackimg: "accountbackimg",
      provinceList: [],
      cityAccountList: [],
      bankList: [],
      bankBranchList: [],
      tempcodeList: [
        { label: "银联", value: "11" },
        { label: "联动", value: "14" }
      ],
      idcardtypeAccountList: [
        { label: "身份证", value: "1" },
        { label: "护照", value: "2" },
        { label: "军人证", value: "3" }
      ],
      accounttypeList: [
        { label: "对公", value: "1" },
        { label: "对私法人", value: "2" },
        { label: "对私非法人", value: "3" }
      ],
      accountItemRules: {
        accountname: [
          { required: true, message: "请输入开户人姓名", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入银行预留手机哈", trigger: "blur" }
        ],
        accountcode: [
          { required: true, message: "请输入银行卡账号", trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入持卡人地址", trigger: "blur" }
        ],
        accounttype: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        province: [
          { required: true, message: "请选择开户省份", trigger: "change" }
        ],
        city: [
          { required: true, message: "请选择开户城市", trigger: "change" }
        ],
        bankid: [
          { required: true, message: "请选择开户银行", trigger: "change" }
        ],
        branchid: [
          { required: true, message: "请选择开户银行支行", trigger: "change" }
        ],
        idcardtype: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        tempcode: [
          { required: true, message: "请选择通道类型", trigger: "change" }
        ],
        bcvaliddate: [
          { required: true, message: "请选择证件有效期", trigger: "change" }
        ],
        accountfrontimg: [
          { required: true, message: "请选择银行卡正面", trigger: "change" }
        ],
        accountbackimg: [
          { required: true, message: "请选择银行卡反面", trigger: "change" }
        ]
      }
    };
  },
  created() {
    let that = this;
    that.id = that.$route.query.id;
    if (that.id) {
      that.loadData();
    }
    that.queryBasedatamgProvince();
    that.loadBankList();
  },
  methods: {
    loadData() {
      let that = this;
      that.accountItem.serprocode = that.id;
      let params = {};
      params["serProCode"] = that.id;
      Server.post(Path.querySerProByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          
          that.accountItem.accountfrontimg = data.serProImage.accountfrontimg;
          that.accountItem.accountbackimg = data.serProImage.accountbackimg;
          that.accountItem.accounttype = data.serProBank.accounttype;
          that.accountItem.province = data.serProBank.province;
          if (that.accountItem.province) {
            that.changeAccountProvince(that.accountItem.province);
          }
          that.accountItem.city = data.serProBank.city;
          that.accountItem.bankid = data.serProBank.bankid
            ? parseInt(data.serProBank.bankid)
            : "";
          if (that.accountItem.city && that.accountItem.bankid) {
            that.changeBank(that.accountItem.bankid);
          }
          that.accountItem.branchid = data.serProBank.branchid;
          that.accountItem.accountcode = data.serProBank.accountcode;
          that.accountItem.accountname = data.serProBank.accountname;
          that.accountItem.idcardtype = data.serProBank.idcardtype;
          that.accountItem.idcard = data.serProBank.idcard;
          that.accountItem.bcvaliddate.push(
            data.serProBank.bcvalidstartdate
              ? data.serProBank.bcvalidstartdate
              : ""
          );
          that.accountItem.bcvaliddate.push(
            data.serProBank.bcvalidenddate ? data.serProBank.bcvalidenddate : ""
          );
          that.accountItem.address = data.serProBank.address;
          that.accountItem.tel = data.serProBank.tel;
        }
      });
    },
    okFun() {
      let that = this;
      // let params = {};
      that.$refs.accountItem.validate(async valid => {
        if (valid) {
          Server.post(Path.addSubSerpro, that.accountItem, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.$message.success("操作成功!");
              that.goBack();
            } else {
              that.$message.warning(msg);
            }
          });
        }
      });
    },
    ChildToParentaccountfrontimg(val) {
      let that = this;
      that.accountItem.accountfrontimg = val;
    },
    ChildToParentaccountbackimg(val) {
      let that = this;
      that.accountItem.accountbackimg = val;
    },
    queryBasedatamgProvince() {
      let that = this;
      Server.post(Path.queryBasedatamgProvince, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.provinceList = data;
        }
      });
    },
    changeAccountProvince(val) {
      let that = this;
      // 重选省份的时候，城市和开户银行支行设置为空
      that.accountItem.city = "";
      that.accountItem.branchid = "";
      that.bankBranchList = [];
      Server.post(
        Path.queryBasedatamgCityByPrCode,
        { provinceCode: val },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.cityAccountList = data;
          }
        }
      );
    },
    // 根据城市城市支行的列表
    changeAccountCity(val) {
      let that = this;
      that.bankBranchList = [];
      if (that.accountItem.bankid) {
        that.changeBank(that.accountItem.bankid);
      }
    },
    loadBankList() {
      let that = this;
      Server.post(Path.queryBasedatamqBanktypeList, { twoCode: "-" }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.bankList = data;
        }
      });
    },
    changeBank(val) {
      let that = this;
      that.accountItem.branchid = "";
      Server.post(
        Path.queryBasedatamgBanksList,
        { bkCode: val, cityCode: that.accountItem.city },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.bankBranchList = data;
          }
        }
      );
    },
    goBack() {
      let that = this;
      that.$router.go(-1);
      // that.$router.push({
      //   path: "/merchantNetwork",
      //   query: {}
      // });
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
.upload-contain {
  height: 160px;
}
.upload-contain > img {
  width: 100%;
  height: 100%;
}
</style>
