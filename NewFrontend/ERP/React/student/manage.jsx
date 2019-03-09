var grdArray;
var MyData = null;
var fields = [];
class AdmissionForm extends React.Component {
    constructor(props) {
        super(props);
        //grdArray = GetReportConfiguration("Student");
        //var records = JSON.parse(content.addParams);
        //var columnDefs = grdArray["$StudentDetails$"];
        //for (var i = 0; i < columnDefs.length; i++) {
        //    if (columnDefs[i].cellRenderer) {
        //        if (columnDefs[i].cellRenderer == "CreateEdit") {
        //            columnDefs[i].cellRenderer = this.CreateEdit;
        //        }
        //    }
        //}
        this.state = {
            stuImage:"",
            stuCode: "",
            stuFirst: "",
            stuCourse: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
            stuSemester: [],
            stuCategory: ReadDropDownData("Param", '13', true),
            stuAcade: ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false),
            stuFather: "",
            stuMother: "",
            stuSex: ReadDropDownData("Param", '12', true),
            stuDOB: "",
            stuBGrp: ReadDropDownData("Param", '10', true),
            stuNation: "",
            stuMTongue: [],
            stuBirPlace: "",
            stuHandi: ReadDropDownData("Param", '15', true),
            stuPIncome: "",
            stuAdres: "",
            stuAdres2: "",
            stuCount: ReadLocationData("Location", 1, ""),
            stuState: [],
            stuCity: [],
            stuZip: "",
            stuMobile: "",
            stuPhone: "",
            stuEmail: "",
            stuSub: ReadDropDownData("Subject", $("#hfCustomerId").val(), false),
            stuInst: "",
            stuBoard: [],
            stuPreCourse: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
            couCompli: "",
            stuMarks: "",
            stuPercent: "",
            stuLogin: "",
            stuPwd: "",
            stuCPwd: "",
            stuAccStat: ReadDropDownData("Param", '1', true),
            Fields: [],
            //columnDef: columnDefs,
            rowData: null,
            // records: ((records == null) ? 0 : records.length),
            ServerMessage: '',
            label: "Save",
            flag: "A",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {

                var validField;
                if (field[0].props.type == 'ddl') {
                    debugger;
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
                stuImage      :this.state.stuImage,
                stuCode       :this.state.stuCode,
                stuFirst      :this.state.stuFirst,
                stuCourse     :this.state.selectedCourse,
                stuSemester   :this.state.selectedSemester,
                stuCategory   :this.state.selectedCate,
                stuAcade      :this.state.selectedAcademic,
                stuFather     :this.state.stuFather,
                stuMother     :this.state.stuMother,
                stuSex        :this.state.selectedSex,
                stuDOB        :this.state.stuDOB,
                stuBGrp       :this.state.selectedBGrp,
                stuNation     :this.state.stuNation,
                stuMTongue    : this.state.selectedMTongue,
                stuBirPlace   :this.state.stuBirPlace,
                stuHandi      :this.state.selectedHandicap,
                stuPIncome    :this.state.stuPIncome,
                stuAdres      :this.state.stuAdres,
                stuAdres2     :this.state.stuAdres2,
                stuCount      :this.state.selectedCount,
                stuState      :this.state.selectedState,
                stuCity       :this.state.selectedCity,
                stuZip        :this.state.stuZip,
                stuMobile     :this.state.stuMobile,
                stuPhone      :this.state.stuPhone,
                stuEmail      :this.state.stuEmail,
                stuSub        :this.state.selectedSubject,
                stuInst       :this.state.stuInst,
                stuBoard      :this.state.selectedBoard,
                stuPreCourse  :this.state.selectedPreCourse,
                couCompli     :this.state.couCompli,
                stuMarks      :this.state.stuMarks,
                stuPercent    :this.state.stuPercent,
                stuLogin      :this.state.stuLogin,
                stuPwd        :this.state.stuPwd,
                stuCPwd       :this.state.stuCPwd,
                stuAccStat: this.state.selectedPreCourse,
                flag: this.state.flag,
                reportId: 1
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("StuRegis", 'show');
                },
                success: function (data) {
                    btnloading("StuRegis", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                stuImage:"",
                                stuCode: "",
                                stuFirst: "",
                                stuCourse: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                                stuSemester: [],
                                stuCategory: ReadDropDownData("Param", '13', true),
                                stuAcade: ReadDropDownData("AcademicYear", $("#hfCustomerId").val(), false),
                                stuFather: "",
                                stuMother: "",
                                stuSex: ReadDropDownData("Param", '12', true),
                                stuDOB: "",
                                stuBGrp: ReadDropDownData("Param", '10', true),
                                stuNation: "",
                                stuMTongue: [],
                                stuBirPlace: "",
                                stuHandi: ReadDropDownData("Param", '15', true),
                                stuPIncome: "",
                                stuAdres: "",
                                stuAdres2: "",
                                stuCount: ReadLocationData("Location", 1, ""),
                                stuState: [],
                                stuCity: [],
                                stuZip: "",
                                stuMobile: "",
                                stuPhone: "",
                                stuEmail: "",
                                stuSub: ReadDropDownData("Subject", $("#hfCustomerId").val(), false),
                                stuInst: "",
                                stuBoard: [],
                                stuPreCourse: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                                couCompli: "",
                                stuMarks: "",
                                stuPercent: "",
                                stuLogin: "",
                                stuPwd: "",
                                stuCPwd: "",
                                stuAccStat: ReadDropDownData("Param", '1', true),
                                selectedCourse: 0,
                                selectedSemester: 0,
                                selectedCate: 0,
                                selectedAcademic: 0,
                                selectedSex: 0,
                                selectedBGrp: 0,
                                selectedHandicap: 0,
                                selectedCount: 0,
                                selectedState: 0,
                                selectedCity: 0,
                                selectedBoard: 0,
                                selectedPreCourse: 0,
                                selectedSubject: 0,
                                selectedMTongue: 0,
                                selectedPreCourse: 0,
                                label: "Save",
                                flag: "A",
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("StuRegis", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }
    onChangeCode(value) {
        this.setState({
            stuCode: value
        });
    }
    onChangeFirst(value) {
        this.setState({
            stuFirst: value
        });
    }
    onChangeLast(value) {
        this.setState({
            stuLast: value
        });
    }
    onChangeCourse(value) {
        var obj = [];
        //var semester = 0;
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].COURSE_ID == value) {
                data = {};
                data.COURSE_ID = jsonData[i].COURSE_ID;
                data.NO_OF_SEMESTER = jsonData[i].NO_OF_SEMESTER;
                obj.push(data);
            }
        }
        this.setState({ stuSemester: obj });
        this.setState({
            selectedCourse: value
        });
    }
    onChangeSemester(value) {
        this.setState({
            selectedSemester: value
        });
    }
    onChangeCategory(value) {
        this.setState({
            selectedCate: value
        });
    }
    onChangeAcade(value) {
        this.setState({
            selectedAcademic: value
        });
    }
    onChangeFather(value) {
        this.setState({
            stuFather: value
        });
    }

    onChangeMother(value) {
        this.setState({
            stuMother: value
        });
    }
    onChangeSex(value) {
        this.setState({
            selectedSex: value
        });
    }
    onDOBBlur(value) {
        this.setState({
            stuDOB: value
        });
    }
    onChangeBGrp(value) {
        this.setState({
            selectedBGrp: value
        });
    }
    onChangeNation(value) {
        this.setState({
            stuNation: value
        });
    }
    onChangeMTongue(value) {
        this.setState({
            selectedMTongue: value
        });
    }
    onChangePlace(value) {
        this.setState({
            stuBirPlace: value
        });
    }
    onChangeHandi(value) {
        this.setState({
            selectedHandicap : value
        });
    }
    onChangePIncom(value) {
        this.setState({
            stuPIncome : value
        });
    }
    onChangeAdres(value) {
        this.setState({
            stuAdres: value
        });
    }
    onChangeAdres2(value) {
        this.setState({
            stuAdres2: value
        });
    }
    onChangeCount(value) {
        var obj = [];
        var stuState = 0;
        var jsonData = ReadLocationData("Location", 2, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.STATE_ID = jsonData[i].LOCATION_ID;
            data.STATE_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ stuState: obj });
        this.setState({
            selectedCount: value
        });
    }
    onChangeState(value) {
        var obj = [];
        var stuCity = 2;
        var jsonData = ReadLocationData("Location", 3, value);

        for (var i = 0; i < jsonData.length; i++) {
            data = {};
            data.CITY_ID = jsonData[i].LOCATION_ID;
            data.CITY_NAME = jsonData[i].LOCATION_NAME;
            obj.push(data);
        }
        this.setState({ stuCity: obj });
        this.setState({
            selectedState: value
        });
    }
    onChangeCity(value) {
        this.setState({
            selectedCity: value
        });
    }

