import * as pdfjs from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
  
    const loadingTask = pdfjs.getDocument({ data: uint8Array });
    const doc = await loadingTask.promise;
  
    let allText = '';
  
    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const page = await doc.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item: any) => item.str).join(' ');

      allText += pageText + '\n\n';
    }
  
    return allText;
  };
