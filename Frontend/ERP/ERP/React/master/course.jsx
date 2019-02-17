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
    resetData: function () {
        this.setState({
            courseCode: '',
            courseName: '',
            noOfSemester: '',
        });
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
                courseCode: this.state.courseCode,
                courseName: this.state.courseName,
                noOfSemester: this.state.noOfSemester,
                flag: 'A'

            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    btnloading(e.target, 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") { 
                        MyData = JSON.parse(data.addParams);
                        this.setState({ rowData: MyData });
                        console.log(this.state.rowData);
                    }
                }.bind(this),
                error: function (evt) {
                    btnloading(e.target, 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    },

    //register input controls
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
                    <div className="rttl">
                        <span className="pull-left lft">Courses Management</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
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
                   
                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                </div>
            </div>
        );
    }
});
ReactDOM.render(<CourseForm urlPost="/Master/Course" />, document.getElementById('courseform'));