    onChangeZip(value) {
        this.setState({
            stuZip: value
        });
    }
    onChangeMobile(value) {
        this.setState({
            stuMobile: value
        });
    }
    onChangePhone(value) {
        this.setState({
            stuPhone: value
        });
    }
    onChangeEmail(value) {
        this.setState({
            stuEmail: value
        });
    }

    onChangeSubject(value) {
        this.setState({
            selectedSubject: value
        });
    }
    onChangeInsti(value) {
        this.setState({
            stuInst: value
        });
    }
    onChangeBoard(value) {
        this.setState({
            selectedBoard: value
        });
    }
    onChangePreCourse(value) {
        this.setState({
            selectedPreCourse: value
        });
    }
    onCouCompli(value) {
        this.setState({
            couCompli: value
        });
    }
    onChangeMarks(value) {
        this.setState({
            stuMarks: value
        });
    }
    onChangePercent(value) {
        this.setState({
            stuPercent: value
        });
    }
    onChangeLogin(value) {
        this.setState({
            stuLogin: value
        });
    }
    onChangePwd(value) {
        this.setState({
            stuPwd: value
        });
        window.setTimeout( ()=> {
            if (this.state.stuCPwd && this.state.stuCPwd.length) {
                this.refs.stuCPwd.validate(this.state.stuCPwd);
            }
        });
    }
    onChangeCPwd(value) {
        this.setState({
            stuCPwd: value
        });
    }
    isConfirmedPassword(value) {
        debugger;
        console.log(value, this.state.stuPwd, value === this.state.stuPwd);
        return (value === this.state.stuPwd)
    }
    onChangeAccStat(value) {
        this.setState({
            selectedAccStat: value
        });
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    render() {
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
                    <div className="einrformbase card p-4">
                        <div className="card-title">
                            Student Management
                        </div>
                        <div className="card-body">
                            <div className="efltrform"></div>
                            <div className="action">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0)" data-toggle="modal" data-target="#student" className="btn btn-secondary">
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 width="357px" height="357px" viewBox="0 0 357 357" style={{enableBackground:'new 0 0 357 357'}} xmlSpace="preserve">
                                                <g>
                                                    <g id="add">
                                                        <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z" />
                                                    </g>
                                                </g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="btn btn-secondary">
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 viewBox="0 0 512 512" style={{enableBackground:'new 0 0 512 512'}} xmlSpace="preserve">
                                                <g>
                                                    <g>
                                                        <path d="M382.56,233.376C379.968,227.648,374.272,224,368,224h-64V16c0-8.832-7.168-16-16-16h-64c-8.832,0-16,7.168-16,16v208h-64 c-6.272,0-11.968,3.68-14.56,9.376c-2.624,5.728-1.6,12.416,2.528,17.152l112,128c3.04,3.488,7.424,5.472,12.032,5.472 c4.608,0,8.992-2.016,12.032-5.472l112-128C384.192,245.824,385.152,239.104,382.56,233.376z" />
                                                    </g>
                                                </g>
                                                <g>
                                                    <g>
                                                        <path d="M432,352v96H80v-96H16v128c0,17.696,14.336,32,32,32h416c17.696,0,32-14.304,32-32V352H432z" />
                                                    </g>
                                                </g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                                <g></g>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                        </div>
                    </div>
                </div>
                <div id="student" className="modal fade">
                    <div className="modal-dialog modal-dialog-vertical-center modal-lg" role="document">
                        <div className="modal-content bd-0 tx-14">
                            <form name='StudentAdmi' id="StudentAdmi">
                                <div className="modal-header pd-y-20 pd-x-25">
                                    <h6 className="tx-14 mg-b-0 tx-uppercase tx-inverse tx-bold">Add/Edit Student</h6>
                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                </div>
                                <div className="modal-body pd-25">
                                    <div className="einrformbase">

                                        <ul className="einrform ecustform">
                                            <li>
                                                <CreateInput type={'text'} value={this.state.stuCode} label={'Student Code'} name={'stuCode'} htmlFor={'stuCode'}
                                                    onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.stuFirst} label={'First Name'} name={'stuFirst'} htmlFor={'stuFirst'} isrequired={true}
                                                    onChange={this.onChangeFirst.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.stuLast} label={'Last Name'} name={'stuLast'} htmlFor={'stuLast'} isrequired={true}
                                                    onChange={this.onChangeLast.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedAcademic} data={this.state.stuAcade} label={'Academic Year'} name={'stuAcade'} htmlFor={'stuAcade'} isrequired={true}
                                                    keyId={'YEAR_ID'} keyName={'ACADEMIC_YEAR'} onChange={this.onChangeAcade.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.stuCourse} label={'Course'} name={'stuCourse'} htmlFor={'stuCourse'} isrequired={true}
                                                    keyId={'COURSE_ID'} keyName={'COURSE_NAME'} onChange={this.onChangeCourse.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedSemester} data={this.state.stuSemester} label={'Semester'} name={'stuSemester'} htmlFor={'stuSemester'} isrequired={true}
                                                    keyId={'COURSE_ID'} keyName={'NO_OF_SEMESTER'} onChange={this.onChangeSemester.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.selectedCate} data={this.state.stuCategory} label={'Category'} name={'stuCategory'} htmlFor={'stuCategory'} isrequired={true}
                                                    keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeCategory.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>                                           
                                        </ul>
                                        <div className="empbse">
                                            <div className="empimg">
                                                <img src="/Images/user-img.png" />
                                            </div>
                                            <div className="efinput">
                                                Choose File
                                                <input type="file" className="hide_file" />
                                            </div>
                                        </div>

