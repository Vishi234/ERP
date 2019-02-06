var CourseForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Course Details
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Course</span>
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
                                        <label>Course Name</label>
                                        <input type="text" className="form-control" />
                                   </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>No. Of Semester</label>
                                        <input type="text" className="form-control" />
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
ReactDOM.render(<CourseForm />, document.getElementById('courseform'));