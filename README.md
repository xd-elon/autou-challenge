## Requisitos
- Node 18+ (frontend)
- Python 3.10+ (backend)
- pip / virtualenv (backend)
- (opcional) Docker & docker-compose

---

## Rodando localmente (desenvolvimento)

### Front (autou-front)

``
cd autou-front
npm install
npm run dev
``



### Backend (autou-back)
```bash
cd autou-back
python -m venv .venv
source .venv/bin/activate    # mac/linux
.venv\Scripts\activate       # windows

pip install -r requirements.txt # or pip3 install



flask run --port=5000
```

vejo o env example deixei a key necessesaria la, existe example de pdf e txt na raiz.

ATENÇÃO!: a detecção de chaves pode bloquear ou desativar a chave do groq por ter sido esposta publicamente caso seja necessario gere sua propria chave aqui: 

Link: https://console.groq.com/keys