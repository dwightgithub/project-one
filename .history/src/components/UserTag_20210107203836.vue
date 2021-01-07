<template>
  <div>
    <el-row>
      <el-col span="4">
        <div>
          <el-popover class="head" placement="bottom" width="300" trigger="click">
            <div>
              <div align="center">请选择你中意的头像</div>
              <el-avatar
                style="margin: 5px;"
                v-for="n in 9"
                :key="n"
                shape="square"
                :size="50"
                :src="circleUrl+'0000'+n+'.png'"
                fit="contain"
                @click.native="SetUserHeadNO(n)"
              ></el-avatar>
            </div>
            <el-avatar
              slot="reference"
              shape="square"
              :size="70"
              :src="circleUrl+fileName"
              fit="contain"
            ></el-avatar>
          </el-popover>
          <div class="divver">{{this.userInfo.nickName}}</div>
        </div>
      </el-col>
      <el-col span="8">
        <el-collapse class="detailInfo" value="detail">
          <el-collapse-item style="margin-left: 2rem;" title="用户信息" name="detail">
            <li class="detailInfolst">用户注册时间：{{this.userInfo.createDate}}</li>
            <li class="detailInfolst">上次登录时间：{{this.userInfo.lastLoginDate}}</li>
            <li class="detailInfolst">年龄：{{this.userInfo.age}} 经验：{{this.userInfo.experience}}</li>
            <li class="detailInfolst">当前执行任务编号：{{this.$store.state.taskID}}</li>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-table
      :data="taskInfoes"
      height="200"
      size="small"
      border
      style="width: auto; margin: 0.625rem;"
    >
      <el-table-column prop="taskType" label="类型" width="50"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="90"></el-table-column>
      <el-table-column prop="completeTime" label="完成时间" width="90"></el-table-column>
      <el-table-column prop="level" label="维度" width="50"></el-table-column>
      <el-table-column prop="area" label="区域"></el-table-column>
      <!-- <el-table-column label="查看" width="60">
        <template slot-scope="props">
          <el-button size="mini" @click="ViewTask(props.row.taskID)" circle></el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-button style="margin-left: 10;" @click="CreateTask">创建任务</el-button>
  </div>
</template>

<script>
export default {
  name: "picInfoTable",
  props: {},
  data() {
    return {
      userInfo: this.$store.state.userInfo,
	  circleUrl: "https://localhost:5001/assets/face/",
	  currentTaskID:-1,
    };
  },
  methods: {
    ///1、更新头像
    SetUserHeadNO(headNO) {
      const oldFaceID = this.userInfo.faceID;
      this.userInfo.faceID = headNO;
      //将数据库中
      this.$axios
        .post("https://localhost:5001/api/login/update", this.userInfo)
        .then(res => {
          if (res) {
            //如果成功，将vuex中的内容修改了
            this.$store.commit("setUserInfo", this.userInfo);
          }
        })
        .catch(e => {
          this.userInfo.faceID = oldFaceID;
          alert("修改失败。失败原因：" + e);
        });
    },
    ///2、打开创建任务栏
    CreateTask() {
      if (this.$store.state.taskID == -1) {
        this.$emit("parChangeTabShow", "2", true);
      } else {
        alert("当前有未完成的任务");
      }
    },
    ///3、查询当前任务号对应任务
    QueryTaskInfo: function() {
      let that = this;
      //如果没有任务，taskid为-1
      if (that.currentTaskID == -1) return;
      //如果有任务，则查询本次任务，并将本页面打开
      this.$axios("https://localhost:5001/api/image/" + that.currentTaskID)
        .then(response => {
		  this.$store.commit("setTasks", response.data);
          if (response.data.taskType == 0)
            this.$emit("parChangeTabShow", "4", true);
          else if (response.data.taskType == 1)
            this.$emit("parChangeTabShow", "3", true);
        })
        .catch(error => {
          console.log(error, "error");
        }); // 失败的返回
	}
  },
  mounted:function(){
	  this.currentTaskID = this.$store.state.taskID;
  },
  computed: {
    fileName: function() {
      return this.userInfo.faceID > 9
        ? "000" + this.userInfo.faceID + ".png"
        : "0000" + this.userInfo.faceID + ".png";
    },
    taskInfoes: function() {
      const tasks = this.userInfo.tasks;
      var target = [];
      tasks.forEach(task => {
        const source = {
          taskID: task.iDtask,
          taskType: task.taskType == 1 ? "对比" : "评分",
          createTime: task.createTime.split("T")[0],
          completeTime: task.completeTime.split("T")[0],
          level: task.level == 1 ? "安全" : "美观",
          area: task.area
        };
        target.push(source);
      });
      return target;
    },
  },
  watch: {
    currentTaskID: function() {
      this.QueryTaskInfo();
    }
  }
};
</script>

<style>
	.head {
		display: block;
	}

	.divver {
		display: block;
		margin: 0 auto;
		max-width: 10rem;
		background-color: rgb(207, 232, 220);
		border: 2px solid rgb(79, 185, 227);
		padding: 10px;
		border-radius: 10px;
	}

	.detailInfo {
		margin: 10px;
	}

	.detailInfolst {
		text-align: left;
		margin-left: 1.875rem;
	}
</style>
