
function ValidateFields(evt) {
    debugger;
    boolFlag = false;
    $("#" + evt.id + " select, input").each(function (i, data) {
        if (data.tagName == 'INPUT') {
            if (data.hasAttribute('isRequired')) {
                if (data.value == "") {
                    data.classList.add("input-validation-error");
                    data.nextElementSibling.classList.add("field-validation-error");
                    data.nextElementSibling.textContent = "Required";
                    boolFlag = true;
                } else {
                    if (!($.isNumeric(data.value)) && data.hasAttribute('isNumeric')) {
                        data.classList.add("input-validation-error");
                        data.nextElementSibling.classList.add("field-validation-error");
                        data.nextElementSibling.textContent = "Numeric";
                        boolFlag = true;
                    } else if (data.value.length != data.max && data.value != "" && data.hasAttribute('lenCheck')) {
                        data.classList.add("input-validation-error");
                        data.nextElementSibling.classList.add("field-validation-error");
                        data.nextElementSibling.textContent ="Length should be  " + data.max + " digits.";
                        boolFlag = true;
                        //} else {
                    } else if (!validateEmail(data.value) && data.hasAttribute('emailCheck')) {
                        data.classList.add('input-validation-error'); 
                        data.nextElementSibling.classList.add('field-validation-error');
                        data.nextElementSibling.textContent = "Please enter valid email address"; 
                        boolFlag = true;
                    }
                     else {
                        data.classList.remove('input-validation-error');
                        data.nextElementSibling.classList.remove('field-validation-error');
                        data.nextElementSibling.textContent = "";
                    }
                    //data.classList.remove('input-validation-error');
                    //data.nextElementSibling.classList.remove('field-validation-error');
                    //data.nextElementSibling.textContent = "";
                }
            }
        }
        else if (data.tagName == 'SELECT') {
            if (data.hasAttribute('isRequired'))
            {
                if (data.value == 0) {
                    data.classList.add("input-validation-error");
                    data.nextElementSibling.classList.add("field-validation-error");
                    //data.nextSibling.textContent = "Required";
                    boolFlag = true;
                } else {
                    data.classList.remove('input-validation-error');
                    data.nextElementSibling.classList.remove('field-validation-error');
                    //data.nextElementSibling.textContent = "";
                }
            }
        }
        else {

        }
    });
    if (boolFlag) { return false; } else { return true; }
}
function validateEmail(value){
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
};
function GridInitializer(columnDef) {
    var gridOptions = {
        columnDefs: columnDef,
        enableSorting: true,
        rowData: null,
        rowHeight: 35,
        suppressRowClickSelection: false,
        enableCellChangeFlash: true,
        refreshCells: true,
        enableColResize: true,
        headerHeight: 35,
        suppressHorizontalScroll: false,
        colResizeDefault: 'shift',
        pagination: true,
        paginationPageSize: 20,
        paginationNumberFormatter: function (params) {
            return '[' + params.value.toLocaleString() + ']';
        },
        onGridReady: function (params) {
            //var allColumnIds = [];
            //gridOptions.columnApi.getAllColumns().forEach(function (column) {
            //    allColumnIds.push(column.colId);
            //});
            //gridOptions.columnApi.autoSizeColumns(allColumnIds);
        },
    }
    return gridOptions
}
function CallToast(message, flag) {
    var heading = ((flag == 'F') ? "Error" : ((flag == 'V') ? "Information" : "Success"));
    var icon = ((flag == 'F') ? "error" : ((flag == 'V') ? "info" : "success"));
    $.toast({
        heading: heading,
        text: message,
        icon: icon,
        position: 'top-right',
        hideAfter: 3000,
        stack: false
    })

}
function GetReportConfiguration(module) {
    var url = '/Content/DynamicJs/' + module + '.js';
    var grdarray = '';
    $.ajax({
        url: url,
        dataType: 'script',
        async: false,
        success: function (result) {
            var str = "get" + module + "GridSettings";
            var func = window[str];
            if (typeof func === "function") grdarray = func();

        },
    });
    return grdarray;
}
function GetJsonData(path) {
    var resData = new Object();
    $.ajax(
        {
            url: path,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (response) {
                resData = response;
            },
            error: function (xhr, status, error) {

            }
        })
    return resData;
}
function ReadDropDownData(key, customerId, isParam) {
    var MyData = null;
    var jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');

    if (isParam == false) {
        if (key == "Course" || key == "AcademicYear" || key == "Subject" || key == "Department" || key == "Designation" || key == "FeeName" || key == "EmpType" || key =="JobType" ) {
            MyData = jsonData["" + key + ""];

            if (MyData == null || MyData == undefined) {
                MyData = GetCommonDDL();
                MyData = $.grep(MyData[key], function (item, i) {
                    return item.CUSTOMER_ID == customerId
                });
            }
            else {
                MyData = $.grep(jsonData[key], function (item, i) {
                    return item.CUSTOMER_ID == customerId
                });
            }
        }
        else {
            MyData = $.grep(jsonData[key], function (item, i) {
                return item.CUSTOMER_ID == customerId
            });
        }
    }
    else {
            MyData = $.grep(jsonData[key], function (item, i) {
                return item.PARAM_TYPE == customerId
            });
    }
    return MyData;
}

