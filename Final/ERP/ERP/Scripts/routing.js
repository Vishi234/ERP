var mainContent;
var url;
$(function () {
    mainContent = $("#MainContent"); /// render partial views.
});
var routingApp = $.sammy("#MainContent", function () {
    this.get("#/Master/Academic/", function (context) {
        $.get("/Master/Academic", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
            
            
        });
    });
    this.get("#/Master/Activity/", function (context) {
        $.get("/Master/Activity", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
        });
    });
    this.get("#/Master/Course/", function (context) {
        $.get("/Master/Course", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
        });
    });
    this.get("#/Master/Duration/", function (context) {
        $.get("/Master/Duration", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
        });
    });
    this.get("#/Master/Mapping/", function (context) {
        $.get("/Master/Mapping", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
        });
    });
    this.get("#/Master/Section/", function (context) {
        $.get("/Master/Section", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
        });
    });
    this.get("#/Master/Subject/", function (context) {
        $.get("/Master/Subject", function (data) {
            ShowLoading();
            setTimeout(function () {
                context.$element().html(data);
            }, 1000);
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
        $("body").append($("<div><b></b><i></i></div>").attr("id", "loading"));

        // animate the progress..
        $("#loading").width("101%").delay(800).fadeOut(1000, function () {
            // ..then remove it.
            $(this).remove();
        });
    }
}