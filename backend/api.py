import requests
from typing import Union

from fastapi import FastAPI

app = FastAPI()

api_key = "690e454d-4fd1-4154-810a-554c1b0a9619"
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
        return response["data"][crypto_symbol]["quote"]["USD"]["price"]
    return "Not found"

@app.get("/")
def read_root():
    return {"message": "CryptoBot backend running!"}

@app.get("/crypto/{symbol}")
def crypto_price(symbol:str):
    price = get_crypto_price(symbol.upper())
    return {"crypto": symbol.upper(), "price": price}