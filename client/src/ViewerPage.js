import React, { useEffect, useState } from 'react';
import socket from './socket';
import PDFViewer from './PDFViewer';

function ViewerPage() {
    const [page, setPage] = useState(1);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        // Listen for page updates from the server
        socket.on('page-update', (updatedPage) => {
            setPage(updatedPage);
        });

        // Listen for PDF uploads from the admin
        socket.on('admin-upload-pdf', (url) => {
            console.log("Received PDF URL from admin:", url);  // Add this line for debugging
            setPdfUrl(url);
            setPage(1);  // Reset to page 1 when a new PDF is uploaded
        });

        return () => {
            socket.off('page-update');
            socket.off('admin-upload-pdf');
        };
    }, []);

    return (
        <div className="page-container">
            <h1>Viewer View</h1>
            {pdfUrl ? <PDFViewer page={page} pdfUrl={pdfUrl} /> : <p>Waiting for admin to upload a PDF...</p>}
        </div>
    );
}

export default ViewerPage;
