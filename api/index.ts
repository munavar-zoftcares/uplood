// api/index.ts
import express from 'express';
import cors from 'cors';
import { corsOptions } from './configs/cors';
import healthRouter from './routes/health';
import userRouter from './routes/user.routes';
// import express from "express"
import multer from "multer"
import * as xlsx from "xlsx";
import fs from 'fs';
import path from 'path';
const app = express();

// Globale Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routen mounten
app.use('/api/health', healthRouter);
app.use('/api/user', userRouter);

// Nur lokal: Listener starten, wenn das Skript direkt ausgeführt wird
app.get("/", (_req, res) => {
  res.send("Hello from Express!");
});
""
//..................
// const upl = express.Router();


// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });
const upload = multer({ storage: multer.memoryStorage() });
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    const filePath = req.file?.path;
    // const workbook = xlsx.readFile(filePath);
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = xlsx.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: null
    });

    const nonEmptyRows: any = sheetData.filter((row: any) =>
      row.some((cell: string | null) => cell !== null && cell !== '')
    );
    //.......
    let emptyStartColumns = 0;
const maxCols = Math.max(...nonEmptyRows.map((row: string | any[]) => row.length));

for (let col = 0; col < maxCols; col++) {
  const isColumnEmpty = nonEmptyRows.every((row: null[]) => row[col] === null);
  if (isColumnEmpty) {
    emptyStartColumns++;
  } else {
    break; // stop counting after the first non-empty column
  }
}

console.log(`Empty columns from start: ${emptyStartColumns}`);
    //.......
    const headers = nonEmptyRows[1].slice(emptyStartColumns+1);
    const statusRow = nonEmptyRows[2].slice(emptyStartColumns+1);

    const result = [];

    let id = 1;
    for (let i = 2; i < nonEmptyRows.length; i++) {
   
      const a = nonEmptyRows[i][emptyStartColumns];
        //  console.log("aaaaa",a,"type",typeof a)
      if (!a) continue;

      for (let j =0; j < headers.length; j++) {
        const b = headers[j];
        if (!b) continue;

        const scoreValue = nonEmptyRows[i][j+1+(emptyStartColumns)];
        // console.log(nonEmptyRows[3])
        const status = statusRow[j];
       
        result.push({
          id: id++,
          x_axis: a.toLowerCase(),
          y_axis: b,
          score: (scoreValue * 100).toFixed(2) + '%',
          status: status
        });
      }
    }
    // console.log(result);
    res.json(result)
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing file.");
  }
});
//.....
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
