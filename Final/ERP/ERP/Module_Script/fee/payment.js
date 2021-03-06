﻿var grdArray;
var MyData = null;
var gridOptions = null;
var testData = null;
var academicYear = "";
var course = "";
grdArray = GetReportConfiguration("FeeManagement");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$Payments$"];
for (var i = 0; i < columnDefs.length; i++) {
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateAction") {
            columnDefs[i].cellRenderer = this.CreateAction;
        }
        else if (columnDefs[i].cellRenderer == "CreateLink") {
            columnDefs[i].cellRenderer = this.CreateLink;
        }
    }
}
gridOptions = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#paymentGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
gridOptions.api.sizeColumnsToFit();

function CreateLink(params) {
    var html = "";
    var data = JSON.stringify(params.data);
    html = "<span><a style='font-weight:bold;text-decoration:underline;' href='javascript:void(0)' onclick='History(" + data + ");'>" + params.data["due"] + "</a></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}
function CreateAction(params) {
    var html = "";
    var data = JSON.stringify(params.data);
    html = "<span> <button type='button' id='payDtl' class='btn btn-primary cstanchor' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' onclick='Payment(" + data + ");' >Pay</button>   | <button type='button' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' class='btn btn-success cstanchor' onclick='ViewPayment(" + data + ");'>View</button></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}
function ViewPayment($obj) {
    $("#my-container").empty();
    var rowData = $obj;
    var timestamp = new Date().getTime();
    //$("input[name=recieptNo]").val(timestamp);
    //$("input[name=stuName]").val(rowData.fName + " " + rowData.lName);
    $("#payStuCode").html(rowData.stuCode);
    $("#payStuName").html(rowData.fName + " " + rowData.lName);
    $("#payAcadYear").html(rowData.acdYear);
    $("#payStuCourse").html(rowData.crNm);

    obj =
        {
            stuCode: rowData.stuCode,
            academicYear: rowData.yrId,
            courseId: rowData.crsId,
            customerId: $("#hfCustomerId").val(),
            reportId: 13
        }
    data = GetPaymentList(obj);
    var html = "";
    var total = 0;
    var fine = 0;
    var discount = 0;
    html += '<div class="invoice-title"><h1>' + $("#hfCustomerName").val() + '</h1><h4>' + $("#hfCustomerAdd").val() + '</h4></div><hr/>';
    html += '<div class="indtl"><ul>';
    html += '<li><label>Student Name</label><span>:' + rowData.fName + " " + rowData.lName + '</span></li>';
    html += '<li><label>Class</label><span>:' + rowData.crNm + '</span></li><li><label>Student ID</label><span>:' + rowData.stuCode + '</span>';
    html += '</li></ul></div>';
    html += '<table class="ingrid" border="1" cellpadding="4">';
    html += '<thead><tr><th>S.No.</th><th>Fee Name</th><th>Fee Amount</th><th>Due Amount</th></tr></thead>';
    html += '<tbody>';
    //<tr><td>Book</td><td>500</td><td>0</td><td>250</td></tr></tbody>

    $.each(JSON.parse(data.addParams), function (i, item) {
        html += '<tr>';
        html += '<td>' + i + '</td><td>' + item.fName + '</td><td>' + item.fAmnt + '</td><td>' + item.dueAmnt + '</td>';
        html += '</tr>';
        total += parseInt(item.dueAmnt);
    })
    html += '</tbody>';
    html += '<tfoot><tr><td colspan="3">Total</td><td>' + total + '</td></tr></tfoot>';
    html += '</table>';
    var table = document.createElement("table");
    $('#my-container').append(html);
    console.log(table);

    $('#viewDue').modal("show");
}
function buildTable(data) {// Create Dyanamic table by JSON Data


    var table = document.createElement("table");
    table.width = "100%"
    //table.className = "table-body";
    table.style = "width:100%  cellspacing:0 cellpadding:4";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    var dueAmount = 0;
    ["S.No.", "Fee Name", "Amount", "Due Amount"].forEach(function (el) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(el));
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);
    var tr = document.createElement("tr");

    data.forEach(function (el) {
        dueAmount += parseInt(el["dueAmnt"]);
        tr = document.createElement("tr");
        tr.style = "background - color: #94b8b8;"
        for (var o in el) {
            var td = document.createElement("td");
            if (o == "fId" || o == "fName" || o == "fAmnt" || o == "dueAmnt") {

                //console.log(duea);
                td.appendChild(document.createTextNode(el[o]))
                tr.appendChild(td);
            }

        }
        tbody.appendChild(tr);
    });
    tr = document.createElement("tr");
    var td = document.createElement('td');
    td.colSpan = '3';
    td.appendChild(document.createTextNode('Total'))
    td.align = "center";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(dueAmount))
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    return table;
}
function Payment($obj) {
    debugger;
    var rowData = $obj;
    var timestamp = new Date().getTime();
    $("input[name=recieptNo]").val(timestamp);
    $("input[name=stuName]").val(rowData.fName + " " + rowData.lName);
    $("input[name=stuCode]").val(rowData.stuCode);
    $("input[name=stuCourse]").val(rowData.crNm);
    academicYear = rowData.yrId;
    course = rowData.crsId;
    obj =
        {
            stuCode: rowData.stuCode,
            academicYear: rowData.yrId,
            courseId: rowData.crsId,
            customerId: $("#hfCustomerId").val(),
            reportId: 13
        }
    data = GetPaymentList(obj);
    //var jsonData = JSON.parse(data.addParams)
    //var dd = "";
    //$(jsonData).each(function (i, d) {
    //    dd += "<tr class='item'><td>" + d.fName + "</td><td>" + d.dueAmnt+"</td><td>" + d.paidAmnt + "</td></tr>";
    //});
    //var date = new Date();  //or your date here
    //var currentDate=(date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();

    //var invoiceHTML = "<div class='invoice-box' style='margin-top: 50px;background-color: white'><table cellpadding='0' cellspacing='0'   border='1'> <tr class='top'><th style='text-align: center;' > IMS ENGINEERING COLLEGE</th><td colspan='2'><table> <tr> <td class='title'>   </td>" +
    //    "<td>Receipt No #: " + $("input[name=recieptNo]").val() + "<br> Created: " + currentDate + "<br>Due Date: February 1, 2019z</td>  </tr></table></td></tr><tr class='information'> <td colspan='3'>" +
    //    " <table><tr><td>Student Name-" + $("input[name=stuName]").val() + "</td></tr><tr> <td>Student Code- " + $("input[name=stuCode]").val() + "</td> </tr><tr><td>Course Name - " + $("input[name=stuCourse]").val()+"</td></tr><tr> <td> Payment Type- "+'Cash'+"  </td>  </tr>" +
    //    " </table></td></tr> <tr class='heading'><td>Payment Method </td><td>Check #  </td><td>Amount<td></tr><tr class='details'> <td> Check</td><td>2322</td><td> 1000 </td></tr>" +
    //    " <tr class='heading'> <td>Fee Type </td> <td>Due Amount</td><td>Paid Fee  </td> </tr>" + dd + "<tr class='item'><td><b> Total</b></td><td>2000</td><td>0<td></tr> </table> </div>";
    //$("#invoiceContainer").append(invoiceHTML);


    $("#payDtlGrid").empty();
    grdArray = GetReportConfiguration("FeeManagement");
    var rowData = JSON.parse(data.addParams);
    var discount = 0; var dueAmount = 0; var feeAmount = 0; var fineAmount = 0; var paidAmount = 0;
    $(rowData).each(function (i, data) {
        discount += parseInt(data.dis);
        dueAmount += parseInt(data.dueAmnt);
        feeAmount += parseInt(data.fAmnt);
        fineAmount += parseInt(data.fine);
        paidAmount += parseInt(data.paidAmnt)

    });
    rowData.push({ "dis": discount, "dueAmnt": dueAmount, "fAmnt": feeAmount, "fId": "1", "fName": "Total", "fine": fineAmount, "paidAmnt": paidAmount, "sCode": "S101" });
    var columnDefs = grdArray["$StudentFeePay$"];
    for (var i = 0; i < columnDefs.length; i++) {
        if (columnDefs[i].cellRenderer) {
            if (columnDefs[i].cellRenderer == "CreateInput") {
                columnDefs[i].cellRenderer = this.CreateInput;
            }
        }
    }

    gridOptions = GridInitializer(columnDefs);
    var gridDiv = document.querySelector('#payDtlGrid');
    new agGrid.Grid(gridDiv, gridOptions);
    gridOptions.api.setRowData(((rowData == null) ? null : rowData));
    gridOptions.api.sizeColumnsToFit();

    $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child").css({ "font-weight": "800" });
    $('#feePay').modal("show");
}
function GetPaymentList() {
    var MyData;
    $.ajax({
        type: "POST",
        url: '/Fee/GetPaymentDeatils',
        data: obj,
        async: false,
        success: function (data) {
            MyData = data;

        }.bind(this),
        error: function (e) {
            alert('Error! Please try again');
        }
    });
    return MyData;
}
$('.numeric11').keypress(function (event) {

    var keycode = event.which;
    if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
        event.preventDefault();
    }
});

