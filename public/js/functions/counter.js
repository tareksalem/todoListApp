/*function to make a counter to notify the user the time of task end*/
function notifyUser() {
	let dashboard = document.querySelector(".daskbaord");
	let tasks = JSON.parse(express.storage.getItem("user")).tasks;
	tasks.forEach(function (task, i) {
		let taskDate = task.taskDate;
		let taskTime = task.taskTime;
		let fullDate = new Date(taskDate);
		let taskHours = taskTime.split(":")[0];
		let taskMinutes = taskTime.split(":")[1];
		fullDate.setHours(taskHours, taskMinutes);
		fullDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
		console.log(fullDate)
		//  function to make intereval to count the time
		let intirval = setInterval(function () {
			let dateNow = new Date;
			if (+dateNow >= +fullDate) {
				if (+dateNow - + +fullDate < 100000) {
					// show alert to user
					showAllert(task);
					clearInterval(intirval);
				// document.event("touchstart", function (e) {
				// 	showAllert(task);
				// 	clearInterval(intirval);
				// })
				}
			}
		}, 1000)
	});
}

notifyUser();

function showAllert(task) {
	let dashboard = document.querySelector(".dashboard");
			express.renderComponent(function (data) {
		return (`
				<div responseType="display" display1="none" class="container-alert">
					<div class="row">
					<div class="col s10 m8 l8 col-center alert-content white">
						<h5>The time of this task "${task.taskName}" is started</h5>
						<button expName="button" event="true" targetElement="component" eventType="click" class="waves-effect waves-light btn">Ok</button>
					</div>
					</div>
				</div>
			`)
	}, dashboard, {
		name: "counterComponent", 
		style: {
			"component": {
				background: "rgba(0, 0, 0, .50)",
				position: "fixed",
				top: "0",
				bottom: "0",
				right: "0",
				left: "0",
				height: "100%",
				"z-index": "200",
				padding: "10px"
			},
			".alert-content": {
				padding: "10px",
				"margin-top": "50px"
			},
			".btn": {
				"margin-top": "50px",
				"background": "#5c8eda"
			}
		}
	}, function (component) {
		var audio = new Audio();
		audio.src = "/audio/user-notify.mp3" || "/audio/user-notify.m4r" || "/audio/user-notify.ogg";
		audio.play();
		component.button.event("click", function (e) {
			express.removeComponent("counterComponent");

		})
	})
}