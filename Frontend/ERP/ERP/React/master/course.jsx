var grdArray;
var MyData = null;
var fields = [];
class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$CourseDetails$"];
        var records = JSON.parse(content.addParams);
        this.state =
            {
                courserType: ReadDropDownData("Param",'17', true),
                active: ReadDropDownData("Param",'16', true),
                selectedCourseType: 0,
                selectedActive: 0,
                courseId:0,
                courseName: "",
                noOfSemester: "",
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
                ServerMessage: ''
            };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    resetData() {
        this.setState({
            courseCode: '',
            courseName: '',
            noOfSemester: '',
        });
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    onChangeCode(value) {
        this.setState({
            courseCode: value
        });
    }
    onChangeName(value) {
        this.setState({
            courseName: value
        });
    }
    onChangeSemester(value) {
        this.setState({
            noOfSemester: value
        });
    }
    onChangeType(value) {
        this.setState({
            selectedCourseType: value
        });
    }
    onChangeActive(value) {
        this.setState({
            selectedActive: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var validForm = true;
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            debugger;
            var d = {
                courserId: this.state.courserId,
                courseName: this.state.courseName,
                noOfSemester: this.state.noOfSemester,
                courseType=this.state.selectedCourseType,
                active: this.state.selectedActive,
                flag: 'A',
                reportId: 2
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("CourseForm", 'show');
                },
                success: function (data) {
                    btnloading("CourseForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.resetData();
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("CourseForm", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }
    render() {
        //Render form
        return (
            <div>
                <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Course Management</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Master</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Course
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-lg-6 col-xs-12 col-sm-8 col-md-6">
                            <h4 className="text-right font-14">{this.state.records} Record(S)</h4>
                        </div>
                    </div>
                  </div>
                <div className="block-body container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="body">
                                    <div className="acform">
                                        <form name='CourseForm' id="CourseForm" noValidate onSubmit={this.handleSubmit}>
                                            <ul>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedCourseType} data={this.state.courseType} label={'Course Type'} name={'courseType'} htmlFor={'courseType'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.courseName} label={'Course Name'} name={'courseName'} htmlFor={'courseName'} isrequired={true}
                                                                 onChange={this.onChangeName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'text'} value={this.state.noOfSemester} label={'No. Of Semester'} name={'noOfSemester'} htmlFor={'noOfSemester'} isrequired={true}
                                                                 className={'form-control'} onChange={this.onChangeSemester.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <CreateInput type={'ddl'} value={this.state.selectedActive} data={this.state.active} label={'Active'} name={'active'} htmlFor={'active'} isrequired={true}
                                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeActive} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                </li>
                                                <li>
                                                    <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="body">
                                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
ReactDOM.render(<CourseForm urlPost="/Master/Course" />, document.getElementById('courseform'));