function numbersonly(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode
    if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
        if (unicode < 48 || unicode > 57) //if not a number
            return false //disable key press
    }
}

function CreateInput(params) {
    var html = "";
    var domElement = "";
    params.data.paidAmnt = 0;
    var input = document.createElement("input");
    input.className = "form-control";
    input.style = "height: 27px;margin-top: 3px;border-radius: 4px;width: 60%;";
    input.value = 0;
    if (params.data["dueAmnt"] == "0") {
        input.setAttribute("disabled", "disabled");
    }
    else {
        input.removeAttribute("disabled");
    }
    input.classList.add("numeric11");

    if (params.colDef.field == "dis") { input.classList.add("calculateDiscount"); }
    else if (params.colDef.field == "fine") { input.classList.add("calculateFine"); }
    else { input.classList.add("calculateAmnt"); }

    input.onkeypress = function () {
        return numbersonly(event);
    };
    domElement = document.createElement("div");
    domElement.appendChild(input);
    var keyVal = 0;

    input.addEventListener("keyup", function (evt) {
        debugger;
        params.data[params.colDef.field] = evt.target.value;

        if (params.colDef.field == "dis") {
            var totolVal = 0; var lastIndex = $(".calculateDiscount").length;
            $(".calculateDiscount").each(function (i, data) {
                if (i != lastIndex - 1) { if ($(this).val() != "") totolVal += parseInt($(this).val()); }
            });
            $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(2) input").val(totolVal);
        }
        else if (params.colDef.field == "fine") {
            var totolVal = 0; var lastIndex = $(".calculateFine").length;
            $(".calculateFine").each(function (i, data) {
                if (i != lastIndex - 1) { if ($(this).val() != "") totolVal += parseInt($(this).val()); }
            });
            $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(3) input").val(totolVal);
        }
        else if (params.colDef.field == "paidAmnt") {
            // var totalDiscount = $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(5) input").val();
            var totolVal = 0; var lastIndex = $(".calculateAmnt").length;
            $(".calculateAmnt").each(function (i, data) {
                if (i != lastIndex - 1) { if ($(this).val() != "") totolVal += parseInt($(this).val()); }
            });
            $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(5) input").val(totolVal);
        }
    });
    return domElement;
}
function SavePaymentDetails(evt) {
    debugger;
    let rowData = [];
    var error = false;
    var msg = "";
    gridOptions.api.forEachNode(node => rowData.push(node.data));
    var changeData = rowData;
    var obj = {
        records: JSON.stringify(rowData),
        studentCode: $("input[name=stuCode]").val(),
        studentName: $("input[name=stuName]").val(),
        acYear: academicYear,
        courceName: course,
        paymentType: $("input[name=payType]").val(),
        paymentDate: $("input[name=paymentDate]").val(),
        recieptNo: $("input[name=recieptNo]").val()
    }

    btnloading("FeePayment", 'show');
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: '/Fee/SavePaymentDetails',
            data: obj,
            async: false,
            beforeSend: function () {
                btnloading("FeePayment", 'show');
            },
            success: function (data) {
                if (data.flag == "S") {
                    btnloading("FeePayment", 'hide');
                    var invoiceData = $.grep(changeData, function (item, i) {
                        return item.paidAmnt != 0
                    });
                    GenerateInvoice(invoiceData);
                    CallToast(data.msg, data.flag);
                    $("#payDtl").trigger("click");
                }
            }.bind(this),
            error: function (e) {
                btnloading("SaveDetails", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
    return false;

}
function GenerateInvoice(data) {
    var html = "";
    var total = 0;
    var fine = 0;
    var discount = 0;
    html += '<div class="invoice-title"><h1>' + $("#hfCustomerName").val() + '</h1><h4>' + $("#hfCustomerAdd").val() + '</h4></div><hr/>';
    html += '<div class="text-center"><h3>Fee Reciept</h3></div>';
    html += '<div class="indtl"><ul><li><label>Reciept No.</label><span>:' + $("input[name='recieptNo']").val() + '</span></li>';
    html += '<li><label>Date</label><span>:' + $("input[name='paymentDate']").val() + '</span></li><li><label>Name</label><span>:' + $("input[name='stuName']").val() + '</span></li>';
    html += '<li><label>Class</label><span>:' + $("input[name='stuCourse']").val() + '</span></li><li><label>Student ID</label><span>:' + $("input[name='stuCode']").val() + '</span>';
    html += '</li></ul></div>';
    html += '<table class="ingrid" border="1" cellpadding="4">';
    html += '<thead><tr><th>Fee Name</th><th>Fee Amount</th><th>Discount</th><th>Fine</th><th>Paid Amount</th></tr></thead>';
    html += '<tbody>';
    //<tr><td>Book</td><td>500</td><td>0</td><td>250</td></tr></tbody>

    $.each(data, function (i, item) {
        html += '<tr>';
        html += '<td>' + item.fName + '</td><td>' + item.dueAmnt + '</td><td>' + item.dis + '</td><td>' + item.fine + '</td><td>' + item.paidAmnt + '</td>';
        html += '</tr>';
        total += parseInt(item.paidAmnt);
        fine += parseInt(item.fine);
        discount += parseInt(item.dis);
    })
    html += '</tbody>';
    html += '<tfoot><tr><td colspan="2">Total</td><td>' + discount + '</td><td>' + fine + '</td><td>' + total + '</td></tr></tfoot>';
    html += '</table>';
    html += '<div class="infootdtl float-left"><ul><li><label>InWords:<span>Three Hundred Fifty Only</span></label>';
    html += '</li><li><label>Total Recieve Amount:<span>' + total + '</span></label></li></ul></div>';
    html += '<div class="float-right sign"><label>Signature</label></div>';
    $("#invoiceContainer").html(html);
    Print("invoiceContainer");
}
function Print(invoice) {
    var printContents = document.getElementById(invoice).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    InitializeDate();
    $(".modal-backdrop").remove();
}
function History($obj) {
    var rowData = $obj;
    GetPaymentHistory(rowData)
    $("#viewHistory").modal("show");
}

function GetPaymentHistory(rowData) {
    $("#payHisGrid").empty();
    obj =
        {
            stuCode: rowData.stuCode,
            academicYear: rowData.yrId,
            courseId: rowData.crsId,
            reportId: 14
        }
    var MyData;
    $.ajax({
        type: "POST",
        url: '/Fee/GetPaymentHistory',
        data: obj,
        async: false,
        success: function (data) {
            var MyData = JSON.parse(data.addParams)
            columnDefs = grdArray["$StudentFeeHis$"];
            gridOptions = GridInitializer(columnDefs);
            var gridDiv = document.querySelector('#payHisGrid');
            new agGrid.Grid(gridDiv, gridOptions);
            gridOptions.api.setRowData(MyData);
            gridOptions.api.sizeColumnsToFit();

        }.bind(this),
        error: function (e) {
            alert('Error! Please try again');
        }
    });
    return MyData;
}
//"< td > Website design </td> <td>$300.00</td></tr><tr class='item'>" +
//" <td>Hosting (3 months)</td><td> $75.00</td></tr><tr class='item last'> <td>Domain name (1 year)</td><td> $10.00 </td> </tr> <tr class='total'>" +
//" <td></td> <td>Total: $385.00 </td> </tr>  </table> </div>";