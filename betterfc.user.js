// ==UserScript==
// @name         Better Forocoches
// @namespace    https://latinsud.com/
// @version      0.1
// @description  Pequenas mejoras a FC
// @author       LatinSuD
// @match        https://www.forocoches.com/*
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==


// helper function to run code in the target
function codeEval(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

// helper function to run function bodies in the target
function functionEval(source) {
  source = '(' + source + ')();'
  codeEval(source);
}



(function() {

   console.log("FC Better 2")




// INDICE
if (location.href=='https://www.forocoches.com/' || location.href=='https://www.forocoches.com/#') {
	// cambiar color
	$('TD[BGCOLOR="#fbfbfd"]').attr('bgcolor','#eee');


	// expandir titulos acortados por los puntos suspensivos
	var regex = new RegExp('\\.\\.\\.$');
	$('.cajasnews A.texto').filter(function () {
	    return regex.test($(this).text());
	}).each(function( index, value ) {
	  if (value.title) value.textContent = value.title;
	});

	// encontrar posts con 0 respuestas
	$('.cajasnews TD.texto').
	  filter(function () {
	    var regex2 = new RegExp('^0?$');
	    var resul= (
		( regex2.test($(this).text()) )
		&&
		(
		 $(this).closest('TR').find("A").filter(function () {
			return $(this).text()=='General';
		 }).length>0
		)
	    );
	    if (resul)
	      console.log($(this));
	    return resul;
	  }).
	  closest('TR').
          find("A").
	  each(function( index, value ) {
	     if (value) value.style.color='#7a0';
	});

	// Detectar ciertos nicks
	//  Si es mas de 10 se corta a 8 y se añaden 2 puntos
  // TODO: Esto debería ser editable de manera amigable
	regex = new RegExp('^(nickamigo1|nickamigo2)$');

	$('.cajasnews A').
	  filter(function () {
	    return regex.test($(this).text());
	  }).
	  closest('TR').
          find("A").
	  each(function( index, value ) {

	     if (value) value.style.color=GM_getValue('color_amigo','#f44');
	  });
}



/*
// QUITAR PUBLI.
{
	var targetNode = document.body;

	// Options for the observer (which mutations to observe)
	var config = { attributes: true, childList: true, subtree: true };

	// Callback function to execute when mutations are observed
	var callback = function(mutationsList) {

  $('.tg-adhesion-bar').css('display','none');
  $('#tg-adhesion').css('display','none');
  $('#opd_bottomstickyad').css('display','none');

	};

	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	observer.observe(targetNode, config);
  */
}

  
