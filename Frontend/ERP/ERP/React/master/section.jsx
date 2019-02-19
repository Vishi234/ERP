


var SectionForm = React.createClass({
    getInitialState: function () {


        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$SectionDetails$"];
        var records = JSON.parse(content.addParams);
        jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json');
        return {
            course: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
            semester: [],
            sectionName: ReadDropDownData("Param", '3', true),
            Fields: [],
            selectCourse: 0,
            selectSemester: 0,
            selectSectionName:0,
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),
        }
    },

    getSectionDDL: function (parId) {

        var sectionddl = $.grep(jsonData.Param, function (data, index) {
            return data.PARAM_TYPE == parId;
        });
        return sectionddl;
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
            var d =
            {
                course: this.state.selectCourse,
                semester: this.state.selectSemester,
                sectionName: this.state.selectSectionName,

                flag: 'A'
            }
            $.ajax({
                type: "POST",
                url: '/Master/SaveSectionDetails',
                data: d,
                async: false,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    $("#progress").hide();
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S")
                    {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                course: ReadDropDownData("Course", $("#hfCustomerId").val(), false),
                                semester: [],
                                sectionName: ReadDropDownData("Param", '3', true),
                                selectCourse: 0,
                                selectSemester: 0,
                                selectSectionName: 0,
                            })
                        this.setState({ rowData: MyData });
                    }

                }.bind(this),
                error: function (e) {
                    console.log(e);
                    $("#progress").hide();
                    alert('Error! Please try again');
                }
            })
        }
    },

    register: function (field) {
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields: s
        })
    },
    onChangeCode: function (value) {
        this.setState({
            sectionCode: value
        });
    },
    onChangSectioneName: function (value) {
        this.setState({
            selectSectionName: value
        });
    },
    onChangeCourse: function (value) {
        this.setState({
            selectCourse: value
        });
    },
    onChangeSemester: function (value) {
        this.setState({
            selectSemester: value
        });
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Add/Update Section Management</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form name='CourseForm' noValidate onSubmit={this.handleSubmit}>

                            <ul>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectCourse} data={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                        onChange={this.onChangeCourse} keyName={'COURSE_NAME'} keyId={'COURSE_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                   
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectSemester} data={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                        onChange={this.onChangeSemester} keyName={'COURSE_NAME'} keyId={'COURSE_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectSectionName} data={this.state.sectionName} label={'Section Name'} name={'sectionName'} htmlFor={'sectionName'} isrequired={true}
                                        onChange={this.onChangSectioneName} keyName={'PARAM_NAME'} keyId={'PARAM_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <input type="submit" className="btn btn-success" value="Save" />
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
ReactDOM.render(<SectionForm />, document.getElementById('sectionform'));