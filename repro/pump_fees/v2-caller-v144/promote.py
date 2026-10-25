from pathlib import Path
import json,hashlib,shutil,tarfile,difflib
R=Path.cwd();W=R/'work/fees-v2-caller-main';S=R/'work/fees-v2-caller-build/handoff'
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
assert J(R/'work/fees-v2-caller-build/verification.json')['status']=='PASS'
assert J(R/'work/fees-v2-caller-build/independent-review-acceptance.json')['accepted_for_bounded_integration']
assert not W.exists();W.mkdir()
def save(n,v):(W/n).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
base=J(S/'inputs/baseline-source-sha256.json');new=J(S/'inputs/corrected-source-sha256.json');assert len(base)==len(new)==26
for n,h in base.items():assert H(R/n)==h,n
old={n:(R/n).read_bytes()for n in base};save('main-baseline-source-sha256.json',base);save('scratch-source-sha256.json',new)
changed={'programs/pump-fees/src/sharing_update.rs','programs/pump-fees/idls/pump.json'}
assert {n for n in base if base[n]!=new[n]}==changed
for n in changed:shutil.copyfile(S/'source'/n,R/n)
p=R/'programs/pump-fees/README.md';text=p.read_text()
def replace(before,after):
 global text
 assert before in text,before
 text=text.replace(before,after)
replace('current source checkpoint](../../repro/pump_fees/legacy-value-v144/README.md)','current source checkpoint](../../repro/pump_fees/v2-caller-v144/README.md)')
replace('828,184 bytes, SHA-256\n`c177acab23511d3a77010717bc42b46f9e57e261fae101ac00dfff748f0d8237`','852,248 bytes, SHA-256\n`b2d02994dbc29680273f0a3589d8d9fd2763445505483c1acbd4c9f09e1502fb`')
replace('tested legacy-value scratch build.','tested V2 caller scratch build.')
replace('fresh inventory preserves all 585 original inferred windows and 562 candidate\nsymbol windows. Original status is 448 mapped patterns, 135 unattributed and\ntwo call conflicts. The candidate has 450 consistent normalized call patterns,\n110 unmatched windows and two call conflicts; 101 windows are raw-identical.','fresh inventory preserves all 585 original inferred windows and 575 candidate\nsymbol windows. Original status is 453 mapped patterns, 130 unattributed and\ntwo call conflicts. The candidate has 455 consistent normalized call patterns,\n118 unmatched windows and two call conflicts; 101 windows are raw-identical.')
replace('The existing 417 sharing-update rows pass again; no new cases were added and V2\nsource or account contexts were not changed by this recovery.','The existing 417 sharing-update rows pass again. That legacy recovery preserved\nV2 source; the current V2 caller recovery below changes its body while retaining\nboth account contexts. No new cases are added.')
replace('the current legacy handler is 26,128 bytes and its source helpers\ninline. Full legacy CFG/data closure, diagnostic coordinates and V2 payout\nreconstruction remain unresolved. Five accepted social roots and their 176\nimmediate targets remain normalized-equal to 8ff12; V2 Rust is byte-preserved but\nits compiled handler layout changes.','the current legacy handler is 15,384 bytes and some source helpers\nare outlined. Full legacy/V2 CFG and data closure and diagnostic coordinates\nremain unresolved. Five accepted social roots and their 176 immediate targets\nretain their prior normalized matches. Existing account declarations remain\nunchanged while the V2 handler body is reconstructed.')
replace('The legacy payout mismatch now uses formatted compared values through','At the preceding legacy-value checkpoint, the payout mismatch was changed to\nformatted compared values through')
replace('order are preserved. Four inlined formatting call sites reach the original\'s\nraw-identical 40-byte Pubkey formatter. All 17,461 existing comparisons and the\nseparate ten-step sequence pass again. The 585/562 function inventory retains\nthe same 448/135/2 original dispositions; complete helper/handler CFG identity,','order were preserved. That checkpoint had four inlined formatting call sites\nto the original\'s raw-identical 40-byte Pubkey formatter, 17,461 passing\ncomparisons and a passing ten-step sequence. Its 585/562 inventory had\n448/135/2 original dispositions; complete helper/handler CFG identity,')
text+='''\n## V2 caller reconstruction

The current V2 body preserves the original ordering of version/authorization,
quote admission, remaining-account preprocessing and AMM V2 CPI. It selects
zero/nonzero stored-quote payout preparation, filters executable shareholders,
rescales retained weights, serializes changed sharing state before Pump, and
skips Pump when the prepared account list is empty. The Pump V2 call passes
initialize_ata=true; final shareholder validation and event emission follow.
The retained Pump V2 IDL entry supplies its generated client. No account context,
dependency, compiler, runtime assertion or fixture changed.

Five previously unattributed original windows now have complete normalized
matches: the called formatted-value helper, Pump V2 CPI, shared V2 info builder
and both V2 meta builders. Both payout helpers call the matched formatted-value
function. Matching CPI/meta/info roots also retain matching immediate targets.
These results do not establish full caller/parser/cleanup/data equivalence or
historical source identity. All 17,461 existing comparisons, including the
417 sharing rows, and the ten-step sequence pass for the new executable.
'''
p.write_text(text)
source={n:H(R/n)for n in base};assert {n for n in base if source[n]!=base[n]}==changed|{'programs/pump-fees/README.md'}
assert {n for n in new if source[n]!=new[n]}=={'programs/pump-fees/README.md'}
save('source-sha256.json',source);save('documentation-sha256.json',{'programs/pump-fees/README.md':source['programs/pump-fees/README.md']})
(W/'main-promotion.patch').write_text(''.join(''.join(difflib.unified_diff(old[n].decode().splitlines(True),(R/n).read_text().splitlines(True),fromfile='a/'+n,tofile='b/'+n))for n in base if source[n]!=base[n]))
for a,b in [('tools-before.json','inputs/tools-before.json'),('dependency-before.json','inputs/dependency-before.json'),('cache-integrity.json','inputs/cache-integrity.json'),('registry-index-sha256.json','inputs/registry-index-sha256.json'),('sbf-sdk-snapshot.tar.gz','sbf-sdk-snapshot.tar.gz'),('build-helper-snapshot.tar.gz','build-helper-snapshot.tar.gz')]:shutil.copyfile(S/b,W/a)
save('build-helper-sha256.json',J(W/'tools-before.json')['helper_files'])
with tarfile.open(W/'source-snapshot.tar.gz','w:gz')as t:
 for n in source:t.add(R/n,arcname=n,recursive=False)
save('promotion-preflight.json',{'passed':True,'scratch_manifest_sha256':H(S/'manifest.json'),'main_changed_paths':[n for n in source if source[n]!=base[n]],'source_inputs':26,'main_differs_from_scratch':['programs/pump-fees/README.md'],'compile':'v1.44','strip':'v1.52','locked_dependencies':True,'new_runtime_requested':False})
shutil.copyfile(Path(__file__),W/'promote.py')
for name in ['build_once.py','check_readme_claims.py']:(W/name).write_text((R/'work/fees-legacy-value-main'/name).read_text().replace('fees-legacy-value-build','fees-v2-caller-build'))
print('Promoted two reviewed source inputs and README; clean main compilation pending.')
