var ActivityForm = React.createClass({
    getInitialState: function () {
        return {
            actName: "",
            status: "",
            actType: "",
            stDate: "",
            endDarw:"",
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
                        window.location.href = "/Master/Activity";
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
    onChangeactName: function (value) {
        this.setState({
            actName: value
        });
    },
    onChangestatus: function (value) {
        this.setState({
            status: value
        });
    },
    onChangeactType: function (value) {
        this.setState({
            actType: value
        });
    },
    onChangestDate: function (value) {
        this.setState({
            stDate: value
        });
    },
    onChangeendDarw: function (value) {
        this.setState({
            endDarw: value
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
                        Activity
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Activity</span>
                    <div className="acform">
                        <form noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <CreateInput type={'text'} value={this.state.actName} label={'Enter Code'} name={'actName'} htmlFor={'actName'} isrequired={true}
                                            onChange={this.onChangeactName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select className="dropdown" data-val="true" name="status" defaultValue={this.state.status} isrequired={true} messageRequired={'required.'}   >
                                            <option value="Active">Active</option>
                                            <option value="In-Active">In-Active</option>  
                                        </select> 
                                    </div>
                                </li>
                                <li>
                                   <div className="form-group">
                                        <label>Activity Type</label>
                                        <select className="dropdown" data-val="true" name="status" defaultValue={this.state.actType} isrequired={true} onChange={this.onChangeactType} messageRequired={'required.'} >
                                            <option value="Temporary">Temporary</option>
                                            <option value="Permanent">Permanent</option>
                                        </select> 
                                   </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        
                                        <CreateInput type={'date'} value={this.state.stDate} label={'Start Date'} name={'stDate'} htmlFor={'stDate'} isrequired={true}
                                            className={'startDate form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <CreateInput type={'date'} value={this.state.endDate} label={'End Date'} name={'endDate'} htmlFor={'endDate'} isrequired={true}
                                            className={'endDate form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
ReactDOM.render(<ActivityForm urlPost="/Dashboard/Overview" />, document.getElementById('activityform'));