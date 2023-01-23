/*
WONDER LEGAL 2019
*/

/*PSEUDO SELECT COMPONENT PAYS*/
function pseudoSelectComponent(element) {
	
	var optionsHeight = 0 - ( $(element + ' .options li').length * 30 ) - 2;

	// Si l'écran est trop petit pour afficher toute la liste
	if(Math.abs(optionsHeight) > $("ul.options").height() - 2) {
		optionsHeight = 0 - ($("ul.options").height() + 2);
	}

	$(element + ' .handle, ' +  element + ' ul.current-choice li').click(function() {
		$(element + ' .options').css('width', $(element + '').width());
		$(element + ' .options').css('top', optionsHeight);
		$(element + ' .options').show();
		$(element).addClass("active");
	});
	
	$(element + ' .options li').click( function() {
		$(element + ' ul.current-choice li').html( $(this).html() );
		$(element + ' ul.current-choice li').attr( 'class', $(this).attr('class') );
		window.location.assign( $(this).data('value') );
		$(element + ' .options').hide();
		$(element).removeClass("active");
	});
	
	$(document).mouseup(function (e)
	{
		var container = $(element + '');
		var element2hide = $(element + ' .options');

		if (!container.is(e.target) // if the target of the click isn't the container...
			&& container.has(e.target).length === 0) // ... nor a descendant of the container
		{
			element2hide.hide();
			$(element).removeClass("active");
		}
	});	
}
/*END PSEUDO SELECT COMPONENT PAYS */

// on window load
$(window).on('load', function(){
	if ($(window).width() > 767) {
        $("body").removeClass("preload");
    }
    resizeCaptcha();
});


