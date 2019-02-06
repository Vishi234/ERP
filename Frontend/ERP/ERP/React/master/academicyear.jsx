var AcademicYearForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Academic Year
                    </span>
                    <div className="pull-right hlink">
                        <ul>
                            <li>
                                <a href="javascript:void(0)" className="btn btn-primary"><i className="fa fa-plus"></i> Add</a>
                            </li>
                            <li>
                                <input type="text" className="form-control" placeholder="Search inside.." />
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i className="fa fa-download"></i> <i className="fa fa-caret-down"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Academic Year</span>
                    <div className="acform">
                        <form>
                            <div className="form-group">
                                <label>Code</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Academic Year</label>
                                <input type="text" placeholder="YYYY-YYYY" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Start Date</label>
                                <input type="text" placeholder="DD-MMM-YYYY" className="startDate form-control" />
                            </div>
                            <div className="form-group">
                                <label>End Date</label>
                                <input type="text" placeholder="DD-MMM-YYYY" className="endDate form-control" />
                            </div>
                            <input type="submit" className="btn btn-success" value="Save" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<AcademicYearForm />, document.getElementById('academicform'));