var CourseForm = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="inner-menu">
                    <span className="pull-left httl">
                        Course
                    </span>
                    <div className="pull-right hlink">
                        <ul>
                            <li>
                                <a href="javascript:void(0)" data-target="#academic" className="btn btn-primary openmodal"><i className="fa fa-plus"></i> Add</a>
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
                <div className="modal fade" id="academic" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add New Course</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
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
                                            <input type="text" placeholder="DD-MMM-YYYY" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>End Date</label>
                                            <input type="text" placeholder="DD-MMM-YYYY" className="form-control" />
                                        </div>
                                        <input type="submit" className="btn btn-success" value="Save" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<CourseForm />, document.getElementById('courseform'));