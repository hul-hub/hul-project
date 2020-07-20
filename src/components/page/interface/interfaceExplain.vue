<template>
  <div style="height:100%">
    <div class="container">
      <div class="left_head">
        <div class="detail_picture">
          <a href="#" style="display:block;height:100%">
            <img :src="idcardimg" alt />
          </a>
        </div>
        <div class="detail-right">
          <h2 style="line-height:27px">
            <strong>银行卡身份证实名核验（零缓存，纯实时）</strong>
            <span class="text_icon color01">官方自营</span>
            <span class="text_icon color02">独立收费</span>
          </h2>
          <div class="sum-ctr">
            <div class="invoke-count">
              <p>累计调用</p>
              <span>933万+</span>
            </div>
            <div class="text_02">
              <div class="text_02_1">
                <nav class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <p class="subtitle is-5">价格</p>
                    </div>
                    <div class="level-item">
                      <div class="buttons" v-for="(item,index) of btnPriceList" :key="index">
                        <el-button
                          @click="btnpriceFun(index,item)"
                          style="margin-left:12px;"
                          :class="{'btn-back':index == btnpriIndex}"
                        >{{item.label}}</el-button>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="接口文档" name="first-one">
          <div class="have-margin">
            <h2 class="have-margin">一、接入点/ API point</h2>
            <div class="point_li no have-margin">
              <span>身份证实名认证</span>
            </div>
            <div class="have-margin">
              <div class="inter-ponit">
                <h3>接入点说明:</h3>
                <div>&nbsp;&nbsp;&nbsp;验证身份证与姓名是否匹配，查询身份证信息。包括地址、生日、性别等。</div>
              </div>
              <div class="have-border-bottom">
                <div class="no-h3">
                  <div>&nbsp;&nbsp;&nbsp;注意：当请求参数符合“【固定同一个参数，其余参数不同】，”比如“【同一个身份证，不同姓名】”，并且检验次数为<=10次，认为正常调用。</div>
                  <div>&nbsp;&nbsp;&nbsp;当>10次以上，我们认为是恶意调用，此时返回【24小时内相同姓名或卡号核验次数超限】，不扣费。</div>
                </div>
              </div>
              <div class="have-border-bottom">
                <div class="inter-ponit margin-top-bottom">
                  <h3>接口地址:</h3>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    http://api.hooskp.com/api/showapi/bankAuthentication （注意：接口也支持http协议，请根据自己的情况进行选择。）
                  </div>
                </div>
              </div>
              <div class="have-border-bottom">
                <div class="inter-ponit margin-top-bottom">
                  <h3>返回格式:</h3>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    json
                  </div>
                </div>
              </div>
              <div class="have-border-bottom">
                <div class="inter-ponit margin-top-bottom">
                  <h3>请求方式:</h3>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    HTTP协议，支持GET/POST方法。
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="have-border-bottom">
              <h2 class="margin-top-bottom">
                <span @click="isRequest = !isRequest">
                  <i
                    style="color:#65acda"
                    :class="isRequest?'el-icon-caret-bottom':'el-icon-caret-right'"
                  ></i>
                </span>
                二、请求参数/ Request parameter
              </h2>
            </div>
            <div v-if="isRequest">
              <div class="have-margin">
                <p>非文件上传的POST时，请设置headers['Content-Type'] = 'application/x-www-form-urlencoded', 并把对象形式的数据转成查询字符串</p>
                <p>文件上传的POST时，请设置headers['Content-Type'] = 'multipart/form-data'</p>
              </div>
              <div class="have-margin">
                <p>
                  1、系统级参数（所有接入点都需要的参数）：
                  <span @click="changeSystem">
                    <i
                      style="color:red"
                      :class="isSystem?'el-icon-remove-outline':'el-icon-circle-plus-outline'"
                    ></i>
                    {{ isSystem?'收起':'展开'}}
                  </span>
                </p>
                <div class="have-margin">
                  <el-table :data="sysTable" class="table" ref="multipleTable">
                    <el-table-column class-name="rowClass" prop="name" label="参数名称" width="150"></el-table-column>
                    <el-table-column class-name="rowClass" prop="type" label="类型" width="80"></el-table-column>
                    <el-table-column
                      class-name="rowClass"
                      prop="defaultValue"
                      width="160"
                      label="示例值"
                    ></el-table-column>
                    <el-table-column class-name="rowClass" prop="must" width="70" label="必须"></el-table-column>
                    <el-table-column class-name="rowClass" prop="description" label="描述"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="have-margin">
                <p>2、应用级参数（每个接入点有自己的参数,当前接入点的参数见下表）：</p>
                <div class="have-margin">
                  <el-table :data="applyTable" class="table" ref="multipleTable">
                    <el-table-column class-name="rowClass" prop="name" label="参数名称" width="150"></el-table-column>
                    <el-table-column class-name="rowClass" prop="type" label="类型" width="80"></el-table-column>
                    <el-table-column class-name="rowClass" prop="must" width="70" label="必须"></el-table-column>
                    <el-table-column class-name="rowClass" prop="description" label="描述"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="have-border-bottom">
              <h2 class="margin-top-bottom">
                <span @click="isParam = !isParam">
                  <i
                    style="color:#65acda"
                    :class="isParam?'el-icon-caret-bottom':'el-icon-caret-right'"
                  ></i>
                </span>
                三、返回参数/ Return parameter
              </h2>
            </div>
            <div v-if="isParam">
              <div class="have-margin">
                <p>以JSON格式返回结果。</p>
              </div>
              <div class="have-margin">
                <p>
                  1、系统级参数（所有接入点都需要的参数）：
                  <span @click="changeParam">
                    <i
                      style="color:red"
                      :class="isParamTable?'el-icon-remove-outline':'el-icon-circle-plus-outline'"
                    ></i>
                    {{ isParamTable?'收起':'展开'}}
                  </span>
                </p>
                <div class="have-margin">
                  <el-table :data="paramTable" class="table" ref="multipleTable">
                    <el-table-column class-name="rowClass" prop="name" label="参数名称" width="150"></el-table-column>
                    <el-table-column class-name="rowClass" prop="type" label="类型" width="80"></el-table-column>
                    <el-table-column
                      class-name="rowClass"
                      prop="defaultValue"
                      width="160"
                      label="示例值"
                    ></el-table-column>
                    <el-table-column label="描述">
                      <template slot-scope="scope">
                        <div class="rowClass" v-html="scope.row.description"></div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="have-margin">
                <p>
                  2、应用级参数（系统级输出参数showapi_res_body字段中的json数据结构）:
                  <span @click="changeApplyParam">
                    <i
                      style="color:red"
                      :class="isApplyParam?'el-icon-remove-outline':'el-icon-circle-plus-outline'"
                    ></i>
                    {{ isApplyParam?'收起':'展开'}}
                  </span>
                </p>
                <div class="have-margin">
                  <el-table :data="applyParamTable" class="table" ref="multipleTable">
                    <el-table-column class-name="rowClass" prop="name" label="参数名称" width="150"></el-table-column>
                    <el-table-column class-name="rowClass" prop="type" label="类型" width="80"></el-table-column>
                    <el-table-column
                      class-name="rowClass"
                      prop="defaultValue"
                      width="160"
                      label="示例值"
                    ></el-table-column>
                    <el-table-column label="描述">
                      <template slot-scope="scope">
                        <div class="rowClass" v-html="scope.row.description"></div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
          <!-- <div>
            <h2 class="have-margin">四、请求示例/ Request example</h2>
            <div
              class="json-par have-margin"
              style="padding-left:20px;padding-top:20px;padding-bottom:20px;"
            >
              <el-tabs value="first">
                <el-tab-pane label="java" name="first">
                  <div v-html="javaCode"></div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>-->
          <div>
            <h2 class="have-margin">四、返回示例/ Return example</h2>
            <div class="have-margin">
              <json-viewer class="json-par" :value="resDataParam" :expand-depth="5" copyable sort></json-viewer>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="产品说明" name="first-two">
          <div class="notification is-sp-primary content is-light">
            <ol>
              <li>一个接口是一组接入点，每个接入点有自己的费率</li>
              <li>资源包过期或用完，会立即失效</li>
              <!-- <li>可购买多个资源包，会自动递延生效串联使用</li> -->
            </ol>
          </div>
          <div class="fsfsfa" style="position: relative;margin-top: 50px;">
            <div>
              <div class="sidebar">资源包配置</div>
            </div>
            <el-form
              ref="form"
              :model="formItem"
              label-width="120px"
              class="section has-background-white-bis is-radiusless"
            >
              <el-form-item label="有效期" class="large-size">
                <el-button
                  @click="timeTypeFun('一个月')"
                  :class="{'btn-back':formItem.timeType === '一个月'}"
                >一个月</el-button>
                <el-button
                  @click="timeTypeFun('一年')"
                  :class="{'btn-back':formItem.timeType === '一年'}"
                >一年</el-button>
              </el-form-item>
              <el-form-item label="资源包规格" class="large-size">
                <div style="display:flex">
                  <div v-for="(item,index) of formItem.btnPackSize" :key="index" class="btn-cont">
                    <el-button
                      @click="btnPackFun(index,item)"
                      :class="{'btn-back': activeIndex == index}"
                    >{{item.label}}</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="调用量" class="large-size">
                <div v-if="formItem.timeType == '一年'">
                  <table style="border-collapse:collapse;">
                    <tr class="th-posi">
                      <th width="400">接入点</th>
                      <th width="200">单次调用费用</th>
                      <th width="300">本资源包最多可调用量</th>
                    </tr>
                    <tr>
                      <td>{{btnPackItem.name}}</td>
                      <td>{{btnPackItem.num}}</td>
                      <td>{{btnPackItem.max}}</td>
                    </tr>
                  </table>
                </div>
                <span v-else>{{formItem.num}}</span>
              </el-form-item>
              <el-form-item label="并发量" class="large-size">
                <span>{{formItem.tognum}}</span>
              </el-form-item>
              <el-form-item label="订购要求" class="large-size">
                <span>{{formItem.payneed}}</span>
              </el-form-item>
              <el-form-item label="限购要求" class="large-size">
                <span>{{formItem.refuedneed}}</span>
              </el-form-item>
              <el-form-item label="生效时间" class="large-size">
                <span>{{formItem.starttime}}</span>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import idcardimg from "@/assets/img/idcard.png";
