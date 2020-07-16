<template>
  <div id="wangeditor" :style="{height:boxHeight?boxHeight+'px':300+'px'}">
    <div ref="editorElem" class="wangeditorBox"></div>
  </div>
</template>
<script>
import Server from "@/service/request";
import Path from "@/service/Path";
import E from "wangeditor";
import md5 from "md5";
export default {
  name: "editorElem",
  data() {
    return {
      editor: ""
      // editorContent: null
    };
  },
  props: ["catchData", "content", "boxHeight"], //接收父组件的方法
  created() {},
  methods: {
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
      return suffix;
    },
    uploadFile(file, callback) {
      var that = this;
      let data = new FormData();
      data.append("file", file);
      Server.postObj(Path.uploadNotice, data, res => {
        let { code, data, msg } = res;
        if (code === 0) {
          callback(null, {
            url: data.src
          });
        } else {
          callback("文件上传失败，失败原因：" + msg);
        }
      });
    }
  },
  mounted() {
    let that = this;
    that.editor = new E(this.$refs.editorElem); //创建富文本实例
    that.editor.customConfig.onchange = html => {
      // console.log(html);
      // 处理wangeditor 会默认在末尾添加<p><br></p>的问题
      if (html.replace("<p><br></p>", "").trim() != "") {
        that.$emit("catchData", html);
      } else {
        that.$emit("catchData", "");
      }
    };
    that.editor.customConfig.uploadFileName = "file";
    // 隐藏“网络图片”tab
    that.editor.customConfig.showLinkImg = false;

    that.editor.customConfig.menus = [
      //菜单配置
      "head",
      //'list',  // 列表
      "justify", // 对齐方式
      "strikethrough",
      "bold",
      "fontSize", // 字号
      "italic",
      "underline",
      "image", // 插入图片
      "foreColor", // 文字颜色
      "bgcolor", //背景色
      "undo", // 撤销
      "redo" // 重复
    ];
    // that.editor.customConfig.debug = true;
    that.editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      // 上传代码返回结果之后，将图片插入到编辑器中
      that.uploadFile(files[0], function(err, data) {
        // console.log(data);
        insert(data.url);
      });
    };
    that.editor.create();
    that.editor.txt.html(this.content);
  },
  watch: {
    content(newVal, oldVal) {
      this.editor.txt.html(newVal);
    }
  }
};
</script>

<style scoped lang='less'>
// 此段样式需要去全局commom.css中拷贝 /* 20180926 hyq wangedit编辑器 */
#wangeditor {
  width: 100%;
  .wangeditorBox {
    height: 100% !important;
    .w-e-toolbar {
      display: block;
      border: 1px solid #cfdce7 !important;
      .w-e-menu {
        display: inline-block;
        z-index: 1 !important;
      }
    }
    /deep/ .w-e-text-container {
      border: 1px solid #cfdce7 !important;
      border-top: none !important;
      // z-index: 0 !important;
      z-index: 10 !important;
      height: calc(100% - 52px) !important;
    }
    /deep/.w-e-text {
      height: 100% !important;
    }
  }
}
</style>


