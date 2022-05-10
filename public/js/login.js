
function login(){
	load();
	var database=firebase.database();
	const dbRef = database.ref();
dbRef.child("Login").get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
	var username=document.getElementById("username").value;
	var password=document.getElementById("password").value;
	if(username==snapshot.val().name && password==snapshot.val().password) {
		dispose()
		window.location.href="Registration.html"

	}
	else{
		dispose()
		validate();
	}
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}
function validate(){
	var para=document.getElementById("validation");
	para.style.display="block";
}
	 
 function load(){
	modal.show()
}
function dispose(){
    modal.hide();
}