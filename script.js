let cm = new CodeMirror.fromTextArea(document.getElementById("code-input"), {
  lineNumbers: true,
  lineWrapping: true,
  styleActiveLine: { nonEmpty: true },
  mode: "javascript",
  theme: "darcula"
});

document.getElementsByClassName("CodeMirror")[0].style.fontSize = "14px";
function changeFontSize(n) {
  let size = parseInt(document.getElementsByClassName("CodeMirror")[0].style.fontSize, 10);
  document.getElementsByClassName("CodeMirror")[0].style.fontSize = (size + n).toString() + "px";
  cm.refresh();
}
document.getElementById("console-content").style.fontSize = "14px";
function changeConsFontSize(n) {
  let size = parseInt(document.getElementById("console-content").style.fontSize, 10);
  document.getElementById("console-content").style.fontSize = (size + n).toString() + "px";
  cm.refresh();
}

cm.refresh();

function waitingKeypress() {
	return new Promise((resolve) => {
  	document.addEventListener('keydown', onKeyHandler);
    console.log(document.hasOwnProperty('keydown'));
  	function onKeyHandler(e) {
  		if (e.keyCode === 13) {
        keyPressed = 1;
    	}
  	}
  });
}

function c_out(out) {
  let con = document.getElementById("console-content").innerHTML;
  document.getElementById("console-content").innerHTML = con + out;
}

function c_in(msg) {
  c_out(msg);
  let con = document.getElementById("console-content").innerHTML;
  document.getElementById("console-content").innerHTML = con + '<span class="c-input" id="c_in_spanelem" role="textbox" contenteditable></span>';

  document.getElementById("c_in_spanelem").innerHTML.includes("<br>")

  return(checkFlag());
  let spanelem = document.getElementById("c_in_spanelem");
  let response = spanelem.innerHTML;
  spanelem.parentNode.removeChild(spanelem);
  return(response);
}

function runCode() {
  eval(cm.getValue());
}

function clearConsole() {
  document.getElementById("console-content").innerHTML = ""
}


function siteTheme() {
  if (document.getElementById("theme-icon").getAttribute("th") == "dark") {
    document.body.classList.add("light-mode");
    document.getElementById("theme-icon").innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    document.getElementById("theme-icon").setAttribute("th", "light");
    cm.setOption("theme", "neat");
  } else if (document.getElementById("theme-icon").getAttribute('th') == "light"){
    document.body.classList.remove("light-mode");
    document.getElementById("theme-icon").innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    document.getElementById("theme-icon").setAttribute("th", "dark");
    cm.setOption("theme", "darcula");
  }
}




function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user=getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}
