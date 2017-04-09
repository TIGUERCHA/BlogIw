
$(document).ready(initPage);

function initPage() {

    //init events de la page
    initEvent();

    //init grid des commandes
    //boost.grid.initJqGrid();

    //init events popup de recherche utilisés dans la page
    boost.popup.initEventArticle();
    boost.popup.initEventIg();
    boost.popup.initEventTechnicien();
    boost.popup.initEventDemandeur();
    boost.popup.initEventMagasin();
}

$("#hiddencdecodetechnicien").on('change keyup paste', function () {
    $('#cdelibelletechnicien').val("");

});

$("#hiddencdecodearticle").on('change keyup paste', function () {
    $('#cdelibellearticle').val("");

});

function GetValueSearch() {
    var commandeNumber = escape($('#cdenumcde').val());
    var btNumber = escape($('#cdenumbt').val());
    var codeArticle = escape($('#hiddencdecodearticle').val());
    var codeTechnicien = escape($('#cdelibelletechnicien').val());
    var startBesoinDate = escape($('#startDatePicker').val());
    var finishBesoinDate = escape($('#finishDatePicker').val());
    var startCreadate = escape($('#startDateCPicker').val());
    var finishCreaDate = escape($('#finishDateCPicker').val());
    var ticketRemedy = escape($('#numremedy').val());
    var userdemandeur = escape($('#cdelibelledemandeur').val());
    var codeigintervention = escape($('#hiddencdecodeig').val());
    var client = escape($('#cdeclient').val());

    var natureBt = escape($('#natureBt').val());
    var equipeBt = escape($('#equipeBt').val());
    var operateurEt = $('#operateurEt').is(":checked");
    var operateurOu = $('#operateurOu').is(":checked");
    var operateur = "";
    if (operateurEt == true) operateur = "and";
    else operateur = "or";

    var mesDemandes = $('#mesDemandes').is(":checked");
    var codemagasinautre = escape($('#hiddencdecodemagasinautre').val());
    var codemagasinorigine = escape($('#hiddencdecodemagasinorigine').val());
    var codeigLivraison = escape($('#hiddencdecodeigLivraison').val());
    return commandeNumber + "&btnumero=" + btNumber + "&articlecode=" + codeArticle + "&techniciencode=" + codeTechnicien + "&startbesoindate=" + startBesoinDate + "&finishbesoindate=" + finishBesoinDate + "&startCreadate=" + startCreadate + "&finishCreaDate=" + finishCreaDate + "&ticketremedy=" + ticketRemedy + "&usercreation=" + userdemandeur + "&iginterventioncode=" + codeigintervention + "&natureBt=" + natureBt + "&equipeBt=" + equipeBt + "&mesDemandes=" + mesDemandes + "&codemagasinautre=" + codemagasinautre + "&codemagasinorigine=" + codemagasinorigine + "&codeigLivraison=" + codeigLivraison + "&client=" + client + "&operateur=" + operateur;
}

