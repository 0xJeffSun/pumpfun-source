from pathlib import Path
import json,hashlib,shutil,tarfile,difflib
W=Path(__file__).resolve().parent;R=W.parents[1];S=R/'work/fees-legacy-caller-build/handoff';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def save(n,v):(W/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
assert H(S/'manifest.json')=='56fcdea691bae6dacc004dfe65fe0bd6835a7ed8edea60942e3f5e2e639864dc'
base=J(S/'inputs/baseline-source-sha256.json');new=J(S/'inputs/corrected-source-sha256.json');assert len(base)==len(new)==26
for n,h in base.items():assert H(R/n)==h,n
old={n:(R/n).read_bytes()for n in base};save('main-baseline-source-sha256.json',base);save('scratch-source-sha256.json',new)
for n,h in new.items():
 if n!='programs/pump-fees/src/sharing_update.rs':assert h==base[n]
shutil.copy2(S/'source/programs/pump-fees/src/sharing_update.rs',R/'programs/pump-fees/src/sharing_update.rs')
p=R/'programs/pump-fees/README.md';t=p.read_text()
t=t.replace('current source checkpoint](../../repro/pump_fees/legacy-social-admission-v144/README.md)','current source checkpoint](../../repro/pump_fees/legacy-caller-v144/README.md)')
t=t.replace('773,808 bytes, SHA-256\n`8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b`','826,904 bytes, SHA-256\n`e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`')
t=t.replace('tested legacy-quote/social-admission scratch build.','tested legacy-caller scratch build.')
a=t.index('The fresh inventory preserves all 585 original inferred windows');b=t.index('\nThe two sharing AMM predicates',a)
t=t[:a]+'''The fresh inventory preserves all 585 original inferred windows and 562 candidate
symbol windows. Original status is 448 mapped patterns, 135 unattributed and
two call conflicts. The candidate has 450 consistent normalized call patterns,
110 unmatched windows and two call conflicts; 101 windows are raw-identical.
Against the prior 8ff12 legacy-quote/social-admission checkpoint, eight previously
unattributed original windows and one conflicting window gain mappings. All
original rows, ambiguities and immediate-call residuals remain recorded; these
mechanical window categories are not a historical-function denominator or
semantic completion percentage. Whole-file equality remains false.
''' + t[b:]
t=t.replace('Remaining-account preprocessing and V2 payout reconstruction remain incomplete.','''The legacy caller now applies the recovered remaining-account preprocessing,
including its conditional final-account admission and slice shortening, before
the AMM adapter. It owns the fixed AMM accounts before reserve/owner checks and
uses the generated CPI clients. Legacy authorization preserves its compared-data
and direct revoked-admin conversion. Payout preparation validates each available
account before executable-account filtering, retains the original rescaling and
first-maximum remainder behavior, and serializes a changed sharing list before
calling Pump. Empty payout accounts skip that CPI. Final list validation retains
checked totals, sorted duplicate detection, and the observed error ordering.
The existing 417 sharing-update rows pass again; no new cases were added and V2
source or account contexts were not changed by this recovery.

The generated Pump distribution CPI, both programs' four meta/info helpers,
SharingConfig exit and event match their complete original normalized windows
and 96 immediate target bodies. The AMM generated CPI remains nonidentical and
has an actual outlined owned-account cleanup call. The original helper partition
is not reproduced: the new legacy handler is 24,880 bytes and its source helpers
inline. Full legacy CFG/data closure, diagnostic coordinates and V2 payout
reconstruction remain unresolved. Five accepted social roots and their 176
immediate targets remain normalized-equal to 8ff12; V2 Rust is byte-preserved but
its compiled handler layout changes. No original whole-program equivalence is
claimed. The [prior legacy-quote/social-admission package](../../repro/pump_fees/legacy-social-admission-v144/README.md)
retains the 773,808-byte 8ff12 ELF, source and tested receipts unchanged.''')
t=t.replace('current legacy-quote/social-admission checkpoint above','current legacy-caller checkpoint above')
p.write_text(t)
source={n:H(R/n)for n in base};assert {n for n in base if source[n]!=base[n]}=={'programs/pump-fees/src/sharing_update.rs','programs/pump-fees/README.md'}
assert {n for n in new if source[n]!=new[n]}=={'programs/pump-fees/README.md'}
save('source-sha256.json',source);save('documentation-sha256.json',{'programs/pump-fees/README.md':source['programs/pump-fees/README.md']})
patch=''.join(''.join(difflib.unified_diff(old[n].decode().splitlines(True),(R/n).read_text().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in base if source[n]!=base[n]);(W/'main-promotion.patch').write_text(patch)
for a,b in [('tools-before.json','inputs/tools-before.json'),('dependency-before.json','inputs/dependency-before.json'),('cache-integrity.json','inputs/cache-integrity.json'),('registry-index-sha256.json','inputs/registry-index-sha256.json'),('sbf-sdk-snapshot.tar.gz','sbf-sdk-snapshot.tar.gz'),('build-helper-snapshot.tar.gz','build-helper-snapshot.tar.gz')]:shutil.copy2(S/b,W/a)
tools=J(W/'tools-before.json');save('build-helper-sha256.json',tools['helper_files'])
for n,h in tools['helper_files'].items():assert H(R/n)==h
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
with tarfile.open(W/'source-snapshot.tar.gz','w:gz')as tf:
 for n in source:tf.add(R/n,arcname=n,recursive=False)
save('promotion-preflight.json',{'passed':True,'scratch_manifest_sha256':H(S/'manifest.json'),'main_changed_paths':[n for n in source if source[n]!=base[n]],'source_inputs':26,'main_differs_from_scratch':['programs/pump-fees/README.md'],'compile':'v1.44','strip':'v1.52','locked_dependencies':True,'new_runtime_requested':False})
runner=(R/'work/fees-legacy-social-main/build_once.py').read_text().replace('fees-legacy-social-build','fees-legacy-caller-build')
(W/'build_once.py').write_text(runner)
print('Promotion preflight PASS; exact Rust and finalized README applied, no build run yet')
