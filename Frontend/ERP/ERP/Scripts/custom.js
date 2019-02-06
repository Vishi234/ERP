document.addEventListener("DOMContentLoaded", function () {
    $(".top-menu li a").click(function () {
        $(".top-menu li").find("a").removeClass("top-menu-active");
        $(this).addClass("top-menu-active");
    });
    $(".navigation-menu > ul > li").click(function () {
        if ($(this).find("a").first().hasClass("click-remove")) {
            var level = $(this).find(".smenu").attr("menu-level");
            $(this).find(".smenu").removeClass(level)
            $(this).find("a").first().removeClass("click-remove");
        }
        else {
            var level = $(this).find(".smenu").attr("menu-level");
            $(this).find(".smenu").addClass(level)
            $(this).find("a").first().addClass("click-remove");
        }

    });
    $(".user-dtl").click(function () {
        $(this).toggleClass("right-menu-active");
        $(".top-sub-menu").toggleClass("show");
    });
    $("select").SumoSelect({ search: true, searchText: 'Enter here.' });
    $('.openmodal').click(function () {
        $(".modal").modal("hide");
        $($(this).attr("data-target"))
            .prop('class', 'modal fade') // revert to default
            .addClass($(this).data('direction'));
        $($(this).attr("data-target")).modal('show');
    });

    $('.startDate').daterangepicker({
        singleDatePicker: true,
        startDate: moment(),
        locale:
        {
            format: 'DD-MMM-YYYY'
        }

    });

    $('.endDate').daterangepicker({
        singleDatePicker: true,
        startDate: moment().add(10, 'days'),
        locale:
        {
            format: 'DD-MMM-YYYY'
        }
    });

})
function ShowCreate() {
    $(".listorg").addClass("slideOutLeft");
    $(".listorg").removeClass("show");
    $(".listorg").addClass("hide");
    setTimeout(function () {
        $(".createorg").removeClass("hide");
        $(".createorg").addClass("show");
        $(".createorg").addClass("slideInRight");
    }, 500)

}
function Back() {
    $(".listorg").animate({ 'margin': '0 auto' });
    $(".listorg").addClass("show");
    $(".listorg").removeClass("hide");
    $(".createorg").animate({ 'margin': '0 auto' });
    $(".createorg").addClass("hide");
    $(".createorg").removeClass("show");
}
function InlineLoading(evt, action) {
    var a = document.getElementById(evt);
    if (action == "Show") {
        a.children[0].classList.remove("hide");
        a.children[0].classList.add("show");
        a.children[0].children[0].classList.add("fa-spin")
        $("#" + evt).attr("disabled", "disabled");
    }
    else {
        a.children[0].classList.remove("show");
        a.children[0].classList.add("hide");
        a.children[0].children[0].classList.remove("fa-spin")
        $("#" + evt).removeAttr("disabled");
    }
}