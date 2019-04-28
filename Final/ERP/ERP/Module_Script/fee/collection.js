var grdArray;
var MyData = null;
var feeWiseGrid = null;
var billWiseGrid = null;
grdArray = GetReportConfiguration("FeeManagement");
var columnDefs = grdArray["$FeeCollectionReport$"];

feeWiseGrid = GridInitializer(columnDefs);
billWiseGrid = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#feeWiseGrid');
new agGrid.Grid(gridDiv, feeWiseGrid);
feeWiseGrid.api.setRowData(null);
feeWiseGrid.api.sizeColumnsToFit();

var gridDiv = document.querySelector('#billWiseGrid');
new agGrid.Grid(gridDiv, billWiseGrid);
billWiseGrid.api.setRowData(null);
billWiseGrid.api.sizeColumnsToFit();

BindSelect();
function BindSelect() {
    academicYear = ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false);
    $.each(academicYear, function (i, value) {
        $("select[name='acYear']").append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
        $("select[name='bacYear']").append(new Option(value.ACADEMIC_YEAR, value.YEAR_ID, false, false));
    });
    $("select[name='acYear']").trigger("chosen:updated");
    $("select[name='bacYear']").trigger("chosen:updated");
    course = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $.each(course, function (i, value) {
        $("select[name='course']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
        $("select[name='bcourse']").append(new Option(value.COURSE_NAME, value.COURSE_ID, false, false));
    });
    $("select[name='course']").trigger("chosen:updated");
    $("select[name='bcourse']").trigger("chosen:updated");
    feeName = ReadDropDownData("FeeName", $("#hfCustomerId").val(), false);
    $.each(feeName, function (i, value) {
        $("select[name='feeType']").append(new Option(value.FEE_NAME, value.ID, false, false));
    });
    $("select[name='feeType']").trigger("chosen:updated");
}
$("select[name='bcourse']").change(function () {
    $("select[name='bsemester']").empty();
    var selectedCourse = $("select[name='bcourse']").val();
    var obj = [];
    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $("select[name='bsemester']").append(new Option("Select Semester", 0, false, false));
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
        $("select[name='bsemester']").append(new Option(data.NO_SEMESTER, data.NO_SEMESTER, false, false));
    }
    $("select[name='bsemester']").trigger("chosen:updated");
});
$("select[name='course']").change(function () {
    $("select[name='semester']").empty();
    $("select[name='semester']").empty();
    var selectedCourse = $("select[name='course']").val();
    var obj = [];
    var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
    $("select[name='semester']").append(new Option("Select Semester", 0, false, false));
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
        $("select[name='semester']").append(new Option(data.NO_SEMESTER, data.NO_SEMESTER, false, false));
    }
    $("select[name='semester']").trigger("chosen:updated");
});
function GetFeeWiseReport(evt, reportType) {
    obj =
        {
            acYear: $("select[name='acYear']").val(),
            course: $("select[name='course']").val(),
            semester: $("select[name='semester']").val(),
            feeType: $("select[name='feeType']").val(),
            reportType: reportType,
            reportId: 15
        }
    btnloading("FeeWise", 'show');
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: '/Fee/GetFeeCollectionReport',
            data: obj,
            async: false,
            beforeSend: function () {
                btnloading("FeeWise", 'show');
            },
            success: function (data) {
                btnloading("FeeWise", 'hide');
                console.log(data.addParams);
                if (data.addParams != null) {
                    MyData = JSON.parse(data.addParams);
                    feeWiseGrid.api.setRowData(((MyData == null) ? null : MyData));
                    feeWiseGrid.api.sizeColumnsToFit();
                }
                else {
                    MyData = null;
                    feeWiseGrid.api.setRowData(((MyData == null) ? null : MyData));
                    feeWiseGrid.api.sizeColumnsToFit();
                }

            }.bind(this),
            error: function (e) {
                console.log(e);
                btnloading("FeeWise", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
    return false;
}
function GetBillWiseReport(evt, reportType) {
    obj =
        {
            acYear: $("select[name='bacYear']").val(),
            course: $("select[name='bcourse']").val(),
            semester: $("select[name='bsemester']").val(),
            feeType: "0",
            reportType: reportType,
            reportId: 15
        }
    btnloading("BillWise", 'show');
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: '/Fee/GetFeeCollectionReport',
            data: obj,
            async: false,
            beforeSend: function () {
                btnloading("BillWise", 'show');
            },
            success: function (data) {
                btnloading("BillWise", 'hide');
                if (data.addParams != null) {
                    MyData = JSON.parse(data.addParams);
                    billWiseGrid.api.setRowData(((MyData == null) ? null : MyData));
                    billWiseGrid.api.sizeColumnsToFit();
                }
                else {
                    MyData = null;
                    billWiseGrid.api.setRowData(((MyData == null) ? null : MyData));
                    billWiseGrid.api.sizeColumnsToFit();
                }

            }.bind(this),
            error: function (e) {
                console.log(e);
                btnloading("BillWise", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
    return false;
}