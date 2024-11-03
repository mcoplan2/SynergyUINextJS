// components/Table.tsx
import React, { useState } from 'react';
import styles from './Table.module.css';

interface TableColumn {
    title: string;
    accessor: string; // This will be used to access the data from the row
}

interface TableProps {
    columns: TableColumn[];
    data: Record<string, any>[]; // Allow any data structure
    onSelectionChange: (selectedRowIndices: Set<number>) => void; // New prop for selection change
}

const Table: React.FC<TableProps> = ({ columns, data, onSelectionChange }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleRowSelect = (rowIndex: number) => {
        const updatedSelectedRows = new Set(selectedRows);
        if (updatedSelectedRows.has(rowIndex)) {
            updatedSelectedRows.delete(rowIndex); // Deselect if already selected
        } else {
            updatedSelectedRows.add(rowIndex); // Select the row
        }
        setSelectedRows(updatedSelectedRows);
        onSelectionChange(updatedSelectedRows); // Call the callback to notify parent
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th className={styles.tableHeaderCell}>
                            <input 
                                type="checkbox" 
                                onChange={(e) => {
                                    const newSelectedRows = new Set<number>();
                                    if (e.target.checked) {
                                        data.forEach((_, index) => newSelectedRows.add(index)); // Select all
                                    }
                                    setSelectedRows(newSelectedRows);
                                    onSelectionChange(newSelectedRows); // Notify parent of new selection
                                }}
                                checked={selectedRows.size === data.length}
                            />
                        </th>
                        {columns.map((column) => (
                            <th key={column.accessor} className={styles.tableHeaderCell}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex} 
                            className={styles.tableRow}
                        >
                            <td className={styles.tableCell}>
                                <input 
                                    type="checkbox" 
                                    checked={selectedRows.has(rowIndex)} 
                                    onChange={() => handleRowSelect(rowIndex)} 
                                />
                            </td>
                            {columns.map((column) => (
                                <td key={column.accessor} className={styles.tableCell}>
                                    {row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
