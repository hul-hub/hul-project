<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-circle-plus-outline"
          class="handle-del mr10"
          @click="editVisible = true"
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
        <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="角色状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="1"
              inactive-value="0"
              @change="changeSwitch(scope.row.status,scope.row.rolecode)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="primary"
              size="small"
              @click="handlePermiss(scope.$index, scope.row)"
            >分配权限</el-button>
            <!-- 删除为更新角色状态，所以没有放出来。 -->
            <!-- <el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增编辑 -->
    <Modal
      v-model="editVisible"
      :closable="false"
      :mask-closable="false"
      :title="roleItem.rolecode?'编辑':'新增'"
    >
      <el-form ref="roleItem" :model="roleItem" :rules="rules" label-width="110px">
        <el-form-item label="角色名称：" prop="rolename">
          <el-input v-model="roleItem.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色状态：">
          <!-- <el-switch v-model="roleItem.status" :active-value="'1'" :inactive-value="'0'"></el-switch> -->
          <el-radio class="radio" v-model="roleItem.status" label="1">开启</el-radio>
          <el-radio class="radio" v-model="roleItem.status" label="0">关闭</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </Modal>
    <Modal v-model="permissVisible" :closable="false" :mask-closable="false" title="分配权限">
      <div>
        <el-tree
          node-key="id"
          show-checkbox
          :data="treeData"
          :props="defaultProps"
          :default-checked-keys="checkIds"
          :default-expanded-keys="defaultExpendedKeys"
          :check-strictly="true"
          ref="tree"
          highlight-current
        ></el-tree>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="permissVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePermiss">确 定</el-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "roleManage",
  data() {
    return {
      tableData: [],
      editVisible: false,
      permissVisible: false,
      roleItem: {
        rolecode: "",
        rolename: "",
        status: "1"
      },
      rules: {
        rolename: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      rolecode: "",
      checkIds: [],
      defaultExpendedKeys: [], // 默认展开的节点
      pidsArr: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  created() {
    let that = this;
    that.loadData();
  },
  methods: {
    changeSwitch(status, rolecode) {
      let that = this;
      Server.post(
        Path.updRoleStatus,
        { status: status, rolecode: rolecode },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success("状态更新成功!");
            that.loadData();
          }
        }
      );
    },
    loadData() {
      let that = this;
      Server.post(Path.queryRoleList, { page: 1, limit: 999 }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.tableData = data;
        }
      });
    },
    addRole() {
      let that = this;
      Server.post(Path.addRole, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          console.log(data);
        }
      });
    },
    // 删除操作
    handleDelete(index, row) {
      let that = this;
      that
        .$confirm("确定要删除该角色吗？点击确定则删除该选项！", "删除", {
          type: "warning"
        })
        .then(() => {
          Server.post(
            Path.updRoleStatus,
            { status: 0, rolecode: row.rolecode },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.$message.success("删除成功");
              }
            }
          );
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      let that = this;
      that.roleItem = Object.assign({}, row);
      that.editVisible = true;
    },
    // 目前没有做权限模块，强制将用户设置成管理员
    handlePermiss(index, row) {
      let that = this;
      that.checkIds = [];
      that.rolecode = row.rolecode;
      Server.post(
        Path.initPermissionByRoleId,
        { rolecode: row.rolecode },
        res => {
          let { code, data, msg } = res;
          that.permissVisible = true;
          if (code == 0) {
            var tree = that.toTree(data);
            // console.log(tree);
            // console.log(JSON.stringify(tree));
            let checkIds = [];
            let defaultExpendedKeys = [];
            // 有时候有返回后台管理系统，有时候没有返回。
            if (tree[0].children) {
              that.treeData = tree[0].children;
              that.checkNode(tree[0].children, checkIds);
              that.checkDefault(tree[0].children, defaultExpendedKeys);
            } else {
              that.treeData = tree;
              that.checkNode(tree, checkIds);
              that.checkDefault(tree, defaultExpendedKeys);
            }
            that.checkIds = checkIds;
            // 只展开二级数节点
            that.defaultExpendedKeys = defaultExpendedKeys;

            // checkIds.filter(function(id, index, self) {
            //   that.$refs.tree.setChecked(id, true, false);
            // });
            // console.log(checkIds);
          }
        }
      );
    },
    checkNode(data, checkIds) {
      let me = this;
      for (let menu of data) {
        if (menu.checkArr == 1) {
          checkIds.push(menu.id);
        }
        if (menu.children) {
          me.checkNode(menu.children, checkIds);
        }
      }
    },
    checkDefault(data, defaultExpendedKeys) {
      let me = this;
      for (let menu of data) {
        if (menu.checkArr == 1) {
          defaultExpendedKeys.push(menu.id);
        }
      }
    },
    toTree(data) {
      let result = [];
      if (!Array.isArray(data)) {
        return result;
      }
      data.forEach(item => {
        delete item.children;
      });
      let map = {};
      data.forEach(item => {
        map[item.id] = item;
      });
      // console.log(map);
      data.forEach(item => {
        let parent = map[item.parentId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    },
    savePermiss() {
      let that = this;
      let pidsArr = that.$refs.tree
        .getCheckedNodes(false, true)
        .map(function(item, index, arr) {
          return item.id;
        });
      console.log(pidsArr);
      var params = "roleCode=" + that.rolecode;
      //1 没有返回值
      pidsArr.forEach((item, index, array) => {
        //执行代码
        params += "&pids=" + item;
      });
      console.log(params);

      Server.postObj(Path.saveRolePermission, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.permissVisible = false;
        }
      });
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.$refs.roleItem.resetFields();
    },
    // 保存编辑
    saveEdit() {
      let that = this;
      that.$refs.roleItem.validate(valid => {
        if (valid) {
          let url = "";
          let params = {};
          if (that.roleItem.rolecode) {
            url = Path.updRole;
            params["rolecode"] = that.roleItem.rolecode;
          } else {
            url = Path.addRole;
          }
          params["rolename"] = that.roleItem.rolename;
          params["status"] = that.roleItem.status;
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
