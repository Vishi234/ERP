function CallToast(message, flag) {
    var heading = ((flag == 'F') ? "Error" : ((flag == 'V') ? "Information" : "Success"));
    var icon = ((flag == 'F') ? "error" : ((flag == 'V') ? "info" : "success"));
    $.toast({
        heading: heading,
        text: message,
        icon: icon,
        position: 'top-right',
        hideAfter: 3000,
        stack: false
    })

}
function GetReportConfiguration(module) {
    var url = '/Content/DynamicJs/' + module + '.js';
    var grdarray = '';
    $.ajax({
        url: url,
        dataType: 'script',
        async: false,
        success: function (result) {
            var str = "get" + module + "GridSettings";
            var func = window[str];
            if (typeof func === "function") grdarray = func();

        },
    });
    return grdarray;
}