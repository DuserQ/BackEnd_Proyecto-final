# IDS Cryptojacking (Clean Architecture) + Prisma + NATS + Postgres

---
## requerimientos
**instalar cliente de nas**
- sudo apt install wget -y
- wget https://github.com/nats-io/natscli/releases/download/v0.1.5/nats-0.1.5-amd64.deb
- sudo dpkg -i nats-0.1.5-amd64.deb



## Pasos

1) npm i
2) docker compose up -d db nats
3) cp .env.example .env
4) npx prisma generate
5) npx prisma migrate dev --name init
6) docker compose up --build
7)  nats sub eve.suricata (en otra termianl)

## Pruebas
hacerlo en una terminal aparte (revisar la terminal en donde esta ejecutando el nats para saber que si se cargaron)

1) curl -X POST http://localhost:8080/ingest/eve  -H "Content-Type: application/json"  -d '{"host_id":"flarevm01","events":[{"event_type":"tls","tls":{"sni":"pool.minexmr.com"}}]}'


2) curl -X POST http://localhost:8080/ingest/eve \
 -H "Content-Type: application/json" \
 -d '{
  "host_id":"remnux01",
  "events":[
    {"event_type":"dns","dns":{"rrname":"supportxmr.com"}},
    {"event_type":"tls","tls":{"sni":"github.com"}},
    {"event_type":"tls","tls":{"sni":"hashvault.pro"}}
  ]
 }'
