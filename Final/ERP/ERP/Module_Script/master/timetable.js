
var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

//var rowData = JSON.parse(content.addParams);
//var columnDefs = grdArray["$TimeTableDetails$"];
//for (var i = 0; i < columnDefs.length; i++) {
//    if (columnDefs[i].cellRenderer) {
//        if (columnDefs[i].cellRenderer == "CreateEdit") {
//            columnDefs[i].cellRenderer = this.CreateEdit;
//        }
//        else if (columnDefs[i].cellRenderer == "CreateActive") {
//            columnDefs[i].cellRenderer = this.CreateActive;
//        }
//    }
//}
//gridOptions = GridInitializer(columnDefs);
//var gridDiv = document.querySelector('#timetableGrid');
//new agGrid.Grid(gridDiv, gridOptions);
//gridOptions.api.setRowData(((rowData == null) ? null : rowData));
//gridOptions.api.sizeColumnsToFit();

var isActiveData = ReadDropDownData("Param", '16', true);
$.each(isActiveData, function (i, value)
{
    $('#ddlActive').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$("#ddlActive").trigger("chosen:updated");

var ddlFor = ReadDropDownData("Param", '24', true);
$.each(ddlFor, function (i, value) {
    $('#ddlFor').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$("#ddlFor").trigger("chosen:updated");

var academicYear = ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false);
$.each(academicYear, function (i, value) {
    $('#ddlAcademic').append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
});
$("#ddlAcademic").trigger("chosen:updated");

$("#ddlAcademic").change(function () {
         debugger;
    $("#ddlCourse").empty();
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_ID == $("#ddlAcademic").val()) {
                $('#ddlCourse').append(new Option("Select Course", 0, false, false));
                $("#ddlCourse").append(new Option(jsonData[i].COURSE_NAME, jsonData[i].COURSE_ID, false, false));
            }
        }
    $("#ddlCourse").trigger("chosen:updated");
});

$("#ddlCourse").change(function () {

    $('#ddlSem').empty();
    var selectedCourse = $('#ddlCourse').val();
    var obj = [];
    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $('#ddlSem').append(new Option("Select Semester", 0, false, false));
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].COURSE_ID == selectedCourse) {
            semester = jsonData[i].NO_OF_SEMESTER;
        }
    }
    for (var i = 1; i <= semester; i++) {
        data = {};
        data.semId = i;
        data.NO_SEMESTER = i;
        obj.push(data);
        $('#ddlSem').append(new Option(data.NO_SEMESTER, data.NO_SEMESTER, false, false));
    }
    $("#ddlSem").trigger("chosen:updated");
});






var sectionName = ReadDropDownData("Param", '3', true);
$.each(sectionName, function (i, value) {
    $('#ddlSec').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$("#ddlSec").trigger("chosen:updated");


//function OnEditClick(obj)
//{    
//    var editData = JSON.parse($(obj).attr('dataattr'));
//    $("input[name=academicYear]").val(editData.acYear);
//    $("input[name=wfDate]").val(editData.wfDate);
//    $("input[name=wtDate]").val(editData.wtDate);
//    $('#ddlActive').val(editData.isActive);
//    $('#ddlActive').trigger("chosen:updated");
//    $("input[name=flag]").val('M'); 
//    $("input[name=yearId]").val(editData.id);
//}


//function handleSubmit(evt)
//{
//    if (ValidateFields(evt))
//    {
//        var myData = [];
//        var obj = {};
//        $("#" + evt.id + " select, input").each(function (i, data) {
//            obj[data.name] = data.value;
//        });
//        myData.push(obj);
//        btnloading("AcademicYear", 'show');
//        setTimeout(function () {
//            $.ajax({
//                type: "POST",
//                url: '/Master/Academic',
//                data: myData[0],
//                async: false,
//                beforeSend: function () {
//                    btnloading("AcademicYear", 'show');
//                },
//                success: function (data)
//                {
//                    btnloading("AcademicYear", 'hide');
//                    if (data.flag == "S")
//                    {
//                        $('#' + evt.id).trigger("reset");
//                        $("#ddlActive").val(0);
//                        $("#ddlActive").trigger("chosen:updated");
//                        CallToast(data.msg, data.flag);
//                        MyData = JSON.parse(data.addParams);          
//                        rowData = MyData; records = MyData.length;
//                        gridOptions.api.setRowData(((rowData == null) ? null : rowData));       
//                    }
//                    else {
//                        CallToast(data.msg, data.flag);
//                    }
//                }.bind(this),
//                error: function (e) {
//                    console.log(e);
//                    btnloading("AcademicYear", 'hide');
//                    alert('Error! Please try again');
//                }
//            });
//        }, 500);
//    }
//    else {
//        return false;
//    }
//    return false;
//}

function CreateEdit(params)
{
    var html = "";
    var domElement = "";
    var jsonObj = JSON.stringify(params.data);
    html = "<div><a  onclick='OnEditClick(this);' href='javascript:void(0)' dataAttr='" + jsonObj + "'><img class='editbtn' src='/Images/icons/edit.svg'/></a></div>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}

function CreateActive(params) {

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