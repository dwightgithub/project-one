<template>
  <div id="UploadImage" style="width: 600px;">
      <el-upload class="upload-demo" drag action="" limit="10" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖动至此处,或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg文件，不超过10M</div>
      </el-upload>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
</style>
