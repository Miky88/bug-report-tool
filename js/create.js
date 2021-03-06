/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement("div");
	temp.textContent = str;
	return temp.innerHTML;
};

$(document).ready(function () {
	$(".sidenav").sidenav();
	$(".modal").modal();
	$("select").formSelect();
	$("textarea#shortDesc, textarea#expected, textarea#actual, textarea#clientVers, textarea#systemVers").characterCounter();
	$(".dropdown-trigger").dropdown();

	localStorage.setItem("theme", "dark");
});

var callback = window.setInterval(myCallback, 200);

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
	var textNeedCount = document.querySelectorAll("#shortDesc");
	M.CharacterCounter.init(textNeedCount);
});

// Create a "close" button and append it to each list item
var steps = document.getElementsByClassName("collection-item");
var i;
for (i = 0; i < steps.length; i++) {
	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	steps[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
	close[i].onclick = function () {
		var div = this.parentElement;
		div.remove();
	};
}

// Create a new list item when clicking on the "Add" button
function newElement() {
	var li = document.createElement("li");
	li.setAttribute("class", "collection-item");
	li.setAttribute("style", "background-color: transparent; border:none");

	var inputValue = document.getElementById("str").value;
	var t = document.createTextNode(" - " + inputValue);
	li.appendChild(t);
	if (inputValue === "") {
		alert("Steps to Reproduce cannot be empty!");
	} else {
		document.getElementById("myUL").appendChild(li);
	}
	document.getElementById("str").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode(" \u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(span);

	for (i = 0; i < close.length; i++) {
		close[i].onclick = function () {
			var div = this.parentElement;
			div.remove();
		};
	}
}

function myCallback() {
	var x = document.getElementById("command");
	let missing = "Missing ";
	if (document.getElementById("shortDesc").value == "") missing += "Short-Description#";
	if (steps.length == 0) missing += "Steps-to-Reproduce#";
	if (document.getElementById("expected").value == "") missing += "Expected-Result#";
	if (document.getElementById("actual").value == "") missing += "Actual-Result#";
	if (document.getElementById("clientVers").value == "") missing += "Client-Version#";
	if (document.getElementById("systemVers").value == "") missing += "System-Settings#";

	missing = missing.split("#").join(", ");
	missing = missing.split("-").join(" ");
	missing = missing.substring(0, missing.length - 2);
	x.innerHTML = missing;

	document.getElementById("copy").disabled = true;

	if (x.innerHTML == "Missin") {
		document.getElementById("copy").disabled = false;
		x.innerHTML = "!submit ";

		// Title
		x.innerHTML += "-t ";
		x.innerHTML += sanitizeHTML(document.getElementById("shortDesc").value);

		// Reproduction steps (STR)
		x.innerHTML += " -r ";
		for (let i = 0; i < steps.length; i++) {
			var lis = document.getElementById("myUL").getElementsByTagName("li");
			if (i == 0) x.innerHTML += sanitizeHTML(lis[i].textContent.replace("×", "").replace("-", ""));
			else x.innerHTML += sanitizeHTML(lis[i].textContent.replace("×", "").replace("-", "-"));
		}

		// Expected Result
		x.innerHTML += " -e ";
		x.innerHTML += sanitizeHTML(document.getElementById("expected").value);

		// Actual Result
		x.innerHTML += " -a ";
		x.innerHTML += sanitizeHTML(document.getElementById("actual").value);

		// Client Settings (Discord Build)
		x.innerHTML += " -c ";
		x.innerHTML += sanitizeHTML(document.getElementById("clientVers").value);

		// System Settings
		x.innerHTML += " -s ";
		x.innerHTML += sanitizeHTML(document.getElementById("systemVers").value);
		// Remove extra whitespaces if they haven't been removed 
		x.innerHTML = x.innerHTML.replace(/\s+/g, ' ').trim();
	}
}

var x = window.matchMedia("(max-width: 686px)");
resize(x);
x.addListener(resize);

function resize(x) {
	if (x.matches) {
		var col = document.getElementsByClassName("input-field col s6");
		for (var i = 0; i < col.length; i++) {
			col[i].setAttribute("style", "width: 250px");
		}

		var helperText = document.getElementsByClassName("helper-text");
		for (var i = 0; i < helperText.length; i++) {
			helperText[i].setAttribute("style", "width: 200px; color: #9e9e9e");
		}
	}
}

function loadDarkTheme() {
	$("body").css("background-color", "#2c2f33");
	$("footer").css("color", "#959c97");
	$("label").css("color", "#959c97");
	$("span").css("color", "#959c97");
	$("li").css("color", "#959c97");
	$("h5").css("color", "#ffffff");
	$("input").css("color", "#ffffff");
	$("option").css("color", "#ffffff");
	$("p").css("color", "#ffffff");
	$("textarea").css("color", "#ffffff");

	$("#strongThemed1").css("color", "#959c97");
	$("#strongThemed2").css("color", "#959c97");

	$(".modal-content").css("background-color", "#2c2f33");
	$(".modal-footer").css("background-color", "#2c2f33");
	$(".footerText").css("color", "#ffffff");

	$("#command").css("color", "#959c97");

	$("#iconThemed0").css("color", "#ffffff");
	$("#iconThemed1").css("color", "#ffffff");
	$("#iconThemed2").css("color", "#ffffff");
	$("#iconThemed3").css("color", "#ffffff");
	$("#iconThemed4").css("color", "#ffffff");
	$("#iconThemed5").css("color", "#ffffff");

	$("#iconThemedWindows").css("color", "#ffffff");
	$("#iconThemedAndroid").css("color", "#ffffff");
	$("#iconThemediOS").css("color", "#ffffff");
	$("#iconThemedBrowswer").css("color", "#ffffff");
}

function loadWhiteTheme() {
	$("body").css("background-color", "#ffffff");
	$("footer").css("color", "#000000");
	$("label").css("color", "#000000");
	$("span").css("color", "#000000");
	$("li").css("color", "#000000");
	$("h5").css("color", "#000000");
	$("p").css("color", "#000000");
	$("textarea").css("color", "#000000");

	$("#strongThemed1").css("color", "#000000");
	$("#strongThemed2").css("color", "#000000");

	$(".modal-content").css("background-color", "#ffffff");
	$(".modal-footer").css("background-color", "#ffffff");
	$(".footerText").css("color", "#000000");

	$("#command").css("color", "#000000");

	$("#iconThemed0").css("color", "#000000");
	$("#iconThemed1").css("color", "#000000");
	$("#iconThemed2").css("color", "#000000");
	$("#iconThemed3").css("color", "#000000");
	$("#iconThemed4").css("color", "#000000");
	$("#iconThemed5").css("color", "#000000");

	$("#iconThemedWindows").css("color", "#000000");
	$("#iconThemedAndroid").css("color", "#000000");
	$("#iconThemediOS").css("color", "#000000");
	$("#iconThemedBrowswer").css("color", "#000000");
}
