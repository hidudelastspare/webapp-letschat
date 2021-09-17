var firebaseConfig = {
      apiKey: "AIzaSyAZDQW4EwOtKrK_7GUxWauQrxLjahkde60",
      authDomain: "kwitter-c5a2f.firebaseapp.com",
      databaseURL: "https://kwitter-c5a2f-default-rtdb.firebaseio.com",
      projectId: "kwitter-c5a2f",
      storageBucket: "kwitter-c5a2f.appspot.com",
      messagingSenderId: "87234115472",
      appId: "1:87234115472:web:bd87860dea98a22d766515"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html"
}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
             snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("room Name-"+ Room_names);
                  row = "<div class='room_name' id="+ Room_names +" onclick='redirectToRoomName(this.id)' >#"+Room_names +"</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
function sendData(){
      var roomname = document.getElementById("room_name_input").value;
    firebase.database().ref("/").child(roomname).update({
    purpose:"roomname" 
    });
    localStorage.setItem("Room_name",roomname);
    window.location = "kwitter_page.html";
}
getData();
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
