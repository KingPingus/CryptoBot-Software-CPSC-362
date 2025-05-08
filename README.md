# Cryptocurrency Tracker Web Application
#### Created by Aaron Davila, Jason Khau, Drew Butler
-----
## Project Description

#### From January 2025 - May 2025, as a team, we created a Web Application that tracks the Cryptocurrency Market in real time using an API provided by CoinMarketCap. Our goal of the project was to understand how to handle **APIs** and **Endpoints** of a program. We wrote this application utilizing different tools and languages to maximize our output.
-----

## Requirements to run this Application (**Very Important**)

| Name of Program                        | Windows                                                                | MacOS                                                             |
| -------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Svelte - Frontend Framework            | https://svelte.dev/                                                    | https://svelte.dev/                                               |
| FastAPI - Backend Framework            | `pip install "fastapi[standard]"`                                      | `pip3 install "fastapi[standard]"`                                |
| Uvicorn - Backend ASGI                 | `pip install uvicorn`                                                  | `pip3 install uvicorn`                                            |
| Npm - Node Package Manager             | https://docs.npmjs.com/downloading-and-installing-node-js-and-npm      | https://docs.npmjs.com/downloading-and-installing-node-js-and-npm |
| NodeJS - Javascript Runtime Enviroment | https://nodejs.org                                                     | https://nodejs.org                                                |
| CORS - Cross-Origin Resource Sharing   | `npm install cors`                                                     | `npm install cors`                                                |
| PocketBase - User Authentication       | https://pocketbase.io/docs/                                            | https://pocketbase.io/docs/                                       |

-----

## How to run

Make sure you have three terminals open. One must be in the **backend** directory, one in the **PocketBase**, and one in the **frontend** directory. In the backend directory, type the command `uvicorn main:app --reload`. In the PocketBase, type the command './pocketbase serve'. In the frontend, type the command `npm run dev`. 

*Note that you need to run the backend and PocketBase before the frontend, just to make sure that there are no problems when loading the program.*

Then, click on the link in the frontend terminal to load the website.

Now, you are free to explore our project!
