const groupId = localStorage.getItem('groupId')
const token = localStorage.getItem('token');
const socket = io("http://localhost:3000", {
    auth: {
        token: token,
        groupId: groupId
    }
});
socket.on("connecteduser", (data) => {

    document.getElementById('connecteduser').innerHTML += `<li>${data}</li>`;

})

function message(e) {
    e.preventDefault();

    const msg = e.target.msg.value;


    socket.emit("msg", msg);
}

socket.on("msg", (msg) => {

    showMsgOnScreen(msg);
})


// function message(e) {
//     e.preventDefault();
//     const msgDetails = {
//         msg: e.target.msg.value
//     };
//     const token = localStorage.getItem('token');
//     const groupid = localStorage.getItem('groupId');

//     axios.post('http://localhost:3000/message/send-msg', msgDetails, { headers: { Authorization: token, groupid: groupid } })
//         .then(result => {

//             showMsgOnScreen(result.data);
//         })
//         .catch(err => {
//             document.body.innerHTML += `<div style="color:red">${err}</div>`
//         })
// }

function showMsgOnScreen(obj) {
    document.getElementById('msg1').innerHTML += `<li>${obj.name}--${obj.message1.message}</li>`
}

window.addEventListener('DOMContentLoaded', () => {
    const groupid = localStorage.getItem('groupId');

    axios.get(`http://localhost:3000/message/get-message/${groupid}`)
        .then(result => {

            for (let i = 0; i < result.data.allmsg.length; i++) {
                showAllMsgOnScreen(result.data.allmsg[i]);
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
})

function showAllMsgOnScreen(obj) {
    document.getElementById('msg1').innerHTML += `<li>${obj.user.name}--${obj.message}</li>`
}