function signup(e) {
    e.preventDefault();
    const signupDetails = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
    }

    axios.post('http://localhost:3000/user/signup', signupDetails)
        .then(result => {
            alert('signup successfull');
            window.location.href = '../login/login.html'
        })
        .catch(err => {
            alert('signup failed');
        })
}