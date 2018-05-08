express.renderComponent(function (data) {
	console.log(JSON.parse(localStorage.getItem("user")))
	data.getTasks();

	return (`
			<!--container of the tasks table-->
			<div class="container animated zoomIn">
			${data.tasks.length > 0 ?
				`
				<!--search bar for tasks-->

				      <div class="row">
				        <div class="input-field col s12">
				        <i class="material-icons prefix">&#xE8B6;</i>
				          <input expName="searchInput" id="icon_prefix2" class="materialize-input" placeholder="search tasks">
				        </div>
				  </div>
				<!--end search bar for tasks-->

				<table class="table-tasks centered highlight responsive-table">
					<thead>
					  	<tr>
					      	<th>Task Name</th>
					        <th>Task Description</th>
					        <th>Task Date</th>
					        <th>Task Time</th>
					        <th># edit</th>
					        <th># remove</th>
					    </tr>
					</thead>
					<tbody>
						<!--task loop-->
							${express.loopComponent(data.tasks, function (task) {
								return (`
									<tr expName="tasksData">
										<td expName="taskNameData" class="taskNameData">${task.taskName}</td>
										<td expName="taskDescriptionData" class="taskDescriptionData">${task.taskDescription}</td>
										<td>${task.taskDate}</td>
										<td>${task.taskTime}</td>
										<td><i data-value="${task._id}" expName="editBtn" data-target="modal1" class="modal-trigger task-edit-ico material-icons">mode_edit</i></td>
										<td>
											<i data-value="${task._id}" expName="removeBtn" data-target="modal2" class="remove-task-btn material-icons modal-trigger">remove_circle</i>
										</td>
									</tr>
								`)
							})}
						<!--end task loop-->
					</tbody>
		    	</table>
		    	<!--btn to clear all tasks-->
		    	<div class="row">
		    	<div class="col s6 m5 l3 col-center">
		    	<span expName="deleteTasks" id="deleteTasks" class="waves-effect waves-light btn red">delete all tasks</span>
		    	</div>
		    	</div>
		    	<!--end btn to clear all tasks-->
		    	<!--modal to delete the task-->
				<!-- Modal Trigger -->
				  <!-- Modal Structure -->
				  <div id="modal2" expName="modal2" class="modal bottom-sheet top-modal">
				    <div class="modal-content">
				      <h4>Do you want  to remove the task ?</h4>
				    </div>
				    <div class="modal-footer">
				      <a href="#!" expName="disagreeBtn" class="modal-close waves-effect waves-green btn-flat">close</a>
				      <a href="#!" expName="agreeBtn" class="modal-close waves-effect waves-green btn-flat">Agree</a>
				    </div>
				  </div>

		    	<!--end modal to delete the task-->
		    	<!--modal to edit the task-->
		    	<!-- Modal Trigger -->
  <!-- Modal Structure -->
  <div expName="modal" id="modal1" class="modal">
    <div class="modal-content">
    				              <div class="form-container row margin-auto">
                  <div class="row">
                       <h5 class="center-align color-main">Edit Task</h5>
                  </div>
                  <div clas="row"> 
                    <p class="postingResult animated shake" expName="postingResult"></p>
                  </div>
      <form lang="es" clientPosting="true" action="editTask" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input expName="taskName" id="taskName" name="taskName" type="text" class="validate">
            <label for="taskName">Task Name</label>
          </div>
                    <div class="input-field col s6">
            <input expName="taskDescription" id="taskDescription" name="taskDescription" type="text" class="validate">
            <label for="taskDescription">Task Description</label>
          </div>
        </div>
                <div class="row">
          <div class="input-field col s6">
            <input expName="taskDate" id="taskDate" name="taskDate" type="date" value="YYYY-MM-DD" min="${data.date}" class="validate">
            <label for="taskDate">Task Date</label>
          </div>
                    <div class="input-field col s6">
            <input expName="taskTime" id="taskTime" name="taskTime" type="time" class="validate">
            <label for="taskTime">Task Date</label>
          </div>
          </div>
        <div class="row">
              <div class="input-field col s12">
                  <input expName="taskEdit" class="waves-effect btn-sign waves-light btn-small" type="submit" value="Edit Task"/>    
              </div>
         </div>
      </form>
    </div>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">close</a>
    </div>
  </div>

		    	<!--end modal to edit the task-->
		    	`: `
		    		<h4 class="text-center color-gray">No Tasks to show</h4>
		    	`}
			</div>
			<!--end container of the tasks table-->
		`)
}, "#myTasks", {
	name: "myTasks",
	data: {
		getTasks() {
			var user = JSON.parse(localStorage.getItem("user"));
			this.tasks = user.tasks;
			this.user = user;
		}
	},
	scripts: ["/css/myTasks.css"]
}, function (component) {
	var modal = component.modal;
    var instances = M.Modal.init(modal)
    var modal2 = component.modal2;
        var instances = M.Modal.init(modal2)

    // requre edit task function
    editTaskForm(component);

    // require remove task function
    removeTask(component);
    // require search tasks function
    searchTasks(component);

    // require the function to delete all tasks
    deleteAllTasks(component);
})

