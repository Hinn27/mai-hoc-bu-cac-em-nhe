const firstName = firstName.value
const lastName = lastName.value
const email = email.value
const phone = phone.value

// lay anh tu API
fetch(URL, {
    method: "POST", // or PUT or DELETE
    header: {
        "Content-Type": "appication/json"
    },
    body: JSON.stringify({
        key1: 'value1', // replace with key/value based on documentation
        key2: 'value2', // same as above (if needed)
    })
})
.then(response => response.json())
.then(data => {
    console.log(data); // read server response
})
.catch(error => {
    console.error(error);
});

// kiem tra email
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = () => {
    const $result = $('#result');
    const email = $('#email').val();
    $result.text('');

    if(validateEmail(email)){
        $result.text(email + ' is valid.');
        $result.css('color', 'green');
    } else{
        $result.text(email + ' is invalid.');
        $result.css('color', 'red');
    }
    return false;
}

$('#email').on('input', validate);
