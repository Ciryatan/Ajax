'use strict';

function ajax( options ) {
	
	options = {
		type: options.type || "POST",
		url: options.url || "",
		onComplete: options.onComplete || function() {},
		onError: options.onError || function () {},
		onSuccess: options.onSuccess || function () {},
		dataType: options.dataType || "text"
	};
	
	
	function httpSuccess(httpRequest) {
		try {
			return ( httpRequest.status >= 200 && httpReq.status < 300 ||
					httpRequest.status == 304 ||
					 navigator.userAgent.indexOf("Safari") >= 0 && typeof
					 httpReq.status == "undefined");
		} catch (e) {
			return false;
		}
	}
	
	
	var httpReq = new XMLHttpRequest();
	httpReq.open(options.type, options.url, true);
	

	httpReq.onreadystatechange = function(){
		
		//	Jesli stan dokumentu zostal zmieniony -> httpReq.readyState
		//	0: połączenie nie nawiązane,
		//	1: połączenie nawiązane,
		//	2: żądanie odebrane,
		//	3: przetwarzanie,
		//	4: dane zwrócone i gotowe do użycia,
		
		if(httpReq.readyState == 4) {
				
			if ( httpSuccess(httpReq)) {
				options.onSuccess(httpReq.responseText);
				
				httpReq = null;
			}	else {
				options.onError(httpReq.statusText);
			}
		}
	}
				httpReq.send();	
}


function pobierzDane(event) {
	event.preventDefault();
	
	ajax({
		
		type: "GET",
		url: "http://echo.jsontest.com/imie/pawel/oczy/niebieski/wzrost/178",
		onError: function(msg) {
			console.log(msg);
		},
		onSuccess: function(response) {
			
			var jsonObj = JSON.parse(response);
			
			

			var imie = document.createElement('p');
			
			imie.innerHTML = "Imie: " + jsonObj.imie;
			
			document.body.appendChild (imie) ;
			
			
			var oczy = document.createElement('p');
			
			oczy.innerHTML = "Oczy: " + jsonObj.oczy;
			
			document.body.appendChild (oczy) ;
						
			
			var wzrost = document.createElement('p');
			
			wzrost.innerHTML = "Wzrost: " + jsonObj.wzrost;
			
			document.body.appendChild (wzrost) ;
			
			
		}
	});

}