export default {
  name: "interfaceExplain",
  components: {
    idcardimg
  },
  data() {
    return {
      activeTab: "first-one",
      activeIndex: "0",
      btnpriIndex: "-1",
      btnPackItem: {
        name: "银行卡四元素验证",
        num: "",
        max: ""
      },
      btnPriceList: [
        { label: "0.00元", value: 0 },
        { label: "20.00元", value: 20 },
        { label: "199.00元", value: 199 },
        { label: "999.00元", value: 999 },
        { label: "1999.00元", value: 1999 }
      ],
      formItem: {
        timeType: "一个月",
        btnPackSize: [{ label: "0元", value: 0 }],
        num: "共可调用5次",
        tognum: "2 次/秒",
        payneed: "无要求",
        refuedneed: "限购一次",
        starttime: "自动续期"
      },
      idcardimg: idcardimg,
      activeName: "first-one",
      isRequest: true,
      isSystem: false,
      isParam: true,
      isParamTable: false,
      isApplyParam: true,
      javaCode:
        "public static void main(String path[]) throws Exception {<br>" +
        '&nbsp;&nbsp;&nbsp;&nbsp;URL u = new URL("http://route.showapi.com/1072-1?showapi_appid=myappid&idcard=&name=&showapi_sign=mysecret");<br>' +
        "&nbsp;&nbsp;&nbsp;&nbsp;InputStream in = u.openStream();<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;ByteArrayOutputStream out = new ByteArrayOutputStream();<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;try {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;byte buf[] = new byte[1024];<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int read = 0;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while ((read = in.read(buf)) > 0) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;out.write(buf, 0, read);<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;} finally {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( in != null) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in.close();<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;byte b[] = out.toByteArray();<br>" +
        '&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(new String(b, "utf-8"));<br>' +
        "}",
      resDataParam: {
        showapi_res_code: 0,
        showapi_res_error: "",
        showapi_res_id: "ce135f6739294c63be0c021b76b6fbff",
        showapi_res_body: {
          code: "0",
          msg: "匹配",
          address: "湖南省湘西土家族苗族自治州泸溪县",
          birthday: "1991-06-10",
          sex: "M",
          error: "",
          ret_code: "0"
        }
      },
      applyParamTable: [
        {
          name: "code",
          type: "Number",
          defaultValue: "0",
          description:
            "验证标示<br>0：匹配<br>1：身份证与姓名不匹配<br>2：无此身份证号码<br>12：身份证号码不合法<br>" +
            "100：渠道异常，请稍后再试<br>101：验证信息重复输入，避免恶意验证请间隔60秒以上再次核验<br>103：24小时内相同姓名或卡号核验次数超限"
        },
        {
          name: "msg",
          type: "String",
          defaultValue: "匹配",
          description: "验证描述"
        },
        {
          name: "address",
          type: "String",
          defaultValue: "湖南省湘西土家族苗族自治州泸溪县",
          description: "籍贯地址"
        },
        {
          name: "birthday",
          type: "String",
          defaultValue: "	1991-06-10",
          description: "生日"
        },
        {
          name: "sex",
          type: "String",
          defaultValue: "M",
          description: "性别：M为男性，F为女性"
        },
        {
          name: "error",
          type: "String",
          defaultValue: "匹配",
          description: "调用错误时的描述"
        },
        {
          name: "ret_code",
          type: "Number",
          defaultValue: "0",
          description: "调用成功与否，0为成功，去他值为失败"
        },
        {
          name: "nameCount",
          type: "String",
          defaultValue: "",
          description: "同一参数校验次数（超限时返回）"
        },
        {
          name: "idCardCount",
          type: "String",
          defaultValue: "",
          description: "同一参数校验次数（超限时返回）"
        }
      ],
      paramTable: [
        {
          name: "showapi_res_body",
          type: "String",
          defaultValue: "{'city':'昆明','prov':'云南'}",
          description: "消息体的JSON封装，所有应用级的返回参数将嵌入此对象 。"
        },
        {
          name: "......",
          type: "",
          defaultValue: "",
          description: ""
        }
      ],
      sysTable: [
        {
          name: "serProCode",
          type: "String",
          defaultValue: "5922118050086655",
          must: "是",
          description: "取信宝商户号"
        },
        {
          name: "......",
          type: "",
          defaultValue: "",
          must: "",
          description: ""
        }
      ],
      applyTable: [
        {
          name: "cert_id",
          type: "String",
          must: "是",
          description: "身份证号，测试时注意不要填错，填错一样扣减使用次数"
        },
        {
          name: "acct_name",
          type: "String",
          must: "是",
          description: "姓名，测试时注意不要填错，填错一样扣减使用次数"
        },
        {
          name: "acct_pan",
          type: "String",
          must: "是",
          description: "银行卡账号，测试时注意不要填错，填错一样扣减使用次数"
        },
        {
          name: "phone_num",
          type: "String",
          must: "是",
          description: " 绑定手机号，测试时注意不要填错，填错一样扣减使用次数"
        },
        {
          name: "cert_type",
          type: "String",
          must: "是",
          description: "开卡使用的证件类型；01:身份证，目前只支持身份证"
        }
      ]
    };
  },
  created() {},
  methods: {
    btnpriceFun(index, item) {
      let that = this;
      that.btnpriIndex = index;
      that.activeTab = "first-two";
      console.log(index);
      if (that.btnpriIndex == 0) {
        that.formItem.timeType = "一个月";
        that.activeIndex = 0;
        that.checkTimeFun();
      } else {
        // console.log(22222);
        that.formItem.timeType = "一年";
        that.activeIndex = index - 1;
        that.checkTimeFun();
      }
    },
    btnPackFun(index, item) {
      let that = this;
      that.activeIndex = index;
      that.checkBtnPack();
    },
    checkBtnPack() {
      let that = this;
      switch (that.activeIndex) {
        case 0:
          that.btnPackItem.num = "175厘/次";
          that.btnPackItem.max = "114次";
          that.formItem.tognum = "100 次/秒";
          break;
        case 1:
          that.btnPackItem.num = "170厘/次";
          that.btnPackItem.max = "1170次";
          that.formItem.tognum = "300 次/秒";
          break;
        case 2:
          that.btnPackItem.num = "165厘/次";
          that.btnPackItem.max = "6054次";
          that.formItem.tognum = "500 次/秒";
          break;
        case 3:
          that.btnPackItem.num = "160厘/次";
          that.btnPackItem.max = "1.25万次";
          that.formItem.tognum = "1000 次/秒";
          break;
      }
    },
    checkTimeFun() {
      let that = this;
      if (that.formItem.timeType == "一年") {
        let btnarr = [
          { label: "20元", value: 20 },
          { label: "199元", value: 199 },
          { label: "999元", value: 999 },
          { label: "1999元", value: 999 }
        ];
        that.formItem.btnPackSize = btnarr;
        that.formItem.payneed = "邮箱认证 | 企业认证";
        that.formItem.refuedneed = "不限购买次数";
        that.formItem.starttime = "自动续期";
        that.checkBtnPack();
      } else {
        let btnarrTwo = [{ label: "0元", value: 0 }];
        that.formItem.btnPackSize = btnarrTwo;
        that.formItem.num = "共可调用5次";
        that.formItem.tognum = "2 次/秒";
        that.formItem.payneed = "无要求";
        that.formItem.refuedneed = "限购一次";
        that.formItem.starttime = "自动续期";
      }
    },
    timeTypeFun(val) {
      let that = this;
      that.formItem.timeType = val;
      that.checkTimeFun();
    },
    changeParam() {
      let that = this;
      if (!that.isParamTable) {
        that.paramTable = [
          {
            name: "showapi_res_body",
            type: "String",
            defaultValue: "{'city':'昆明','prov':'云南'}",
            description: "消息体的JSON封装，所有应用级的返回参数将嵌入此对象 。"
          },
          {
            name: "showapi_res_code",
            type: "int",
            defaultValue: "0",
            description:
              "易源返回标志,0为成功，其他为失败。<br>0,成功-1，系统调用错误<br>-2，可调用次数或金额为0<br>-3，读取超时<br>-4，服务端返回数据解析错误" +
              "<br>-5，后端服务器DNS解析错误<br>-6，服务不存在或未上线<br>-7, API创建者的网关资源不足<br>-1000，系统维护<br>-1002，showapi_appid字段必传<br>-1003，showapi_sign字段必传"
          },
          {
            name: "showapi_res_error",
            type: "String",
            defaultValue: "用户输入有误!",
            description: " 错误信息的展示"
          },
          {
            name: "showapi_res_id",
            type: "String",
            defaultValue: "ce135f6739294c63be0c021b76b6fbff",
            description: "本次请求id"
          }
        ];
      } else {
        that.paramTable = [
          {
            name: "showapi_res_body",
            type: "String",
            defaultValue: "{'city':'昆明','prov':'云南'}",
            description: "消息体的JSON封装，所有应用级的返回参数将嵌入此对象 。"
          },
          {
            name: "......",
            type: "",
            defaultValue: "",
            description: ""
          }
        ];
      }
      that.isParamTable = !that.isParamTable;
    },
    changeApplyParam() {
      let that = this;
      if (!that.isApplyParam) {
        that.applyParamTable = [
          {
            name: "code",
            type: "Number",
            defaultValue: "0",
            description:
              "验证标示<br>0：匹配<br>1：身份证与姓名不匹配<br>2：无此身份证号码<br>12：身份证号码不合法<br>" +
              "100：渠道异常，请稍后再试<br>101：验证信息重复输入，避免恶意验证请间隔60秒以上再次核验<br>103：24小时内相同姓名或卡号核验次数超限"
          },
          {
            name: "msg",
            type: "String",
            defaultValue: "匹配",
            description: "验证描述"
          },
          {
            name: "address",
            type: "String",
            defaultValue: "湖南省湘西土家族苗族自治州泸溪县",
            description: "籍贯地址"
          },
          {
            name: "birthday",
            type: "String",
            defaultValue: "	1991-06-10",
            description: "生日"
          },
          {
            name: "sex",
            type: "String",
            defaultValue: "M",
            description: "性别：M为男性，F为女性"
          },
          {
            name: "error",
            type: "String",
            defaultValue: "匹配",
            description: "调用错误时的描述"
          },
          {
            name: "ret_code",
            type: "Number",
            defaultValue: "0",
            description: "调用成功与否，0为成功，去他值为失败"
          },
          {
            name: "nameCount",
            type: "String",
            defaultValue: "",
            description: "同一参数校验次数（超限时返回）"
          },
          {
            name: "idCardCount",
            type: "String",
            defaultValue: "",
            description: "同一参数校验次数（超限时返回）"
          }
        ];
      } else {
        that.applyParamTable = [
          {
            name: "code",
            type: "Number",
            defaultValue: "0",
            description:
              "验证标示<br>0：匹配<br>1：身份证与姓名不匹配<br>2：无此身份证号码<br>12：身份证号码不合法<br>" +
              "100：渠道异常，请稍后再试<br>101：验证信息重复输入，避免恶意验证请间隔60秒以上再次核验<br>103：24小时内相同姓名或卡号核验次数超限"
          },
          {
            name: "......",
            type: "",
            defaultValue: "",
            description: ""
          }
        ];
      }
      that.isApplyParam = !that.isApplyParam;
    },
    changeSystem() {
      let that = this;
      if (!that.isSystem) {
        that.sysTable = [
          {
            name: "serProCode",
            type: "String",
            defaultValue: "5922118050086655",
            must: "是",
            description: "取信宝商户号"
          },
          {
            name: "key",
            type: "String",
            defaultValue: "698d51a19d8a121ce581499d7b701668",
            must: "是",
            description: "取信宝密钥"
          },
          {
            name: "signature",
            type: "String",
            defaultValue: "20141114142239",
            must: "是",
            description:
              "签名，所有参数按照字段名的ascii码从小到大排序后使用QueryString的格式（即key1=value1&key2=value2…）拼接而成"
          }
        ];
      } else {
        that.sysTable = [
          {
            name: "serProCode",
            type: "String",
            defaultValue: "5922118050086655",
            must: "是",
            description: "取信宝商户号"
          },
          {
            name: "......",
            type: "",
            defaultValue: "",
            must: "",
            description: ""
          }
        ];
      }
      that.isSystem = !that.isSystem;
    }
  },
  computed: {}
};
</script>

