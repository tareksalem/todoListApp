//  get the user infos
if (localStorage.getItem("user") === null) {
	express.redirect("/");
} else {
	express.renderComponent(function (data) {
		var user = JSON.parse(data.localStorage);
		return (`
			<main class="container animated bounceInLeft main-color">
				<div class="dashboard">
					<div expName="containerFixed" class="container-fixed white">
						<h5 class="center-align">Hello ${user.username}</h1>
						<ul expName="ulTabs" id="tabs-swipe-demo" class="tabs">
						    <li expName="addTaskBtn" class="tab col s3"><a href="#addTask">Add Task</a></li>
						    <li expName="myTasksBtn" class="tab col s3"><a class="active" href="#myTasks">My Tasks</a></li>
						    <li expName="deleteAccountComBtn" class="tab col s3"><a href="#DeleteAccount">Delete your account</a></li>
						</ul>

					</div>
					<div class="container-under-fixed">
						<div expName="addTaskComponent" id="addTask" class="dash-panel col s12"></div>
						<div expName="myTasksComponent" id="myTasks" class="dash-panel col s12"></div>
						<div expName="deleteAccountComponent" id="DeleteAccount" class="dash-panel col s12">Test 3</div>
					</div>
				</div>
				<div class="testComp"></div>
			</main>
			`)
	}, "#wrapper-pages", {
		scripts: ["/css/pages/dashboard.css", "/js/functions/counter.js"],
		data: {
			localStorage: localStorage.getItem("user")
		}
	}, function (component) {
		var el = component.ulTabs;
		 var instance = M.Tabs.init(el);

		 

		 // render a  component of dashboard
		 express.render(false, "/js/components/addTask.js", component.addTaskComponent, "add task");
		 express.render(false, "/js/components/myTasks.js", component.addTaskComponent, "My tasks");
  		 express.render(false, "/js/components/deleteAccount.js", component.addTaskComponent, "delete account");

  		 // function for scrolling
	});
}
// function to load tasks components