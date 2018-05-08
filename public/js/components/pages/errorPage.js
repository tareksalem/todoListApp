express.renderComponent(function (data) {
	document.title = data.error;
	return (`
			<div class="container">
				<h4 class="message">${data.message}</h4>
			</div>
		`)
}, "#wrapper-pages", {
	style: {
		".message": {
			color: "white"
		}
	},
	data: {
		message: "error page",
		error: "error Page"
	}
})