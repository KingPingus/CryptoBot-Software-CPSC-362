from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from api import get_crypto_price, get_trending_cryptos 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get('/')
def read_root():
    return {"System Message": "Today's Market"}

# Search for cryptocurrency endpoint
@app.get("/crypto/{symbol}")
async def crypto_price(symbol: str):
    data = await get_crypto_price(symbol.upper())
    if data:
        return {"crypto": symbol.upper(), **data}
    else:
        raise HTTPException(status_code=404, detail=f"Cryptocurrency symbol {symbol.upper()} not found.")

# Trending coins endpoint
@app.get("/trending")
async def trending_coins():
    data = await get_trending_cryptos()
    if data:
        return {"trending_coins": data}
    else:
        raise HTTPException(status_code=404, detail="Trending data not found.")
