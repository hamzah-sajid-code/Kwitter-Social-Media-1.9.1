namee = localStorage.getItem('User name');
var ppN = document.getElementById('pp').value;
console.log(ppN)
document.getElementById('name').innerHTML = namee;

function logout() {
      localStorage.removeItem('User name')
      localStorage.setItem("status", 'NotLoggedIn');
      window.location = 'index.html';
}

function addRoom() {
      var ppN = document.getElementById('pp').value;
      console.log(ppN)
      if (ppN == 'public') {
            romnum = 1;
            roomname = document.getElementById('id_room').value;
            localStorage.setItem('roomname', roomname);
            firebase.database().ref('/chat').child(roomname).update({
                  'Room Name': roomname
            });
      } else if (ppN == 'private') {

            pus = document.getElementById('pusa').value;
            if (pus == '') {
                  alert('Put a password')
                  console.log('Put pass')
            } else {
                  console.log('This is private room')
                  roomname = document.getElementById('id_room').value;
                  usernumm = localStorage.getItem('User name')
                  localStorage.setItem(roomname, roomname);
                  firebase.database().ref('/pass').child(roomname).update({
                        'Room Name': roomname
                  });
                  console.log('This is private room')
                  roomname = document.getElementById('id_room').value;

                  usernumm = localStorage.getItem('User name')
                  localStorage.setItem(roomname, roomname);
                  firebase.database().ref('/pus').child(roomname).update({
                        'Password': pus
                  });
                  console.log('ok')

            }

      }
      document.getElementById('pusa').value = "";
      document.getElementById('id_room').value = "";
}

function getData() {
      firebase.database().ref("/chat").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names)
                  roomnamewithhash = "#" + Room_names;
                  outputthing = "<div id=" + Room_names.split(' ').join('_') + " onclick='redirectToRoomname(this.id)'>" + roomnamewithhash + "</div><hr>"
                  document.getElementById('output').innerHTML += outputthing;

                  //End code
            });
      });
      firebase.database().ref("/pass").on('value', function (snapshot) {
            document.getElementById("out2").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code

                  console.log(Room_names)
                  roomnamewithhash1 = "#" + Room_names;
                  outputthing1 = "<div id=" + Room_names.split(' ').join('_') + " onclick='redirectToRoomnamepass(this.id)'>" + roomnamewithhash1 + "</div><hr>"
                  document.getElementById('out2').innerHTML += outputthing1;

                  //End code
            });
      });
}

function redirectToRoomname(room_name_functio) {
      room_name_functio.split('_').join(' ')
      localStorage.setItem('whichredirect', room_name_functio)
      window.location = 'kwitter_page.html';
}

function redirectToRoomnamepass(room_name_functio) {
      room_name_functio = room_name_functio.split("_").join(" ")
      console.log(room_name_functio)
      poss = prompt("What's the room password:");
      firebase.database().ref("/pus/" + room_name_functio).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(message_data)
                        if (poss == message_data) {
                              localStorage.setItem('whichredirect', room_name_functio)
                              console.log('Yes')
                              window.location = 'kwitter_page.html';
                        } else {
                              alert('Wrong password')
                              window.location = 'kwitter_room.html';
                        }
                  }
            });
      });
}
getData();
document.getElementById('pp').addEventListener('change', run)

function run() {
      fn = document.getElementById('pp').value;
      console.log(fn)
      if (fn == 'public') {
            document.getElementById('pusa').style.display = 'none'
      } else if (fn == 'private') {
            document.getElementById('pusa').style.display = 'inline-block'
      }
}