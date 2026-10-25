#!/usr/bin/env python3
"""Integrity and source-coverage verifier. No build, target execution or network."""
import argparse, hashlib, json, pathlib, sys
from index_source import index, sha
ROOT=pathlib.Path(__file__).resolve().parent
REV='aa98fb45f3f756d008ccb9940bcfd9a6e986ef77'
PROGRAM_FILES={
'Cargo.lock','Cargo.toml','README.md','src/boost.rs','src/boost_burn.rs','src/cashback.rs','src/collect.rs','src/create.rs','src/creator_reassignment.rs','src/extend.rs','src/incentives.rs','src/instructions/admin/create_config.rs','src/instructions/admin/mod.rs','src/instructions/mod.rs','src/legacy_buy.rs','src/legacy_sell.rs','src/lib.rs','src/multi_hop.rs','src/state.rs','src/state/global_config.rs','src/sweep.rs','src/trade.rs','src/transfer_creator.rs'}
EVIDENCE_FILES={
'docs/COMPLETION.md','audit/AUDIT.md','repro/pump_amm/destination-rent-v144/README.md','repro/pump_amm/destination-rent-v144/REPORT.md','repro/pump_amm/destination-rent-v144/source-sha256.json','repro/parallel-work/2026-10-25/current-audit-results/README.md','repro/parallel-work/2026-10-25/current-audit-results/amm_current_source_audit/REPORT.md'}
INPUTS={'programs/pump-amm/'+p for p in PROGRAM_FILES}|EVIDENCE_FILES
TOP={'REPORT.md','HANDOFF.md','COVERAGE.md','coverage.json','inputs.json','index_source.py','verify.py','ownedmap.json','manifest.json','manifest.sha256'}
EXPECTED=TOP|{'inputs/'+p for p in INPUTS}
def check(ok,msg):
    if not ok:raise ValueError(msg)
def read_json(path):return json.loads((ROOT/path).read_text())
def safe(path):
    p=pathlib.PurePosixPath(path)
    check(not p.is_absolute() and '..' not in p.parts and str(p)==path and path not in ('','.'),'unsafe path')
    return ROOT.joinpath(*p.parts)
def run(repo=None):
    entries=list(ROOT.rglob('*'))
    check(not any(p.is_symlink() for p in entries),'symlink payload')
    actual={p.relative_to(ROOT).as_posix() for p in entries if p.is_file()}
    check(actual==EXPECTED,'publication allowlist mismatch')
    mb=(ROOT/'manifest.json').read_bytes()
    check((ROOT/'manifest.sha256').read_text()==sha(mb)+'  manifest.json\n','manifest seal mismatch')
    manifest=json.loads(mb)
    check(manifest['revision']==REV,'wrong manifest revision')
    check(set(manifest['files'])==EXPECTED-{'manifest.json','manifest.sha256'},'manifest entries mismatch')
    for path,meta in manifest['files'].items():
        b=safe(path).read_bytes()
        check(meta=={'size':len(b),'sha256':sha(b)},'payload mismatch: '+path)
    owned=read_json('ownedmap.json')
    check(owned['owner']=='pass04_audit_amm' and set(owned['files'])==EXPECTED,'ownedmap mismatch')
    im=read_json('inputs.json');cv=read_json('coverage.json')
    check(im['revision']==cv['revision']==REV,'input/coverage revision mismatch')
    check(len(im['inputs'])==30 and {r['repository_path'] for r in im['inputs']}==INPUTS,'input inventory mismatch')
    for row in im['inputs']:
        check(row['path']=='inputs/'+row['repository_path'] and row['revision']==REV,'input metadata mismatch')
        b=safe(row['path']).read_bytes()
        check(row['size']==len(b) and row['sha256']==sha(b),'input hash mismatch')
        check(row['git_blob_sha1']==hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest(),'git blob mismatch')
        check(row['working_copy_equal_at_capture'] is True,'capture source drift')
        if repo:
            rp=repo/row['repository_path']
            check(rp.is_file() and not rp.is_symlink(),'repository file missing/symlink: '+row['repository_path'])
            check(sha(rp.read_bytes())==row['sha256'],'repository drift: '+row['repository_path'])
    source_map=read_json('inputs/repro/pump_amm/destination-rent-v144/source-sha256.json')
    check(set(source_map)=={'programs/pump-amm/'+p for p in PROGRAM_FILES-{'README.md'}},'compiled-input inventory mismatch')
    for p,h in source_map.items():check(sha(safe('inputs/'+p).read_bytes())==h,'compiled input drift: '+p)
    fields=('name','start_byte','end_byte','start_line','end_line','sha256')
    expected_f=[];expected_c=[]
    check(len(cv['files'])==23 and {r['path'] for r in cv['files']}=={'inputs/programs/pump-amm/'+p for p in PROGRAM_FILES},'file coverage mismatch')
    for row in cv['files']:
        b=safe(row['path']).read_bytes()
        f,c=index(b) if row['path'].endswith('.rs') else ([],[])
        check(row['sha256']==sha(b) and row['size']==len(b),'coverage file hash mismatch')
        check(row['explicit_functions']==len(f) and row['contexts']==len(c),'file counts mismatch')
        check(row['unchanged_from_prior']==(row['sha256']==row['prior_sha256']),'prior file disposition mismatch')
        expected_f += [(row['path'],tuple(x[k] for k in fields)) for x in f]
        expected_c += [(row['path'],tuple(x[k] for k in fields)) for x in c]
    for label,expected in [('functions',expected_f),('contexts',expected_c)]:
        rows=cv[label]
        check([(r['path'],tuple(r[k] for k in fields)) for r in rows]==expected,label+' exact span coverage mismatch')
        check(len({r['id'] for r in rows})==len(rows),label+' duplicate id')
        for r in rows:
            check(bool(r['review']) and bool(r['status']),'missing review disposition')
            prior_key='prior_body_sha256' if label=='functions' else 'prior_span_sha256'
            check(r['unchanged_from_prior']==(r['sha256']==r[prior_key]),'prior span disposition mismatch')
    check(len(cv['functions'])==117 and len(cv['contexts'])==30,'declaration totals mismatch')
    check([r['id'] for r in cv['functions'] if not r['unchanged_from_prior']]==['transfer_creator.rs::unwrap_and_move@55'],'changed functions mismatch')
    check(all(r['unchanged_from_prior'] for r in cv['contexts']),'context changed')
    check(len(cv['exclusions'])==10 and all(r['status']=='excluded-metadata-only' and r['body_read'] is False and r['body_hash'] is None for r in cv['exclusions']),'excluded-body metadata mismatch')
    check(len([r for r in cv['functions'] if r['path'].endswith('/lib.rs') and r['end_line']<=261])==38,'instruction total mismatch')
    return {'result':'PASS','revision':REV,'payload_files':len(actual),'input_files':30,'compiled_inputs':len(source_map),'program_files':23,'explicit_functions':117,'contexts':30,'instructions':38,'repo_binding':bool(repo),'runtime_executed':False,'build_executed':False,'proves_security':False}
if __name__=='__main__':
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--repo',type=pathlib.Path);a=ap.parse_args()
    try:print(json.dumps(run(a.repo),sort_keys=True))
    except (ValueError,KeyError,IndexError,AssertionError,OSError,TypeError) as e:
        print('FAIL: '+str(e),file=sys.stderr);sys.exit(1)
