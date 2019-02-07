
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
                flag:'A'

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async:false,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    $("#progress").hide();
                    console.log(data);
                    if (data.flag == "S")
                    {
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
    onChangeStartDate: function (value) {
        this.setState({
            wfDate: value
        });
    },
    onChangeEndDate: function (value) {
        this.setState({
            wtDate: value
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
                        Academic Year
                    </span>
                    <div className="pull-right hlink">
                        <ul>
                            <li>
                                <a href="javascript:void(0)" data-target="#academic" className="btn btn-primary openmodal">
                                    <i className="fa fa-plus"></i> Add</a>
                            </li>
                            <li>
                                <input type="text" className="form-control" placeholder="Search inside.." />
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i className="fa fa-download"></i> <i className="fa fa-caret-down"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Academic Year</span>
                    <div className="acform">
                        <form name ='AcademicYear' noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>
                                <div className="form-group">
                                <CreateInput type={'text'} value={this.state.yearCode} label={'Enter Code'} name={'yearCode'} htmlFor={'yearCode'} isrequired={true}
                                        onChange={this.onChangeCode} className="form-control" onComponentMounted={this.register} messageRequired={'Academic Year Code is required.'} />
                                </div>
                                </li>
                                <li>
                                <div className="form-group">
                                <CreateInput type={'text'} value={this.state.academicYear}  label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                    onChange={this.onChangeYear} className="form-control" onComponentMounted={this.register} messageRequired={'Academic Year is required.'} />
                            </div>
                                </li>
                                <li>
                                <div className="form-group">
                                <CreateInput type={'wfDate'} value={this.state.wfDate} label={'Start Date'} name={'wfDate'} htmlFor={'wfDate'} isrequired={true}
                                    onChange={this.onChangeStartDate} className="startDate form-control" onComponentMounted={this.register} messageRequired={'Start Date is required.'} />
                            </div>
                                </li>
                                <li>
                                <div className="form-group">
                                <CreateInput type={'wtDate'} value={this.state.wtDate} label={'End Date'}  name={'wtDate'} htmlFor={'wtDate'} isrequired={true}
                                    onChange={this.onChangeEndDate} className="endDate form-control" onComponentMounted={this.register} messageRequired={'End Date is required.'} />
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
ReactDOM.render(<AcademicYearForm urlPost="/Master/Academic" />, document.getElementById('academicform'));