function initEvent() {
    function search() {

        var inputSearch = GetValueSearch();

        jQuery("#" + gridId).jqGrid('setGridParam', { url: searchUrl + inputSearch, page: 1 }).trigger("reloadGrid");
    }

    function searchMaillage() {

        var addFirst = false;
        var codeigintervention = escape($('#hiddencdecodeig').val());

        var codemagasinintervention = escape($('#cdecodemagasin').val());
        if (codeigintervention != null || codemagasinintervention != null) {
            jQuery("#" + gridId).jqGrid('setGridParam', { url: searchUrl + codeigintervention + "&codemagasin=" + codemagasinintervention, page: 1 }).trigger("reloadGrid");
        }
    }

    $("#searchvalid").click(function () {
        //var inputSearch = GetValueSearch();
        //var url = saveSearchUrl + inputName + "&commandenum=" + inputSearch;
        var inputName = $('#searchlibelle').val();
        var defaut = $('#idDefaut').is(":checked");
        var url = saveSearchUrl + inputName + "&defaut=" + defaut;
        $.get(url, function (data) {
            $('#SearchSave').modal('hide');
            $('#idRechercheList').html(data);
        });
    });


    $("#searchId").click(function () {

        var searchSansCri = "&btnumero=&articlecode=&techniciencode=&startbesoindate=&finishbesoindate=&ticketremedy=&usercreation=&iginterventioncode=&natureBt=&equipeBt=&mesDemandes=false&codemagasinautre=&codemagasinorigine=&codeigLivraison=&client=0&operateur=";
        var searchString = GetValueSearch();
        //alert(GetValueSearch(searchString));
        if (searchString == searchSansCri + "and" || searchString == searchSansCri + "or")
            $('#modalRechercheSansCritere').modal('show');
        else
            search();
    });

    $("#lancerRechercheSansCritere").click(function () {
        search();
        $('#modalRechercheSansCritere').modal('hide');
    });

    $("#searchMaillageId").click(function () {

        searchMaillage();

    });

    //$("#usersearchget").on('change keyup paste', function () {
    //    var r = $('#usersearchget').val();

    //    //$('#searchlibellehidden').val(r);
    //    //window.setTimeout(function () {
    //    //    document.getElementById('recordGet').click();
    //    //}, 200);

    //});

    $('#articlebtn').click(function () {

        $('#codearticle').val($('#hiddencdecodearticle').val());
        boost.popup.searchByarticle();

    });

    $('#igbtn').click(function () {

        $('#codeig').val($('#hiddencdecodeig').val());
        $('#libelleig').val($('#cdelibelleig').val());
        $('#codepostal').val($('#codepostalig').val());
        $('#libelleville').val($('#cityig').val());
        boost.popup.searchByig();
    });

    $('#igbtnLivraison').click(function () {

        $('#codeig').val($('#hiddencdecodeigLivraison').val());
        $('#libelleig').val($('#cdelibelleigLivraison').val());
        $('#codepostal').val($('#codepostaligLivraison').val());
        $('#libelleville').val($('#cityigLivraison').val());
        boost.popup.searchByig();
    });


    //opener for autremagin popup
    $('#autremagasinbtn').click(function () {
        $('#codemagasin').val($('#hiddencdecodemagasinautre').val());
        $('#description').val("");
        boost.popup.searchBymagasin();
    });

    //opener for magasin origine popup
    $('#magasinoriginebtn').click(function () {
        $('#codemagasin').val($('#hiddencdecodemagasinorigine').val());
        $('#description').val("");

        boost.popup.searchBymagasin();
    });

    $('#technicienbtn').click(function () {

        //Récupérer les valeurs saisies dans le champs texte de la page d'ouverture du popup
        $('#codetechnicien').val($('#hiddencdecodetechnicien').val());
        $('#libelletechnicien').val($('#cdelibelletechnicien').val());
        boost.popup.searchBytechnicien();
    });

    $('#demandeurbtn').click(function () {
        $('#demandeurname').val($('#hiddencdecodedemandeur').val());

        boost.popup.searchBydemandeur();
    });
    $('#magasinbtn').click(function () {

        $('#codemagasin').val($('#cdecodemagasin').val());
        $('#description').val($('#descmagasin').val());
        boost.popup.searchBymagasin();

    });
    $('#magasin1').click(function () {
        $('#codemagasin').val($('#mag1').val());
        $('#description').val($('#hiddemagasincode1').val());
        boost.popup.searchBymagasin();

    });

    $('#magasin2').click(function () {
        $('#codemagasin').val($('#mag2').val());
        $('#description').val($('#hiddemagasincode2').val());
        boost.popup.searchBymagasin();

    });

    $('#magasin3').click(function () {
        $('#codemagasin').val($('#mag3').val());
        $('#description').val($('#hiddemagasincode3').val());
        boost.popup.searchBymagasin();

    });

    $('#magasin4').click(function () {
        $('#codemagasin').val($('#mag4').val());
        $('#description').val($('#hiddemagasincode4').val());
        boost.popup.searchBymagasin();

    });

    $('#magasin5').click(function () {
        $('#codemagasin').val($('#mag5').val());
        $('#description').val($('#hiddemagasincode5').val());
        boost.popup.searchBymagasin();
    });

    $('#magasin6').click(function () {
        $('#codemagasin').val($('#mag6').val());
        $('#description').val($('#hiddemagasincode6').val());
        boost.popup.searchBymagasin();
    });

    $('#magasin7').click(function () {
        $('#codemagasin').val($('#mag7').val());
        $('#description').val($('#hiddemagasincode7').val());
        boost.popup.searchBymagasin();
    });
    $('#magasin8').click(function () {
        $('#codemagasin').val($('#mag8').val());
        $('#description').val($('#hiddemagasincode8').val());
        boost.popup.searchBymagasin();
    });
    $('#magasin9').click(function () {
        $('#codemagasin').val($('#mag9').val());
        $('#description').val($('#hiddemagasincode9').val());
        boost.popup.searchBymagasin();
    });
    $('#magasin10').click(function () {
        $('#codemagasin').val($('#mag10').val());
        $('#description').val($('#hiddemagasincode10').val());
        boost.popup.searchBymagasin();
    });
    $('#magasin11').click(function () {
        $('#codemagasin').val($('#mag11').val());
        $('#description').val($('#hiddemagasincode11').val());
        boost.popup.searchBymagasin();
    });
    $('#magasin12').click(function () {
        $('#codemagasin').val($('#mag12').val());
        $('#description').val($('#hiddemagasincode12').val());
        boost.popup.searchBymagasin();
    });
}



