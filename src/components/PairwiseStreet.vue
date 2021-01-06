<template>
  <div id="PairwiseStreet" style="width: 600px;">
    <!-- <p align="top">您需要对任务{{taskID}}中出现的{{task.taskCount}}组图片进行对比</p> -->
    <el-row>
      <el-col span="10">
        <el-image
          style="width:300px;height:200px"
          :src="url+pairwise.imageAInfo.fileName"
          :fit="contain"
        ></el-image>
      </el-col>
      <el-col span="4">
        <p align="top">您认为哪一张图片更？</p>
      </el-col>
      <el-col span="10">
        <el-image
          style="width:300px;height:200px"
          :src="url+pairwise.imageBInfo.fileName"
          :fit="contain"
        ></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      url: "https://localhost:5001/assets/img/",
      task: {
        taskCount: 0
      },
      pairwise: []
    };
  },
  methods: {
    //1、初始化任务
    initializeTaskInfo: function() {
      
    }
  },
  computed: {
  
  },
  watch: {
  }
};
</script>

<style>
</style>
