<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">胡掌柜云服务管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入编码">
            <span class="input-button" slot="prepend" icon="el-icon-lx-people">用户名</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="param.password">
            <span class="input-button" slot="prepend" icon="el-icon-lx-lock">密码</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            type="text"
            placeholder
            v-model="param.verifyCode"
            @keyup.enter.native="submitForm()"
          >
            <span slot="prepend" class="input-button" icon="el-icon-lx-lock">验证码</span>
            <img slot="append" @click="loadVerifyCode" :src="verifyCodeUrl" alt />
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()" @keyup.enter.native="submitForm">登录</el-button>
        </div>
        <div class="login-btn"></div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Server from "@/service/request";
import Path from "@/service/Path";
export default {
  data: function() {
    return {
      param: {
        username: "",
        password: "",
        verifyCode: ""
      },
      verifyCodeUrl: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    let that = this;
    that.loadVerifyCode();
  },
  methods: {
    loadVerifyCode() {
      let that = this;
      let timestamp = new Date().getTime();
      Server.postExport(
        Path.verifyCodePost,
        { timestamp: timestamp },
        { responseType: "arraybuffer" }, // 图片接收responseType: "arraybuffer"
        res => {
          // console.log(res);
          that.verifyCodeUrl =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
        }
      );
    },
    changeInput(event) {},
    submitForm() {
      let that = this;
      that.$refs.login.validate(valid => {
        if (valid) {
          let params = {};
          params["usercode"] = that.param.username;
          params["pwd"] = that.param.password;
          // params["noVerifyCode"] = "1";
          params["verifyCode"] = that.param.verifyCode;
          Server.post(Path.login, params, res => {
            let { code, data, msg, menu, username } = res;
            if (code === "200") {
              console.log(unescape(username));
              localStorage.setItem("username", unescape(username));
              that.$message.success("登录成功");
              localStorage.setItem("token", "bearer" + data); // 存入head里面请求后天
              localStorage.setItem("tokenData", data); // 某些接口的参数里面需要携带这个参数
              localStorage.setItem("menuData", JSON.stringify(menu)); // 某些接口的参数里面需要携带这个参数
              // 整理权限
              that.$router.push("/");
            } else {
              that.$message.success(msg);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  /* color: #fff; */
  font-weight: 600;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
/deep/ .el-input-group__append {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 0;
  border-radius: 4px;
  padding: 0;
  width: 1px;
  white-space: nowrap;
}
.input-button {
  width: 45px;
  display: inline-block;
}
</style>