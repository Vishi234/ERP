var SubjectForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Subjects
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Subject</span>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <label>Subject Code</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Subject Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Short Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Medium</label>
                                        <select>
                                            <option value="1" selected="selected">Active</option>
                                            <option value="0">In-Active</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                   <div className="form-group">
                                        <label>Activity Type</label>
                                        <select>
                                            <option value="0" selected="selected">Select Medium</option>
                                            <option value="1">Hindi</option>
                                            <option value="2">English</option>
                                            <option value="3">Urdu</option>
                                            <option value="4">Punjabi</option>
                                            <option value="5">French</option>
                                        </select>
                                   </div>
                                </li>
                                <li>
                                   <div className="form-group">
                                        <label>Subject Type</label>
                                        <select multiple>
                                            <option value="1" selected>Theory</option>
                                            <option value="2">Practical</option>
                                            <option value="3">Team Work</option>
                                        </select>
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
ReactDOM.render(<SubjectForm />, document.getElementById('subjectform'));