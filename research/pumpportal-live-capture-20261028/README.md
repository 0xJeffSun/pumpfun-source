# PumpPortal Live Capture — 2026-10-28

## Scope

Real-time cascading capture of pump.fun events via the PumpPortal WebSocket
Data API. The harness subscribes to new token creations, then automatically
subscribes to early trades on each newly created token.

## Subscriptions

**Base feeds:**
- `subscribeNewToken`
- `subscribeMigration`

**Dynamic feeds:**
- `subscribeTokenTrade` — added for each new token as it appears (65 total)

## Results

| Metric | Value |
|--------|-------|
| Start | 2026-10-28T17:52:48.417Z |
| End | 2026-10-28T17:57:48.696Z |
| Duration | 300s |
| Total events | 135 |
| Unique tokens | 65 |
| Tokens with trades | 0 |

### Event type breakdown

- `unknown`: 68
- `create`: 65
- `migrate`: 2

## Files

| File | Description |
|------|-------------|
| events.json | All captured events with receive timestamps |
| token-index.json | Per-token summary (name, symbol, trade counts, volume) |
| summary.json | Capture metadata |
| manifest.json | SHA-256 integrity hashes |
| verify.py | Standalone verification script |

## Verification

```bash
python3 verify.py
```

## Notes

- Data commitment level: processed (per PumpPortal FAQ, <100ms behind gRPC)
- API key is NOT stored in this packet
- All event data is public on-chain information
- Cascading subscriptions increase volume by tracking early-stage trading
