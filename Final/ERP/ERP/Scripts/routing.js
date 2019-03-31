var mainContent;
var url;
$(function () {
    mainContent = $("#MainContent"); /// render partial views.
});
var routingApp = $.sammy("#MainContent", function () {
    this.get("#/Master/Academic/", function (context) {
        $.get("/Master/Academic", function (data) {
            context.$element().html(data);
            
        });
    });
    this.get("#/Master/Activity/", function (context) {
        $.get("/Master/Activity", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Course/", function (context) {
        $.get("/Master/Course", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Duration/", function (context) {
        $.get("/Master/Duration", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Mapping/", function (context) {
        $.get("/Master/Mapping", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Section/", function (context) {
        $.get("/Master/Section", function (data) {
            context.$element().html(data);
        });
    });
    this.get("#/Master/Subject/", function (context) {
        $.get("/Master/Subject", function (data) {
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
    //$.get("/Dashboard/Overview", function (data) {
    //    context.$element().html(data);
    //});
    routingApp.run("/Dashboard/Overview"); // default routing page.
});