                                    </div>
                                    <hr />
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active show" data-toggle="tab" href="#personal">Personal Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#contact">Contact Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#subject">Subject Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#academic">Academic Information</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#account">Account Information</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane active show" id="personal">
                                            <ul className="einrform">
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuFather} label={'Father Name'} name={'stuFather'} htmlFor={'stuFather'} isrequired={true}
                                                        onChange={this.onChangeFather.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuMother} label={'Mother Name'} name={'stuMother'} htmlFor={'stuMother'} isrequired={true}
                                                        onChange={this.onChangeMother.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedSex} data={this.state.stuSex} label={'Gender'} name={'stuSex'} htmlFor={'stuSex'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeSex.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'date'} value={this.state.stuDOB} id={'empDOB'} label={'Date Of Birth'} name={'stuDOB'} htmlFor={'stuDOB'} isrequired={true}
                                                        className={'startDate form-control'} onBlur={this.onDOBBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedBGrp} data={this.state.stuBGrp} label={'Blood Group'} name={'stuBGrp'} htmlFor={'stuBGrp'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeBGrp.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuNation} label={'Nationality'} name={'stuNation'} htmlFor={'stuNation'} isrequired={true}
                                                        onChange={this.onChangeNation.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedMTongue} data={this.state.stuMTongue} label={'Mother Tongue'} name={'stuMTongue'} htmlFor={'stuMTongue'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMTongue.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuBirPlace} label={'Place Of Birth'} name={'stuBirPlace'} htmlFor={'stuBirPlace'} isrequired={true}
                                                        onChange={this.onChangePlace.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedHandicap} data={this.state.stuHandi} label={'Are You Handicap?'} name={'stuHandi'} htmlFor={'stuHandi'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeHandi.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuPIncome} label={'Parent Income(Annually)'} name={'stuPIncome'} htmlFor={'stuPIncome'} isrequired={true}
                                                        onChange={this.onChangePIncom.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="contact">
                                            <ul className="einrform">
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuAdres} label={'Address Line 1'} name={'stuAdres'} htmlFor={'stuAdres'} isrequired={true}
                                                        onChange={this.onChangeAdres.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuAdres2} label={'Address Line 2'} name={'stuAdres2'} htmlFor={'stuAdres2'} isrequired={true}
                                                        onChange={this.onChangeAdres2.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>

                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedCount} data={this.state.stuCount} label={'Country'} name={'stuCount'} htmlFor={'stuCount'} isrequired={true}
                                                        keyId={'LOCATION_ID'} keyName={'LOCATION_NAME'} onChange={this.onChangeCount.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedState} data={this.state.stuState} label={'State'} name={'stuState'} htmlFor={'stuState'} isrequired={true} keyId={'STATE_ID'} keyName={'STATE_NAME'}
                                                        onChange={this.onChangeState.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedCity} data={this.state.stuCity} label={'City'} name={'stuCity'} htmlFor={'stuCity'} isrequired={true} keyId={'CITY_ID'} keyName={'CITY_NAME'}
                                                        onChange={this.onChangeCity.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuZip} label={'Zip Code'} name={'stuZip'} htmlFor={'stuZip'} isrequired={true}
                                                        onChange={this.onChangeZip.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuMobile} label={'Mobile No'} name={'stuMobile'} htmlFor={'stuMobile'} isrequired={true}
                                                        onChange={this.onChangeMobile.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuPhone} label={'Phone No'} name={'stuPhone'} htmlFor={'stuPhone'} isrequired={true}
                                                        onChange={this.onChangePhone.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuEmail} label={'Email'} name={'stuEmail'} htmlFor={'stuEmail'} isrequired={true}
                                                        onChange={this.onChangeEmail.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="subject">
                                            <CreateInput type={'selectBox'} value={this.state.selectedSubject} data={this.state.stuSub} label={''} name={'stuSub'} htmlFor={'stuSub'} isrequired={true}
                                                onChange={this.onChangeSubject.bind(this)} keyId={'SUBJECT_ID'} keyName={'SUBJECT_NAME'} className={'listbox'} onComponentMounted={this.register} messageRequired={'required.'} />
                                        </div>
                                        <div className="tab-pane" id="academic">
                                            <ul className="einrform">
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuInst} label={'Institute Name'} name={'stuInst'} htmlFor={'stuInst'} isrequired={true}
                                                        onChange={this.onChangeInsti.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedBoard} data={this.state.stuBoard} label={'University/Board'} name={'stuBoard'} htmlFor={'stuBoard'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeBoard.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedPreCourse} data={this.state.stuPreCourse} label={'Course'} name={'stuPreCourse'} htmlFor={'stuPreCourse'} isrequired={true}
                                                        keyId={'COURSE_ID'} keyName={'COURSE_NAME'} onChange={this.onChangePreCourse.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'date'} value={this.state.stuDOB} id={'empDOB'} label={'Year Of Compilation'} name={'couCompli'} htmlFor={'couCompli'} isrequired={true}
                                                        className={'startDate form-control'} onBlur={this.onCouCompli.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuMarks} label={'Obtained Marks'} name={'stuMarks'} htmlFor={'stuMarks'} isrequired={true}
                                                        onChange={this.onChangeMarks.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuPercent} label={'Percentage(%)'} name={'stuPercent'} htmlFor={'stuPercent'} isrequired={true}
                                                        onChange={this.onChangePercent.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane" id="account">
                                            <ul className="einrform">
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.stuLogin} label={'Login Id'} name={'stuLogin'} htmlFor={'stuLogin'} isrequired={true}
                                                        onChange={this.onChangeLogin.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'password'} value={this.state.stuPwd} label={'Password'} name={'stuPwd'} htmlFor={'stuPwd'} isrequired={true}
                                                        onChange={this.onChangePwd.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'password'} value={this.state.stuCPwd} label={'Confirm Password'} name={'stuCPwd'} htmlFor={'stuCPwd'} isrequired={true}
                                                        onChange={this.onChangeCPwd.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} invalidPassword={'Password not match'} validate={this.isConfirmedPassword.bind(this)}  />
                                                </li>                                              
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedAccStat} data={this.state.stuAccStat} label={'Account Status'} name={'stuAccStat'} htmlFor={'stuAccStat'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeAccStat.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-info pd-x-20"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                    <button type="button" className="btn btn-secondary pd-x-20" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}
ReactDOM.render(<AdmissionForm urlPost="/Employee/Registration" personalPost='' contactPost='' authPost='' />, document.getElementById('studentform'));