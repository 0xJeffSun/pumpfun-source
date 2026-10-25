from pathlib import Path
import hashlib,json,shutil
R=Path.cwd();W=R/'work/relay-idl-deserialize-build';D=W/'public';S=R/'repro/donation-relay/source-build-09-idl-owned';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
assert not D.exists();shutil.copytree(W/'result',D,ignore=shutil.ignore_patterns('__pycache__'))
(D/'manifest.json').rename(D/'pre-runtime-manifest.json');(D/'manifest.sha256').rename(D/'pre-runtime-manifest.sha256');(D/'verify.py').rename(D/'runtime-static-verify.py')
s=(S/'verify.py').read_text().replace("['src/error_report.rs','src/generated_exit.rs','src/idl.rs']","['src/exit_error.rs','src/idl.rs']").replace('source-build-08-whitelist-writer','source-build-09-idl-owned');(D/'verify.py').write_text(s)
shutil.copytree(W/'proposal',D/'proposal',ignore=shutil.ignore_patterns('__pycache__'));shutil.copytree(W/'ordinary',D/'ordinary',ignore=shutil.ignore_patterns('__pycache__'))
s=(D/'ordinary/verify.py').read_text().replace("build=P.parent/'result'",'build=P.parent').replace("build/'manifest.json'","build/'pre-runtime-manifest.json'");(D/'ordinary/verify.py').write_text(s)
for n in ['relay_build_once.py','resolved-source-archive-equality.json','build10-adaptation.json']:shutil.copyfile(W/'launcher'/n,D/'launcher'/n)
shutil.copytree(W/'launcher/tool-witness',D/'launcher/tool-witness')
for n in ['preflight.stdout','preflight.stderr','launch.stdout','launch.stderr','analysis.stdout','analysis-02.stdout','analysis-02.stderr','review.stdout','review.stderr','review-03.stdout','review-03.stderr','static-initial-failures.json','static-verify.stdout','static-verify.stderr','static-verify-02.stdout','static-verify-02.stderr','ordinary.stdout','ordinary.stderr','saved-verification.json','saved-verification.stderr','package.py']:
 (D/'control').mkdir(exist_ok=True);shutil.copyfile(W/n,D/'control'/n)
(D/'README.md').write_text('''# Relay owned3003 header deserialization

One pinned v1.44 compile with the existing v1.52 strip phase passed. Only src/idl.rs and src/exit_error.rs differ from Relay09. Candidate470560bytes SHA2565af54232ebb9e8fef524f6f6984d6dbd4567874bcf4a6e6927501c3bca66e549; symbols651072bytes SHA2560a51158ee4f11aaceb3c6fdb085ec225aa400488dc0c30b8f1b81ea642752917.

The admitted decoder now produces the owned3003 error, preserving I/O construction, owned-error construction, I/O destruction, then account-borrow release. Shared3004 factory semantics remain present. The complete original/candidate function/call/data ledgers and all residual byte intervals are retained:492original/328candidate windows,33raw/122normalized original matches,370unmatched. Whole original identity remains false.

Only the unchanged ordinary12 ran: five donation and seven IDL operations. All passed; saved verification rechecked24submissions,12unique transactions,50encoded signature fields,25unique signatures and24effect sets. No new short-header, source-origin or fixed-authority probe was introduced. Existing finite cases do not cover every malformed-header or allocation/formatter failure.3001/3002, other validation/borrow adapters and indirect-vtable provenance remain explicit gaps.

The original pre-runtime static seal is retained; later packaging only adds evidence and recorded verification. Initial static assembly errors (missing retained window/control copies and stale prior baseline path) are preserved. There was one target build, no source repair/retry, and one unchanged runtime run. Canonical source integration remains checkpoint-based; no current.json or earlier immutable package was edited.

Run python3 -B verify.py for complete static integrity/rederivation. Run the recorded solders Python with ordinary/verify.py --repo /path/to/repository --runtime to verify saved signatures/effects without target execution. The only repository dependency is the immutable original ordinary proposal. No build/runtime caches, keypairs or telemetry are included.
''')
def seal(p):
 m={str(f.relative_to(p)):H(f)for f in sorted(p.rglob('*'))if f.is_file()and f not in[p/'manifest.json',p/'manifest.sha256']};(p/'manifest.json').write_text(json.dumps(m,indent=2)+'\n');(p/'manifest.sha256').write_text(H(p/'manifest.json')+'  manifest.json\n');return len(m)
seal(D/'ordinary');count=seal(D);print(json.dumps({'package':str(D),'files':count,'manifest_sha256':H(D/'manifest.json')}))
