debugger;
var grdArray;
var MyData = null;
var gridOptions = null;
var courseData, category, academic, gender, bloodGrp, hadicap, country, subject, preCourse, status, transport, hostel = null;

grdArray = GetReportConfiguration("Student");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$StudentDetails$"];
for (var i = 0; i < columnDefs.length; i++) {
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateEdit") {
            columnDefs[i].cellRenderer = this.CreateEdit;
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
    courseData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(courseData, function (i, value) {
        $("select[name='stuCourse']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='stuCourse']").trigger("chosen:updated")

    category = ReadDropDownData("Param", '13', true);
    $.each(category, function (i, value) {
        $("select[name='stuCategory']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuCategory']").trigger("chosen:updated")

    academic = ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false);
    $.each(academic, function (i, value) {
        $("select[name='stuAcade']").append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
    });
    $("select[name='stuAcade']").trigger("chosen:updated")

    gender = ReadDropDownData("Param", '12', true);
    $.each(gender, function (i, value) {
        $("select[name='empSex']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empSex']").trigger("chosen:updated")

    bloodGrp = ReadDropDownData("Param", '10', true);
    $.each(bloodGrp, function (i, value) {
        $("select[name='empBGrp']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='empBGrp']").trigger("chosen:updated")

    hadicap = ReadDropDownData("Param", '15', true);
    $.each(hadicap, function (i, value) {
        $("select[name='stuHandi']").append(new Option(value.PARAM_NAME, value.PARAM_ID, false, false));
    });
    $("select[name='stuHandi']").trigger("chosen:updated")

    country = ReadLocationData("Location", 1, "");
    $.each(country, function (i, value) {
        $("select[name='empCount']").append(new Option(value.LOCATION_NAME, value.LOCATION_ID, false, false));
    });
    $("select[name='empCount']").trigger("chosen:updated")

    subject = ReadDropDownData("Subject", $("#hfCustomerId").val(), false);
    $.each(subject, function (i, value) {
        $("select[name='empSub']").append(new Option(value.SUBJECT_NAME, value.SUBJECT_ID, false, false));
    });

    preCourse = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(preCourse, function (i, value) {
        $("select[name='stuPreCourse']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='stuPreCourse']").trigger("chosen:updated")

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
//gridOptions.api.sizeColumnsToFit();
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
        btnloading("StudentAdmi", 'show');
        setTimeout(function ()
        {
            $.ajax({
                type: "POST",
                url: "/Student/Admission",
                data: myData[0],
                beforeSend: function () {
                    btnloading("StudentAdmi", 'show');
                },
                success: function (data) {
                    btnloading("StudentAdmi", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        uploadImages();
                        getStudentDetails();
                        //this.resetData();
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("StudentAdmi", 'hide');
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
function getStudentDetails()
{
    $.get("/Student/GetStudentDetails", function (data) {
        MyData = JSON.parse(data.addParams);
        rowData = MyData; records = MyData.length;
        gridOptions.api.setRowData(((rowData == null) ? null : rowData));
        //this.setState({ rowData: MyData });
        //this.setState({ records: MyData.length })
    });
}