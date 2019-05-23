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
};
function OnEditClick(obj) {
    var editData = JSON.parse($(obj).attr('dataattr'));

    $('#ddlAcademic').val(editData.acid);
    $('#ddlHoliday').val(editData.holyNameId);
    $('#ddlres').val(editData.resHoly);
    $("input[name=wfDate]").val(editData.wfDate);
    $("input[name=wtDate]").val(editData.wtDate);
    $('#ddlActive').val(editData.isActive);
    $('#ddlActive').trigger("chosen:updated");
    $('#ddlAcademic').trigger("chosen:updated");
    $('#ddlHoliday').trigger("chosen:updated");
    $('#ddlres').trigger("chosen:updated");
    $("input[name=flag]").val('M');
    $("input[name=durId]").val(editData.id);
}
function CreateEdit(params) {
    debugger;
    var html = "";
    var domElement = "";
    var jsonObj = JSON.stringify(params.data);
    html = "<div><a  onclick='OnEditClick(this);' href='javascript:void(0)' dataAttr='" + jsonObj + "'><img class='editbtn' src='/Images/icons/edit.svg'/></a></div>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}

function CreateActive(params) {
    debugger;
    console.log(params,"0000000000000000");
    var html = "";
    var domElement = "";
    if ((params.data.isActive).trim() == 70) {
        html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-success">Active</span>'
    }
    else if ((params.data.isActive).trim() == 71) {
        html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-danger">In-Active</span>'
    }
    else {
        html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-warning">Temporary</span>'
    }

    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}

