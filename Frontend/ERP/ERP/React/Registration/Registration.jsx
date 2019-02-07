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
                className='registration-form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        else {
            inputField = <input type={this.props.type} value={this.props.value} ref={this.props.name} name={this.props.name}
                className='registration-form-control' required={this.props.isrequired} onChange={this.handleChange} />
        }
        return (
            <div className="form-group">
                <label className="label--title" htmlFor={this.props.htmlFor}>{this.props.label}:</label>
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
           
            <div className="col-sm-12">       
                <form name="registrationForm" noValidate onSubmit={this.handleSubmit}>
                    <div className="Registrationform">        
                    <div className="tpara">
                        <span className="pull-left">Registration</span>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 col-xs-12 col-sm-6 col-md-10">  
                        <MyInput type={'firstName'} value={this.state.firstName} label={'First Name'} name={'firstName'} htmlFor={'firstName'} isrequired={true}
                             onChange={this.onChangeEmail} className="registration-form-control col-lg-4" onComponentMounted={this.register} messageRequired={'First Name Required'} />               
                        <MyInput type={'fatherfName'} value={this.state.fatherfName} label={'Father First Name'} name={'fatherfName'} htmlFor={'fatherfName'} isrequired={true}
                            onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Father First Name required'} />
                        <MyInput type={'motherfName'} value={this.state.motherfName} label={'Mother First Name'} name={'motherfName'} htmlFor={'motherfName'} isrequired={true}
                            onChange={this.onChangeEmail} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Mother First Name Required'} />                                                     
                         <MyInput type={'fatherOccup'} value={this.state.fatherOccup} label={'Father Occupation'} name={'fatherOccup'} htmlFor={'fatherOccup'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Father Occupation required'} />
                         <MyInput type={'session'} value={this.state.session} label={'Student Session'} name={'session'} htmlFor={'session'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Student Session required'} />                    
                         <MyInput type={'Category'} value={this.state.Category} label={'Category'} name={'Category'} htmlFor={'Category'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Category required'} />
                         <MyInput type={'preSchool'} value={this.state.preSchool} label={'Previous School Name'} name={'preSchool'} htmlFor={'preSchool'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Previous School Name required'} />
                         <MyInput type={'sibilingClass'} value={this.state.sibilingClass} label={'Sibiling Class'} name={'sibilingClass'} htmlFor={'sibilingClass'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />                                                                                    
                         <MyInput type={'admissionSouClass'} value={this.state.admissionSouClass} label={'Admission Sought Class'} name={'admissionSouClass'} htmlFor={'admissionSouClass'}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />
                         <MyInput type={'textarea'} value={this.state.permAddress} label={'Permanent Address'} name={'permAddress'} htmlFor={'permAddress'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Permanent Address required'} />    
                         <MyInput type={'textarea'} value={this.state.coressAddress} label={'Corresponding Address'} name={'coressAddress'} htmlFor={'coressAddress'}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />
                         <MyInput type={'button'} value={this.state.coressAddress} label={'Corresponding Address'} name={'coressAddress'} htmlFor={'coressAddress'}
                             onChange={this.onChangePassword} className="btn btn-danger dropdown-toggle dropdown-toggle-split" onComponentMounted={this.register} />
                            </div>
                    <div className="col-lg-4 col-xs-12 col-sm-6 col-md-10">
                         <MyInput type={'middleName'} value={this.state.middleName} label={'Middle Name'} name={'middleName'} htmlFor={'middleName'} 
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />
                         <MyInput type={'fatherMName'} value={this.state.fatherMName} label={'Father Middle Name'} name={'fatherMName'} htmlFor={'fatherMName'}
                             onChange={this.onChangeEmail} className="registration-form-control col-md-4" onComponentMounted={this.register} />                                                                                             
                         <MyInput type={'motherMName'} value={this.state.motherMName} label={'Mother Middle Name'} name={'motherMName'} htmlFor={'motherMName'}
                              onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />
                         <MyInput type={'motherOccup'} value={this.state.motherOccup} label={'Mother Occupation'} name={'motherOccup'} htmlFor={'motherOccup'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Mother Occupation required'} />
                         <MyInput type={'date'} value={this.state.DOB} label={'Date Of Birth'} name={'DOB'} htmlFor={'DOB'} isrequired={true}
                             onChange={this.onChangeEmail} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Date Of Birth Required'} />                                        
                         <MyInput type={'nationality'} value={this.state.nationality} label={'Nationality'} name={'nationality'} htmlFor={'nationality'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Nationality required'} />
                         <MyInput type={'preClass'} value={this.state.preClass} label={'Previous Class Name'} name={'preClass'} htmlFor={'preClass'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Previous Class Name required'} /> 
                         <MyInput type={'mobile'} value={this.state.mobile} label={'Mobile'} name={'mobile'} htmlFor={'mobile'} isrequired={true}
                              onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Mobile required'} />
                         <MyInput type={'emergrncyContact'} value={this.state.emergrncyContact} label={'Emergency Contact Number'} name={'emergrncyContact'} htmlFor={'sibilingClass'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Emergency Contact Number required'} />  	                        
                         <MyInput type={'permzipCode'} value={this.state.permzipCode} label={'Zip Code'} name={'permzipCode'} htmlFor={'permzipCode'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Zip Code required'} />
                         <MyInput type={'coresszipCode'} value={this.state.coresszipCode} label={'Zip Code'} name={'coresszipCode'} htmlFor={'coresszipCode'}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />
                            </div>
                        <div className="col-lg-4 col-xs-12 col-sm-6 col-md-10">
                         <MyInput type={'lastName'} value={this.state.lastName} label={'Last Name'} name={'lastName'} htmlFor={'lastName'} 
                            onChange={this.onChangeEmail} className="registration-form-control col-md-3" onComponentMounted={this.register} />
                         <MyInput type={'fatherLName'} value={this.state.fatherLName} label={'Father Last Name'} name={'fatherLName'} htmlFor={'fatherLName'}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />        
                         <MyInput type={'motherLName'} value={this.state.motherLName} label={'Mother Last Name'} name={'motherLName'} htmlFor={'motherLName'}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />                                                                                         
                         <MyInput type={'section'} value={this.state.section} label={'Student Section'} name={'section'} htmlFor={'section'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Student Section required'}  />

                         <label className="registration-form-control col-md-3">Gender</label>               
                         <select className="dropdown" data-val="true" className="registration-form-control col-md-3" name="gender" defaultValue={this.state.gender}  >
                             <option value="">  Select Gender </option>
                             <option value="Male">Male</option>
                             <option value="Female">Female</option>
                         </select>
                   
                         <MyInput type={'mediumIns'} value={this.state.mediumIns} label={'Medium Instrution'} name={'mediumIns'} htmlFor={'mediumIns'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Medium Instrution required'} />                                                        
                         <MyInput type={'nameSibiling'} value={this.state.nameSibiling} label={'Sibiling Name'} name={'nameSibiling'} htmlFor={'nameSibiling'}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} />                   
                         <MyInput type={'landline'} value={this.state.landline} label={'Landline'} name={'landline'} htmlFor={'landline'} isrequired={true}
                            onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Landline required'} />                                              
                         <MyInput type={'regisAmount'} value={this.state.regisAmount} label={'Registration Amount'} name={'regisAmount'} htmlFor={'regisAmount'} isrequired={true}
                             onChange={this.onChangePassword} className="registration-form-control col-md-3" onComponentMounted={this.register} messageRequired={'Registration Amount required'} /> 
                        

                            </div>                
                        </div>
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
