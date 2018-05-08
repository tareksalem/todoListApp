express.renderComponent(function (data) {
    return (`
        <div class="header">
                <div class="container">
                                          <span data-target="mobile-demo" class="right pointer sidenav-trigger"><i class="material-icons icon-medium">dehaze</i></a>
                        <ul class="right sidenav cursor-initial" id="mobile-demo">
                        ${localStorage.getItem("user") === null ? 

                            `
                            <h3 class="main-color center-align">Hello user</h3>
                            <li><a class="pointer" router="/">Home</a></li>

                            ` :
                            `
                                <canvas expName="userImg" class="main-color user-img"></canvas>
                                 <li><a class="pointer" router="/dashboard">dashboard</a></li>
                            `
                        }
                        </ul>
                        </div>
        </div>
    `)
}, document.querySelector("#header-app"), {
    scripts: ["/css/header.css"],
    name: "header-app",
    data: {
        message: "User"
    }
}, function (component) {
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elem, {edge: "right"});
    // grap the user info

    var user = localStorage.getItem("user");
    if (user !== null) {


        user = JSON.parse(user);
        // write the canvas
        var canvasImg = component.userImg;
        var context = canvasImg.getContext("2d");
         context.font = "50px Arial";
         context.fillStyle = "#308fc8";
        context.fillText(user.username, 90, 90);
    }

});
