import os
import json
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("Need GROQ_API_KEY in .env")

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
HEADERS = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}

app = Flask(__name__)
CORS(app)

def call_groq(messages, model="openai/gpt-oss-20b", max_tokens=512, temperature=1.0):
    body = {
        "model": model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature
    }
    resp = requests.post(GROQ_URL, headers=HEADERS, json=body, timeout=30)
    resp.raise_for_status()
    return resp.json()

@app.route("/classify", methods=["POST"])
def classify():
    data = request.json
    subject = data.get("subject", "")
    sender = data.get("from", "")
    body = data.get("body", "")

    prompt = f"""
You are an email triage assistant.
Input:
Subject: {subject}
From: {sender}
Body: {body}

Respond with JSON only:
{{"label":"productive"|"unproductive","score":0.0,"reason":"...","reply":"..."}}
"""
    messages = [
        {"role": "user", "content": prompt}
    ]
    try:
        groq_resp = call_groq(messages)
        # pegar a resposta textual
        content = groq_resp["choices"][0]["message"]["content"]
        # parse JSON da resposta
        parsed = json.loads(content)
        return jsonify({"ok": True, "result": parsed})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.route("/reply", methods=["POST"])
def reply_generate():
    data = request.json
    subject = data.get("subject", "")
    sender = data.get("from", "")
    body = data.get("body", "")
    tone = data.get("tone", "professional and concise")

    prompt = f"""
You are an assistant that drafts email replies.
Tone: {tone}
Input email:
Subject: {subject}
From: {sender}
Body: {body}

Produce a short reply (max 200 words), including a clear CTA if needed. Return only the reply text.
"""
    messages = [
        {"role": "user", "content": prompt}
    ]
    try:
        groq_resp = call_groq(messages)
        content = groq_resp["choices"][0]["message"]["content"]
        return jsonify({"ok": True, "reply": content.strip()})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)