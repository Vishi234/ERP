var grdArray;
var MyData = null;
var fields = [];
class AdmissionForm extends React.Component {
    constructor(props) {
        super(props);
        //grdArray = GetReportConfiguration("Employee");
        //var columnDefs = grdArray["$EmployeeDetails$"];
        //var records = JSON.parse(content.addParams);
        this.state =
            {
                empCode: "",
                empPunchCard: "",
                empDepartment: "",
                empDesignation: "",
                empSupervisior: "",
                empType: "",
                empIsMember: "",
                nationality: "",
                addarCard: "",
                empLastName: "",
                empMName: "",
                empFirstName: "",
                gender: "",
                DOB: "",
                bloodgrp: "",
                maritalst: "",
                joinDate: "",
                address: "",
                city: "",
                pinCode: "",
                phone: "",
                mobile: "",
                email: "",
                state: "",
                country: "",
                Username: "",
                password: "",
                conPassword: "",
                defPage: "",
                panCard: "",
                accNumber: "",
                accStatus: "",
                bank: "",
                SelectedGender: [],
                SelectedMarital: [],
                SelectedBloodG: [],
                selectedDepartment: [],
                selectedDesignation: [],
                selectedEmptType: [],
                SelectedIsMember: [],
                SelectedState: [],
                SelectedCountry: [],
                SelectedAccStatus: [],
                SelectedBank: [],
                Fields: [],
                //columnDef: columnDefs,
                //rowData: records,
                //records: ((records == null) ? 0 : records.length),
                ServerMessage: ''
            };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                empCode: this.state.empCode,
                empPunchCard: this.state.empPunchCard,
                empDepartment: this.state.selectedDepartment,
                empDesignation: this.state.selectedDesignation,
                empSupervisior: this.state.empSupervisior,
                empType: this.state.selectedEmptType,
                empIsMember: this.state.SelectedIsMember,
                flag: 'A',
                reportId: 8
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("employeeGeneral", 'show');
                },
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                empCode: "",
                                empPunchCard: "",
                                empDepartment: "",
                                empDesignation: "",
                                empSupervisior: "",
                                empType: "",
                                empIsMember: "",
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                accStatus: "",
                                bank: "",
                                selectedDepartment: [],
                                selectedDesignation: [],
                                selectedEmptType: [],
                                SelectedIsMember: [],
                                SelectedAccStatus: [],
                                SelectedBank: [],
                            })
                        //this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }

    handlePersSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                empLastName: this.state.empLastName,
                empMName: this.state.empMName,
                empFirstName: this.state.empFirstName,
                gender: this.state.SelectedGender,
                DOB: this.state.DOB,
                bloodgrp: this.state.SelectedBloodG,
                maritalst: this.state.SelectedMarital,
                joinDate: this.state.joinDate,
                flag: 'A',
                reportId: 9
            }
            $.ajax({
                type: "POST",
                url: this.props.personalPost,
                data: d,
                beforeSend: function () {
                    btnloading("employeeGeneral", 'show');
                },
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                empCode: "",
                                empPunchCard: "",
                                empDepartment: "",
                                empDesignation: "",
                                empSupervisior: "",
                                empType: "",
                                empIsMember: "",
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                accStatus: "",
                                bank: "",
                                selectedDepartment: [],
                                selectedDesignation: [],
                                selectedEmptType: [],
                                SelectedIsMember: [],
                                SelectedAccStatus: [],
                                SelectedBank: [],
                            })
                        //this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }

    handleContSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                address: this.state.address,
                country: this.state.SelectedCountry,
                city: this.state.city,
                state: this.state.SelectedState,
                pinCode: this.state.pinCode,
                phone: this.state.phone,
                mobile: this.state.mobile,
                email: this.state.email,
                flag: 'A',
                reportId: 10
            }
            $.ajax({
                type: "POST",
                url: this.props.contactPost,
                data: d,
                beforeSend: function () {
                    btnloading("employeeGeneral", 'show');
                },
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                empCode: "",
                                empPunchCard: "",
                                empDepartment: "",
                                empDesignation: "",
                                empSupervisior: "",
                                empType: "",
                                empIsMember: "",
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                accStatus: "",
                                bank: "",
                                selectedDepartment: [],
                                selectedDesignation: [],
                                selectedEmptType: [],
                                SelectedIsMember: [],
                                SelectedAccStatus: [],
                                SelectedBank: [],
                            })
                        //this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }

    handleAuthSubmit(e) {
        var validForm = true;
        e.preventDefault();
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                Username: this.state.Username,
                password: this.state.password,
                conPassword: this.state.conPassword,
                defPage: this.state.defPage,
                panCard: this.state.panCard,
                accNumber: this.state.accNumber,
                accStatus: this.state.SelectedAccStatus,
                bank: this.state.SelectedBank,
                flag: 'A',
                reportId: 11
            }
            $.ajax({
                type: "POST",
                url: this.props.authPost,
                data: d,
                beforeSend: function () {
                    btnloading("employeeGeneral", 'show');
                },
                success: function (data) {
                    btnloading("employeeGeneral", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                empCode: "",
                                empPunchCard: "",
                                empDepartment: "",
                                empDesignation: "",
                                empSupervisior: "",
                                empType: "",
                                empIsMember: "",
                                Username: "",
                                password: "",
                                conPassword: "",
                                defPage: "",
                                panCard: "",
                                accNumber: "",
                                accStatus: "",
                                bank: "",
                                selectedDepartment: [],
                                selectedDesignation: [],
                                selectedEmptType: [],
                                SelectedIsMember: [],
                                SelectedAccStatus: [],
                                SelectedBank: [],
                            })
                        //this.setState({ rowData: MyData });
                        //this.setState({ records: MyData.length })
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("employeeGeneral", 'hide');
                    alert('Error! Please try again');
                }
            })
            e.preventDefault();
        }
    }



    onChangeCode(value) {
        this.setState({
            empCode: value
        });
    }
    onChangePunchCard(value) {
        this.setState({
            empPunchCard: value
        });
    }
    onChangeDepartment(value) {
        this.setState({
            selectedDepartment: value
        });
    }
    onChangeDesignation(value) {
        this.setState({
            selectedDesignation: value
        });
    }
    onChangeSupervisior(value) {
        this.setState({
            empSupervisior: value
        });
    }
    onChangeType(value) {
        this.setState({
            selectedEmptType: value
        });
    }
    onChangeIsMember(value) {
        this.setState({
            SelectedIsMember: value
        });
    }
    onChangeFName(value) {
        this.setState({
            empFirstName: value
        });
    }
    onChangeMName(value) {
        this.setState({
            empMName: value
        });
    }
    onChangeLName(value) {
        this.setState({
            empLastName: value
        });
    }
    onChangeGender(value) {
        this.setState({
            SelectedGender: value
        });
    }
    onChangeAddar(value) {
        this.setState({
            addarCard: value
        });
    }

    onChangeBlood(value) {
        this.setState({
            SelectedBloodG: value
        });
    }

    onChangeMarital(value) {
        this.setState({
            SelectedMarital: value
        });
    }
    onChangeNationality(value) {
        this.setState({
            nationality: value
        });
    }
    onChangeGender(value) {
        this.setState({
            SelectedGender: value
        });
    }

    onChangeAddar(value) {
        this.setState({
            addarCard: value
        });
    }

    onChangeBlood(value) {
        this.setState({
            SelectedBloodG: value
        });
    }
    onJoinBlur(value) {
        this.setState({
            DOBDate: value
        });
    }
    onDOBBlur(value) {
        this.setState({
            JoinDate: value
        });
    }
    onChangeAddress(value) {
        this.setState({
            address: value
        });
    }
    onChangeCity(value) {
        this.setState({
            city: value
        });
    }
    onChangePinCode(value) {
        this.setState({
            pinCode: value
        });
    }
    onChangePhone(value) {
        this.setState({
            phone: value
        });
    }

    onChangeMobile(value) {
        this.setState({
            mobile: value
        });
    }

    onChangeEmail(value) {
        this.setState({
            email: value
        });
    }

    onChangeState(value) {
        this.setState({
            SelectedState: value
        });
    }
    onChangeCountry(value) {
        this.setState({
            SelectedCountry: value
        });
    }
    onChangeUsername(value) {
        this.setState({
            Username: value
        });
    }
    onChangePassword(value) {
        this.setState({
            password: value
        });
    }
    onChangeConPassword(value) {
        this.setState({
            conPassword: value
        });
    }
    onChangeDefPage(value) {
        this.setState({
            defPage: value
        });
    }

    onChangePanCard(value) {
        this.setState({
            panCard: value
        });
    }

    onChangeAccNumber(value) {
        this.setState({
            accNumber: value
        });
    }

    onChangeAccStatus(value) {
        this.setState({
            SelectedAccStatus: value
        });
    }
    onChangeBank(value) {
        this.setState({
            SelectedCountry: value
        });
    }
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    //GetData(data) {
    //    this.setState({ rowData: data });
    //}
    render() {
        return (
            <div>
                <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Employee Management</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Employee</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Manage
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="block-body container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                            <div className="card">
                                <div className="accordion" id="accordion">
                                    <div>
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#generalcollapse" aria-expanded="true" aria-controls="generalcollapse">General Information</button>
                                            </h5>
                                        </div>
                                        <div id="generalcollapse" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div className="body">
                                                <div className="rgtfrm rgtfrmexp">
                                                    <div className="acform">
                                                        <form name='GeneralForm' id="GeneralForm" noValidate onSubmit={this.handleSubmit}>
                                                            <ul>
                                                                <li>
                                                                    <CreateInput type={'ddl'} value={this.state.empCode} label={'Employee Code'} name={'empCode'} htmlFor={'empCode'}
                                                                                 isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />

                                                                </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.empPunchCard} label={'Punch Card Number'} name={'empPunchCard'}
                                                                         htmlFor={'empPunchCard'}
                                                                         isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.selectedDepartment} data={this.state.empDepartment} label={'Department'}
                                                                         name={'empDepartment'} htmlFor={'empDepartment'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.selectedDesignation} data={this.state.empDesignation} label={'Designation'}
                                                                         name={'empDesignation'} htmlFor={'empDesignation'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.empSupervisior} label={'Supervisior Code'} name={'Supervisior Code'}
                                                                         htmlFor={'empSupervisior'}
                                                                         isrequired={true} onChange={this.onChangeCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.selectedEmptType} data={this.state.empType} label={'Employee Type'}
                                                                         name={'empType'} htmlFor={'empType'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.SelectedIsMember} data={this.state.empIsMember} label={'Employee Type'}
                                                                         name={'empIsMember'} htmlFor={'empIsMember'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.empFirstName} label={'First Name'} name={'empFirstName'} htmlFor={'empFirstName'}
                                                                         isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.empMName} label={'Last Name'} name={'empMName'} htmlFor={'empMName'}
                                                                         isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.empLastName} label={'Last Name'} name={'empLastName'} htmlFor={'empLastName'}
                                                                         isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.SelectedGender} label={'Gender'} data={this.state.gender}
                                                                         name={'gender'} htmlFor={'gender'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'date'} value={this.state.SelectedDOB} id={'DOBDate'} label={'Date Of Birth'} name={'DOB'} htmlFor={'DOB'} isrequired={true}
                                                                         className={'startDate form-control'} onBlur={this.onDOBBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.addarCard} label={'Adhaar Card No.'} name={'addarCard'} htmlFor={'addarCard'}
                                                                         isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.SelectedBloodG} label={'Blood Group'} data={this.state.bloodgrp}
                                                                         name={'bloodgrp'} htmlFor={'bloodgrp'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'ddl'} value={this.state.SelectedMarital} label={'Marital Status'} data={this.state.maritalst}
                                                                         name={'maritalst'} htmlFor={'maritalst'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                         onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'text'} value={this.state.nationality} label={'Nationality'} name={'nationality'} htmlFor={'nationality'}
                                                                         isrequired={true} onChange={this.onChangeFName.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <CreateInput type={'date'} value={this.state.SelectedJoinDate} id={'JoinDate'} label={'Joining Date'} name={'joinDate'} htmlFor={'joinDate'} isrequired={true}
                                                                         className={'startDate form-control'} onBlur={this.onJoinBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                                            </li>
                                                            <li>
                                                            <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                                            </li>
                                                            </ul>
                                                            <div className="empbse">
                                                                <div className="empimg">
                                                                    <img src="/Images/user-img.png" />
                                                                </div>
                                                                <a href="javascript:void(0)"></a>
                                                                <input type="file" />
                                                            </div>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="card-header" id="contact">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#contactcollapse" aria-expanded="true" aria-controls="contactcollapse">Contact Information</button>
                                            </h5>
                                        </div>
                                        <div id="contactcollapse" className="collapse" aria-labelledby="contact" data-parent="#accordion">
                                        <div className="body">
                                                <div className="rgtfrm">
                                                    <div className="acform cstform">
                                                        <form name='ContactForm' id="ContactForm" noValidate onSubmit={this.handleContSubmit}>
                                                            <ul>
                                                                <li>
                                                                     <CreateInput type={'text'} value={this.state.address} label={'Address'} name={'address'} htmlFor={'address'}
                                                                                  isrequired={true} onChange={this.onChangeAddress.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'ddl'} value={this.state.SelectedCountry} label={'Country'} data={this.state.country}
                                                                             name={'country'} htmlFor={'country'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                             onChange={this.onChangeCountry} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.city} label={'City'} name={'city'} htmlFor={'city'}
                                                                             isrequired={true} onChange={this.onChangeCity.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'ddl'} value={this.state.SelectedState} label={'State'} data={this.state.state}
                                                                             name={'state'} htmlFor={'state'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                             onChange={this.onChangeState} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.pinCode} label={'Pincode'} name={'pinCode'} htmlFor={'pinCode'}
                                                                             isrequired={true} onChange={this.onChangePinCode.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.phone} label={'Phone'} name={'phone'} htmlFor={'phone'}
                                                                             isrequired={true} onChange={this.onChangePhone.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.mobile} label={'Mobile'} name={'mobile'} htmlFor={'mobile'}
                                                                             isrequired={true} onChange={this.onChangeMobile.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.email} label={'Email Address'} name={'email'} htmlFor={'email '}
                                                                             isrequired={true} onChange={this.onChangeEmail.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                                                </li>
                                                            </ul>
                                                        </form>
                                                    </div>
                                                </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="card-header" id="authentication">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#authcollapse" aria-expanded="true" aria-controls="authcollapse">Authentication Information</button>
                                            </h5>
                                        </div>
                                        <div id="authcollapse" className="collapse" aria-labelledby="authentication" data-parent="#accordion">
                                            <div className="body">
                                                <div className="rgtfrm">
                                                    <div className="acform cstform">
                                                        <form name='AuthenticationForm' id="AuthForm" noValidate onSubmit={this.handleAuthSubmit}>
                                                            <ul>
                                                                <li>
                                                                     <CreateInput type={'text'} value={this.state.username} label={'Username'} name={'username'} htmlFor={'username'}
                                                                                  isrequired={true} onChange={this.onChangeUsername.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.password} label={'Password'} name={'password'} htmlFor={'password'}
                                                                             isrequired={true} onChange={this.onChangePassword.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.conPassword} label={'Confirm Password'} name={'conPassword'} htmlFor={'conPassword'}
                                                                             isrequired={true} onChange={this.onChangeConPassword.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.defPage} label={'Default Page'} name={'defPage'} htmlFor={'defPage'}
                                                                             isrequired={true} onChange={this.onChangeDefPage.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'ddl'} value={this.state.SelectedAccStatus} label={'Account Status'} data={this.state.accStatus}
                                                                             name={'accStatus'} htmlFor={'accStatus'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                             onChange={this.onChangeAccStatus} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.panCard} label={'Pan Card Number'} name={'panCard'} htmlFor={'panCard'}
                                                                             isrequired={true} onChange={this.onChangePanCard.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'ddl'} value={this.state.SelectedBank} label={'Bank'} data={this.state.bank}
                                                                             name={'bank'} htmlFor={'bank'} isrequired={true} keyId={'PARAM_ID'} keyName={'PARAM_NAME'}
                                                                             onChange={this.onChangeBank} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <CreateInput type={'text'} value={this.state.accNumber} label={'Bank Account Number'} name={'accNumber'} htmlFor={'accNumber'}
                                                                             isrequired={true} onChange={this.onChangeAccNumber.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                                                </li>
                                                                <li>
                                                                <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                                                </li>
                                                            </ul>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<AdmissionForm urlPost='' personalPost='' contactPost='' authPost='' />, document.getElementById('admissionform'));