$(document).ready(function() {
	$("body").removeClass("preload");

	$('.pseudo-checkbox').each(function() {
        if ($(this).children('.check-input').val() == 'on') {
            $(this).children('.check-input').val('on'); 
            $(this).addClass('checked');
        } else {
            $(this).children('.check-input').val('off');
            $(this).removeClass('checked');
        }
    });

    resizeFooter();
    resizeSplashScreen();
    pricingPanelsEqualSize();
    conditionalTableScroll();

    //Animation du bloc Message
    if ($(".message").css('display') == 'none') {
        $(".message").animate({
            opacity: 1,
            height: "toggle"
        }, 500);
    }

    $("#message").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var test = getInternetExplorerVersion();
    if (test == 10 || test == 11) {
        $("body").addClass("ie10");
    }
    else if (test == 8 || test == 9) {
        $("body").addClass("ie8");
    }
    
    if (test != -1) {
        $("body").addClass("ie");
    }

    //Ajout d'une class pour les input readonly
    $("input, textarea").each(function() {
        if ($(this).is('[readonly]')){
            $(this).addClass("readonly");
        }
    });

    // Radiobox initial
    $(".frontoffice #connexion-utilisateur .block-connexion .button-choix").each(function() {
        if ($(this).children(".radio").is(':checked')) {
            $(".frontoffice #connexion-utilisateur .block-connexion .button-choix").each(function() {
                $(this).removeClass("checked");
            });
            $(this).addClass("checked");
        }
    });
	
	/*FIX CHECKBOX CONNECTION COMPTE ie8 ie9 */
	if (/*@cc_on !@*/false && (
       document.documentMode === 9 || document.documentMode === 8)
	) {
		
		$('#mot_de_passe').click(function() {
			$('#avec_compte').addClass('active');
			$('#pas_de_compte').removeClass('active');
			$('#val_mdp_existe').val('oui');
		});
		
		$('#pas_de_compte').click(function() {
			$('#pas_de_compte').addClass('active');
			$('#avec_compte').removeClass('active');
			$('#val_mdp_existe').val('non');
		});
		
	}
	/*END FIX*/
	
	/*ADD ON CONNECTION COMPTE: SELECTION DU CHAMPS AU FOCUS */
	$('#avec_compte #mot_de_passe').focus(function() {
		$('#avec_compte').addClass('active');
		$('#pas_de_compte').removeClass('active');
		$('#val_mdp_existe').val('oui');
	});
	
	$('#pas_de_compte').click(function() {
		$( ".password" ).hide("fast");
		$('#id_mot_de_passe_existe_oui').addClass('single-radio');
	});
	
	$('#avec_compte').on('click', function() {
		$( ".password" ).show("fast");
		$('#id_mot_de_passe_existe_oui').removeClass('single-radio');
	});
	/*END ADD-ON*/
	
	/*AFFICHAGE DE L'ARBORESCENCE*/
	$('.list-tree-structure h2, .list-tree-structure h3, .list-tree-structure h4').click(function() {
			
		if ($(this).hasClass('ouvert')) {
			$(this).parent('.niveau').children('div').slideUp(
				'normal',
				function() {
					if($(window).width() > 727) {
						$(this).parent('.niveau').css('background-image','none');
					}
				}
			);
			$(this).removeClass('ouvert');
		} else {
			if ($(window).width() > 727) {
				$(this).parent('.niveau').css('background-image','url(../../Style/tpl2019/img/trait_gauche.png)');
			}
			$(this).parent('.niveau').children('div').slideDown('normal');
			$(this).addClass('ouvert');
		}
			
	});
	/*END AFFICHAGE DE L'ARBORESCENCE*/
	
	/* END OLD JS */

	/*BUTTON UP*/
	$('#btn_up').click(function() {
		$('html,body').animate({scrollTop: 0}, 'slow');
	});

	$(window).scroll(function(){
		var maxScrollHeight = $(window).height()*0.9;
		if ($(window).scrollTop()<maxScrollHeight){
			$('#btn_up').fadeOut();
		} else {
			$('#btn_up').fadeIn();
		}
	});
	/*END BUTTON UP*/
	
	/*ANCHOR NAV*/
  	$('.navlink').on('click', function (e) {
	 	e.preventDefault();

		var target = this.hash,
		$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});
	}); 
	/*END ANCHOR NAV*/
	
	/*TOP MENU*/
	$('.mobile-menu-link').click(function() {
		if ($(this).hasClass('menu-open')) {
			$(this).removeClass('menu-open');
		} else {
			$(this).addClass('menu-open');
		}
	});
	/*END TOP MENU*/
	
	/*SHOW/HIDE RENVOI DE DOCUMENT*/
	$('#showRenvoiDoc').click(function() {
		$('#connexion-utilisateur').slideDown('fast', function() {
			resizeCaptcha();
		});
	});
	
	/*END S/H RENVOI DE DOCUMENT*/
	
	/*PSEUDO SELECT COUNTRY*/
	selectCountryValue = 'fr';
	$('#chooseCountry .selector').click(function() {
		$('#chooseCountry ul.options li').show();
	});
	$('#chooseCountry ul.options li').click(function() {
		$('#chooseCountry ul.options li').hide();
		$('#chooseCountry ul.options li').removeClass('selected');
		$(this).addClass('selected');
		$(this).show();
		selectCountryValue = $(this).attr("data-value");
	});
	$('#chooseCountry .submit-action').click(function() {
		var baseUrl = $('#chooseCountry').attr('data-url');
		var newUrl = baseUrl + '/' + selectCountryValue + '/';
		window.location.replace(newUrl);
	});
	$('html').click(function() {
		$('#chooseCountry ul.options li').each(function() {
			if($(this).hasClass('selected')) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	});

	$('#chooseCountry').click(function(event){
		event.stopPropagation();
	});

	/*END PSEUDO SELECT COUNTRY*/
	
	/*PSEUDO RADIO COMPONENT*/
	
	$('.pseudo-radio-group .pseudo-radio-field').click(function() {
		
		var parentRadioGroup = $(this).parents('.pseudo-radio-group');
		var parentRadioGroupInput = parentRadioGroup.children('.pseudo-radio-value');
		
		parentRadioGroupInput.val( $(this).attr('data-value') );
		
		parentRadioGroup.children('.pseudo-radio-field').removeClass('active');
		$(this).addClass('active');
			
		
	});
	
	/*END PSEUDO RADIO COMPONENT*/
	
	/*PSEUDO CHECKBOX COMPONENT*/
	$('.pseudo-checkbox').click(function() {
		if ($(this).hasClass('checked')) {
			$(this).children('.check-input').val('off');
			$(this).removeClass('checked');
		} else {
			$(this).children('.check-input').val('on');	
			$(this).addClass('checked');
		}
	});
	/*END PSEUDO CHECKBOX COMPONENT*/
	
	/*FORM > AFFICHAGES CONDTIONNELS*/
	//Ds la création de compte partenaire
	$('.pseudo-checkbox#is_societe').click(function() {
		if ($(this).hasClass('checked')) {
			$('#demande_nom_societe').slideDown();
		} else {
			$('#demande_nom_societe').slideUp();
		}
	});
	/*END FORM > AFFICHAGES CONDTIONNELS*/
	
	/*BUTTON LOADER OPTION*/
	//Loader
	$("form").on('submit',function() {
		var submitButton = $(this).find('.loader');
		var texte_veuillez_patienter = 'Please wait...';
		// Size fix
		$(".btn.loader").each(function() {
			var refWidth = $(this).outerWidth();
			$(this).css('width',refWidth);
		});
		if ($('#texte_veuillez_patienter').html() != undefined)
			texte_veuillez_patienter = $('#texte_veuillez_patienter').html();
			
		submitButton.html(texte_veuillez_patienter+'&nbsp;<i class="fa fa-spinner fa-pulse"></i>');
	});
	
	/*END BUTTON LOADER OPTION*/
	
	/*POPUP COMPONENT*/
	$('.open-dialog').click(function() {
		targetPopup = $(this).attr('data-popup');
		if ($(this).hasClass('scroll-popup')) {
			launchPopup( targetPopup,'scroll');	
		} else {
			launchPopup( targetPopup,'auto');
		}
	});
	
	$(document).on('click', '.close-dialog.appended, #cancelPopup', function(){ 
		$(this).parents('.popup-dialog').fadeOut();
		$('.veil').fadeOut('fast', function() {
			$('.veil').remove();
			$('.popup-dialog').remove();
		});
		$('.tox-tinymce-aux').remove();
	});
	$(document).on('click', '.close-dialog.hard-coded, #cancelPopup', function(){ 
		$(this).parents('.popup-backoffice').fadeOut();
		$('.veil').fadeOut('fast', function() {
			$('.veil').remove();
		});
		$('.tox-tinymce-aux').remove();
	});



	/*END POPUP COMPONENT*/

	/*TOGGLE MOBILE TABLE COMPONENT*/
	$('.toggle-mobile-table').click(function() {
			
		var targetTable = $(this).attr('data-target-table');
		var targetRows = $('#' + targetTable + ' tr.hide-on-mobile');
			
		if ($(this).hasClass('open')) {
			targetRows.css('display','none');

			$(this).children('.down').css('display','block');
			$(this).children('.up').css('display','none');

			$(this).removeClass('open');
		} else {
			targetRows.css('display','block');
				
			$(this).children('.down').css('display','none');
			$(this).children('.up').css('display','block');
				
			$(this).addClass('open');
		}
	});
	/*END TOGGLE MOBILE TABLE COMPONENT*/

	//highlight des deux panels au click
	$('#checkoutPricingChoice .selectable-block').click(function() {
		$('.selectable-block').removeClass('selected');
		$(this).addClass('selected');
		$(this).find('.choose-pricing').prop( 'checked', true );
		changement_des_prix();
	});
	//tabs sous mobile
	$('#checkoutPricingChoice .tab').click(function() {
		var targetTab = $(this).attr('data-content');
		$('#checkoutPricingChoice .selectable-block').hide();
		$('#'+targetTab).show();
	});
	$('#tabAboYes').click(function() {
		$('#tabAboNo').removeClass('selected');
		$(this).addClass('selected');
		$('#abonnement_oui').prop( 'checked', true );
		$('#abonnement_non').prop( 'checked', false );
		changement_des_prix();
	});
	$('#tabAboNo').click(function() {
		$('#tabAboYes').removeClass('selected');
		$(this).addClass('selected');
		$('#checkoutPricingChoice .selectable-block.col-right').addClass('selected');
		$('#abonnement_non').prop( 'checked', true );
		$('#abonnement_oui').prop( 'checked', false );
		changement_des_prix();
	});
	/*END CO COMPONENT*/
	
	/*PSEUDO SELECT COMPONENT PAYS*/
	pseudoSelectComponent('#selectCountry');
	$( window ).resize(function() {
		$("ul.options").hide();
		$("#selectCountry").removeClass("active");
		pseudoSelectComponent('#selectCountry');
	});
	/*END PSEUDO SELECT COMPONENT PAYS*/

	$('input#mot_de_passe').focus(function() {
		$(".frontoffice #connexion-utilisateur .block-connexion .button-choix#pas_de_compte").removeClass("checked");
		$(".frontoffice #connexion-utilisateur .block-connexion .button-choix#avec_compte").addClass("checked");
	});

	// Radiobox
	$(".frontoffice #connexion-utilisateur .block-connexion .button-choix").click(function() {
		$(this).children(".radio").prop("checked", true); 
		$(".frontoffice #connexion-utilisateur .block-connexion .button-choix").each(function() {
			$(this).removeClass("checked");
		});
		$(this).addClass("checked");
	});
	
	$("span.total_documents").click(function() {
		if ($(this).hasClass("deplier")) {
			$(this).parent("div").children("span.total_documents.deplier").css("display", "none");
			$(this).parent("div").children("span.total_documents.plier").css("display", "block");
		} else {
			$(this).parent("div").children("span.total_documents.plier").css("display", "none");
			$(this).parent("div").children("span.total_documents.deplier").css("display", "block");
		}
		$(this).parent("div").children(".tableau_a_deplier").slideToggle();
	});
	
	// Affichage du bouton de recherche au hover sur le bloc
	$("#conteneur_principal.rechercher ul li").hover(function() {
		$(this).find(".bouton").css("visibility","visible");
	}, function(){
		$(this).find(".bouton").css("visibility","hidden");
	});

	// Rendre la section de documents cliquables sur les résultats de recherche
	$("#conteneur_principal.rechercher ul li.chaque_document").click(function() {
		var lien = $(this).children("table").children("tbody").children("tr").children("td").children("a.title").attr("href");
		document.location.href=lien; 
	});

	/* AJAX SEARCH */
	$(document).on('click', function (e) {
		// Close menu ajax search on click outside
		if ($('#recherche_ajax').is(':visible')) {
			if(!$(e.target).closest('.top-nav .search-form').length) {
				$('#recherche_ajax').slideUp(200);
			}
		}
		// Close homepage ajax search on click outside
		if ($('#recherche_ajax_accueil').is(':visible')) {
			if(!$(e.target).closest('#homepage .recherche').length) {
				$('#recherche_ajax_accueil').slideUp(200);
			}
		}
	});

	// recherche_ajax() is defined is Javascript/recherche_ajax.js file
	var timeout_recherche_ajax = null;
	var latest_recherche_ajax_timestamp = 0;
	$('.top-nav #recherche, #homepage #recherche_accueil').on('keyup click paste', function (e) {
		
		var recherche_ajax_timestamp = Date.now();
		if ( recherche_ajax_timestamp < latest_recherche_ajax_timestamp )
			return;
		latest_recherche_ajax_timestamp = recherche_ajax_timestamp;
		
		var root = $(this).data('root');
		var divId = $(this).data('div-id');
		var texte_a_rechercher = this.value;

		if (e.type == "keyup")
		{
			clearTimeout(timeout_recherche_ajax);
			 timeout_recherche_ajax = setTimeout(function () {
				if (typeof recherche_ajax === "function") {
					recherche_ajax(texte_a_rechercher, root, divId);
				}
			}, 100);
		}
		else
			recherche_ajax(texte_a_rechercher, root, divId);
	});

});

