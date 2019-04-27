var grdArray;
var MyData = null;
var gridOptions = null;
var testData = null;
grdArray = GetReportConfiguration("FeeManagement");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$Payments$"];
for (var i = 0; i < columnDefs.length; i++) {
    if (columnDefs[i].cellRenderer) {
        if (columnDefs[i].cellRenderer == "CreateAction") {
            columnDefs[i].cellRenderer = this.CreateAction;
        }
    }
}
gridOptions = GridInitializer(columnDefs);
var gridDiv = document.querySelector('#paymentGrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));
gridOptions.api.sizeColumnsToFit();

function CreateAction(params) {
    var html = "";
    var data = JSON.stringify(params.data);
    html = "<span> <button type='button' id='payDtl' class='btn btn-primary cstanchor' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' onclick='Payment(" + data + ");' >Pay</button>   | <button type='button' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' class='btn btn-success cstanchor' onclick='ViewPayment(" + data + ");'>View</button></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}
function ViewPayment($obj)
{
    debugger;
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
    console.log(data.addParams);
    var table = document.createElement("table");
    $('#my-container').append(buildTable(JSON.parse(data.addParams)));
    console.log(table);
  
    $('#viewDue').modal("show");
}
function buildTable(data) {// Create Dyanamic table by JSON Data
    var table = document.createElement("table");
    table.width = "100%";
    //table.className = "table-body";
    //table.style = "width:100%  cellspacing:0 cellpadding:4";
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
    var rowData = $obj;
    var timestamp = new Date().getTime();
    $("input[name=recieptNo]").val(timestamp);
    $("input[name=stuName]").val(rowData.fName + " " + rowData.lName);
    $("input[name=stuCode]").val(rowData.stuCode);
    $("input[name=stuCourse]").val(rowData.crNm);
    obj =
        {
            stuCode: rowData.stuCode,
            academicYear: rowData.yrId,
            courseId: rowData.crsId,
            customerId: $("#hfCustomerId").val(),
            reportId: 13
        }
    data = GetPaymentList(obj);
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

    $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child").css({ background: "gainsboro", "font-weight": "800" });
    $('#feePay').modal("show");
}
function GetPaymentList()
{
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
    var input = document.createElement("input");
    input.className = "form-control";
    input.style = "height: 27px;margin-top: 3px;border-radius: 4px;width: 60%;";
    input.value = 0;
    if (params.data["dueAmnt"] == "0")
    {
        input.setAttribute("disabled", "disabled");
    }
    else
    {
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

    input.addEventListener("keyup", function (evt)
    {
        params.data[params.colDef.field] = evt.target.value;
        if (params.colDef.field == "dis")
        {
            var totolVal = 0; var lastIndex = $(".calculateDiscount").length;
            $(".calculateDiscount").each(function (i,data)
            {             
                if (i != lastIndex - 1) { if ($(this).val() != "") totolVal += parseInt($(this).val()); }        
            });
            $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(2) input").val(totolVal);
        }
        else if (params.colDef.field == "fine")
        {
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
    let rowData = [];
    gridOptions.api.forEachNode(node => rowData.push(node.data));
    var obj = {
        record: JSON.stringify(rowData),

        studentCode: $("input[name=stuCode]").val(),
        courseName: $("input[name=stuCourse]").val(),
        paymentType: $("input[name=payType]").val(),
        paymentDate: $("input[name=paymentDate]").val()

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
            success: function (data)
            {
                debugger;
                btnloading("FeePayment", 'hide');
                CallToast(data.msg, data.flag);
                $("#payDtl").trigger("click");

                $("#invoiceContainer").append(invoiceHTML);


            }.bind(this),
            error: function (e) {
                btnloading("SaveDetails", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
    return false;

}


var dd = "";

var invoiceHTML = "<div class='invoice-box' style='margin-top: 50px;background - color: white'><table cellpadding='0' cellspacing='0'> <tr class='top'><td colspan='2'><table> <tr> <td class='title'>  <img src='https://www.sparksuite.com/images/logo.png' style='width:100%; max-width:300px;'> </td>" +
    "<td>Invoice #: 123<br> Created: " + new Date() + "<br>Due: February 1, 2019z</td>  </tr></table></td></tr><tr class='information'> <td colspan='2'>" +
    " <table><tr><td>Sparksuite, Inc.<br>SVJ Group <br> Sunnyville, CA 12345</td> <td> Acme Corp.<br>John Doe<br>john@example.com  </td>  </tr>" +
    " </table></td></tr> <tr class='heading'><td>Payment Method </td><td>Check #  </td></tr><tr class='details'> <td> Check</td><td> 1000 </td></tr>" +
    " <tr class='heading'> <td>Fee Type </td> <td>Paid Fee  </td> </tr>" +
    $(testData).each(function (i, d) {
        dd += "<tr class='item'><td>" + d.fName + "</td><td>" + d.paidAmnt + "</td></tr>";
    });
    dd += "</table> </div>";

    //"< td > Website design </td> <td>$300.00</td></tr><tr class='item'>" +
    //" <td>Hosting (3 months)</td><td> $75.00</td></tr><tr class='item last'> <td>Domain name (1 year)</td><td> $10.00 </td> </tr> <tr class='total'>" +
    //" <td></td> <td>Total: $385.00 </td> </tr>  </table> </div>";