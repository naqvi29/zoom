function afficher_cacher(id_element, id_bouton, texte_affichage, texte_disparition)
{
	var test_affichage = document.getElementById(id_element).style.display;
	if (test_affichage == "block")
	{
		if (typeof texte_disparition !== 'undefined' && typeof id_bouton !== 'undefined' )
			document.getElementById(id_bouton).innerHTML = texte_disparition;

		document.getElementById(id_element).style.display = "none";
	}
	else 
	{
		if (typeof texte_affichage !== 'undefined' && typeof id_bouton !== 'undefined' )
			document.getElementById(id_bouton).innerHTML = texte_affichage;

		document.getElementById(id_element).style.display = "block";
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function cookie_on_off(nom_cookie)
{
	var valeur_cookie = getCookie(nom_cookie);
	
	var date = new Date();
	date.setMonth(date.getMonth()+1);
	
	if ( valeur_cookie == "1" )
		document.cookie = nom_cookie + "=0; path=/" + "; expires=" + date.toUTCString() + "; SameSite=LAX";
	else
		document.cookie = nom_cookie + "=1; path=/" + "; expires=" + date.toUTCString() + "; SameSite=LAX";
}