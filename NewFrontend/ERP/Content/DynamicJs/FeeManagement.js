function getFeeManagementGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var FeeType = [
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'},
{ headerName: labelArray['$FEE_NAME$'], field: 'feeName', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PAYMENT_TYPE$'], field: 'pType', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$MONTH$'], field: 'month', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$DESCRIPTION$'], field: 'descrip', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'}
 ];
 var FeeType_Export = ['Edit','isActive'];
var FeeType_ExportCaption = ['EDIT','IS_ACTIVE'];

 gridViewSettings['$FeeType$'] =FeeType;
 gridViewSettings['$FeeType_Export$'] =FeeType_Export;
 gridViewSettings['$FeeType_ExportCaption$'] =FeeType_ExportCaption;
  return gridViewSettings;
}