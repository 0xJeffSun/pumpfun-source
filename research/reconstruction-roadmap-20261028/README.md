# Reconstruction Roadmap — pump, pump_amm, mayhem

## Overview

Cross-program analysis of all three incomplete program binaries, identifying
unmatched code windows, call graph relationships, instruction patterns, and
a phased reconstruction plan.

## Baseline: maintained checkpoints, not the research frontier

The window counts below come from the **maintained checkpoints** in `repro/status.json`
(`pump.normalized_functions`, `pump_amm.normalized_function_matches`), not from the latest
research builds. The unmatched lists, phases and per-window details in this packet use that
same maintained baseline, so many windows they list as unmatched are already recovered by
research composites.

| Program | Windows | Maintained matched | Unmatched vs maintained (est.) | Match % |
|---------|---------|--------------------|--------------------------------|---------|
| pump | 1035 | 823 | 212 | 79.5% |
| pump_amm | 785 | 660 | 125 | 84.1% |
| mayhem | 441 | 438 | 3 | 99.3% |

**Total estimated unmatched vs maintained checkpoints:** 340 windows, 1,642,880 bytes.

The research frontier on 28 October 2026 is far ahead of this baseline: Pump Main 1,019/1,035
([legacy-sell boundary](../pump-legacy-sell-boundary-20261028/README.md) on L38), PumpSwap 783/785
([union11](../claude-amm-union11-20261028/README.md)) and Mayhem 441/441 with its complete
meaningful ELF reproduced. See the repository README for current coverage. Check a window
against the current research inventories before treating it as open.

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
