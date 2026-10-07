from fastapi import FastAPI, UploadFile, File, Form

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "Medical AI Backend is running!"
    }


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    age: int = Form(...),
    symptoms: str = Form(...)
):
    return {
        "status": "success",
        "filename": file.filename,
        "age": age,
        "symptoms": symptoms,
        "message": "X-ray and patient information received successfully!"
    }