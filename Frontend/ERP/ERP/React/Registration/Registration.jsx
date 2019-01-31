var MyInput = React.createClass({
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
var RegistrationForm = React.createClass({
    getInitialState: function () {
        return {
            Email: '',
            Password: '',
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
                email: this.state.Email,
                password: this.state.Password
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
                    if (data.ERROR_FLAG == "S") {
                        window.location.href = "/Dashboard/Overview";
                    }
                    else {
                        CallToast(data.ERROR_MSG, data.ERROR_FLAG);
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
    onChangeEmail: function (value) {
        this.setState({
            Email: value
        });
    },
    onChangePassword: function (value) {
        this.setState({
            Password: value
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
            <div className="col-lg-10 col-xs-8 col-sm-6 col-md-8">             
                <form name="registrationForm" noValidate onSubmit={this.handleSubmit}>
                    <div className="Registrationform">        
                    <div className="tpara">
                        <span className="pull-left">Registration</span>
                    </div>
                        <MyInput type={'firstName'} value={this.state.firstName} label={'First Name'} name={'firstName'} htmlFor={'firstName'} isrequired={true}
                            onChange={this.onChangeEmail} className="form-control col-md-3" onComponentMounted={this.register} messageRequired={'First Name Required'} />
                        <MyInput type={'middleName'} value={this.state.middleName} label={'Middle Name'} name={'middleName'} htmlFor={'middleName'} isrequired={true}
                            onChange={this.onChangePassword} className="form-control col-md-3" onComponentMounted={this.register} messageRequired={'Middle Name required'} />
                        <MyInput type={'lastName'} value={this.state.lastName} label={'Last Name'} name={'lastName'} htmlFor={'lastName'} isrequired={true}
                            onChange={this.onChangeEmail} className="form-control col-md-3" onComponentMounted={this.register} messageRequired={'Last Name Required'}/>
                        <MyInput type={'fatherfName'} value={this.state.fatherfName} label={'Father First Name'} name={'fatherfName'} htmlFor={'fatherfName'} isrequired={true}
                            onChange={this.onChangePassword} className="form-control col-md-2" onComponentMounted={this.register} messageRequired={'Father First Name required'} />
                    <div className="form-group">
                        <button type="submit" className="btn btn-success btnDisable col-md-2">Register</button>
                    </div>
                  </div>
            </form>
        </div>
        );
    }
});
//Render react component into the page
ReactDOM.render(<RegistrationForm urlPost="/Auth/Login" />,document.getElementById('Registration'));
