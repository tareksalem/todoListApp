if (localStorage.getItem("user") !== null) {
  express.redirect("/dashboard");
} else {


  express.renderComponent(function (data) {
      return (`
          <main class="animated zoomIn" id="home-page">
              <div class="form-container row">
                  <div class="row">
                       <h5 class="center-align color-main">Sign up here</h5>
                  </div>
                  <div clas="row">
                    <p class="postingResult animated" expName="postingResult"></p>
                  </div>
      <form clientPosting="true" action="/signup" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="username" name="username" type="text" class="validate">
            <label for="username">User Name</label>
          </div>
        </div>
                <div class="row">
          <div class="input-field col s12">
            <input id="Email" name="email" type="email" class="validate">
            <label for="Email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" name="password" class="validate">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
              <div class="input-field col s12">
                  <input class="waves-effect btn-sign waves-light btn-small" type="submit" value="subnit"/>    
              </div>
         </div>
      </form>
    </div>
          
          </main>
      `)

  }, "#wrapper-pages", {
      scripts: ["/css/pages/home.css"],
      name: "homePage",
      data: {username: "tarek"},
      style: {
          ".postingResult": {
            display: "none",
            textAlign : 'center',
            margin: "5px auto"
          }
      }
      // fadeIn: {
      //     duration: 600
      // }
  }, function (component) {
    postingData(component)
  })


  // function for posting data
  function postingData(component) {
    Router.post("/signup", function (req, res) {
      var username = req.body.username.value;
      var email = req.body.email.value;
      var password = req.body.password.value;
      var postingResult = component.postingResult;
            express.filterContent(postingResult);
            postingResult.classList.remove("shake");
              postingResult.classList.remove("animated");
      if (req.body.checkEmpty(username) || req.body.checkEmpty(email) || req.body.checkEmpty(password)) {
        component.append(postingResult, "you should enter all fileds");
        postingResult.fadeIn(400);
        postingResult.style.color = 'red'
        postingResult.classList.add("shake");
              postingResult.classList.add("animated");
      } else {
        // show the success message
        express.filterContent(postingResult);
        component.append(postingResult, "success login and saving data");
        postingResult.fadeIn(400);
        postingResult.style.color = "green";
        postingResult.insertAfter("<div class='spinner'></div>");
        component.self.querySelectorAll("input").forEach(function (input) {
          input.setAttribute("disabled", "disabled");
        });
        // set local storage
        var user = {
          username: username,
          email: email,
          password: password,
          tasks: []
        }
        user = JSON.stringify(user);
        setTimeout(function () {
          addUser(user).then(function (user) {
            express.filterContent(postingResult);
            component.append(postingResult, "<span>redirecting now ... </span>");
            setTimeout(function () {
              res.redirect("/dashboard");
            }, 300);
          }).catch(function () {
            express.filterContent(postingResult);
            component.append(postingResult, "<span>the user is already exist</span>");
            postingResult.style.color = "red";
             component.self.querySelector(".spinner").removeThis();
                   component.self.querySelectorAll("input").forEach(function (input) {
          input.removeAttribute("disabled");
        });
          });
        }, 300)
      }
    });
  }

  function addUser(user) {
          return new Promise(function (resolve, rejected) {
          if (localStorage.getItem("user") === null) {
             localStorage.setItem("user", user);
             if (localStorage.getItem("user") !== null) {
              var userObject = JSON.parse(localStorage.getItem("user"));
              return resolve(userObject);
             }
          } else {
            return rejected();
          }

        });
  }
}