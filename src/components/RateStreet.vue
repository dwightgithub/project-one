<template>
	<div>
		<el-drawer direction="ltr" title="任务进度" :visible.sync="drawer" size="80%" style="max-width: 800px;">
			<PicInfoTable :rates="rates" :handledCounter="handledCounter" @tableChangeID="tableChangeID"></PicInfoTable>
		</el-drawer>

		<p align="top">您需要对任务{{taskID}}中出现的{{task.taskCount}}张图片进行打分</p>
		<el-button type="primary" icon="el-icon-s-order" round @click="drawer=true">任务进度</el-button>
		<div style="margin-top: 10px;" class="block">
			<el-carousel ref="carousel" :autoplay="false" indicator-position="none" @change="caroChangeID">
				<el-carousel-item v-for="rate in rates" :key="rate.imageInfo.date">
					<el-image style="max-width:600px" :src="url+rate.imageInfo.fileName" fit="cover"></el-image>
				</el-carousel-item>
			</el-carousel>
		</div>
		<PictureInfoTag :picInfo="currentImage"></PictureInfoTag>
		<div>评分获取该场景大众评分</div>
		<el-rate disabled show-score v-model="currentImage.rate" v-show="currentRate.isHandled"></el-rate>
		<div>请你为该场景评分</div>
		<el-rate show-score v-model="currentRate.rateScore" @change="ratePicInfo"></el-rate>
		<!-- 	<baidu-map :scroll-wheel-zoom="true" class="map" :center="{lng: currentImage.longitude, lat: currentImage.latitude}"
		 :zoom="16">
			<bm-marker :position="{lng: currentImage.longitude, lat: currentImage.latitude}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
		</baidu-map> -->
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
				handledCounter: 0, //完成的进度
				currentRateID: 0, //当前正在处理的rate
				task: {
					taskCount: 0,
				},
				rates: [],
				currentRate: { //当前正在评分的对象
					isHandled: false,
				},
				currentImage: { //当前正在评价的图片
					rate: 0,
				},
			};
		},
		methods: {
			//抽屉换一个图
			tableChangeID: function(val) {
				this.$refs.carousel.setActiveItem(val);
			},
			//更改当前处理的图片
			caroChangeID: function(val) {
				this.currentRateID = val;
			},
			ratePicInfo: function() {
				if (this.currentRate.isHandled != true) {
					this.handledCounter++;
				}
				this.currentRate.isHandled = true;
			},
			initializeTaskInfo: function() {
				let that = this;
				this.$axios("https://localhost:5001/api/image/" + that.taskID)
					.then(response => {
						that.task = response.data;
						that.rates = that.task.rates
						that.currentRateID = 0;
						that.currentRate = that.rates[0];
						that.currentImage = that.currentRate.imageInfo;
					})
					.catch(error => {
						console.log(error, "error");
					}); // 失败的返回
			}
		},
		computed: {
			taskID() {
				return this.$store.state.taskID;
			}
		},
		watch: {
			currentRateID: function(newQuestion) {
				//当前正在评分的ID，从0到10
				this.currentRate = this.task.rates[newQuestion];
				this.currentImage = this.currentRate.imageInfo;
			},

			taskID: function() {
				this.initializeTaskInfo();
			}
		},
		created: function() {
			this.initializeTaskInfo();
		}
	};
</script>

<style>
</style>
