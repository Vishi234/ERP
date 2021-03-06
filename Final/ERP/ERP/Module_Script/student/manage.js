﻿
var grdArray;
var MyData = null;
var gridOptions = null;
var courseData, category, academic, gender, bloodGrp, hadicap, country, subject, preCourse, status, transport, hostel = null;

grdArray = GetReportConfiguration("Student");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$StudentDetails$"];
for (var i = 0; i < columnDefs.length; i++)
{
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateEdit") {
            columnDefs[i].cellRenderer = this.CreateEdit;
        }
    }
}
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
var gridDiv = document.querySelector('#studentGrid');
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

    category = ReadDropDownData("Param", '13', true);
    $.each(category, function (i, value) {
        $("select[name='stuCategory']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuCategory']").trigger("chosen:updated");


    $.each(category, function (i, value) {
        $("select[name='stuCategoryFilter']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuCategoryFilter']").trigger("chosen:updated");
    courseData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(courseData, function (i, value) {
        $("select[name='stuCourseFilter']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='stuCourseFilter']").trigger("chosen:updated")


    academic = ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false);
    $.each(academic, function (i, value) {
        $("select[name='stuAcade']").append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
    });
    $("select[name='stuAcade']").trigger("chosen:updated")

    courseData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(courseData, function (i, value) {
        $("select[name='stuCourse']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='stuCourse']").trigger("chosen:updated");


    //$("select[name='stuAcade']").change(function () {
    //     debugger;
    //    $("#stuCourse").empty();
    //    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    //    for (var i = 0; i < jsonData.length; i++) {
    //        if (jsonData[i].COURSE_ID == $("select[name='stuAcade']").val()) {
    //            $('#stuCourse').append(new Option("Select Course", 0, false, false));
    //            $("select[name='stuSemester']").append(new Option(jsonData[i].COURSE_NAME, jsonData[i].COURSE_ID, false, false));
    //        }
    //    }
    //    $("select[name='stuCourse']").trigger("chosen:updated");
    //});


    bloodGrp = ReadDropDownData("Param", '10', true);
    $.each(bloodGrp, function (i, value) {
        $("select[name='stuBGrp']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuBGrp']").trigger("chosen:updated")

    //locationData = ReadDropDownData("Location", $("#hfCustomerId").val(), false);
    //$.each(bloodGrp, function (i, value) {
    //    $("select[name='empBGrp']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    //});
    var sectionName = ReadDropDownData("Param", '3', true);
    $.each(sectionName, function (i, value) {            
        $('#ddlSection').append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("#ddlSection").trigger("chosen:updated");

    hadicap = ReadDropDownData("Param", '15', true);
    $.each(hadicap, function (i, value) {
        $("select[name='stuHandi']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuHandi']").trigger("chosen:updated")

    country= ReadLocationData("Location", 1, ""),
    $.each(country, function (i, value) {
        $("select[name='studCountry']").append(new Option(value.LOCATION_NAME, value.LOCATION_ID, false, false));
        });
    $("select[name='studCountry']").trigger("chosen:updated")
   
    subject = ReadDropDownData("Subject", $("#hfCustomerId").val(), false);
    $.each(subject, function (i, value) {
        $("select[name='empSub']").append(new Option(value.SUBJECT_NAME, value.SUBJECT_ID, false, false));
    });

    preCourse = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(preCourse, function (i, value) {
        $("select[name='stuPreCourse']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='stuPreCourse']").trigger("chosen:updated")

    studetGender = ReadDropDownData("Param", '12', true);
    $.each(studetGender, function (i, value) {
        $("select[name='stuSex']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuSex']").trigger("chosen:updated")

    //status = ReadDropDownData("Param", '1', true);
    //$.each(status, function (i, value) {
    //    $("select[name='empAccStat']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    //});
    //$("select[name='empAccStat']").trigger("chosen:updated")

    transport = ReadDropDownData("Param", '15', true);
    $.each(transport, function (i, value) {
        $("select[name='stuTrans']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuTrans']").trigger("chosen:updated")

    hostel = ReadDropDownData("Param", '15', true);
    $.each(hostel, function (i, value) {
        $("select[name='stuHostel']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuHostel']").trigger("chosen:updated")
}

$("select[name='studCountry']").change(function ()
{
    state= ReadLocationData("Location", 2, $("select[name='studCountry']").val()),
        $.each(state, function (i, value) {
        $("select[name='stuState']").append(new Option(value.LOCATION_NAME, value.LOCATION_ID, false, false));
        });
    $("select[name='stuState']").trigger("chosen:updated");
});
$("select[name='stuState']").change(function () {

    city= ReadLocationData("Location", 3, $("select[name='stuState']").val()),
        $.each(city, function (i, value) {
        $("select[name='stuCity']").append(new Option(value.LOCATION_NAME, value.LOCATION_ID, false, false));
        });
    $("select[name='stuCity']").trigger("chosen:updated");
});

$("select[name='stuCourse']").change(function ()
{
    debugger;
    $("#stuSemester").empty();
    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].COURSE_ID == $("select[name='stuCourse']").val())
        {
            $('#stuSemester').append(new Option("Select Semester", 0, false, false));
            $("select[name='stuSemester']").append(new Option(jsonData[i].NO_OF_SEMESTER, jsonData[i].NO_OF_SEMESTER, false, false));
        }
    }
    $("select[name='stuSemester']").trigger("chosen:updated");
});

$("select[name='stuHostel']").change(function ()
{
    if ($("select[name='stuHostel']").val() == 68)
    {
        $("select[name='stuHostelName']").prop("disabled", false);
        $("select[name='stuHostelFlr']").prop("disabled", false);
        $("select[name='stuRoomTyp']").prop("disabled", false);
        $("input[name='stuRoomNo']").prop("disabled", false);
        $("input[name='stuBedNo']").prop("disabled", false);
        $("input[name='stuHostPrc']").prop("disabled", false);
    }
    else
    {
        $("select[name='stuHostelName']").prop("disabled", true);
        $("select[name='stuHostelFlr']").prop("disabled", true);
        $("select[name='stuRoomTyp']").prop("disabled", true);
        $("input[name='stuRoomNo']").prop("disabled", true);
        $("input[name='stuBedNo']").prop("disabled", true);
        $("input[name='stuHostPrc']").prop("disabled", true);
    }
});

$("select[name='stuCourse']").change(function ()
{
    var subjectDetails = ReadDropDownData("Subject", $("#hfCustomerId").val(), false);
    $('.lwms-available').empty();
   $.each(subjectDetails, function (i, value)
   {
       $('.lwms-available').append("<li class='lwms-selectli' data- value=" + value.SUBJECT_ID + ">" + value.SUBJECT_NAME + "</li>");
   });

});

$("input[name='stuEmail']").keyup(function ()
{
   
    var dInput = this.value;
    var bool = (validateEmail(dInput));
    //debugger;

})

function handleSubmit(evt)
{
    if (ValidateFields(evt)) {
        var myData = [];
        var obj = {};
        $("#" + evt.id + " select, input,password").each(function (i, data) {
            obj[data.name] = data.value;
        });
        myData.push(obj);
        btnloading("StudentAdmi", 'show');

        setTimeout(function () {
            $.ajax({
                type: "POST",
                url: "/Student/Admission",
                data: myData[0],
                async: false,
                beforeSend: function () {
                    btnloading("StudentAdmi", 'show');
                },



                success: function (data) {
                    btnloading("StudentAdmi", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S")
                    {
                        debugger;
                       // $('#' + evt.id).trigger("reset");
                        uploadImages();                      
                        getStudentDetails();
                        resetData();
                        //$('.close').trigger('click');
                    }
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    btnloading("AcademicYear", 'hide');
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
function resetData(){
    $("select[name=stuAcade]").val(0);
    $("select[name=stuCourse]").val(0);
    $("select[name=stuSemester]").val(0);
    $("select[name=stuCategory]").val(0);
    $("select[name=stuBGrp]").val(0);
    $("select[name=stuHandi]").val(0);
    $("select[name=studCountry]").val(0);
    $("select[name=stuState]").val(0);
    $("select[name=stuCity]").val(0);
    $("select[name=stuBoard]").val(0);
    $("select[name=stuPreCourse]").val(0);
    $("select[name=stuAccStat]").val(0);
    $("select[name=stuTrans]").val(0);
    $("select[name=stuRoute]").val(0);
    $("select[name=stuVehTyp]").val(0);
    $("select[name=stuVehStop]").val(0);
    $("select[name=stuHostel]").val(0);
    $("select[name=stuHostelName]").val(0);
    $("select[name=stuHostelFlr]").val(0);
    $("select[name=stuRoomTyp]").val(0);
    $("select[name=stuSex]").val(0);
    $("select[name=sectionName]").val(0);

    $("select[name=stuAcade]").trigger("chosen:updated")
    $("select[name=stuCourse]").trigger("chosen:updated")
    $("select[name=stuSemester]").trigger("chosen:updated")
    $("select[name=stuCategory]").trigger("chosen:updated")
    $("select[name=stuBGrp]").trigger("chosen:updated")
    $("select[name=stuHandi]").trigger("chosen:updated")
    $("select[name=studCountry]").trigger("chosen:updated")
    $("select[name=stuState]").trigger("chosen:updated")
    $("select[name=stuCity]").trigger("chosen:updated")
    $("select[name=stuBoard]").trigger("chosen:updated")
    $("select[name=stuPreCourse]").trigger("chosen:updated")
    $("select[name=stuAccStat]").trigger("chosen:updated")
    $("select[name=stuTrans]").trigger("chosen:updated")
    $("select[name=stuRoute]").trigger("chosen:updated")
    $("select[name=stuVehTyp]").trigger("chosen:updated")
    $("select[name=stuVehStop]").trigger("chosen:updated")
    $("select[name=stuHostel]").trigger("chosen:updated")
    $("select[name=stuHostelName]").trigger("chosen:updated")
    $("select[name=stuHostelFlr]").trigger("chosen:updated")
    $("select[name=stuRoomTyp]").trigger("chosen:updated")
    $("select[name=stuSex]").trigger("chosen:updated")
    $("select[name=sectionName]").trigger("chosen:updated")



}

//function getStudentDetails(stuCode, stuName) {
//    debugger; 
//    $.get("/Student/GetStudentDetails?stuCode=" + stuCode + " &stuFirst=" + stuName, function (data) {
//        MyData = JSON.parse(data.addParams);
//        this.setState({ rowData: MyData });
//        this.setState({ records: MyData.length })
//    });
//}

//reset fom elements on click of add after editing records
$('.custom').click(function ()
{
    $('#StudentAdmi').trigger("reset");
    $("#ddlActive").val(0);
    $("#ddlActive").trigger("chosen:updated");
});


$('.exportToExcel').click(function ()
{

    MyData = ((MyData == null) ? rowData : MyData);
    exportToExcel(MyData, 'student', columnDefs);
});


function OnEditClick(obj)
{

    $('#student').modal("show");
    var editData = JSON.parse($(obj).attr('dataattr'));

    $("select[name=studCountry]").val(1);

    var jsonData = ReadLocationData("Location", 2, 1);
    obj = [];
    $("select[name='stuState']").empty();
    $("select[name='stuCity']").empty();
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].LOCATION_ID == editData.state) {
            gridData = {};
            gridData.STATE_ID = jsonData[i].LOCATION_ID;
            gridData.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(gridData);
            $("select[name='stuState']").append(new Option(gridData.STATE_NAME, gridData.STATE_ID, false, false));
        }

    }
    var jsonData = ReadLocationData("Location", 3, editData.state);
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].LOCATION_ID == editData.city) {
            gridData = {};
            gridData.CITY_ID = jsonData[i].LOCATION_ID;
            gridData.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(gridData);
            $("select[name='stuCity']").append(new Option(gridData.CITY_NAME, gridData.CITY_ID, false, false));
        }
    }

    $("select[name='stuSemester']").empty();
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_ID == editData.courseId) {
               // $('#stuSemester').append(new Option("Select Semester", 0, false, false));
                $("select[name='stuSemester']").append(new Option(jsonData[i].NO_OF_SEMESTER, jsonData[i].NO_OF_SEMESTER, false, false));
            }
        }
    $("select[name='stuSemester']").trigger("chosen:updated");

    debugger;
        var subjectDetails = ReadDropDownData("Subject", $("#hfCustomerId").val(), false);
    for (var i = 0; i < subjectDetails.length; i++) {
        if (subjectDetails[i].SUBJECT_ID == editData.subject) {
                $('.lwms-available').empty();
                $('.lwms-available').append("<li class='lwms-selectli' data- value=" + value.SUBJECT_ID + ">" + value.SUBJECT_NAME + "</li>");
            }
        }
    $("select[name='subjectDetails']").trigger("chosen:updated");

    $("input[name=stuCode]").val(editData.stuCode);
    $("input[name=stuFirst]").val(editData.stufname);
    $("input[name=stuLast]").val(editData.lname);
    $("select[name=stuAcade]").val(editData.acedeYearID); $("select[name=stuCourse]").val(editData.courseId);
    $("select[name=stuCategory]").val(editData.categoryID);
    $("input[name=stuFather]").val(editData.fName); $("input[name=stuMother]").val(editData.mName);
    $("select[name=stuSex]").val(editData.genderID); $("input[name=stuDOB]").val(editData.dob);
    $("select[name=stuBGrp]").val(editData.bldGrpID); $("input[name=stuNation]").val(editData.nation);
    $("input[name=stuMTongue]").val(editData.mTongue);$("input[name=stuBirPlace]").val(editData.placeBirth);
    $("select[name=stuHandi]").val(editData.handicapID); $("input[name=stuPIncome]").val(editData.pIncome);
    $("input[name=stuAdres]").val(editData.addressLine1); $("input[name=stuAdres2]").val(editData.addressLine2);
    $("input[name=stuZip]").val(editData.zpCode);
    $("input[name=stuMobile]").val(editData.mobile); $("input[name=stuPhone]").val(editData.pnNo);
    $("input[name=stuEmail]").val(editData.email); $("input[name=stuInst]").val(editData.instName);
    $("select[name=stuBoard]").val(editData.BOARD); $("select[name=stuPreCourse]").val(editData.preCourse);
    $("input[name=stuComplYear]").val(editData.YEAR); $("input[name=stuMarks]").val(editData.MARKS);
    $("input[name=stuPercent]").val(editData.percentage);
    $("input[name=stuLogin]").val(editData.login).attr('disabled', true);
    $("input[name=stuPwd]").val(editData.password); $("input[name=stuCPwd]").val(editData.password);
    $("select[name=stuAccStat]").val(0); $("select[name=stuTrans]").val(0);
    $("select[name=stuRoute]").val(0); $("select[name=stuVehTyp]").val(0);
    $("select[name=stuVehNo]").val(0); $("input[name=stuVecAmt]").val(0);
    $("select[name=stuVehStop]").val(0); $("input[name=stuHostel]").val(0);
    $("select[name=stuHostelName]").val(0); $("select[name=stuHostelFlr]").val(0);
    $("select[name=stuRoomTyp]").val(0); $("input[name=stuRoomNo]").val('dummy');
    $("input[name=stuBedNo]").val('dummy'); $("input[name=stuHostPrc]").val('dummy');
    $("select[name=sectionName]").val(editData.sectionID);
    $("select[name=sectionName]").trigger("chosen:updated");
    $("select[name=stuAccStat]").trigger("chosen:updated");
    $("select[name=stuTrans]").trigger("chosen:updated");
    $("select[name=stuRoute]").trigger("chosen:updated");
    $("select[name=stuVehTyp]").trigger("chosen:updated");
    $("select[name=stuVehNo]").trigger("chosen:updated");
    $("select[name=stuVehStop]").trigger("chosen:updated");
    $("select[name=stuHostel]").trigger("chosen:updated");
    $("select[name=stuHostelName]").trigger("chosen:updated");
    $("select[name=stuHostelFlr]").trigger("chosen:updated");
    $("select[name=stuRoomTyp]").trigger("chosen:updated");


    $("select[name=stuAcade]").trigger("chosen:updated");
    $("select[name=stuCourse]").trigger("chosen:updated");
    $("select[name=stuSemester]").trigger("chosen:updated");
    $("select[name=stuCategory]").trigger("chosen:updated");
    $("select[name=stuSex]").trigger("chosen:updated");
    $("select[name=stuBGrp]").trigger("chosen:updated");
    $("select[name=stuHandi]").trigger("chosen:updated");
    $("select[name=studCountry]").trigger("chosen:updated");
    $("select[name=stuState]").trigger("chosen:updated");
    $("select[name=stuCity]").trigger("chosen:updated");
    $("select[name=stuPreCourse]").trigger("chosen:updated");
    $("select[name=stuBoard]").trigger("chosen:updated");


}

function uploadImages(input)
{
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#userImg')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);
    }  
    test = new FormData();
    test.append('file', $('#uploadedImg')[0].files[0]);

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
         //   alert('Error! Please try again');
        }
    })
}
function getStudentDetails()
{
    btnloading("filterStudents", 'show');
    $.get("/Student/GetStudentDetails", function (data) {
        MyData = JSON.parse(data.addParams);
        rowData = MyData; records = MyData.length;
        gridOptions.api.setRowData(((rowData == null) ? null : rowData));
        //this.setState({ rowData: MyData });
        //this.setState({ records: MyData.length })
    });
}

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

function getStudentFilter(stuCode, stuFirst, stuCourse, stuCategory) {
    debugger;
    $.get("/Student/GetStudentFilter?stuCode=" + stuCode + " &stuFirst=" + stuFirst + "&stuCourse=" + stuCourse + "&stuCategory=" + stuCategory, function (data) {
        debugger;
            var rowData = JSON.parse(data.addParams);
            gridOptions = GridInitializer(columnDefs);
            var gridDiv = document.querySelector('#studentGrid');
            $("#studentGrid").empty();
            new agGrid.Grid(gridDiv, gridOptions);
            gridOptions.api.setRowData(((rowData == null) ? null : rowData));    
    });
}
function onExportClick() {
    exportToExcel(rowData, "StudentExport", columnDefs)
}
function resetFilter() {
    debugger;
    $("input:text").val("");
    $('#stuCourseFilter').val(0);
    $('#stuCategoryFilter').val(0);
    $("#stuCourseFilter").trigger("chosen:updated");
    $("#stuCategoryFilter").trigger("chosen:updated");
}