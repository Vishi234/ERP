var SectionForm = React.createClass({
    getInitialState: function () {
        var columnDefs = [
            { headerName: "Make", field: "make" },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price" }
        ];
        var rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];
        this.state = {
        }
        return {
            course: this.getCourseDDL(),
            semester : this.getCourseDDL(),
            sectionName : this.getSectionDDL(),
            Fields: [],
            columnDef: columnDefs,
            rowData: rowData,
            ServerMessage: ''
        }
    },
   
    getCourseDDL: function () {
        $.ajax({
            type: "GET",
            url: "/Master/GetCourseDDL?ddlType=2",
            async: false,
            success: function (data) {
                teamsFromApi = JSON.parse(data);
            }
        });
        return teamsFromApi;
    },

    getSectionDDL: function () {
        $.ajax({
            type: "GET",
            url: "/Master/GetParamList?flag=S&ddlType=2",
            async: false,
            success: function (data) {
                teamsFromApi = JSON.parse(data);
            }
        });
        return teamsFromApi;
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
                course: this.state.course,
                semester: this.state.semester,
                sectionName: this.state.sectionName,
                flag: 'A'
            }
            $.ajax({
                type: "POST",
                url: '/Master/GetParamList',
                data: d,
                async: false,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    $("#progress").hide();
                    console.log(data);
                    if (data.flag == "S")
                    {
                        alert('Save Success fully')
                    }
                    else if (data.flag == "D")
                    {
                        $("#selectorg").modal("show");
                    }
                    else {
                        CallToast(data.msg, data.flag);
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
    onChangeName: function (value) {
        this.setState({
            sectionName: value
        });
    },
    onChangeCourse: function (value) {
        this.setState({
            course: value
        });
    },
    onChangeSemester: function (value) {
        this.setState({
            semester: value
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
                                    <CreateInput type={'ddl'} value={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                        onChange={this.onChangeCourse} keyName={'COURSE_NAME'} keyId={'COURSE_ID'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                        onChange={this.onChangeSemester} keyName={'COURSE_NAME'} keyId={'COURSE_ID'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.sectionName} label={'Section Name'} name={'sectionName'} htmlFor={'sectionName'} isrequired={true}
                                        onChange={this.onChangeName} keyName={'PARAM_NAME'} keyId={'PARAM_ID'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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