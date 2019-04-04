
var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$SubjectDetails$"];
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
var gridDiv = document.querySelector('#subjectGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
gridOptions.api.sizeColumnsToFit();
debugger;
var isActiveData = ReadDropDownData("Param", '16', true);
var medium= ReadDropDownData("Param", '18', true);
var subjectType=ReadDropDownData("Param", '19', true);
$.each(isActiveData, function (i, value)
{
    $('#ddlActive').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$.each(medium, function (i, value) {
    $('#ddlMedium').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});
$.each(subjectType, function (i, value) {
    $('#ddlSubType').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
});

$("#ddlActive").trigger("chosen:updated");
$("#ddlMedium").trigger("chosen:updated");
$("#ddlSubType").trigger("chosen:updated");

function OnEditClick(obj)
{
    
    var editData = JSON.parse($(obj).attr('dataattr'));
    $("input[name=subjectCode]").val(editData.scde);
    $("input[name=subjectName]").val(editData.snm);
    $("input[name=shortName]").val(editData.ssnm);
    $('#ddlMedium').val(editData.smedID);
    $('#ddlSubType').val(editData.stypId);
    $('#ddlActive').val(editData.isActive);
    $('#ddlMedium').trigger("chosen:updated");
    $('#ddlSubType').trigger("chosen:updated");
    $('#ddlActive').trigger("chosen:updated");
    $("input[name=flag]").val('M'); 
    $("input[name=subjectId]").val(editData.id);
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
        btnloading("SubjectForm", 'show');
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: '/Master/Subject',
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("SubjectForm", 'show');
                },
                success: function (data)
                {
                    btnloading("SubjectForm", 'hide');
                    if (data.flag == "S")
                    {
                        $('#' + evt.id).trigger("reset");
                        $("#ddlMedium").val(0);
                        $("#ddlSubType").val(0);
                        $("#ddlActive").val(0);
                        $('#ddlMedium').trigger("chosen:updated");
                        $('#ddlSubType').trigger("chosen:updated");
                        $('#ddlActive').trigger("chosen:updated");
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
                    btnloading("SubjectForm", 'hide');
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