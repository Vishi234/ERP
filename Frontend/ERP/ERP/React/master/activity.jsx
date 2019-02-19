﻿var grdArray;
var MyData = null;
var fields = [];
class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        grdArray = GetReportConfiguration("Master");
        var columnDefs = grdArray["$ActivityDetails$"];
        var records = JSON.parse(content.addParams);
        this.state =
            {
                actName: "",
                status: ReadDropDownData("Param", "2", true),
                actType: ReadDropDownData("Param", "1", true),
                selectedStatus: 0,
                selectedType: 0,
                stDate: "",
                endDate: "",
                Fields: [],
                columnDef: columnDefs,
                rowData: records,
                records: ((records == null) ? 0 : records.length),
                ServerMessage: ''
            };
    }
    handleSubmit(e) {
        e.preventDefault();
        var validForm = true;
        fields.forEach(function (field) {
            if (typeof field[0].isValid === "function") {
                var validField = field[0].isValid(field[0].refs[field[0].props.name]);
                validForm = validForm && validField;
            }
        });
        //after validation complete post to server
        if (validForm) {
            var d = {
                actName: this.state.actName,
                status: this.state.status,
                actType: this.state.actType,
                stDate: this.state.wfDate,
                endDate: this.state.wetDate,
                reportId:'6',
                flag: 'A'
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                async: false,
                beforeSend: function () {
                    btnloading("activityForm", 'show');
                },
                success: function (data) {
                    btnloading("activityForm", 'hide');
                    CallToast(data.msg, data.flag);
                    if (data.flag == "S") {
                        MyData = JSON.parse(data.addParams);
                        this.setState
                            ({
                                actName: "",
                                status: ReadDropDownData("Param", "2", true),
                                actType: ReadDropDownData("Param", "1", true),
                                selectedStatus: 0,
                                selectedType: 0,
                                stDate: "",
                                endDate: "",
                            })
                        this.setState({ rowData: MyData });
                        this.setState({ records: MyData.length })

                    }
                }.bind(this),
                error: function (e) {
                    btnloading("activityForm", 'hide');
                    alert('Error! Please try again');
                }
            })
        }
    }
    onChangeactName(value) {
        this.setState({
            actName: value
        });
    }
    onChangestatus(value) {
        this.setState({
            status: value
        });
    }
    onChangeactType(value) {
        this.setState({
            actType: value
        });
    }
    onBlurWefDate(value) {
        this.setState({
            wfDate: value
        });
    }
    onBlurWetDate(value) {
        this.setState({
            wetDate: value
        });
    }
    //register input controls
    register(field) {
        var s = [];
        s.push(field);
        fields.push(s);
    }
    render() {
        //Render form
        return (
            <div>
                <div className="fbse">
                    <div className="rttl">
                        <span className="pull-left lft">Activity Management</span>
                        <span className="pull-right toptotal">{this.state.records} Record(S)</span>
                        <hr />
                    </div>
                    <div className="acform">
                        <form noValidate id="activityForm" onSubmit={this.handleSubmit.bind(this)}>
                        <ul>
                        <li>
                        <CreateInput type={'text'} value={this.state.actName} label={'Activity Name'} name={'actName'} htmlFor={'actName'} isrequired={true}
                                     onChange={this.onChangeactName.bind(this)}  className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                        </li>
                        <li>
                        <CreateInput type={'ddl'} value={this.state.selectedStatus} data={this.state.status} label={'Status'} name={'status'} htmlFor={'status'} isrequired={true}
                                     onChange={this.onChangestatus.bind(this)}  keyId={'PARAM_ID'} keyName={'PARAM_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                        </li>
                        <li>
                        <CreateInput type={'ddl'} value={this.state.selectedType} data={this.state.actType} label={'Activity Type'} name={'actType'} htmlFor={'actType'} isrequired={true}
                                     onChange={this.onChangeactType.bind(this)} keyId={'PARAM_ID'} keyName={'PARAM_NAME'} className={'form-control'} onComponentMounted={this.register} messageRequired={'required.'} />
                        </li>
                        <li>
                        <CreateInput type={'date'} value={this.state.stDate} id={'wfDate'} label={'Start Date'} name={'startDate'} htmlFor={'wfDate'} isrequired={true}
                                     className={'startDate form-control'} onBlur={this.onBlurWefDate.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
                        </li>
                        <li>
                        <CreateInput type={'date'} value={this.state.endDate} id={'wtDate'} label={'End Date'} name={'endDate'} htmlFor={'wtDate'} isrequired={true}
                                     className={'endDate form-control'} onBlur={this.onBlurWetDate.bind(this)} onComponentMounted={this.register} messageRequired={'required.'} />
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
}

ReactDOM.render(<ActivityForm urlPost="/Master/Activity" />, document.getElementById('activityform'));
