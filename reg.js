function login() {
    window.location = 'index.html';
}
var username;
var email;
var password;
var allAccountNames = [];
var allAccountEmails = [];
firebase.database().ref("/Accounts").on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
            firebase_message_id = childKey;
            message_data = childData;
            //Start code
            console.log(message_data)
            console.log(message_data['name'])
            allAccountNames.push(message_data['name']);
            allAccountEmails.push(message_data['email'])
            console.log(allAccountNames)
            console.log(allAccountEmails)

            //End code
        }

    });
});

function addUser() {
    console.log('Yes')
    username = document.getElementById('name').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    for (i = 0; i < allAccountNames.length; i++) {
        for (j = 0; j < allAccountEmails.length; j++) {
            console.log(allAccountEmails[j]);
            console.log(allAccountNames[i]);
            console.log('Code started');
            console.log('Cheaking...')
            if (username != message_data['name'] && email != message_data['email']) {
                localStorage.setItem('User name', username);
                firebase.database().ref('Accounts').child('/').push({
                    name: username,
                    email: email,
                    password: password,
                    type: 'Normal'
                });
                window.location = 'index.html';
            } else if (username == allAccountNames[i]) {
                console.log('name')
                document.getElementById('nameuuid').innerHTML = 'Put Another Username Name';

            } else if (email == allAccountEmails[j]) {
                // alert('Put another email')
                document.getElementById('emailuuid').innerHTML = 'Put Another Email';
            }

        }
    }
    console.log(allAccountNames)


}
// firebase.database().ref('Accounts').child('/').push({
//     name: 'Hamzah Sajid',
//     email: 'hamzahsajid2015@gmail.com',
//     password: 'Google@1234',
//     type: 'God'
// });