<template>
  <div>
    <el-upload
      action="https://hooshkapisit.oss-cn-hangzhou.aliyuncs.com"
      :data="dataObj"
      list-type="picture"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt />
    </el-dialog>
  </div>
</template>
<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import md5 from "md5";

export default {
  name: "singleUpload",
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl
        }
      ];
    },
    showFileList: {
      get: function() {
        return (
          this.value !== null && this.value !== "" && this.value !== undefined
        );
      },
      set: function(newValue) {}
    }
  },
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: ""
      },
      ossInfo: {
        region: "",
        accessKeyId: "",
        accessKeySecret: "",
        bucket: ""
      },
      dialogVisible: false
    };
  },
  created() {
    let that = this;
    // that.getOssInfo();
  },

  methods: {
    getOssInfo() {
      Server.get(Path.infoOSS, {}, res => {
        let { code, data, msg } = res;
        if (code == 200) {
          console.log(data);
        }
      });
    },
    // 设置图片文件夹
    setFileName(file) {
      var year = new Date().getFullYear();
      var imageName = file.name.substring(0, file.name.indexOf("."));
      var imageSuffix = file.name.substring(
        file.name.indexOf("."),
        file.name.length
      );
      var suffix =
        "image/" +
        year +
        "/" +
        md5(imageName + new Date().getTime()) +
        imageSuffix;
      console.log(suffix);
      return suffix;
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    handleRemove(file, fileList) {
      this.emitInput("");
    },
    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      let _self = this;
      return new Promise((resolve, reject) => {
        Server.get("api/hoopay/oss/policy", {}, res => {
          let { code, data, msg } = res;
          if (code == 200) {
            console.log(data);
            _self.dataObj.policy = data.policy;
            _self.dataObj.signature = data.signature;
            _self.dataObj.ossaccessKeyId = data.accessid;
            _self.dataObj.key = data.dir + _self.getUUID() + "_${filename}";
            _self.dataObj.dir = data.dir;
            _self.dataObj.host = data.host;
            resolve(true);
          }
        }).catch(err => {
          reject(false);
        });
      });
    },
    getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        return (c === "x"
          ? (Math.random() * 16) | 0
          : "r&0x3" | "0x8"
        ).toString(16);
      });
    },
    handleUploadSuccess(res, file) {
      console.log("上传成功...");
      console.log(res);
      this.showFileList = true;
      this.fileList.pop();
      let url =
        this.dataObj.host +
        "/" +
        this.dataObj.key.replace("${filename}", file.name);
      this.fileList.push({
        name: file.name,
        url: url
      });
      console.log(url);
      this.emitInput(this.fileList[0].url);
    }
  }
};
</script>
<style>
</style>