$(window).resize(function() {
    resizeCaptcha();
    resizeFooter();
    resizeSplashScreen();

    //Fix pour retour à desktop responsive depuis mobile (très à la marge)
    if ($(window).width() > 767) {
        $('#checkoutPricingChoice .selectable-block').css('display','block');
    }
    pricingPanelsEqualSize();
});

window.onorientationchange = function(){
    resizeSplashScreen();
}

function resizeCaptcha() {
    if ($('input#captcha')) {
        if ($(window).width() > 1024) {
            $('input#captcha').css('width',$('.block-captcha').width() - $('.block-captcha > table').width() - 4);
        } 
        else if ($(window).width() <= 1024 && $(window).width() > 767) {
            $('input#captcha').css('width',$('.block-captcha').width() - $('.block-captcha > table').width() - 18);
        } 
        else if ($(window).width() <= 767) {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                $('input#captcha').css('width',$('.block-captcha').width() - $('.block-captcha > table').width() - 18);
            } else {
                $('input#captcha').css('width',$('.block-captcha').width() - $('.block-captcha > table').width() - 6);
            }
        }
    }
}

function resizeFooter() {
    var windowHeight = $(window).height();
    var headerHeight = $('.top-nav').outerHeight();
    var footerHeight = $('.overall-footer').outerHeight();
    var substractHeight = headerHeight+footerHeight;
    var minBodyHeight = windowHeight-substractHeight;
    
    if ($(window).width() > 767) {
        $('.page').css('min-height',minBodyHeight);
    }
}

