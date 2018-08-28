let loginForm = document.getElementById('login--form');
let registrationForm = document.getElementById('register--form');
let signupButton = document.getElementById('link--register');
let errorBox = document.getElementById('error-message');

const baseUrl = 'http://52.32.35.105/';
const redirectUrl = '/app/index.html';

if (localStorage.getItem('helper|user')) {
    window.location.href = redirectUrl;
}

function addErrorMessage(msgs) {
    errorBox.classList.remove('display--none');
    errorBox.innerHTML = '';
    let list = document.createElement('ul');
    if (!Array.isArray(msgs)) {
        msgs = [msgs];
    }
    msgs.forEach(msg => {
        let listItem = document.createElement('li');
        listItem.innerHTML = msg;
        list.appendChild(listItem);
    });
    errorBox.appendChild(list);
}

function constructFormObject(formEle) {
    let formObject = {};
    formEle.querySelectorAll('input')
        .forEach(input => {
            let inputName = input.getAttribute('name');
            if (inputName) {
                let inputValue = input.value;
                formObject[inputName] = inputValue;
            }
        });
    return formObject;
}

function constructPostObject(obj) {
    return {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

function saveUserObject(user) {
    delete user['Password'];
    localStorage.setItem('helper|user', JSON.stringify(user));
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let loginObject = constructFormObject(loginForm);
    fetch(baseUrl + 'user/login', constructPostObject(loginObject))
        .then(res => res.json()).then(res => {
            if (res.error) {
                addErrorMessage(res.error);
                return;
            }
            saveUserObject(res);
            window.location.href = redirectUrl;
        })
});

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let errors = []
    let passwordFields = registrationForm.querySelectorAll('input[type="password"]');
    if (passwordFields[0].value !== passwordFields[1].value) {
        passwordFields.forEach(item => item.classList.add('input--incorrect'));
        errors.push('Password\'s don\'t match');
    }
    if (passwordFields[0].value.length < 8) {
        errors.push('Password must be 8 characters or longer')
    }
    if (errors.length) {
        addErrorMessage(errors);
        return;
    }
    let registerObject = Object.assign(
        constructFormObject(registrationForm),
        { ID: -1 }
    );
    fetch(baseUrl + 'user/create', constructPostObject(registerObject))
        .then(res => res.json()).then(res => {
            if (res.error) {
                addErrorMessage(res.error);
                return;
            }
            Object.entries(res).forEach( ([key, val]) => registerObject[key] = val);
            saveUserObject(registerObject);
            window.location.href = redirectUrl;
        });
})

signupButton.addEventListener('click', function(e) {
    // loginForm.classList.toggle('login--hidden');
    // registrationForm.classList.toggle('register--visible');
    e.preventDefault();
    [loginForm, registrationForm].forEach(item => item.classList.toggle('display--none'))
})

let itemListExists = false;
try {
    if (itemList) itemListExists = true;
} catch(e) {
    itemListExists = false;
    console.log('itemList does not exist');
}
if (itemListExists) {
    itemList.forEach(file => {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState === req.DONE && req.status <= 300) {
                console.log('[SUCCESS :: GOT FILE]', file);
            }
        }
        req.open('GET', file, true);
        req.send();
    });
}