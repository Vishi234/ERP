var MappingForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Course Subject Mapping
                    </span>
                </div>
                <div className="formarea">
                    <span className="formheader">Add/Update Mapping</span>
                    <div className="acform">
                        <form>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <label>Course</label>
                                        <select>
                                            <option value="0" selected="selected">Select Course</option>

                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Semester</label>
                                        <select>
                                            <option value="0" selected="selected">Select Semester</option>

                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <select>
                                            <option value="0" selected="selected">Select Subject</option>

                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>Subject Type</label>
                                        <select>
                                            <option value="1" selected="selected">Compulsory</option>
                                            <option value="0">Elective</option>
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
ReactDOM.render(<MappingForm />, document.getElementById('mappingform'));