import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

const getGeminiClient = () => {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Endpoint for generating high-quality educational visuals and illustrations
// Uses model: gemini-3-pro-image-preview with size affordances (1K, 2K, 4K)
app.post('/api/generate-image', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, size = '1K', aspectRatio = '1:1' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'يرجى تقديم وصف للصورة المراد توليدها.' });
      return;
    }

    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(size) ? size : '1K';

    const validAspectRatios = ['1:1', '16:9', '4:3', '3:4', '9:16'];
    const chosenAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `Detailed educational illustration suitable for Arabic textbook visualization: ${prompt}. Cultural authenticity, high clarity, clean and respectful design.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: chosenAspectRatio,
          imageSize: chosenSize,
        },
      },
    });

    let imageUrl: string | null = null;
    let descriptionText = '';

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          descriptionText += part.text;
        }
      }
    }

    if (!imageUrl) {
      res.status(502).json({
        error: 'لم يتم استرجاع صورة من النموذج. قد يكون المحتوى خاضعاً لقيود الأمان أو واجه خطأ مؤقتاً.',
        details: descriptionText,
      });
      return;
    }

    res.json({
      success: true,
      imageUrl,
      size: chosenSize,
      aspectRatio: chosenAspectRatio,
      prompt,
    });
  } catch (error: any) {
    console.error('Error generating image:', error);
    res.status(500).json({
      error: error?.message || 'فشل في توليد الصورة بواسطة النموذج.',
    });
  }
});

// Download endpoints for Word (DOCX), PDF, and Excel (XLSX)
const downloadsDir = path.resolve(__dirname, 'public/downloads');
app.use('/downloads', express.static(downloadsDir));

app.get('/api/downloads/info', (_req: Request, res: Response) => {
  const docxFile = path.join(downloadsDir, 'Malzama_Shamilah_Arabic_Grade9_Complete.docx');
  const pdfFile = path.join(downloadsDir, 'Malzama_Shamilah_Arabic_Grade9_Complete.pdf');
  const xlsxFile = path.join(downloadsDir, 'Educational_Database_Arabic_Grade9_Complete.xlsx');

  const docxExists = fs.existsSync(docxFile);
  const pdfExists = fs.existsSync(pdfFile);
  const xlsxExists = fs.existsSync(xlsxFile);

  res.json({
    docx: {
      filename: 'Malzama_Shamilah_Arabic_Grade9_Complete.docx',
      title: 'الملزمة التعليمية الشاملة والموسوعة الامتحانية المتكاملة (DOCX)',
      exists: docxExists,
      sizeBytes: docxExists ? fs.statSync(docxFile).size : 0,
      downloadUrl: '/api/downloads/docx',
    },
    pdf: {
      filename: 'Malzama_Shamilah_Arabic_Grade9_Complete.pdf',
      title: 'الملزمة التعليمية الشاملة والموسوعة الامتحانية الذهبية (PDF)',
      exists: pdfExists,
      sizeBytes: pdfExists ? fs.statSync(pdfFile).size : 0,
      downloadUrl: '/api/downloads/pdf',
    },
    xlsx: {
      filename: 'Educational_Database_Arabic_Grade9_Complete.xlsx',
      title: 'قاعدة البيانات التعليمية الشاملة لمنهج لغتي العربية (XLSX)',
      exists: xlsxExists,
      sizeBytes: xlsxExists ? fs.statSync(xlsxFile).size : 0,
      downloadUrl: '/api/downloads/xlsx',
    },
  });
});

app.get('/api/downloads/docx', (_req: Request, res: Response) => {
  const docxFile = path.join(downloadsDir, 'Malzama_Shamilah_Arabic_Grade9_Complete.docx');
  if (fs.existsSync(docxFile)) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.download(docxFile, 'الملزمة_التعليمية_الشاملة_لغتي_العربية_الصف_التاسع.docx');
  } else {
    res.status(404).json({ error: 'ملف Word غير موجود، يرجى إعادة إنشائه.' });
  }
});

app.get('/api/downloads/pdf', (_req: Request, res: Response) => {
  const pdfFile = path.join(downloadsDir, 'Malzama_Shamilah_Arabic_Grade9_Complete.pdf');
  if (fs.existsSync(pdfFile)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.download(pdfFile, 'الملزمة_التعليمية_الشاملة_لغتي_العربية_الصف_التاسع.pdf');
  } else {
    res.status(404).json({ error: 'ملف PDF غير موجود، يرجى إعادة إنشائه.' });
  }
});

app.get('/api/downloads/xlsx', (_req: Request, res: Response) => {
  const xlsxFile = path.join(downloadsDir, 'Educational_Database_Arabic_Grade9_Complete.xlsx');
  if (fs.existsSync(xlsxFile)) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.download(xlsxFile, 'قاعدة_بيانات_منهج_لغتي_العربية_الصف_التاسع.xlsx');
  } else {
    res.status(404).json({ error: 'ملف Excel غير موجود، يرجى إعادة إنشائه.' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
