express.renderComponent(function () {
	return (`<div class="container continer-deleteAccount">
				<h4>Do you want to delete your account ?</h4>
				<span expName="deleteBtn" id="deleteBtn" class="waves-effect waves-light btn">
				<i class="material-icons">&#xE872;</i>
				</span>
			</div>
		`)
}, "#DeleteAccount", {
	style: {
		"component": {
			"backgroundColor": "#f5f5f5",
			padding: "10px",
			"height": "auto",
			"overflow" : "hidden"
		},
		"h4": {
			color: "#a9a9a9"
		},
		".btn": {
			"backgroundColor": "#F44336",
			float:"right"
		}
	}
}, function (component) {
	// function to delete the account

	component.deleteBtn.event("click", function () {
		localStorage.removeItem("user");
		express.redirect("/");
	})
})

