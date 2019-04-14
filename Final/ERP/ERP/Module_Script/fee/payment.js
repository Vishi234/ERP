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
    html = "<span><a href='javascript:void(0)' onclick='Payment();' class='cstanchor'>Pay</a> | <a href='javascript:void(0)' class='cstanchor'>View</a></span>";
    domElement = document.createElement("div");
    domElement.innerHTML = html;
    return domElement;
}