<style scoped>
.json-par {
  border-radius: 4px;
  background: #d1d1d1;
}
.rowClass {
  font-size: 12px;
}
div,
span,
p {
  font-size: 14px;
}

.have-margin {
  margin-top: 10px;
}
.have-border-bottom {
  border-bottom: 1px dashed #cfcccc;
}
.margin-top-bottom {
  margin: 10px 0;
}
h3 {
  width: 100px;
  text-align: right;
}
.no-h3 {
  margin-left: 100px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.point_li {
  background: #65acda;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.point_li.no {
  width: 194px;
  height: 60px;
  line-height: 60px;
  margin-right: 6px;
}
.point_li span {
  display: table-cell;
  height: 60px;
  vertical-align: middle;
  width: 122px;
  font-size: 14px;
}
.inter-ponit {
  display: flex;
  align-items: center;
}
.left_head {
  height: 240px;
  padding-top: 30px;
}

.detail_picture {
  width: 180px;
  height: 180px;
  border: 1px solid #ececec;
  margin-right: 30px;
  position: relative;
  float: left;
}
.detail_picture > a > img {
  max-height: 128px;
  max-width: 128px;
  position: absolute;
  margin-top: 25px;
  margin-left: 25px;
}
.detail-right {
  height: 180px;
  display: table-cell;
  /* width: 3000px; */
}
.detail-right > h2 > strong {
  font-size: 20px;
  font-weight: 600;
  padding-right: 5px;
}
.detail-right .text_icon {
  font-size: 11px;
  font-weight: 400;
  border-radius: 2px;
  padding: 0 4px;
}
.color01 {
  color: #65acda;
  border: 1px solid #65acda;
}
.color02 {
  color: #ff8a00;
  border: 1px solid #ff8a00;
}
.sum-ctr {
  position: relative;
  background: #f5f5f5;
  overflow: hidden;
  padding-right: 250px;
  height: 140px;
  margin-top: 10px;
}
.invoke-count {
  position: absolute;
  right: 0;
  top: 10px;
  width: 120px;
  border-left: 1px solid #ececec;
  text-align: center;
}
.invoke-count p {
  font-size: 12px;
  color: #999;
}
.invoke-count span {
  color: #65acda;
}
.text_02 {
  height: 100%;
}
.text_02_1:only-child {
  margin: 0;
  height: 100%;
  display: flex;
}
.text_02_1 {
  color: #999;
  padding: 10px;
  font-size: 12px;
}
.level {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.level-left {
  align-items: center;
  justify-content: flex-start;
  display: flex;
}
.level-item {
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
}
.subtitle {
  color: #666;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
  margin-right: 10px;
}
.buttons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.notification.is-sp-primary {
  background-color: #65acda;
  color: #fff;
}
ol,
li {
  list-style: none;
}
.sidebar {
  position: absolute;
  width: 2.6rem;
  height: 100%;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  font-size: 1rem;
  justify-content: center;
  writing-mode: tb;
}
.section {
  padding: 3rem 1.5rem;
}
.has-background-white-bis {
  background-color: #fafafa !important;
}
/deep/ .el-form-item__label {
  font-weight: 700;
  font-size: inherit;
}
.large-size > div > button {
  width: 190px;
}
.btn-back {
  background-color: #ff8a00;
  border-color: transparent;
  color: #fff;
}
.btn-cont {
  margin-right: 20px;
}
.btn-cont > button {
  width: 230px;
}
.th-posi > th {
  text-align: left;
  background: #dbdbdb;
}
tr {
  border: 1px solid #dbdbdb;
}
td,
th {
  padding-left: 5px;
}
</style>
