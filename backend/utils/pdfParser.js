import axios from 'axios';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

export const extractTextFromPDF = async (pdfUrl) => {
    if (!pdfUrl || typeof pdfUrl !== 'string') {
        throw new Error('PDF URL must be a non-empty string');
    }

    try {
        const response = await axios.get(pdfUrl, {
            responseType: 'arraybuffer',
            timeout: 30000,
        });

        if (!response?.data || response.data.byteLength === 0) {
            throw new Error('Downloaded PDF is empty or invalid');
        }

        const pdfBuffer = Buffer.from(response.data);
        const parser = new PDFParse({ data: pdfBuffer });
        const result = await parser.getText();
        
        return result.text || '';
    } catch (error) {
        console.error('PDF Processing Error:', error?.message || error);
        throw new Error(`Failed to extract text from PDF: ${error?.message || error}`);
    }
};