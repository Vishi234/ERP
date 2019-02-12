function getMasterGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var AcademicDetails = [
{ headerName: labelArray['$YEAR_CODE$'], field: 'yCode', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$ACADEMICY_YEAR$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$WEF_DATE$'], field: 'wfDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$WET_DATE$'], field: 'wtDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var AcademicDetails_Export = ['yCode','wfDate','wtDate'];
var AcademicDetails_ExportCaption = ['YEAR_CODE','WEF_DATE','WET_DATE'];

 gridViewSettings['$AcademicDetails$'] =AcademicDetails;
 gridViewSettings['$AcademicDetails_Export$'] =AcademicDetails_Export;
 gridViewSettings['$AcademicDetails_ExportCaption$'] =AcademicDetails_ExportCaption;

 var CourseDetails = [
{ headerName: labelArray['$COURSE_CODE$'], field: 'cde', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COURSE_NAME$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var CourseDetails_Export = ['cde','nsem'];
var CourseDetails_ExportCaption = ['COURSE_CODE','NO_OF_SEMESTER'];

 gridViewSettings['$CourseDetails$'] =CourseDetails;
 gridViewSettings['$CourseDetails_Export$'] =CourseDetails_Export;
 gridViewSettings['$CourseDetails_ExportCaption$'] =CourseDetails_ExportCaption;
  return gridViewSettings;
}