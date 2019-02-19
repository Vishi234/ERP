﻿var grdArray;
var MyData = null;
var fields = [];
class MappingForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$MappingDetails$"];
        //var records = JSON.parse(content.addParams);
        this.state =
            {
                course: ReadDropDownData("Course", $("#hfCustomerId").val(),false),
                semester: [],
                subject: [],
                type: ReadDropDownData("Param", "4", true),
                selectedCourse:0,
                selectedSemester:0,
                selectedSubject:0,
                selectedType:0,
                Fields: [],
                columnDef: columnDefs,
                rowData: null,
                ServerMessage: ''
            };
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
            var d = {
                course: this.state.course,
                semester: this.state.semester,
                subject: this.state.subject,
                reportId:'5',
                flag: 'A'
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    btnloading("mappingForm", 'show');
                },
                success: function (data) {
                    btnloading("mappingForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                course: [],
                                semester: [],
                                subject: [],
                                type: [],
                                selectedCourse:0,
                                selectedSemester:0,
                                selectedSubject:0,
                                selectedType:0,
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })

                    }
                }.bind(this),
                error: function (e) {
                    btnloading("mappingForm", 'hide');
                    alert('Error! Please try again');
                }
            })
        }
    }
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    onChangeCourse(value) {
        var obj = [];
        var semester = 0;
        var jsonData = ReadDropDownData("Course", $("#hfCustomerId").val(), false);
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].ID == value) {
                semester = jsonData[i].NO_SEMESTER;
            }
        }
        for (var i = 1; i <= semester; i++) {
            data = {};
            data.ID = i;
            data.NO_SEMESTER = i;
            obj.push(data);
        }
        this.setState({ semester: obj });
        this.setState({
            selectedCourse: value
        });
    }
    onChangeSemester(value) {
        this.setState({
            semester: value
        });
    }
    onChangeSubject(value) {
        this.setState({
            subject: value
        });
    }
    onChangeType(value) {
        this.setState({
            type: value
        });
    }
    render() {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Courses Subject Mapping</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform" id="mappingForm" onSubmit={this.handleSubmit.bind(this)}>
                        <form>
                            <ul>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                                 onChange={this.onChangeCourse.bind(this)} keyId={'ID'} keyName={'COURSE_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedSemester} data={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                                 onChange={this.onChangeSemester.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedSubject} data={this.state.subject} label={'Subject'} name={'subject'} htmlFor={'subject'} isrequired={true}
                                                 onChange={this.onChangeSubject.bind(this)} keyId={'ID'} keyName={'SUBJECT_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedType} data={this.state.type} label={'Subject Type'} name={'type'} htmlFor={'type'} isrequired={true}
                                                 onChange={this.onChangeType.bind(this)} keyId={'PARAM_ID'} keyName={'PARAM_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                </li>
                            </ul>

                        </form>
                    </div>
                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                </div>
            </div>
       );
    }
}
ReactDOM.render(<MappingForm />, document.getElementById('mappingform'));