var SectionForm = React.createClass({
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
            sectionCode: "",
            sectionName: "",
            course: 0,
            semester: 0,
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
            sectionCode: value
        });
    },
    onChangeName: function (value) {
        this.setState({
            sectionName: value
        });
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
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Section Management</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <CreateInput type={'text'} value={this.state.sectionCode} label={'Section Code'} name={'sectionCode'} htmlFor={'sectionCode'} isrequired={true}
                                        onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'text'} value={this.state.sectionName} label={'Section Name'} name={'sectionName'} htmlFor={'sectionName'} isrequired={true}
                                        onChange={this.onChangeName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                        onChange={this.onChangeCourse} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'ddl'} value={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                        onChange={this.onChangeSemester} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
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
ReactDOM.render(<SectionForm />, document.getElementById('sectionform'));