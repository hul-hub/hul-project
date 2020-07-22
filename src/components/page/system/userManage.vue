<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="80px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="账号名称:" class="query-form-item">
                <el-input v-model="query.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户名称:" class="query-form-item">
                <el-input v-model="query.loginname"></el-input>
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
          v-if="hasPerm('user_create')"
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
        <el-table-column prop="usercode" label="ID" min-width="120" align="center"></el-table-column>
        <el-table-column prop="username" min-width="160" label="账户名称" align="center"></el-table-column>
        <el-table-column prop="loginname" label="用户名称" min-width="100" align="center"></el-table-column>
        <el-table-column prop="creatdate" label="注册时间" min-width="100" align="center"></el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roleVo.rolename}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户状态" min-width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="1"
              inactive-value="2"
              @change="changeSwitch(scope.row.status,scope.row.usercode)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="hasPerm('user_update')"
            >编辑</el-button>
            <el-button type="primary" size="small" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
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
        :title="userItem.usercode?'编辑':'新增'"
      >
        <el-form ref="userItem" :model="userItem" :rules="rules" label-width="110px">
          <el-form-item label="账户名称：" prop="username">
            <el-input v-model="userItem.username"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：" prop="loginname">
            <el-input v-model="userItem.loginname"></el-input>
          </el-form-item>
          <el-form-item label="用户密码：" prop="pwd">
            <el-input type="password" v-model="userItem.pwd"></el-input>
          </el-form-item>
          <el-form-item label="用户角色：" prop="rid">
            <el-select v-model="userItem.rid" placeholder="请选择" style="width:100%">
              <el-option
                v-for="(item,index) in roleList"
                :key="index"
                :label="item.rolename"
                :value="item.rolecode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属商户：" prop="serprocode">
            <el-select v-model="userItem.serprocode" placeholder="请选择" style="width:100%">
              <el-option
                v-for="(item,index) in toSerproList"
                :key="index"
                :label="item.serproname"
                :value="item.serprocode"
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

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "userManage",
  data() {
    return {
      toSerproList: [],
      query: {
        username: "", // 账号名称
        loginname: "" //用户名称
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      userItem: {
        usercode: "",
        username: "",
        loginname: "",
        pwd: "",
        rid: "",
        serprocode: ""
      },
      roleList: [],
      rules: {
        username: [
          { required: true, message: "请输入账户名称", trigger: "blur" }
        ],
        loginname: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
        rid: [{ required: true, message: "请选择用户角色", trigger: "change" }],
        serprocode: [
          { required: true, message: "请选择所属商户", trigger: "change" }
        ]
      },
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.loadRoleList();
    that.querySerProListByCode();
  },
  methods: {
    querySerProListByCode() {
      let that = this;
      let params = {};
      params["token"] = localStorage.getItem("tokenData");
      params["serviceType"] = 2;
      Server.post(Path.querySerProListByCode, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
    },
    resetUserItem() {
      let that = this;
      that.userItem = {
        usercode: "",
        username: "",
        loginname: "",
        pwd: "",
        rid: "",
        serprocode: ""
      };
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.resetUserItem();
      that.$refs.userItem.resetFields();
    },
    // 保存编辑
    saveEdit() {
      let that = this;
      that.$refs.userItem.validate(valid => {
        if (valid) {
          let url = "";
          let params = {};
          if (that.userItem.usercode) {
            url = Path.updUser;
            params["usercode"] = that.userItem.usercode;
          } else {
            url = Path.addUser;
          }
          params["username"] = that.userItem.username;
          params["loginname"] = that.userItem.loginname;
          params["pwd"] = that.userItem.pwd;
          params["rid"] = that.userItem.rid;
          params["serprocode"] = that.userItem.serprocode;
          Server.post(url, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisible = false;
              that.loadData();
              that.$message.success("操作成功!");
            }
          });
        }
      });
    },
    changeSwitch(status, usercode) {
      let that = this;
      Server.post(
        Path.updateStatus,
        { status: status, usercode: usercode },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success("状态更新成功!");
            that.loadData();
          }
        }
      );
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
        username: "",
        loginname: ""
      };
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      that.loadData();
    },
    loadRoleList() {
      let that = this;
      Server.post(Path.queryRoleList, { page: 1, limit: 999 }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.roleList = data;
        }
      });
    },
    loadData() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      params["username"] = that.query.username;
      params["loginname"] = that.query.loginname;
      Server.post(Path.queryUserList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    // 删除操作
    resetPwd(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要重置该用户密码吗？点击确定则重置该用户密码！",
          "重置密码",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(Path.resetPwd, { usercode: row.usercode }, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.loadData();
              that.$message.success("密码重置成功！密码：123456");
            }
          });
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      console.log(row);
      let that = this;
      // that.userItem = row;
      that.userItem.usercode = row.usercode;
      that.userItem.username = row.username;
      that.userItem.loginname = row.loginname;
      that.userItem.pwd = row.pwd;
      that.userItem.rid = row.roleVo.rolecode;
      that.userItem.serprocode = row.roleVo.serprocode;
      that.editVisible = true;
      console.log(that.userItem);
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
</style>
