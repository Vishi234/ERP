var CourseForm = React.createClass({
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
            courseCode: "",
            courseName: "",
            noOfSemester: "",
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
            courseCode: value
        });
    },
    onChangeName: function (value) {
        this.setState({
            courseName: value
        });
    },
    onChangeSemester: function (value) {
        this.setState({
            noOfSemester: value
        });
    },
    render: function () {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="tab-base">
                        <ul className="nav nav-tabs">
                            <li className="active">
                                <a href="javascript:void(0)">Course Creation</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div id="Create" className="tab-pane fade in active show">
                                <div className="acform">
                                    <form name='CourseForm' noValidate onSubmit={this.handleSubmit}>
                                        <ul>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.courseCode} label={'Course Code'} name={'courseCode'} htmlFor={'courseCode'} isrequired={true}
                                                             onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.courseName} label={'Course Name'} name={'courseName'} htmlFor={'courseName'} isrequired={true}
                                                             onChange={this.onChangeName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'text'} value={this.state.noOfSemester} label={'No. Of Semester'} name={'noOfSemester'} htmlFor={'noOfSemester'} isrequired={true}
                                                             className={'form-control'} onChange={this.onChangeSemester} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <input type="submit" className="btn btn-success" value="Save" />
                                            </li>
                                        </ul>

                                    </form>
                                </div>
                            </div>
                        </div>
                        <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<CourseForm />, document.getElementById('courseform'));