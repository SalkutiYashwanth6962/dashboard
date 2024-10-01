var view1 = Backbone.View.extend({
  events: {
    "submit #myform": "handleSubmit",
  },
  template: _.template($("#demoTemplate1").html()),

  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(this.template());
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var MyModel = Backbone.Model.extend({
      urlRoot: "http://localhost:8090/registeruser",
    });
    var newUser = new MyModel({
      userName: $("#uname").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      phoneNumber: $("#phoneno").val(),
    });

    newUser.save(null, {
      type: "POST",
      success: function (model, response, options) {
        // Log the entire response to see its structure
        console.log("Response from server:", response);
        console.log("New User saved successfully:", model.toJSON());
      },
      error: function (model, xhr, response) {
        if (xhr.responseText === "success") {
          alert("User registered successfully.");
        } else {
          alert("Error while registering user.");
        }
      },
    });
  },
});

//success,error,type
//login
var view2 = Backbone.View.extend({
  events: {
    "submit #myform1": "handleSubmit",
  },
  template: _.template($("#demoTemplate2").html()),

  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(this.template());
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var MyModel = Backbone.Model.extend({
      urlRoot: "http://localhost:8090/loginuser",
    });
    var newUser = new MyModel({
      email: $("#email").val(),
      password: $("#password").val(),
    });

    newUser.save(null, {
      type: "POST",
      success: function (model, response, options) {
        // Log the entire response to see its structure
        console.log("Response from server:", response);
        console.log("New User saved successfully:", model.toJSON());
      },
      error: function (model, xhr, response) {
        if (xhr.responseText === "success") {
          alert("Logged In successfully");
          localStorage.setItem("email", $("#email").val());
          router.navigate("userprofile", { trigger: true });
          // window.location.href = "userprofile.html";
        } else {
          alert("Invalid Credentials");
        }
      },
    });
  },
});

var view3 = Backbone.View.extend({
  events: {
    "submit #myform3": "handleSubmit",
  },
  template: _.template($("#demoTemplate3").html()),
  initialize: function () {
    this.render();
  },
  render: function () {
    this.$el.html(this.template());
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var email1 = $("#email").val();

    var MyModel = Backbone.Model.extend({
      url: "http://localhost:8090/updateuser/",
    });

    var updatedUser = new MyModel({
      userName: $("#uname").val(),
      email: email1,
      password: $("#password").val(),
      phoneNumber: $("#phoneno").val(),
    });

    updatedUser.save(null, {
      type: "POST",
      success: function (model, response, options) {
        window.alert("updated successfully");
        console.log("Updated User saved successfully:", model.toJSON());
      },
      error: function (model, xhr, options) {
        window.alert("updated successfully2");
        console.error("Failed to update new User:", xhr.statusText);

        console.log("Updated User saved successfully:", model.toJSON());
      },
    });
  },
});

var view4 = Backbone.View.extend({
  initialize: function () {
    this.render();
  },
  template: _.template($("#dashboard-temp").text()), // Assume you have a template for user details

  render: function () {
    this.$el.html(this.template()); // Render the data into the view
  },
});

var routeDemo = Backbone.Router.extend({
  //create the router specify some routes along with the function names and then provide function in that create the object of the view and specify the element
  routes: {
    "": "route2",
    register: "route1",
    login: "route2",
    update: "route3",
    userprofile: "route4",
    "*wrongurls": "defaultroute",
  },
  before: function (route) {
    console.log("Before route:", route);
    if (route === "userprofile" || route === "#/login") {
      // alert("You need to log in first!");
      window.history.pushState(null, null, window.location.href);
      // router.navigate("#login", { trigger: false });

      return false; // Returning false prevents the route from being executed
    } else {
      console.log("login before2");
    }
    return true; // Return true to continue with the route
  },
  // before: function (route) {
  //   // Do something with every route before it's routed. "route" is a string
  //   // containing the route fragment just like regular Backbone route
  //   // handlers. If the url has more fragments, the before callback will
  //   // also get them, eg: before: function( frag1, frag2, frag3 )
  //   // (just like regular Backbone route handlers).
  //   if (route === "#/register") {
  //     console.log("The before filter ran and the route was foo!");
  //   }
  // }

  route1: function () {
    console.log("register 2");
    var view = new view1({
      el: "#demo1",
    });
  },
  route2: function () {
    var view = new view2({
      el: "#demo1",
    });
  },
  route3: function () {
    var view = new view3({
      el: "#demo1",
    });
  },
  route4: function () {
    var view = new view4({
      el: $("body"),
    });
  },

  defaultroute: function () {
    var _this = this;
    _this.navigate("#userprofile", { trigger: true, replace: true });
    _this.before("userprofile");
  },
});

var router = new routeDemo();
Backbone.history.start();

var someView = Backbone.View.extend({
  events: {
    click: "onClick",
  },
  onClick: function (e) {
    // if (!localStorage.length === 0) {
    //   this.defaultroute();
    //   return true;
    // } else {
    // }
    var $li = $(e.target);

    router.navigate($li.attr("href"), { trigger: true, replace: true });
    // router.before($li.attr("href"));

    console.log($li.attr("href"));
    // this.before($li.attr("href"));
  },
});
if (localStorage.length != 0) {
  console.log(" urls");
  console.log(localStorage.getItem("email"));
  router.navigate("#userprofile", { trigger: true, silent: true });
} else {
  console.log(localStorage.getItem("email"));

  console.log("no urls");
}

var v = new someView({
  el: ".navbar-nav",
});
// $("#update").click(function () {
//   router.navigate("update", { trigger: true });
// });
// $("#updbtn,#regbtn").click(function () {
//   router.navigate("getData", { trigger: true });
// });
//fetch ,destroy ,save mainly we use this method in backbone js inorder to perform the crud operations on models and the collections
