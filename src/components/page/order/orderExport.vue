<template>
  <div style="height:100%">
    <div class="search">
      <el-card class="box-card">
        <el-form ref="exportItem" :model="exportItem" :rules="rules" label-width="110px">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="开始时间：" prop="reqtransstartdate">
                <el-date-picker
                  v-model="exportItem.reqtransstartdate"
                  type="date"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions0"
                  @change="changeStart"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束时间：" prop="reqtransenddate">
                <el-date-picker
                  v-model="exportItem.reqtransenddate"
                  type="date"
                  placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1"
                  @change="changeEnd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="商户名称：">
                <el-select v-model="exportItem.serprocode" placeholder="请选择" clearable>
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
              <el-form-item label="交易状态：">
                <el-select v-model="exportItem.paystatus" placeholder="请选择" clearable>
                  <el-option
                    v-for="(item,index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item class="query-form-item">
                <span>最多导出一个月数据！</span>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-row justify="end" type="flex">
                <el-button
                  type="primary"
                  icon="el-icon-download"
                  size="small"
                  @click="exportExcel"
                >导出Excel</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-refresh-left"
                  size="small"
                  @click="cancelExport"
                >重置</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "orderExport",
  data() {
    return {
      exportItem: {
        serprocode: "",
        reqtransstartdate: "",
        reqtransenddate: "",
        paystatus: "",
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      rules: {
        reqtransstartdate: [{ required: true, message: "开始时间不能为空" }],
        reqtransenddate: [{ required: true, message: "结束时间不能为空" }],
      },
      toSerproList: [],
      statusList: [
        { label: "支付成功", value: "SUCCESS" },
        { label: "转入退款", value: "REFUND" },
        { label: "未支付", value: "NOTPAY" },
        { label: "已关闭", value: "CLOSED" },
        { label: "已冲正", value: "REVERSE" },
        { label: "已撤销", value: "REVOK" },
      ],
    };
  },
  created() {
    let that = this;
    that.querySerProListSelect();
  },
  methods: {
    querySerProListSelect() {
      let that = this;
      Server.post(Path.querySerProListSelect, { serviceType: 2 }, (res) => {
        that.toSerproList = res;
      });
    },
    cancelExport() {
      let that = this;
      that.exportVisible = false;
      that.exportItem = {
        serprocode: "",
        reqtransstartdate: "",
        reqtransenddate: "",
        paystatus: "",
      };
      that.$refs.exportItem.resetFields();
    },
    exportExcel() {
      let me = this;
      me.$refs.exportItem.validate((valid) => {
        if (valid) {
          Server.postExport(
            Path.exportOrderExcel,
            {
              serprocode: me.exportItem.serprocode,
              reqtransstartdate: me.exportItem.reqtransstartdate + " 00:00:00",
              reqtransenddate: me.exportItem.reqtransenddate + " 23:59:59",
              paystatus: me.exportItem.paystatus,
            },
            {
              responseType: "arraybuffer",
            },
            (res) => {
              let { code, data, info } = res;
              // console.log(res);
              let blob = new Blob([res], { type: "application/vnd.ms-excel" });
              if (window.navigator.msSaveOrOpenBlob) {
                //兼容ie
                window.navigator.msSaveBlob(blob, file.filename);
              } else {
                let downloadElement = document.createElement("a");
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = "交易流水记录.xls"; //下载后文件名
                document.body.appendChild(downloadElement);
                //点击下载，此写法兼容火狐
                let evt = document.createEvent("MouseEvents");
                evt.initEvent("click", false, false);
                downloadElement.dispatchEvent(evt);
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href); // 释放掉blob对象
              }
              me.cancelExport();
            }
          );
        }
      });
    },
    changeStart(val) {
      let two = 31 * 24 * 3600 * 1000;
      if (val) {
        if (Date.now() - 8.64e6 - new Date(val).getTime() < two) {
          this.pickerOptions1 = Object.assign({}, this.pickerOptions1, {
            disabledDate: (time) => {
              return (
                new Date(val).getTime() > time.getTime() ||
                time.getTime() > Date.now() - 8.64e6
              );
            },
          });
        } else {
          this.pickerOptions1 = Object.assign({}, this.pickerOptions1, {
            disabledDate: (time) => {
              return (
                new Date(val).getTime() > time.getTime() ||
                time.getTime() > new Date(val).getTime() + two
              );
            },
          });
        }
      } else {
        this.pickerOptions1 = Object.assign({}, this.pickerOptions1, {
          disabledDate: (time) => {
            return time.getTime() > Date.now() - 8.64e6;
          },
        });
      }
    },
    changeEnd(val) {
      let two = 31 * 24 * 3600 * 1000;
      if (val) {
        this.pickerOptions0 = Object.assign({}, this.pickerOptions0, {
          disabledDate: (time) => {
            return (
              time.getTime() > new Date(val).getTime() ||
              time.getTime() < new Date(val).getTime() - two
            );
          },
        });
      } else {
        this.pickerOptions0 = Object.assign({}, this.pickerOptions0, {
          disabledDate: (time) => {
            return time.getTime() > Date.now() - 8.64e6;
          },
        });
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
.shanchu > /deep/ .el-form-item__label::before {
  content: "*";
  color: red;
}
</style>