function onclosePopupArticle(param) {

    if (boost.popup.modalinformation != "") {
        $('#cdelibellearticle').val(libellearticlesearch);
        $('#hiddencdecodearticle').val(codearticlesearch);
    }
}

function onclosePopupIG(param) {

    if (boost.popup.modalinformation != "") {
        $('#cdelibelleig').val(libelleigsearch);
        $('#hiddencdecodeig').val(codeigsearch);
        $('#hiddencdecodeigModel').val(codeigsearch);
        $('#codepostalig').val(codepostaligsearch);
        $('#cityig').val(cityigsearch);
    }
}

function onclosePopupIGLivraison(param) {

    if (boost.popup.modalinformation != "") {
        $('#cdelibelleigLivraison').val(libelleigsearch);
        $('#hiddencdecodeigLivraison').val(codeigsearch);
        $('#codepostaligLivraison').val(codepostaligsearch);
        $('#cityigLivraison').val(cityigsearch);
    }
}


function onclosePopupTechnicien(param) {

    if (boost.popup.modalinformation != "") {
        $('#cdelibelletechnicien').val(libelletechniciensearch);
        $('#hiddencdecodetechnicien').val(codetechniciensearch);
    }
}

function onclosePopupDemandeur(param) {

    if (boost.popup.modalinformation != "") {
        $('#cdelibelledemandeur').val(libelledemandeursearch);
        $('#hiddencdecodedemandeur').val(codedemandeursearch);
    }


}
function onclosePopupMagasin1() {
    if (boost.popup.modalinformation != "") {

        $('#mag1').val(codemagasinsearch);
        $('#hiddemagasincode1').val(libellemagasinsearch);
    }
}



function onclosePopupMagasin2() {
    if (boost.popup.modalinformation != "") {
        $('#mag2').val(codemagasinsearch);
        $('#hiddemagasincode2').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin3() {
    if (boost.popup.modalinformation != "") {
        $('#mag3').val(codemagasinsearch);
        $('#hiddemagasincode3').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin4() {
    if (boost.popup.modalinformation != "") {
        $('#mag4').val(codemagasinsearch);
        $('#hiddemagasincode4').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin5() {
    if (boost.popup.modalinformation != "") {

        $('#mag5').val(codemagasinsearch);
        $('#hiddemagasincode5').val(libellemagasinsearch);
    }
}



function onclosePopupMagasin6() {
    if (boost.popup.modalinformation != "") {
        $('#mag6').val(codemagasinsearch);
        $('#hiddemagasincode6').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin7() {
    if (boost.popup.modalinformation != "") {
        $('#mag7').val(codemagasinsearch);
        $('#hiddemagasincode7').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin8() {
    if (boost.popup.modalinformation != "") {
        $('#mag8').val(codemagasinsearch);
        $('#hiddemagasincode8').val(libellemagasinsearch);
    }
}

function onclosePopupMagasin9() {
    if (boost.popup.modalinformation != "") {

        $('#mag9').val(codemagasinsearch);
        $('#hiddemagasincode9').val(libellemagasinsearch);
    }
}



function onclosePopupMagasin10() {
    if (boost.popup.modalinformation != "") {
        $('#mag10').val(codemagasinsearch);
        $('#hiddemagasincode10').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin11() {
    if (boost.popup.modalinformation != "") {
        $('#mag11').val(codemagasinsearch);
        $('#hiddemagasincode11').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin12() {
    if (boost.popup.modalinformation != "") {
        $('#mag12').val(codemagasinsearch);
        $('#hiddemagasincode12').val(libellemagasinsearch);
    }
}
function onclosePopupMagasin() {
    if (boost.popup.modalinformation != "") {
        $('#cdecodemagasin').val(codemagasinsearch);
        $('#descmagasin').val(libellemagasinsearch);
    }
}

function onclosePopupMagasinAutre(param) {
    if (boost.popup.modalinformation != "") {
        $('#cdelibellemagasinautre').val(libellemagasinsearch);
        $('#hiddencdecodemagasinautre').val(codemagasinsearch);
    }
}

function onclosePopupMagasinOrigine(param) {

    if (boost.popup.modalinformation != "") {

        $('#cdelibellemagasinorigine').val(libellemagasinsearch);
        $('#hiddencdecodemagasinorigine').val(codemagasinsearch);

    }
}

