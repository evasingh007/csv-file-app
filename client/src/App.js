import React, { useState } from 'react';
import './App.css';
import Papa from 'papaparse';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://csv-file-app-backend.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data.length > 0) {
        setCsvData(result.data);
        setColumns(Object.keys(result.data[0]));
      } else {
        setError('No data found in CSV file');
      }
    } catch (err) {
      setError('Error uploading file: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle cell edit
  const handleCellEdit = (rowIndex, columnName, value) => {
    const newData = [...csvData];
    newData[rowIndex][columnName] = value;
    setCsvData(newData);
  };

  // Add new row
  const addRow = () => {
    const newRow = {};
    columns.forEach(col => newRow[col] = '');
    setCsvData([...csvData, newRow]);
  };

  // Delete row
  const deleteRow = (index) => {
    const newData = csvData.filter((_, i) => i !== index);
    setCsvData(newData);
  };

  // Download CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Clear data
  const clearData = () => {
    setCsvData([]);
    setColumns([]);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📊 CSV File Manager</h1>
        <p>Upload, View, Edit & Download CSV Files</p>
      </header>

      <div className="container">
        {/* Upload Section */}
        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-button">
            {uploading ? '⏳ Uploading...' : '📁 Choose CSV File'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Actions */}
        {csvData.length > 0 && (
          <div className="actions">
            <button onClick={() => setEditMode(!editMode)} className="btn btn-edit">
              {editMode ? '👁️ View Mode' : '✏️ Edit Mode'}
            </button>
            <button onClick={addRow} className="btn btn-add">
              ➕ Add Row
            </button>
            <button onClick={downloadCSV} className="btn btn-download">
              ⬇️ Download CSV
            </button>
            <button onClick={clearData} className="btn btn-clear">
              🗑️ Clear
            </button>
          </div>
        )}

        {/* Data Table */}
        {csvData.length > 0 && (
          <div className="table-container">
            <div className="table-info">
              <span>Rows: {csvData.length}</span>
              <span>Columns: {columns.length}</span>
            </div>
            <table className="csv-table">
              <thead>
                <tr>
                  {editMode && <th className="row-number">#</th>}
                  {columns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                  {editMode && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {editMode && <td className="row-number">{rowIndex + 1}</td>}
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {editMode ? (
                          <input
                            type="text"
                            value={row[col] || ''}
                            onChange={(e) =>
                              handleCellEdit(rowIndex, col, e.target.value)
                            }
                            className="cell-input"
                          />
                        ) : (
                          row[col]
                        )}
                      </td>
                    ))}
                    {editMode && (
                      <td>
                        <button
                          onClick={() => deleteRow(rowIndex)}
                          className="btn-delete"
                          title="Delete row"
                        >
                          ❌
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {csvData.length === 0 && !error && (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h2>No CSV file loaded</h2>
            <p>Upload a CSV file to get started</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Built with React & Express | CSV Parser App</p>
      </footer>
    </div>
  );
}

export default App;
