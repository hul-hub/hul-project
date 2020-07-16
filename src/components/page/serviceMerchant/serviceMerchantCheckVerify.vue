<template>
  <div class="tab-container">
    <div class="search marginTwo">
      <el-row type="flex" align="center">
        <el-col :span="6">
          <span class="detail-title">审核服务商</span>
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
        <el-tab-pane label="服务商信息" name="1">
          <el-form ref="serviceMerchantItem" :model="serviceMerchantItem" label-width="100px">
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="服务商名称:" prop="serproname">
                  <el-input disabled v-model="serviceMerchantItem.serproname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务商简称:" prop="serproshortname">
                  <el-input disabled v-model="serviceMerchantItem.serproshortname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属服务商:" prop="upserprocode">
                  <el-select
                    disabled
                    v-model="serviceMerchantItem.upserprocode"
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
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="服务商级别:" prop="serprotype">
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
              <el-col :span="8">
                <el-form-item label="服务商省份:">
                  <el-select
                    v-model="serviceMerchantItem.province"
                    disabled
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
                <el-form-item label="服务商城市:">
                  <el-select
                    v-model="serviceMerchantItem.city"
                    disabled
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
                <el-form-item label="服务商区/县:">
                  <el-select
                    v-model="serviceMerchantItem.county"
                    disabled
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
                  <el-input disabled v-model="serviceMerchantItem.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客服电话:">
                  <el-input disabled v-model="serviceMerchantItem.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="营业信息" name="2">
          <el-form ref="businessItem" :model="businessItem" label-width="130px">
            <el-row :gutter="36">
              <el-col :span="12">
                <el-form-item label="营业执照编号:" prop="businesslicense">
                  <el-input disabled v-model="businessItem.businesslicense"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="12">
                <el-form-item label="营业执照有效期:" prop="validdate">
                  <el-date-picker
                    disabled
                    v-model="businessItem.validdate"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-radio
                  disabled
                  style="margin-top: 10px;"
                  v-model="businessItem.islongtime"
                  label="1"
                  size="medium"
                >长期</el-radio>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="运营时间:">
                  <TimePicker
                    disabled
                    type="time"
                    placeholder="时间"
                    format="HH:mm"
                    v-model.trim="businessItem.businessstarthours"
                    style="width: 200px"
                  ></TimePicker>
                  <span>-</span>
                  <TimePicker
                    disabled
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
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="businessItem.businesslicenes">
                      <img :src="businessItem.businesslicenes" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="税务登记证:" prop="taximg" ref="tax">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="businessItem.taximg">
                      <img :src="businessItem.taximg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织机构代码证:" prop="organizationimg" ref="orgImg">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="businessItem.organizationimg">
                      <img :src="businessItem.organizationimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="经营信息" name="3">
          <el-form ref="shopItem" :model="shopItem" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="商户类型:" prop="merchanttype">
                  <el-select
                    v-model="shopItem.merchanttype"
                    disabled
                    placeholder="请选择"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item,index) in merchanttypeList"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营名称:" prop="businessname">
                  <el-input v-model="shopItem.businessname" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="24">
                <el-form-item label="行业类型:" prop="businesstype">
                  <el-select v-model="shopItem.onebusinesstype" placeholder="请选择" disabled>
                    <el-option
                      v-for="(item,index) in industryList"
                      :key="index"
                      :label="item.oneName"
                      :value="item.oneCode"
                    ></el-option>
                  </el-select>
                  <el-select v-model="shopItem.twobusinesstype" placeholder="请选择" disabled>
                    <el-option
                      v-for="(item,index) in industryTwoList"
                      :key="index"
                      :label="item.twoName"
                      :value="item.twoCode"
                    ></el-option>
                  </el-select>
                  <el-select v-model="shopItem.businesstype" placeholder="请选择" disabled>
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
                <el-form-item label="门口照:" prop="bodyimg">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.bodyimg">
                      <img :src="shopItem.bodyimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收银台照片:" prop="storecashierphoto">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.storecashierphoto">
                      <img :src="shopItem.storecashierphoto" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="内部经营照:" prop="businessimg">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.businessimg">
                      <img :src="shopItem.businessimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="开户许可证:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.accountopenimg">
                      <img :src="shopItem.accountopenimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="特殊行业许可证:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.specialbusinessimg">
                      <img :src="shopItem.specialbusinessimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其他补充材料:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.otherimg1">
                      <img :src="shopItem.otherimg1" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="6">
                <el-form-item label="商户协议:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.serproagreementimg1">
                      <img :src="shopItem.serproagreementimg1" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label>
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.serproagreementimg2">
                      <img :src="shopItem.serproagreementimg2" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label>
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.serproagreementimg3">
                      <img :src="shopItem.serproagreementimg3" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label>
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="shopItem.serproagreementimg4">
                      <img :src="shopItem.serproagreementimg4" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="法人信息" name="4">
          <el-form ref="legalItem" :model="legalItem" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名:">
                  <el-input v-model="legalItem.contactsname" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型:">
                  <el-select
                    v-model="legalItem.idcodetype"
                    disabled
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
                  <el-input v-model="legalItem.idcode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="12">
                <el-form-item label="身份证有效期:">
                  <el-date-picker
                    disabled
                    v-model="legalItem.idvaliddate"
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
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="legalItem.idfrontimg">
                      <img :src="legalItem.idfrontimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证反面:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="legalItem.idbackimg">
                      <img :src="legalItem.idbackimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="开户信息" name="5">
          <el-form ref="accountItem" :model="accountItem" label-width="120px">
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="开户人姓名:">
                  <el-input v-model="accountItem.accountname" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户类型:">
                  <el-select
                    v-model="accountItem.accounttype"
                    disabled
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
                <el-form-item label="开户省份:">
                  <el-select
                    v-model="accountItem.province"
                    disabled
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
                <el-form-item label="开户城市:">
                  <el-select
                    v-model="accountItem.city"
                    disabled
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
                <el-form-item label="开户银行:">
                  <el-select
                    v-model="accountItem.bankid"
                    disabled
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
                <el-form-item label="开户银行支行:">
                  <el-select
                    v-model="accountItem.branchid"
                    disabled
                    placeholder="请选择"
                    style="width:100%"
                  >
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
                <el-form-item label="证件类型:">
                  <el-select
                    v-model="accountItem.idcardtype"
                    disabled
                    placeholder="请选择"
                    style="width:100%"
                  >
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
                <el-form-item label="证件号码:">
                  <el-input v-model="accountItem.idcard" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="持卡人地址:">
                  <el-input v-model="accountItem.address" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="12">
                <el-form-item label="证件有效期:">
                  <el-date-picker
                    disabled
                    v-model="accountItem.bcvaliddate"
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
                <el-form-item label="银行预留手机号:">
                  <el-input v-model="accountItem.tel" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号:">
                  <el-input v-model="accountItem.accountcode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="银行卡正面:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="accountItem.accountfrontimg">
                      <img :src="accountItem.accountfrontimg" alt srcset />
                    </viewer>

                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行卡反面:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="accountItem.accountbackimg">
                      <img :src="accountItem.accountbackimg" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="签约授权书:" v-if="isaccounttype">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="accountItem.signauthletterphoto">
                      <img :src="accountItem.signauthletterphoto" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="36" v-if="isaccounttype">
              <el-col :span="8">
                <el-form-item label="结算授权函:">
                  <div class="upload-contain">
                    <viewer
                      class="upload-contain"
                      v-viewer
                      v-if="accountItem.settleauthletterphoto"
                    >
                      <img :src="accountItem.settleauthletterphoto" alt srcset />
                    </viewer>

                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算授权人身份证正面:">
                  <div class="upload-contain">
                    <viewer
                      class="upload-contain"
                      v-viewer
                      v-if="accountItem.settleauthidcardfront"
                    >
                      <img :src="accountItem.settleauthidcardfront" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算授权人身份证反面:">
                  <div class="upload-contain">
                    <viewer class="upload-contain" v-viewer v-if="accountItem.settleauthidcardback">
                      <img :src="accountItem.settleauthidcardback" alt srcset />
                    </viewer>
                    <img :src="uploadDefault" v-else alt srcset />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="6">
          <el-form ref="contactsItem" :model="contactsItem" label-width="110px">
            <el-row :gutter="36">
              <el-col :span="8">
                <el-form-item label="联系人类型:" prop="contactstype">
                  <el-select
                    v-model="contactsItem.contactstype"
                    disabled
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
                  <el-input v-model="contactsItem.mobile" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人邮箱:" prop="email">
                  <el-input v-model="contactsItem.email" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="iscontactstype">
              <el-row :gutter="36">
                <el-col :span="8">
                  <el-form-item label="姓名:">
                    <el-input v-model="contactsItem.contactsname" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件类型:">
                    <el-select
                      v-model="contactsItem.idcodetype"
                      disabled
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
                    <el-input v-model="contactsItem.idcode" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="36">
                <el-col :span="12">
                  <el-form-item label="身份证有效期:">
                    <el-date-picker
                      disabled
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
                    <div class="upload-contain">
                      <viewer class="upload-contain" v-viewer v-if="contactsItem.conidfrontimg">
                        <img :src="contactsItem.conidfrontimg" alt srcset />
                      </viewer>
                      <img :src="uploadDefault" v-else alt srcset />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证反面:">
                    <div class="upload-contain">
                      <viewer class="upload-contain" v-viewer v-if="contactsItem.conidbackimg">
                        <img :src="contactsItem.conidbackimg" alt srcset />
                      </viewer>
                      <img :src="uploadDefault" v-else alt srcset />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <el-row type="flex" justify="center">
            <el-button
              type="primary"
              v-if="serviceMerchantItem.status != 1"
              @click="changeStatus(1)"
            >审核通过</el-button>
            <el-button
              type="primary"
              v-if="serviceMerchantItem.status != 2"
              @click="changeStatus(2)"
            >审核拒绝</el-button>
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

