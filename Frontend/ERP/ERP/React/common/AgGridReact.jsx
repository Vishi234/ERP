var gridOptions;
var rowData;
var AgGrid = React.createClass({
    componentDidUpdate: function () {
        rowData = this.props.rowData;
        gridOptions = {
            columnDefs: this.props.columnDef,
            rowData: rowData,
            enableSorting: true,
            enableCellChangeFlash: true,
            refreshCells: true,
            enableColResize: true,
            colResizeDefault: 'shift',
            enableColResize: true,
            pagination: true,
            paginationPageSize: 20,
            paginationNumberFormatter: function (params) {
                return '[' + params.value.toLocaleString() + ']';
            },
            localeText: { noRowsToShow: 'No data found.' },
            onGridReady: function (params) {
                var allColumnIds = [];
                gridOptions.columnApi.getAllColumns().forEach(function (column) {
                    allColumnIds.push(column.colId);
                });
                gridOptions.columnApi.autoSizeColumns(allColumnIds);
                params.api.sizeColumnsToFit();
                gridOptions.api.setRowData(rowData);
            },
        };
       $("#myGrid").empty();
        var eGridDiv = document.querySelector('#myGrid');
        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.Grid(eGridDiv, gridOptions);
    },
    onFilterChange: function (e) {
        gridOptions.api.setQuickFilter(e.target.value);
    },
    render: function () {
        var grid;
        grid = <div id="myGrid" style={{ height: '300px', width: '100%' }} className="ag-theme-balham"></div>
        return (
            <div className="dtlbse">
                <div className="actionbse">
                    <div className="aclft pull-left">
                    </div>
                    <div className="acrght pull-right">
                        <input type="text" onChange={this.onFilterChange} placeholder="Quick Search..." className="form-control"></input>
                    </div>
                </div>
                {grid}
            </div>

        );
    },

})