var CourseDurationForm = React.createClass({
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
            academicYear: 0,
            course: 0,
            semester: 0,
            wefDate: "",
            wetDate: "",
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
                                                <CreateInput type={'ddl'} value={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                                             onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.course} label={'Course'} name={'course'} htmlFor={'course'} isrequired={true}
                                                             onChange={this.onChangeName} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'ddl'} value={this.state.semester} label={'Semester'} name={'semester'} htmlFor={'semester'} isrequired={true}
                                                             className={'form-control'} onChange={this.onChangeSemester} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'date'} value={this.state.wefDate} label={'Start Date'} name={'wefDate'} htmlFor={'wefDate'} isrequired={true}
                                                             className={'form-control'} onChange={this.onChangeSemester} onComponentMounted={this.register} messageRequired={'required.'} />
                                            </li>
                                            <li>
                                                <CreateInput type={'date'} value={this.state.wetDate} label={'End Date'} name={'wetDate'} htmlFor={'wetDate'} isrequired={true}
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
ReactDOM.render(<CourseDurationForm />, document.getElementById('durationform'));