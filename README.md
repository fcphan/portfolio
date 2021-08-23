# Personal Portfolio

CS410/510 – Intro to Web Development Final Project: Personal Portfolio

## Deployment

The personal portfolio is being hosted on GitHub Pages at [fcphan.github.io/portfolio](https://fcphan.github.io/portfolio).

## Project Details

### How to run

This portfolio is very simple to run, as it only

### Componenets

The portfolio is primarily made of of HTML code, CSS, and JavaScript. For general styling purposes, BootStrap 5.5 was used, with CSS taking care of the more fine tuned styling and animations. The JavaScript file contains a getter function, which sends a request to a separate API endpoint that I made.

### API

Since GitHub Pages cannot act as a server for the most part, and it is ill-advised to keep API keys and the like in the code publiclly, I made a separate server in order to host the API endpoint. The server is currently being hosted on [my Replit](https://replit.com/@phan5/server). Since repls in Replit automatically expire after 20 minutes of not being used, I utilized a monitoring bot which pings the server every 5 minutes, effectively keeping the server alive indefinitely.

The server sends an request to the SteamAPI, which collects the recently played games from the server using my SteamID and API key. Since my profile is usually set to private, the only way that the API will return a successful response is if I used my own personal API key. Once the data is fetched, it is parsed out and the data is slightly manipulated. For example, the time returned is in minutes, which isn't really helpful, so I converted it into hours with a single decimal point. Additionally, the API can return the banner hash, which can be used to find the game's banner image, but this is usually very low resolution. To work around this, I used the game's ID in order to fetch game's splash art directly from Steam's CDN. All of this data is then sent to a function which creates a card, which is then appended to the page.

### Other Media/Items

Outside of the game splash arts, I utilized two specific images and a custom font file.

- encryption-1.jpg - This image was taken from [a Kaspersky article](https://www.kaspersky.com/resource-center/definitions/encryption).
- wonderTix.png - This was a screenshot taken from the capstone project.
- keifont.ttf - This is an external font that I decided to use since I really like the style of it. The font can be found at [Free Japanese Font](https://www.freejapanesefont.com/kei-font-download/).
