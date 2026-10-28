# Local development template; image digest and production policy are not qualified.
FROM node:24-bookworm-slim AS build
WORKDIR /workspace/app
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate
COPY . .
RUN pnpm install --frozen-lockfile
ARG BACKEND_URL=http://backend:3001
ENV BACKEND_URL=$BACKEND_URL
RUN pnpm build
FROM build AS backend
ENV HOST=0.0.0.0 PORT=3001
EXPOSE 3001
CMD ["pnpm", "--filter", "@pump-reconstruction/backend", "start"]
FROM build AS frontend
EXPOSE 3000
CMD ["pnpm", "--filter", "@pump-reconstruction/frontend", "start"]
