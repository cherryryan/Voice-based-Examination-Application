var data;
function fetchdata(){
      data=new Array();
      loader();
      var database=firebase.database();
      database.ref().child("department").get().then((snapshot)=>{
        if(snapshot.exists()){
            snapshot.forEach((childsnapshot)=>{
              let c={"year":childsnapshot.child("year").val(),"department":childsnapshot.child("departmentname").val(),"sections":childsnapshot.child("sections").val()}
              data.push(c)
            })
            data.sort(compare)
            console.log(data)
            adddepartment();
            disposer()
        }
        else{
          disposer()
          error("data not there");
          load();
        }
      })

}
function adddepartment(){
  cleardepartment();
   var n=data.length;
   var i;
   var department=document.getElementById("Student_department_name");
   var d=new Array();
   for(i=0;i<n;i++){
      d.push(data[i].department);
   }
   var uniq=[...new Set(d)]
   n=uniq.length;
   for(i=0;i<n;i++){
      department.add(new Option(uniq[i],uniq[i]))
   }
}
function ondepartmentselected(){
       clearyear()
       clearsection()
       var selectobject=document.getElementById("Student_Year");
       var n=data.length;
       var value=document.getElementById("Student_department_name").value;
       for(i=0;i<n;i++){
         if(data[i].department.localeCompare(value)==0){
            selectobject.add(new Option(data[i].year,data[i].year))
         }
       }
}
function onyearselected(){
    clearsection();
    var selectobject = document.getElementById("Student_Section")
    var value=document.getElementById("Student_Year").value
    var value2=document.getElementById("Student_department_name").value;
    var i;
    var value3=0;
    var n=data.length;
    for(i=0;i<n;i++){
      if(data[i].department.localeCompare(value2)==0 && data[i].year.localeCompare(value)==0){
        value3=data[i].sections
      }
    }
    value3=parseInt(value3)
    for(i=0;i<value3;i++){
      selectobject.add(new Option(i+1,i+1))
    }


}
function clearyear(){
  var selectobject = document.getElementById("Student_Year");
  var length=selectobject.length;
  if(selectobject.length>1)
  for (var i=1; i<=length; i++) {
       selectobject.remove(1)
  }
  selectobject.selectedIndex=0;
}
function cleardepartment(){
  var selectobject = document.getElementById("Student_department_name");
  var length=selectobject.length;
  if(selectobject.length>1)
  for (var i=1; i<=length; i++) {
       selectobject.remove(1)
  }
  selectobject.selectedIndex=0;
}
function clearsection(){
  var selectobject = document.getElementById("Student_Section");
  console.log(selectobject.length)
  var length=selectobject.length;
  if(selectobject.length>1)
  for (var i=1; i<=length; i++) {
       selectobject.remove(1)
  }
  console.log(selectobject.length)
  selectobject.selectedIndex=0;
}


function compare(a,b){
      if(a.department!=b.department){
        return a.department.localeCompare(b.department);
      }
      return a.year.localeCompare(b.year);

}
function student(){
  var name=document.getElementById("Student_name");
  var registerno=document.getElementById("Student_register_no");
  var department=document.getElementById("Student_department_name");
  var year=document.getElementById("Student_Year");
  var section=document.getElementById("Student_Section");
  var phno=document.getElementById("Student_phno");
  var email=document.getElementById("Student_email");
  var yes=document.getElementsByName("yes");
  var no=document.getElementsByName("no")


}
function department(){
	var departmentname=document.getElementById("Register_department_name").value;
	var year=document.getElementById("Register_year").value;
	var sections=document.getElementById("Register_no_of_sections").value;
	var head=document.getElementById("Register_head_of_department").value;
	var email=document.getElementById("Register_email").value;
  
  if(departmentname.length>0 && year.length>0 && year.length<2 && sections.length>0 && head.length>0 && email.length>0){ 
    loader();
	var database=firebase.database();
  database.ref().child("department").child(departmentname+year.toString()).get().then((snapshot)=>{
    if(snapshot.exists()){
      error("Already department " + departmentname+" exists");
      disposer();
      load();
     
    }
    else{
     database.ref().child("department").child(departmentname+year.toString()).set({
        "departmentname": departmentname,
        "year":year,
        "sections":sections,
        "head":head,
        "email":email
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
  error("Fill all the fields")
  load()
}
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