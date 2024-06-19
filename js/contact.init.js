document.getElementById('myForm').addEventListener('submit', validateForm);

// ----- CONTACT ----- //
function validateForm(event) {
    event.preventDefault();

    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var phone = document.forms["myForm"]["phone"].value;
    var domain = document.forms["myForm"]["domain"].value;
    var purpose = document.forms["myForm"]["purpose"].value;

    document.getElementById("error-msg").style.opacity = 0;
    document.getElementById('error-msg').innerHTML = "";
    if (name == "" || name == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'><i  data-feather='home' class='icon-sm align-middle me-2'></i> Please enter a name*</div>";
        fadeIn();
        return false;
    }
    if (email == "" || email == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'><i  data-feather='alert-triangle' class='icon-sm align-middle me-2'></i> Please enter a email*</div>";
        fadeIn();
        return false;
    }
    if (phone == "" || phone == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'><i  data-feather='alert-triangle' class='icon-sm align-middle me-2'></i> Please enter a phone*</div>";
        fadeIn();
        return false;
    }
    if (purpose == "" || purpose == null) {
        document.getElementById('error-msg').innerHTML = "<div class='alert alert-danger error_message'><i  data-feather='alert-triangle' class='icon-sm align-middle me-2'></i> Please enter a purpose*</div>";
        fadeIn();
        return false;
    }

    const data = {
        name: name,
        email: email,
        phone: phone,
        domain: domain,
        purpose: purpose
    };
    console.log(data);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://webhook.site/55f366ec-21b8-4ea4-867d-86fece5eb162", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {
                document.getElementById("simple-msg").innerHTML = "Success! Your request has been submitted.";
            } else {
                document.getElementById("simple-msg").innerHTML = "Error! Something went wrong. Please try again.";
            }
        }
    };

    xhttp.send(JSON.stringify(data));
}

function fadeIn() {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
        if (opacity < 1) {
            opacity = opacity + 0.5
            fade.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 200);
}
