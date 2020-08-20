<template>
  <div class="tab-container">
    <div class="search marginTwo">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <span class="detail-title">商户详情</span>
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
        <el-tab-pane label="商户基本信息">
          <div>
            <div class="left-item">
              <p>
                <span>商户名称：</span>
                &nbsp;&nbsp;
                {{serproItem.serproname}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>商户编号：</span>
                &nbsp;&nbsp;
                {{serproItem.serprocode}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>商户简称：</span>
                &nbsp;&nbsp;
                {{serproItem.serproshortname}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>所属服务商：</span>
                &nbsp;&nbsp;
                {{serproItem.upSerProName}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>详细地址：</span>
                &nbsp;&nbsp;
                {{serproItem.address}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>客服电话：</span>
                &nbsp;&nbsp;
                {{serproItem.phone}}
              </p>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="渠道号配置">
          <div class="left-item" style="display:flex">
            <p style="display:flex;align-items:center;">
              <span>渠道号：</span>
              &nbsp;&nbsp;
              <el-input v-model="temItem.routeid" :disabled="isRouteId"></el-input>
            </p>
            <div style="margin-left:20px;">
              <el-button type="primary" v-if="isRouteId" @click="isRouteId = false">修改</el-button>
              <el-button type="primary" v-if="!isRouteId" @click="routeOkFun">确定</el-button>
              <el-button type="primary" v-if="!isRouteId" @click="isRouteId = true">取消</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商户通道">
          <el-table
            :data="tableTemplate"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
            <el-table-column prop="routename" label="通道名称" min-width="120" align="center"></el-table-column>
            <el-table-column label="费率类型" min-width="200" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.hasmorefeerate==1?"多费率":"单费率"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="feerate" label="成本费率" min-width="200" align="center"></el-table-column>
            <el-table-column prop="feeratedown" label="下游费率" min-width="200" align="center"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="第三方通道">
          <el-table
            :data="tableTemplateMess"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
            <el-table-column prop="templateName" label="通道名称" min-width="120" align="center"></el-table-column>
            <el-table-column prop="routeSecretKey" label="密钥" min-width="200" align="center"></el-table-column>
            <el-table-column label="操作" max-width="110" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="addSecretkeyFun(scope.$index, scope.row,1)"
                >更新密钥</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="子商户信息">
          <el-table
            :data="tableSubSerpro"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
            <el-table-column prop="subAccountId" label="子账号ID" min-width="140" align="center"></el-table-column>
            <el-table-column prop="subAccountName" label="子账号名称" min-width="200" align="center"></el-table-column>
            <el-table-column prop="routeSecretKey" label="子账号密钥" min-width="200" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="100" align="center"></el-table-column>
            <el-table-column label="操作" max-width="110" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="addSecretkeyFun(scope.$index, scope.row,2)"
                >更新密钥</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑弹出框 -->
    <template>
      <Modal v-model="templateVisible" :closable="false" :mask-closable="false" title="更新密钥">
        <el-form
          ref="templateItem"
          :model="templateItem"
          :rules="templateItemRules"
          label-width="110px"
        >
          <el-form-item label="通道渠道：" prop="templatecode">
            <el-select v-model="templateItem.templatecode" placeholder="请选择" style="width:100%">
              <el-option
                v-for="(item,index) in routeTemplateList"
                :key="index"
                :label="item.flag"
                :value="item.templatecode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户密钥：" prop="routesecretkey">
            <el-input v-model="templateItem.routesecretkey"></el-input>
          </el-form-item>
          <el-form-item label="appId：">
            <el-input v-model="templateItem.appid"></el-input>
          </el-form-item>
          <el-form-item label="openId：">
            <el-input v-model="templateItem.openid"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelTemplateFun">取 消</el-button>
          <el-button type="primary" @click="saveTemplateFun">确 定</el-button>
        </div>
      </Modal>
      <Modal v-model="subVisible" :closable="false" :mask-closable="false" title="更新子商户密钥">
        <el-form ref="subItem" :model="subItem" :rules="subItemRules" label-width="110px">
          <el-form-item label="子商户密钥：" prop="routeSecretKey">
            <el-input v-model="subItem.routeSecretKey"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelSubFun">取 消</el-button>
          <el-button type="primary" @click="saveSubFun">确 定</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "merchantCodeDetail",
  components: {},
  data() {
    return {
      id: "",
      tableData: [],
      tableTemplate: [],
      tableTemplateMess: [],
      routeTemplateList: [],
      templateVisible: false,
      subVisible: false,
      isRouteId: true,
      templateItem: {
        templatecode: "",
        serprocode: "",
        routesecretkey: "",
        appid: "",
        openid: "",
        routeid: "",
      },
      subItem: {
        id: "",
        routeSecretKey: "",
      },
      temItem: {
        routeid: "",
      },
      templateItemRules: {
        templatecode: [
          { required: true, message: "请选择通道渠道", trigger: "change" },
        ],
        routesecretkey: [
          { required: true, message: "请输入商户密钥", trigger: "blur" },
        ],
      },
      subItemRules: {
        routeSecretKey: [
          { required: true, message: "请输入子商户密钥", trigger: "blur" },
        ],
      },
      tableSubSerpro: [],
      serproItem: {
        serproname: "",
        serproshortname: "",
        upSerProName: "",
        address: "",
        phone: "",
        serprocode: "",
      },
    };
  },
  created() {
    let that = this;
    that.id = that.$route.query.id;
    that.querySerProByCode();
    that.templatelist();
    that.templatelistMess();
    that.getRouteTemplateList();
    that.listSubSerpro();
    // that.loadData();
  },
  methods: {
    goBack() {
      let that = this;
      that.$router.go(-1);
    },
    listSubSerpro() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 99;
      params["serProCode"] = that.id;
      Server.post(Path.listSubSerpro, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableSubSerpro = data;
        }
      });
    },
    templatelistMess() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 99;
      params["serProCode"] = that.id;
      Server.post(Path.templatelistMess, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableTemplateMess = data;
          if (data.length > 0) {
            for (let item of data) {
              // console.log(item);
              if (item.templatecode == "12") {
                that.temItem.routeid = item.routeId;
              }
            }
          }
        }
      });
    },
    templatelist() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 99;
      params["serProCode"] = that.id;
      Server.post(Path.queryRouteListByCode, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableTemplate = data;
        } else {
          that.tableTemplate = [];
        }
      });
    },
    getRouteTemplateList() {
      let that = this;
      let params = {};
      Server.post(Path.getRouteTemplateList, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.routeTemplateList = data;
        }
      });
    },
    cancelTemplateFun() {
      let that = this;
      that.templateVisible = false;
      that.templateItem = {
        templatecode: "",
        serprocode: "",
        routesecretkey: "",
        appid: "",
        openid: "",
        routeid: "",
      };
      that.$refs.templateItem.resetFields();
    },
    routeOkFun() {
      let that = this;
      let params = {};
      // console.log(that.id)
      params["templatecode"] = "12";
      params["serprocode"] = that.id;
      params["routeid"] = that.temItem.routeid;

      Server.post(Path.saveRouteTemplate, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.isRouteId = true;
          that.templatelistMess();
          that.$message.success("操作成功!");
        } else {
          that.$message.error(msg);
        }
      });
    },
    // 保存编辑
    saveTemplateFun() {
      let that = this;
      that.$refs.templateItem.validate((valid) => {
        if (valid) {
          let url = "";
          let params = {};
          params["templatecode"] = that.templateItem.templatecode;
          params["serprocode"] = that.id;
          params["routesecretkey"] = that.templateItem.routesecretkey;
          params["appid"] = that.templateItem.appid;
          params["openid"] = that.templateItem.openid;
          params["routeid"] = that.templateItem.routeid;
          Server.post(Path.insertRouteKey, params, (res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.cancelTemplateFun();
              that.templatelistMess();
              that.$message.success("操作成功!");
            } else {
              that.$message.error(msg);
            }
          });
        }
      });
    },
    cancelSubFun() {
      let that = this;
      that.subVisible = false;
      that.subItem = {
        id: "",
        routeSecretKey: "",
      };
      that.$refs.subItem.resetFields();
    },
    // 保存编辑
    saveSubFun() {
      let that = this;
      that.$refs.subItem.validate((valid) => {
        if (valid) {
          let url = "";
          let params = {};
          params["id"] = that.subItem.id;
          params["routeSecretKey"] = that.subItem.routeSecretKey;
          Server.post(Path.insertSubRouteKey, params, (res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.cancelSubFun();
              that.listSubSerpro();
              that.$message.success("操作成功!");
            } else {
              that.$message.error(msg);
            }
          });
        }
      });
    },
    querySerProByCode() {
      let that = this;
      Server.post(Path.querySerProByCode, { serProCode: that.id }, (res) => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          // that.serproItem = data;
          that.serproItem.serproname = data.serproname;
          that.serproItem.serproshortname = data.serproshortname;
          that.serproItem.upSerProName = data.upSerProName;
          that.serproItem.phone = data.phone;
          that.serproItem.serprocode = data.serprocode;
          that.serproItem.address = data.serProAddress.address;
        }
      });
    },
    // 删除操作
    addSecretkeyFun(index, row, type) {
      let that = this;
      if (type == 1) {
        // 通道
        that.templateVisible = true;
        that.templateItem.routeid = row.routeId;
      } else if (type == 2) {
        that.subVisible = true;
        that.subItem.id = row.id;
      }
    },
  },
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
