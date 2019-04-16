
var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$CourseDetails$"];
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

var gridDiv = document.querySelector('#coruseGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));

var isActiveData = ReadDropDownData("Param", '16', true);
var courseType = ReadDropDownData("Param", '17', true);
$.each(isActiveData, function (i, value)
{
    $('#ddlActive').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$.each(courseType, function (i, value) {
    $('#ddlCType').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$("#ddlActive").trigger("chosen:updated");
$("#ddlCType").trigger("chosen:updated");

function OnEditClick(obj)
{
    var editData = JSON.parse($(obj).attr('dataattr'));
    $('#ddlCType').val(editData.cTypeID);
    $("input[name=courseName]").val(editData.cnm);
    $("input[name=noOfSemester]").val(editData.nsem);
    $('#ddlActive').val(editData.isActive);
    $('#ddlActive').trigger("chosen:updated");
    $('#ddlCType').trigger("chosen:updated");
    $("input[name=flag]").val('M'); 
    $("input[name=courserId]").val(editData.id);
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
        debugger;
        btnloading("CourseForm", 'show');
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: '/Master/Course',
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("CourseForm", 'show');
                },
                success: function (data)
                {
                    btnloading("CourseForm", 'hide');
                    if (data.flag == "S")
                    {
                        $('#' + evt.id).trigger("reset");
                        $("#ddlActive").val(0);
                        $('#ddlCType').val(0);
                        $("#ddlActive").trigger("chosen:updated");
                        $("#ddlCType").trigger("chosen:updated");
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
                    btnloading("AcademicYear", 'hide');
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