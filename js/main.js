$(document).ready(function(){
    $('.header').height($(window).height());

 $(".navbar a").click(function(){
    $("body,html").animate({
 	    scrollTop:$("#" + $(this).data('value')).offset().top-100
 	},1500)
  
 })

})

//horizontal tabs
function openStory(evt, storyName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
    document.getElementById(storyName).style.display = "block";
    evt.currentTarget.className += " active";
}

//document.querySelector(".replace-image").addEventListener( "click", function(e) {
$('.replace-image').click(function (e) {
    let thisId=this.parentElement.getAttribute("id");
    let fullQuery=document.getElementById(thisId).querySelector(".replace-words");
    console.log(fullQuery);
    if (e.target && e.target.getAttribute("changed")=="false"){
        var str = fullQuery.innerHTML;
        var regexOb = new RegExp('\\b'+e.target.alt+'(|s)'+'\\b',"gi"); 
        var res = str.replace(regexOb, '<img class="replaced" alt="'+e.target.alt+'" src="images/replace/'+e.target.alt+'.png">');
        fullQuery.innerHTML = res;
        e.target.setAttribute("changed", "true");
        e.target.setAttribute("src", "images/replace/"+e.target.alt+".png");
    }
    else {
        e.target.setAttribute("src", "images/replace/"+e.target.alt+"-bw.png");
        e.target.setAttribute("changed", "false");
        var str =fullQuery.innerHTML;
        var path='<img class="replaced" alt="'+e.target.alt+'" src="images/replace/'+e.target.alt+'.png">';
        var regexOb = new RegExp(path,"gi"); 
        var res = str.replace(regexOb, e.target.alt);
       fullQuery.innerHTML = res;
    }
});

//#3 match the shadow game
var dragged; 
var itemId;
var success=document.querySelector("#success");

function onDragOver(event) {
  event.preventDefault();
}

function onDragLeave(event) {
    event.target.style.opacity = '';
}

function onDragEnter(event) {
    const target = event.target;
    if (target && dragged) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move'
        target.style.opacity = '0.2';
    }
}

var count = 0;
function onDrop(event) {
    const target = event.target;
    console.log(target);
    console.log(dragged);
    if (target && dragged) {
        target.style.opacity = '';
        event.preventDefault();
        // Get the id of the target and add the moved element to the target's DOM
        dragged.parentNode.removeChild(dragged);
        dragged.style.opacity = '';
        target.appendChild(dragged);
        dragged.style.pointerEvents="none";
        count++;
    }
    success.textContent= dragged.getAttribute("fruit");
    if (count==7){
    setTimeout(function(){ success.textContent="Horray!" }, 1500);
    }
}

function test(a){
    const dropZone = a;
    dropZone.addEventListener('drop', onDrop);
    dropZone.addEventListener('dragenter', onDragEnter);
    dropZone.addEventListener('dragleave', onDragLeave);
    dropZone.addEventListener('dragover', onDragOver);
    }

function onDragStart(event) {
    let target = event.target;
    if (target && target.nodeName === 'DIV') {
        dragged = target;
        event.dataTransfer.setData('text', target.id);
        event.dataTransfer.dropEffect = 'move';
        event.target.style.opacity = .3;
    }
    test(document.querySelector("."+target.id));
}



function onDragEnd(event) {
    if (event.target && event.target.nodeName === 'DIV'){
        event.target.style.opacity = ''; 
        dragged = null; 
    }
}

const items = document.querySelector('.items');

// Adding event listeners
items.addEventListener('dragstart', onDragStart);
items.addEventListener('dragend', onDragEnd);

//#2 traffic lights game
window.onload = function start() {
    slide();
}
function slide() {
    let num = 0, style = document.querySelector(".traffic-light");
    window.setInterval(function () {
    num = (num + 1) % 3;
    console.log(num);
    style.setAttribute("traffic", num);
    style.style.backgroundPosition = (60 * num) + "px"; 
    }, 5000); 
}
let theThing = document.querySelector("#thing");
let container = document.querySelector("#contentContainer");
theThing.addEventListener("click", function(event) {
    if (document.querySelector("[traffic]").getAttribute("traffic")=="0"){
        theThing.classList.add("transition");
	    theThing.style.left = "350px";
	    theThing.style.top = "300px";
        theThing.style.width = "170px";
	    theThing.style.height = "90px";
        var auto_refresh = setInterval(
            function () {
                if (document.querySelector("[traffic]").getAttribute("traffic")=="1") {
                    $("#thing").removeClass("transition").css({"left":"0px", "top":"0px", "width":"90px", "height":"50px"});
                }
            }, 0);
    }
    else if(document.querySelector("[traffic]").getAttribute("traffic")=="1"){
        on("yellow");
    }
    else {
        on("red"); 
    }
});

//overlay
function on(color) {
    console.log(color);
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").className=color;
}

function off() {
    document.getElementById("overlay").style.display = "none";
}
