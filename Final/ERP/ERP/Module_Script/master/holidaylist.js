var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$HolidayDetails$"];
for (var i = 0; i < columnDefs.length; i++) {
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateEdit") {
            columnDefs[i].cellRenderer = this.CreateEdit;
        }
        else if (columnDefs[i].cellRenderer == "CreateActive") {
            columnDefs[i].cellRenderer = this.CreateActive;
        }
    }
}
gridOptions = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#holidayGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
gridOptions.api.sizeColumnsToFit();

var isActiveData = ReadDropDownData("Param", '16', true);
$.each(isActiveData, function (i, value) {
    debugger;
    $('#ddlActive').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$("#ddlActive").trigger("chosen:updated");

var academicYear = ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false);
$.each(academicYear, function (i, value) {
    $('#ddlAcademic').append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
});
$("#ddlAcademic").trigger("chosen:updated");

function handleSubmit(evt) {
    if (ValidateFields(evt)) {
        var myData = [];
        var obj = {};
        $("#" + evt.id + " select, input").each(function (i, data) {
            obj[data.name] = data.value;
        });
        myData.push(obj);
        btnloading("HolidayList", 'show');
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: '/Master/HolidayList',
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("HolidayList", 'show');
                },
                success: function (data) {
                    btnloading("HolidayList", 'hide');
                    if (data.flag == "S") {
                        $('#' + evt.id).trigger("reset");
                        $("#ddlActive").val(0);
                        $("#ddlActive").trigger("chosen:updated");
                        CallToast(data.msg, data.flag);
                        MyData = JSON.parse(data.addParams);
                        rowData = MyData; records = MyData.length;
                        gridOptions.api.setRowData(((rowData == null) ? null : rowData));
                    }
                    else {
                        CallToast(data.msg, data.flag);
                    }
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    btnloading("HolidayList", 'hide');
                    alert('Error! Please try again');
                }
            });
        }, 500);
    }
    else {
        return false;
    }
    return false;
}

