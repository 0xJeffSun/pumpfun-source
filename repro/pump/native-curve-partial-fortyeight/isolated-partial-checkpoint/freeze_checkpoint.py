"""Freeze the isolated, bounded native/legacy checkpoint; no build or execution."""
from pathlib import Path
import difflib,gzip,hashlib,json,shutil,tarfile
P=Path(__file__).resolve().parent;R=P.parents[1];S=P/'source';B=P/'build-05';Q=P/'checkpoint-native-legacy-partial'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
shutil.copytree(P/'diagnostics/provisional-package-build04',Q)
def cp(src,dst):
 dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
def gz(src,dst):
 dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(gzip.compress(src.read_bytes(),mtime=0))
report=json.loads((B/'build-comparison.json').read_text());current=report['source_sha256'];assert len(current)==32
for k,v in current.items():assert sha(R/k)==v,k
(Q/'source-sha256.json').write_text(json.dumps(current,indent=2)+'\n')
with tarfile.open(Q/'source-snapshot.tar.gz','w:gz')as t:
 for k in current:t.add(R/k,arcname=k)
for name in ['build-comparison.json','build-attempt.json']:cp(B/name,Q/name)
gz(B/'build.log',Q/'build.log.gz');cp(B/'artifacts/pump_recovered.so',Q/'candidate.so')
cp(B/'target/sbf-solana-solana/release/pump_recovered.so',Q/'unstripped.so')
cp(S/'src/multi_hop_curve.rs',Q/'source/multi_hop_curve.rs');cp(S/'src/lib.rs',Q/'source/lib.rs')
old=(R/'work/pump-multi-hop-curve-static/source-evidence/pump42-lib.rs').read_text();new=(S/'src/lib.rs').read_text()
patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/lib.rs',tofile='b/programs/pump/src/lib.rs'))
patch+=''.join(difflib.unified_diff([], (S/'src/multi_hop_curve.rs').read_text().splitlines(True),fromfile='/dev/null',tofile='b/programs/pump/src/multi_hop_curve.rs'))
(Q/'integration.patch').write_text(patch)
helpers=json.loads((P/'harness-sha256.json').read_text())
for path in [P/'differential.py',P/'verify_saved.py']:helpers[str(path.relative_to(R))]=sha(path)
with tarfile.open(Q/'test-snapshot.tar.gz','w:gz')as t:
 for k,v in helpers.items():assert sha(R/k)==v;t.add(R/k,arcname=k)
(Q/'harness-sha256.json').write_text(json.dumps(helpers,indent=2)+'\n')
for name in ['differential.py','verify_saved.py','RECOVERY_NOTES.md']:cp(P/name,Q/name)
cp(P/'saved-verification-05.json',Q/'saved-verification.json')
gz(P/'differential-05-final.json',Q/'differential.json.gz');gz(P/'differential-05-repeat.json',Q/'differential-repeat.json.gz')
oldbuild=P/'build-04';out=Q/'prior-attempts/build-04'
for name in ['build-attempt.json','build-comparison.json','source-snapshot.tar.gz']:cp(oldbuild/name,out/name)
gz(oldbuild/'build.log',out/'build.log.gz');cp(oldbuild/'artifacts/pump_recovered.so',out/'candidate.so');gz(P/'differential-04.json',out/'differential.json.gz')
for path in (Q/'tools').glob('*.py'):assert sha(path)==sha(R/'scripts'/path.name)
commands=json.loads((Q/'replay-commands.json').read_text());commands['saved_verify']=['work/test-env/bin/python',str((Q/'verify_saved.py').relative_to(R)),'--receipt',str((Q/'differential.json.gz').relative_to(R)),'--repeat',str((Q/'differential-repeat.json.gz').relative_to(R)),'--candidate',str((Q/'candidate.so').relative_to(R)),'--output','<NEW_VERIFICATION_JSON>']
(Q/'replay-commands.json').write_text(json.dumps(commands,indent=2)+'\n')
(Q/'README.md').write_text('''# Isolated Pump partial native/legacy curve-run checkpoint

This is a main42-based PARTIAL `multi_hop_curve_swap` candidate. The clean pinned v1.44 build is 1,461,472 bytes, SHA-256 `ca1fa48c953cd6643b88e8c10122a2a3b1b224e65a6be2099a58786587e68c85`. Full original-byte equality is false.

All 56 fixed-scope comparisons pass, with 112 independently verified ordinary outer signatures. Fifty comparisons reach the Pump CPI, 11 succeed, and six stop in captured AMM before Pump. A separate repeat from `/tmp` produces byte-identical receipts and adds no unique cases. State, errors, events, inner CPI bytes and return data are compared. Every side uses a fresh VM, exactly one chosen Pump ELF, and the actual captured AMM's PDA signing. State is synthetic and local.

Accepted scope is one native curve per Pump CPI, flag 3, legacy Tokenkeg 82/165-byte layouts and an ordinary 166-byte curve. Multi-curve, mixed endpoint flags, non-native/nested quote paths, Token-2022, holder rewards and synthetic completion remain unsupported. This does not increment the fully recovered handler count. Existing sell_v2 limitations remain unchanged.

`integration.patch` contains only the new module and minimal main42 lib insertion. All other 30 baseline inputs are unchanged; the 32 actual build inputs and source snapshot are bound. `source/lib.rs` is a baseline42 scratch file and must not overwrite main48. Root must merge the minimal insertion, then clean-build and run all existing suites before promotion.

The package retains every earlier compiler attempt, negative receipt and invalid cached-harness diagnostic. That invalid diagnostic contributes no passing cases. `RECOVERY_NOTES.md` explains the exact boundary/order corrections. Compiler selection and lock compatibility are not historical provenance proof. No main source, central documentation, live state or stopped recovery lane was changed.
''')
cp(Path(__file__),Q/'freeze_checkpoint.py')
manifest={str(f.relative_to(Q)):sha(f)for f in sorted(Q.rglob('*'))if f.is_file()}
(Q/'manifest-sha256.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'files':len(manifest)+1,'manifest_sha256':sha(Q/'manifest-sha256.json'),'candidate_sha256':sha(Q/'candidate.so'),'source_inputs':len(current),'harness_files':len(helpers)},indent=2))
