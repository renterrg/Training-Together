$(document).ready(function() {

  var nameInput = $("#name-input");
  var emailInput = $("#email-input");
  var emailLogin = $("#email-login");
  var passwordInput = $("#password-input");
  var passwordLogin = $("#password-login");
  var url = window.location.search;  
  var teamsPrograms = [];
  var loginData = [];
  var validatedPassword;
  var validatedEmail;

  $(document).on("click", "#login-menu", getUserData); 
  $(document).on("click", "#teamMates-login", loginEntry); 
  $(document).on("click", "#registration-menu", getTeamData);  
  
  $("#teamMember-registration").on("click", function newUser(event) {
    event.preventDefault();

    if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }

    var programData = teamsPrograms.find(function(i) {
        return i.team === $("#team-selection").val();
      });

    var newUser = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      team: $("#team-selection").val().trim(),
      program: programData.program,
      progress: 0
    };

    teamMateRegistration(newUser);

  });

  function teamMateRegistration(User) {
    $.post("/api/users", User, function() {
      window.location.href = "/home";
      console.log("Teammate has been added to Database");
    });
  };

  function getUserData() {
    $.get("/api/users", function(data) {
      for (var i = 0; i < data.length; i++) {
        loginData[i] = {
          email: data[i].email,
          password: data[i].password,
          id: data[i].id
        };    
      };
    });
  };
  
  function getTeamData() {
    $.get("/api/users", function(data) {
      var teamsArray = [];
      for (var i = 0; i < data.length; i++) {
        teamsArray[i] = data[i].team; 
        teamsPrograms[i] = {
          team: data[i].team,
          program: data[i].program
        };    
      };     
      teamsListgenerator(teamsArray);
    });
  };

  function teamsListgenerator(teamsArr) {    
    var teamsList = teamsArr.reduce(function(allTeams, team) {
      if (allTeams.indexOf(team) < 0) {
        allTeams.push(team);        
      }     
      return allTeams;       
    }, []);   

    for (var i = 0; i < teamsList.length; i++) {
      var count = i + 1;
      $("#team-selection").append("<option value='" + teamsList[i] + "'>" + teamsList[i] + "</option>");      
    }
  };

  function loginEntry() {
    event.preventDefault();
    var emailLog = emailLogin.val().trim();
    var passwordLog = passwordLogin.val().trim();
    var emailData = loginData.find(function(i) {
      return i.email === emailLog;
    });

    if (!emailLog || !passwordLog) {
      return;
    }    
 
    if (passwordLog === emailData.password) {
      window.location.href = "/users?name_id=" + emailData.id;      
    } 
  };

});
