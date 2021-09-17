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
 var user_name = localStorage.getItem("user_name");
 var room_name = localStorage.getItem("Room_name");

function updateLike(message_id){
    console.log("clicked on like button -"+ message_id);
    var button_id = message_id;
    var likes = document.getElementById(button_id).value;
    var updated_likes = Number(likes) + 1;
    console.log (updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}
  
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function send() {
    msg= document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) {
     document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) {
          childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
               firebase_message_id = childKey;
                message_data = childData; 
                //start code
                console.log(firebase_message_id);
                console.log(message_data);
                var name = message_data['name'];
                var message = message_data['message'];
                var like = message_data['like'];
                var name_with_tag = "<h4>"+ name +"<img class='user_tick' src='tick.png'></h4>";
                var message_with_tag = "<h4 class='message_h4'> "+ message +"</h4>"
                var like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+ like +" onclick='updateLike(this.id)'>";
                var span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+ like + "</span> </button><hr>"

                var row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //end code
               
            
            } }); }); }
                getData();