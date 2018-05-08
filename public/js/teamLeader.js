$(document).ready(function() {
 
  var nameInput = $("#name-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var teamnameInput = $("#teamname-input");  
  var url = window.location.search;
  var teamProgram;  
  
  $("#list-tab a").click(function(e) {    
    teamProgram = $(e.target);   
  });

  $("#teamdata-form").on("click", function newteamData(event) {
    event.preventDefault();

    if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim() 
      || !teamnameInput.val().trim() || !teamProgram.text()) {
      return;
    }

    var newTeam = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      team: teamnameInput.val().trim(),
      program: teamProgram.text(),
      progress: 0
    };

    teamCreation(newTeam);

  });
  
  function teamCreation(User) {
    $.post("/api/users", User, function() {
      window.location.href = "/home";
      console.log("Team created and Team leader has been added to Database");
    });
  };
    
});
