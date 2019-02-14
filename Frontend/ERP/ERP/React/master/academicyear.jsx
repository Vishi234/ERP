﻿var grdArray;
var MyData = null;
var AcademicYearForm = React.createClass({
    getInitialState: function () {

        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$AcademicDetails$"];
        return {
            yearCode: "",
            academicYear: "",
            wfDate: "",
            wtDate: "",
            Fields: [],
            columnDef: columnDefs,
            rowData: null,
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
                async: false,
                beforeSend: function () {
                    btnloading(e.target, 'show');
                },
                success: function (data) {
                    btnloading(e.target, 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);

                    }
                }.bind(this),
                error: function (evt) {
                    btnloading(e.target, 'hide');
                    alert('Error! Please try again');
                }
            })

            this.setState({
                rowData: MyData
            });

        }
    },
    onChangeCode: function (value) {
        this.setState({
            yearCode: value
        });
    },
    onChangeYear: function (e) {
        //this.setState({
        //    academicYear: value
        //});

    },
    onWefBlur: function (value) {
        this.setState({
            wfDate: value
        });
    },
    onWetBlur: function (value) {
        this.setState({
            wtDate: value
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
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Academic Year</span>
                        <span className="pull-right toptotal">2 Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form name='AcademicYear' noValidate onSubmit={this.handleSubmit}>
                            <ul>
                                <li>
                                    <CreateInput type={'text'} value={this.state.yearCode} label={'Course Code'} name={'yearCode'} htmlFor={'yearCode'} isrequired={true}
                                                 onChange={this.onChangeCode} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'text'} value={this.state.academicYear} label={'Academic Year'} name={'academicYear'} htmlFor={'academicYear'} isrequired={true}
                                                 onChange={this.onChangeYear} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'date'} value={this.state.wfDate} id={'wfDate'} label={'Start Date'} name={'daterangepicker'} htmlFor={'wfDate'} isrequired={true}
                                                 className={'startDate form-control'} onBlur={this.onWefBlur} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
                                <li>
                                    <CreateInput type={'date'} value={this.state.wtDate} id={'wtDate'} label={'End Date'} name={'daterangepicker'} htmlFor={'wtDate'} isrequired={true}
                                                 className={'startDate form-control'} onBlur={this.onWetBlur} onComponentMounted={this.register} messageRequired={'required.'} />
                                </li>
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
});
ReactDOM.render(<AcademicYearForm urlPost="/Master/Academic" />, document.getElementById('academicform'));
