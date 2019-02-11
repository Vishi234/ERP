var AgGrid = React.createClass({
    componentDidMount: function () {
        var gridOptions = {
            columnDefs: this.props.columnDef,
            rowData: this.props.rowData,
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
            onGridReady: function (params) {
                var allColumnIds = [];
                gridOptions.columnApi.getAllColumns().forEach(function (column) {
                    allColumnIds.push(column.colId);
                });
                gridOptions.columnApi.autoSizeColumns(allColumnIds);
                params.api.sizeColumnsToFit();
            },
        };
        var eGridDiv = document.querySelector('#myGrid');
        // create the grid passing in the div to use together with the columns & data we want to use
        new agGrid.Grid(eGridDiv, gridOptions);
    },
    render: function () {
        var grid;
        grid = <div id="myGrid" style={{ height: '300px', width: '100%' }} className="ag-theme-balham"></div>
        return (
            <div className="dtlbse">
                {grid}
            </div>

        );
    },

})