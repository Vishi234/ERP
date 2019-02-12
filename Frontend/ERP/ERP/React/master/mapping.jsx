var MappingForm = React.createClass({
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
            course: 0,
            semester: 0,
            subject: 0,
            type: 0,
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
    onChangeCourse: function (value) {
        this.setState({
            course: value
        });
    },
    onChangeSemester: function (value) {
        this.setState({
            semester: value
        });
    },
    onChangeSubject: function (value) {
        this.setState({
            subject: value
        });
    },
    onChangeType: function (value) {
        this.setState({
            type: value
        });
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Courses Subject Mapping</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                        onChange={this.onChangeCourse} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                        onChange={this.onChangeSemester} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.subject} label={'Subject'} name={'subject'} htmlFor={'subject'} isrequired={true}
                                        onChange={this.onChangeSubject} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.type} label={'Subject Type'} name={'type'} htmlFor={'type'} isrequired={true}
                                        onChange={this.onChangeType} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
ReactDOM.render(<MappingForm />, document.getElementById('mappingform'));