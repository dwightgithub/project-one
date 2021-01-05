import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userInfo: null,
		taskID: null,
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		setTaskID(state, taskID) {
			state.taskID = taskID;
		}
	},
	actions: {},
	modules: {}
});
