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
  function loadpage(){
	var q=document.getElementById("qote").innerHTML;
	if(q=="Success")
	window.location.reload()
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
var upload=document.getElementById("paper_upload");
upload.addEventListener("click",()=>{
    upload.value=""; 
})
var excelvalues;
upload.addEventListener("change",()=>{
readXlsxFile(upload.files[0]).then((data1)=>{
console.log(data1);
  excelvalues=data1;
    })
})
function validate(){
	var n=excelvalues.length;
	var i;
	console.log(n)
	var a=new Array();
	for(i=1;i<n;i++){
		if(excelvalues[i][0]!=null && excelvalues[i][0].length==1 && excelvalues[i][1]!=null && excelvalues[i][1].length>0 && ((excelvalues[i][2]!=null && excelvalues[i][0].toUpperCase()==
		'M' && excelvalues[i][2].length>0) ||(excelvalues[i][0].toUpperCase()=='S' && excelvalues[i][2]!=null && excelvalues[i][2].length>0)||(excelvalues[i][0].toUpperCase()=='B' && excelvalues[i][2]==null))
		&& excelvalues[i][3]!=null &&  excelvalues[i][3].length>0){
			a.push({"questiontype":excelvalues[i][0],"question":excelvalues[i][1],"options":excelvalues[i][2],"answer":excelvalues[i][3]})
		}
		else{
		error("Error occured at Line no "+(i+1).toString())
		load();
		return null;
		}
		
	}
	return a;
}
async function update(){
	var questionpapername=document.getElementById("Question_Paper_Name").value;
	var returnval=validate();
	console.log(returnval);
	loader()
	if(returnval!=null){
		if(questionpapername.length>0){
			var database=firebase.database();
			await database.ref().child("question_paper").child(questionpapername).get().then((snapshot)=>{
				if(snapshot.exists()){
					console.log(snapshot.val())
					error("already exists");
					load();
				}
				else{
					database.ref().child("question_paper").child(questionpapername).set({
						"questions":returnval
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
			error("Enter Question paper name");
			load();
		}

	}
	disposer();
	
}