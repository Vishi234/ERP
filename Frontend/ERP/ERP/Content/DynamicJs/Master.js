function getMasterGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var AcademicDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$START_DATE$'], field: 'wfDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'wtDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var AcademicDetails_Export = ['wfDate','wtDate'];
var AcademicDetails_ExportCaption = ['START_DATE','END_DATE'];

 gridViewSettings['$AcademicDetails$'] =AcademicDetails;
 gridViewSettings['$AcademicDetails_Export$'] =AcademicDetails_Export;
 gridViewSettings['$AcademicDetails_ExportCaption$'] =AcademicDetails_ExportCaption;

 var CourseDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_NAME$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var CourseDetails_Export = ['nsem'];
var CourseDetails_ExportCaption = ['NO_OF_SEMESTER'];

 gridViewSettings['$CourseDetails$'] =CourseDetails;
 gridViewSettings['$CourseDetails_Export$'] =CourseDetails_Export;
 gridViewSettings['$CourseDetails_ExportCaption$'] =CourseDetails_ExportCaption;

 var DurationDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_NAME$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$START_DATE$'], field: 'sDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'eDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var DurationDetails_Export = ['nsem','sDt','eDt'];
var DurationDetails_ExportCaption = ['NO_OF_SEMESTER','START_DATE','END_DATE'];

 gridViewSettings['$DurationDetails$'] =DurationDetails;
 gridViewSettings['$DurationDetails_Export$'] =DurationDetails_Export;
 gridViewSettings['$DurationDetails_ExportCaption$'] =DurationDetails_ExportCaption;

 var SectionDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_NAME$'], field: 'crname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SEMESTER'], field: 'semname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SECTION_NAME$'], field: 'secname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var SectionDetails_Export = ['secname'];
var SectionDetails_ExportCaption = ['SECTION_NAME'];

 gridViewSettings['$SectionDetails$'] =SectionDetails;
 gridViewSettings['$SectionDetails_Export$'] =SectionDetails_Export;
 gridViewSettings['$SectionDetails_ExportCaption$'] =SectionDetails_ExportCaption;

 var SubjectDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_CODE$'], field: 'subCode', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_NAME$'], field: 'subName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_SHORT_NAME$'], field: 'subShortName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SUBJECT_MEDIUM$'], field: 'subMedium', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$ACTIVITY_TYPE$'], field: 'subActivity', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SUBJECT_TYPE$'], field: 'subType', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var SubjectDetails_Export = ['subShortName','subMedium','subActivity','subType'];
var SubjectDetails_ExportCaption = ['SUBJECT_SHORT_NAME','SUBJECT_MEDIUM','ACTIVITY_TYPE','SUBJECT_TYPE'];

 gridViewSettings['$SubjectDetails$'] =SubjectDetails;
 gridViewSettings['$SubjectDetails_Export$'] =SubjectDetails_Export;
 gridViewSettings['$SubjectDetails_ExportCaption$'] =SubjectDetails_ExportCaption;

 var ActivityDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACTIVITY_NAME$'], field: 'anm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACTIVITY_STATUS$'], field: 'asta', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACTIVITY_TYPE$'], field: 'atyp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$START_DATE$'], field: 'sDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'eDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var ActivityDetails_Export = ['atyp','sDt','eDt'];
var ActivityDetails_ExportCaption = ['ACTIVITY_TYPE','START_DATE','END_DATE'];

 gridViewSettings['$ActivityDetails$'] =ActivityDetails;
 gridViewSettings['$ActivityDetails_Export$'] =ActivityDetails_Export;
 gridViewSettings['$ActivityDetails_ExportCaption$'] =ActivityDetails_ExportCaption;

 var MappingDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE$'], field: 'cor', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SEMESTER$'], field: 'sem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT$'], field: 'sub', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var MappingDetails_Export = ['sub'];
var MappingDetails_ExportCaption = ['SUBJECT'];

 gridViewSettings['$MappingDetails$'] =MappingDetails;
 gridViewSettings['$MappingDetails_Export$'] =MappingDetails_Export;
 gridViewSettings['$MappingDetails_ExportCaption$'] =MappingDetails_ExportCaption;
  return gridViewSettings;
}