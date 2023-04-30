# BAP-Mobility

Open Source Prototype Application for `Booking Without App` and `Map Cost Improvements`.

### Booking Without App
- Rider visits the BAP-client(web-app/web-site).
- Allows the client to access his location.
- Gets List of Drivers with their contact and distance away from the rider.
- Rider clicks on WhatsApp icon.
- Navigated to the Drivers Personal chat in whatsApp along with the rider's location.
- ***From Here the driver and rider communicate with each other through Whatsapp call or normal call or Whatsapp chat.***


### Map Cost Improvement
- Rider visits the BAP-client(web-app/web-site).
- Allows the client to access his location.
- Gets List of Drivers with their contact and distance away from the rider.
- ***Google Maps renders the drivers near the rider in the map.***
- Rider clicks on WhatsApp icon.
- Navigated to the Drivers Personal chat in whatsApp along with the rider's location.
- ***From Here the driver and rider communicate with each other and track each others location using Whatsapp's live location sharing feature***.


## Screenshots
Home                                |  WhatsApp
:----------------------------------:|:-------------------------:
![](https://imgur.com/5PSURbr.png)  |  ![](https://imgur.com/54X6KBq.png)


## WorkFlow
![](https://imgur.com/huGBnBk.png)
* Rider visits the BAP-client(web-app/web-site).
* Allows the client to access his location.
* client forwards the request to BAP-service
* BAP-service registered under **mobility** domain makes a `/search` action to **Beckn Gateway(BG)**.
* BAP-service recieves list of providers from **BPPs** through `/on_search` action
* BAP-service makes `/select` call to all BPPs contacted.
* BAP-service recieves the driver details from BPPs and emits it in the `socket.io`
* BAP-client listens to the emitted data and renders the list of drivers in the map.

## Setup
### beckn registry:
* Visit beckn registry and register your bap-service by hosting it in a domain
* Add the credentials in the .env file of bap-service.
### bap-client:
* Configure
    ```bash
    cd bap-client && cp config.example.js config.js
    ```
* Run
    ```
    npm i && npm start
    ```
### bap-service:
 * Configure
    ```bash
    cd bap-service && cp .env.example .env
    ```
 * Run
    ```bash
    docker build -t server . && docker run -p 8080:8080 server
    ```