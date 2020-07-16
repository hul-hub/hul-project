<template>
  <div class="tab-container">
    <div class="search marginTwo">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <span class="detail-title">{{id?"编辑商户":"新增商户"}}</span>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" justify="end">
            <el-button type="primary" icon="el-icon-arrow-left" @click="goBack" size="small">返回</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-tabs type="border-card" :value="activeName">
        <el-tab-pane label="商户信息" name="1" disabled>
          <el-form
            ref="serviceMerchantItem"
            :model="serviceMerchantItem"
            :rules="serviceMerchantItemRules"
            label-width="100px"
          >
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="商户名称:" prop="serproname">
                  <el-input v-model="serviceMerchantItem.serproname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属服务商:" prop="upserprocode">
                  <el-select
                    v-model="serviceMerchantItem.upserprocode"
                    @change="upserprocodeFun"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in toSerproList"
                      :key="index"
                      :label="item.serproname"
                      :value="item.serprocode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商户级别:" prop="serprotype">
                  <el-select v-model="serviceMerchantItem.serprotype" disabled style="width:100%">
                    <el-option
                      v-for="(item,index) in serprolevelList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="商户简称:" prop="serproshortname">
                  <el-input v-model="serviceMerchantItem.serproshortname"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="商户省份:">
                  <el-select
                    v-model="serviceMerchantItem.province"
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
              <el-col :span="8">
                <el-form-item label="商户城市:">
                  <el-select
                    v-model="serviceMerchantItem.city"
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
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="商户区/县:">
                  <el-select
                    v-model="serviceMerchantItem.county"
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
              <el-col :span="8">
                <el-form-item label="详细地址:">
                  <el-input v-model="serviceMerchantItem.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客服电话:">
                  <el-input v-model="serviceMerchantItem.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="pre">下一步</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="营业信息" name="2" disabled>
          <el-form
            ref="businessItem"
            :model="businessItem"
            :rules="businessItemRules"
            label-width="130px"
          >
            <el-row :gutter="36">
              <el-col :span="12">
                <el-form-item label="营业执照编号:" prop="businesslicense">
                  <el-input v-model="businessItem.businesslicense"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="营业执照有效期:">
                  <el-date-picker
                    v-model="businessItem.validstartdate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                  ></el-date-picker>
                  <span>-</span>
                  <el-date-picker
                    v-model="businessItem.validenddate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="结束日期"
                  ></el-date-picker>
                  <el-checkbox
                    v-model="businessItem.islongtime"
                    style="margin-left: 10px;"
                    true-label="1"
                  >长期</el-checkbox>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="2">
                
              </el-col>-->
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="运营时间:">
                  <TimePicker
                    type="time"
                    placeholder="时间"
                    format="HH:mm"
                    v-model.trim="businessItem.businessstarthours"
                    style="width: 200px"
                  ></TimePicker>
                  <span>-</span>
                  <TimePicker
                    type="time"
                    placeholder="时间"
                    format="HH:mm"
                    v-model.trim="businessItem.businessendhours"
                    style="width: 200px"
                  ></TimePicker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="营业执照:" prop="businesslicenes" ref="slicenes">
                  <upload-file
                    :param="businesslicenes"
                    :cosImage="businessItem.businesslicenes"
                    @catchData="ChildToParentSlicenes"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证:" prop="taximg" ref="tax">
                  <upload-file
                    :param="taximg"
                    :cosImage="businessItem.taximg"
                    @catchData="ChildToParentSlicenesTaximg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构代码证:" prop="organizationimg" ref="orgImg">
                  <upload-file
                    :param="organizationimg"
                    :cosImage="businessItem.organizationimg"
                    @catchData="ChildToParentOrg"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="back">上一步</el-button>
            <el-button size="small" type="primary" @click="preTwo">下一步</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="经营信息" name="3" disabled>
          <el-form ref="shopItem" :model="shopItem" :rules="shopItemRules" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="经营名称:" prop="businessname">
                  <el-input v-model="shopItem.businessname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商户类型:" prop="merchanttype">
                  <el-select v-model="shopItem.merchanttype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in merchanttypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="行业类型:" prop="businesstype">
                  <el-select
                    v-model="shopItem.onebusinesstype"
                    placeholder="请选择"
                    @change="changeIndustryTwo"
                  >
                    <el-option
                      v-for="(item,index) in industryList"
                      :key="index"
                      :label="item.oneName"
                      :value="item.oneCode"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="shopItem.twobusinesstype"
                    placeholder="请选择"
                    @change="changeIndustryThree"
                  >
                    <el-option
                      v-for="(item,index) in industryTwoList"
                      :key="index"
                      :label="item.twoName"
                      :value="item.twoCode"
                    ></el-option>
                  </el-select>
                  <el-select v-model="shopItem.businesstype" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in industryThreeList"
                      :key="index"
                      :label="item.threeName"
                      :value="item.threeCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="门口照:" prop="bodyimg" ref="bodyimg">
                  <upload-file
                    :param="bodyimg"
                    :cosImage="shopItem.bodyimg"
                    :uploadRef="bodyimg"
                    @catchData="ChildToParent"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收银台照片:" prop="storecashierphoto">
                  <upload-file
                    :param="storecashierphoto"
                    :cosImage="shopItem.storecashierphoto"
                    @catchData="ChildToParentstorecashierphoto"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="内部经营照:" prop="businessimg">
                  <upload-file
                    :param="businessimg"
                    :cosImage="shopItem.businessimg"
                    @catchData="ChildToParentbusinessimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="开户许可证:">
                  <upload-file
                    :param="accountopenimg"
                    :cosImage="shopItem.accountopenimg"
                    @catchData="ChildToParentaccountopenimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="特殊行业许可证:">
                  <upload-file
                    :param="specialbusinessimg"
                    :cosImage="shopItem.specialbusinessimg"
                    @catchData="ChildToParentspecialbusinessimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其他补充材料:">
                  <upload-file
                    :param="otherimg1"
                    :cosImage="shopItem.otherimg1"
                    @catchData="ChildToParentotherimg1"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="6">
                <el-form-item label="商户协议:">
                  <upload-file
                    :param="serproagreementimg"
                    :cosImage="shopItem.serproagreementimg1"
                    @catchData="ChildToParentserproagreementimg1"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label>
                  <upload-file
                    :param="serproagreementimg"
                    :cosImage="shopItem.serproagreementimg2"
                    @catchData="ChildToParentserproagreementimg2"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label>
                  <upload-file
                    :param="serproagreementimg"
                    :cosImage="shopItem.serproagreementimg3"
                    @catchData="ChildToParentserproagreementimg3"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label>
                  <upload-file
                    :param="serproagreementimg"
                    :cosImage="shopItem.serproagreementimg4"
                    @catchData="ChildToParentserproagreementimg4"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="back">上一步</el-button>
            <el-button size="small" type="primary" @click="preThree">下一步</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="法人信息" name="4" disabled>
          <el-form ref="legalItem" :model="legalItem" :rules="legalItemRules" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名:" prop="contactsname">
                  <el-input v-model="legalItem.contactsname" maxlength="5"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型:" prop="idcodetype">
                  <el-select v-model="legalItem.idcodetype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in idcodetypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码:" prop="idcode">
                  <el-input v-model="legalItem.idcode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="身份证有效期:">
                  <el-date-picker
                    v-model="legalItem.idvalidstartdate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                  ></el-date-picker>
                  <span>-</span>
                  <el-date-picker
                    v-model="legalItem.idvalidenddate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="身份证正面:" prop="idfrontimg">
                  <upload-file
                    :param="idfrontimg"
                    :cosImage="legalItem.idfrontimg"
                    @catchData="ChildToParentidfrontimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证反面:" prop="idbackimg">
                  <upload-file
                    :param="idbackimg"
                    :cosImage="legalItem.idbackimg"
                    @catchData="ChildToParentidbackimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="back">上一步</el-button>
            <el-button size="small" type="primary" @click="preFour">下一步</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="开户信息" name="5" disabled>
          <el-form
            ref="accountItem"
            :model="accountItem"
            :rules="accountItemRules"
            label-width="130px"
          >
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="开户人姓名:" prop="accountname">
                  <el-input v-model="accountItem.accountname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户类型:" prop="accounttype">
                  <el-select
                    v-model="accountItem.accounttype"
                    @change="changeaccounttype"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in accounttypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户省份:" prop="province">
                  <el-select
                    v-model="accountItem.province"
                    @change="changeAccountProvince"
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
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="开户城市:" prop="city">
                  <el-select
                    v-model="accountItem.city"
                    @change="changeAccountCity"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in cityAccountList"
                      :key="index"
                      :label="item.cityName"
                      :value="item.cityCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行:" prop="bankid">
                  <el-select
                    v-model="accountItem.bankid"
                    @change="changeBank"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in bankList"
                      :key="index"
                      :label="item.bankname"
                      :value="item.bankcode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行支行:" prop="branchid">
                  <el-select v-model="accountItem.branchid" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in bankBranchList"
                      :key="index"
                      :label="item.branchName"
                      :value="item.branchId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="证件类型:" prop="idcardtype">
                  <el-select v-model="accountItem.idcardtype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="(item,index) in idcardtypeAccountList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码:" prop="idcard">
                  <el-input v-model="accountItem.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持卡人地址:" prop="address">
                  <el-input v-model="accountItem.address"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="证件有效期:">
                  <el-date-picker
                    v-model="accountItem.bcvalidstartdate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                  ></el-date-picker>
                  <span>-</span>
                  <el-date-picker
                    v-model="accountItem.bcvalidenddate"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="银行预留手机号:" prop="tel">
                  <el-input v-model="accountItem.tel"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号:" prop="accountcode">
                  <el-input v-model="accountItem.accountcode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="银行卡正面:" prop="accountfrontimg">
                  <upload-file
                    :param="accountfrontimg"
                    :cosImage="accountItem.accountfrontimg"
                    @catchData="ChildToParentaccountfrontimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡反面:">
                  <upload-file
                    :param="accountbackimg"
                    :cosImage="accountItem.accountbackimg"
                    @catchData="ChildToParentaccountbackimg"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约授权书:" v-if="isaccounttype">
                  <upload-file
                    :param="signauthletterphoto"
                    :cosImage="accountItem.signauthletterphoto"
                    @catchData="ChildToParentsignauthletterphoto"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36" v-if="isaccounttype">
              <el-col :span="8">
                <el-form-item label="结算授权函:">
                  <upload-file
                    :param="settleauthletterphoto"
                    :cosImage="accountItem.settleauthletterphoto"
                    @catchData="ChildToParentsettleauthletterphoto"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算授权人身份证正面:">
                  <upload-file
                    :param="settleauthidcardfront"
                    :cosImage="accountItem.settleauthidcardfront"
                    @catchData="ChildToParentsettleauthidcardfront"
                  ></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算授权人身份证反面:">
                  <upload-file
                    :param="settleauthidcardback"
                    :cosImage="accountItem.settleauthidcardback"
                    @catchData="ChildToParentsettleauthidcardback"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="back">上一步</el-button>
            <el-button size="small" type="primary" @click="preFive">下一步</el-button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="6" disabled>
          <el-form
            ref="contactsItem"
            :model="contactsItem"
            :rules="contactsItemRules"
            label-width="110px"
          >
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="联系人类型:" prop="contactstype">
                  <el-select
                    v-model="contactsItem.contactstype"
                    @change="changecontactstype"
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in contactstypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人手机号:" prop="mobile">
                  <el-input v-model="contactsItem.mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人邮箱:" prop="email">
                  <el-input v-model="contactsItem.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="iscontactstype">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名:">
                    <el-input v-model="contactsItem.contactsname" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件类型:">
                    <el-select
                      v-model="contactsItem.idcodetype"
                      placeholder="请选择"
                      style="width:100%"
                    >
                      <el-option
                        v-for="(item,index) in idcodetypeList"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码:">
                    <el-input v-model="contactsItem.idcode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="36">
                <el-col :span="24">
                  <el-form-item label="身份证有效期:">
                    <el-date-picker
                      v-model="contactsItem.idvaliddate"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="36">
                <el-col :span="8">
                  <el-form-item label="身份证正面:">
                    <upload-file
                      :param="conidfrontimg"
                      :cosImage="contactsItem.conidfrontimg"
                      @catchData="ChildToParentconidfrontimg"
                    ></upload-file>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证反面:">
                    <upload-file
                      :param="conidbackimg"
                      :cosImage="contactsItem.conidbackimg"
                      @catchData="ChildToParentconidbackimg"
                    ></upload-file>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button size="small" type="primary" @click="back">上一步</el-button>
            <el-button size="small" type="primary" @click="okFun">确定</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 编辑弹出框 -->
    <template></template>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import uploadDefault from "@/assets/img/uploadImage.png";
