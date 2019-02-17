﻿var grdArray;
var MyData = null;
var fields = [];
class AcademicYearForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$AcademicDetails$"];
        var records = JSON.parse(content.addParams);
        this.state =
            {
                yearCode: "",
                academicYear: "",
                wfDate: "",
                wtDate: "",
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
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
                yearCode: this.state.yearCode,
                academicYear: this.state.academicYear,
                wfDate: this.state.wfDate,
                wtDate: this.state.wtDate,
                flag: 'A',
                reportId: 1
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    btnloading("academicYear", 'show');
                },
                success: function (data) {
                    btnloading("academicYear", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                yearCode: "",
                                academicYear: "",
                                wfDate: "",
                                wtDate: "",
                            })
                        this.setState({ rowData: MyData });

                    }
                }.bind(this),
                error: function (evt) {
                    btnloading("academicYear", 'hide');
                    alert('Error! Please try again');
                }
            })

            e.preventDefault();
        }
    }
    onChangeCode(value) {
        this.setState({
            yearCode: value
        });
    }
    onChangeYear(value) {
        var validation = new RegExp("[0-9\-]", 'g');
        var foo;
        if (validation.test(value)) {
            foo = value.split("-").join("");
            if (foo.length > 0) {
                foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
            }
            this.setState({
                academicYear: foo
            });
        }
        else if (value == "") {
            this.setState({
                academicYear: value
            });
        }
    }
    onWefBlur(value) {
        this.setState({
            wfDate: value
        });
    }
    onWetBlur(value) {
        this.setState({
            wtDate: value
        });
    }
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    GetData(data) {
        this.setState({ rowData: data });
    }
    render() {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Academic Year</span>
                        <span className="pull-right toptotal">{this.state.records} Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form name='AcademicYear' id="academicYear" noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>
                                <CreateInput type={'text'} value={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                             onChange={this.onChangeYear.bind(this)} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                <CreateInput type={'date'} value={this.state.wfDate} id={'wfDate'} label={'Start Date'} name={'startDate'} htmlFor={'wfDate'} isrequired={true}
                                             className={'startDate form-control'} onBlur={this.onWefBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                <CreateInput type={'date'} value={this.state.wtDate} id={'wtDate'} label={'End Date'} name={'endDate'} htmlFor={'wtDate'} isrequired={true}
                                             className={'endDate form-control'} onBlur={this.onWetBlur.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                <li>
                                    <button type="submit" className="btn btn-success"><span className="inload hide"><i className="fa fa-spinner fa-spin"></i></span> Save</button>
                                </li>
                            </ul>

                        </form>
                    </div>
                    <AgGrid columnDef={this.state.columnDef} rowData={this.state.rowData} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AcademicYearForm urlPost="/Master/Academic" />, document.getElementById('academicform'));
