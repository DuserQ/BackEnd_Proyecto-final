# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runtime
WORKDIR /app

# 1) Instala deps de PRODUCCIÓN (incluye prisma y @prisma/client)
COPY package*.json ./
RUN npm install --omit=dev

# 2) Copia el esquema para que 'prisma generate' funcione
COPY prisma ./prisma

# 3) Copia el código compilado
COPY --from=builder /app/dist ./dist

# 4) Genera el cliente (node_modules @ runtime ya tiene prisma)
RUN npx prisma generate

EXPOSE 8080
CMD sh -c "npx prisma migrate deploy || true; node dist/server.js"
