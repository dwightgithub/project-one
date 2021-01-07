<template>
<<<<<<< HEAD
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
=======
  <div>
    <el-progress width="60%" :percentage="100*handledCounter/(rates.length)"></el-progress>
    <el-button type="primary" icon="el-icon-s-order" round @click="drawer=true">任务进度</el-button>
    <el-button type="primary" icon="el-icon-s-order" round @click="commitTask">提交任务</el-button>
    <el-drawer
      direction="ltr"
      title="任务进度"
      :visible.sync="drawer"
      size="80%"
      style="max-width: 800px;"
    >
      <PicInfoTable :rates="rates" :handledCounter="handledCounter" @tableChangeID="tableChangeID"></PicInfoTable>
    </el-drawer>
    <p align="top">您需要对任务{{taskID}}中出现的{{task.taskCount}}张图片进行打分</p>
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
    <PictureInfoTag :picInfo="currentImage"></PictureInfoTag>
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
      handledCounter: 0, //完成的进度
      currentRateID: 0, //当前正在处理的rate
      task: {
        taskCount: 0
      },
      rates: [],
      currentRate: {
        //当前正在评分的对象
        isHandled: false
      },
      currentImage: {
        //当前正在评价的图片
        rate: 0
      }
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
      //var obj = new Date();
      //this.currentRate.rateTime = obj.toLocaleString();
    },
    //4、初始化任务
    initializeTaskInfo: function() {
      this.task = this.$store.state.tasks;
      if (this.task.taskType == 1) return;
      this.rates = this.task.rates;
      this.currentRateID = 0;
      this.currentRate = this.rates[0];
      this.currentImage = this.currentRate.imageInfo;
    },
    //5、提交任务
    commitTask: function() {
      if (this.handledCounter != this.rates.length) {
        alert("当前还有未完成评价的图片");
      } else {
        this.$axios
          .post("https://localhost:5001/api/image", this.task)
          .then(res => {
            if (res) {
              alert("提交成功");
              this.$emit("parChangeTabShow", "4", false);
            }
          })
          .catch(e => {
            alert("提交失败。失败原因：" + e);
          });
      }
    }
  },
//   computed: {
//     tasks() {
//       return this.$store.state.tasks;
//     }
//   },
  watch: {
    currentRateID: function(newQuestion) {
      //当前正在评分的ID，从0到10
      this.currentRate = this.task.rates[newQuestion];
      this.currentImage = this.currentRate.imageInfo;
    },

    tasks: function() {
      this.initializeTaskInfo();
    }
  },
  created: function() {
    this.initializeTaskInfo();
  }
};
>>>>>>> parent of e93f230... 实现基本功能
</script>

<style>
</style>
