var UserModel = Backbone.Model.extend({
  urlRoot: "http://localhost:8090/userdetails",

  fetchUserDetails: function (email) {
    // Perform a GET request with the email as a query parameter
    this.fetch({
      data: $.param({ email: email }),
      success: function (model, response, options) {
        console.log("User details fetched successfully:", response);
        // Trigger an event to notify the view that data has been fetched
        model.trigger("user:fetched");
      },
      error: function (model, xhr, options) {
        console.error("Failed to fetch user details:", xhr.statusText);
        alert("Error fetching user details.");
      },
    });
  },
});

var UserView = Backbone.View.extend({
  el: "#user-details", // Assuming there's a div with this ID in your HTML

  template: _.template($("#userTemplate").html()), // Assume you have a template for user details

  initialize: function () {
    // Listen to the 'user:fetched' event from the model
    this.listenTo(this.model, "user:fetched", this.render);
  },

  render: function () {
    // Render the user details using the fetched data and template
    var userData = this.model.toJSON();
    this.$el.html(this.template(userData)); // Render the data into the view
    return this;
  },
});
var AppRouter = Backbone.Router.extend({
  routes: {
    userprofile: "showUserProfile",
    "": "defaultroute",
  },

  showUserProfile: function () {
    // Fetch the email from local storage
    var email = localStorage.getItem("email");

    if (email) {
      // Create an instance of UserModel
      var userModel = new UserModel();
      // Create an instance of UserView, passing in the model
      var userView = new UserView({ model: userModel });
      // Fetch user details
      userModel.fetchUserDetails(email);
    } else {
      alert("No email found in local storage.");
    }
  },
  defaultroute: function () {
    console.log("you have entered nothing");
  },
});

$(document).ready(function () {
  // Start the router
  var appRouter = new AppRouter();
  Backbone.history.start();
});
function logout() {
  // Clear session or localStorage
  localStorage.removeItem("userEmail");

  // Navigate to the initial page
  AppRouter.navigate("#/userprofile", { trigger: true });
}

// Bind the click event for the logout button
$(document).on("click", "#logoutBtn", function () {
  logout();
});
