<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="94px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属商户:">
                <el-select v-model="query.serprocode" placeholder="请选择" style="width:100%">
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
              <el-form-item label="设备状态:">
                <el-select v-model="query.isOpen" placeholder="请选择" style="width:100%">
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
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          class="handle-del mr10"
          @click="addFun"
          v-if="hasPerm('addSerpromgDeviceByCode')"
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
        <el-table-column prop="serproName" label="商户/用户名称" min-width="170" align="center"></el-table-column>
        <el-table-column prop="serprocode" label="商户/用户账号" min-width="150" align="center"></el-table-column>
        <el-table-column prop="deviceId" min-width="150" label="设备号" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="修改日期" min-width="90" align="center"></el-table-column>
        <el-table-column label="设备状态" min-width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isOpen"
              active-value="1"
              inactive-value="0"
              @change="changeSwitch(scope.row.isOpen,scope.row.id)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="edit(scope.$index, scope.row)"
              v-if="hasPerm('updateSerpromgDeviceByCode')"
            >编辑</el-button>
            <el-button
              type="primary"
              size="small"
              @click="del(scope.$index, scope.row)"
              v-if="hasPerm('delSerpromgDeviceByCode')"
            >删除</el-button>
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
        v-model="editVisible"
        :closable="false"
        :mask-closable="false"
        :title="mgItem.id?'编辑':'新增'"
      >
        <el-form ref="mgItem" :model="mgItem" :rules="rules" label-width="110px">
          <el-form-item label="商户/用户号：" prop="serprocode">
            <el-input v-model="mgItem.serprocode"></el-input>
          </el-form-item>
          <el-form-item label="设备号：" prop="deviceId">
            <el-input v-model="mgItem.deviceId"></el-input>
          </el-form-item>
          <el-form-item label="是否开启：">
            <el-select v-model="mgItem.isOpen" placeholder="请选择" style="width:100%">
              <el-option
                v-for="(item,index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
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
  name: "mgDeviceManage",
  components: {},
  data() {
    return {
      query: {
        isOpen: "",
        serprocode: "",
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      toSerproList: [],
      statusList: [
        { label: "开启", value: "1" },
        { label: "关闭", value: "0" },
      ],
      editVisible: false,
      mgItem: {
        id: "",
        serprocode: "",
        deviceId: "",
        isOpen: "1",
      },
      rules: {
        serprocode: [
          { required: true, message: "请输入商户/用户号", trigger: "blur" },
          {
            pattern: /^\d{5,30}$/,
            message: "请输入5-30位商户/用户号",
            trigger: "blur",
          },
        ],
        deviceId: [
          { required: true, message: "请输入设备号", trigger: "blur" },
        ],
      },
      qrcodeVisible: false,
      qrcodeUrl: "",
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  methods: {
    addFun() {
      let that = this;
      that.editVisible = true;
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.$refs.mgItem.resetFields();
      that.mgItem = {
        id: "",
        serprocode: "",
        deviceId: "",
        isOpen: "1",
      };
    },
    saveEdit() {
      let that = this;
      that.$refs.mgItem.validate((valid) => {
        if (valid) {
          let url = "";
          let params = {};
          if (that.mgItem.id) {
            url = Path.updateSerpromgDeviceByCode;
            params["id"] = that.mgItem.id;
          } else {
            url = Path.addSerpromgDeviceByCode;
          }
          params["serprocode"] = that.mgItem.serprocode;
          params["deviceId"] = that.mgItem.deviceId;
          params["isOpen"] = that.mgItem.isOpen;
          Server.post(url, params, (res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisible = false;
              that.loadData();
              that.$message.success(msg);
            } else {
              that.$message.error(msg);
            }
          });
        }
      });
    },
    changeSwitch(status, usercode) {
      let that = this;
      Server.post(
        Path.updateSerpromgDeviceByCode,
        { isOpen: status, id: usercode },
        (res) => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success("状态更新成功!");
            that.loadData();
          }
        }
      );
    },
    del(index, row) {
      let that = this;
      that
        .$confirm("确定要删除该设备吗？点击确定则删除该选项！", "删除", {
          type: "warning",
        })
        .then(() => {
          Server.post(Path.delSerpromgDeviceByCode, { id: row.id }, (res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.loadData();
              that.$message.success("删除成功!");
            }
          });
        })
        .catch(() => {});
    },
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
    queryFun: function () {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    refreshFun: function () {
      let that = this;
      that.query = {
        isOpen: "",
        serprocode: "",
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
      params["isOpen"] = that.query.isOpen;
      Server.post(Path.getSerpromgDevicePage, params, (res) => {
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
      Server.post(Path.querySerProListSelect, { serviceType: 2 }, (res) => {
        that.toSerproList = res;
      });
    },
    edit(index, row) {
      let that = this;
      that.mgItem.id = row.id;
      that.mgItem.serprocode = row.serprocode;
      that.mgItem.deviceId = row.deviceId;
      that.mgItem.isOpen = row.isOpen;
      that.editVisible = true;
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
    },
  },
  mounted() {},
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
