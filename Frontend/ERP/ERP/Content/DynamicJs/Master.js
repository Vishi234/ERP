function getMasterGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var AcademicDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$START_DATE$'], field: 'wfDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'wtDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var AcademicDetails_Export = ['wfDate','wtDate','isActive','Edit'];
var AcademicDetails_ExportCaption = ['START_DATE','END_DATE','IS_ACTIVE','EDIT'];

 gridViewSettings['$AcademicDetails$'] =AcademicDetails;
 gridViewSettings['$AcademicDetails_Export$'] =AcademicDetails_Export;
 gridViewSettings['$AcademicDetails_ExportCaption$'] =AcademicDetails_ExportCaption;

 var CourseDetails = [
{ headerName: labelArray['$COURSE_ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_TYPE$'], field: 'cType', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COURSE_NAME$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var CourseDetails_Export = ['cType','nsem','isActive','Edit'];
var CourseDetails_ExportCaption = ['COURSE_TYPE','NO_OF_SEMESTER','IS_ACTIVE','EDIT'];

 gridViewSettings['$CourseDetails$'] =CourseDetails;
 gridViewSettings['$CourseDetails_Export$'] =CourseDetails_Export;
 gridViewSettings['$CourseDetails_ExportCaption$'] =CourseDetails_ExportCaption;

 var DurationDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$YEAR_ID$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_ID$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$START_DATE$'], field: 'sDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'eDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var DurationDetails_Export = ['nsem','sDt','eDt','isActive'];
var DurationDetails_ExportCaption = ['NO_OF_SEMESTER','START_DATE','END_DATE','IS_ACTIVE'];

 gridViewSettings['$DurationDetails$'] =DurationDetails;
 gridViewSettings['$DurationDetails_Export$'] =DurationDetails_Export;
 gridViewSettings['$DurationDetails_ExportCaption$'] =DurationDetails_ExportCaption;

 var SectionDetails = [
{ headerName: labelArray['$COURSE_ID$'], field: 'courseName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_ID$'], field: 'courseId', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SEMESTER_ID$'], field: 'semId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SECTION_ID$'], field: 'secId', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SECTION_NAME$'], field: 'secName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$CREATED_BY$'], field: 'createdBy', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var SectionDetails_Export = ['secName','isActive','createdBy','Edit'];
var SectionDetails_ExportCaption = ['SECTION_NAME','IS_ACTIVE','CREATED_BY','EDIT'];

 gridViewSettings['$SectionDetails$'] =SectionDetails;
 gridViewSettings['$SectionDetails_Export$'] =SectionDetails_Export;
 gridViewSettings['$SectionDetails_ExportCaption$'] =SectionDetails_ExportCaption;

 var SubjectDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_CODE$'], field: 'scde', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_NAME$'], field: 'snm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_SHORT_NAME$'], field: 'ssnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SUBJECT_MEDIUM$'], field: 'smed', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$ACTIVITY_TYPE$'], field: 'sact', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SUBJECT_TYPE$'], field: 'styp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var SubjectDetails_Export = ['ssnm','smed','sact','styp'];
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
{ headerName: labelArray['$SUBJECT$'], field: 'sub', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true}
 ];
 var MappingDetails_Export = ['sub','isActive'];
var MappingDetails_ExportCaption = ['SUBJECT','IS_ACTIVE'];

 gridViewSettings['$MappingDetails$'] =MappingDetails;
 gridViewSettings['$MappingDetails_Export$'] =MappingDetails_Export;
 gridViewSettings['$MappingDetails_ExportCaption$'] =MappingDetails_ExportCaption;

 var EmployeeDetails = [
{ headerName: labelArray['$ID$'], field: 'userId', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$FIRST_NAME$'], field: 'fname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$MIDDLE_NAME$'], field: 'mname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$LAST_NAME$'], field: 'lname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ADHAAR_NO$'], field: 'adhaarNo', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$GENDER$'], field: 'gender', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$DOB$'], field: 'dob', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$BLOOD_GROUP$'], field: 'bldGrp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$MARITAL_STATUS$'], field: 'mStatus', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$DOJ$'], field: 'doj', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$EMP_CODE$'], field: 'empCode', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$CARD_NO$'], field: 'cardNo', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$DEPT_ID$'], field: 'deptId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$DESIG_ID$'], field: 'desigId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$EMP_TYPE_ID$'], field: 'bldGrp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$IMG_PATH$'], field: 'imgPath', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COUNTRY$'], field: 'country', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$STATE$'], field: 'state', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$CITY$'], field: 'city', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$MOBILE$'], field: 'mobile', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$EMAIL$'], field: 'email', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$LOGIN_ID$'], field: 'loginId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$DEFAULT_PAGE$'], field: 'defaultPage', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$ACCOUNT_STATUS$'], field: 'accountStatus', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false}
 ];
 var EmployeeDetails_Export = ['adhaarNo','mStatus','doj','desigId','imgPath','state','mobile','email','defaultPage'];
var EmployeeDetails_ExportCaption = ['ADHAAR_NO','MARITAL_STATUS','DOJ','DESIG_ID','IMG_PATH','STATE','MOBILE','EMAIL','DEFAULT_PAGE'];

 gridViewSettings['$EmployeeDetails$'] =EmployeeDetails;
 gridViewSettings['$EmployeeDetails_Export$'] =EmployeeDetails_Export;
 gridViewSettings['$EmployeeDetails_ExportCaption$'] =EmployeeDetails_ExportCaption;
  return gridViewSettings;
}