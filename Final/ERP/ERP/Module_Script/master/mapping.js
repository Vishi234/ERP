
var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$MappingDetails$"];
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

var gridDiv = document.querySelector('#mappingGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
debugger;
var isActiveData = ReadDropDownData("Param", '16', true);
var courseId = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
var subject = ReadDropDownData("Subject", $("#hfCustomerId").val(), false);
$.each(isActiveData, function (i, value)
{
    $('#ddlActive').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});


$.each(courseId, function (i, value) {
    $('#ddlCourse').append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
});

$("#ddlCourse").change(function () {
    debugger;
    var selectedCourse = $('#ddlCourse').val();
    var obj = [];
    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].COURSE_ID == value) {
            semester = jsonData[i].NO_OF_SEMESTER;
        }
    }
    for (var i = 1; i <= semester; i++) {
        data = {};
        data.NO_SEMESTER = i;
        obj.push(data);
    }
    $('#ddlSemester').append(new Option(data.NO_OF_SEMESTER, data.NO_OF_SEMESTER, false, false));
    $("#ddlSemester").trigger("chosen:updated");
});

$("#ddlActive").trigger("chosen:updated");
$("#ddlAcademic").trigger("chosen:updated");
$("#ddlCourse").trigger("chosen:updated");

function OnEditClick(obj)
{
    var editData = JSON.parse($(obj).attr('dataattr'));
    $('#ddlCourse').val(editData.cId);
    $('#ddlSemester').val(editData.sem);
    $('#ddlSubject').val(editData.subId);
    $('#ddlActive').val(editData.isActive);
    $('#ddlActive').trigger("chosen:updated");
    $('#ddlSubject').trigger("chosen:updated");
    $('#ddlCourse').trigger("chosen:updated");
    $('#ddlSemester').trigger("chosen:updated");
    $("input[name=flag]").val('M'); 
    $("input[name=durId]").val(editData.id);
}


function handleSubmit(evt)
{
    if (ValidateFields(evt))
    {
        var myData = [];
        var obj = {};
        $("#" + evt.id + " select, input").each(function (i, data) {
            obj[data.name] = data.value;
        });
        myData.push(obj);
        btnloading("CourseForm", 'show');
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: '/Master/Duration',
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("DurationForm", 'show');
                },
                success: function (data)
                {
                    btnloading("DurationForm", 'hide');
                    if (data.flag == "S")
                    {
                        $('#' + evt.id).trigger("reset");
                        $("#ddlActive").val(0);
                        $('#ddlAcademic').val(0);
                        $('#ddlCourse').val(0);
                        $('#ddlSemester').val(0);
                        $("#ddlActive").trigger("chosen:updated");
                        $('#ddlAcademic').trigger("chosen:updated");
                        $('#ddlCourse').trigger("chosen:updated");
                        $('#ddlSemester').trigger("chosen:updated");
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
                    btnloading("DurationForm", 'hide');
                    alert('Error! Please try again');
                }
            });
        }, 1000);
    }
    else {
        return false;
    }
    return false;
}

;
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