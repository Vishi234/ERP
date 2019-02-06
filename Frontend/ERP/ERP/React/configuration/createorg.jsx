﻿var CreateFields = React.createClass({
    //onchange event
    handleChange: function (e) {
        this.props.onChange(e.target.value);
        var isValidField = this.isValid(e.target);
    },
    //validation function
    isValid: function (input) {
        //check required field
        if (input.getAttribute('required') != null && input.value === "") {
            input.classList.add('input-validation-error'); //add class error
            input.nextSibling.classList.add('field-validation-error');
            input.nextSibling.textContent = this.props.messageRequired; // show error message
            return false;
        }
        else {
            input.classList.remove('input-validation-error');
            input.nextSibling.classList.remove('field-validation-error');
            input.nextSibling.textContent = "";
            return true;
        }
    },
    componentDidMount: function () {
        if (this.props.onComponentMounted) {
            this.props.onComponentMounted(this); //register this input in the form
        }
    },
    render: function () {
        var inputField;
        if (this.props.type == 'textarea') {
            inputField = <textarea value={this.props.value} ref={this.props.name} name={this.props.name}
                className='form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        else {
            inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} name={this.props.name}
                className='form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        return (
            <div className="form-group">
                <label htmlFor={this.props.htmlFor}>{this.props.label}:</label>
                {inputField}
                <span className="field-validation-error"></span>
            </div>
        );
    }
})
var CreateOrg = React.createClass({
    getInitialState: function () {
        return {
            orgName: "",
            orgAdd1: "",
            orgCity: "",
            orgPhone: "",
            orgAdd2: "",
            orgMobile: "",
            orgWebsite: "",
            orgFax: "",
            orgEmail: "",
            orgPan: "",
            oper: "",
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
                orgName: this.state.orgName,
                orgAdd1: this.state.orgAdd1,
                orgCity: this.state.orgCity,
                orgPhone: this.state.orgPhone,
                orgAdd2: this.state.orgAdd2,
                orgMobile: this.state.orgMobile,
                orgWebsite: this.state.orgWebsite,
                orgFax: this.state.orgFax,
                orgEmail: this.state.orgEmail,
                orgPan: this.state.orgPan,
                oper: 'A',
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
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
    onChangeorgName: function (value) {
        this.setState({
            orgName: value
        });
    },
    onChangeorgAdd1: function (value) {
        this.setState({
            orgAdd1: value
        });
    },
    onChangeorgCity: function (value) {
        this.setState({
            orgCity: value
        });
    },
    onChangeorgPhone: function (value) {
        this.setState({
            orgPhone: value
        });
    },
    onChangeorgAdd2: function (value) {
        this.setState({
            orgAdd2: value
        });
    },
    onChangeorgMobile: function (value) {
        this.setState({
            orgMobile: value
        });
    },
    onChangeorgWebsite: function (value) {
        this.setState({
            orgWebsite: value
        });
    },
    onChangeorgFax: function (value) {
        this.setState({
            orgFax: value
        });
    },
    onChangeorgEmail: function (value) {
        this.setState({
            orgEmail: value
        });
    },
    onChangeorgPan: function (value) {
        this.setState({
            orgPan: value
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
                <div className="modal fade" id="createorg" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create Organization</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="createorg">
                                    <form noValidate onSubmit={this.handleSubmit}>
                                        <div className="setupform">
                                            <div className="form-group">
                                                <CreateFields type={'orgName'} value={this.state.orgName} label={'Enter Name of Oraganization'} name={'orgName'} htmlFor={'orgName'} isrequired={true}
                                                    onChange={this.onChangeorgName} className="form-control col-md-12" onComponentMounted={this.CreateOrg} messageRequired={'Name of Oraganization required'} />
                                            </div>
                                            <div className="title">
                                                <span><i className="fa fa-list"></i>Basic Details</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4">
                                                    <div className="formbase">
                                                        <div className="form-group">
                                                            <CreateFields type={'orgAdd1'} value={this.state.orgAdd1} label={'Address Line 1'} name={'orgAdd1'} htmlFor={'orgAdd1'} isrequired={true}
                                                                onChange={this.onChangeorgAdd1} className="form-control" onComponentMounted={this.CreateOrg} messageRequired={'Address Line 1 required'} />
                                                        </div>
                                                        <div className="form-group">
                                                            <CreateFields type={'orgCity'} value={this.state.orgCity} label={'City'} name={'orgCity'} htmlFor={'orgCity'} isrequired={true}
                                                                onChange={this.onChangeorgCity} className="form-control" onComponentMounted={this.CreateOrg} messageRequired={'City required'} />
                                                        </div>
                                                        <div className="form-group">
                                                            <CreateFields type={'orgPhone'} value={this.state.orgPhone} label={'Phone'} name={'orgPhone'} htmlFor={'orgPhone'} isrequired={true}
                                                                onChange={this.onChangeorgPhone} className="form-control" onComponentMounted={this.CreateOrg} messageRequired={'Phone required'} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4">
                                                    <div className="formbase">
                                                        <div className="form-group">
                                                            <CreateFields type={'orgAdd1'} value={this.state.orgAdd2} label={'Address Line 2'} name={'orgAdd2'} htmlFor={'orgAdd2'} isrequired={true}
                                                                onChange={this.onChangeorgAdd2} className="form-control" onComponentMounted={this.CreateOrg} messageRequired={'Address Line 2 required'} />

                                                        </div>
                                                        <div className="form-group">
                                                            <CreateFields type={'orgMobile'} value={this.state.orgMobile} label={'Mobile'} name={'orgMobile'} htmlFor={'orgMobile'} isrequired={true}
                                                                onChange={this.onChangeorgMobile} className="form-control" onComponentMounted={this.CreateOrg} messageRequired={'Mobile required'} />
                                                        </div>
                                                        <div className="form-group">
                                                            <CreateFields type={'orgMobile'} value={this.state.orgWebsite} label={'Website'} name={'orgWebsite'} htmlFor={'orgWebsite'}
                                                                onChange={this.onChangeorgWebsite} className="form-control" onComponentMounted={this.CreateOrg} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4">
                                                    <div className="formbase">
                                                        <div className="form-group">
                                                            <CreateFields type={'orgFax'} value={this.state.orgFax} label={'Fax No.'} name={'orgFax'} htmlFor={'orgFax'}
                                                                onChange={this.onChangeorgFax} className="form-control" onComponentMounted={this.CreateOrg} />
                                                        </div>
                                                        <div className="form-group">
                                                            <CreateFields type={'orgEmail'} value={this.state.orgEmail} label={'Email'} name={'orgEmail'} htmlFor={'orgEmail'} isrequired={true}
                                                                onChange={this.onChangeorgEmail} className="form-control" onComponentMounted={this.CreateOrg} messageRequired={'Email required'} />
                                                        </div>
                                                        <div className="form-group">
                                                            <CreateFields type={'orgPan'} value={this.state.orgPan} label={'Pan No.'} name={'orgPan'} htmlFor={'orgPan'}
                                                                onChange={this.onChangeorgPan} className="form-control" onComponentMounted={this.CreateOrg} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <span className="pull-left"><a href="javascript:void(0)">I will do it later</a></span>
                                            <span className="pull-right"><input type="submit" className="btn btn-success" value="Create"  /></span>
                                        </div>
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
ReactDOM.render(<CreateOrg urlPost="Dashboard/Overview" />, document.getElementById('create'));