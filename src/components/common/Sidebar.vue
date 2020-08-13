<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in newMenu">
        <!-- <template v-for="item in items"> -->
        <template v-if="item.subs &&  item.subs.length > 0">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      newMenu: [],
      items: [
        {
          icon: "el-icon-s-home",
          index: "dashboard",
          title: "系统首页",
          sort: 1,
        },
        {
          id: "02",
          icon: "el-icon-s-comment",
          index: "noticeManage",
          title: "公告管理",
          sort: 2,
        },

        {
          id: "04",
          icon: "el-icon-s-custom",
          index: "4",
          title: "服务商管理",
          sort: 3,
          subs: [
            {
              id: "08",
              index: "serviceMerchantManage",
              title: "服务商信息管理",
            },
            {
              id: "23",
              index: "serviceMerchantCheck",
              title: "服务商信息审核",
            },
          ],
        },
        {
          id: "05",
          icon: "el-icon-user",
          index: "5",
          title: "商户管理",
          sort: 4,
          subs: [
            {
              id: "19",
              index: "merchantNetwork",
              title: "商户入网",
            },
            {
              id: "20",
              index: "merchantCheck",
              title: "商户审核",
            },
            {
              id: "34",
              index: "merchantCode",
              title: "商户信息配置",
            },
            {
              id: "37",
              index: "refundManage",
              title: "发起退款",
            },
            {
              id: "40",
              index: "cashQrcode",
              title: "收银二维码",
            },
            {
              id: "42",
              index: "childMerchant",
              title: "子商户管理",
            },
            {
              id: "89",
              index: "mgDeviceManage",
              title: "设备管理",
            },
          ],
        },
        {
          id: "06",
          icon: "el-icon-s-operation",
          index: "6",
          title: "通道管理",
          sort: 5,
          subs: [
            {
              id: "07",
              index: "serviceMerchantRoute",
              title: "服务商通道",
            },
            {
              id: "21",
              index: "merchantRoute",
              title: "商户通道",
            },
            {
              id: "28",
              index: "merchantIncomingPart",
              title: "商户进件",
            },
            {
              id: "35",
              index: "defaultRoute",
              title: "默认通道",
            },
            {
              id: "43",
              index: "childMerchantIncomingPart",
              title: "子商户进件",
            },
          ],
        },
        {
          id: "25",
          icon: "el-icon-s-order",
          index: "7",
          title: "订单管理",
          sort: 6,
          subs: [
            {
              id: "26",
              index: "orderManage",
              title: "交易订单查询",
            },
            {
              id: "39",
              index: "orderCollect",
              title: "交易订单汇总",
            },
            {
              id: "93",
              index: "orderExport",
              title: "订单数据导出",
            },
          ],
        },
        {
          id: "46",
          icon: "el-icon-s-finance",
          index: "8",
          title: "分账管理",
          sort: 8,
          subs: [
            {
              id: "47",
              index: "ledgerAccountSetting",
              title: "接收方配置",
            },
            {
              id: "48",
              index: "ledgerAccountManage",
              title: "分账",
            },

            {
              id: "49",
              index: "ledgerAccountList",
              title: "分账查询",
            },
          ],
        },
        {
          id: "50",
          icon: "el-icon-money",
          index: "9",
          sort: 9,
          title: "微信红包",
          subs: [
            { id: "51", index: "redPackageGrant", title: "红包发放" },
            { id: "52", index: "redPackageQuery", title: "红包查询" },
          ],
        },
        {
          id: "27",
          icon: "el-icon-postcard",
          index: "10",
          sort: 10,
          title: "结算管理",
          subs: [
            { id: "30", index: "settleOrder", title: "订单结算" },
            { id: "31", index: "settleManage", title: "结算管理" },
            { id: "32", index: "settleBillManage", title: "账单管理" },
          ],
        },
        {
          id: "1231",
          icon: "el-icon-suitcase",
          index: "wallet",
          sort: 11,
          title: "钱包",
          subs: [],
        },
        {
          id: "1241",
          icon: "el-icon-connection",
          index: "12",
          title: "接口服务",
          sort: 12,
          subs: [
            {
              id: "12411",
              index: "realNameAuth",
              title: "实名认证",
            },
            { id: "1261", index: "interfaceRecord", title: "接口调用记录" },
            { id: "1251", index: "interfaceExplain", title: "接口说明" },
          ],
        },
        {
          id: "03",
          icon: "el-icon-setting",
          index: "11",
          title: "系统管理",
          sort: 13,
          subs: [
            {
              id: "24",
              index: "userManage",
              title: "用户管理",
            },
            {
              id: "22",
              index: "roleManage",
              title: "角色管理",
            },
            {
              id: "33",
              index: "dataSetting",
              title: "数据配置",
            },
          ],
        },
        {
          id: "29",
          icon: "el-icon-s-claim",
          index: "14",
          title: "支付测试",
          sort: 14,
          subs: [
            { id: "36", index: "payTest", title: "支付测试" },
            { id: "38", index: "sweptTest", title: "被扫测试" },
          ],
        },
      ],
    };
  },
  computed: {
    onRoutes() {
      let path = this.$route.path.replace("/", ""); // 获取到地址拦上#号后面的url地
      let from = this.$route.query.from; //获取到地址拦上参数from号后面的url地址
      return from ? from : path;
    },
  },
  beforeCreate() {},
  created() {
    let that = this;
    that.initMenuData();
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
  methods: {
    // 递归给获取所有按钮的权限
    znode(menuData, btnPermissList) {
      let me = this;
      for (let menu of menuData) {
        if (menu.buttonVoList != undefined) {
          if (menu.buttonVoList.length != 0) {
            for (let btn of menu.buttonVoList) {
              btnPermissList.push(btn.percode);
            }
          }
        }
        if (menu.children != undefined) {
          if (menu.children.length != 0) {
            me.znode(menu.children, btnPermissList);
          }
        }
      }
    },
    initMenuData() {
      let that = this;
      let newMenuData = [];
      //所有用户都有这个权限
      var homeItem = {
        icon: "el-icon-s-home",
        index: "dashboard",
        title: "系统首页",
        sort: 1,
      };
      newMenuData.push(homeItem);

      let menuData = JSON.parse(window.localStorage.getItem("menuData"));
      // console.log(menuData);
      // 按钮权限
      let btnPermissList = [];
      that.znode(menuData, btnPermissList);
      let { commit } = that.$store.store;
      commit("setPermissList", btnPermissList.join(","));
      // console.log(btnPermissList);
      for (let menuItem of menuData) {
        let newRoute = {
          id: "",
          icon: "",
          index: "",
          title: "",
          sort: "",
          subs: [],
        };
        for (let routeItem of that.items) {
          if (menuItem.id === routeItem.id) {
            newRoute.id = routeItem.id;
            newRoute.icon = routeItem.icon;
            newRoute.index = routeItem.index;
            newRoute.title = routeItem.title;
            newRoute.key = routeItem.key;
            newRoute.sort = routeItem.sort;
            if (menuItem.children) {
              for (let menuItemChild of menuItem.children) {
                for (let routeItemChild of routeItem.subs) {
                  if (menuItemChild.id === routeItemChild.id) {
                    newRoute.subs.push(routeItemChild);
                  }
                }
              }
            }
          }
        }
        if (newRoute.id) {
          newMenuData.push(newRoute);
        }
      }
      // 对数组进行排序
      newMenuData.sort(that.compare("sort"));
      that.newMenu = newMenuData;
      //
      // console.log(that.newMenu);
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2; //升序,降序为value2 - value1
      };
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
