export default async function extractTextFromPdf(file) 
{
  try 
  {
    if (!window.pdfjsLib) await loadPdfJs();
    
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = "";
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) 
    {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map(item => item.str)
        .join(" ");
      
      fullText += pageText + "\n\n";
    }
    
    return fullText.trim();
  } 
  catch (error) 
  {
    console.error("Error extracting text from PDF:", error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

function loadPdfJs() 
{
    return new Promise((resolve, reject) => 
    {
        if (window.pdfjsLib) 
        {
            resolve();
            return;
        }
    
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load PDF.js'));
        document.head.appendChild(script);
    });
}