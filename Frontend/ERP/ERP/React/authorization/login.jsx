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
var LoginForm = React.createClass({
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
                    debugger;
                    $("#progress").hide();
                    var jsonData=JSON.parse(data);                    
                    if (jsonData[jsonData.length - 1].flag=="S")
                    {
                        window.location.href = "/Dashboard/Overview";
                    }
                    else if (jsonData[jsonData.length - 1].flag == "Super Admin")
                    {
                        $("#selectorg").modal("show");
                    }
                    else
                    {
                        CallToast(jsonData[jsonData.length - 1].msg, jsonData[jsonData.length - 1].flag);
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
            <div>
                <div className="lgnheader">
                    <div className="container">
                        <div className="row">
                            <div className="rmenu">
                                <ul>
                                    <li>
                                        <span>Support : +91-9650402952</span>
                                    </li>
                                    <li>
                                        <span><i className="fa fa-microphone"></i> English <i className="fa fa-caret-down"></i></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lgnbdy">
                    <div className="banner">
                        <div className="banner-circle">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4 col-xs-12 col-sm-6 col-md-4">
                                        <div className="bnrdtl">
                                            <h1>
                                                Welcome to IMS University
                                            </h1>
                                            <p>
                                                Learning is enabling the individual to utilize his/ her potential to its fullest.
                                                Without education, the training of the human minds is incomplete.
                                            </p>
                                            <a href="javascript:void(0)">Contact Us</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-xs-12 col-sm-6 col-md-8">
                                        <form name="loginForm" noValidate onSubmit={this.handleSubmit}>
                                            <div className="lgnform">
                                                <div className="tpara">
                                                    <span className="pull-left">LOGIN</span>
                                                </div>
                                                <MyInput type={'email'} value={this.state.Email} label={'Username or Email address'} name={'Email'} htmlFor={'Email'} isrequired={true}
                                                    onChange={this.onChangeEmail} className="form-control col-md-12" onComponentMounted={this.register} messageRequired={'Email Required'} messageEmail={'Invalid Email'} />
                                                <MyInput type={'password'} value={this.state.Password} label={'Password'} name={'Password'} htmlFor={'Password'} isrequired={true}
                                                    onChange={this.onChangePassword} className="form-control col-md-12" onComponentMounted={this.register} messageRequired={'Password required'} />
                                                <p className="pull-right frgt"><a href="javascript:void(0)">Forgot Password?</a></p>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-success btnDisable col-md-12" >Login</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-section">
                        <div className="container">
                            <div className="row">
                                <div className="latestnews">
                                    <span>
                                        Latest News
                                    </span>
                                    <i className="fa fa-caret-right"></i>
                                    <div className="news-content">
                                        I wish all my friends and colleagues in the DAV and the Arya Samaj the very best for the year 2019. "Swasth Raho! Vyasth Raho! Aur Masth Raho!". Punam Suri,
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lgnftr">
                </div>
            </div>
        );
    }
});
//Render react component into the page
ReactDOM.render(<LoginForm urlPost="/Auth/Login" />, document.getElementById('logincontent'));
