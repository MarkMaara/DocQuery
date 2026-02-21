import requests
import json
from pypdf import PdfReader
import io

OLLAMA_URL = "http://localhost:11434/api/generate"

def extract_text_from_pdf(content: bytes) -> str:
    reader = PdfReader(io.BytesIO(content))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text.strip()

def extract_text_from_txt(content: bytes) -> str:
    return content.decode("utf-8").strip()

def call_ollama_stream(prompt: str, model: str = "llama3"):
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": True
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload, stream=True)
        response.raise_for_status()
        
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line.decode("utf-8"))
                if "response" in chunk:
                    yield chunk["response"]
                if chunk.get("done"):
                    break
    except Exception as e:
        yield f"Error communicating with Ollama: {str(e)}"

def call_ollama(prompt: str, model: str = "llama3") -> str:
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        return response.json().get("response", "")
    except Exception as e:
        return f"Error communicating with Ollama: {str(e)}"