// function to edit the task 
function editTaskForm(component) {
	
	let editBtn = component.editBtn;
	let tasks = JSON.parse(localStorage.getItem("user")).tasks;
	let taskName = component.taskName;
	let taskDescription = component.taskDescription;
	let taskDate = component.taskDate;
	let taskTime = component.taskTime;
	let postingResult = component.postingResult;
	var task;
	editBtn.event("click", function (e) {
		let editedTaskId = this.getAttribute("data-value");
		// add active class for all labels of inputs
		component.self.querySelectorAll("label").forEach(function (label) {
			label.classList.add("active");
		});
		task = tasks.find((taskT) => taskT._id === editedTaskId);
		taskName.value = task.taskName;
		taskDescription.value = task.taskDescription;
		taskDate.value = task.taskDate;
		taskTime.value = task.taskTime;
	})
	// function to submit the edit form
	Router.post("/editTask", function (req, res) {
		console.log("dd")
		          if (req.body.checkEmpty(taskName) || req.body.checkEmpty(taskDate) || req.body.checkEmpty(taskDescription) || req.body.checkEmpty(taskTime)) {
            postingResult.style.color = "red";
            postingResult.innerHTML = "please fill all filds";
            postingResult.style.display = "block";
          } else {
            postingResult.innerHTML = "<div class='spinner'></div>"
            let user = localStorage.getItem("user");
            user = JSON.parse(user);
            task.taskName = taskName.value,
              task.taskDescription =  taskDescription.value,
              task.taskDate = taskDate.value,
              task.taskTime = taskTime.value,
              user.tasks = tasks;
            express.storage.setItemAsync("user", user).then(function (item) {
              postingResult.innerHTML = "task edited successfully";
              postingResult.style.color = "green";
              postingResult.style.display = "block";
              taskName.value = "";
              taskDescription.value = "";
              taskDate.value = "";
              taskTime.value = "";
              /*refresh my tasks component*/
              var myTasksCom = express.getComponent("myTasks");
              express.refreshComponent(myTasksCom);
              express.removeScript("/js/functions/counter.js", ".dashboard");
              express.require("/js/functions/counter.js", ".dashboard");
            });
          }
	});
}

// function to remove the task
function removeTask(component) {
	let removeBtn = component.removeBtn;
	let agreeBtn = component.agreeBtn;
	console.log(agreeBtn)
	disagreeBtn = component.disagreeBtn;
	removeBtn.event("click", function () {
		let  taskId = this.getAttribute("data-value");
		agreeBtn.event("click", function (e) {
			let user = JSON.parse(express.storage.getItem("user"));
			let tasks = user.tasks;
			let task = tasks.find((tas) => tas._id === taskId);
			let taskIndex = tasks.indexOf(task);
			tasks.splice(taskIndex, 1);
			user.tasks = tasks;
			express.storage.setItemAsync("user", user).then(function () {
              var myTasksCom = express.getComponent("myTasks");
              express.refreshComponent(myTasksCom);
                express.removeScript("/js/functions/counter.js", ".dashboard");
              	express.require("/js/functions/counter.js", ".dashboard");
			});	
		})

	})
}

// function to search tasks
function searchTasks(component) {
	let searchInput = component.searchInput;
	let tasks = component.tasksData;
	function searchIt(task, searchValue) {
	if (Array.isArray(tasks)) {
		Array.from(tasks).forEach(function (task, i) {
			let taskName = task.querySelector(".taskNameData");
			task.style.display = "none";
			if (taskName.textContent.indexOf(searchValue) !== -1) {
				if (window.innerWidth > 992) {
					task.style.display = "table-row";
				} else {
					task.style.display = "inline-block";
				}
			}
		})
	} else {
		let taskName = task.querySelector(".taskNameData");
		if (taskName.textContent.indexOf(searchValue) !== -1) {
			if (window.innerWidth > 992) {
				task.style.display = "table-row";
			} else {
				task.style.display = "inline-block";
			}
		} else {
			task.style.display = "none";
		}
	}
}
	searchInput.event("keyup", function (e) {
		let searchValue = this.value;
		searchIt(tasks, searchValue);
	})
}
// function to delete all tasks
function deleteAllTasks(component) {
	let deleteTasks = component.deleteTasks;
	deleteTasks.event("click", function (e) {
		let user = JSON.parse(express.storage.getItem("user"));
		user.tasks = [];
		user = JSON.stringify(user);
		express.storage.setItemAsync("user", user).then(function () {
            var myTasksCom = express.getComponent("myTasks");
            express.refreshComponent(myTasksCom);
            express.removeScript("/js/functions/counter.js", ".dashboard");
            express.require("/js/functions/counter.js", ".dashboard");
		});

	})
}