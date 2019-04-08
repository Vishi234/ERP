﻿var grdArray;
var MyData = null;
var typeGridOptions = null;
var dtGridOptions = null;
var payType, month, active, academicYear, course, feeType, mediumStru = null;
grdArray = GetReportConfiguration("FeeManagement");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$FeeType$"];
var records = JSON.parse(content.addParams);
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
typeGridOptions = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#typeGrid');
new agGrid.Grid(gridDiv, typeGridOptions);
typeGridOptions.api.setRowData(((rowData == null) ? null : rowData));
typeGridOptions.api.sizeColumnsToFit();

columnDefs = grdArray["$FeeMapping$"];
for (var i = 0; i < columnDefs.length; i++) {
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateTextBox") {
            columnDefs[i].cellRenderer = this.CreateTextBox;
        }
    }
}
dtGridOptions = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#feeDtlGrid');
new agGrid.Grid(gridDiv, dtGridOptions);
dtGridOptions.api.setRowData(null);



function OnEditClick(obj) {
    debugger;
    var editData = JSON.parse($(obj).attr('dataattr'));
    $("input[name=typeid]").val(editData.id);
    $("input[name=feeName]").val(editData.feeName);
    $("select[name=paymentType]").val(editData.pType);
    $("select[name=paymentType]").trigger("chosen:updated");
    $("select[name=feePeriod]").val(editData.month);
    $("select[name=feePeriod]").trigger("chosen:updated");
    $("input[name=feeDesc]").val(editData.descrip);
    $("select[name=isActive]").val(editData.isActive);
    $("select[name=isActive]").trigger("chosen:updated");
    $("input[name=flag]").val('M');
}
function CreateEdit(params) {
    var html = "";
    var domElement = "";
    var jsonObj = JSON.stringify(params.data);
    html = "<div><a class='testClass' onclick='OnEditClick(this);' href='javascript:void(0)' dataAttr='" + jsonObj + "'><img class='editbtn' src='/Images/icons/edit.svg'/></a></div>";
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
function TypeSubmit(evt) {

    debugger;
    if (ValidateFields(evt)) {
        var myData = [];
        var obj = {};
        $("#" + evt.id + " select, input").each(function (i, data) {
            if ($(data).attr("name") == "feePeriod") {
                obj[data.name] = (($(data).val() != "") ? $(data).val().join(",") : "");
            }
            else {
                obj[data.name] = $(data).val();
            }
        });
        myData.push(obj);
        btnloading("FeeType", 'show');
        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: '/Fee/AddFeeType',
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("FeeType", 'show');
                },
                success: function (data) {
                    btnloading("FeeType", 'hide');
                    if (data.flag == "S") {
                        $('#' + evt.id).trigger("reset");
                        $("input[name=typeid]").val("");
                        $("input[name=feeName]").val("");
                        $("select[name=paymentType]").val(0);
                        $("select[name=paymentType]").trigger("chosen:updated");
                        $("select[name=feePeriod]").val("");
                        $("select[name=feePeriod]").trigger("chosen:updated");
                        $("input[name=feeDesc]").val("");
                        $("select[name=isActive]").val(0);
                        $("select[name=isActive]").trigger("chosen:updated");
                        $("input[name=flag]").val('A');

                        CallToast(data.msg, data.flag);
                        MyData = JSON.parse(data.addParams);
                        rowData = MyData; records = MyData.length;
                        typeGridOptions.api.setRowData(((rowData == null) ? null : rowData));
                    }
                    else {
                        CallToast(data.msg, data.flag);
                    }
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    btnloading("FeeType", 'hide');
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
function InitializeDDL() {
    payType = ReadDropDownData("Param", '20', true);
    $.each(payType, function (i, value) {
        $("select[name='paymentType']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='paymentType']").trigger("chosen:updated")

    month = ReadDropDownData("Param", '21', true);
    $.each(month, function (i, value) {
        $("select[name='feePeriod']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='feePeriod']").trigger("chosen:updated");

    active = ReadDropDownData("Param", '16', true);
    $.each(active, function (i, value) {
        $("select[name='isActive']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='isActive']").trigger("chosen:updated");

    academicYear = ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false);
    $.each(academicYear, function (i, value) {
        $("select[name='academicYear']").append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
    });
    $("select[name='academicYear']").trigger("chosen:updated");

    course = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(course, function (i, value) {
        $("select[name='courseId']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='courseId']").trigger("chosen:updated");
}
function ShowFeeDetails(evt) {
    if (ValidateFields(evt)) {
        var myData = [];
        var obj = {};
        $("#" + evt.id + " select, input").each(function (i, data) {
            obj[data.name] = $(data).val();
        });
        obj["reportMapId"] = "11";
        myData.push(obj);
        Show(myData)
    }
    else {
        return false;
    }
    return false;

}
function Show(myData) {
    btnloading("FeeDetail", 'show');
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: '/Fee/ShowFeeDetails',
            data: myData[0],
            async: false,
            beforeSend: function () {
                btnloading("FeeDetail", 'show');
            },
            success: function (data) {
                btnloading("FeeDetail", 'hide');
                debugger;
                if (data.addParams != null) {
                    MyData = JSON.parse(data.addParams);
                    $("#feeDtlGrid").css("display", "block");
                    rowData = MyData;
                    records = MyData.length;
                    dtGridOptions.api.setRowData(((rowData == null) ? null : rowData));
                    dtGridOptions.api.sizeColumnsToFit();
                }
                else {
                    MyData = null;
                    $("#feeDtlGrid").css("display", "block");
                    rowData = MyData;
                    dtGridOptions.api.setRowData(((rowData == null) ? null : rowData));
                    dtGridOptions.api.sizeColumnsToFit();
                }

            }.bind(this),
            error: function (e) {
                console.log(e);
                btnloading("FeeDetail", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
}

function CreateTextBox(params) {
    var html = "";
    var domElement = "";
    var input = document.createElement("input");
    input.className = "form-control";
    input.style = "height: 29px;margin-top: 3px;border-radius: 4px;width: 60%;";
    input.value = params.data.amt;
    domElement = document.createElement("div");
    domElement.appendChild(input);
    input.addEventListener("blur", function (evt) {
        params.data.amt = evt.target.value;
    })
    return domElement;
}
function GetRowData(evt) {
    let rowData = [];
    dtGridOptions.api.forEachNode(node => rowData.push(node.data));
    var obj = {
        record: JSON.stringify(rowData)
    }
    btnloading("SaveDetails", 'show');
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: '/Fee/SaveFeeDetails',
            data: obj,
            async: false,
            beforeSend: function () {
                btnloading("SaveDetails", 'show');
            },
            success: function (data) {
                btnloading("SaveDetails", 'hide');
                CallToast(data.msg, data.flag);
                $("#FeeDetail").submit();
            }.bind(this),
            error: function (e) {
                btnloading("SaveDetails", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
    return false;
}