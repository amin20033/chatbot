$(function () {
  $(".signupBtn").click(function (e) {
    e.preventDefault();
    let username = $("#username").val();
    let csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
    let password = $("#password").val();
    let cpassword = $("#cpassword").val();
    console.log(username,csrfmiddlewaretoken,password,cpassword)
    $.ajax({
      url: "/signup/",
      method: "POST",
      data: {
        username: username,
        csrfmiddlewaretoken: csrfmiddlewaretoken,
        password: password,
        cpassword: cpassword,
      },
      success: function (response) {
        if (response.status == "success") {
          $("#msg").html(
            `${response.message} You will be redirected to login page soon, if you are not redirected <a href="/login/"><b><u>Click here</u></b></a>`,
          );
          $("#msg").addClass("alert alert-success p-3 m-3");
          $("#signupForm")[0].reset();
          setTimeout(function () {
            $("#msg").html("");
            $("#msg").removeClass("alert alert-success p-3 m-3");
            window.location.href = "/login/";
          }, 3000);
        } else {
          if (response.message == "User already exists!! Please login now...") {
            $("#msg").html(
              `${response.message} You will be redirected to login page soon, if you are not redirected <a href="/login/"><b><u>Click here</u></b></a>`,
            );
            $("#msg").addClass("alert alert-danger p-3 m-3");
            setTimeout(function () {
              $("#msg").html("");
              $("#msg").removeClass("alert alert-danger p-3 m-3");
              window.location.href = "/login/";
            }, 3000);
          } else {
            $("#msg").html(`${response.message} `);
            $("#msg").addClass("alert alert-danger p-3 m-3");
            setTimeout(function () {
              $("#msg").html("");
              $("#msg").removeClass("alert alert-danger p-3 m-3");
            }, 3000);
          }
        }
      },
      error: function (err) {
        $("#msg").html(`${err} `);
        $("#msg").addClass("alert alert-danger p-3 m-3");
        setTimeout(function () {
          $("#msg").html("");
          $("#msg").removeClass("alert alert-danger p-3 m-3");
        }, 3000);
      },
    });
  });
  $(".loginBtn").click(function (e) {
    e.preventDefault();
    let username = $("#username").val();
    let csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
    let password = $("#password").val();

    $.ajax({
      url: "/login/",
      method: "POST",
      data: {
        username: username,
        csrfmiddlewaretoken: csrfmiddlewaretoken,
        password: password,
      },
      success: function (response) {
        if (response.status == "success") {
          $("#msg").html(
            `${response.message} You will be redirected to home page soon, if you are not redirected <a href="/"><b><u>Click here</u></b></a>`,
          );
          $("#msg").addClass("alert alert-success p-3 m-3");
          $("#loginForm")[0].reset();
          setTimeout(function () {
            $("#msg").html("");
            $("#msg").removeClass("alert alert-success p-3 m-3");
            window.location.href = "/";
          }, 3000);
        } else {
          if (response.message == "User does not exist. Please signup first.") {
            $("#msg").html(
              `${response.message} You will be redirected to signup page soon, if you are not redirected <a href="/signup/"><b><u>Click here</u></b></a>`,
            );
            $("#msg").addClass("alert alert-danger p-3 m-3");
            setTimeout(function () {
              $("#msg").html("");
              $("#msg").removeClass("alert alert-danger p-3 m-3");
              window.location.href = "/signup/";
            }, 3000);
          } else {
            $("#msg").html(`${response.message} `);
            $("#msg").addClass("alert alert-danger p-3 m-3");
            setTimeout(function () {
              $("#msg").html("");
              $("#msg").removeClass("alert alert-danger p-3 m-3");
            }, 3000);
          }
        }
      },
      error: function (err) {
        $("#msg").html(`${err} `);
        $("#msg").addClass("alert alert-danger p-3 m-3");
        setTimeout(function () {
          $("#msg").html("");
          $("#msg").removeClass("alert alert-danger p-3 m-3");
        }, 3000);
      },
    });
  });
  $("#msgBtn").click(function (e) {
    e.preventDefault();
    let prompt = $("#prompt").val();
    let file = $("#file")[0].files[0];
    let csrfmiddlewaretoken = $("input[name='csrfmiddlewaretoken']").val();
    if (prompt==""){
      return;
    }
    if (
      file &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      $("#chatInput")[0].reset();
      $("#message").html("Only Excel files are allowed");

      setTimeout(function () {
        $("#message").html("");
      }, 3000);

      return;
    }
    let formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("file", file);
    formData.append("csrfmiddlewaretoken", csrfmiddlewaretoken);
    $("#chatInput")[0].reset();
    $(".overall").append(`<div class="human">
      <div class="who">
        <big><b>You</b></big>
      </div>
      <div class="response">
        ${prompt}
      </div>
    </div>`);
    $(".overall").append(`<div class="ai">
      <div class="who">
        <big><b>Nova</b></big>
      </div>
      <div class="response now">
        Typing...
      </div>
    </div>`);
    $.ajax({
      url: "/",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $(".now").html(`
         
        ${response.reply}`);
        $(".response").removeClass("now");
      },

      error: function (xhr, status, error) {
        // ✅ FIX: Extract the actual error message
        let errorMessage = "Connection error occurred";

        // Try to get JSON error message from backend
        if (xhr.responseJSON && xhr.responseJSON.message) {
          errorMessage = xhr.responseJSON.message;
        } else if (error) {
          errorMessage = error;
        }

        $(".ai").html(
          `<div class='who'><big><b>NOVA</b></big></div><div class='response'>Error: ${errorMessage}</div>`,
        );
      },
    });
  });
});



