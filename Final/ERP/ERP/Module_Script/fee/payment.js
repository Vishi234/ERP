var grdArray;
var MyData = null;
var gridOptions = null;

grdArray = GetReportConfiguration("FeeManagement");
var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$Payments$"];
for(var i = 0; i < columnDefs.length; i++) {
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

function CreateAction(params)
{
    var html = "";
    var data = JSON.stringify(params.data);
    html = "<span> <button type='button' class='btn btn-primary cstanchor' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' onclick='Payment(" + data + ");' >Pay</button>   | <button type='button' style='height: 26px;margin-bottom: 4px;margin-top: 4px;' class='btn btn-success cstanchor' onclick='ViewPayment();' >View</button></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}

function Payment($obj)
{
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
        beforeSend: function () {
            btnloading("SaveDetails", 'show');
        },
        success: function (data)
        {
            //btnloading("SaveDetails", 'hide');
            //CallToast(data.msg, data.flag);
            //$("#FeeDetail").submit();
            grdArray = GetReportConfiguration("FeeManagement");
            var rowData = JSON.parse(data.addParams);
            debugger;
            var discount = 0; var dueAmount = 0; var feeAmount = 0; var fineAmount = 0; var paidAmount = 0;
            $(rowData).each(function (i, data)
            {
                discount += parseInt(data.dis);
                dueAmount += parseInt(data.dueAmnt);
                feeAmount += parseInt(data.fAmnt);
                fineAmount += parseInt(data.fine);
                paidAmount += parseInt(data.paidAmnt)

            });
            rowData.push({ "dis": discount, "dueAmnt": dueAmount, "fAmnt": feeAmount, "fId": "1", "fName": "Total", "fine": fineAmount, "paidAmnt": paidAmount, "sCode": "S101" });

          
            debugger;
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

            $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child").css({ background: "gainsboro", "font-weight": "800"  });

        }.bind(this),
        error: function (e) {
            btnloading("SaveDetails", 'hide');
            alert('Error! Please try again');
        }
    });
   
    $('#feePay').modal("show");


   
}

function CreateInput(params)
{
        var html = "";
        var domElement = "";
        var input = document.createElement("input");
        input.className = "form-control";
        input.style = "height: 27px;margin-top: 3px;border-radius: 4px;width: 60%;";
        input.value = params.data[params.colDef.field];
        domElement = document.createElement("div");
        domElement.appendChild(input);
        input.addEventListener("keyup", function (evt)
        {
            debugger;

            params.data[params.colDef.field] = evt.target.value;
            if (params.colDef.field == "dis") {
                var totalDiscount = $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(2) input").val();
                var feeDis = "";
                if (evt.target.value != "") feeDis = parseInt(totalDiscount) + parseInt(evt.target.value);
                else feeDis = totalDiscount;
                $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(2) input").val(feeDis);
            }
            else if (params.colDef.field == "fine")
            {
                var totalDiscount = $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(3) input").val();
                var feeDis = "";
                if (evt.target.value != "") feeDis = parseInt(totalDiscount) + parseInt(evt.target.value);
                else feeDis = totalDiscount;
                $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(3) input").val(feeDis);
            }
            else if (params.colDef.field == "paidAmnt")
            {
                var totalDiscount = $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(5) input").val();
                var feeDis = "";
                if (evt.target.value != "") feeDis = parseInt(totalDiscount) + parseInt(evt.target.value);
                else feeDis = totalDiscount;
                $("#payDtlGrid .ag-center-cols-container").find("div[role='row']:last-child div:eq(5) input").val(feeDis);
            }

        });
        return domElement;

}

function SavePaymentDetails(evt)
{
    debugger;
    let rowData = [];
    gridOptions.api.forEachNode(node => rowData.push(node.data));

    var obj = {
        record: JSON.stringify(rowData),

        studentCode: $("input[name=stuCode]").val(),
        courseName: $("input[name=stuCourse]").val(),
        paymentType: $("input[name=payType]").val(),
        paymentDate: $("input[name=paymentDate]").val()

    }

    btnloading("SaveDetails", 'show');
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: '/Fee/SavePaymentDetails',
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

