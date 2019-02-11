var CourseForm = React.createClass({
    getInitialState: function () {
        return {
            yearCode: "",
            courseName: "",
            noSem: "",
            Fields: [],
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
                yearCode: this.state.yearCode,
                academicYear: this.state.academicYear,
                wfDate: this.state.wfDate,
                wtDate: this.state.wtDate,
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
    onChangeCode: function (value) {
        this.setState({
            yearCode: value
        });
    },
    onChangecourseName: function (value) {
        this.setState({
            courseName: value
        });
    }, 
    onChangenoSem: function(value) {
        this.setState({
            noSem: value
        });
    }, 
    //register input controls
    register: function (field) {
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields: s
        })
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Course Details
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Course</span>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <CreateInput type={'text'} value={this.state.yearCode} label={'Enter Code'} name={'yearCode'} htmlFor={'yearCode'} isrequired={true}
                                            onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <CreateInput type={'text'} value={this.state.courseName} label={'Course Name'} name={'courseName'} htmlFor={'courseName'} isrequired={true}
                                            onChange={this.onChangecourseName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                   </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <CreateInput type={'text'} value={this.state.noSem} label={'Semester Number'} name={'noSem'} htmlFor={'noSem'} isrequired={true}
                                            onChange={this.onChangenoSem} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </div>
                                </li>
                            </ul>
                            <input type="submit" className="btn btn-success" value="Save" />
                        </form>
                    </div>
                </div>

            </div>
        );
    }
});
ReactDOM.render(<CourseForm />, document.getElementById('courseform'));