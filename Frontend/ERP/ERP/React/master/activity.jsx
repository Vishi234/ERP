var ActivityForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Activity
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Activity</span>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <label>Activity Name</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Status</label>
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
                                            <option value="0" selected="selected">Select Activity Type</option>
                                            <option value="1">Temporary</option>
                                            <option value="2">Permanent</option>
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
ReactDOM.render(<ActivityForm />, document.getElementById('activityform'));