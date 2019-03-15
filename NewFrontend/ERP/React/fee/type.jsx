//alert(window.dynamicData);
class FeeStructure extends React.Component {
    constructor(props) {
        super(props);
        //grdArray = GetReportConfiguration("Master");
        //var columnDefs = grdArray["$SubjectDetails$"];
        //var records = JSON.parse(content.addParams);
        //for (var i = 0; i < columnDefs.length; i++) {
        //    if (columnDefs[i].cellRenderer) {
        //        if (columnDefs[i].cellRenderer == "CreateEdit") {
        //            columnDefs[i].cellRenderer = this.CreateEdit;
        //        }
        //        else if (columnDefs[i].cellRenderer == "CreateActive") {
        //            columnDefs[i].cellRenderer = this.CreateActive;
        //        }
        //    }
        //}
        this.state = {
            feeName: "",
            payType: [],
            feeDescrep: "",
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
            Fields: [],
            //columnDef: columnDefs,
            //rowData: records,
           // records: ((records == null) ? 0 : records.length),
            label: "Save",
            flag: "A",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        var validForm = true;
        var validField;
        this.state.Fields.forEach(function (field) {
            if (typeof field.isValid === "function") {
                if (field.props.type == 'ddl') {
                    validField = field.isValid(field.refs.MySelect2);
                } else {
                    validField = field.isValid(field.refs[field.props.name]);
                }
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                feeName: this.state.feeName,
                payType: this.state.selectedPayType,
                feeDescrep: this.state.feeDescrep,
                feeAcadeDet: this.state.selectedAcadDet,
                CourseDet: this.state.selectedCourseDet,
                mediumDet: this.state.selectedMediumDet,
                feeAcadeStruct: this.state.selectedAcadStruct,
                CourseStruct: this.state.selectedCourseStruct,
                mediumStruct    : this.state.selectedMedStruct,
                reportId: "5",
                flag: this.state.flag,

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("SubjectForm", 'show');
                },
                success: function (data) {
                    btnloading("SubjectForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                feeName: "",
                                payType: [],
                                feeDescrep: "",
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

    onChangePayType(value) {
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
                    <div className="einrformbase p-4">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active show" data-toggle="tab" href="#type">Fee Type</a>
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
                                <div className="einrformbase">
                                    <ul className="einrform">
                                        <li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.feeName} label={'Fee Name'} name={'feeName'} htmlFor={'feeName'} isrequired={true}
                                                    onChange={this.onChangeFeeName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>                                       
                                        </li>
                                        <li>
                                            <CreateInput type={'ddl'} value={this.state.selectedPayType} data={this.state.payType} label={'Payment Type'} name={'payType'} htmlFor={'payType'} isrequired={true} keyId={'CITY_ID'} keyName={'CITY_NAME'}
                                                onChange={this.onChangePayType.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                         
                                        </li>
                                        <li>
                                            <div className="form-group">
                                                <label>Month</label>
                                                <input type="text" className="form-control" placeholder="default disable. enable when user select fee collection month wise list of month show here with multiselect dropdown" />
                                            </div>
                                        </li>
                                        <li>
                                            <CreateInput type={'text'} value={this.state.feeDescrep} label={'Description'} name={'feeDescrep'} htmlFor={'feeDescrep'} isrequired={true}
                                                onChange={this.onChangeFeeDesc.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                         
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-info">Save</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row cstdown clearfix">
                                    <hr />
                                    @*Ag grid code go here*@
                    </div>

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
                                            <CreateInput type={'ddl'} value={this.state.selectedMediumDet} data={this.state.mediumDet} label={'Medium'} name={'mediumDet'} htmlFor={'mediumDet'} isrequired={true}
                                                keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMediumDet} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />                                        
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-info">Show</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row cstdown clearfix">
                                    <hr />
                                    @*Ag grid code go here*@
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
                                    <hr />
                                    @*Ag grid code go here*@
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