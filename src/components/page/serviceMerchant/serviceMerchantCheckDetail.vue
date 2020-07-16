<template>
  <div class="tab-container">
    <div class="search marginTwo">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <span class="detail-title">服务商通道详情</span>
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
        <el-tab-pane label="服务商基本信息">
          <div>
            <div class="left-item">
              <p>
                <span>服务商名称：</span>
                &nbsp;&nbsp;
                {{serproItem.serproname}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>服务商编码：</span>
                &nbsp;&nbsp;
                {{serproItem.serprocode}}
              </p>
            </div>
            <div class="left-item">
              <p>
                <span>服务商简称：</span>
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
        <el-tab-pane label="服务商通道">
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
      </el-tabs>
    </div>
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
      tableTemplate: [],
      serproItem: {
        serproname: "",
        serprocode: "",
        serproshortname: "",
        upSerProName: "",
        address: "",
        phone: ""
      }
    };
  },
  created() {
    let that = this;
    that.id = that.$route.query.id;
    that.templatelist();
    that.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      let params = {};
      params["serProCode"] = that.id;
      Server.post(Path.querySerProByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.serproItem.serproname = data.serproname;
          that.serproItem.serprocode = data.serprocode;
          that.serproItem.serproshortname = data.serproshortname;
          that.serproItem.upSerProName = data.upSerProName;
          that.serproItem.address = data.serProAddress.address;
          that.serproItem.phone = data.phone;
        }
      });
    },
    goBack() {
      let that = this;
      that.$router.go(-1);
    },
    templatelist() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 99;
      params["serProCode"] = that.id;
      Server.post(Path.queryRouteListByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableTemplate = data;
        } else {
          that.tableTemplate = [];
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
