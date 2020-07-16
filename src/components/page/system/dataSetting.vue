<template>
  <div>
    <div class="search">
      <el-card class="box-card">
        <el-form
          :model="settingItem"
          label-width="100px"
          label-position="left"
          size="small"
          class="form"
        >
          <el-row :gutter="36" align="center">
            <el-col :span="6">
              <el-form-item label="配置类型:" class="query-form-item">
                <el-select
                  v-model="settingItem.settingWay"
                  @change="changeSettingWay"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in settingWayList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基础配置类型:" class="query-form-item" v-if="isBasic">
                <el-select
                  v-model="settingItem.basicSettingWay"
                  @change="changeBasicSettingWay"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in basicSettingWayList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="系统代码类型:" class="query-form-item" v-if="isCode">
                <el-select
                  v-model="settingItem.basicSettingWay"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="(item,index) in systemCodeWay"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-form
            :model="areaItem"
            label-width="100px"
            label-position="left"
            size="small"
            class="form"
            v-if="isProvince"
            ref="areaItem"
            :rules="areaItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="省份名称:" prop="provinceNameArea">
                  <el-select
                    v-model="areaItem.provinceNameArea"
                    @change="changeProvince"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in provinceList"
                      :key="index"
                      :label="item.provinceName"
                      :value="item.provinceCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="城市名称:" prop="cityCodeArea">
                  <el-select v-model="areaItem.cityCodeArea" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in cityList"
                      :key="index"
                      :label="item.cityName"
                      :value="item.cityCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区名称:" prop="areaNameArea">
                  <el-input v-model="areaItem.areaNameArea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区编码:" prop="areaCodeArea">
                  <el-input v-model="areaItem.areaCodeArea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="end">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-circle-plus-outline"
                @click="saveAreaItem"
              >提 交</el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-refresh-left"
                @click="refreshAreaItem"
              >重 置</el-button>
            </el-row>
          </el-form>
          <el-form
            :model="streetItem"
            label-width="100px"
            label-position="left"
            size="small"
            class="form"
            v-if="isStreet"
            ref="streetItem"
            :rules="streetItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="省份名称:" prop="provinceName">
                  <el-select
                    v-model="streetItem.provinceName"
                    @change="changeProvince"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in provinceList"
                      :key="index"
                      :label="item.provinceName"
                      :value="item.provinceCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="城市名称:" prop="cityCode">
                  <el-select
                    v-model="streetItem.cityCode"
                    @change="changeCity"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in cityList"
                      :key="index"
                      :label="item.cityName"
                      :value="item.cityCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区名称:" prop="areaName">
                  <el-select
                    v-model="streetItem.areaCode"
                    @change="changeArea"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in areaList"
                      :key="index"
                      :label="item.areaName"
                      :value="item.areaCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区编码:" prop="areaCode">
                  <el-input :disabled="true" v-model="streetItem.areaCode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="地区名称:" prop="streetName">
                  <el-input v-model="streetItem.streetName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="地区编码:" prop="streetCode">
                  <el-input v-model="streetItem.streetCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="saveStreetItem"
                  >提 交</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refreshStreetItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-form
            :model="bankItem"
            label-width="100px"
            label-position="left"
            size="small"
            class="form"
            v-if="isBank"
            ref="bankItem"
            :rules="bankItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="银行省份:" prop="provincename">
                  <el-select
                    v-model="bankItem.provincename"
                    @change="changeProvince"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in provinceList"
                      :key="index"
                      :label="item.provinceName"
                      :value="item.provinceCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="银行城市:" prop="citycode">
                  <el-select v-model="bankItem.citycode" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in cityList"
                      :key="index"
                      :label="item.cityName"
                      :value="item.cityCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="开户银行:" prop="banktype">
                  <el-select v-model="bankItem.banktype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in bankList"
                      :key="index"
                      :label="item.bankname"
                      :value="item.bankcode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支行名称:" prop="bankname">
                  <el-input v-model="bankItem.bankname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="支行编码:" prop="bankcode">
                  <el-input v-model="bankItem.bankcode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="saveBankItem"
                  >提 交</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refreshBankItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-form
            :model="payTypeItem"
            label-width="100px"
            label-position="left"
            size="small"
            class="form"
            v-if="isPayType"
            ref="payTypeItem"
            :rules="payTypeRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="支付方式:" prop="paytypename">
                  <el-input v-model="payTypeItem.paytypename"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="savePayTypeItem"
                  >提 交</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refreshPayTypeItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-form
            :model="wayItem"
            label-width="110px"
            label-position="left"
            size="small"
            class="form"
            v-if="isWay"
            ref="wayItem"
            :rules="wayItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="支付类型名称:" prop="paywayname">
                  <el-input v-model="wayItem.paywayname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支付类型编码:" prop="paywaycode">
                  <el-input v-model="wayItem.paywaycode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="savePayWayItem"
                  >提 交</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refreshPayWayItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-form
            :model="routeTemplateItem"
            label-width="110px"
            label-position="left"
            size="small"
            class="form"
            v-if="isRouteTemplate"
            ref="routeTemplateItem"
            :rules="routeTemplateItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="通道模板名称:" prop="flagTemplate">
                  <el-input v-model="routeTemplateItem.flagTemplate"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="通道模板代号:" prop="templatename">
                  <el-input v-model="routeTemplateItem.templatename"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="saveRouteTemplateItem"
                  >提 交</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refreshRouteTemplateItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-form
            :model="routeItem"
            label-width="110px"
            label-position="left"
            size="small"
            class="form"
            v-if="isRoute"
            ref="routeItem"
            :rules="routeItemRules"
          >
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="支付类型代码:" prop="paywaycodeRoute">
                  <el-select
                    v-model="routeItem.paywaycodeRoute"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in payWayList"
                      :key="index"
                      :label="item.paywayname"
                      :value="item.paywaycode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支付方式代码:" prop="paytypecode">
                  <el-select v-model="routeItem.paytypecode" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in payTypeList"
                      :key="index"
                      :label="item.paytypename"
                      :value="item.paytypecode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="通道模板代码:" prop="templatecode">
                  <el-select v-model="routeItem.templatecode" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in payTemplateList"
                      :key="index"
                      :label="item.templatename"
                      :value="item.templatecode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支付通道名称:" prop="routename">
                  <el-input v-model="routeItem.routename"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36" align="center">
              <el-col :span="6">
                <el-form-item label="原始成本费率:" prop="feerate">
                  <el-input v-model="routeItem.feerate"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="支付通道地址:" prop="flag">
                  <el-input v-model="routeItem.flag"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row type="flex" justify="end">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-circle-plus-outline"
                    @click="saveRouteItem"
                  >提 交</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-refresh-left"
                    @click="refreshRouteItem"
                  >重 置</el-button>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="container" v-if="isPayType">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="paytypecode" label="支付方式编码" align="center"></el-table-column>
        <el-table-column prop="paytypename" label="支付方式名称" min-width="120" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==1?"启用":"禁用"}}</span>
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
    <div class="container" v-if="isWay">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="paywaycode" label="支付类型编号" align="center"></el-table-column>
        <el-table-column prop="paywayname" label="支付类型名称" min-width="120" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==1?"启用":"禁用"}}</span>
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
    <div class="container" v-if="isRouteTemplate">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="templatecode" label="通道编码" align="center"></el-table-column>
        <el-table-column prop="templatename" label="通道代号" align="center"></el-table-column>
        <el-table-column prop="flag" label="通道名称" min-width="120" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==1?"启用":"禁用"}}</span>
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
    <div class="container" v-if="isRoute">
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="70" label="序号" align="center"></el-table-column>
        <el-table-column prop="routecode" label="通道编号" align="center"></el-table-column>
        <el-table-column prop="paywaycode" label="类型代码" align="center"></el-table-column>
        <el-table-column prop="paytypecode" label="支付方式代码" align="center"></el-table-column>
        <el-table-column prop="templatecode" label="通道模板编号" align="center"></el-table-column>
        <el-table-column prop="routename" label="支付通道名称" min-width="220" align="center"></el-table-column>
        <el-table-column prop="feerate" label="原始成本费率" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status==1?"有效":"无效"}}</span>
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
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  name: "dataSetting",
  components: {},
  data() {
    return {
      settingItem: {
        settingWay: "",
        basicSettingWay: ""
      },
      settingWayList: [
        { label: "基础数据配置", value: "基础数据配置" },
        { label: "代码对照表", value: "代码对照表" }
      ],
      basicSettingWayList: [
        { label: "地区数据配置", value: "地区数据配置" },
        { label: "街道数据配置", value: "街道数据配置" },
        { label: "银行数据配置", value: "银行数据配置" },
        { label: "支付方式配置", value: "支付方式配置" },
        { label: "支付类型配置", value: "支付类型配置" },
        { label: "通道模板配置", value: "通道模板配置" },
        { label: "支付通道配置", value: "支付通道配置" }
      ],
      systemCodeWay: [
        // { label: "系统代码-地区代码", value: "系统代码-地区代码" },
        // { label: "系统代码-地区代码", value: "系统代码-地区代码" }
      ],
      isBasic: false,
      isCode: false,
      // 省市区
      provinceList: [],
      cityList: [],
      bankList: [],
      areaList: [],
      isProvince: false,
      areaItem: {
        provinceNameArea: "",
        cityNameArea: "",
        cityCodeArea: "",
        areaNameArea: "",
        areaCodeArea: ""
      },
      // 街道
      isStreet: false,
      streetItem: {
        provinceName: "",
        cityName: "",
        areaName: "",
        areaCode: "",
        streetName: "",
        streetCode: ""
      },
      isBank: false,
      bankItem: {
        provincename: "",
        citycode: "",
        banktype: "",
        bankname: "",
        bankcode: ""
      },
      isPayType: false,
      payTypeItem: {
        paytypename: ""
      },
      isWay: false,
      wayItem: {
        paywaycode: "",
        paywayname: ""
      },
      isRouteTemplate: false,
      routeTemplateItem: {
        templatename: "",
        flagTemplate: ""
      },
      isRoute: false,
      routeItem: {
        paywaycodeRoute: "",
        paytypecode: "",
        templatecode: "",
        routename: "",
        feerate: "",
        flag: ""
      },
      payTypeList: [],
      payWayList: [],
      payTemplateList: [],
      pageInfo: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      areaItemRules: {
        provinceNameArea: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        cityCodeArea: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
        areaCodeArea: [
          { required: true, message: "请输入地区编码", trigger: "blur" }
        ],
        areaNameArea: [
          { required: true, message: "请输入地区名称", trigger: "blur" }
        ]
      },
      streetItemRules: {
        provinceName: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        cityCode: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
        areaCode: [
          { required: true, message: "请输入地区编码", trigger: "change" }
        ],
        areaName: [
          { required: true, message: "请输入地区名称", trigger: "change" }
        ],
        streetName: [
          { required: true, message: "请输入街道名称", trigger: "blur" }
        ],
        streetCode: [
          { required: true, message: "请输入街道编码", trigger: "blur" }
        ]
      },
      bankItemRules: {
        provincename: [
          { required: true, message: "请选择银行省份", trigger: "change" }
        ],
        citycode: [
          { required: true, message: "请选择银行城市", trigger: "change" }
        ],
        banktype: [
          { required: true, message: "请选择银行", trigger: "change" }
        ],
        bankname: [
          { required: true, message: "请输入支行名称", trigger: "blur" }
        ],
        bankcode: [
          { required: true, message: "请输入支行编码", trigger: "blur" }
        ]
      },
      payTypeRules: {
        paytypename: [
          { required: true, message: "请输入支付方式", trigger: "blur" }
        ]
      },
      wayItemRules: {
        paywayname: [
          { required: true, message: "请输入支付类型名称", trigger: "blur" }
        ],
        paywaycode: [
          { required: true, message: "请输入支付类型编码", trigger: "blur" }
        ]
      },
      routeTemplateItemRules: {
        flagTemplate: [
          { required: true, message: "请输入通道模板名称", trigger: "blur" }
        ],
        templatename: [
          { required: true, message: "请输入通道模板代号", trigger: "blur" }
        ]
      },
      routeItemRules: {
        paywaycodeRoute: [
          { required: true, message: "请选择支付类型代码", trigger: "change" }
        ],
        paytypecode: [
          { required: true, message: "请选择支付方式代码", trigger: "change" }
        ],
        templatecode: [
          { required: true, message: "请选择通道模板代码", trigger: "change" }
        ],
        routename: [
          { required: true, message: "请输入支付通道名称", trigger: "blur" }
        ],
        feerate: [
          { required: true, message: "请输入原始成本费率", trigger: "blur" }
        ],
        flag: [
          { required: true, message: "请输入支付通道地址", trigger: "blur" }
        ]
      },
      editVisible: false
    };
  },
  created() {
    let that = this;
    // that.loadData();
  },
  methods: {
    //选择基础配置
    changeSettingWay(val) {
      let that = this;
      // 基础配置类型要放空
      that.settingItem.basicSettingWay = "";
      switch (val) {
        case "基础数据配置":
          that.isBasic = true;
          that.isCode = false;
          break;
        case "代码对照表":
          that.isBasic = false;
          that.isCode = true;
          break;
        default:
          break;
      }
    },
    //选择基础配置类型
    changeBasicSettingWay(val) {
      let that = this;
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = 10;
      switch (val) {
        case "地区数据配置":
          if (that.$refs.streetItem) {
            that.$refs.streetItem.resetFields();
          }
          if (that.$refs.bankItem) {
            that.$refs.bankItem.resetFields();
          }
          that.isProvince = true;
          that.isStreet = false;
          that.isPayType = false;
          that.isRouteTemplate = false;
          that.isRoute = false;
          that.isWay = false;
          that.isBank = false;
          that.queryBasedatamgProvince();
          break;
        case "街道数据配置":
          if (that.$refs.areaItem) {
            that.$refs.areaItem.resetFields();
          }
          if (that.$refs.bankItem) {
            that.$refs.bankItem.resetFields();
          }
          that.isStreet = true;
          that.isPayType = false;
          that.isRouteTemplate = false;
          that.isRoute = false;
          that.isWay = false;
          that.isBank = false;
          that.isProvince = false;
          that.queryBasedatamgProvince();
          break;
        case "银行数据配置":
          if (that.$refs.areaItem) {
            that.$refs.areaItem.resetFields();
          }
          if (that.$refs.streetItem) {
            that.$refs.streetItem.resetFields();
          }
          that.isBank = true;
          that.isPayType = false;
          that.isRouteTemplate = false;
          that.isRoute = false;
          that.isWay = false;
          that.isStreet = false;
          that.isProvince = false;
          that.queryBasedatamgProvince();
          that.loadBankList();
          break;
        case "支付方式配置":
          that.isPayType = true;
          that.isRouteTemplate = false;
          that.isRoute = false;
          that.isWay = false;
          that.isBank = false;
          that.isStreet = false;
          that.isProvince = false;
          that.getPayTypeList();
          break;
        case "支付类型配置":
          that.isWay = true;
          that.isRoute = false;
          that.isRouteTemplate = false;
          that.isPayType = false;
          that.isBank = false;
          that.isStreet = false;
          that.isProvince = false;
          that.getPayWayList();
          break;
        case "通道模板配置":
          that.isRouteTemplate = true;
          that.isRoute = false;
          that.isWay = false;
          that.isPayType = false;
          that.isBank = false;
          that.isStreet = false;
          that.isProvince = false;
          that.getTemplateList();
          break;
        case "支付通道配置":
          that.isRoute = true;
          that.isRouteTemplate = false;
          that.isWay = false;
          that.isPayType = false;
          that.isBank = false;
          that.isStreet = false;
          that.isProvince = false;
          that.getRouteList();
          that.queryPayTypeList();
          that.queryPayWayList();
          that.queryPayTemplateList();
          break;
        default:
          break;
      }
    },
    queryPayTypeList() {
      let that = this;
      Server.post(Path.queryPayTypeList, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payTypeList = data;
        }
      });
    },
    queryPayWayList() {
      let that = this;
      Server.post(Path.queryPayWayList, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payWayList = data;
        }
      });
    },
    queryPayTemplateList() {
      let that = this;
      Server.post(Path.queryPayTemplateList, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.payTemplateList = data;
        }
      });
    },
    getRouteList() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      Server.post(Path.getRouteList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    getTemplateList() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      Server.post(Path.getTemplateList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    getPayWayList() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      Server.post(Path.getPayWayList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    getPayTypeList() {
      let that = this;
      let params = {};
      params["page"] = that.pageInfo.pageIndex;
      params["limit"] = that.pageInfo.pageSize;
      Server.post(Path.getPayTypeList, params, res => {
        let { code, data, msg, count } = res;
        if (code == 200) {
          that.tableData = data;
          that.pageInfo.total = count;
        }
      });
    },
    queryBasedatamgProvince() {
      let that = this;
      Server.post(Path.queryBasedatamgProvince, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.provinceList = data;
        }
      });
    },
    // 根据省份id获取城市
    changeProvince(val) {
      let that = this;
      Server.post(
        Path.queryBasedatamgCityByPrCode,
        { provinceCode: val },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.cityList = data;
          }
        }
      );
    },
    // 根据身份获取银行列表
    loadBankList() {
      let that = this;
      Server.post(Path.queryBasedatamqBanktypeList, { twoCode: "-" }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.bankList = data;
        }
      });
    },
    // 根据城市获取地区
    changeCity(val) {
      let that = this;
      Server.post(Path.queryBasedatamgAreaByCtCode, { cityCode: val }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.areaList = data;
        }
      });
    },
    changeArea(val) {
      let that = this;
      let item = that.areaList.filter(n => n.areaCode === val);
      // console.log(item);
      that.streetItem.areaName = item[0].areaName;
    },
    refreshAreaItem() {
      let that = this;
      that.areaItem = {
        provinceNameArea: "",
        cityNameArea: "",
        cityCodeArea: "",
        areaNameArea: "",
        areaCodeArea: ""
      };
      that.$refs.areaItem.resetFields();
    },
    saveAreaItem() {
      let that = this;
      that.$refs.areaItem.validate(valid => {
        if (valid) {
          let params = {};
          params["provinceName"] = that.areaItem.provinceNameArea;
          params["cityCode"] = that.areaItem.cityCodeArea;
          params["cityName"] = that.areaItem.cityNameArea;
          params["areaName"] = that.areaItem.areaNameArea;
          params["areaCode"] = that.areaItem.areaCodeArea;
          Server.post(Path.addAreaData, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.refreshAreaItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    refreshStreetItem() {
      let that = this;
      that.streetItem = {
        provinceName: "",
        cityName: "",
        areaName: "",
        areaCode: "",
        streetName: "",
        streetCode: ""
      };
      that.$refs.streetItem.resetFields();
    },
    saveStreetItem() {
      let that = this;
      that.$refs.streetItem.validate(valid => {
        if (valid) {
          let params = {};
          params["provinceName"] = that.streetItem.provinceName;
          params["cityCode"] = that.streetItem.cityCode;
          params["cityName"] = that.streetItem.cityName;
          params["areaName"] = that.streetItem.areaName;
          params["areaCode"] = that.streetItem.areaCode;
          params["streetName"] = that.streetItem.streetName;
          params["streetCode"] = that.streetItem.streetCode;
          Server.post(Path.addStreetData, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.refreshStreetItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    refreshBankItem() {
      let that = this;
      that.bankItem = {
        provincename: "",
        citycode: "",
        banktype: "",
        bankname: "",
        bankcode: ""
      };
      that.$refs.bankItem.resetFields();
    },
    saveBankItem() {
      let that = this;
      console.log(that.bankItem);
      that.$refs.bankItem.validate(valid => {
        if (valid) {
          let params = {};
          params["citycode"] = that.bankItem.cityCode;
          params["banktype"] = that.bankItem.banktype;
          params["bankname"] = that.bankItem.bankname;
          params["bankcode"] = that.bankItem.bankcode;
          Server.post(Path.addBanksData, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.refreshBankItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    refreshPayTypeItem() {
      let that = this;
      that.payTypeItem = {
        paytypename: ""
      };
      that.$refs.payTypeItem.resetFields();
      that.getPayTypeList();
    },
    savePayTypeItem() {
      let that = this;
      that.$refs.payTypeItem.validate(valid => {
        if (valid) {
          let params = {};
          params["paytypename"] = that.payTypeItem.paytypename;
          Server.post(Path.addPayType, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.refreshPayTypeItem();
              // that.getPayTypeList();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    refreshPayWayItem() {
      let that = this;
      that.wayItem = {
        paywayname: "",
        paywaycode: ""
      };
      that.$refs.wayItem.resetFields();
      that.getPayWayList();
    },
    savePayWayItem() {
      let that = this;
      that.$refs.wayItem.validate(valid => {
        if (valid) {
          let params = {};
          params["paywayname"] = that.wayItem.paywayname;
          params["paywaycode"] = that.wayItem.paywaycode;
          Server.post(Path.addPayWay, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              // that.getPayWayList();
              that.refreshPayWayItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    refreshRouteTemplateItem() {
      let that = this;
      that.routeTemplateItem = {
        flag: "",
        templatename: ""
      };
      that.$refs.routeTemplateItem.resetFields();
      that.getTemplateList();
    },
    saveRouteTemplateItem() {
      let that = this;
      that.$refs.routeTemplateItem.validate(valid => {
        if (valid) {
          let params = {};
          params["flag"] = that.routeTemplateItem.flagTemplate;
          params["templatename"] = that.routeTemplateItem.templatename;
          Server.post(Path.addRouteTemplate, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              // that.getTemplateList();
              that.refreshRouteTemplateItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    refreshRouteItem() {
      let that = this;
      that.routeItem = {
        paywaycodeRoute: "",
        paytypecode: "",
        templatecode: "",
        routename: "",
        feerate: "",
        flag: ""
      };
      that.$refs.routeItem.resetFields();
      that.getRouteList();
    },
    saveRouteItem() {
      let that = this;
      that.$refs.routeItem.validate(valid => {
        if (valid) {
          let params = {};
          params["paywaycode"] = that.routeItem.paywaycodeRoute;
          params["paytypecode"] = that.routeItem.paytypecode;
          params["templatecode"] = that.routeItem.templatecode;
          params["routename"] = that.routeItem.routename;
          params["feerate"] = that.routeItem.feerate;
          params["flag"] = that.routeItem.flag;
          Server.post(Path.addRoute, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              // that.getRouteList();
              that.refreshRouteItem();
              that.$message.success("操作成功!");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },

    catchAbout(value) {
      let that = this;
      that.noticeItem.noticecontent = value; //在这里接受子组件传过来的参数，赋值给data里的参数
      that.$refs.noticeItem.validate(valid => {});
    },
    // 分页导航
    handlePageChange(val) {
      let that = this;
      that.pageInfo.pageIndex = val;
      that.pageInfo.pageSize = 10;
      if (that.isPayType) {
        that.getPayTypeList();
      }
      if (that.isWay) {
        that.getPayWayList();
      }
      if (that.isRouteTemplate) {
        that.getTemplateList();
      }
      if (that.isRoute) {
        that.getRouteList();
      }
    },
    // 更改分页大小
    handleSizeChange(val) {
      let that = this;
      that.tableData = [];
      that.pageInfo.pageIndex = 1;
      that.pageInfo.pageSize = val;
      if (that.isPayType) {
        that.getPayTypeList();
      }
      if (that.isWay) {
        that.getPayWayList();
      }
      if (that.isRouteTemplate) {
        that.getTemplateList();
      }
      if (that.isRoute) {
        that.getRouteList();
      }
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

.form {
  /* padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px; */
  padding: 20px;
  border-top: 1px solid #ddd;
}
/deep/ .el-card__body {
  padding: 0;
}
</style>
