import React from 'react';

function DataTable({ data }) {
  console.log(data[0].tableContent);
  const columns = data[0].tableContent && Object.keys(data[0].tableContent);
  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        <tr>{data[0].tableContent && columns.map((heading) => <th>{heading}</th>)}</tr>
        
      </thead>
      {/* <tbody>
        {data.map((row)=> (
        <tr>
          {columns.map((column) => (
            <td>{row[column]}</td>
            
          ))}
        </tr>
        ))}
      </tbody> */}
    </table>
  );
}

export default DataTable;