import uploadFile from "@/components/common/uploadFile/index.vue";
export default {
  name: "merchantAdd",
  components: { "upload-file": uploadFile },
  data() {
    return {
      id: "",
      accept: [".jpg", ".jpeg", ".png"],
      uploadDefault: uploadDefault,
      activeName: "",
      provinceList: [],
      industryList: [],
      industryTwoList: [],
      industryThreeList: [],
      twoIndustryList: [],
      threeIndustryList: [],
      bankList: [],
      bankBranchList: [],
      cityList: [],
      cityAccountList: [],
      areaList: [],
      serviceMerchantItem: {
        serproname: "", //商户/商户名称
        serproshortname: "", //	商户/商户简称
        upserprocode: "", //所属商户id，上级商户
        serprolevel: "", //商户级别
        serprotype: "", //类型
        province: "", //省
        city: "", //市
        county: "", //区
        address: "", //详细地址
        phone: "" //客服电话
      },
      //商户级别：商户类型serviceType + （所属商户级别serprolevl+1） 例如11：一级商户，12：二级商户。21：一级商户，22：二级商户
      serprolevelList: [
        { value: "21", label: "直营商户" },
        { value: "22", label: "非直营商户" }
      ],
      toSerproList: [],
      businessItem: {
        businesslicense: "", //  营业执照编号
        validstartdate: "", //营业执照有效期开始日期
        validenddate: "", //营业执照有效期结束日期
        islongtime: "0", //营业执照是否长期有效（1是/0否）
        businessstarthours: "", //营业开始时间（点数）
        businessendhours: "", //营业结束时间（点数）
        businesslicenes: "", // 	营业执照图片链接
        taximg: "", // 	 税务登记证
        organizationimg: "" // 	 组织机构代码证
      },
      shopItem: {
        businessname: "", //经营名称
        merchanttype: "", // 商户类型
        onebusinesstype: "", //行业类型
        twobusinesstype: "", //行业类型
        businesstype: "", //行业类型
        bodyimg: "", //门头照
        storecashierphoto: "", // 收银台照片
        businessimg: "", // 内部经营图片链接
        accountopenimg: "", // 	开户许可证图片链接
        specialbusinessimg: "", // 	特殊行业许可证
        otherimg1: "", // 	其它材料
        serproagreementimg: "", // 	商户协议
        serproagreementimg1: "", // 	商户协议
        serproagreementimg2: "", // 	商户协议
        serproagreementimg3: "", // 	商户协议
        serproagreementimg4: "" // 	商户协议
      },
      organizationimg: "organizationimg",
      taximg: "taximg",
      businesslicenes: "businesslicenes",
      bodyimg: "bodyimg",
      storecashierphoto: "storecashierphoto",
      businessimg: "storecashierphoto",
      accountopenimg: "accountopenimg",
      specialbusinessimg: "specialbusinessimg",
      otherimg1: "otherimg1",
      serproagreementimg: "serproagreementimg",
      idfrontimg: "idfrontimg",
      idbackimg: "idbackimg",
      accountfrontimg: "accountfrontimg",
      accountbackimg: "accountbackimg",
      conidfrontimg: "conidfrontimg",
      conidbackimg: "conidbackimg",
      signauthletterphoto: "signauthletterphoto",
      settleauthletterphoto: "settleauthletterphoto", //
      settleauthidcardfront: "settleauthidcardfront", //
      settleauthidcardback: "settleauthidcardback", //
      merchanttypeList: [
        { label: "个人", value: "1" },
        { label: "企业", value: "2" },
        { label: "小微企业", value: "4" }
      ],
      idcodetypeList: [{ label: "身份证", value: "1" }],
      legalItem: {
        contactsname: "", //责任人姓名
        idfrontimg: "", // 身份证正面
        idbackimg: "", //身份证反面
        idcodetype: "", //证件类型
        idcode: "", // 证件号码
        idvaliddate: [], //
        idvalidstartdate: "", //身份证开始时间
        idvalidenddate: "" //身份证结束时间
      },
      // 当账号类型选择（对公、对私-法人）这两种情况，持卡
      //人证件类型、证件编号、证件有效期、持卡人地址这四个功能不需要自己填写，从界
      //面相关数据直接获取，持卡人地址由上个界面的商户地址和详细地址拼接组成。
      accounttypeList: [
        { label: "对公", value: "1" },
        { label: "对私法人", value: "2" },
        { label: "对私非法人", value: "3" }
      ],
      idcardtypeAccountList: [
        { label: "身份证", value: "1" },
        { label: "护照", value: "2" },
        { label: "军人证", value: "3" }
      ],
      accountItem: {
        accountname: "", // 开户人姓名
        accounttype: "", //账户类型
        province: "", //省份
        city: "", //城市
        bankid: "", //开户银行
        branchid: "", //开户银行支行
        idcardtype: "", //	持卡人证件类型
        idcard: "", //	证件编号
        bcvalidstartdate: "", //
        bcvalidenddate: "",
        accountcode: "", // 银行账号
        tel: "", // 银行预留手机号
        address: "", // 持卡人地址
        accountfrontimg: "", // 银行卡正面照
        accountbackimg: "", // 银行卡反面照
        signauthletterphoto: "", // 签约授权书
        settleauthletterphoto: "", // 结算授权函图片
        settleauthidcardfront: "", // 结算授权人身份证正面
        settleauthidcardback: "" // 结算授权人身份证反面
      },
      contactstypeList: [
        { label: "法人", value: "1" },
        { label: "负责人", value: "2" }
      ],
      iscontactstype: false,
      isaccounttype: false,
      contactsItem: {
        contactstype: "", //联系人类型
        mobile: "", //联系人手机号
        email: "", //联系人邮箱
        contactsname: "", //联系人姓名
        idcodetype: "", //证件类型
        idcode: "", //证件号码
        idvaliddate: [],
        idvalidstartdate: "",
        idvalidenddate: "",
        conidfrontimg: "", //身份证正面链接
        conidbackimg: "" //身份证反面链接
      },
      businessItemRules: {
        businesslicense: [
          { required: true, message: "请输入营业执照编号", trigger: "blur" }
        ],
        validdate: [{ required: true, message: "请选择执照有效期" }],
        businesslicenes: [{ required: true, message: "请选择营业执照" }],
        organizationimg: [{ required: true, message: "请选择组织机构代码证" }],
        taximg: [{ required: true, message: "请选择税务登记证" }]
      },
      serviceMerchantItemRules: {
        serproname: [
          { required: true, message: "请输入商户名称", trigger: "blur" }
        ],
        serproshortname: [
          { required: true, message: "请输入商户简称", trigger: "blur" }
        ],
        upserprocode: [
          { required: true, message: "请选择所属服务商", trigger: "change" }
        ],
        serprotype: [
          { required: true, message: "请选择商户等级", trigger: "change" }
        ]
      },
      shopItemRules: {
        merchanttype: [
          { required: true, message: "请选择商户类型", trigger: "change" }
        ],
        businesstype: [
          { required: true, message: "请选择行业类型", trigger: "change" }
        ],
        businessname: [
          { required: true, message: "请输入经营名称", trigger: "blur" }
        ],
        bodyimg: [{ required: true, message: "请选择门头照" }],
        storecashierphoto: [{ required: true, message: "请选择收银台照片" }],
        businessimg: [{ required: true, message: "请选择内部经营图片" }]
      },
      legalItemRules: {
        contactsname: [
          { required: true, message: "请输入法人姓名", trigger: "blur" }
        ],
        idcode: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        idcodetype: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        idvaliddate: [
          { required: true, message: "请选择身份证有效期", trigger: "change" }
        ],
        idfrontimg: [{ required: true, message: "请选择身份证正面" }],
        idbackimg: [{ required: true, message: "请选择身份证反面" }]
      },
      accountItemRules: {
        accountname: [
          { required: true, message: "请输入开户人姓名", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入银行预留手机哈", trigger: "blur" }
        ],
        accountcode: [
          { required: true, message: "请输入银行卡账号", trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入持卡人地址", trigger: "blur" }
        ],
        accounttype: [
          { required: true, message: "请选择账户类型", trigger: "change" }
        ],
        province: [
          { required: true, message: "请选择开户省份", trigger: "change" }
        ],
        city: [
          { required: true, message: "请选择开户城市", trigger: "change" }
        ],
        bankid: [
          { required: true, message: "请选择开户银行", trigger: "change" }
        ],
        branchid: [
          { required: true, message: "请选择开户银行支行", trigger: "change" }
        ],
        idcardtype: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        accountfrontimg: [
          { required: true, message: "请选择银行卡正面", trigger: "change" }
        ]
      },
      contactsItemRules: {
        contactstype: [
          { required: true, message: "请选择商户类型", trigger: "change" }
        ],
        mobile: [
          { required: true, message: "请输入联系人手机号", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入联系人邮箱", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let that = this;
    that.id = that.$route.query.id;
    if (that.id) {
      that.loadData();
    }
    that.querySerProListByCode();
    that.queryBasedatamgProvince();
    that.queryBasedatamgIndustryList(1, "");
    that.loadBankList();
    that.activeName = "1";
  },
  methods: {
    changeType(type) {
      console.log(type);
    },
    loadData() {
      let that = this;
      let params = {};
      params["serProCode"] = that.id;
      Server.post(Path.querySerProByCode, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          // 处理返回值的横杠;
          for (let key in data) {
            if (data[key]) {
              if (data[key] == "-") {
                data[key] = "";
              }
              if (key == "serProAddress") {
                for (let child in data[key]) {
                  if (data[key][child] == "-") {
                    data[key][child] = "";
                  }
                }
              }
              if (key == "serProImage") {
                for (let child in data[key]) {
                  if (data[key][child] == "-") {
                    data[key][child] = "";
                  }
                }
              }
              if (key == "serProImage") {
                for (let child in data[key]) {
                  if (data[key][child] == "-") {
                    data[key][child] = "";
                  }
                }
              }
              if (key == "serProAddress") {
                for (let child in data[key]) {
                  if (data[key][child] == "-") {
                    data[key][child] = "";
                  }
                }
              }
              if (key == "serProBank") {
                for (let child in data[key]) {
                  if (data[key][child] == "-") {
                    data[key][child] = "";
                  }
                }
              }
            }
          }
          // console.log(data);
          that.businessItem.businesslicense = data.businesslicense;
          that.businessItem.validstartdate = data.validstartdate;
          that.businessItem.validenddate = data.validenddate;
          that.businessItem.islongtime = data.islongtime;
          that.businessItem.businessstarthours = data.businessstarthours;
          that.businessItem.businessendhours = data.businessendhours;
          that.serviceMerchantItem.serproname = data.serproname;
          that.serviceMerchantItem.serprotype = data.serprotype;
          that.serviceMerchantItem.serproshortname = data.serproshortname;
          that.serviceMerchantItem.upserprocode = data.upserprocode;
          that.serviceMerchantItem.serprolevel = data.serprolevel;
          that.serviceMerchantItem.phone = data.phone;
          that.shopItem.merchanttype = data.merchanttype;
          that.shopItem.businessname = data.businessname;
          that.shopItem.businesstype = data.businesstype;
          // 获取单个行业
          if (that.shopItem.businesstype) {
            that.businesstypeList(that.shopItem.businesstype);
          }

          // serProAddress
          that.serviceMerchantItem.province = data.serProAddress.province;
          // 获取城市名字
          if (that.serviceMerchantItem.province) {
            that.changeProvince(that.serviceMerchantItem.province);
          }
          that.serviceMerchantItem.city = data.serProAddress.city;
          // 获取区县名字
          if (that.serviceMerchantItem.city) {
            that.changeCity(that.serviceMerchantItem.city);
          }
          that.serviceMerchantItem.county = data.serProAddress.county;

          that.serviceMerchantItem.address = data.serProAddress.address;
          that.serviceMerchantItem.status = data.serProAddress.status;
          that.serviceMerchantItem.flag = data.serProAddress.flag;

          //serProImage
          that.shopItem.accountopenimg = data.serProImage.accountopenimg;
          that.shopItem.specialbusinessimg =
            data.serProImage.specialbusinessimg;
          let arr = data.serProImage.serproagreementimg.split(",");
          for (var i = 0; i < arr.length; i++) {
            let url = arr[i];
            switch (i) {
              case 0:
                that.shopItem.serproagreementimg1 = url;
                break;
              case 1:
                that.shopItem.serproagreementimg2 = url;
                break;
              case 2:
                that.shopItem.serproagreementimg3 = url;
                break;
              case 3:
                that.shopItem.serproagreementimg4 = url;
                break;
            }
          }
          if (that.shopItem.serproagreementimg1 == "-") {
            that.shopItem.serproagreementimg1 = "";
          }
          if (that.shopItem.serproagreementimg2 == "-") {
            that.shopItem.serproagreementimg2 = "";
          }
          if (that.shopItem.serproagreementimg3 == "-") {
            that.shopItem.serproagreementimg3 = "";
          }
          if (that.shopItem.serproagreementimg4 == "-") {
            that.shopItem.serproagreementimg4 = "";
          }

          that.businessItem.businesslicenes = data.serProImage.businesslicenes;
          that.legalItem.idfrontimg = data.serProImage.idfrontimg;
          that.legalItem.idbackimg = data.serProImage.idbackimg;
          that.shopItem.bodyimg = data.serProImage.bodyimg;
          that.shopItem.businessimg = data.serProImage.businessimg;
          that.shopItem.otherimg1 = data.serProImage.otherimg1;
          that.accountItem.accountfrontimg = data.serProImage.accountfrontimg;
          that.accountItem.accountbackimg = data.serProImage.accountbackimg;
          that.accountItem.signauthletterphoto =
            data.serProImage.signauthletterphoto;
          that.accountItem.settleauthletterphoto =
            data.serProImage.settleauthletterphoto;
          that.accountItem.settleauthidcardfront =
            data.serProImage.settleauthidcardfront;
          that.accountItem.settleauthidcardback =
            data.serProImage.settleauthidcardback;

          that.businessItem.taximg = data.serProImage.taximg;
          that.businessItem.organizationimg = data.serProImage.organizationimg;
          that.shopItem.storecashierphoto = data.serProImage.storecashierphoto;

          // serProBank
          that.accountItem.accounttype = data.serProBank.accounttype;
          // 如果为对私非法人accounttype == 3
          if (that.accountItem.accounttype == 3) {
            that.isaccounttype = true;
          }
          that.accountItem.province = data.serProBank.province;
          if (that.accountItem.province) {
            that.changeAccountProvince(that.accountItem.province);
          }
          that.accountItem.city = data.serProBank.city;
          that.accountItem.bankid = data.serProBank.bankid
            ? parseInt(data.serProBank.bankid)
            : "";
          if (that.accountItem.city && that.accountItem.bankid) {
            that.changeBank(that.accountItem.bankid);
          }
          that.accountItem.branchid = data.serProBank.branchid;
          that.accountItem.accountcode = data.serProBank.accountcode;
          that.accountItem.accountname = data.serProBank.accountname;
          that.accountItem.idcardtype = data.serProBank.idcardtype;
          that.accountItem.idcard = data.serProBank.idcard;
          that.accountItem.bcvalidstartdate = data.serProBank.bcvalidstartdate;
          that.accountItem.bcvalidenddate = data.serProBank.bcvalidenddate;
          that.accountItem.address = data.serProBank.address;
          that.accountItem.tel = data.serProBank.tel;

          if (data.serProContacts.length > 1) {
            that.iscontactstype = true;
            that.contactsItem.contactstype =
              data.serProContacts[1].contactstype;
            that.contactsItem.mobile = data.serProContacts[1].mobile;
            that.contactsItem.email = data.serProContacts[1].email;
            that.contactsItem.contactsname =
              data.serProContacts[1].contactsname;
            that.contactsItem.idcode = data.serProContacts[1].idcode;
            that.contactsItem.idcodetype = data.serProContacts[1].idcodetype;
            that.contactsItem.conidfrontimg =
              data.serProContacts[1].conidfrontimg;
            that.contactsItem.conidbackimg =
              data.serProContacts[1].conidbackimg;
            that.contactsItem.idvalidstartdate =
              data.serProContacts[1].idvalidstartdate;
            that.contactsItem.idvalidenddate =
              data.serProContacts[1].idvalidenddate;
          } else {
            that.contactsItem.contactstype =
              data.serProContacts[0].contactstype;
            that.contactsItem.mobile = data.serProContacts[0].mobile;
            that.contactsItem.email = data.serProContacts[0].email;
            that.legalItem.idvalidstartdate =
              data.serProContacts[0].idvalidstartdate;
            that.legalItem.idvalidenddate =
              data.serProContacts[0].idvalidenddate;
          }
          that.legalItem.contactstype = data.serProContacts[0].contactstype;
          that.legalItem.contactsname = data.serProContacts[0].contactsname;
          that.legalItem.idcodetype = data.serProContacts[0].idcodetype;
          that.legalItem.idcode = data.serProContacts[0].idcode;
          that.contactsItem.mobile = data.serProContacts[0].mobile;
          that.contactsItem.email = data.serProContacts[0].email;
        }
      });
    },
    okFun() {
      let that = this;
      let params = {};
      that.$refs.contactsItem.validate(async valid => {
        if (valid) {
          // 参数非必填项目传-
          for (let key in that.serviceMerchantItem) {
            if (!that.serviceMerchantItem[key]) {
              that.serviceMerchantItem[key] = "-";
            }
          }
          for (let key in that.businessItem) {
            if (!that.businessItem[key]) {
              that.businessItem[key] = "-";
            }
          }
          for (let key in that.shopItem) {
            if (!that.shopItem[key]) {
              that.shopItem[key] = "-";
            }
          }
          for (let key in that.legalItem) {
            if (!that.legalItem[key]) {
              that.legalItem[key] = "-";
            }
          }
          for (let key in that.accountItem) {
            if (!that.accountItem[key]) {
              that.accountItem[key] = "-";
            }
          }
          for (let key in that.contactsItem) {
            if (!that.contactsItem[key]) {
              that.contactsItem[key] = "-";
            }
          }
          params["businesslicense"] = that.businessItem.businesslicense;
          params["validstartdate"] =
            that.businessItem.validstartdate == "-"
              ? ""
              : that.businessItem.validstartdate;
          params["validenddate"] =
            that.businessItem.validenddate == "-"
              ? ""
              : that.businessItem.validenddate;
          params["islongtime"] = that.businessItem.islongtime;
          params["businessstarthours"] = that.businessItem.businessstarthours;
          params["businessendhours"] = that.businessItem.businessendhours;
          params["serproname"] = that.serviceMerchantItem.serproname;
          params["serprotype"] = that.serviceMerchantItem.serprotype;
          params["serproshortname"] = that.serviceMerchantItem.serproshortname;
          params["upserprocode"] = that.serviceMerchantItem.upserprocode;
          params["serprolevel"] = that.serviceMerchantItem.serprolevel;
          params["phone"] = that.serviceMerchantItem.phone;
          params["merchanttype"] = that.shopItem.merchanttype;
          params["businessname"] = that.shopItem.businessname;
          params["businesstype"] = that.shopItem.businesstype;
          params["status"] = "9";
          // 服务商1 ，商户2
          params["servicetype"] = "2";

          // 商户信息对象
          // params["serProAddress.serprocode"] = "";
          params["serProAddress.province"] = that.serviceMerchantItem.province;
          params["serProAddress.city"] = that.serviceMerchantItem.city;
          params["serProAddress.county"] = that.serviceMerchantItem.county;
          params["serProAddress.address"] = that.serviceMerchantItem.address;
          params["serProAddress.status"] = that.serviceMerchantItem.status;
          params["serProAddress.flag"] = that.serviceMerchantItem.flag;

          params["serProImage.accountopenimg"] = that.shopItem.accountopenimg;
          params["serProImage.specialbusinessimg"] =
            that.shopItem.specialbusinessimg;
          // 处理商户协议多张图片用","隔开
          let imgArr = [];
          if (that.shopItem.serproagreementimg1) {
            imgArr.push(that.shopItem.serproagreementimg1);
          }
          if (that.shopItem.serproagreementimg2) {
            imgArr.push(that.shopItem.serproagreementimg2);
          }
          if (that.shopItem.serproagreementimg3) {
            imgArr.push(that.shopItem.serproagreementimg3);
          }
          if (that.shopItem.serproagreementimg4) {
            imgArr.push(that.shopItem.serproagreementimg4);
          }
          params["serProImage.serproagreementimg"] = imgArr.join(",");
          params["serProImage.businesslicenes"] =
            that.businessItem.businesslicenes;
          params["serProImage.idfrontimg"] = that.legalItem.idfrontimg;
          params["serProImage.idbackimg"] = that.legalItem.idbackimg;
          params["serProImage.bodyimg"] = that.shopItem.bodyimg;
          params["serProImage.businessimg"] = that.shopItem.businessimg;
          params["serProImage.otherimg1"] = that.shopItem.otherimg1;
          params["serProImage.accountfrontimg"] =
            that.accountItem.accountfrontimg;
          params["serProImage.accountbackimg"] =
            that.accountItem.accountbackimg;
          params["serProImage.indentityfrontimg"] = "-";
          params["serProImage.indentitybackimg"] = "-";
          params["serProImage.otherimg2"] = "-";
          params["serProImage.otherimg3"] = "-";
          params["serProImage.otherimg4"] = "-";
          params["serProImage.taximg"] = that.businessItem.taximg;
          params["serProImage.organizationimg"] =
            that.businessItem.organizationimg;
          params["serProImage.storecashierphoto"] =
            that.shopItem.storecashierphoto;
          params["serProImage.settleauthletterphoto"] =
            that.accountItem.settleauthletterphoto;
          params["serProImage.settleauthidcardfront"] =
            that.accountItem.settleauthidcardfront;
          params["serProImage.settleauthidcardback"] =
            that.accountItem.settleauthidcardback;
          params["serProImage.signauthletterphoto"] =
            that.accountItem.signauthletterphoto;
          // serProBank['serprocode'] = "";
          params["serProBank.accounttype"] = that.accountItem.accounttype;
          params["serProBank.province"] = that.accountItem.province;
          params["serProBank.city"] = that.accountItem.city;
          params["serProBank.bankid"] = that.accountItem.bankid;
          params["serProBank.bankname"] = "";
          params["serProBank.branchname"] = "";
          params["serProBank.branchid"] = that.accountItem.branchid;
          params["serProBank.accountcode"] = that.accountItem.accountcode;
          params["serProBank.accountname"] = that.accountItem.accountname;
          params["serProBank.idcardtype"] = that.accountItem.idcardtype;
          params["serProBank.idcard"] = that.accountItem.idcard;
          params["serProBank.bcvalidstartdate"] =
            that.accountItem.bcvalidstartdate == "-"
              ? ""
              : that.accountItem.bcvalidstartdate;
          params["serProBank.bcvalidenddate"] =
            that.accountItem.bcvalidenddate == "-"
              ? ""
              : that.accountItem.bcvalidenddate;
          params["serProBank.address"] = that.accountItem.address;
          params["serProBank.tel"] = that.accountItem.tel;

          if (that.iscontactstype) {
            params["serProContacts[1].contactstype"] =
              that.contactsItem.contactstype;
            params["serProContacts[1].mobile"] = that.contactsItem.mobile;
            params["serProContacts[1].email"] = that.contactsItem.email;
            params["serProContacts[1].contactsname"] =
              that.contactsItem.contactsname;
            params["serProContacts[1].idcode"] = that.contactsItem.idcode;
            params["serProContacts[1].idcodetype"] =
              that.contactsItem.idcodetype;
            params["serProContacts[1].conidfrontimg"] =
              that.contactsItem.conidfrontimg;
            params["serProContacts[1].conidbackimg"] =
              that.contactsItem.conidbackimg;
            params["serProContacts[1].idvalidstartdate"] =
              that.contactsItem.idvalidstartdate == "-"
                ? ""
                : that.contactsItem.idvalidstartdate;
            params["serProContacts[1].idvalidenddate"] =
              that.contactsItem.idvalidenddate == "-"
                ? ""
                : that.contactsItem.idvalidenddate;
          }
          //联系人类型为法人的时候只传一个对象
          params["serProContacts[0].contactstype"] = "1";
          params["serProContacts[0].contactsname"] =
            that.legalItem.contactsname;
          params["serProContacts[0].idcodetype"] = that.legalItem.idcodetype;
          params["serProContacts[0].idcode"] = that.legalItem.idcode;
          params["serProContacts[0].conidfrontimg"] = that.legalItem.idfrontimg;
          params["serProContacts[0].conidbackimg"] = that.legalItem.idbackimg;
          params["serProContacts[0].mobile"] = that.contactsItem.mobile;
          params["serProContacts[0].email"] = that.contactsItem.email;
          params["serProContacts[0].idvalidstartdate"] =
            that.legalItem.idvalidstartdate == "-"
              ? ""
              : that.legalItem.idvalidstartdate;
          params["serProContacts[0].idvalidenddate"] =
            that.legalItem.idvalidenddate == "-"
              ? ""
              : that.legalItem.idvalidenddate;
          let url = "";
          if (that.id) {
            params["serprocode"] = that.id;
            url = Path.updSerproTelmps;
          } else {
            url = Path.addSerProTlemps;
          }
          // console.log(params);
          Server.post(url, params, res => {
            let { code, data, msg } = res;
            if (code == 200) {
              that.$message.success("操作成功!");
              that.goBack();
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    },
    changeaccounttype(val) {
      let that = this;
      switch (val) {
        case "1":
          that.isaccounttype = false;
          break;
        case "2":
          that.isaccounttype = false;
          break;
        case "3":
          that.isaccounttype = true;
          break;
      }
    },
    businesstypeList(val) {
      let that = this;
      Server.post(Path.queryBasedatamgIndustryByIds, { bdCodes: val }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.shopItem.onebusinesstype = data.oneCode;
          that.shopItem.twobusinesstype = data.twoCode;
          that.queryBasedatamgIndustryList(2, data.oneCode);
          that.queryBasedatamgIndustryList(3, data.twoCode);
        }
      });
    },
    changecontactstype(val) {
      let that = this;
      if (val == 2) {
        that.iscontactstype = true;
        that.contactsItem.idcodetype = "";
        that.contactsItem.idcode = "";
        that.contactsItem.idvaliddate = [];
        that.contactsItem.conidfrontimg = "";
        that.contactsItem.conidbackimg = "";
      } else {
        that.iscontactstype = false;
        that.contactsItem.idcodetype = that.legalItem.idcodetype;
        that.contactsItem.idcode = that.legalItem.idcode;
        that.contactsItem.idvaliddate = that.legalItem.idvaliddate;
        that.contactsItem.conidfrontimg = that.legalItem.idfrontimg;
        that.contactsItem.conidbackimg = that.legalItem.idbackimg;
      }
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
    ChildToParent(val) {
      let that = this;
      that.shopItem.bodyimg = val;
    },
    ChildToParentconidfrontimg(val) {
      let that = this;
      that.contactsItem.conidfrontimg = val;
    },
    ChildToParentconidbackimg(val) {
      let that = this;
      that.contactsItem.conidbackimg = val;
    },
    ChildToParentsignauthletterphoto(val) {
      let that = this;
      that.accountItem.signauthletterphoto = val;
    },
    ChildToParentsettleauthletterphoto(val) {
      let that = this;
      that.accountItem.settleauthletterphoto = val;
    },
    ChildToParentsettleauthidcardfront(val) {
      let that = this;
      that.accountItem.settleauthidcardfront = val;
    },
    ChildToParentsettleauthidcardback(val) {
      let that = this;
      that.accountItem.settleauthidcardback = val;
    },
    ChildToParentaccountfrontimg(val) {
      let that = this;
      that.accountItem.accountfrontimg = val;
    },
    ChildToParentaccountbackimg(val) {
      let that = this;
      that.accountItem.accountbackimg = val;
    },
    ChildToParentidfrontimg(val) {
      let that = this;
      that.legalItem.idfrontimg = val;
    },
    ChildToParentidbackimg(val) {
      let that = this;
      that.legalItem.idbackimg = val;
    },
    ChildToParentserproagreementimg1(val) {
      let that = this;
      that.shopItem.serproagreementimg1 = val;
    },
    ChildToParentserproagreementimg2(val) {
      let that = this;
      that.shopItem.serproagreementimg2 = val;
    },
    ChildToParentserproagreementimg3(val) {
      let that = this;
      that.shopItem.serproagreementimg3 = val;
    },
    ChildToParentserproagreementimg4(val) {
      let that = this;
      that.shopItem.serproagreementimg4 = val;
    },
    ChildToParentotherimg1(val) {
      let that = this;
      that.shopItem.otherimg1 = val;
    },
    ChildToParentspecialbusinessimg(val) {
      let that = this;
      that.shopItem.specialbusinessimg = val;
    },
    ChildToParentaccountopenimg(val) {
      let that = this;
      that.shopItem.accountopenimg = val;
    },
    ChildToParentstorecashierphoto(val) {
      let that = this;
      that.shopItem.storecashierphoto = val;
    },
    ChildToParentbusinessimg(val) {
      let that = this;
      that.shopItem.businessimg = val;
    },
    ChildToParentSlicenes(val) {
      var that = this;
      that.businessItem.businesslicenes = val;
    },
    ChildToParentSlicenesTaximg(val) {
      var that = this;
      that.businessItem.taximg = val;
    },
    ChildToParentOrg(val) {
      var that = this;
      that.businessItem.organizationimg = val;
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
    changeIndustryTwo(code) {
      let that = this;
      that.queryBasedatamgIndustryList(2, code);
    },
    changeIndustryThree(code) {
      let that = this;
      that.queryBasedatamgIndustryList(3, code);
    },
    queryBasedatamgIndustryList(type, code) {
      let that = this;
      let params = {};
      switch (type) {
        case 1:
          params["twoCode"] = "-";
          break;
        case 2:
          params["oneCode"] = code;
          params["threeCode"] = "-";
          break;
        case 3:
          params["twoCode"] = code;
          break;
      }
      Server.post(Path.queryBasedatamgIndustryList, params, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          switch (type) {
            case 1:
              that.industryList = data;
              break;
            case 2:
              that.industryTwoList = data;
              break;
            case 3:
              that.industryThreeList = data;
              break;
          }
        }
      });
    },
    // 根据省份id获取城市
    changeProvince(val) {
      let that = this;
      that.serviceMerchantItem.city = "";
      that.serviceMerchantItem.county = "";
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
    // 根据省份id获取城市
    changeAccountProvince(val) {
      let that = this;
      // 重选省份的时候，城市和开户银行支行设置为空
      that.accountItem.city = "";
      that.accountItem.branchid = "";
      that.bankBranchList = [];
      Server.post(
        Path.queryBasedatamgCityByPrCode,
        { provinceCode: val },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.cityAccountList = data;
          }
        }
      );
    },
    // 根据城市获取地区
    changeCity(val) {
      let that = this;
      that.serviceMerchantItem.county = "";
      Server.post(Path.queryBasedatamgAreaByCtCode, { cityCode: val }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.areaList = data;
        }
      });
    },
    // 根据城市城市支行的列表
    changeAccountCity(val) {
      let that = this;
      that.bankBranchList = [];
      if (that.accountItem.bankid) {
        that.changeBank(that.accountItem.bankid);
      }
    },
    changeBank(val) {
      let that = this;
      that.accountItem.branchid = "";
      Server.post(
        Path.queryBasedatamgBanksList,
        { bkCode: val, cityCode: that.accountItem.city },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.bankBranchList = data;
          }
        }
      );
    },
    upserprocodeFun(val) {
      let that = this;
      let item = that.toSerproList.filter(n => n.serprocode === val);
      that.serviceMerchantItem.serprotype = "2" + (item[0].serprolevel + 1);
      that.serviceMerchantItem.serprolevel = item[0].serprolevel + 1;
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
    back() {
      let that = this;
      let active = parseInt(that.activeName) - 1;
      that.activeName = active + "";
    },
    pre() {
      let that = this;
      that.$refs.serviceMerchantItem.validate(async valid => {
        if (valid) {
          that.activPre();
        }
      });
    },
    preTwo() {
      let that = this;
      that.$refs.businessItem.validate(async valid => {
        if (valid) {
          that.activPre();
        }
      });
    },
    preThree() {
      let that = this;
      that.$refs.shopItem.validate(async valid => {
        if (valid) {
          that.activPre();
        }
      });
    },
    preFour() {
      let that = this;
      that.$refs.legalItem.validate(async valid => {
        if (valid) {
          that.activPre();
          // 如果负责人是法人的时候，且已经编辑过。则赋值
          if (that.contactsItem.contactstype == 1) {
            that.contactsItem.contactsname = that.legalItem.contactsname;
            that.contactsItem.idcodetype = that.legalItem.idcodetype;
            that.contactsItem.idcode = that.legalItem.idcode;
            that.contactsItem.idvaliddate = that.legalItem.idvaliddate;
            that.contactsItem.conidfrontimg = that.legalItem.idfrontimg;
            that.contactsItem.conidbackimg = that.legalItem.idbackimg;
          }
        }
      });
    },
    preFive() {
      let that = this;
      that.$refs.accountItem.validate(async valid => {
        if (valid) {
          that.activPre();
        }
      });
    },

    activPre() {
      let that = this;
      let active = parseInt(that.activeName) + 1;
      that.activeName = active + "";
      // console.log(that.activeName);
    },
    goBack() {
      let that = this;
      // that.$router.go(-1);
      that.$router.push({
        path: "/merchantNetwork",
        query: {}
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
.upload-contain {
  height: 160px;
}
.upload-contain > img {
  width: 100%;
  height: 100%;
}
</style>
