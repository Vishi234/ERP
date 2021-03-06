﻿var mainContent;
var url;
$(function () {
    mainContent = $("#MainContent"); /// render partial views.
});
var routingApp = $.sammy("#MainContent", function () {
    this.get("#/Master/Academic/", function (context) {
        ShowLoading();
        $.get("/Master/Academic", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/Activity/", function (context) {
        ShowLoading();
        $.get("/Master/Activity", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/Course/", function (context) {
        ShowLoading();
        $.get("/Master/Course", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/Duration/", function (context) {
        ShowLoading();
        $.get("/Master/Duration", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/Mapping/", function (context) {
        ShowLoading();
        $.get("/Master/Mapping", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/Section/", function (context) {
        ShowLoading();
        $.get("/Master/Section", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/Subject/", function (context) {
        ShowLoading();
        $.get("/Master/Subject", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/HolidayList/", function (context) {
        ShowLoading();
        $.get("/Master/HolidayList", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Master/TimeTableConfiguration/", function (context) {
        ShowLoading();
        $.get("/Master/TimeTableConfiguration", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Student/manage/", function (context) {
        ShowLoading();
        $.get("/Student/Manage", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Employee/manage", function (context) {
        ShowLoading();
        $.get("/Employee/Manage", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/fee/type/", function (context) {
        ShowLoading();
        $.get("/Fee/Type", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Fee/Payments/", function (context) {
        ShowLoading();
        $.get("/Fee/Payments", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
    this.get("#/Fee/Collection/", function (context) {
        ShowLoading();
        $.get("/Fee/Collection", function (data) {
            context.$element().html(data);
            HideLoading();
        });
    });
});
$(function () {
    routingApp.run("/Dashboard/Overview"); // default routing page.
});
function ShowLoading() {
    if ($("#loading").length === 0) {
        // inject the bar..
        $("body").append($("<div class='loadingarea'><div id='loading'><b></b><i></i></div></div>"));

        // animate the progress..
        $("#loading").width("101%").delay(800);
    }
}
function HideLoading() {
    $("#loading").fadeOut(1000, function () {
        // ..then remove it.
        $(".loadingarea").remove();
    });
}