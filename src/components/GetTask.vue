<template>
	<div id="getTask" style="width: 600px;">
		<el-form ref="form" :model="task" label-width="80px">
			<el-form-item label="任务类型">
				<el-switch style="display: block" v-model="task.taskType" active-color="#13ce66" inactive-color="#ff4949"
				 active-text="对比" inactive-text="评分">
				</el-switch>
			</el-form-item>
			<el-form-item label="评价维度">
				<el-radio-group v-model="task.resource">
					<el-radio label="美观"></el-radio>
					<el-radio label="安全"></el-radio>
					<el-radio label="天气"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="任务组数">
				<el-slider v-model="task.groupCount" show-stops :min="5" :max="20" :marks="marks"> </el-slider>
			</el-form-item>
			<el-form-item label="任务区域">
				<el-cascader placeholder="试试搜索：成都市" filterable v-model="task.region" :options="options" :props="{  multiple: true }"></el-cascader>
			</el-form-item>
		</el-form>
		<el-button style="margin-left: 10;" @click="CreateTask">创建任务</el-button>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				marks: {
					5: '5组',
					10: '10组',
					15: '15组',
				},
				options: [{
					value: 'chengdu',
					label: '成都市',
					children: [{
							value: 'wuhou',
							label: '武侯区',
						},
						{
							value: 'qingyang',
							label: '青羊区',
						},
						{
							value: 'shuangliu',
							label: '双流区',
						},
					]
				}],
				task: {
					taskType: true, //true是对比任务
					resource: '美观',
					groupCount: 10,
					region: [],
				},
			}
		},
		methods: {
			///创建任务
			CreateTask() {
				let obj;
				let currentTime = new Date();
				let level = 0;
				if (this.task.resource == "安全")
					level = 1;
				else if (this.task.resource == "天气")
					level = 2;
				obj = {
						userID: this.$store.state.userInfo.idUserInfo,
						taskType: this.task.taskType ? 1 : 0,
						level: level,
						createTime: currentTime,
						taskCount: this.task.groupCount,
						area: '成都市',
					},
					//将数据库中
					this.$axios
					.post('https://localhost:5001/api/login/createTask', obj)
					.then(res => {
						if (res) {
							//创建任务成功后，设置任务号，关闭创建页面，打开任务界面，
							this.$store.commit('setTaskID', res.taskID);
							this.$emit('parChangeTabShow', 4-obj.taskType, true);
							this.$emit('parChangeTabShow', '2', false);
						}
					})
					.catch((e) => {
						alert("修改失败。失败原因：" + e)
					})
			}
		}
	};
</script>

<style>
	#getTask {
		background: url("../assets/moroccan-flower.png") repeat;
		background-position: center;

		height: 100%;
		width: 100%;
		position: fixed;
	}
</style>
