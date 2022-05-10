function department(){
	var departmentname=document.getElementById("Register_department_name").value;
	var year=document.getElementById("Register_year").value;
	var sections=document.getElementById("Register_no_of_sections").value;
	var head=document.getElementById("Register_head_of_department").value;
	var email=document.getElementById("Register_email").value;

}


function success(){
        var image=document.getElementById("myimg");
          image.src="photos/sucess.gif";
          image.style.width="15em"
          image.style.height="15em"

          var q=document.getElementById("qote");
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
     
      function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
       
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