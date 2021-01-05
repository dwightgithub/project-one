<template>
	<div>
		<div>文件名：{{picInfo.fileName}} 拍摄日期：{{picInfo.date}}</div>
		<div>上传者：{{picInfo.uploaderName}}经度：{{picInfo.longitude}}纬度：{{picInfo.lantitude}}</div>
	</div>
</template>

<script>
	export default {
		name: "picInfoTag",
		props: {
			picInfo :null,
		},
		data: function() {
			return {}
		},

	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.map {
		width: 100%;
		height: 300px;
	}
</style>
