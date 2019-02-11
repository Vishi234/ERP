//alert(window.dynamicData);
var OrgList = React.createClass({
   // alert(window.dynamicData)
    render: function () {
        //Render form
        return (
            <div>
                <div className="modal fade" id="selectorg" data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Select Organization</h4>
                                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            </div>
                            <div className="modal-body">
                                <div className="listorg show">
                                    <div className="leftlist">
                                        <ul>
                                            
                                        </ul>
                                    </div>
                                    <div className="rightoption">
                                        <ul>
                                            <li>
                                                <a href="/Dashboard/Overview/">
                                                    <i className="fa fa-check"></i> Select
                                                </a>
                                            </li>
                                            <li>
                                                <a data-direction="top" data-target="#createorg" className="openmodal" href="javascript:void(0)">
                                                    <i className="fa fa-plus"></i> Create
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" data-target="#createorg" className="openmodal" href="javascript:void(0)">
                                                    <i className="fa fa-edit"></i> Modify
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)">
                                                    <i className="fa fa-times"></i> Remove
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
ReactDOM.render(<OrgList />, document.getElementById('orglist'));