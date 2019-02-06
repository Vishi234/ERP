var CreateOrg = React.createClass({
    render: function () {
        //Render form
        return (
            <div>
                <div className="modal fade" id="createorg" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create Organization</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="createorg">
                                    <form>
                                        <div className="setupform">
                                            <div className="form-group">
                                                <label>Enter Name of Oraganization</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="title">
                                                <span><i className="fa fa-list"></i>Basic Details</span>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4">
                                                    <div className="formbase">
                                                        <div className="form-group">
                                                            <label>Address Line 1</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>City</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Phone</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4">
                                                    <div className="formbase">
                                                        <div className="form-group">
                                                            <label>Address Line 2</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Mobile</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Website</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4">
                                                    <div className="formbase">
                                                        <div className="form-group">
                                                            <label>Fax No.</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Pan No.</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-group">
                                            <span className="pull-left"><a href="javascript:void(0)">I will do it later</a></span>
                                            <span className="pull-right"><input type="submit" className="btn btn-success" value="Create" /></span>
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
});
ReactDOM.render(<CreateOrg />, document.getElementById('create'));