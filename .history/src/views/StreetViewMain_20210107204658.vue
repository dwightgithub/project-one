<template>
  <div id="app" class="home">
    <HelloWorld msg="Welcome to StreetViewRank" />
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户首页" name="0">
          <span slot="label">
            <i class="el-icon-s-claim"></i> 0、用户首页
          </span>
          <UserTag></UserTag>
        </el-tab-pane>
        <el-tab-pane label="图片上传" name="1">
          <span slot="label">
            <i class="el-icon-upload"></i> 1、图片上传
          </span>
          <upload-image></upload-image>
        </el-tab-pane>
        <el-tab-pane v-if="taskInfo.taskID===-1" label="领取新任务" name="2">
          <span slot="label">
            <i class="el-icon-view"></i> 2、领取新任务
          </span>
          <GetTask></GetTask>
        </el-tab-pane>
        <el-tab-pane v-if="taskInfo.taskID!==-1&&taskInfo.taskType===1" label="图片对比任务" name="3">
          <span slot="label">
            <i class="el-icon-view"></i> 3、图片对比任务
          </span>
          <pairwise-street></pairwise-street>
        </el-tab-pane>
        <el-tab-pane v-if="taskInfo.taskID!==-1&&taskInfo.taskType===0" label="图片评分任务" name="4">
          <span slot="label">
            <i class="el-icon-star-on"></i> 4、图片评分任务
          </span>
          <RateStreet></RateStreet>
        </el-tab-pane>
        <el-tab-pane label="ViewCityScape" name="5">
          <span slot="label">
            <i class="el-icon-view"></i> 5、ViewCityScape
          </span>
          <ViewCityScape></ViewCityScape>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import UserTag from "../components/UserTag.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import RateStreet from "@/components/RateStreet.vue";
import GetTask from "../components/GetTask.vue";
import UploadImage from "../components/UploadImage.vue";
import PairwiseStreet from "../components/PairwiseStreet.vue";
import ViewCityScape from "../components/ViewCityScape.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    RateStreet,
    GetTask,
    UserTag,
    UploadImage,
    PairwiseStreet,
    ViewCityScape
  },
  data() {
    return {
      activeName: "0"
    };
  },
  computed: {
    taskInfo() {
      return this.$store.state.taskInfo;
    }
  },
  watch: {
    taskInfo: function(newInfo) {
      if (newInfo.taskID === -1) this.activeName = "2";
      else if (newInfo.taskType === 1) this.activeName = "3";
      else if (newInfo.taskType === 0) this.activeName = "4";
    }
  },
  methods: {}
};
</script>

<style>
</style>
