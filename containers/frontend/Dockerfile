FROM denoland/deno:alpine
WORKDIR /app
EXPOSE 5173
# 依存関係をあらかじめキャッシュ（高速化のため）
COPY frontend/deno.json .
RUN deno install
# Viteを起動
CMD ["task", "dev"]