function resizeSplashScreen() {
    var windowHeight = $(window).height();
    var headerHeight = $('.top-nav').outerHeight();
    
    if ($(window).width() > 1024) {
        //$('body.home .splash-screen').css('height',windowHeight-headerHeight);
        $('body.splash-screen .splash-screen').css('height',windowHeight);
    }
}

function conditionalTableScroll() {
    $('.conditional-scroll').each(function() {
        var maxRows = $(this).attr('data-scrollThreshold');
        var Rows = $(this).find('tr').slice(0, maxRows);
        var nbRows = $(this).find('tr').length;
        var maxVisibleHeight = 0;
        Rows.each(function() {
            maxVisibleHeight = maxVisibleHeight + $(this).height();
        });
        finalMaxVisibleHeight = maxVisibleHeight;
        if ($(window).width() >= 1085) {
            if (nbRows > maxRows) {
                $(this).css('overflow-y','auto');
            }
            $(this).css('height',finalMaxVisibleHeight);
        }
    });
}

/*CHECKOUT OPTIONS COMPONENT*/
//Resize des deux panels à taille égale
function pricingPanelsEqualSize() {
    $('#checkoutPricingChoice .col-right').css('height', $('#checkoutPricingChoice .col-left').height());
}

function launchPopup( targetDiv,scrollMode ) {
	//Additional margin to center the element vertically
	var windowHeight = $(window).height();
		
	//Build Veil + Popup
	var popupTextContent = $('#' + targetDiv).html();
	$('body').append('<div class="veil"></div>');
	if( scrollMode == 'auto') {
		$('body').append('<div class="popup-dialog"><div class="content"><div class="scrollable editorial-content"></div></div><div class="close-wrapper"><i class="fa fa-times close-dialog appended"></i></div></div>');
	} else {
		$('body').append('<div class="popup-dialog scroll"><div class="content"><div class="scrollable editorial-content"></div></div><div class="close-wrapper"><i class="fa fa-times close-dialog appended"></i></div></div>');
	}
	$('.popup-dialog .scrollable').html(popupTextContent);
	
	var popupHeight = $('.popup-dialog').outerHeight();
	var windowWidth = $(window).width();
	var popupWidth = $('.popup-dialog').outerWidth();
	var popupMarginTop = (windowHeight - popupHeight)/2;
	var popupMarginLeft = (windowWidth - popupWidth)/2;
		
	//Go popup!
	$('.veil').fadeIn();
	$('.veil').css('height',windowHeight);
	$('.popup-dialog').fadeIn();
	$('.popup-dialog').css('top',popupMarginTop);
	$('.popup-dialog').css('left',popupMarginLeft);
}

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
        }
        else if (navigator.appName == 'Netscape')
        {
            var ua = navigator.userAgent;
            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
            }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            rv = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
    }
    return rv;
}

// Fonction pour afficher ou cacher les mots de passe
$(".oeil_mot_de_passe").on('click', function() {
	if ( $(this).attr('id') == 'oeil_afficher' )
	{
		$('.oeil_mot_de_passe').siblings(":password").prop("type", "text");
		$('.oeil_mot_de_passe').toggle();
	}
	else if ( $(this).attr('id') == 'oeil_cacher' )
	{
		$('.oeil_mot_de_passe').siblings(":text").prop("type", "password");
		$('.oeil_mot_de_passe').toggle();
	}
});
