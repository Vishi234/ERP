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
    debugger;
    var data = JSON.stringify(params.data);
    html = "<span><a href='javascript:void(0)' onclick='Payment(" + data  + ");' class='cstanchor'>Pay</a> | <a href='javascript:void(0)' class='cstanchor'>View</a></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}

function Payment($obj)
{
    debugger;
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
  //  debugger
        var html = "";
        var domElement = "";
        var input = document.createElement("input");
        input.className = "form-control";
        input.style = "height: 27px;margin-top: 3px;border-radius: 4px;width: 60%;";
        input.value = params.data[params.colDef.field];
        domElement = document.createElement("div");
        domElement.appendChild(input);
        input.addEventListener("blur", function (evt)
        {
           
            params.data[params.colDef.field] = evt.target.value;
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
        courceName: $("input[name=stuCourse]").val(),
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

