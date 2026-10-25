from pathlib import Path
import hashlib,json,shutil
R=Path.cwd();W=R/'work/relay-idl-discriminator-build';P=W/'public';OLD=R/'work/relay-idl-deserialize-build/public';H=lambda f:hashlib.sha256(f.read_bytes()).hexdigest()
assert not P.exists();shutil.copytree(W/'result',P,ignore=shutil.ignore_patterns('__pycache__'))
(P/'manifest.json').rename(P/'pre-runtime-manifest.json');(P/'manifest.sha256').rename(P/'pre-runtime-manifest.sha256');(P/'verify.py').rename(P/'runtime-static-verify.py')
s=(OLD/'verify.py').read_text().replace('source-build-09-idl-owned','source-build-10-idl-deserialize');(P/'verify.py').write_text(s)
shutil.copytree(W/'proposal',P/'proposal',ignore=shutil.ignore_patterns('__pycache__'));shutil.copytree(W/'ordinary',P/'ordinary',ignore=shutil.ignore_patterns('__pycache__'))
s=(P/'ordinary/verify.py').read_text().replace("build=P.parent/'result'",'build=P.parent').replace("build/'manifest.json'","build/'pre-runtime-manifest.json'");(P/'ordinary/verify.py').write_text(s)
for n in ['relay_build_once.py','resolved-source-archive-equality.json','build11-adaptation.json']:shutil.copyfile(W/'launcher'/n,P/'launcher'/n)
shutil.copytree(W/'launcher/tool-witness',P/'launcher/tool-witness');(P/'control').mkdir()
for n in ['preflight.stdout','preflight.stderr','launch.stdout','launch.stderr','analysis.stdout','analysis.stderr','review.stdout','review.stderr','static-verify.stdout','static-verify.stderr','ordinary.stdout','ordinary.stderr','saved-verification.json','saved-verification.stderr','package.py']:shutil.copyfile(W/n,P/'control'/n)
(P/'README.md').write_text('''# Relay owned3001 checked-header conversion

One pinned v1.44 compile and existing v1.52 strip phase passed. Only src/idl.rs and src/exit_error.rs differ from the frozen5af54232 source. The checked-header length<8 branch now constructs owned3001 before borrow release and outer account-name decoration. No IO error is added on that arm.3002 remains the prior incomplete adapter, and3003/3004 construction/drop ordering remains intact.

Candidate471192bytes SHA25634c54b8e1e625a46fd446bb8e6fa7c7f17afcb1fd7d2ef3719a16f630c98ce91; symbols651808bytes SHA256ab5c3460e6d79a897e13343ca0683841035c7d60efe5085b8e808ab0b48507c7. Complete fresh ledgers contain492original and328candidate windows,33raw/122normalized matched original windows and370unmatched. Raw matches are a subset of normalized matches. Whole-file equality is false;257767common-position bytes differ and359256original excess bytes remain.

All unchanged ordinary12 cases pass:24submissions,12unique transactions,50signature fields,25unique signatures and24effect sets independently verified. These finite cases do not establish all short-header/allocation/formatter failures. No new fixture or probe was used.3002 origin/drop semantics, other error adapters, indirect/data closure and original build provenance remain unresolved.

The cache-free source proof retains its prior seal and excluded cache hashes as provenance. No cache file is included. The build/result23file source seal preceded runtime; final packaging adds evidence and receipts. Run python3 -B verify.py for static rederivation, and the recorded solders Python with ordinary/verify.py --repo /path/to/repository --runtime for saved signature/effect verification. The latter performs no target execution and depends only on the frozen original ordinary proposal and installed runtime. No main/current.json or prior package was changed.
''')
def seal(p):
 assert not any('__pycache__'in f.parts or f.is_symlink()for f in p.rglob('*'))
 m={str(f.relative_to(p)):H(f)for f in sorted(p.rglob('*'))if f.is_file()and f not in[p/'manifest.json',p/'manifest.sha256']};(p/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(p/'manifest.sha256').write_text(H(p/'manifest.json')+'  manifest.json\n');return len(m)
seal(P/'ordinary');print(seal(P),H(P/'manifest.json'))
