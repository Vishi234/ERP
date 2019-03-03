var grdArray;
var MyData = null;
var fields = [];
class EmployeeForm extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
               <div className="block-header container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-xs-12 col-sm-4 col-md-6">
                            <h1>Employee Management</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="javascript:void(0)">Employee</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Manage
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
               </div>
               <div className="block-body container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12">
                        <div className="card">
                            <div className="mb-1 d-inline-block w-100">
                                <div className="aclft pull-left">
                                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#employee">
                                        <i className="fa fa-plus"></i> Add New
                                    </button>
                                    <button type="button" className="btn btn-info" data-toggle="modal" data-target="#employee">
                                        <i className="fa fa-download"></i> Export
                                    </button>
                                </div>
                                <div className="acrght pull-right">
                                    <input type="text" placeholder="Quick Search..." className="form-control" />
                                </div>
                            </div>
                            <div className="body">

                            </div>
                        </div>
                    </div>
                </div>
               </div>
               <div className="modal fade" id="employee" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add/Edit Employee</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="card">
                                    <form>
                                        <div className="acform cust">
                                            <ul>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Employee Code:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>First Name:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Last Name:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Qualification:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Department:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Designation:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Employee Type:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>
                                                        <div className="form-group">
                                                            <label>Job Type:</label><input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="empbse">
                                                <div className="empimg">
                                                    <img src="/Images/user-img.png" />
                                                </div>
                                                <a href="javascript:void(0)"></a>
                                                <input type="file" />
                                            </div>
                                        </div>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a className="nav-link active show" data-toggle="tab" href="#personal"><img src="/Images/icons/personal.svg" /> Personal Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#address"><img src="/Images/icons/address.svg" /> Address Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#experience"><img src="/Images/icons/experience.svg" /> Last Employer Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#subject"><img src="/Images/icons/subject.svg" /> Subject Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#account"><img src="/Images/icons/accounts.svg" /> Account Details</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#authentication"><img src="/Images/icons/authentication.svg" /> Authentication Details</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active show" id="personal">
                                                <div className="acform">
                                                    <ul>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Father's Name:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Mother's Name:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Sex:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Date Of Birth:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Date Of Joining:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Spoouse Name:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Blood Group:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Marital Status:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Nationality:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="address">
                                                <div className="acform">
                                                   <ul>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>Address Line 1:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>Address Line 2:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>Mobile No:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>Phone No:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>State:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>City:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>Zipcode:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label>Locality:</label><input type="text" className="form-control" />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                   </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="experience">
                                                <div className="acform">
                                                    <ul>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Employer Name:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Date Of Joining:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Date Of Leaving:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Phone No:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Total Experience:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Reason Of Leaving:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Last Salary:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="subject">
                                                <select className="listbox">
                                                    <option>1</option>
                                                    <option>1</option>
                                                    <option>1</option>
                                                    <option>1</option>
                                                    <option>1</option>
                                                    <option>1</option>
                                                    <option>1</option>
                                                    <option>1</option>
                                                </select>
                                            </div>
                                            <div className="tab-pane" id="account">
                                                <div className="acform">
                                                    <ul>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Bank Name:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Bank Account No:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>IFSC Code:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Adhaar Number:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>PF Number:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Current Salary:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>PF Number:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="authentication">
                                                <div className="acform">
                                                    <ul>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Login Id:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Password:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Confirm Password:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Role:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div>
                                                                <div className="form-group">
                                                                    <label>Account Status:</label><input type="text" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <input type="submit" className="btn btn-success" value="Save" />
                                            <input type="submit" className="btn btn-danger" value="Reset" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}
ReactDOM.render(<EmployeeForm urlPost='' personalPost='' contactPost='' authPost='' />, document.getElementById('employeeform'));