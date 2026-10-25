from pathlib import Path
import json,hashlib,shutil,tarfile,difflib
R=Path.cwd();W=R/'work/fees-legacy-value-main';S=R/'work/fees-legacy-value-build/handoff';H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert J(R/'work/fees-legacy-value-build/verification.json')['status']=='PASS'
assert not W.exists();W.mkdir()
def save(n,v):(W/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
base=J(S/'inputs/baseline-source-sha256.json');new=J(S/'inputs/corrected-source-sha256.json');assert len(base)==len(new)==26
for n,h in base.items():assert H(R/n)==h,n
old={n:(R/n).read_bytes()for n in base};save('main-baseline-source-sha256.json',base);save('scratch-source-sha256.json',new)
assert {n for n in base if base[n]!=new[n]}=={'programs/pump-fees/src/sharing_update.rs'}
shutil.copyfile(S/'source/programs/pump-fees/src/sharing_update.rs',R/'programs/pump-fees/src/sharing_update.rs')
p=R/'programs/pump-fees/README.md';text=p.read_text().replace('current source checkpoint](../../repro/pump_fees/legacy-caller-v144/README.md)','current source checkpoint](../../repro/pump_fees/legacy-value-v144/README.md)')
assert text!=p.read_text()
text=text.replace('826,904 bytes, SHA-256\n`e5c811e2a66b540f25b44d9a55dd7b890e7ff01a0074dfc0d0dfc25237c391fe`','828,184 bytes, SHA-256\n`c177acab23511d3a77010717bc42b46f9e57e261fae101ac00dfff748f0d8237`')
text=text.replace('tested legacy-caller scratch build.','tested legacy-value scratch build.').replace('new legacy handler is 24,880 bytes','current legacy handler is 26,128 bytes')
text+='''\nThe legacy payout mismatch now uses formatted compared values through
`Error::with_values`, matching the original owned-string payload contract.
Availability, key equality, error code, filtering, payout and authorization
order are preserved. Four inlined formatting call sites reach the original's
raw-identical 40-byte Pubkey formatter. All 17,461 existing comparisons and the
separate ten-step sequence pass again. The 585/562 function inventory retains
the same 448/135/2 original dispositions; complete helper/handler CFG identity,
source coordinates and transitive data remain unresolved. No new cases or
whole-original byte equality are claimed. The preceding legacy-caller package
retains its original executable and evidence.\n'''
p.write_text(text);source={n:H(R/n)for n in base};assert {n for n in base if source[n]!=base[n]}=={'programs/pump-fees/src/sharing_update.rs','programs/pump-fees/README.md'}
assert {n for n in new if source[n]!=new[n]}=={'programs/pump-fees/README.md'}
save('source-sha256.json',source);save('documentation-sha256.json',{'programs/pump-fees/README.md':source['programs/pump-fees/README.md']})
(W/'main-promotion.patch').write_text(''.join(''.join(difflib.unified_diff(old[n].decode().splitlines(True),(R/n).read_text().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in base if source[n]!=base[n]))
for a,b in [('tools-before.json','inputs/tools-before.json'),('dependency-before.json','inputs/dependency-before.json'),('cache-integrity.json','inputs/cache-integrity.json'),('registry-index-sha256.json','inputs/registry-index-sha256.json'),('sbf-sdk-snapshot.tar.gz','sbf-sdk-snapshot.tar.gz'),('build-helper-snapshot.tar.gz','build-helper-snapshot.tar.gz')]:shutil.copyfile(S/b,W/a)
save('build-helper-sha256.json',J(W/'tools-before.json')['helper_files'])
with tarfile.open(W/'source-snapshot.tar.gz','w:gz')as t:
 for n in source:t.add(R/n,arcname=n,recursive=False)
save('promotion-preflight.json',{'passed':True,'scratch_manifest_sha256':H(S/'manifest.json'),'main_changed_paths':[n for n in source if source[n]!=base[n]],'source_inputs':26,'main_differs_from_scratch':['programs/pump-fees/README.md'],'compile':'v1.44','strip':'v1.52','locked_dependencies':True,'new_runtime_requested':False})
shutil.copyfile(Path(__file__),W/'promote.py')
for name in ['build_once.py','check_readme_claims.py']:(W/name).write_text((R/'work/fees-legacy-caller-main'/name).read_text().replace('fees-legacy-caller-build','fees-legacy-value-build'))
print('Promoted one source check and README; clean main compilation pending.')
