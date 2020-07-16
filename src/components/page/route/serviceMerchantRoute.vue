<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form :model="query" label-width="94px" label-position="left" size="small">
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="所属服务商:">
                <el-select v-model="query.upSerProName" placeholder="请选择" style="width:100%">
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
              <el-form-item label="服务商名称:">
                <el-input v-model="query.serProName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="负责人:">
                <el-input v-model="query.contactsname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号码:">
                <el-input v-model="query.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="36">
            <el-col :span="6">
              <el-form-item label="审核状态:" class="query-form-item">
                <el-select v-model="query.status" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in statusList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
      <div class="table-container">
        <div class="left-table">
          <el-table
            :data="tableData"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column
              :show-overflow-tooltip="true"
              label="所属服务商"
              min-width="110"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.upserproname">{{scope.row.upserproname}}</span>
                <span v-else style="color:red">顶级</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="serproname"
              :show-overflow-tooltip="true"
              label="服务商名称"
              min-width="110"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="contactsname"
              :show-overflow-tooltip="true"
              label="负责人"
              align="center"
            ></el-table-column>
            <el-table-column prop="mobile" :show-overflow-tooltip="true" label="手机号" align="center"></el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.status==1?"已通过":(scope.row.status==2?"已拒绝":(scope.row.status==4?"待审核":(scope.row.status==5?"已关闭":(scope.row.status==6?"已变更":"新增"))))}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleAdd(scope.$index, scope.row)"
                >通道配置</el-button>
                <el-button type="primary" size="small" @click="detailFun(scope.row)">详情</el-button>
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
        <div class="right-table">
          <el-table
            :data="detailTableData"
            border
            class="table right-table-content"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column
              prop="routename"
              label="通道名称"
              :show-overflow-tooltip="true"
              min-width="170"
              align="center"
            ></el-table-column>
            <el-table-column
              label="费率类型"
              :show-overflow-tooltip="true"
              min-width="90"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{scope.row.hasmorefeerate==1?"多费率":"单费率"}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="feeratedown"
              label="结算费率"
              min-width="90"
              :show-overflow-tooltip="true"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" width="230" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleDel(scope.$index, scope.row)"
                >删除</el-button>
                <el-button
                  type="primary"
                  size="small"
                  v-if="scope.row.verifystatus == 1"
                  @click="handleClose(scope.$index, scope.row)"
                >关闭</el-button>
                <el-button
                  type="primary"
                  size="small"
                  v-else
                  @click="handleOpen(scope.$index, scope.row)"
                >开启</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <template>
      <Modal
        v-model="addVisiable"
        width="780px"
        :closable="false"
        :mask-closable="false"
        title="服务商通道配置"
      >
        <el-form
          ref="routeItemone"
          :model="routeItem"
          :rules="routeItemRules"
          v-if="isNext"
          label-width="110px"
        >
          <el-form-item label="服务商名称：">
            <el-input v-model="routeItem.serproname" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付通道：" prop="routecode">
            <el-select
              v-model="routeItem.routecode"
              @change="changeRoute"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="(item,index) in routeList"
                :key="index"
                :label="item.routename"
                :value="item.routecode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form ref="routeItem" :model="routeItem" :rules="rules" v-else label-width="130px">
          <el-form-item label="服务商名称：" prop="serproname">
            <el-input v-model="routeItem.serproname" disabled></el-input>
          </el-form-item>
          <el-form-item label="支付通道：" prop="routecode">
            <el-input v-model="routeItem.routename" disabled></el-input>
          </el-form-item>
          <el-form-item label="费率类型：">
            <el-radio
              v-model="routeItem.hasmorefeerate"
              label="2"
              :disabled="routeItem.hasmorefeerate == 1"
            >单费率</el-radio>
            <el-radio
              v-model="routeItem.hasmorefeerate"
              label="1"
              :disabled="routeItem.hasmorefeerate == 2"
            >多费率</el-radio>
          </el-form-item>
          <el-row type="flex">
            <el-col :span="12">
              <el-form-item label="结算费率(%)：" prop="feeratedown">
                <el-input-number
                  v-model="routeItem.feeratedown"
                  placeholder="请输入费率（例如0.26）"
                  :controls="false"
                  :min="0"
                  :max="1"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="附加手续费(%)：" prop="commission">
                <el-input-number
                  v-model="routeItem.commission"
                  placeholder="请输入费率（例如0.26）"
                  :controls="false"
                  :min="0"
                  :max="1"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="结算周期：">
            <el-select v-model="routeItem.settleperiod" placeholder="请选择" style="width:100%">
              <el-option
                v-for="(item,index) in settleperiodList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 多费率情况下，填写 -->
          <div v-if="routeItem.hasmorefeerate == 1">
            <div v-for="(item,index) in routeItem.moreRateList" :key="index">
              <el-form-item
                label="结算费率："
                :prop="`moreRateList[${index}].downfeerateD1`"
                :rules="{ required: true, message: '请输入结算费率', trigger: 'blur' }"
              >
                <el-input-number
                  v-model="item.downfeerateD1"
                  placeholder="请输入费率（例如0.26）"
                  :controls="false"
                  :min="0"
                  :max="1"
                ></el-input-number>
                <span>金额{{item.parameter}}(%)</span>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div slot="footer">
          <el-button type="primary" @click="cancelAddEdit">取 消</el-button>
          <el-button type="primary" v-if="!isNext" @click="pre">上一步</el-button>
          <el-button type="primary" v-if="isNext" @click="next">下一步</el-button>
          <el-button type="primary" v-else @click="okFun">提交</el-button>
        </div>
      </Modal>
      <Modal v-model="editVisable" :closable="false" :mask-closable="false" title="编辑费率">
        <el-form ref="rateItem" :model="rateItem" :rules="rateItemRules" label-width="110px">
          <el-form-item label="服务商名称：">
            <el-input v-model="rateItem.serproname" disabled></el-input>
          </el-form-item>
          <el-form-item label="结算费率：" prop="feeratedown">
            <el-input-number
              v-model="rateItem.feeratedown"
              placeholder="请输入费率（例如0.26）"
              :controls="false"
              :min="0"
              :max="1"
            ></el-input-number>
          </el-form-item>
          <div v-if="rateItem.hasmorefeerate == 1">
            <div>
              <div v-for="(item,index) in rateItem.editMoreRateList" :key="index">
                <el-form-item
                  label="结算费率："
                  :prop="`editMoreRateList[${index}].downfeerateD`"
                  :rules="{ required: true, message: '请输入结算费率', trigger: 'blur' }"
                >
                  <el-input-number
                    v-model="item.downfeerateD"
                    placeholder="请输入费率（例如0.26）"
                    :controls="false"
                    :min="0"
                    :max="1"
                  ></el-input-number>
                  <span>金额{{item.parameter}}(%)</span>
                </el-form-item>
              </div>
            </div>
          </div>
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
  name: "serviceMerchantRoute",
  components: {},
  data() {
    return {
      query: {
        serviceType: 1,
        upSerProName: "",
        serProName: "",
        contactsname: "",
        mobile: "",
        status: ""
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      routeItem: {
        serprocode: "",
        serproname: "",
        otherfeeid: "", //多费率表的管理关联id
        routecode: "", //支付通道code
        routename: "", //支付通道名称
        hasmorefeerate: "", //	是否有多费率 1是多费率，反之为单费率
        feerate: "", //  	成本费率-操作者的成本费率
        settleperiod: "", //结算周期
        moreRateList: []
      },
      routeItemRules: {
        routecode: [
          { required: true, message: "请选择支付通道", trigger: "change" }
        ]
      },
      rules: {
        feeratedown: [
          { required: true, message: "请输入结算费率", trigger: "blur" }
        ],
        commission: [
          { required: true, message: "请输入附加手续费", trigger: "blur" }
        ]
      },
      rateItemRules: {
        feeratedown: [
          { required: true, message: "请输入结算费率", trigger: "blur" }
        ]
      },
      // 新增多费率列表
      moreRateList: [],
      // 编辑多费率列表
      editMoreRateList: [],
      routeList: [],
      addVisiable: false,
      editVisable: false,
      rateItem: {
        serproname: "",
        serprocode: "",
        routecode: "",
        feerate: "",
        feeratedown: "",
        hasmorefeerate: "",
        editMoreRateList: []
      },
      isNext: true,
      settleperiodList: [
        { value: "1", label: "T1" },
        { value: "2", label: "D0" },
        { value: "3", label: "T0" },
        { value: "4", label: "D1" }
      ],
      tableData: [],
      detailTableData: [],
      toSerproList: [],
      rowItem: {},
      currentRow: null,
      statusList: [
        { label: "已通过", value: "1" },
        { label: "已拒绝", value: "2" },
        { label: "待审核", value: "4" },
        { label: "已关闭", value: "5" },
        { label: "已变更", value: "6" },
        { label: "新增", value: "9" }
      ]
    };
  },
  created() {
    let that = this;
    that.loadData();
    that.querySerProListByCode();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    cancelEdit() {
      let that = this;
      that.editVisable = false;
    },
    saveEdit() {
      let that = this;
      that.$refs.rateItem.validate(async valid => {
        if (valid) {
          let params = {};
          let url = "";
          if (that.rateItem.hasmorefeerate == 1) {
            let arr = [];
            let item = {};
            item["serprocode"] = that.rateItem.serprocode;
            item["routecode"] = that.rateItem.routecode;
            item["feerate"] = that.rateItem.feerate;
            item["feeratedown"] = that.rateItem.feeratedown;
            arr.push(item);
            for (let moreItem of that.rateItem.editMoreRateList) {
              let oMore = {};
              oMore["otherfeeid"] = moreItem.otherfeeid;
              oMore["parameter"] = moreItem.parameter;
              // 成本费率为上游的下游费率
              oMore["feerateD"] = moreItem.feerateD;
              oMore["downfeerateD"] = moreItem.downfeerateD;
              arr.push(oMore);
            }
            params["datas"] = JSON.stringify(arr);
            url = Path.updateRouteMoreBySerProCode;
          } else {
            params = that.rateItem;
            url = Path.updateRouteListBySerProCode;
          }
          Server.post(url, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.editVisable = false;
              that.loadData();
              that.detailFun(that.rowItem);
              that.$message.success("通道费率编辑成功！");
            } else {
              that.$message.warning(msg);
            }
          });
        }
      });
    },
    // 编辑操作
    handleEdit(index, row) {
      let that = this;
      that.rateItem.serproname = row.serproname;
      that.rateItem.serprocode = row.serprocode;
      that.rateItem.routecode = row.routecode;
      that.rateItem.feerate = row.feerate;
      that.rateItem.feeratedown = row.feeratedown;
      that.rateItem.hasmorefeerate = row.hasmorefeerate;
      // 多费率情况
      if (row.hasmorefeerate == 1) {
        // 获取多费率列表
        that.queryMorePaywayByCode(row.otherfeeid);
      }
      that.editVisable = true;
    },
    resetRouteItem() {
      let that = this;
      that.routeItem = {
        serprocode: "",
        serproname: "",
        otherfeeid: "", //多费率表的管理关联id
        routecode: "", //支付通道code
        routename: "", //支付通道名称
        hasmorefeerate: "", //	是否有多费率 1是多费率，反之为单费率
        feerate: "", //  	成本费率-操作者的成本费率
        settleperiod: "", //结算周期
        moreRateList: []
      };
    },
    handleAdd(index, row) {
      let that = this;
      that.resetRouteItem();
      that.routeItem.serprocode = row.serprocode;
      that.routeItem.serproname = row.serproname;
      Server.post(
        Path.queryRouteListBySerProCode,
        { serProCode: row.serprocode },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.addVisiable = true;
            that.routeList = data;
            if (that.routeList.length > 0) {
              console.log(11111);
              that.routeItem.routecode = that.routeList[0].routecode;
              that.routeItem.routename = that.routeList[0].routename;
              that.routeItem.hasmorefeerate = that.routeList[0].hasmorefeerate;
            }
          }
        }
      );
    },
    cancelAddEdit() {
      let that = this;
      that.addVisiable = false;
      that.isNext = true;
      that.resetRouteItem();
      that.$refs.routeItemone.resetFields();
      // that.$refs.routeItem.resetFields();
    },
    pre() {
      let that = this;
      that.isNext = true;
    },
    okFun() {
      let that = this;
      // console.log(that.routeItem.moreRateList);
      that.$refs.routeItem.validate(async valid => {
        if (valid) {
          let params = {};
          params["serprocode"] = that.routeItem.serprocode;
          params["serproname"] = that.routeItem.serproname;
          params["otherfeeid"] = that.routeItem.routecode;
          params["routecode"] = that.routeItem.routecode;
          params["routename"] = that.routeItem.routename;
          params["hasmorefeerate"] = that.routeItem.hasmorefeerate;
          params["feerate"] = that.routeItem.feerate;
          params["settleperiod"] = that.routeItem.settleperiod;
          params["feeratedown"] = that.routeItem.feeratedown;
          params["commission"] = that.routeItem.commission;
          params["token"] = localStorage.getItem("tokenData");
          // 多通道配置,上游的下游费率是通道成本费率，通道填写的
          //成本费率是下游费率
          if (that.routeItem.hasmorefeerate == 1) {
            let arr = [];
            for (let item of that.routeItem.moreRateList) {
              let moreRoute = {};
              moreRoute["otherfeeid"] = that.routeItem.routecode;
              moreRoute["parameter"] = item.parameter;
              moreRoute["feerateD"] = item.feerateD;
              moreRoute["downfeerateD"] = item.downfeerateD1;
              arr.push(moreRoute);
            }
            params["routeRateList"] = arr;
          }

          Server.postJson(Path.addRoute, JSON.stringify(params), res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.isNext = true;
              that.addVisiable = false;
              that.resetRouteItem();
              that.$refs.routeItemone.resetFields();
              // that.loadData();
              // 有点击详情得时候执行调用详情
              if (that.rowItem.serprocode) {
                that.detailFun(that.rowItem);
              }
              that.$message.success("通道配置成功！");
            } else {
              that.$message.warning(msg);
            }
          });
        }
      });
    },
    next() {
      let that = this;
      that.$refs.routeItemone.validate(async valid => {
        if (valid) {
          let params = {};
          params["routeCode"] = that.routeItem.routecode;
          params["serProCode"] = that.routeItem.serprocode;
          Server.post(Path.queryRouteInfoByCode, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              // data 为null的时候表示通道未配置
              if (!data) {
                that.isNext = false;
                that.queryBaseFee();
                if (that.routeItem.hasmorefeerate == 1) {
                  that.queryMoreRouteBaseFee();
                }
              } else {
                that.$message.warning("该服务商已经配置该通道!");
              }
            }
          });
        }
      });
    },
    queryMorePaywayByCode(otherfeeId) {
      let that = this;
      let params = {};
      params["otherfeeId"] = otherfeeId;
      Server.post(Path.queryMorePaywayByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.rateItem.editMoreRateList = data;
        }
      });
    },
    queryBaseFee() {
      let that = this;
      let params = {};
      params["routecode"] = that.routeItem.routecode;
      params["serprocode"] = that.routeItem.serprocode;
      Server.post(Path.queryBaseFee, params, res => {
        that.routeItem.feerate = res;
      });
    },
    queryMoreRouteBaseFee() {
      let that = this;
      let params = {};
      params["routecode"] = that.routeItem.routecode;
      params["serprocode"] = that.routeItem.serprocode;
      Server.post(Path.queryMoreRouteBaseFee, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          // that.routeItem.routeRateList = data;
          that.routeItem.moreRateList = data;
        }
      });
    },
    detailFun(row) {
      let that = this;
      that.rowItem = row;
      let params = {};
      params["page"] = 1;
      params["limit"] = 50;
      params["serProCode"] = row.serprocode;
      Server.post(Path.queryRouteListByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.detailTableData = data;
        }
      });
    },
    changeRoute(val) {
      let that = this;
      //self 为变量routeList
      let arr = that.routeList.filter(function(element, index, self) {
        return element.routecode == val;
      });
      that.routeItem.routename = arr[0].routename;
      that.routeItem.hasmorefeerate = arr[0].hasmorefeerate;
    },
    // 删除操作
    handleDel(index, row) {
      let that = this;
      that
        .$confirm("确定要删除该通道吗？点击确定则删除该通道！", "关闭服务商", {
          type: "warning"
        })
        .then(() => {
          Server.post(
            Path.delRouteByCode,
            { serprcode: row.serprocode + "", routecode: row.routecode },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.detailFun(that.rowItem);
                that.$message.success("通道删除成功!");
              } else {
                that.$message.warning(msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    // 关闭操作
    handleClose(index, row) {
      let that = this;
      that
        .$confirm("确定要关闭该通道吗？点击确定则关闭该通道！", "关闭通道", {
          type: "warning"
        })
        .then(() => {
          Server.post(
            Path.closeRouteByCode,
            {
              serprcode: row.serprocode + "",
              routecode: row.routecode,
              status: "4"
            },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                // that.querySerProListByCode();
                that.detailFun(that.rowItem);
                that.$message.success("通道关闭成功!");
              } else {
                that.$message.warning(msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    // 开启
    handleOpen(index, row) {
      let that = this;
      that
        .$confirm(
          "确定要开启该服务商吗？点击确定则开启该服务商！",
          "开启服务商",
          {
            type: "warning"
          }
        )
        .then(() => {
          Server.post(
            Path.closeRouteByCode,
            {
              serprcode: row.serprocode + "",
              routecode: row.routecode,
              status: "1"
            },
            res => {
              let { code, data, msg } = res;
              if (code == 200) {
                that.loadData();
                that.detailFun(that.rowItem);
                // that.querySerProListByCode();
                that.$message.success("通道开启成功!");
              } else {
                that.$message.warning(msg);
              }
            }
          );
        })
        .catch(() => {});
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
        serviceType: 1,
        upSerProName: "",
        serProName: "",
        contactsname: "",
        mobile: "",
        status: ""
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
      params["serviceType"] = that.query.serviceType;
      params["upSerProName"] = that.query.upSerProName;
      params["serProName"] = that.query.serProName;
      params["contactsname"] = that.query.contactsname;
      params["mobile"] = that.query.mobile;
      params["status"] = that.query.status;
      Server.post(Path.querySerProList, params, res => {
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
      Server.post(Path.querySerProListByCode, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.toSerproList = data;
        }
      });
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
.table-container {
  display: flex;
}
.left-table {
  /* width: 780px; */
  flex: 3;
  overflow-x: auto;
}
.right-table {
  flex: 2;
  overflow-x: auto;
}
.right-table-content {
  border-left: 1px solid #d3c7c7;
}
/deep/ .right-table-content > .el-table__body-wrapper {
  min-height: 350px;
}
</style>
