const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Papa = require('papaparse');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ---------- CSV UPLOAD SETUP ----------
const upload = multer({ 
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  }
});

// Upload and parse CSV
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = fs.readFileSync(req.file.path, 'utf8');
    const parsed = Papa.parse(file, { 
      header: true, 
      dynamicTyping: true,
      skipEmptyLines: true
    });

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Return parsed CSV data to frontend
    res.json({
      success: true,
      data: parsed.data,
      meta: parsed.meta,
      errors: parsed.errors
    });
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing CSV file',
      error: error.message 
    });
  }
});

// Download CSV endpoint
app.post('/api/download', (req, res) => {
  try {
    const { data, filename } = req.body;
    
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const csv = Papa.unparse(data);
    const filepath = path.join(uploadDir, filename || 'export.csv');
    
    fs.writeFileSync(filepath, csv);
    
    res.download(filepath, filename || 'export.csv', (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Clean up file after download
      fs.unlinkSync(filepath);
    });
  } catch (error) {
    console.error('Error creating CSV:', error);
    res.status(500).json({ 
      message: 'Error creating CSV file',
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ---------- SERVE REACT FRONTEND (for production) ----------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Upload directory: ${path.resolve(uploadDir)}`);
});
