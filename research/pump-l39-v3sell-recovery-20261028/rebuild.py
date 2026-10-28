#!/usr/bin/env python3
"""Build the archived L39 input plus the single sell-body change with the official builder."""
from pathlib import Path
import argparse,hashlib,json,shutil,subprocess,sys
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--base-source',type=Path,default=ROOT/'research/claude-pump-integration-20261027/r37-layout-39/source/programs/pump');p.add_argument('--sdk',type=Path,required=True);p.add_argument('--registry-home',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
manifest=json.loads((P/'BASE-MANIFEST.json').read_text());prefix='source/programs/pump/'
expected={k[len(prefix):]:v for k,v in manifest.items()if k.startswith(prefix)}
actual={str(f.relative_to(a.base_source)):hashlib.sha256(f.read_bytes()).hexdigest()for f in a.base_source.rglob('*')if f.is_file()};assert actual==expected
out=a.output.resolve();stage=out.with_name(out.name+'-input');assert not stage.exists()and not out.exists()
shutil.copytree(a.base_source,stage);shutil.copy2(P/'source/programs/pump/src/trade_v3.rs',stage/'src/trade_v3.rs')
subprocess.run([sys.executable,str(ROOT/'scripts/pump_build_verified.py'),'--source-directory',str(stage),'--sdk',str(a.sdk.resolve()),'--registry-home',str(a.registry_home.resolve()),'--output',str(out),'--target','sbpf-solana-solana','--workspace-layout'],check=True)
