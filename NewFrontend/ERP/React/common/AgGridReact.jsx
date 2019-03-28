var gridOptions;
var gridName = "mygrid";
class AgGrid extends React.Component {
    componentDidMount() {
        gridOptions = {
            columnDefs: this.props.columnDef,
            enableSorting: true,
            //enableFilter: true,
            rowData: null,
            rowHeight: 25,
            suppressRowClickSelection: false,
            enableCellChangeFlash: true,
            refreshCells: true,
            enableColResize: true,
            headerHeight: 35,
            suppressHorizontalScroll: false,
            colResizeDefault: 'shift',
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
            },
        }
        if (this.props.name != undefined) {
            gridName = this.props.name;
        }
        var gridDiv = document.querySelector('#' + gridName);
        new agGrid.Grid(gridDiv, gridOptions);
        //((this.props.rowData == null) ? null : this.props.rowData)
        gridOptions.api.setRowData(((this.props.rowData == null) ? null : this.props.rowData));
    }
    componentWillMount()
    {
        if (this.props.name != undefined) {
            gridName = this.props.name;
        }
    }
    onFilterChange(e) {
        gridOptions.api.setQuickFilter(e.target.value);
    }
    componentDidUpdate() {
        gridOptions.api.setRowData(this.props.rowData);
    }
    render() {
        return (<div className="actionbse">
            <div id={gridName} style={{ height: '350px' }} className="ag-theme-balham"></div>
        </div>
        );
    }
}