function GetCommonDDL() {
    var resData = new Object();
    $.ajax(
        {
            url: "/Cache/GetCommonDDL/",
            type: 'get',
            dataType: 'json',
            async: false,
            success: function (response) {
                resData = response;
            },
            error: function (xhr, status, error) {

            }
        })
    return resData;
}
function ReadLocationData(key, locationType, selectedVal) {

    var MyData = null;
    var jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');

    if (locationType == 1) {//1 return country name
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARENT_ID == null;
        });
    }
    else if (locationType == 2) {//1 return state name
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARENT_ID == selectedVal;
        });
    }
    else {//return city
        MyData = $.grep(jsonData[key], function (item, i) {
            return item.PARENT_ID == selectedVal
        });
    }
    return MyData;
}

//*********************************Export to Excel start*****************************
function exportToExcel(records, title, columnDefs)
{
    var JSONData = records; var title = title; var columns = columnDefs;
    var data = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var table;
    var ExportData;
    if (data != '') {
        table = GenerateExcel(data, columns);
        ExportData = ExportExcel(table, title, "utf-8");
        var linkNew = document.createElement("a");
        linkNew.href = ExportData;
        linkNew.style = "visibility:hidden";
        linkNew.download = title + "_" + GetTimeUpdate() + ".xls";
        document.body.appendChild(linkNew);
        linkNew.click();
        document.body.removeChild(linkNew);
    }
}
function GenerateExcel(paramData, columnDefs) {
    var table = "<table cellpadding='0' cellspacing='0' border='1' width='100%' class='excelData' id='tableData'>";
    table += "<thead><tr>";
    var headerGroupArray = [];
    var mergingCount = "";
    var count = 0;
    var mergingArray = [];
    var len = 0;
    var Header = [];
    //Count headgroup if merging exist;
    $(columnDefs).each(function (key, value) {
        if (value.export == true) {
            if (count == 0) {
                headerGroupArray.push(value.headerGroup)
                Header.push(value.headerGroup);
                count++;
            }
            else {
                if (headerGroupArray[count - 1] == value.headerGroup) {
                    headerGroupArray.push(value.headerGroup)
                    count++;
                    len = headerGroupArray.length;
                }
                else {
                    mergingArray.push(headerGroupArray.length);
                    headerGroupArray = [];
                    headerGroupArray.push(value.headerGroup)
                    if (value.headerGroup != undefined) {
                        Header.push(value.headerGroup);
                    }
                    count = 1;
                }
            }
        }
        if (columnDefs.length == key + 1) {
            mergingArray.push(len);
        }

    })
    if (Header.length < mergingArray.length) {
        mergingArray.pop();
    }
    for (var i = 0; i < mergingArray.length; i++) {
        table += "<th style='text-align:center;font-weight:bold;' colspan=" + mergingArray[i] + ">" + Header[i] + "</th>";
    }
    table += "</tr><tr>";

    //Header Group Merging
    $(columnDefs).each(function (key, value) {
        if (value.export == true) {
            table += "<th style='text-align:center;font-weight:bold;'>" + value.headerName + "</th>";
        }
    });
    table += "</tr></thead>";
    table += "<tbody>";
    $(paramData).each(function (key, value) {
        table += "<tr>";
        $(columnDefs).each(function (k, v) {
            if (this.export == true) {
                if (this.field == "status") {
                    table += "<td>" + ((value[this.field] == 1) ? "Pending" : ((value[this.field] == 2) ? "Approved" : "Rejected")); + "</td>";
                }
                else {
                    table += "<td>" + value[this.field] + "</td>";
                }

            }
        });
        table += "</tr>";
    });
    table += "<tbody></table>";
    return table;
}
function ExportExcel(HTMLTable, worksheetName, encoding) {
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += "<head><style type='text/css'>.y{ background-color:Red;border:solid thin black; }.n{ border:solid thin black; font-size:10.0pt; height:16.25pt; vertical-align:middle;}.b{ border:solid thin black;font-weight:bold; font-size:10.0pt;background-color:#948a54;color:white;} .firstrow{ border:solid thin black;font-weight:bold; background-color:red; color:#ffffff; font-size:12.0pt;text-align:center; height:40.00px;vertical-align:middle;}.SecondRow{ border:solid thin black;font-weight:bold; background-color:red; color:#ffffff; font-size:12.0pt;text-align:center; height:30.00pt;vertical-align:middle;} .mergerow{border:solid thin black;font-size:11.0pt;height:21.00pt;background-color:#948a54;color:white;vertical-align:middle;text-align:center};</style>";
    excelFile += '<meta http-equiv="Content-type" content="text/html;charset="' + encoding + '"/>';
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += HTMLTable.replace(/"/g, '\'');
    excelFile += "</body>";
    excelFile += "</html>";
    var uri = "data:application/vnd.ms-excel;base64,";
    var workSheetDetails = { worksheet: worksheetName, table: HTMLTable }
    var blob = new Blob([format(excelFile, workSheetDetails)], { type: uri });
    var blobUrl = URL.createObjectURL(blob);
    return (blobUrl);
}
function base64(s) { return window.btoa(unescape(encodeURIComponent(s))); }
function format(s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); }
function GetTimeUpdate() {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var date = new Date();
    //var date = new Date(parent.document.getElementById("ctl00_hfCurDateTime").value);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var time = date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();

    var currDate = day + "" + monthNames[monthIndex] + "" + year + "_" + time;

    return currDate;
}



function validateEmail(email)
{
    debugger;
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email))
    {
        return false;
    } else {
        return true;
    }
}


//**************************************Export to excel end********************************
