<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="80px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="用户名称:" class="query-form-item">
                <el-input v-model="query.username"></el-input>
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
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          class="handle-del mr10"
          @click="addFun"
          v-if="hasPerm('addOrdermgVestinMain')"
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
        <el-table-column prop="userName" label="用户名称" min-width="100" align="center"></el-table-column>
        <el-table-column prop="deskCode" label="桌号" min-width="100" align="center"></el-table-column>
        <el-table-column prop="deskName" label="桌名" min-width="100" align="center"></el-table-column>
        <el-table-column prop="deskDesc" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              v-if="hasPerm('delOrdermgVestinMain')"
              @click="delFun(scope.$index, scope.row)"
            >导出二维码</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="hasPerm('updOrdermgVestinMain')"
            >编辑</el-button>
            <el-button
              type="primary"
              size="small"
              v-if="hasPerm('delOrdermgVestinMain')"
              @click="delFun(scope.$index, scope.row)"
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

    <!-- 编辑弹出框 -->
    <template>
      <Modal
        v-model="editVisible"
        :closable="false"
        :mask-closable="false"
        :title="sceneItem.id?'编辑':'新增'"
      >
        <el-form ref="sceneItem" :model="sceneItem" :rules="rules" label-width="110px">
          <el-form-item label="桌号：" prop="deskCode">
            <el-input v-model="sceneItem.deskCode"></el-input>
          </el-form-item>
          <el-form-item label="桌名：" prop="deskName">
            <el-input v-model="sceneItem.deskName"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：" prop="userCode">
            <el-select
              v-model="sceneItem.userCode"
              @change="changeUser"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="(item,index) in userList"
                :key="index"
                :label="item.username"
                :value="item.usercode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="sceneItem.deskDesc"></el-input>
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

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "sceneManage",
  data() {
    return {
      query: {
        username: "", //用户名称
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      sceneItem: {
        id: "",
        deskCode: "",
        deskName: "",
        deskDesc: "",
        userCode: "",
        userName: "",
        qrcodeUrl: "",
      },
      rules: {
        deskCode: [
          { required: true, message: "请输入桌号", trigger: "blur" },
          {
            pattern: /^\d{1,4}$/,
            message: "请输入1-4位数字",
            trigger: "blur",
          },
        ],
        deskName: [{ required: true, message: "请输入桌名", trigger: "blur" }],
        userCode: [
          { required: true, message: "请选择用户名称", trigger: "change" },
        ],
      },
      userList: [],
      editVisible: false,
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.loadUserList();
  },
  methods: {
    changeUser(val) {
      let that = this;
      let arr = that.userList.filter((element, index, self) => {
        return element.usercode == val;
      });
      that.sceneItem.userName = arr[0].username;
    },
    addFun() {
      let that = this;
      that.editVisible = true;
    },
    resetUserItem() {
      let that = this;
      that.sceneItem = {
        id: "",
        deskCode: "",
        deskName: "",
        deskDesc: "",
        userCode: "",
        userName: "",
        qrcodeUrl: "",
      };
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.resetUserItem();
      that.$refs.sceneItem.resetFields();
    },
    // 保存编辑
    saveEdit() {
      let that = this;
      that.$refs.sceneItem.validate((valid) => {
        if (valid) {
          let url = "";
          let params = {};
          if (that.sceneItem.id) {
            url = Path.updOrdermgVestinMain;
            params["id"] = that.sceneItem.id;
          } else {
            url = Path.addOrdermgVestinMain;
          }
          params["deskCode"] = that.sceneItem.deskCode;
          params["deskName"] = that.sceneItem.deskName;
          params["deskDesc"] = that.sceneItem.deskDesc;
          params["userCode"] = that.sceneItem.userCode;
          params["userName"] = that.sceneItem.userName;
          params["qrcodeUrl"] = that.sceneItem.qrcodeUrl;
          Server.post(url, params, (res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisible = false;
              that.loadData();
              that.cancelEdit();
              that.$message.success("操作成功!");
            } else {
              that.$message.error(msg);
            }
          });
        }
      });
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
        username: "",
      };
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    loadUserList() {
      let that = this;
      let params = {};
      params["page"] = 1;
      params["limit"] = 999;
      Server.post(Path.queryUserList, params, (res) => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.userList = data;
        }
      });
    },
    loadData() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["userName"] = that.query.username;
      Server.post(Path.getOrdermgVestinMainPage, params, (res) => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    // 删除操作
    delFun(index, row) {
      let that = this;
      that
        .$confirm("确定要删除该场景吗？点击确定则删除该选项！", "删除", {
          type: "warning",
        })
        .then(() => {
          Server.post(Path.delOrdermgVestinMain, { code: row.id }, (res) => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.loadData();
              that.$message.success("删除成功");
            } else {
              that.$message.error(msg);
            }
          });
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      let that = this;
      that.sceneItem.id = row.id;
      that.sceneItem.deskCode = row.deskCode;
      that.sceneItem.deskName = row.deskName;
      that.sceneItem.userCode = row.userCode;
      that.sceneItem.userName = row.userName;
      that.sceneItem.deskDesc = row.deskDesc;
      that.editVisible = true;
    },
    // 分页导航
    handlePageChange(val) {
      let that = this;
      // that.$set(that.pageInfo, "pageIndex", 1);
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
