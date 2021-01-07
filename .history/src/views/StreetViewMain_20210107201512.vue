<template>
<<<<<<< HEAD
	<div id="app" class="home">
		<HelloWorld msg="Welcome to StreetViewRank" />
		<template>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="综合态势" name="0">
					<span slot="label"><i class="el-icon-s-claim"></i> 综合态势</span>
					<UserTag @parChangeTabShow="changeTabShow"></UserTag>
				</el-tab-pane>
				<el-tab-pane label="图片上传" name="1">
					<span slot="label"><i class="el-icon-upload"></i> 图片上传</span>
				</el-tab-pane>
				<el-tab-pane v-if="tabShow[2].ishow" label="领取新任务" name="2">
					<span slot="label"><i class="el-icon-view"></i> 领取新任务</span>
					<GetTask @parChangeTabShow="changeTabShow"></GetTask>
				</el-tab-pane>
				<el-tab-pane v-if="tabShow[3].ishow" label="图片对比任务" name="3">
					<span slot="label"><i class="el-icon-view"></i> 图片对比任务</span>
					<ViewCityScape></ViewCityScape>
				</el-tab-pane>
				<el-tab-pane v-if="tabShow[4].ishow" label="图片评分任务" name="4">
					<span slot="label"><i class="el-icon-star-on"></i> 图片评分任务</span>
					<RateStreet></RateStreet>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
=======
  <div id="app" class="home">
    <HelloWorld msg="Welcome to StreetViewRank" />
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户首页" name="0">
          <span slot="label">
            <i class="el-icon-s-claim"></i> 0、用户首页
          </span>
          <UserTag @parChangeTabShow="changeTabShow"></UserTag>
        </el-tab-pane>
        <el-tab-pane label="图片上传" name="1">
          <span slot="label">
            <i class="el-icon-upload"></i> 1、图片上传
          </span>
          <upload-image></upload-image>
        </el-tab-pane>
        <el-tab-pane v-if="tabShow[2].ishow" label="领取新任务" name="2">
          <span slot="label">
            <i class="el-icon-view"></i> 2、领取新任务
          </span>
          <GetTask @parChangeTabShow="changeTabShow"></GetTask>
        </el-tab-pane>
        <el-tab-pane v-if="tabShow[3].ishow" label="图片对比任务" name="3">
          <span slot="label">
            <i class="el-icon-view"></i> 3、图片对比任务
          </span>
		  <pairwise-street @parChangeTabShow="changeTabShow"></pairwise-street>
        </el-tab-pane>
        <el-tab-pane v-if="tabShow[4].ishow" label="图片评分任务" name="4">
          <span slot="label">
            <i class="el-icon-star-on"></i> 4、图片评分任务
          </span>
          <RateStreet @parChangeTabShow="changeTabShow"></RateStreet>
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
>>>>>>> parent of e93f230... 实现基本功能
</template>

<script>
	// @ is an alias to /src
	import UserTag from "../components/UserTag.vue";
	import HelloWorld from "@/components/HelloWorld.vue";
	import RateStreet from "@/components/RateStreet.vue";
	import GetTask from "../components/GetTask.vue";
	import ViewCityScape from "../components/ViewCityScape.vue";

<<<<<<< HEAD
	export default {
		name: "Home",
		components: {
			HelloWorld,
			RateStreet,
			GetTask,
			UserTag,
			ViewCityScape,
		},
		data() {
			return {
				activeName: '3',
				tabShow:[{ishow:false},{ishow:false},{ishow:false},{ishow:true},{ishow:true},]
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			changeTabShow(tabNO,isShow){
				this.tabShow[tabNO].ishow=isShow;
				this.activeName =tabNO;
			}
		}
	};
=======
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
      activeName: "0",
      tabShow: [
        { ishow: false },
        { ishow: false },
        { ishow: false },
        { ishow: false },
        { ishow: false }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeTabShow(tabNO, isShow) {
      this.tabShow[tabNO].ishow = isShow;
      this.activeName = tabNO;
    }
  }
};
>>>>>>> parent of e93f230... 实现基本功能
</script>

<style>

</style>
