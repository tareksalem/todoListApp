var date = new Date();


express.renderComponent(function (data) {
	return (`
			<div class="container animated slideInLeft">
				              <div class="form-container row margin-auto">
                  <div class="row">
                       <h5 class="center-align color-main">Add new Task</h5>
                  </div>
                  <div clas="row">
                    <p class="postingResult animated shake" expName="postingResult"></p>
                  </div>
      <form lang="es" clientPosting="true" action="addTask" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="taskName" name="taskName" type="text" class="validate">
            <label for="taskName">Task Name</label>
          </div>
                    <div class="input-field col s6">
            <input id="taskDescription" name="taskDescription" type="text" class="validate">
            <label for="taskDescription">Task Description</label>
          </div>
        </div>
                <div class="row">
          <div class="input-field col s6">
            <input id="taskDate" name="taskDate" type="date" value="YYYY-MM-DD" min="${data.date}" class="validate">
            <label for="taskDate">Task Date</label>
          </div>
                    <div class="input-field col s6">
            <input id="taskDate" name="taskTime" type="time" class="validate">
            <label for="taskDate">Task Date</label>
          </div>
          </div>
        <div class="row">
              <div class="input-field col s12">
                  <input class="waves-effect btn-sign waves-light btn-small" type="submit" value="Add Task"/>    
              </div>
         </div>
      </form>
    </div>
			</div>
		`)
}, "#addTask", {
	scripts: ["/css/pages/home.css"],
	data: {
		date: date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + 0 + date.getDate(),
	},
  style:{
    ".postingResult": {
      textAlign: "center",
      display: "none"
    }
  }
}, function (component) {

      //  require add task function

    addTaskFunc(component);

});

// function to post data
function addTaskFunc(component) {
          Router.post("/addTask", function (req, res) {
          let taskName = req.body.taskName;
          let taskDescription = req.body.taskDescription;
          let taskDate = req.body.taskDate;
          let taskTime = req.body.taskTime;
          let postingResult = component.postingResult;
          if (req.body.checkEmpty(taskName) || req.body.checkEmpty(taskDate) || req.body.checkEmpty(taskDescription) || req.body.checkEmpty(taskTime)) {
            postingResult.style.color = "red";
            postingResult.innerHTML = "please fill all filds";
            postingResult.style.display = "block";
          } else {
            postingResult.innerHTML = "<div class='spinner'></div>"
            let user = localStorage.getItem("user");
            user = JSON.parse(user);
            let task = {
              taskName: taskName.value,
              taskDescription: taskDescription.value,
              taskDate: taskDate.value,
              taskTime: taskTime.value,
              _id: '_' + Math.random().toString(36).substr(2, 30)
            };
            user.tasks.push(task);
            express.storage.setItemAsync("user", user).then(function (item) {
              postingResult.innerHTML = "task added successfully";
              postingResult.style.color = "green";
              postingResult.style.display = "block";
              taskName.value = "";
              taskDescription.value = "";
              taskDate.value = "";
              taskTime.value = "";
              component.self.querySelectorAll("label").forEach(function (label) {
                label.classList.remove("active");
              });
              setTimeout(function () {
                postingResult.innerHTML = "";
              }, 1000)
              /*refresh my tasks component*/
              var myTasksCom = express.getComponent("myTasks");
              express.refreshComponent(myTasksCom);
              express.removeScript("/js/functions/counter.js", ".dashboard");
              express.require("/js/functions/counter.js", ".dashboard");

            });
          }
        })
}
