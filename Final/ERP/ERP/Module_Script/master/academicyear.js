debugger;
var grdArray;
var MyData = null;
var gridOptions = null;
grdArray = GetReportConfiguration("Master");

var rowData = JSON.parse(content.addParams);
var columnDefs = grdArray["$AcademicDetails$"];
gridOptions = GridInitializer(columnDefs);

var gridDiv = document.querySelector('#academicgrid');
new agGrid.Grid(gridDiv, gridOptions);
gridOptions.api.setRowData(((rowData == null) ? null : rowData));