import _ from 'lodash';

export const getPdfTableData = (data) => {
    const { columns: reportColumns = [], data: reportData = [] } = data;
    let tableHead = reportColumns.map(item => ({ text: _.get(item, 'label', ''), bold: true, alignment: 'center' }));
    let tableBody = [];
    _.forEach(reportData, (item) => {
        let itemArray = [];
        _.forEach(reportColumns, (key) => {
            itemArray.push(_.get(item, key.name || '', ''));
        });
        tableBody.push(itemArray);
    });

    return ({
        // layout: "lightHorizontalLines", // optional
        table: {
            headerRows: 1,
            body: [
                tableHead,
                ...tableBody
            ]
        }
    });

};


export const getExcelTableData = (data) => data;
