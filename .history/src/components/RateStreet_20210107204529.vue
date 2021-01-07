<template>
  <div>
    <el-col :span="6">
      <el-button type="primary" icon="el-icon-s-order" round @click="drawer=true">任务进度</el-button>
    </el-col>
    <el-col :span="12">
      <el-progress :percentage="100*handledCounter/(rates.length)"></el-progress>
    </el-col>
    <el-col :span="6">
      <el-button type="primary" icon="el-icon-s-order" round @click="commitTask">提交任务</el-button>
    </el-col>
    <el-drawer
      direction="ltr"
      title="任务进度"
      :visible.sync="drawer"
      size="80%"
      style="max-width: 800px;"
    >
      <pic-info-table
        :rates="rates"
        :handledCounter="handledCounter"
        @tableChangeID="tableChangeID"
      ></pic-info-table>
    </el-drawer>
    <p align="top" class="el-upload__text">任务{{task.iDtask}}-共{{task.taskCount}}组，您认为本张图片的街景在<em>{{taskLevelName[task.level]}}</em>方面可获得几星评价</p>

    <div style="margin-top: 10px;" class="block">
      <el-carousel
        ref="carousel"
        :autoplay="false"
        indicator-position="none"
        @change="caroChangeID"
      >
        <el-carousel-item v-for="rate in rates" :key="rate.imageInfo.date">
          <el-image style="max-width:600px" :src="url+rate.imageInfo.fileName" fit="cover"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <picture-info-tag :picInfo="currentImage"></picture-info-tag>
    <div>评分获取该场景大众评分</div>
    <el-rate disabled show-score v-model="currentImage.rate" v-show="currentRate.isHandled"></el-rate>
    <div>请你为该场景评分</div>
    <el-rate show-score v-model="currentRate.rateScore" @change="ratePicInfo"></el-rate>
    <baidu-map
      :scroll-wheel-zoom="true"
      class="map"
      :center="{lng: currentImage.longitude, lat: currentImage.latitude}"
      :zoom="16"
    >
      <bm-marker
        :position="{lng: currentImage.longitude, lat: currentImage.latitude}"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import PictureInfoTag from "./PictureInfoTag.vue";
import PicInfoTable from "./picInfoTable.vue";
export default {
  name: "rateStreet",
  components: {
    PictureInfoTag,
    PicInfoTable
  },
  data: function() {
    return {
      url: "https://localhost:5001/assets/img/",
      drawer: false, //是否打开抽屉
      handledCounter: 0, //当前处理了几个图片
      currentRateID: 0, //当前处理第几个图片
      task: {
        taskCount: 0,
        taskType: 0,
        level:0,
      },
      rates: [],
      currentRate: {
        //当前正在评分的对象
        isHandled: false
      },
      currentImage: {
        //当前正在评价的图片
        rate: 0
      },
      taskLevelName: ["美观", "安全", "生态", "贫穷", "繁忙"]
    };
  },
  methods: {
    //1、抽屉提出换图申请
    tableChangeID: function(val) {
      this.$refs.carousel.setActiveItem(val);
    },
    //2、当幻灯的图片改变时，更改当前处理的图片，该参数被watch，会变更处理图片所有信息
    caroChangeID: function(val) {
      this.currentRateID = val;
    },
    //3、评价某张图片
    ratePicInfo: function() {
      if (this.currentRate.isHandled != true) {
        this.handledCounter++;
      }
      this.currentRate.isHandled = true;
    },
    //4、初始化任务，在本页面加载时运行，获取task内容
    initializeTaskInfo: function() {
      let currentTaskInfo = this.$store.state.taskInfo;
      let that = this;
      //如果有任务，则查询本次任务，并将本页面打开
      this.$axios("https://localhost:5001/api/image/" + currentTaskInfo.taskID)
        .then(response => {
          that.task = response.data;
          that.rates = that.task.rates;
          that.currentRateID = 0;
          that.currentRate = that.rates[0];
          that.currentImage = that.currentRate.imageInfo;
        })
        .catch(error => {
          console.log(error, "error");
        }); // 失败的返回
    },
    //5、提交任务，提交成功后，通过修改VUEX关闭本页
    commitTask: function() {
      if (this.handledCounter != this.rates.length) {
        alert("当前还有未完成评价的图片");
      } else {
        this.$axios
          .post("https://localhost:5001/api/image", this.task)
          .then(res => {
            if (res) {
              alert("提交成功");
              this.$store.commit("setTaskInfo", {
                taskID: -1,
                taskType: 0
              });
            }
          })
          .catch(e => {
            alert("提交失败。失败原因：" + e);
          });
      }
    },
  },
  watch: {
    currentRateID: function(newQuestion) {
      //当前正在评分的ID，从0到10
      this.currentRate = this.task.rates[newQuestion];
      this.currentImage = this.currentRate.imageInfo;
    }
  },
  mounted: function() {
    this.initializeTaskInfo();
  }
};
</script>

<style>
</style>
