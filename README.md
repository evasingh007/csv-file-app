# 📊 CSV File Manager

A full-stack web application for uploading, viewing, editing, and downloading CSV files.

## Features

✅ Upload CSV files  
✅ View CSV data in a clean table  
✅ Edit cells directly in the browser  
✅ Add new rows  
✅ Delete rows  
✅ Download edited CSV files  
✅ Responsive design

## Tech Stack

**Frontend:** React 18  
**Backend:** Node.js + Express  
**CSV Parser:** PapaParse  

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Run the Application

**Start Backend Server (Terminal 1):**
```bash
cd server
npm start
```
Server runs on `http://localhost:3000`

**Start Frontend (Terminal 2):**
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3001`

### 3. Open in Browser
Navigate to `http://localhost:3001`

---

## 📦 Deployment Guide

### Option 1: Deploy to Render (Recommended - FREE)

#### Deploy Backend:

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** csv-app-backend
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Click "Create Web Service"
6. Copy your backend URL (e.g., `https://csv-app-backend.onrender.com`)

#### Deploy Frontend:

1. Update `client/package.json` - change proxy to your Render backend URL:
```json
"proxy": "https://your-backend-url.onrender.com"
```

2. On Render, click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name:** csv-app-frontend
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
5. Click "Create Static Site"

---

### Option 2: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend on Render (same as above)

#### Frontend on Vercel:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Follow prompts and deploy

---

### Option 3: Deploy to Heroku

1. Install Heroku CLI
2. Create `Procfile` in root:
```
web: node server/server.js
```

3. Deploy:
```bash
heroku create csv-file-manager
git push heroku main
```

---

### Option 4: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects and deploys

---

### Option 5: Deploy to Netlify (Frontend) + Backend separately

#### Backend:
Deploy to Render, Railway, or Heroku (see above)

#### Frontend on Netlify:

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub
4. Configure:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/build`
5. Add environment variable:
   - `REACT_APP_API_URL` = your backend URL
6. Deploy

---

## 🔧 Configuration

### Environment Variables

**Backend (.env file in server/):**
```env
PORT=3000
NODE_ENV=production
```

**Frontend:**
Update API URL in `client/src/App.js` if needed:
```javascript
const API_URL = process.env.REACT_APP_API_URL || '/api';
```

---

## 📝 Usage

1. Click "Choose CSV File" to upload a CSV
2. View your data in the table
3. Click "Edit Mode" to modify cells
4. Use "Add Row" to insert new data
5. Click "Download CSV" to save your changes
6. Use "Clear" to reset

---

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, make sure your backend allows your frontend domain:

```javascript
// server/server.js
app.use(cors({
  origin: ['http://localhost:3001', 'https://your-frontend-url.com']
}));
```

### Port Already in Use
Change the port in `server/server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

MIT License - feel free to use this project however you'd like!

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📧 Support

If you have issues, please create a GitHub issue or contact the maintainer.

---

**Happy CSV Managing! 📊**
