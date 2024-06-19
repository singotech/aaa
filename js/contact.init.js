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

    const formData = {
        name: name,
        email: email,
        phone: phone,
        domain: domain,
        purpose: purpose,
        recaptchaResponse: grecaptcha.getResponse()
    };
    console.log(formData);

    fetch('https://script.google.com/macros/s/AKfycbxGvJsj8Y5SYzASwyqA747ocsFvwK4Sh50Kp5xLP_JtPbzb4uv6JZZP1RBtXL25zHZ3/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Form submitted successfully!');
            document.getElementById('myForm').reset();
            grecaptcha.reset(); // Reset reCAPTCHA
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
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
