import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: {
			faceID:1,
			tasks:[],
		},
		taskInfo:{
			taskID:-1,
			taskType:0,
		}
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setTaskInfo(state, taskInfo) {
			state.taskInfo = taskInfo;
		}
	},
	actions: {},
	modules: {}
});
