const express = new Express();

const Router = express.Router;

express.loadStaticComponents(function () {
   express.render(false, "/js/components/header.js", "#header-app", "header-app");
   express.render(false, "/js/components/footer.js", "#footer-app", "footer-app");
});

function appendLoader(parent) {
    parent.innerHTML = `
                      <div class='container'>
  <div class='loader'>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>
    <div class='loader--dot'></div>

  </div>
</div>
            `
}

Router.get("/", "Home", function (req, res) {
   // filter the main page
   express.filterContent("#wrapper-pages", {
      element: ".cont",
      beforeRender: {
         execute: function (parent) {
            appendLoader(parent);
         },
          duration: 1000

      }
   }, function (parent) {
      express.render(true, "/js/components/pages/home.js", parent, "homePage");
   });
});

Router.get("/dashboard", "dashboard", function (req, res) {
   // filter the main page
   express.filterContent("#wrapper-pages", {
      element: ".cont",
      beforeRender: {
         execute: function (parent) {
            appendLoader(parent);
         },
          duration: 1000

      }
   }, function (parent) {
      express.render(true, "/js/components/pages/dashboard.js", parent, "dashboard");
   });
});
   Router.errorPage(function () {
      express.render(false, "/js/components/pages/errorPage.js", "#wrapper-pages", "errorPage")
   })
