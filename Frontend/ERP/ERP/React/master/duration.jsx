var CourseDurationForm = React.createClass({
    getInitialState: function () {
        var columnDefs = [
            { headerName: "Make", field: "make" },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price" }
        ];

        // specify the data
        var rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];
        return {
            academicYear: 0,
            course: 0,
            semester: 0,
            wefDate: "",
            wetDate: "",
            Fields: [],
            optionData:[],
            columnDef: columnDefs,
            rowData: rowData,
            ServerMessage: ''
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
                academicYear: this.state.academicYear,
                course: this.state.course,
                semester: this.state.semester,
                wefDate: this.state.wefDate,
                wetDate: this.state.wetDate,
                flag: 'A'
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    $("#progress").hide();
                    console.log(data);
                    if (data.flag == "S") {
                        window.location.href = "/Dashboard/Overview";
                    }
                    else if (data.flag == "D") {
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
    onChangeYear: function (value) {
        this.setState({
            academicYear: value
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
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form name='CourseForm' noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>

                                    <CreateInput type={'ddl'} value={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                        onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                        onChange={this.onChangeCourse} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                        className={'form-control'} onChange={this.onChangeSemester} onComponentMounted={this.register} messageRequired={'required.'} />
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
ReactDOM.render(<CourseDurationForm urlPost="/Master/Duration" />, document.getElementById('durationform'));