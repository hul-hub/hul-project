<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="74px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="消息标题:" class="query-form-item">
                <el-input v-model="query.noticetitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="消息内容:" class="query-form-item">
                <el-input v-model="query.noticecontent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发布时间:" class="query-form-item">
                <el-date-picker
                  v-model="query.startTime"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
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
          v-if="hasPerm('notice_add')"
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
        <el-table-column prop="createdate" label="发布时间" align="center"></el-table-column>
        <el-table-column prop="noticetitle" label="标题" min-width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" v-if="hasPerm('notice_info')" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button type="primary" size="small" v-if="hasPerm('notice_edit')" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="primary" size="small" v-if="hasPerm('notice_del')" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        :title="noticeItem.noticeid?'编辑':'新增'"
        width="820"
      >
        <el-form ref="noticeItem" :model="noticeItem" :rules="rules" label-width="110px">
          <el-form-item label="公告标题：" prop="noticetitle">
            <el-input v-model="noticeItem.noticetitle"></el-input>
          </el-form-item>
          <el-form-item label="公告内容：" prop="noticecontent">
            <v-wangeditor
              ref="myQuillEditor"
              :content="noticeItem.noticecontent"
              @catchData="catchAbout"
            ></v-wangeditor>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </Modal>
      <Modal
        v-model="detailVisible"
        :closable="false"
        :mask-closable="false"
        title="公告详情"
        width="820"
      >
        <el-form ref="noticeItem" :model="noticeItem" :rules="rules" label-width="110px">
          <el-form-item label="公告标题：">
            <div>{{noticeItem.noticetitle}}</div>
          </el-form-item>
          <el-form-item label="公告内容：">
            <div id="vhtml" v-html="noticeItem.noticecontent"></div>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="detailVisible = false">取 消</el-button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import wangeditor from "@/components/common/wangeditor/index.vue";
export default {
  name: "noticeManage",
  components: {
    "v-wangeditor": wangeditor
  },
  data() {
    return {
      query: {
        startTime: [],
        endTime: "",
        noticetitle: "",
        noticecontent: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      noticeItem: {
        noticeid: "",
        noticetitle: "",
        file: "",
        noticecontent: ""
      },
      rules: {
        noticetitle: [
          { required: true, message: "请输入公告标题", trigger: "blur" }
        ],
        noticecontent: [
          { required: true, message: "请输入公告内容", trigger: "change" }
        ]
      },
      editVisible: false,
      detailVisible: false
    };
  },
  created() {
    let that = this;
    that.loadData();
  },
  methods: {
    catchAbout(value) {
      let that = this;
      that.noticeItem.noticecontent = value; //在这里接受子组件传过来的参数，赋值给data里的参数
      // 富文本子组件向父组件传值得时候验证表单
      that.$refs.noticeItem.validate(valid => {});
    },
    reseItem() {
      let that = this;
      that.noticeItem = {
        noticeid: "",
        noticetitle: "",
        file: "",
        noticecontent: ""
      };
    },
    cancelEdit() {
      let that = this;
      that.editVisible = false;
      that.reseItem();
      that.$refs.noticeItem.resetFields();
    },
    // 保存编辑
    saveEdit() {
      let that = this;
      that.$refs.noticeItem.validate(valid => {
        if (valid) {
          let url = "";
          let params = {};
          if (that.noticeItem.noticeid) {
            url = Path.updateNotice;
            params["noticeid"] = that.noticeItem.noticeid;
          } else {
            url = Path.addNotice;
          }
          params["noticetitle"] = that.noticeItem.noticetitle;
          params["noticecontent"] = that.noticeItem.noticecontent;
          Server.post(url, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisible = false;
              that.loadData();
              that.reseItem();
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
        startTime: [],
        endTime: "",
        noticetitle: "",
        noticecontent: ""
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
      params["startTime"] = that.query.startTime[0]
        ? that.query.startTime[0] + "  00:00:00"
        : "";
      params["endTime"] = that.query.startTime[1]
        ? that.query.startTime[1] + "  00:00:00"
        : "";
      params["noticetitle"] = that.query.noticetitle;
      params["noticecontent"] = that.query.noticecontent;
      Server.post(Path.queryNoticeList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    // 删除操作
    handleDelete(index, row) {
      let that = this;
      that
        .$confirm("确定要删除公告吗？点击确定则删除该选项！", "删除", {
          type: "warning"
        })
        .then(() => {
          Server.post(Path.deleteNotice, { noticeid: row.noticeid }, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.loadData();
              that.$message.success("删除成功!");
            }
          });
        })
        .catch(() => {});
    },
    // 详情
    handleDetail(index, row) {
      console.log(row);
      let that = this;
      that.noticeItem = Object.assign({}, row);
      that.detailVisible = true;
    },
    // 编辑操作
    handleEdit(index, row) {
      console.log(row);
      let that = this;
      that.noticeItem = Object.assign({}, row);
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
/* .el-range-editor--small .el-range-separator {
  width: 24px !important;
} */

/deep/ .el-range-separator {
  width: 24px !important;
}
</style>
