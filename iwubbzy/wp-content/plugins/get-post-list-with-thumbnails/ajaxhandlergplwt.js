var ajax_gplwt

var cp_gplwt

var v1_gplwt

var v2_gplwt

var v3_gplwt

var reenviar_gplwt = false;



function consulta_gplwt(campo_gplwt,str_gplwt,end_gplwt,campo2_gplwt,str2_gplwt){

	cp_gplwt=campo_gplwt;

	

	if(campo2_gplwt && str2_gplwt){

		v1_gplwt = campo2_gplwt;

		v2_gplwt = str2_gplwt;

		v3_gplwt = end_gplwt;

		reenviar_gplwt=true;

	}else{

		reenviar_gplwt=false;

	}

	

	ajax_gplwt=GetXmlHttpObject_gplwt();

	if (ajax_gplwt==null){

	  alert ("Seu navegador n\u00E3o suporta AJAX!");

	  return;

	}

	

	var url_gplwt=end_gplwt;

	url_gplwt=url_gplwt+"?s="+str_gplwt;

	ajax_gplwt.onreadystatechange=stateChanged_gplwt;

	ajax_gplwt.open("GET",url_gplwt,true);

	ajax_gplwt.send(null);

}



function stateChanged_gplwt(){

	if (ajax_gplwt.readyState==4){

		document.getElementById(cp_gplwt).innerHTML= ajax_gplwt.responseText;

		if(reenviar_gplwt){

			consulta_gplwt(v1_gplwt,v2_gplwt,v3_gplwt);

		}		

  	}

}

function GetXmlHttpObject_gplwt(){

	if (window.XMLHttpRequest){

  		// code for IE7+, Firefox, Chrome, Opera, Safari

  		return new XMLHttpRequest();

  	}

	if (window.ActiveXObject){

  		// code for IE6, IE5

  		return new ActiveXObject("Microsoft.XMLHTTP");

  	}

	return null;

}