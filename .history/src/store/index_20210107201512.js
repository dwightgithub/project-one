import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: null,
		taskID: null,
<<<<<<< HEAD
=======
		tasks:null,
>>>>>>> parent of e93f230... 实现基本功能
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setTaskID(state, taskID) {
			state.taskID = taskID;
<<<<<<< HEAD
=======
		},
		setTasks(state, tasks) {
			state.tasks = tasks;
>>>>>>> parent of e93f230... 实现基本功能
		}
	},
	actions: {},
	modules: {}
});
