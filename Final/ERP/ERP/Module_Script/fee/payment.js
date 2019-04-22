var grdArray;
var MyData = null;
var gridOptions = null;

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
    html = "<span> <button type='button' id='payDtl' class='btn btn-primary cstanchor' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' onclick='Payment(" + data + ");' >Pay</button>   | <button type='button' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' class='btn btn-success cstanchor' onclick='ViewPayment();' >View</button></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
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

    $.ajax({
        type: "POST",
        url: '/Fee/GetPaymentDeatils',
        data: obj,
        async: false,
        success: function (data) {
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

        }.bind(this),
        error: function (e) {
            alert('Error! Please try again');
        }
    });
    $('#feePay').modal("show");
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
   
    input.addEventListener("blur", function (evt)
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
            success: function (data) {
                btnloading("FeePayment", 'hide');
                CallToast(data.msg, data.flag);
                $("#payDtl").trigger("click");
            }.bind(this),
            error: function (e) {
                btnloading("SaveDetails", 'hide');
                alert('Error! Please try again');
            }
        });
    }, 500);
    return false;

}

