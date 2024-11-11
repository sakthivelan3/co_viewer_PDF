import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PDFViewer({ page, pdfUrl }) {
    const canvasRef = useRef();

    useEffect(() => {
        if (!pdfUrl) return;

        console.log("PDF URL in PDFViewer:", pdfUrl); 
        const renderPage = async (pdf, pageNum) => {
            try {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.5 });
                const context = canvasRef.current.getContext('2d');
                canvasRef.current.height = viewport.height;
                canvasRef.current.width = viewport.width;
                await page.render({ canvasContext: context, viewport }).promise;
            } catch (error) {
                console.error("Error rendering PDF page:", error);
            }
        };

        const loadDocument = async () => {
            const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
            renderPage(pdf, page);
        };
        loadDocument();
    }, [page, pdfUrl]);

    return <canvas ref={canvasRef} />;
}

export default PDFViewer;
