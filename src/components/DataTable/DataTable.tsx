import type { TableData } from '../../types';
import './DataTable.css';

export interface DataTableProps {
  data: TableData;
  className?: string;
}

export function DataTable({ data, className }: DataTableProps) {
  const classNames = ['ceres-data-table-wrapper', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <table className="ceres-data-table">
        <thead>
          <tr>
            {data.columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
