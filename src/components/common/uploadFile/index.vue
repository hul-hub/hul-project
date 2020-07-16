<template>
  <div>
    <Upload
      :show-upload-list="false"
      :accept="accept.toString()"
      :max-size="1024"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      name="file"
      action
      :ref="uploadRef"
    >
      <div class="upload-contain" :style="{height:imgHeight}">
        <img :src="imgUrl" v-if="imgUrl" alt srcset />
        <img :src="uploadDefault" v-else alt srcset />
      </div>
    </Upload>
  </div>
</template>

<script type="es6">
import Server from "@/service/request";
import Path from "@/service/Path";
import uploadDefault from "@/assets/img/uploadImage.png";
export default {
  name: "uploadFile",
  props: {
    //组件宽度
    imgWidth: {
      type: String,
      default: "300px"
    },
    //组件高度
    imgHeight: {
      type: String,
      default: "168px"
    },
    //上传成功地址 必填
    cosImage: {
      type: String,
      default: ""
    },
    uploadRef: {
      type: String,
      default: ""
    },
    param: {
      type: String,
      default: ""
    },
    //接受文件最大 单位M
    maxSize: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      uploadDefault: uploadDefault,
      url: this.cosImage,
      accept: [".jpg", ".jpeg", ".png"]
    };
  },
  computed: {
    //处理编辑的时候图片回显的bug问题
    imgUrl: {
      get: function() {
        return this.cosImage;
      },
      set: function(val) {
        this.cosImage = val;
      }
    }
  },
  methods: {
    changeByte(limit) {
      limit = Number(limit);
      var size = "";
      if (!limit) {
        return "";
      } else if (limit < 1024) {
        //小于1KB，则转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 1024 * 1024) {
        //小于1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 1024 * 1024 * 1024) {
        //小于1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }
      var sizeStr = size + ""; //转成字符串
      var index = sizeStr.indexOf("."); //获取小数点处的索引
      var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
      if (dou == "00") {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
      }
      return size;
    },
    handleBeforeUpload(file) {
      var that = this;
      // 验证图片上传大小
      let size = file.size;
      if (that.maxSize * 1024 * 1024 < size) {
        let info = that.changeByte(that.maxSize * 1024 * 1024);
        that.$message.error("请上传文件大小为" + info + "以下的文件！");
        return;
      }

      let data = new FormData();
      data.append("file", file);
      let suffix = "/" + that.param + "/" + localStorage.getItem("tokenData");
      Server.postObj(Path.uploadSerpro + suffix, data, res => {
        let { code, data, msg } = res;
        if (code === 0) {
          that.url = data.src;
          that.$emit("catchData", data.src);
        }
      });
      return false;
    }
  },
  created() {},
  watch: {}
};
</script>
<style lang='less' scoped>
.upload-contain {
  display: flex;
  flex-wrap: wrap;
  background: #f5f7f9;
}
.upload-contain > img {
  width: 100%;
  height: 100%;
}
</style>
