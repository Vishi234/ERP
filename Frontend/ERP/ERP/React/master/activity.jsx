var ActivityForm = React.createClass({
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
            actName: "",
            status: 0,
            actType: 0,
            stDate: "",
            endDate: "",
            Fields: [],
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
                actName: this.state.actName,
                status: this.state.status,
                actType: this.state.actType,
                stDate: this.state.stDate,
                endDate: this.state.endDate,
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
    onBlurWefDate: function (value) {
        this.setState({
            stDate: value
        });
    },
    onBlurWetDate: function (value) {
        this.setState({
            endDate: value
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
                    <div className="rttl">
                        <span className="pull-left lft">Activity Management</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>
                                    <CreateInput type={'text'} value={this.state.actName} label={'Activity Name'} name={'actName'} htmlFor={'actName'} isrequired={true}
                                        onChange={this.onChangeactName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.status} label={'Status'} name={'status'} htmlFor={'status'} isrequired={true}
                                        onChange={this.onChangestatus} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.actType} label={'Activity Type'} name={'actType'} htmlFor={'actType'} isrequired={true}
                                        onChange={this.onChangeactType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'date'} value={this.state.stDate} label={'Start Date'} name={'daterangepicker'} htmlFor={'stDate'} isrequired={true}
                                        className={'form-control'} onBlur={this.onBlurWefDate} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'date'} value={this.state.endDate} label={'End Date'} name={'daterangepicker'} htmlFor={'endDate'} isrequired={true}
                                        className={'form-control'} onBlur={this.onBlurWetDate} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <input type="submit" className="btn btn-success" value="Save" />
                                </li>
                            </ul>

                        </form>
                    </div>
                    <div className="actionbse">
                        <div className="aclft pull-left">
                        </div>
                        <div className="acrght pull-right">
                            <input type="text" placeholder="Type here......" className="form-control"></input>
                        </div>
                    </div>
                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                </div>
            </div>
        );
    }
});

ReactDOM.render(<ActivityForm urlPost="/Master/Activity" />, document.getElementById('activityform'));