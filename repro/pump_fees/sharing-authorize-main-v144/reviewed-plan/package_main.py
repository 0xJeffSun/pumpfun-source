"""UNEXECUTED post-identity packager; supplied paths only, no hidden work dependency."""
from pathlib import Path
import argparse,json,hashlib,shutil,gzip
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
a=argparse.ArgumentParser();a.add_argument('--controls',type=Path,required=True);a.add_argument('--build',type=Path,required=True);a.add_argument('--scratch',type=Path,required=True);a.add_argument('--output',type=Path,required=True);args=a.parse_args();C=args.controls;B=args.build;S=args.scratch;O=args.output
assert H(S/'manifest.json')=='52cd978029f67b8c79e738131fa2bec3251de8fdfc2a22270e1464b210125ba7';assert J(C/'runner-exit.json')['returncode']==0 and J(C/'identity.json')['whole_candidate_equal']and J(C/'identity.json')['whole_symbols_equal'];assert not O.exists();O.mkdir(parents=True)
shutil.copytree(C,O/'controls');(O/'main').mkdir()
for n in ['build-attempt.json','build-comparison.json','build.log']:shutil.copy2(B/n,O/'main'/n)
shutil.copy2(B/'artifacts/pump_fees_candidate.so',O/'main/candidate.so');shutil.copy2(B/'target/sbf-solana-solana/release/pump_fees_candidate.so',O/'main/symbols.so')
shutil.copytree(S,O/'scratch');shutil.copy2(P/'verify_main.py',O/'verify.py')
(O/'README.md').write_text('Portable main/scratch complete ELF identity. All source maps and saved runtime evidence carried inside scratch; no original work paths are read. Optional --current-root checks actual26source inputs. No target/build execution. Earlier UNRUN/absolute-path plans remain historical templates only; this verifier has no hidden work dependency.\n')
m={str(f.relative_to(O)):H(f)for f in sorted(O.rglob('*'))if f.is_file()};(O/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(O/'manifest.sha256').write_text(H(O/'manifest.json')+'  manifest.json\n');print(H(O/'manifest.json'))
