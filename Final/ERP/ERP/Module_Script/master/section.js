
var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$SectionDetails$"];
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

var gridDiv = document.querySelector('#sectionGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
debugger;
var isActiveData = ReadDropDownData("Param", '16', true);
var courseId = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
var sectionName = ReadDropDownData("Param", '3', true);
$.each(isActiveData, function (i, value)
{
    $('#ddlActive').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$.each(courseId, function (i, value) {
    $('#ddlCourse').append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
});

$.each(sectionName, function (i, value) {
    $('#ddlSection').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});

$("#ddlCourse").change(function () {
    debugger;
    $('#ddlSemester').empty();
    var selectedCourse = $('#ddlCourse').val();
    var obj = [];
    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $('#ddlSemester').append(new Option("Select Semester", 0, false, false));
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
        $('#ddlSemester').append(new Option(data.NO_SEMESTER, data.semId, false, false));
    }
    $("#ddlSemester").trigger("chosen:updated");
});


$("#ddlActive").trigger("chosen:updated");
$("#ddlAcademic").trigger("chosen:updated");
$("#ddlCourse").trigger("chosen:updated");
$("#ddlSection").trigger("chosen:updated");

function OnEditClick(obj)
{
    debugger;
    var editObj = [];
    var editData = JSON.parse($(obj).attr('dataattr'));
    $('#ddlSemester').empty();
    $('#ddlSection').empty();
    //var courseEdit = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    //for (var i = 0; i < courseEdit.length; i++) {
    //    if (courseEdit[i].COURSE_ID == editData.courseId) {
    //        semester = courseEdit[i].NO_OF_SEMESTER;
    //    }
    //}

    $('#ddlSemester').append(new Option(editData.semId, editData.semId, false, false));
    $('#ddlSection').append(new Option(editData.secName, editData.secId, false, false));


    $('#ddlCourse').val(editData.courseId);
    //$('#ddlSection').val(editData.secId);  
    $('#ddlActive').val(editData.isActive);
    $('#ddlActive').trigger("chosen:updated");
    $('#ddlCourse').trigger("chosen:updated");
    $('#ddlSemester').trigger("chosen:updated");
    $('#ddlSection').trigger("chosen:updated");
    $("input[name=operType]").val('M'); 
    $("input[name=sectionId]").val(editData.id);
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
        btnloading("SectionForm", 'show');
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: '/Master/SaveSectionDetails',
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("SectionForm", 'show');
                },
                success: function (data)
                {
                    btnloading("SectionForm", 'hide');
                    if (data.flag == "S")
                    {
                        $('#' + evt.id).trigger("reset");
                        $("#ddlActive").val(0);
                        $('#ddlCourse').val(0);
                        $('#ddlSemester').val(0);
                        $('#ddlSection').val(0);
                        $("#ddlActive").trigger("chosen:updated");
                        $('#ddlCourse').trigger("chosen:updated");
                        $('#ddlSemester').trigger("chosen:updated");
                        $('#ddlSection').trigger("chosen:updated");
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
                    btnloading("SectionForm", 'hide');
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