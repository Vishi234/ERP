var CreateOrg = React.createClass({

    handleSubmit: function (e) {
        var validForm = true;
        //after validation complete post to server
        if (validForm) {
            var d = {
                CUSTOMER_NAME: "JSS",
                ADD_1: "2",
                ADD_2:"111",
                FAX_NO:"2222",
                CITY: "2222",
                MOBILE: "2222",
                PHONE: "2222",
                EMAIL: "2222",
                WEBSITE: "2222",
                CUSTOMER_ID: "2222",
                OPER_TYPE:"sdfdf"
            }
            $.ajax({
                type: "POST",
                url: this.props.urlPost,
                data: d,
                beforeSend: function () {
                    $("#progress").show();
                },
                success: function (data) {
                    alert(112);
                    $("#progress").hide();
                    console.log(data);
                    if (data.flag == "S") {
                        window.location.href = "/Dashboard/Overview";
                    }
                    else if (data.flag == "D") {
                        $("#selectorg").modal("show");
                    }
                    else {
                        CallToast(data.msg, data.flag);
                    }
                    //if (data.flag == "S")
                    //{
                    //    window.location.href = "/Dashboard/Overview";
                    //}
                    //else if (data.msg == "Super Admin")
                    //{
                    //    $("#selectorg").modal("show");
                    //}
                    //else
                    //{
                    //    CallToast(data.msg, data.flag);
                    //}
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    $("#progress").hide();
                    alert('Error! Please try again');
                }
            })
        }
    },

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
                                    <form noValidate onSubmit={this.handleSubmit}>
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
ReactDOM.render(<CreateOrg urlPost="/Dashboard/Overview" />, document.getElementById('create'));