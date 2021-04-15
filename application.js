if ('serviceWorker' in navigator)
	{
	  navigator.serviceWorker
	    .register('/swapplication.js', { scope: '/' })
	    .then(function(reg) {
	      // suivre l'état de l'enregistrement du Service Worker : `installing`, `waiting`, `active`
				if(reg.installing)
					{
	      		console.log('Service worker copilotrace en installation');
	    		}
				else if(reg.waiting)
					{
	      		console.log('Service worker copilotrace installé');
	    		}
				else if(reg.active)
					{
	      		console.log('Service worker copilotrace activé');
	    		}
	    }).catch(function(error)
				{
	    		// registration failed
	    		console.log('Service worker copilotrace non installé, erreur ' + error);
	  		});
	}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

function ajouter(d) {
	var r = document.querySelector("#ecran").innerHTML.trim();
	if(r == "0"){
		r = "";
	}
	r = r.replaceAll("x","*");
	console.log(r)
	switch(d){
		case "C":
			r = "0";
			break;
		case "=":
			try {
				r = eval(r);
			} catch(e) {
				r = "ERROR";
			}
			break;
		case "X":
			r = r + "x";
			break;
		case "+/-":
			if(r[0] == "-" && r[1] == "(" && r[r.length - 1] == ")"){
				r = r.substring(2,r.length - 1);
			}
			else {
				r = "-(" + r + ")";
			}
			break;
		default:
			r = r + d;
			break;
	}
	if(typeof r != "number"){
		r = r.replaceAll("*","x");
	}
	document.querySelector("#ecran").innerHTML = r;
}