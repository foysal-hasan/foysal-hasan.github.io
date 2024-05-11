
const form = document.querySelector('#validationForm')
const msgRow = document.querySelector('#msgRow')
const msgCol = document.createElement('div')
msgCol.className = 'col-md-6 mx-auto';

form.addEventListener('submit', e => {
    e.preventDefault()
    const type = e.target.selectType.value;
    const text = e.target.validateText.value;
    let isValid = false
    let inputName = ''


    if (text == '') {
        alert('Enter text before submit.')
        return
    }

    if (type == 'email') {
        isValid = validateEmail(text)
        inputName = 'Email'
    } else if (type == 'phoneNumber') {
        isValid = validatePhoneNumber(text)
        inputName = 'Phone Number'
    } else if (type == 'postCode') {
        isValid = validatePostCode(text)
        inputName = 'Post Code'
    }

    if (isValid) {
        msgCol.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <h3>${inputName} is Valid!</h3>
                </div>
            `
    } else {
        msgCol.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h3>${inputName} is invalid!</h3>
        </div>
`
    }

    msgRow.appendChild(msgCol)

})



const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePhoneNumber = (phoneNumber) => {
    return String(phoneNumber)
        .match(
            /^01[0-9]{9}$/
        );
};

const validatePostCode = (postCode) => {
    return String(postCode)
        .match(
            /^\d{4}$/
        );
};

