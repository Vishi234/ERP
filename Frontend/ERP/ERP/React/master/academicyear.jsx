
var AcademicYearForm = React.createClass({
    getInitialState: function () {
        return {
            yearCode: "",
            academicYear: "",
            wfDate: "",
            wtDate: "",
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
    onChangeYear: function (value) {
        this.setState({
            academicYear: value
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
                <div className="fbse">
                    <div className="tab-base">
                        <ul className="nav nav-tabs">
                            <li className="active">
                                <a data-toggle="tab" href="#Create">Academic Year</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="Create" className="tab-pane fade in active show">
                                <div className="acform">
                                    <form name='AcademicYear' noValidate onSubmit={this.handleSubmit}>
                                        <ul>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.yearCode} label={'Enter Code'} name={'yearCode'} htmlFor={'yearCode'} isrequired={true}
                                                    onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                                    onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'date'} value={this.state.wfDate} label={'Start Date'} name={'wfDate'} htmlFor={'wfDate'} isrequired={true}
                                                className={'startDate form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'date'} value={this.state.wtDate} label={'End Date'} name={'wtDate'} htmlFor={'wtDate'} isrequired={true}
                                                className={'endDate form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <input type="submit" className="btn btn-success" value="Save" />
                                            </li>
                                        </ul>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<AcademicYearForm urlPost="/Master/Academic" />, document.getElementById('academicform'));
