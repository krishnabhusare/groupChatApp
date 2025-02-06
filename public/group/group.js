function group(e) {
    e.preventDefault();
    const groupDetails = {
        groupname: e.target.groupname.value
    };
    const token = localStorage.getItem('token');


    axios.post('http://localhost:3000/group/create-group', groupDetails, { headers: { Authorization: token } })
        .then(result => {
            showGroupsOnScreen(result.data.group);
            alert('group created');
        })
        .catch(err => {
            alert('failed create group')
        })
}



window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/group/get-groups', { headers: { Authorization: token } })
        .then(result => {

            for (let i = 0; i < result.data.groups.length; i++) {

                showGroupsOnScreen(result.data.groups[i])
            }

        })
        .catch(err => {
            alert('failed');
        })
})

function showGroupsOnScreen(obj) {
    document.getElementById('groups').innerHTML += `<li id="group-${obj.id}"><button style="color:green" onclick="goTOGroup(${obj.id})">
    ${obj.groupname} </button><button onclick="getUsers(${obj.id})">add users</button>
    <button onclick="getUsersFromGroup(${obj.id})">remove users</button>
   </li>`
}

function goTOGroup(groupid) {
    localStorage.setItem('groupId', groupid);
    window.location.href = '../message/message.html';
}


function getUsersFromGroup(groupid) {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/group/get-remove-users/${groupid}`, { headers: { Authorization: token } })
        .then(result => {
            for (let i = 0; i < result.data.usersInGroup.length; i++) {
                showUsersInGroupOnScreen(result.data.usersInGroup[i], groupid);
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showUsersInGroupOnScreen(obj, groupid) {
    document.getElementById('users').innerHTML += `<li id=${obj.id}> ${obj.name}<button onclick="removeUser(${obj.id},${groupid})">remove</button></li>`
}

function removeUser(userid, groupid) {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:3000/group/remove-user/${userid}/${groupid}`, { headers: { Authorization: token } })
        .then(result => {
            alert('removed');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })

}



function getUsers(groupid) {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/group/get-user/${groupid}`, { headers: { Authorization: token } })
        .then(result => {
            for (let i = 0; i < result.data.users.length; i++) {
                showUsersOnScreen(result.data.users[i], groupid);
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

function showUsersOnScreen(obj, groupid) {
    document.getElementById('users').innerHTML += `<li id="${obj.id}">
    ${obj.name}<button onclick="addUsers(${obj.id},${groupid})">add</button>
    </li>`
}

function addUsers(userid, groupid) {
    axios.post(`http://localhost:3000/group/add-user/${userid}/${groupid}`)
        .then(result => {
            alert('added');
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red">${err}</div>`
        })
}

