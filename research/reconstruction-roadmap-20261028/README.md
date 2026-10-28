# Reconstruction Roadmap — pump, pump_amm, mayhem

## Overview

Cross-program analysis of all three incomplete program binaries, identifying
unmatched code windows, call graph relationships, instruction patterns, and
a phased reconstruction plan.

## Current Frontier

| Program | Windows | Matched | Unmatched (est.) | Match % |
|---------|---------|---------|------------------|---------|
| pump | 1035 | 823 | 212 | 79.5% |
| pump_amm | 785 | 660 | 125 | 84.1% |
| mayhem | 441 | 438 | 3 | 99.3% |

**Total estimated unmatched:** 340 windows, 1,642,880 bytes

## Reconstruction Phases

| Phase | Description | Windows | Bytes |
|-------|-------------|---------|-------|
| Phase 1 | Small windows with known callers | 0 | 0 |
| Phase 2 | Medium handler bodies | 73 | 219,456 |
| Phase 3 | Large handler bodies (hardest) | 224 | 1,918,480 |

## Files

| File | Description |
|------|-------------|
| summary.json | Cross-program frontier summary |
| reconstruction-plan.json | Phased reconstruction plan with priority windows |
| pump-details.json | Per-window instruction patterns and call context for Pump |
| pump_amm-details.json | Per-window analysis for PumpSwap AMM |
| mayhem-details.json | Per-window analysis for Mayhem |

## Verification

```bash
python3 verify.py
```
