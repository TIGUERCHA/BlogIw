var dataGenerale = "";
//http://date.jsontest.com/?service=ip exemple d'un fichier json

$(document).ready(function () {
    $("#LaPartiel").hide(true);
    $("#uniteBlog").hide(true);
    $("#postBlog").hide(true);
    $("#BlogAndPost").hide(true);
    
});

$("#btn").click(function () {
    $("#LaPartiel").show(true);
    GetAllPost();
    $("#BlogAndPost").show(true);
    $("#postBlog").show(true);
    $("#uniteBlog").hide(true);
});
var tab = [];
function GetAllPost() {
    $.get("http://localhost:8080/Post/GetAll", function (response) {
        tab = response.content;
        console.log(response);
        console.log(response.content);
        console.log(response.content[0].title);
        response.content.forEach(function(nameee) {
            $("#titres").append("<option value=" + nameee.id + ">" + nameee.title + "</option>");
            $("#contenuBlog").append("<hr><div><p>Titre: " + nameee.title + "</p><p>Date: " + nameee.date + "</p><p>Description: " + nameee.description + "</p><p>Text: " + nameee.text + "</p></div><hr>");
        });
    });
}

$("#titres").on("change",
    function () {
        console.log(this.value);
        $.get("http://localhost:8080/Post/Get/"+this.value+"",
            function(response) {
                $("#BlogAndPost").hide(true);
                $("#uniteBlog").show(true);
                
                $("#uniteBlog").append("<hr><div><p>Titre: " + response.content.title + "</p><p>Date: " + response.content.date + "</p><p>Description: " + response.content.description + "</p><p>Text: " + response.content.text + "</p></div> <hr>");
            
            });
        if (this.value === "") {
            return;
        }
        $.get("http://localhost:8080/Post/ShowImage/" + this.value + "",
            function(response) {
                $("#uniteBlog").append("<div>"+response+"</div>");
            });

    });


$("#postButton").click(function() {
    $.post("http://localhost:8080/Post/Insert",
    {
        title: $("#NamePost").val(),
        description: $("#DescriptionPost").val(),
        text: $("#postButton").val()
    },
    function(data, status) {
        if (status.toString() === "success") {
            alert("succes");
            alert(data);
        } else {
            alert("failed");
        }
    });
});
