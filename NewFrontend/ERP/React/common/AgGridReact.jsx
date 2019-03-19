﻿var gridOptions;
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
        var gridDiv = document.querySelector('#myGrid');
        new agGrid.Grid(gridDiv, gridOptions);
        //((this.props.rowData == null) ? null : this.props.rowData)
        gridOptions.api.setRowData(((this.props.rowData == null) ? null : this.props.rowData));
    }
    onFilterChange(e) {
        gridOptions.api.setQuickFilter(e.target.value);
    }
    componentDidUpdate() {
        gridOptions.api.setRowData(this.props.rowData);
    }
    render() {
        return (<div className="actionbse">
            <div id="myGrid" style={{ height: '390px'}} className="ag-theme-balham"></div>
        </div>
        );
    }
}
