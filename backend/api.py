from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = [
    "http://localhost:5173",  # or the origin where your frontend is running
    "http://localhost:8000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


API_KEY = "690e454d-4fd1-4154-810a-554c1b0a9619"

# Function to get crypto price from CoinMarketCap
async def get_crypto_price(symbol: str):
    url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
    params = {
        "symbol": symbol,
        "convert": "USD",
    }
    headers = {
        "X-CMC_PRO_API_KEY": API_KEY,
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, headers=headers)
        data = response.json()
        if response.status_code == 200:
            crypto_data = data["data"].get(symbol.upper())
            if crypto_data:
                quote = crypto_data["quote"]["USD"]
                return {
                    "name": crypto_data["name"],
                    "symbol": crypto_data["symbol"],
                    "price": quote["price"],
                    "market_cap": quote["market_cap"],
                    "24h_change": quote["percent_change_24h"],
                    "image": crypto_data.get("logo", ""),
                    "circulating_supply": crypto_data["circulating_supply"],
                    "total_supply": crypto_data["total_supply"],
                }
            else:
                return None
        else:
            return None

# Function to get trending coins
async def get_trending_cryptos():
    url = f"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    params = {
        "limit": 10,
        "convert": "USD",
        "sort": "market_cap",
    }
    headers = {
        "X-CMC_PRO_API_KEY": API_KEY,
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, headers=headers)
        data = response.json()
        if response.status_code == 200:
            trending_coins = []
            for coin in data["data"]:
                trending_coins.append({
                    "name": coin["name"],
                    "symbol": coin["symbol"],
                    "price": coin["quote"]["USD"]["price"],
                    "market_cap": coin["quote"]["USD"]["market_cap"],
                    "24h_change": coin["quote"]["USD"]["percent_change_24h"],
                    "image": coin.get("logo", ""),
                })
            return trending_coins
        else:
            return None

@app.get("/trending")
async def trending():
    # return await get_trending_cryptos()
    coins = await get_trending_cryptos()
    return {
        "trending_coins": [
            {
                "symbol": coin["symbol"],
                "name": coin["name"],
                "price": coin["price"],
                "market_cap": coin["market_cap"],
                "24h_change": coin["24h_change"],
                "image": coin.get("image", "")
            } 
            for coin in (coins if coins else [])
        ]
    }