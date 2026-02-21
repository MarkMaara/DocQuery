from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils import extract_text_from_pdf, extract_text_from_txt, call_ollama, call_ollama_stream
import os

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for the current document (for demo purposes)
document_store = {"text": ""}

class QueryRequest(BaseModel):
    query: str

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    extension = os.path.splitext(file.filename)[1].lower()
    content = await file.read()
    
    if extension == ".pdf":
        text = extract_text_from_pdf(content)
    elif extension == ".txt":
        text = extract_text_from_txt(content)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF or TXT.")
    
    document_store["text"] = text
    return {"message": f"File {file.filename} uploaded and processed successfully."}

@app.post("/summary")
async def get_summary():
    if not document_store["text"]:
        raise HTTPException(status_code=400, detail="No document uploaded yet.")
    
    prompt = f"Summarize the following document in a concise way:\n\n{document_store['text'][:4000]}"
    return StreamingResponse(call_ollama_stream(prompt), media_type="text/plain")

@app.post("/query")
async def query_document(request: QueryRequest):
    if not document_store["text"]:
        raise HTTPException(status_code=400, detail="No document uploaded yet.")
    
    prompt = f"Using the following context, answer the user's question.\n\nContext: {document_store['text'][:4000]}\n\nQuestion: {request.query}"
    return StreamingResponse(call_ollama_stream(prompt), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
