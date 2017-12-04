
$(".header").click(function(){
	var prefix = $(this).parent().attr('class');
    var list = document.getElementById(prefix+"-matrix")
    if(list.style.display == "none"){
       list.style.display = "inline-block";
    } else {
       list.style.display = "none"
    }
	//console.log(prefix.value); 
})

