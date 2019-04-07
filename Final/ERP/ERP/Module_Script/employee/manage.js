
var grdArray;
var MyData = null;
var gridOptions = null;
var courseData, category, academic, gender, bloodGrp, hadicap, country, subject, preCourse, status, transport, hostel = null;

grdArray = GetReportConfiguration("Employee");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$EmployeeDetails$"];
for (var i = 0; i < columnDefs.length; i++) {
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateEdit") {
            columnDefs[i].cellRenderer = this.CreateEdit;
        }
    }
}
gridOptions = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#employeeGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
gridOptions =
    {
        onGridReady: function (params) {
            var allColumnIds = [];
            gridOptions.columnApi.getAllColumns().forEach(function (column) {
                allColumnIds.push(column.colId);
            });
            gridOptions.columnApi.autoSizeColumns(allColumnIds);
        }
    }
InitializeDDL();
function InitializeDDL() {

    var empDept = ReadDropDownData("Department", $("#hfCustomerId").val(), false);
    $.each(empDept, function (i, value) {
        $("select[name='empDept']").append(new Option(value.DEPT_NAME, value.DEPT_ID, false, false));
    });
    $("select[name='empDept']").trigger("chosen:updated")

    var empType = ReadDropDownData("Param", '9', true);
    $.each(empType, function (i, value) {
        $("select[name='empType']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empType']").trigger("chosen:updated")

    var empSex = ReadDropDownData("Param", '12', true);
    $.each(empSex, function (i, value) {
        $("select[name='empSex']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empSex']").trigger("chosen:updated")

    empBGrp = ReadDropDownData("Param", '10', true);
    $.each(empBGrp, function (i, value) {
        $("select[name='empBGrp']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empBGrp']").trigger("chosen:updated")

    empMStat = ReadDropDownData("Param", '11', true);
    $.each(empMStat, function (i, value) {
        $("select[name='empMStat']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empMStat']").trigger("chosen:updated")
    empSub = ReadDropDownData("Subject", $("#hfCustomerId").val(), false);
    $.each(empSub, function (i, value) {
        $("select[name='empSub']").append(new Option(value.SUBJECT_NAME, value.SUBJECT_ID, false, false));
    });
    $("select[name='empSub']").trigger("chosen:updated")

    empRole = ReadDropDownData("Param", '8', true);
    $.each(empRole, function (i, value) {
        $("select[name='empRole']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empRole']").trigger("chosen:updated")

    empAccStat = ReadDropDownData("Param", '1', true);
    $.each(empAccStat, function (i, value) {
        $("select[name='empAccStat']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empAccStat']").trigger("chosen:updated")




    empCount = ReadLocationData("Location", 1, "");
    $.each(empCount, function (i, value) {
        $("select[name='empCount']").append(new Option(value.LOCATION_NAME, value.LOCATION_ID, false, false));
    });
    $("select[name='empCount']").trigger("chosen:updated")

    $("select[name='empCount']").change(function () {
        var obj = [];
        $("select[name='empState']").empty();
        $("select[name='empState']").append(new Option("Select State", 0, false, false));
        var selectedCountry = $("select[name='empCount']").val();
        var jsonData = ReadLocationData("Location", 2, selectedCountry);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.STATE_ID = jsonData[i].LOCATION_ID;
            data.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
            $("select[name='empState']").append(new Option(data.STATE_NAME, data.STATE_ID, false, false));
        }
        $("select[name='empState']").trigger("chosen:updated");
    });

    $("select[name='empState']").change(function () {
        var obj = [];
        $("select[name='empCity']").empty();
        $("select[name='empCity']").append(new Option("Select City", 0, false, false));
        var selectedstate = $("select[name='empState']").val();
        var jsonData = ReadLocationData("Location", 3, selectedstate);

        for (var i = 0; i < jsonData.length; i++) { 
            data = {};
            data.CITY_ID = jsonData[i].LOCATION_ID;
            data.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
            $("select[name='empCity']").append(new Option(data.CITY_NAME, data.CITY_ID, false, false));
        }
        $("select[name='empCity']").trigger("chosen:updated");

    });


}
//gridOptions.api.sizeColumnsToFit();
function handleSubmit(evt)
{
    debugger;
    if (ValidateFields(evt))
    {
        var myData = [];
        var obj = {};
        $("#" + evt.id + " select, input").each(function (i, data) {
            obj[data.name] = data.value;
        });

        myData.push(obj);
        btnloading("EmpRegis", 'show');
        setTimeout(function ()
        {
            $.ajax({
                type: "POST",
                url: "/Employee/Registration",
                data: myData[0],
                beforeSend: function () {
                    btnloading("EmpRegis", 'show');
                },
                success: function (data) {
                    btnloading("EmpRegis", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        uploadImages();
                        getStudentDetails();
                        //this.resetData();
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("EmpRegis", 'hide');
                    alert('Error! Please try again');
                }
            })
            //e.preventDefault();
        }, 500)
    }
}
function uploadImages()
{
    $.ajax({
        type: "POST",
        url: "../../Handlers/UploadImages.ashx",
        dataType: "json",
        contentType: false,
        processData: false,
        data: test,
        async: false,
        success: function (data) {
            alert("done");
        },
        error: function (evt) {
            btnloading("StuRegis", 'hide');
            alert('Error! Please try again');
        }
    })
}
//function getStudentDetails()
//{
//    $.get("/Student/GetStudentDetails", function (data) {
//        MyData = JSON.parse(data.addParams);
//        rowData = MyData; records = MyData.length;
//        gridOptions.api.setRowData(((rowData == null) ? null : rowData));
//        //this.setState({ rowData: MyData });
//        //this.setState({ records: MyData.length })
//    });
//}

function CreateEdit(params) {
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
function OnEditClick(obj) {
    empCount = 1;
    debugger;
    var editData = JSON.parse($(obj).attr('dataattr'));
    $("select[name=empCount]").val(1);

    var jsonData = ReadLocationData("Location", 2, 1);
    obj = [];
    $("select[name='empState']").empty();
    $("select[name='empCity']").empty();
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].LOCATION_ID == editData.state) {
            gridData = {};
            gridData.STATE_ID = jsonData[i].LOCATION_ID;
            gridData.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(gridData);
            $("select[name='empState']").append(new Option(gridData.STATE_NAME, gridData.STATE_ID, false, false));
        }
        
    }
    var jsonData = ReadLocationData("Location", 3, editData.state);
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].LOCATION_ID == editData.city) {
            gridData = {};
            gridData.CITY_ID = jsonData[i].LOCATION_ID;
            gridData.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(gridData);
            $("select[name='empCity']").append(new Option(gridData.CITY_NAME, gridData.CITY_ID, false, false));
        }
    }
  

   // $("input[name=courseName]").val(editData.cnm);
    $("input[name=empEmail]").val(editData.email);
    $("input[name=empCode]").val(editData.empCode);
    $("input[name=empFirst]").val(editData.empfname);
    $("input[name=empLast]").val(editData.lname);
    $("input[name=empQuali]").val(editData.qual);
    $("select[name=empDept]").val(editData.deptId);
    $("select[name=empDesig]").val(editData.desigId);
    $("select[name=empType]").val(editData.empTpId);
    $("select[name=empJType]").val(editData.empJTpId);
    $("input[name=empFather]").val(editData.fName);
    $("input[name=empMother]").val(editData.mName);
    $("select[name=empSex]").val(editData.sex);
    $("input[name=empDOB]").val(editData.dob);
    $("input[name=empDOJ]").val(editData.doj);
    $("input[name=empSpoou]").val(editData.spName);
    $("select[name=empBGrp]").val(editData.bldGrp);
    $("select[name=empMStat]").val(editData.mStatus);
    $("input[name=empNation]").val(editData.nationality);
    $("input[name=empAdres]").val(editData.addressLine1);
    $("input[name=empAdres2]").val(editData.addressLine2);
    $("input[name=empMobile]").val(editData.mobile);
    $("input[name=empPhone]").val(editData.pnNo);
    $("input[name=empZip]").val(editData.zpCode);
    $("input[name=preEmp]").val(editData.employer);
    $("input[name=preDOJ]").val(editData.lDOJ);
    $("input[name=preDOL]").val(editData.lDOL);
    $("input[name=prePhone]").val(editData.lPhoneNo);
    $("input[name=empExpre]").val(editData.totalExp);
    $("input[name=empResLeav]").val(editData.resLeaving);
    $("input[name=preSal]").val(editData.lastSalary);
    $("input[name=empSub]").val(editData.sbjct);
    $("input[name=empBank]").val(editData.bankName);
    $("input[name=empAccNo]").val(editData.accNo);
    $("input[name=empIFSC]").val(editData.ifsCode);
    $("input[name=empAdhar]").val(editData.adNo);
    $("input[name=empPF]").val(editData.pfNumber);
    $("input[name=empSalary]").val(editData.anPckg);
    $("input[name=empLogin]").val(editData.loginId);
    $("input[name=empPwd]").val(editData.pass);
    $("input[name=empCPwd]").val(editData.pass);


    $("select[name=empDept]").trigger("chosen:updated");
    $("select[name=empDesig]").trigger("chosen:updated");
    $("select[name=empType]").trigger("chosen:updated");
    $("select[name=empJType]").trigger("chosen:updated");
    $("select[name=empCount]").trigger("chosen:updated");
    $("select[name=empState]").trigger("chosen:updated");
    $("select[name=empCity]").trigger("chosen:updated");


    $("select[name=empSex]").trigger("chosen:updated");
    $("select[name=empBGrp]").trigger("chosen:updated");
    $("select[name=empMStat]").trigger("chosen:updated");
    $("select[name=empState]").trigger("chosen:updated");
    $("select[name=empCity]").trigger("chosen:updated");
}