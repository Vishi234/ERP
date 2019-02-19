var SubjectForm = React.createClass({
    getInitialState: function () {
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$SubjectDetails$"];
        var records = JSON.parse(content.addParams);
        jsonData = GetJsonData('../../Content/DynamicJs/DropdownData.json'); 
        debugger;
        return {
            subjectCode: "",
            subjectName: "",
            shortName: "",
            medium: ReadDropDownData("Param", '4', true),
            activityType: ReadDropDownData("Param", '2', true),
            subjectType: ReadDropDownData("Param", '5', true),
            selectedMedium: 0,
            selectedActivityType: 0,
            selectedSubjectType:0,
            Fields: [],
            columnDef: columnDefs,
            rowData: records,
            records: ((records == null) ? 0 : records.length),
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
                subjectCode: this.state.subjectCode,
                subjectName: this.state.subjectName,
                shortName: this.state.shortName,
                medium: this.state.selectedMedium,
                activityType: this.state.selectedActivityType,
                subjectType: this.state.selectedSubjectType,
                reportId: 5,
                flag: 'A'

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    btnloading("SubjectForm", 'show');
                },
                success: function (data) {
                    btnloading("SubjectForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                subjectCode: "",
                                subjectName: "",
                                shortName: "",
                                medium: ReadDropDownData("Param", '4', true),
                                activityType: ReadDropDownData("Param", '2', true),
                                subjectType: ReadDropDownData("Param", '5', true),
                                selectedMedium: 0,
                                selectedActivityType: 0,
                                selectedSubjectType: 0,
                            })
                        this.setState({ rowData: MyData });
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("subjectForm", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    },
    register: function (field) {
        var s = this.state.Fields;
        s.push(field);
        this.setState({
            Fields: s
        })
    },
    onChangeCode: function (value) {
        this.setState({
            subjectCode: value
        });
    },
    onChangeName: function (value) {
        this.setState({
            subjectName: value
        });
    },
    onChangeShortName: function (value) {
        this.setState({
            shortName: value
        });
    },
    onChangeMedium: function (value) {
        this.setState({
            selectedMedium: value
        });
    },
    onChangeType: function (value) {
        this.setState({
            selectedActivityType: value
        });
    },
    onChangeSubType: function (value) {
        this.setState({
            selectedSubjectType: value
        });
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Subject Management</span>
                        <span className="pull-right toptotal">{this.state.records} Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form name='SubjectForm' id="subjectForm" noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>
                                    <CreateInput type={'text'} value={this.state.subjectCode} label={'Subject Code'} name={'subjectCode'} htmlFor={'subjectCode'} isrequired={true}
                                        onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'text'} value={this.state.subjectName} label={'Subject Name'} name={'subjectName'} htmlFor={'subjectName'} isrequired={true}
                                        onChange={this.onChangeName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'text'} value={this.state.shortName} label={'Short Name'} name={'shortName'} htmlFor={'shortName'} isrequired={true}
                                        onChange={this.onChangeShortName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedMedium} data={this.state.medium} label={'Medium'} name={'medium'} htmlFor={'medium'} isrequired={true}
                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeMedium} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedActivityType} data={this.state.activityType} label={'Activity Type'} name={'activityType'} htmlFor={'activityType'} isrequired={true}
                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.selectedSubjectType} data={this.state.subjectType} label={'Subject Type'} name={'subjectType'} htmlFor={'subjectType'} isrequired={true}
                                        keyId={'PARAM_ID'} keyName={'PARAM_NAME'} onChange={this.onChangeSubType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <input type="submit" className="btn btn-success" value="Save" />
                                </li>
                            </ul>

                        </form>
                    </div>
                   
                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                </div>
            </div>
        );
    }
});
ReactDOM.render(<SubjectForm urlPost="/Master/Subject" />, document.getElementById('subjectform')); 