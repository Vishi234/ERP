var grdArray;
var grdFeeArray;
var MyData = null;
var fields = [];
var feeMap = [];
class FeeStructure extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("FeeManagement"); 
        //grdFeeArray = GetReportConfiguration("FeeMapping");
        var columnDefs = grdArray["$FeeType$"];

        var columnFeeDefs = grdArray["$FeeMapping$"];
        console.log(columnFeeDefs)
        //var records;
        var records = JSON.parse(content.addParams);
        var mappingRecords = JSON.parse(mappingContent.addParams);
        for (var i = 0; i < columnDefs.length; i++) {
            if (columnDefs[i].cellRenderer) {
                if (columnDefs[i].cellRenderer == "CreateEdit") {
                    columnDefs[i].cellRenderer = this.CreateEdit;
                }
                else if (columnDefs[i].cellRenderer == "CreateActive") {
                    columnDefs[i].cellRenderer = this.CreateActive;
                }
            }
        }
        for (var i = 0; i < columnFeeDefs.length; i++) {
            if (columnFeeDefs[i].cellRenderer) {
                if (columnFeeDefs[i].cellRenderer == "CreateEdit") {
                    columnFeeDefs[i].cellRenderer = this.CreateFeeEdit;
                }                
            }
        }
        this.state = {
            typeId:"",
            feeName: "",
            payType: ReadDropDownData("Param", '20', true),
            feeDescrep: "",
            month: ReadDropDownData("Param", '21', true),
            active: ReadDropDownData("Param", '16', true),     
            academicYear: ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false),
            courseId: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
            feeType: ReadDropDownData("FeeName", $("#hfCustomerId").val(), false),
            feeAcadeDet: [],
            CourseDet: [],
            mediumDet: [],
            feeAcadeStruct: [],
            CourseStruct: [],
            mediumStruct: ReadDropDownData("Param", '18', true),
            selectedPayType: 0,
            selectedAcadDet: 0,
            selectedCourseDet: 0,
            selectedMediumDet: 0,
            selectedAcadStruct: 0,
            selectedCourseStruct: 0,
            selectedMedStruct: 0,
            selectedYear:0,
            selectedCourse:0,
            SelectedFeeType: 0,
            monthActive:true,
            Fields: [],
            feeMap:[],
            columnDef: columnDefs,
            columnFeeDef: columnFeeDefs,
            rowData: records,
            mappingrowData:mappingRecords,
            records: ((records == null) ? 0 : records.length),
            mappingRecords: ((mappingRecords == null) ? 0 : mappingRecords.length),
            label: "Save",
            flag: "A",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMapping = this.handleMapping.bind(this);
    }
    handleSubmit(e)
    {
        e.preventDefault();
        var validForm = true;
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField;
                if (field[0].props.type == 'ddl') {
                    validField = field[0].isValid(field[0].refs.MySelect2);
                } else {
                    validField = field[0].isValid(field[0].refs[field[0].props.name]);
                }
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                id:this.state.typeId,
                feeName: this.state.feeName,
                paymentType: this.state.selectedPayType,
                feeDesc: this.state.feeDescrep,
                feeMonth: ((this.state.selectedMonth!=null && this.state.selectedMonth.indexOf(",")==-1) ? this.state.selectedMonth.join(",") : this.state.selectedMonth),
                isActive: this.state.selectedActive,
                terms: ((this.state.selectedMonth!=null) ? this.state.selectedMonth.length : "1"),  
                reportId:"10",
                flag: this.state.flag
            }
            $.ajax({
                type: "POST",
                url: '/Fee/AddFeeType',
                data: d,
                beforeSend: function () {
                    btnloading("FeeType", 'show');
                },
                success: function (data) {
                    btnloading("FeeType", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                typeId:"",
                                feeName: "",
                                payType: ReadDropDownData("Param", '20', true),
                                feeDescrep: "",
                                month: ReadDropDownData("Param", '21', true),
                                active: ReadDropDownData("Param", '16', true),         
                                feeAcadeDet: [],
                                CourseDet: [],
                                mediumDet: [],
                                feeAcadeStruct: [],
                                CourseStruct: [],
                                mediumStruct: ReadDropDownData("Param", '18', true),
                                selectedPayType: 0,
                                selectedAcadDet: 0,
                                selectedCourseDet: 0,
                                selectedMediumDet: 0,
                                selectedAcadStruct: 0,
                                selectedCourseStruct: 0,
                                selectedMedStruct: 0,
                                selectedMonth:0,
                                label: "Save",
                                flag: "A",
                            })
                        this.setState({ rowData: MyData });
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("subjectForm", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }

    handleMapping(e) {
        debugger;
        e.preventDefault();
        var validForm = true;
        feeMap.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField;
                if (field[0].props.type == 'ddl') {
                    validField = field[0].isValid(field[0].refs.MySelect2);
                } else {
                    validField = field[0].isValid(field[0].refs[field[0].props.name]);
                }
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                id: "",
                academicYear: this.state.selectedYear,
                courseId: this.state.selectedCourse,
                feeType: ((this.state.SelectedFeeType!=null && this.state.SelectedFeeType.indexOf(",")==-1)? this.state.SelectedFeeType.join(",") : this.state.SelectedFeeType),              
                flag: this.state.flag,
                reportMapId: "11",
            }
            $.ajax({
                type: "POST",
                url: '/Fee/AddFeeMapping',
                data: d,
                beforeSend: function () {
                    btnloading("FeeMapping", 'show');
                },
                success: function (data) {
                    btnloading("FeeMapping", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({

                                feeName: "",
                                payType: ReadDropDownData("Param", '20', true),
                                feeDescrep: "",
                                month: ReadDropDownData("Param", '21', true),
                                active: ReadDropDownData("Param", '16', true),
                                feeAcadeDet: [],
                                CourseDet: [],
                                mediumDet: [],
                                feeAcadeStruct: [],
                                CourseStruct: [],
                                mediumStruct: ReadDropDownData("Param", '18', true),
                                selectedPayType: 0,
                                selectedAcadDet: 0,
                                selectedCourseDet: 0,
                                selectedMediumDet: 0,
                                selectedAcadStruct: 0,
                                selectedCourseStruct: 0,
                                selectedMedStruct: 0,
                                label: "Save",
                                flag: "A",
                            })
                        this.setState({ mappingrowData: MyData });
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("FeeMapping", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }

    onChangePayType(value) {
        //var jsonData = ReadDropDownData("Param", '20', true);
        //for (var i = 0; i < jsonData.length; i++) {
        //    if (jsonData[i].PARAM_ID==value) {
        //        this.setState({
        //            monthActive: false
        //        });
        //        break;
        //    } else {
        //        this.setState({
        //            monthActive: true
        //        });
        //    }
        //}     
        if (value === "82") {
            this.setState({
                monthActive: false
            });
        } else {
            this.setState({
                monthActive: true
            });
        }
        this.setState({
            selectedPayType: value
        });
    }
    onChangeFeeName(value) {
        this.setState({
            feeName: value
        });
    }
    onChangeFeeDesc(value) {
        this.setState({
            feeDescrep: value
        });
    }
    onChangeAcadeDet(value) {
        this.setState({
            selectedAcadDet: value
        });
    }

    onChangeCourseDet(value) {
        this.setState({
            selectedCourseDet: value
        });
    }
    onChangeMediumDet(value) {
        this.setState({
            selectedMediumDet: value
        });
    }
    onChangeAcadeStruct(value) {
        this.setState({
            selectedAcadStruct: value
        });
    }
    onChangeCourseStruct(value) {
        this.setState({
            selectedCourseStruct: value
        });
    }
    onChangeMediumStruct(value) {
        this.setState({
            selectedMedStruct: value
        });
    }
    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    }
    onChangeMonth(value) {
        this.setState({
            selectedMonth: value
        });
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s); 
    }

    onChangeYear(value){
        this.setState({
            selectedYear: value
        });
    }
    onChangeCourse(value) {
        this.setState({
            selectedCourse: value
        });
    }
    onChangeFeeType(value) {
        this.setState({
            SelectedFeeType: value
        });
    }
    registerMapping(field) {
        var s = [];
        s.push(field);
        feeMap.push(s);
    }

    handleClick(param)
    {
        var data = JSON.parse(param.currentTarget.getAttribute("dataattr"));
        this.setState
            ({
                typeId : data.id,
                feeName: data.feeName,
                feeDescrep: data.descrip,
                selectedPayType: data.pType,
                selectedMonth: data.month,
                selectedActive: data.isActive,
                flag: "M",
                label: "Update",
                terms: "",
                reportId: "10",

            });
      
    }

    CreateActive(params) {

        var html = "";
        var domElement = "";
        if ((params.data.isActive).trim() == 70) {
            html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-success">Active</span>'
        }
        else if ((params.data.isActive).trim() == 71) {
            html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-danger">In-Active</span>'
        }
        else {
            html = '<span style="margin-top: 5px;padding: 6px 20px;" class="badge badge-warning">Temporary</span>'
        }

        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    }

    CreateEdit(params) {
        var html = "";
        var domElement = "";
        var jsonObj = JSON.stringify(params.data);

        html = "<div><a class='testClass' href='javascript:void(0)' dataAttr='" + jsonObj + "'><img class='editbtn' src='/Images/icons/edit.svg'/></a></div>";
        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    }
    CreateFeeEdit(params) {
        var html = "";
        var domElement = "";
        var jsonObj = JSON.stringify(params.data);

        html = "<div><a class='testClass' href='javascript:void(0)' dataAttr='" + jsonObj + "'><img class='editbtn' src='/Images/icons/edit.svg'/></a></div>";
        domElement = document.createElement("div");
        domElement.innerHTML = html;
        return domElement;
    }

    componentDidMount()
    {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
    componentDidUpdate() {
        $('.testClass').on("click", this.handleClick.bind(this));
    }
      // alert(window.dynamicData)
    render() {
        //Render form
        return (
            <div>
                <div className="esubmenu">
                    <ul className="breadcrumb float-left">
                        <li><a href="#">Home /</a></li>
                        <li><a href="#">Pictures /</a></li>
                        <li><a href="#">Summer 15 /</a></li>
                        <li><a href="#" className="active">Summer 15</a></li>
                    </ul>
                    <div className="ever float-right">
                        <span>Version : 0.0.1</span>
                    </div>
                </div>
                <div className="pagebody">
                    <div className="einrformbase">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active show" data-toggle="tab" href="#type">Fee Type</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#mapping">Course Fee Mapping</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#details">Fee Details</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#structure">Fee Structure</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active show" id="type">
                              <form name='FeeType' className="tab-pane active show" id="FeeType" noValidate onSubmit={this.handleSubmit}>
                                <div className="einrformbase">
                                    <ul className="einrform">
                                        <li>
                                            <CreateInput type={'text'} value={this.state.feeName} label={'Fee Name'} name={'feeName'} htmlFor={'feeName'} isrequired={true}
                                                         onChange={this.onChangeFeeName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                       
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedPayType} data={this.state.payType} label={'Payment Type'} name={'payType'} htmlFor={'payType'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                onChange={this.onChangePayType.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                         
                                        </li>
                                        <li>
                                                <CreateInput type={'multiSelect'} value={this.state.selectedMonth} data={this.state.month} label={'Month'} name={'month'} htmlFor={'month'} isrequired={true}
                                                    keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMonth.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} disabled={this.state.monthActive} />
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.feeDescrep} label={'Description'} name={'feeDescrep'} htmlFor={'feeDescrep'} isrequired={true}
                                                onChange={this.onChangeFeeDesc.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                         
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Status'} name={'active'} htmlFor={'active'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                                <button type="submit" className="btn btn-info"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span>{this.state.label}</button>
                                        </li>
                                    </ul>
                                   </div>
                                </form>
                                <div className="row cstdown clearfix">
                                     <hr />
                                    <AgGrid columnDef={this.state.columnDef} name={'TypeGrid'} rowData={this.state.rowData} />
                                </div>
                            </div>
                            <div className="tab-pane" id="mapping">
                                <form name='FeeType' className="tab-pane active show" id="FeeMapping" noValidate onSubmit={this.handleMapping}>
                                <div className="einrformbase">
                                    <ul className="einrform">   
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedYear} data={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                                    keyId={'YEAR_ID'} keyName={'ACADEMIC_YEAR'} onChange={this.onChangeYear.bind(this)} className={'form-control'} onComponentMounted={this.registerMapping} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.courseId} label={'Course'} name={'courseId'} htmlFor={'courseId'} isrequired={true}
                                                    keyId={'COURSE_ID'} keyName={'COURSE_NAME'} onChange={this.onChangeCourse.bind(this)} className={'form-control'} onComponentMounted={this.registerMapping} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'multiSelect'} value={this.state.SelectedFeeType} data={this.state.feeType} label={'Fee Type'} name={'feeType'} htmlFor={'feeType'} isrequired={true}
                                                    keyId={'ID'} keyName={'FEE_NAME'} onChange={this.onChangeFeeType.bind(this)} className={'form-control'} onComponentMounted={this.registerMapping} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-info"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span>{this.state.label}</button>
                                        </li>
                                        </ul>
                                         <div className="row cstdown clearfix">
                                            <hr />
                                            <AgGrid columnDef={this.state.columnFeeDef} name={'MappingGrid'} rowData={this.state.mappingrowData} />
                                        </div>
                                </div>
                               
                                </form> 
                            </div>

                            <div className="tab-pane" id="details">
                                <div className="einrformbase">
                                    <ul className="einrform">
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedAcadDet} data={this.state.feeAcadeDet} label={'Academic Year'} name={'feeAcadeDet'} htmlFor={'feeAcadeDet'} isrequired={true}
                                                keyId={'YEAR_ID'} keyName={'ACADEMIC_YEAR'} onChange={this.onChangeAcadeDet.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                        
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedCourseDet} data={this.state.CourseDet} label={'Course Name'} name={'CourseDet'} htmlFor={'CourseDet'} isrequired={true}
                                                keyId={'COURSE_ID'} keyName={'COURSE_NAME'} onChange={this.onChangeCourseDet.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                          
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-info">Show</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row cstdown clearfix">
                                    <hr />
                        <div className="text-center">
                                        <button type="submit" className="btn btn-info">Save</button>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane" id="structure">
                                <div className="einrformbase">
                                    <ul className="einrform">
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedAcadStruct} data={this.state.feeAcadeStruct} label={'Academic Year'} name={'feeAcadeStruct'} htmlFor={'feeAcadeStruct'} isrequired={true}
                                                keyId={'YEAR_ID'} keyName={'ACADEMIC_YEAR'} onChange={this.onChangeAcadeStruct.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                                                              
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedCourseStruct} data={this.state.CourseStruct} label={'Course Name'} name={'CourseStruct'} htmlFor={'CourseStruct'} isrequired={true}
                                                keyId={'COURSE_ID'} keyName={'COURSE_NAME'} onChange={this.onChangeCourseStruct.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedMedStruct} data={this.state.mediumStruct} label={'Medium'} name={'mediumStruct'} htmlFor={'mediumStruct'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMediumStruct} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-info">Show</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row cstdown clearfix">
                                    <hr/>
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
ReactDOM.render(<FeeStructure />, document.getElementById('feeform'));