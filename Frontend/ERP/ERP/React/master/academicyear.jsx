var AcademicYearForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Academic Year
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Academic Year</span>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <label>Code</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Academic Year</label>
                                        <input type="text" placeholder="YYYY-YYYY" className="form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input type="text" placeholder="DD-MMM-YYYY" className="startDate form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input type="text" placeholder="DD-MMM-YYYY" className="endDate form-control" />
                                    </div>
                                </li>
                            </ul>
                            <input type="submit" className="btn btn-success" value="Save" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<AcademicYearForm />, document.getElementById('academicform'));