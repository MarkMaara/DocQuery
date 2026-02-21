# 📄 Document Querying AI Assistant

A powerful, AI-driven document analysis tool that allows users to upload files, generate concise summaries, and query document content using natural language. Built with a modern tech stack featuring **FastAPI**, **Next.js**, and **Ollama**.

---

## ✨ Features

- **📂 Multi-format Upload**: Supports `.pdf` and `.txt` files.
- **📝 Smart Summarization**: Get a high-level overview of long documents in seconds.
- **❓ Natural Language Querying**: Ask specific questions about your document and get context-aware answers.
- **⚡ Real-time Processing**: Fast document parsing and AI response generation.
- **🎨 Modern UI**: Clean, responsive interface built with Tailwind CSS.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI Engine**: [Ollama](https://ollama.com/) (Running `llama3`)
- **PDF Parsing**: `pypdf`
- **Server**: `uvicorn`

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

1.  **Python 3.8+** installed.
2.  **Node.js & npm** installed.
3.  **Ollama** installed and running.
    - Download from [ollama.com](https://ollama.com/).
    - Pull the `llama3` model:
      ```bash
      ollama pull llama3
      ```

### 1. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
pip install fastapi uvicorn requests pypdf
```

Run the backend server:

```bash
uvicorn main:app --reload
```
> The backend will be available at `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```
> The frontend will be available at `http://localhost:3000`.

---

## 🖥️ Usage

1.  Open `http://localhost:3000` in your browser.
2.  Upload a PDF or TXT file using the upload area.
3.  Click "Summarize" to get a quick overview.
4.  Type questions in the chat interface to query the document content.

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements!

---

## 📝 License

This project is open-source and available under the MIT License.
