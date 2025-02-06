
function login(e) {
    e.preventDefault();
    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }


    axios.post('http://localhost:3000/user/login', loginDetails)
        .then(result => {

            localStorage.setItem('token', result.data.token);
            alert('login successfull');
            window.location.href = '../group/group.html'

        })
        .catch(err => {
            alert('login failed');
        })
}