FROM node:20-alpine AS base

WORKDIR /app

# Instalación de dependencias primero (layer cache)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copiar el resto del código
COPY . .

# Build
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

EXPOSE 3000

# Ejecutar la app compilada
CMD ["node", "dist/main.js"]