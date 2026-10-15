import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(express.json({ limit: '15mb' }));

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Endpoint for generating high-quality educational visuals and illustrations
app.post('/api/generate-image', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, size = '1K', aspectRatio = '1:1' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'يرجى تقديم وصف للصورة المراد توليدها.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'مفتاح Gemini API غير مهيأ. يرجى إضافة GEMINI_API_KEY في إعدادات البيئة بـ Vercel.',
      });
      return;
    }

    const validSizes = ['1K', '2K', '4K'];
    const chosenSize = validSizes.includes(size) ? size : '1K';

    const validAspectRatios = ['1:1', '16:9', '4:3', '3:4', '9:16'];
    const chosenAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';

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
// Supports local filesystem and Vercel CDN fallback
const findDownloadPath = (filename: string) => {
  const possiblePaths = [
    path.resolve(process.cwd(), 'public/downloads', filename),
    path.resolve(process.cwd(), 'dist/downloads', filename),
    path.resolve(__dirname, '../public/downloads', filename),
    path.resolve(__dirname, '../dist/downloads', filename),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const downloadsDir = path.resolve(process.cwd(), 'public/downloads');
app.use('/downloads', express.static(downloadsDir));

app.get('/api/downloads/info', (_req: Request, res: Response) => {
  const docxFile = findDownloadPath('Malzama_Shamilah_Arabic_Grade9_Complete.docx');
  const pdfFile = findDownloadPath('Malzama_Shamilah_Arabic_Grade9_Complete.pdf');
  const xlsxFile = findDownloadPath('Educational_Database_Arabic_Grade9_Complete.xlsx');

  res.json({
    docx: {
      filename: 'Malzama_Shamilah_Arabic_Grade9_Complete.docx',
      title: 'الملزمة التعليمية الشاملة والموسوعة الامتحانية المتكاملة (DOCX)',
      exists: true,
      sizeBytes: docxFile ? fs.statSync(docxFile).size : 224646,
      downloadUrl: '/api/downloads/docx',
    },
    pdf: {
      filename: 'Malzama_Shamilah_Arabic_Grade9_Complete.pdf',
      title: 'الملزمة التعليمية الشاملة والموسوعة الامتحانية الذهبية (PDF)',
      exists: true,
      sizeBytes: pdfFile ? fs.statSync(pdfFile).size : 1532907,
      downloadUrl: '/api/downloads/pdf',
    },
    xlsx: {
      filename: 'Educational_Database_Arabic_Grade9_Complete.xlsx',
      title: 'قاعدة البيانات التعليمية الشاملة لمنهج لغتي العربية (XLSX)',
      exists: true,
      sizeBytes: xlsxFile ? fs.statSync(xlsxFile).size : 182480,
      downloadUrl: '/api/downloads/xlsx',
    },
  });
});

app.get('/api/downloads/docx', (_req: Request, res: Response) => {
  const filename = 'Malzama_Shamilah_Arabic_Grade9_Complete.docx';
  const filePath = findDownloadPath(filename);
  if (filePath) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.download(filePath, 'الملزمة_التعليمية_الشاملة_لغتي_العربية_الصف_التاسع.docx');
  } else {
    // Vercel serverless fallback: redirect directly to static asset served by Vercel CDN
    res.redirect(302, `/downloads/${filename}`);
  }
});

app.get('/api/downloads/pdf', (_req: Request, res: Response) => {
  const filename = 'Malzama_Shamilah_Arabic_Grade9_Complete.pdf';
  const filePath = findDownloadPath(filename);
  if (filePath) {
    res.setHeader('Content-Type', 'application/pdf');
    res.download(filePath, 'الملزمة_التعليمية_الشاملة_لغتي_العربية_الصف_التاسع.pdf');
  } else {
    // Vercel serverless fallback: redirect directly to static asset served by Vercel CDN
    res.redirect(302, `/downloads/${filename}`);
  }
});

app.get('/api/downloads/xlsx', (_req: Request, res: Response) => {
  const filename = 'Educational_Database_Arabic_Grade9_Complete.xlsx';
  const filePath = findDownloadPath(filename);
  if (filePath) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.download(filePath, 'قاعدة_بيانات_منهج_لغتي_العربية_الصف_التاسع.xlsx');
  } else {
    // Vercel serverless fallback: redirect directly to static asset served by Vercel CDN
    res.redirect(302, `/downloads/${filename}`);
  }
});

export default app;
