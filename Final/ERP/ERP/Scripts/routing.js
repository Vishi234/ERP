var mainContent;
var url;
$(function () {
    mainContent = $("#MainContent"); /// render partial views.
});
var routingApp = $.sammy("#MainContent", function () {
    this.get("#/Master/Academic/", function (context) {
        ShowLoading();
        $.get("/Master/Academic", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Activity/", function (context) {
        ShowLoading();
        $.get("/Master/Activity", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Course/", function (context) {
        ShowLoading();
        $.get("/Master/Course", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Duration/", function (context) {
        ShowLoading();
        $.get("/Master/Duration", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Mapping/", function (context) {
        ShowLoading();
        $.get("/Master/Mapping", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Section/", function (context) {
        ShowLoading();
        $.get("/Master/Section", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Subject/", function (context) {
        ShowLoading();
        $.get("/Master/Subject", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Student/manage/", function (context) {
        ShowLoading();
        $.get("/Student/Manage", function (data) {
            context.$element().html(data);
        });
    });
    //this.get("#/Student/Add", function (context) {
    //    titleContent.html("Add Student");
    //    //$("#BigLoader").modal('show'); // If you want to show loader
    //    $.get("/Student/Add", function (data) {
    //        //$("#BigLoader").modal('hide');
    //        context.$element().html(data);
    //    });
    //});

    //this.get("#/Student/Edit", function (context) {
    //    titleContent.html("Edit Student");
    //    $.get("/Student/Edit", {
    //        studentID: context.params.id // pass student id
    //    }, function (data) {
    //        context.$element().html(data);
    //    });
    //});

    //this.get("#/Home/About", function (context) {
    //    titleContent.html("About");
    //    $.get("/Home/About", function (data) {
    //        context.$element().html(data);
    //    });
    //});

    //this.get("#/Home/Contact", function (context) {
    //    titleContent.html("Contact");
    //    $.get("/Home/Contact", function (data) {
    //        context.$element().html(data);
    //    });
    //});
});
$(function () {
    routingApp.run("/Dashboard/Overview"); // default routing page.
});
function ShowLoading()
{
    if ($("#loading").length === 0) {
        // inject the bar..
        $("body").append($("<div class='loadingarea'><div id='loading'><b></b><i></i></div></div>"));

        // animate the progress..
        $("#loading").width("101%").delay(800).fadeOut(1000, function () {
            // ..then remove it.
            $(".loadingarea").remove();
        });
    }
}