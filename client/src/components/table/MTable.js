import MaterialTable from 'material-table'
import esLocale from 'date-fns/locale/es'
import { useState } from 'react'

const MTable = ({ title, data, columns,grouping = true, detailPanel}) => {

    return (
        <MaterialTable
            parentChildData={(row, rows) => rows.find(a => a._id === row.user)}
            size={'small'}
            title={title}
            data={data}
            columns={columns}
            options={{
                search: true,
                paging: true,
                filtering: true,
                exportButton: true,
                exportAllData: true,
                sorting: true,
                columnResizable: true,
                tableLayout: 'auto',
                padding: 'dense',
                grouping: grouping,
                pageSize: 10
            }}
            detailPanel={detailPanel}
            localization={{
                body: {
                    dateTimePickerLocalization: esLocale,
                    emptyDataSourceMessage: "No hay registros para mostrar",
                    filterRow: {filterTooltip: 'Filtrar'},
                },
                grouping: {
                    placeholder: "Arrastra los encabezados aquí para agruparlos",
                    groupedBy: 'Agrupado por:'
                },
                header: {
                    actions: 'Acciones'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'filas',
                    labelRowsPerPage: 'filas por página:',
                    firstAriaLabel: 'Primer página',
                    firstTooltip: 'Primer página',
                    previousAriaLabel: 'página anterior',
                    previousTooltip: 'página anterior',
                    nextAriaLabel: 'página siguiente',
                    nextTooltip: 'página siguiente',
                    lastAriaLabel: 'Última página',
                    lastTooltip: 'Última página'
                },
                toolbar: {
                    exportTitle: 'Exportar',
                    exportAriaLabel: 'Exportar',
                    exportName: 'Exportar como CSV',
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar'
                }
            }}
        />
    );
}

export default MTable;
