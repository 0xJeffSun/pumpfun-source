#!/usr/bin/env python3
"""Materialize the archived L33 source plus this one-file change, then use the repository builder."""
from pathlib import Path
import argparse,shutil,subprocess,sys
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
a=argparse.ArgumentParser(description=__doc__);a.add_argument('--sdk',type=Path,required=True);a.add_argument('--registry-home',type=Path,required=True);a.add_argument('--output',type=Path,required=True);v=a.parse_args()
out=v.output.resolve();stage=out.with_name(out.name+'-input');assert not stage.exists() and not out.exists()
shutil.copytree(ROOT/'research/claude-pump-integration-20261027/r37-layout-33/source/programs/pump',stage)
shutil.copy2(P/'source/programs/pump/src/trade_v3.rs',stage/'src/trade_v3.rs')
subprocess.run([sys.executable,str(ROOT/'scripts/pump_build_verified.py'),'--source-directory',str(stage),'--sdk',str(v.sdk.resolve()),'--registry-home',str(v.registry_home.resolve()),'--output',str(out),'--target','sbpf-solana-solana','--workspace-layout'],check=True)
