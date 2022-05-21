async function load(){
	Errormodal.show() 
	}
	function dispose(){
	  console.log("hello")
	  Errormodal .hide();
	}
	function loader(){
	  modal.show()
  }
  function disposer(){
	  modal.hide();
  }
  function success(){
	var image=document.getElementById("myimg");
	var q1=document.getElementById("report");
	  image.src="photos/sucess.gif";
	  image.style.width="15em"
	  image.style.height="15em"

	  var q=document.getElementById("qote");
	  q1.innerHTML="";
	  q.style.display="block"
	  q.style.color="rgb(44, 174, 44)"
	  q.innerHTML="Success"
  }
  function error(text){
	var image=document.getElementById("myimg");
	  image.src="photos/Error.gif";
	  image.style.width="20em"
	  image.style.height="15em"

	  var q=document.getElementById("qote");
	  q.style.display="block"
	  q.style.color="rgb(239, 44, 60)"

	  q.innerHTML="Failed"
	  var q1=document.getElementById("report");
	  q1.innerHTML="Report: "+text
	  q1.style.fontSize="20px"
  }
  function loadpage(){
	var q=document.getElementById("qote").innerHTML;
	if(q=="Success")
	window.location.reload()
  }
  function addpaper(){
	  var questionpapername=document.getElementById("Question_Paper_Name").value;
	  if(questionpapername.length>0 ){
		  var database=firebase.database();
		  database.ref().child("question_paper").child(questionpapername).get().then((snapshot)=>{
			  if(snapshot.exists()){
				  console.log(snapshot.val())
				  error("already exists");
				  load();
			  }
			  else{
				  database.ref().child("question_paper").child(questionpapername).set({
                      "questions":questions
				  },(error)=>{
					if(error){
					  console.log(error)
					  error("Failed to write in database")
					  load();
					  disposer();
					}
					else{ 
						success();
						load();
						disposer();
					} 
				  })
			  }
		  })
	  }
	  else{
		  error("Fill all the Fields");
		  load();
	  }
  }