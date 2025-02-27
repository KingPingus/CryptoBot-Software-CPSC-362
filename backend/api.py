import os
import httpx
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

load_dotenv('api.env')

app = FastAPI()

api_key = os.getenv("COINMARKETCAP_API_KEY")
base_url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

def get_crypto_price(crypto_symbol="BTC"):
    headers = {
        "X-CMC_PRO_API_KEY": api_key
    }
    params = {
        "symbol": crypto_symbol,
        "convert": "USD"
    }
    print(f"base_url: {base_url}")
    response = httpx.get(base_url, headers=headers, params=params).json()
    
    if "data" in response and crypto_symbol in response["data"]:
        return {
          "price": response["data"][crypto_symbol]["quote"]["USD"]["price"],
          "market_cap": response["data"][crypto_symbol]["quote"]["USD"]["market_cap"],
          "volume_24h": response["data"][crypto_symbol]["quote"]["USD"]["volume_24h"]
        }

@app.get('/')
def read_root() :
    return {"System Message" : "Today's Market"}
@app.get("/crypto/{symbol}")
def crypto_price(symbol: str):
    data = get_crypto_price(symbol.upper())
    if data :
        return {"crypto": symbol.upper(), **data}
    else :
        raise HTTPException(status_code=404, detail="Sorry, this Cryptocurrency is not availble right now")