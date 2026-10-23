# sentinel-demo-shop

A small order API (Express + Postgres) with a Python reporting script. It is used to demo
Code-Sentinel pull request reviews.

## Run

```bash
npm install
DATABASE_URL=postgres://localhost/shop npm run build && npm start
```

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Liveness check |
| GET | `/products` | List products |

## Scripts

- `scripts/report.py` prints a daily sales total from a CSV export.
