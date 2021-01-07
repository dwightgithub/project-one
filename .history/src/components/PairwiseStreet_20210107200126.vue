<template>
  <div id="PairwiseStreet" style="width: 100%;">
    <el-progress :percentage="100*handledCounter/(pairwise.length)"></el-progress>
    <el-button type="primary" icon="el-icon-s-order" round @click="commitTask">提交任务</el-button>
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-image
            @click="pictureClick(1)"
            style="margin:20px"
            :src="url+currentPair.imageAInfo.fileName"
            :fit="contain"
          ></el-image>
        </div>
      </el-col>
      <el-col :span="4">
        <p align="top">
          哪一张图片更
          <b>{{taskLevelName[task.level]}}</b>?
        </p>
        <el-button
          style="margin:20px"
          icon="el-icon-d-arrow-left"
          :type="currentPair.pairwinner==1?'success':'info'"
          @click="pictureClick(1)"
          round
        >左图胜出</el-button>
        <el-button
          style="margin:20px"
          icon="el-icon-video-pause"
          :type="currentPair.pairwinner==3?'success':'info'"
          @click="pictureClick(3)"
          round
        >势均力敌</el-button>
        <el-button
          style="margin:20px"
          icon="el-icon-d-arrow-right"
          :type="currentPair.pairwinner==2?'success':'info'"
          @click="pictureClick(2)"
          round
        >右图胜出</el-button>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-image
            @click="pictureClick(2)"
            style="margin:20px"
            :src="url+currentPair.imageBInfo.fileName"
            :fit="contain"
          ></el-image>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev,pager,next"
      :page-count="task.taskCount"
      @current-change="changeGroup"
      :current-page="currentPairID+1"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      url: "https://localhost:5001/assets/img/",
      task: {
        taskCount: 0,
        level: 0
      },
      pairwise: [],
      handledCounter: 0, //当前处理了几组图片
      currentPairID: 0, //当前处理第几组图片
      currentPair: {
        //当前正在评分的对象
        isHandled: false,
        //0代表未评价 1代表A胜利 3代表打平2代表B胜利
        pairwinner: 0
      },
      taskLevelName: [
        "整洁美观",
        "安全放心",
        "绿色生态",
        "破旧贫穷",
        "拥挤繁忙"
      ]
    };
  },
  methods: {
    //1、初始化任务
    initializeTaskInfo() {
      let currentTaskInfo = this.$store.state.taskInfo;
      let that = this;
      //如果有任务，则查询本次任务，并将本页面打开
      this.$axios("https://localhost:5001/api/image/" + currentTaskInfo.taskID)
        .then(response => {
          that.task = response.data;
          that.pairwise = that.task.pairwises;
          that.currentPairID = 0;
          that.currentPair = that.pairwise[0];
        })
        .catch(error => {
          console.log(error, "error");
        }); // 失败的返回
    },
    //2、图片点击事件
    pictureClick(selectedNO) {
      if (!this.currentPair.isHandled) {
        this.currentPair.isHandled = true;
        this.handledCounter++;
        this.currentPair.pairwinner = selectedNO;
      } else if (this.currentPair.pairwinner != selectedNO) {
        this.currentPair.pairwinner = selectedNO;
      } else {
        this.currentPairID++;
      }
    },
    changeGroup(groupNO) {
      this.currentPairID = groupNO - 1;
    },
    commitTask() {
      if (this.handledCounter != this.pairwise.length) {
        alert("当前还有未完成评价的图片");
      } else {
        this.$axios
          .post("https://localhost:5001/api/image", this.task)
          .then(res => {
            if (res) {
              if(res.data.success)
              {
              alert("提交成功");
              this.$store.commit("setTaskInfo", {
                taskID: -1,
                taskType: 0
              });
              }
              else{
                alert("提交失败，原因："+res.data.reason);
              }
            }
          })
          .catch(e => {
            alert("提交失败。失败原因：" + e);
          });
      }
    }
  },
  watch: {
    currentPairID: function(newQuestion) {
      //当前正在评分的ID，从0到10
      this.currentPair = this.task.pairwises[newQuestion];
    }
  },
  mounted() {
    this.initializeTaskInfo();
  }
};
</script>

<style>
</style>
