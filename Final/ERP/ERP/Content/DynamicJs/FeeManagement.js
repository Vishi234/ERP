function getFeeManagementGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var FeeType = [
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'},
{ headerName: labelArray['$FEE_NAME$'], field: 'id', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
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

 var FeeMapping = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'yrId', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acYr', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COURSE$'], field: 'crsId', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE$'], field: 'crsNm', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$FEE_NAME$'], field: 'fId', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$FEE_NAME$'], field: 'fNm', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$TYPE_ID$'], field: 'typeID', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PAYMENT_TYPE$'], field: 'pType', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$TERMS$'], field: 'trms', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$FEE_AMOUNT$'], field: 'amt', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-right', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateTextBox'}
 ];
 var FeeMapping_Export = ['acYr','crsNm','fNm','pType','trms','amt'];
var FeeMapping_ExportCaption = ['ACADEMIC_YEAR','COURSE','FEE_NAME','PAYMENT_TYPE','TERMS','FEE_AMOUNT'];

 gridViewSettings['$FeeMapping$'] =FeeMapping;
 gridViewSettings['$FeeMapping_Export$'] =FeeMapping_Export;
 gridViewSettings['$FeeMapping_ExportCaption$'] =FeeMapping_ExportCaption;

 var Payments = [
{ headerName: labelArray['$STU_CODE$'], field: 'stuCode', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$FIRST_NAME$'], field: 'fName', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$LAST_NAME$'], field: 'lName', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COURSE$'], field: 'course', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acdYear', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SEMESTER$'], field: 'sem', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$TOTAL$'], field: 'feeAmt', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$DISCOUNT$'], field: 'discount', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PAID$'], field: 'paid', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$DUE$'], field: 'due', hide: false, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$FINE$'], field: 'fne', hide: true, headerTooltip: '', width: 150, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: '', field: 'edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateAction'}
 ];
 var Payments_Export = ['lName','acdYear','feeAmt','paid','due','fne','edit'];
var Payments_ExportCaption = ['LAST_NAME','ACADEMIC_YEAR','TOTAL','PAID','DUE','FINE',''];

 gridViewSettings['$Payments$'] =Payments;
 gridViewSettings['$Payments_Export$'] =Payments_Export;
 gridViewSettings['$Payments_ExportCaption$'] =Payments_ExportCaption;
  return gridViewSettings;
}