export default {
  name: "serviceMerchantCheckVerify",
  components: {},
  data() {
    return {
      id: "",
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
      areaAccountList: [],
      serviceMerchantItem: {
        serproname: "", //服务商/商户名称
        serproshortname: "", //	服务商/商户简称
        upserprocode: "", //所属服务商id，上级服务商
        serprolevel: "", //服务商级别
        serprotype: "", //类型
        province: "", //省
        city: "", //市
        county: "", //区
        address: "", //详细地址
        phone: "" //客服电话
      },
      //服务商级别：商户类型serviceType + （所属商户级别serprolevl+1） 例如11：一级服务商，12：二级服务商。21：一级商户，22：二级商户
      serprolevelList: [
        { value: "11", label: "一级服务商" },
        { value: "12", label: "二级服务商" }
      ],
      toSerproList: [],
      businessItem: {
        businesslicense: "", //  营业执照编号
        validdate: [],
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
        bcvaliddate: [], //证件有效期
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
    changeStatus(type) {
      let that = this;
      Server.post(
        Path.updStatusByCode,
        { serProCode: that.id + "", status: type },
        res => {
          let { code, data, msg } = res;
          if (code == 200) {
            that.$message.success("操作成功");
            that.goBack();
          } else {
            that.$message.success(msg);
          }
        }
      );
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
          that.businessItem.validdate.push(
            data.validstartdate ? data.validstartdate : ""
          );
          that.businessItem.validdate.push(
            data.validenddate ? data.validenddate : ""
          );
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
          that.serviceMerchantItem.status = data.status;
          that.serviceMerchantItem.flag = data.serProAddress.flag;

          //serProImage
          that.shopItem.accountopenimg = data.serProImage.accountopenimg;
          that.shopItem.specialbusinessimg =
            data.serProImage.specialbusinessimg;
          // that.shopItem.serproagreementimg =
          //   data.serProImage.serproagreementimg;
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
          that.accountItem.city = data.serProBank.city;
          if (that.accountItem.province) {
            that.changeAccountProvince(that.accountItem.province);
          }
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
          that.accountItem.bcvaliddate.push(
            data.serProBank.bcvalidstartdate
              ? data.serProBank.bcvalidstartdate
              : ""
          );
          that.accountItem.bcvaliddate.push(
            data.serProBank.bcvalidenddate ? data.serProBank.bcvalidenddate : ""
          );
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
            that.contactsItem.idvaliddate.push(
              data.serProContacts[1].idvalidstartdate
                ? data.serProContacts[1].idvalidstartdate
                : ""
            );
            that.contactsItem.idvaliddate.push(
              data.serProContacts[1].idvalidenddate
                ? data.serProContacts[1].idvalidenddate
                : ""
            );
          } else {
            that.contactsItem.contactstype =
              data.serProContacts[0].contactstype;
            that.contactsItem.mobile = data.serProContacts[0].mobile;
            that.contactsItem.email = data.serProContacts[0].email;
            that.legalItem.idvaliddate.push(
              data.serProContacts[0].idvalidstartdate
                ? data.serProContacts[0].idvalidstartdate
                : ""
            );
            that.legalItem.idvaliddate.push(
              data.serProContacts[0].idvalidenddate
                ? data.serProContacts[0].idvalidenddate
                : ""
            );
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
    changeBank(val) {
      let that = this;
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
    queryBasedatamgProvince() {
      let that = this;
      Server.post(Path.queryBasedatamgProvince, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.provinceList = data;
        }
      });
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
      Server.post(Path.queryBasedatamgAreaByCtCode, { cityCode: val }, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          that.areaList = data;
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
    back() {
      let that = this;
      let active = parseInt(that.activeName) - 1;
      that.activeName = active + "";
    },
    goBack() {
      let that = this;
      // that.$router.go(-1);
      that.$router.push({
        path: "/serviceMerchantCheck",
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
/deep/ .el-range-separator {
  width: 24px !important;
}
</style>
