import requests
import os
import asyncio
from fastapi import FastAPI

app = FastAPI()

api_key = os.getenv("COINMARKETCAP_API_KEY", "690e454d-4fd1-4154-810a-554c1b0a9619")
base_url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

def get_crypto_price(crypto_symbol="BTC"):
    headers = {
        "X-CMC_PRO_API_KEY": api_key
    }
    params = {
        "symbol": crypto_symbol,
        "convert": "USD"
    }
    response = requests.get(base_url, headers=headers, params=params).json()
    
    if "data" in response and crypto_symbol in response["data"]:
        return {
          "price": response["data"][crypto_symbol]["quote"]["USD"]["price"],
          "market_cap": response["data"][crypto_symbol]["quote"]["USD"]["market_cap"],
          "volume_24h": response["data"][crypto_symbol]["quote"]["USD"]["volume_24h"]
        }
    return None

@app.get("/crypto/{symbol}")
def crypto_price(symbol: str):
    data = get_crypto_price(symbol.upper())
    return {"crypto": symbol.upper(), **data}