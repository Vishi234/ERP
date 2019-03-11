function getStudentGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var StudentDetails = [
{ headerName: labelArray['$STU_CODE$'], field: 'stuCode', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$FIRST_NAME$'], field: 'stufname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$LAST_NAME$'], field: 'lname', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_ID$'], field: 'courseId', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COURSE_NAME$'], field: 'courseName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SEMESTER$'], field: 'semester', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$CATEGORY_ID$'], field: 'categoryID', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$CATEGORY_NAME$'], field: 'categoryName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_ID$'], field: 'acedeYearID', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acedeYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$FATHER_NAME$'], field: 'fName', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$MOTHER_NAME$'], field: 'mName', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$GENDER_ID$'], field: 'genderID', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$GENDER$'], field: 'gender', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$DOB$'], field: 'dob', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$BLOOD_GROUP_ID$'], field: 'bldGrpID', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$BLOOD_GROUP$'], field: 'bldGrp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NATIONALITY$'], field: 'nation', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$MMOTHER_TONGUE$'], field: 'mTongue', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PLACE_OF_BIRTH$'], field: 'placeBirth', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$HANDICAP_ID$'], field: 'handicapID', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$IS_HANDICAP$'], field: 'handicap', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PARENT_INCOME$'], field: 'pIncome', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ADDRESS_LINE_1$'], field: 'addressLine1', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ADDRESS_LINE_2$'], field: 'addressLine2', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$MOBILE_NO$'], field: 'mobile', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PHONE_NO$'], field: 'pnNo', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$STATE$'], field: 'state', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$EMAIL$'], field: 'email', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$CITY$'], field: 'city', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ZIPCODE$'], field: 'zpCode', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$INSTITUTE_NAME$'], field: 'instName', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$BOARD$'], field: 'BOARD', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PRE_COURSE$'], field: 'preCourse', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$YEAR$'], field: 'YEAR', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$MARKS$'], field: 'MARKS', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PERCENTAGE$'], field: 'percentage', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECTS$'], field: 'subject', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$LOGIN_ID$'], field: 'login', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$PASSWORD$'], field: 'password', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var StudentDetails_Export = ['courseId','courseName','acedeYearID','acedeYear','nation','state','email','YEAR','Edit'];
var StudentDetails_ExportCaption = ['COURSE_ID','COURSE_NAME','ACADEMIC_ID','ACADEMIC_YEAR','NATIONALITY','STATE','EMAIL','YEAR','EDIT'];

 gridViewSettings['$StudentDetails$'] =StudentDetails;
 gridViewSettings['$StudentDetails_Export$'] =StudentDetails_Export;
 gridViewSettings['$StudentDetails_ExportCaption$'] =StudentDetails_ExportCaption;
  return gridViewSettings;
}