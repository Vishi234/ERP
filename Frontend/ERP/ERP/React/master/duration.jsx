var jsonData;
var CourseDurationForm = React.createClass({
    getInitialState: function () {
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$DurationDetails$"];
        var records = JSON.parse(content.addParams);
        jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');
        return {
            course: jsonData["Course"],
            semester: [],
            academicYear: jsonData["AcademicYear"],
            selectedYear: 0,
            selectedCourse: 0,
            selectedSemester: 0,
            semCount: 0,
            wefDate: "",
            wetDate: "",
            Fields: [],
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var validForm = true;
        this.state.Fields.forEach(function (field) {
            if (typeof field.isValid === "function") {
                var validField = field.isValid(field.refs[field.props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                academicYear: this.state.selectedYear,
                course: this.state.selectedCourse,
                semester: this.state.selectedSemester,
                wefDate: this.state.wefDate,
                wetDate: this.state.wetDate,
                reportId: 3,
                flag: 'A'

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    btnloading("durationForm", 'show');
                },
                success: function (data) {
                    btnloading("durationForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                course: jsonData["Course"],
                                semester: [],
                                academicYear: jsonData["AcademicYear"],
                                selectedYear: 0,
                                selectedCourse: 0,
                                selectedSemester: 0,
                                semCount: 0,
                                wefDate: "",
                                wetDate: "",
                            })
                        this.setState({ rowData: MyData });
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("durationForm", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    },
    register: function (field) {
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields: s
        })
    },

    onChangeYear: function (value) {
        this.setState({
            selectedYear: value
        });
    },
    onChangeCourse: function (value) {
        var obj = [];
        var semester = 0;
        for (var i = 0; i < jsonData["Course"].length; i++) {
            if (jsonData["Course"][i].ID == value) {
                semester = jsonData["Course"][i].NO_SEMESTER;
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

    },
    onChangeSemester: function (value) {
        this.setState({
            selectedSemester: value
        });
    },
    onBlurWefDate: function (value) {
        this.setState({
            wefDate: value
        });

    },
    onBlurWetDate: function (value) {
        this.setState({
            wetDate: value
        });
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Courses Semester Duration</span>
                        <span className="pull-right toptotal">{this.state.records} Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form name='CourseForm' id="durationForm" noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>

                                    <CreateInput type={'ddl'} value={this.state.selectedYear} data={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                                 keyId={'ID'} keyName={'ACADEMIC_YEAR'} onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedCourse} data={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                                 keyId={'ID'} keyName={'COURSE_NAME'} onChange={this.onChangeCourse} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedSemester} data={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                                 keyId={'ID'} keyName={'NO_SEMESTER'} className={'form-control'} onChange={this.onChangeSemester} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'date'} value={this.state.wefDate} label={'Start Date'} name={'daterangepicker'} htmlFor={'wefDate'} isrequired={true}
                                                 className={'form-control'} onBlur={this.onBlurWefDate} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'date'} value={this.state.wetDate} label={'End Date'} name={'daterangepicker'} htmlFor={'wetDate'} isrequired={true}
                                                 className={'form-control'} onBlur={this.onBlurWetDate} onComponentMounted={this.register} messageRequired={'required.'} />
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
});
ReactDOM.render(<CourseDurationForm urlPost="/Master/Duration" />, document.getElementById('durationform'));