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
  var name=document.getElementById("Student_name").value;
  var registerno=document.getElementById("Student_register_no").value;
  var department=document.getElementById("Student_department_name");
  var year=document.getElementById("Student_Year");
  var section=document.getElementById("Student_Section");
  var phno=document.getElementById("Student_phno").value;
  var email=document.getElementById("Student_email").value;
  var blind=document.getElementsByName("isblind")
  if(name.length>0 && registerno.length>0 && department.value.localeCompare("Department_Name")!=0 && year.value.localeCompare("Year")!=0 && section.value.localeCompare("Section")!=0 && phno.length>0 && email.length>0){
        var database=firebase.database();
        loader();
        database.ref().child("students").child(registerno.toUpperCase()).get().then((snapshot)=>{
          if(snapshot.exists()){
            disposer()
            error("already student exists");
            load()
          }
          else{
             database.ref().child("students").child(registerno.toUpperCase()).set({
               "name":name,
               "registerno":registerno,
               "department":department.value.toString(),
               "year":year.value.toString(),
               "section":section.value.toString(),
               "phno":phno,
               "email":email,
               "blind":blind[0].checked
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
    error("fill all the fields")
    load();
  }


}
var upload=document.getElementById("Student_upload");
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
function checkexists(departmentname,year,section){
      var n1=data.length;
      var i;
      for(i=0;i<n1;i++){
          if(data[i].year==year && data[i].sections>=section && section>=1 && data[i].department==departmentname)
          return true;
      }
      return false;
}
function verifyxml2(){
     var n=excelvalues.length;
     var i,j;
     if(verifyxml(excelvalues)==true){
     for(i=1;i<n;i++){
        if(checkexists(excelvalues[i][2],excelvalues[i][3],excelvalues[i][4])==true)
        continue;
        else
        break;
     }
     
     if(i!=n){
       error("data contain invalid department/year/section")
       load();
       return false;
     }
     return true;
    }
    else{
      error("fill all the fields");
      load();
      return false;
    }
}
function verifyxml(data){
      flag=true;
      data.forEach((subdata)=>{
        subdata.forEach((subdata2)=>{
          if(subdata2==null) 
          flag=false;
        })
      })
      return flag
}
var excelflag=false;
var values="";
async function userexists(){
    excelflag=false;
    var database=firebase.database();
    var n=excelvalues.length;
    var i=0;
    for(i=1;i<n;i++){
    console.log(excelvalues[i][1]+"hello")
   await database.ref().child("students").child(excelvalues[i][1].toUpperCase()).get().then((snapshot)=>{
      console.log(snapshot.val())
      if(snapshot.val()!=null){
      excelflag=true;
      values+=excelvalues[i][1]+","
      }
      if(excelflag==false && i==n-1){
        console.log("file")
      }
    })
  }
 
}
async function uploadstudentdetails(){
  if(verifyxml2()==true){
  loader()
   await userexists();
   disposer()
    if(excelflag==true){
      error("user already exists"+values);
      load()
    }
    else{
      var n=excelvalues.length;
      var i=0;
      var database=firebase.database();
      loader();
      for(i=1;i<n;i++){
        await database.ref().child("students").child(excelvalues[i][1].toUpperCase()).set({
          "name":excelvalues[i][0],
          "registerno":excelvalues[i][1],
          "department":excelvalues[i][2],
          "year":excelvalues[i][3],
          "section":excelvalues[i][4],
          "phno":excelvalues[i][5],
          "email":excelvalues[i][6],
          "blind":excelvalues[i][7]
        })
      }
      disposer()
      success();
      load();
    }
  }
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
  var data2;
function dropfetchdata(){
      data2=new Array();
      loader();
      var database=firebase.database();
      database.ref().child("department").get().then((snapshot)=>{
        if(snapshot.exists()){
            snapshot.forEach((childsnapshot)=>{
              let c={"year":childsnapshot.child("year").val(),"department":childsnapshot.child("departmentname").val(),"sections":childsnapshot.child("sections").val()}
              data2.push(c)
            })
            data2.sort(compare)
            console.log(data2)
            adddropdepartment();
            disposer()
        }
        else{
          disposer()
          error("data not there");
          load();
        }
      })

}
  function adddropdepartment(){
    dropcleardepartment();
     var n=data2.length;
     var i;
     var department=document.getElementById("Drop_department_name");
     var d=new Array();
     for(i=0;i<n;i++){
        d.push(data2[i].department);
     }
     var uniq=[...new Set(d)]
     n=uniq.length;
     for(i=0;i<n;i++){
        department.add(new Option(uniq[i],uniq[i]))
     }
  }
  function ondropdepartmentselected(){
         dropclearyear()
         var selectobject=document.getElementById("Drop_Year");
         var n=data2.length;
         var value=document.getElementById("Drop_department_name").value;
         for(i=0;i<n;i++){
           if(data2[i].department.localeCompare(value)==0){
              selectobject.add(new Option(data2[i].year,data2[i].year))
           }
         }
  }
  function dropclearyear(){
    var selectobject = document.getElementById("Drop_Year");
    var length=selectobject.length;
    if(selectobject.length>1)
    for (var i=1; i<=length; i++) {
         selectobject.remove(1)
    }
    selectobject.selectedIndex=0;
  }
  function dropcleardepartment(){
    var selectobject = document.getElementById("Drop_department_name");
    var length=selectobject.length;
    if(selectobject.length>1)
    for (var i=1; i<=length; i++) {
         selectobject.remove(1)
    }
    selectobject.selectedIndex=0;
  }
  async function dropdata(){
    var value=document.getElementById("Drop_Year").value
    var value2=document.getElementById("Drop_department_name").value;
    var registerno=document.getElementById("Drop_registration_number").value;
    var database=firebase.database();
    if(value.localeCompare("Year")!=0 && value2.localeCompare("Department_name")!=0){
        database.ref().child("department").child(value2+value).set(null);
    }
    else if(value2.localeCompare("Department_name")!=0){
        var n=data2.length;
        var i=0;
        for(i=0;i<n;i++){
          if(data2[i].department.localeCompare(value2)==0){
            await database.ref().child('department').child(data2[i].department+data2[i].year).set(null);
          }
        }
    }
    else if(registerno.length>0){
        database.ref().child('students').child(registerno.toUpperCase()).set(null);
    }
    else{
        error("read the Note Points");
        load();
        return ;
    }
    success();
    load();
  }