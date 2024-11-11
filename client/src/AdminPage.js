import React, { useState } from 'react';
import socket from './socket';
import PDFViewer from './PDFViewer';

function AdminPage() {
    const [page, setPage] = useState(1);
    const [pdfUrl, setPdfUrl] = useState(null);

    const nextPage = () => {
        const newPage = page + 1;
        setPage(newPage);
        socket.emit('admin-set-page', newPage);
    };

    const prevPage = () => {
        const newPage = Math.max(1, page - 1);
        setPage(newPage);
        socket.emit('admin-set-page', newPage);
    };

    // Handle PDF Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const url = URL.createObjectURL(file);
            console.log("PDF URL created:", url);  // Add this line for debugging
            setPdfUrl(url);
            socket.emit('admin-upload-pdf', url);  // Emit the PDF URL to viewers
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <div className="page-container admin-page">
            <h1>Admin View</h1>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            {pdfUrl ? <PDFViewer page={page} pdfUrl={pdfUrl} /> : <p>Please upload a PDF to view.</p>}
            <div>
                <button onClick={prevPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}

export default AdminPage;
