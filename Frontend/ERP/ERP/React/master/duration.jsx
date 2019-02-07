var CourseDurationForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Course Semester Duration
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Duration</span>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <label>Academic Year</label>
                                        <select>
                                            <option>Select Academic Year</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                   <div className="form-group">
                                        <label>Course</label>
                                        <select>
                                            <option>Select Course</option>
                                        </select>
                                   </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Semester</label>
                                        <select>
                                            <option>Select Semester</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input type="text" className="startDate form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input type="text" className="endDate form-control" />
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
ReactDOM.render(<CourseDurationForm />, document.getElementById('durationform'));