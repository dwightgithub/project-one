<template>
	<div>
		<el-progress type="dashboard" :percentage="handledCounter*100"></el-progress>
		<el-table height="1000px" :data="rates" highlight-current-row @current-change="handleCurrentChange">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="文件名称">
							<span>{{ props.row.imageInfo.fileName }}</span>
						</el-form-item>
						<el-form-item label="日期">
							<span>{{ props.row.imageInfo.date }}</span>
						</el-form-item>
						<el-form-item label="经度">
							<span>{{ props.row.imageInfo.longitude }}</span>
						</el-form-item>
						<el-form-item label="纬度">
							<span>{{ props.row.imageInfo.lantitude }}</span>
						</el-form-item>
						<el-form-item label="上传者">
							<span>{{ props.row.imageInfo.uploaderName }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column sortable prop="iDinList" label="预览" width="100px">
<!-- 				<template slot-scope="props">
					<el-image style="width: 80px; height: 60px; " :src="require(url+props.row.imageInfo.fileName)" fit="cover"></el-image>
				</template> -->
			</el-table-column>
			<el-table-column label="" width="60px">
				<template slot-scope="props">
					<el-button size="mini" :type="props.row.isHandled?'success':'warning'" :icon="props.row.isHandled?'el-icon-check':'el-icon-star-off'"
					 circle></el-button>
				</template>
			</el-table-column>
			<el-table-column label="评分" width="150px">
				<template slot-scope="props">
					<el-rate disabled show-score v-model="props.row.rateScore">
					</el-rate>
				</template>
			</el-table-column>
			<el-table-column sortable prop="imageInfo.fileName" label="文件名" width="200px">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: "picInfoTable",
		props: {
			rates: null, //图片信息
			handledCounter: null,
		},
		data: function() {
			return {
				url: 'https://localhost:5001/assets/img/',
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.$emit('tableChangeID', val.iDinList);
			},
		}
	}
</script>

<style>
</style>
