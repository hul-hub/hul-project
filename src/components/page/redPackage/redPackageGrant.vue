<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form
          :model="grantItem"
          label-width="90px"
          label-position="left"
          size="small"
          class="form"
        >
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="渠道:" class="query-form-item">
                <el-select
                  v-model="grantItem.type"
                  @change="selectGrant"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in templateList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="红包类型:" class="query-form-item">
                <el-select
                  v-model="grantItem.hbType"
                  @change="selectGrant"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in redPackageTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div class="container" v-if="isFlag">
      <div class="content-title">
        <span>红包信息</span>
      </div>
      <div class="hb-content">
        <el-form ref="hbItem" :model="hbItem" :rules="hbItemRules" label-width="100px">
          <el-form-item label="商户名称:" prop="serprocode">
            <el-col :span="10">
              <el-select
                v-model="hbItem.serprocode"
                @change="changeSer"
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
            </el-col>
          </el-form-item>
          <el-form-item label="活动名称:" prop="actName">
            <el-col :span="10">
              <el-input v-model="hbItem.actName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="祝福语:" prop="wishing">
            <el-col :span="10">
              <el-input v-model="hbItem.wishing"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-col :span="10">
              <el-input v-model="hbItem.remark"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="使用场景:" prop="sceneId">
            <el-col :span="10">
              <el-select v-model="hbItem.sceneId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="(item,index) in sceneList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="接收人信息:">
            <el-button type="primary" @click="addUser">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-form
              style="margin-top:10px;"
              ref="userItem"
              :model="userItem"
              label-position="left"
            >
              <div
                v-for="(item, index) in userItem.userList"
                :key="index"
                style="margin-bottom:20px"
              >
                <el-row :gutter="32">
                  <el-col :span="6">
                    <el-form-item
                      label="用户openid:"
                      :rules="[{ required: true, message: '用户openid不能为空' }]"
                      :prop="'userList[' + index + '].reOpenid'"
                      label-width="100px"
                    >
                      <el-input v-model="item.reOpenid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      label="红包金额:"
                      :rules="[{ required: true, message: '红包金额不能为空' }]"
                      :prop="'userList[' + index + '].totalAmount'"
                      label-width="90px"
                    >
                      <el-input-number
                        v-model="item.totalAmount"
                        :controls="false"
                        :precision="2"
                        :min="0.01"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" v-if="grantItem.hbType == 'GROUP'">
                    <el-form-item
                      label="发放总人数:"
                      :rules="[{ required: true, message: '发放总人数不能小于1' }]"
                      :prop="'userList[' + index + '].totalNum'"
                      label-width="100px"
                    >
                      <el-input-number
                        v-model="item.totalNum"
                        :controls="false"
                        :precision="0"
                        :min="1"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <span @click="delUser(index)" style="cursor: pointer;">
                    <i class="el-icon-remove-outline"></i>
                  </span>
                </el-row>
              </div>
              <el-row style="margin-top:30px;">
                <el-button type="primary" @click="okFun">保存并发放红包</el-button>
              </el-row>
            </el-form>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "redPackageGrant",
  data() {
    return {
      serProList: [],
      grantItem: { type: "", hbType: "" },
      templateList: [{ label: "微信", value: "wx" }],
      redPackageTypeList: [
        { label: "普通红包", value: "NOMAL" },
        { label: "裂变红包", value: "GROUP" }
      ],
      sceneList: [
        { label: "商品促销", value: "PRODUCT_1" },
        { label: "抽奖", value: "PRODUCT_2" },
        { label: "虚拟物品兑奖 ", value: "PRODUCT_3" },
        { label: "企业内部福利", value: "PRODUCT_4" },
        { label: "渠道分润", value: "PRODUCT_5" },
        { label: "保险回馈", value: "PRODUCT_6" },
        { label: "彩票派奖", value: "PRODUCT_7" },
        { label: "税务刮奖", value: "PRODUCT_8" }
      ],
      isFlag: false,
      hbItem: {
        actName: "", // 活动名称
        amtType: "ALL_RAND", //红包金额设置方式，默认ALL_RAND，裂变红包存在。
        clientIp: "", // id地址
        mch_hb_orderid: "", //红包订单号
        msgAppid: "", //触达用户appid 暂时不用填写
        remark: "", // 备注
        riskInfo: "", //活动信息(非必填)
        sceneId: "", //场景id
        sendName: "", // 商户名称
        serprocode: "", //商户编码
        // 红包金额
        //红包发放总人数
        wishing: "" //红包祝福语
      },
      userItem: {
        userList: [{ reOpenid: "", totalAmount: 0.01, totalNum: 1 }]
      },
      hbItemRules: {
        serprocode: [
          { required: true, message: "请选择商户名称", trigger: "change" }
        ],
        actName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        wishing: [{ required: true, message: "请输入祝福语", trigger: "blur" }],
        remark: [
          { required: true, message: "请输入红包备注", trigger: "blur" }
        ],
        sceneId: [
          { required: true, message: "请选择红包场景", trigger: "change" }
        ]
      }
    };
  },
  created() {
    let that = this;
    that.loadSerproList();
  },
  methods: {
    changeSer(val) {
      let that = this;
      var itemArr = that.serProList.filter(function(element, index, arr) {
        return element.serprocode == val;
      });
      // console.log(itemArr);
      that.hbItem.sendName = itemArr[0].serproname;
    },
    okFun() {
      let that = this;
      let flag = true;
      that.$refs.hbItem.validate(valid => {
        if (valid) {
        } else {
          flag = false;
        }
      });
      that.$refs.userItem.validate(valid => {
        if (valid) {
        } else {
          flag = false;
        }
      });
      let list = [];
      if (flag) {
        for (let item of that.userItem.userList) {
          var params = {};
          params["actName"] = that.hbItem.actName;
          if (that.grantItem.hbType == "GROUP") {
            params["amtType"] = that.hbItem.amtType;
            params["totalNum"] = item.totalNum;
          } else {
            params["totalNum"] = 1;
          }
          params["clientIp"] = "192.168.101.31";
          params["mch_hb_orderid"] = that.ran(24);
          params["msgAppid"] = "";
          params["riskInfo"] = "";
          params["sceneId"] = that.hbItem.sceneId;
          params["sendName"] = that.hbItem.sendName;
          params["serprocode"] = that.hbItem.serprocode;
          params["wishing"] = that.hbItem.wishing;
          params["totalAmount"] = item.totalAmount * 100;
          params["reOpenid"] = item.reOpenid;
          list.push(params);
        }
        Server.postJson(Path.sendBatchRedPacket, JSON.stringify(list), res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success(msg);
          } else {
            that.$message.error(msg);
          }
        });
      }
    },
    ran(n) {
      var chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    },
    addUser() {
      let that = this;
      let item = { reOpenid: "", totalAmount: 0.01, totalNum: 1 };
      that.userItem.userList.push(item);
    },
    delUser(index) {
      let that = this;
      if (that.userItem.userList.length == 1) {
        that.$message.warning("接受人信息至少保留一行！");
        return;
      }
      that.userItem.userList.splice(index, 1);
    },
    selectGrant() {
      let that = this;
      if (that.grantItem.type && that.grantItem.hbType) {
        that.isFlag = true;
        return;
      }
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
.content-title {
  border-bottom: 1px solid #d1d1d1;
  font-size: 16px;
  font-weight: 550;
}
.content-title > span {
  margin-bottom: 10px;
  display: inline-block;
  margin-left: 10px;
}
.hb-content {
  margin-top: 20px;
}
.el-input-number {
  width: auto !important;
}
</style>
