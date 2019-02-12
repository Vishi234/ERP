var SubjectForm = React.createClass({
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
            subjectCode: "",
            subjectName: "",
            shortName: "",
            medium: 0,
            activityType: 0,
            subjectType:0,
            Fields: [],
            columnDef: columnDefs,
            rowData: rowData,
            ServerMessage: ''
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
            medium: value
        });
    },
    onChangeType: function (value) {
        this.setState({
            activityType: value
        });
    },
    onChangeSubType: function (value) {
        this.setState({
            subjectType: value
        });
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Subject Management</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form>
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
                                    <CreateInput type={'ddl'} value={this.state.medium} label={'Medium'} name={'medium'} htmlFor={'medium'} isrequired={true}
                                        onChange={this.onChangeMedium} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.activityType} label={'Activity Type'} name={'activityType'} htmlFor={'activityType'} isrequired={true}
                                        onChange={this.onChangeType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.subjectType} label={'Subject Type'} name={'subjectType'} htmlFor={'subjectType'} isrequired={true}
                                        onChange={this.onChangeSubType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
ReactDOM.render(<SubjectForm />, document.getElementById('subjectform'));