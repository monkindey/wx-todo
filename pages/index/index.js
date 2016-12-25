var app = getApp()

Page({
	data: {
		taskList: [],
		task: '',
		complete: 0
	},

	bindInputTask: function(e) {
		this.setData({
			task: e.detail.value
		})
	},

	bindTaskChange: function(e) {
		var index = e.currentTarget.dataset.index;
		var taskList = this.data.taskList;
		taskList[index].checked = !taskList[index].checked;

		this.setData({
			taskList: taskList,
			complete: taskList.filter(function(t) {
				return t.checked
			}).length
		});
	},

	bindDelete: function(e) {
		var index = e.currentTarget.dataset.index;
		this.setData({
			taskList: this.data.taskList.filter(function(t, i) {
				return i !== index
			})
		})
	},

	// 验证输入
	beforeAdd: function() {
		var task = this.data.task.trim();
		var taskList = this.data.taskList;

		if(task === '') {
			return false;
		}else if(taskList.some(function(t) {
			return t.value === task
		})) {
			return false
		}

		return true;
	},

	bindAddTask: function(e) {
		if(!this.beforeAdd()) {
			return false
		}

		this.setData({
			taskList: this.data.taskList.concat({
				value: this.data.task,
				checked: false
			}),
			task: ''
		})	
	}
})