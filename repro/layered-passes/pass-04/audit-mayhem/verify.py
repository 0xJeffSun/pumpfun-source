#!/usr/bin/env python3
"""Read-only, standard-library verifier. Does not compile or execute target code."""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys
sys.dont_write_bytecode = True
from inventory import inventory, cpi_contract, sha, span

REV = 'aa98fb45f3f756d008ccb9940bcfd9a6e986ef77'
PRIOR = '517d77db988d8c63b6cf476f0be138c5a4f3128a'
BASE = Path(__file__).resolve().parent

def check(test, message):
    if not test: raise ValueError(message)

def readj(p): return json.loads((BASE/p).read_text())
def blob(b): return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()

def safe(p):
    q=PurePosixPath(p)
    check(not q.is_absolute() and '..' not in q.parts and str(q)==p, 'unsafe path '+p)
    check(not any(x in p for x in ['private-security-review','security-followup','audit_coverage']), 'forbidden path '+p)
    return BASE/p

def fields_for(d, raw):
    body=raw[d['byte_start']:d['byte_end']].decode('latin1'); previous=0; fields=[]
    for m in re.finditer(r'\bpub\s+(\w+)\s*:\s*([^,\n]+)',body):
        fields.append({'name':m[1], 'type':m[2].strip(),
          'explicit_account_attributes':re.findall(r'#\[account\((.*?)\)\]',body[previous:m.start()],re.S),
          **span(raw,d['byte_start']+m.start(),d['byte_start']+m.end())})
        previous=m.end()
    return fields

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo',type=Path,help='optional local frozen Git binding; no fetch/network')
    parser.add_argument('--expected-manifest-sha256',help='external trust anchor from seal.json')
    args=parser.parse_args()
    manifest=readj('manifest.json'); files=manifest['files']
    if args.expected_manifest_sha256:
        check(sha((BASE/'manifest.json').read_bytes())==args.expected_manifest_sha256,'external seal mismatch')
    actual=set()
    for p in BASE.rglob('*'):
        check(not p.is_symlink(),'symlink rejected '+str(p))
        if p.is_file(): actual.add(p.relative_to(BASE).as_posix())
    check(actual==set(files)|{'manifest.json'},'exact file-set mismatch')
    for p,record in files.items():
        data=safe(p).read_bytes()
        check(len(data)==record['bytes'] and sha(data)==record['sha256'],'file digest mismatch '+p)
    allow=readj('allowlist.json')
    check(set(allow['files'])==actual and len(allow['files'])==len(actual),'allowlist mismatch')
    owned=readj('ownedmap.json')
    check(set(owned['outputs'])==actual,'ownedmap file-set mismatch')
    binding=readj('input-binding.json'); check(binding['revision']==REV,'revision mismatch')
    source={}
    for row in binding['inputs']:
        data=safe(row['publication_path']).read_bytes()
        check(sha(data)==row['copied_sha256'] and len(data)==row['copied_bytes'],'copied input mismatch')
        check(row['revision']==REV,'input revision drift')
        if row['lines'] is None:
            check(sha(data)==row['full_sha256'] and len(data)==row['full_bytes'] and blob(data)==row['git_blob'],'full input identity mismatch')
        if row['repository_path'].startswith('programs/mayhem/'):
            check(row['lines'] is None,'partial candidate source unexpected')
            source[row['repository_path']]=data
        if args.repo:
            original=subprocess.check_output(['git','-C',str(args.repo),'show',REV+':'+row['repository_path']])
            check(sha(original)==row['full_sha256'] and len(original)==row['full_bytes'] and blob(original)==row['git_blob'],'frozen Git input mismatch')
            selected=original if row['lines'] is None else b''.join(original.splitlines(keepends=True)[row['lines'][0]-1:row['lines'][1]])
            check(selected==data,'Git selected-span mismatch')
    check(len(source)==15,'source file count')
    for r in binding['inputs']:
        entry=owned['outputs'][r['publication_path']]
        check(entry['repository_path']==r['repository_path'] and entry['revision']==REV and entry['admitted_lines']==(r['lines'] or 'entire public file'),'owned input mapping mismatch')
    build=readj('inputs/repro/mayhem/twentyfour/build-comparison.json')
    check(len(binding['accepted_build_binding'])==14,'build binding count')
    check(set(build['source_sha256'])=={r['path'] for r in binding['accepted_build_binding']},'build input universe')
    for row in binding['accepted_build_binding']:
        p=row['path']; data=source[p]
        check(sha(data)==build['source_sha256'][p]==row['accepted_build_sha256']==row['current_sha256']==row['prior_sha256'],'build/prior SHA mismatch')
        check(blob(data)==row['prior_git_blob'] and row['prior_revision']==PRIOR and row['equal_to_prior_review_source'] is True,'prior source binding mismatch')
        if args.repo:
            check(subprocess.check_output(['git','-C',str(args.repo),'show',PRIOR+':'+p])==data,'prior Git source drift')
    check(binding['binary_claims']['full_byte_equality'] is False,'false whole-original equality assertion')
    inv=readj('inventory.json'); functions=[]; declarations=[]; contracts=[]
    for f in inv['files']:
        p=f['path']; data=source[p]
        check(f['sha256']==sha(data) and f['bytes']==len(data) and f['lines']==len(data.splitlines()),'source row mismatch')
        generated=inventory(p,data) if p.endswith('.rs') else {'functions':[],'declarations':[]}
        functions+=generated['functions']; declarations+=generated['declarations']
        check(f['explicit_function_count']==len(generated['functions']) and f['declaration_count']==len(generated['declarations']),'file coverage count mismatch')
        c=cpi_contract(p,data) if p.endswith('.rs') else None
        if c: contracts.append(c)
    check(set(source)=={f['path'] for f in inv['files']},'file coverage universe mismatch')
    check(functions==inv['functions'] and declarations==inv['declarations'],'regenerated inventory differs')
    check(len(functions)==61 and len(declarations)==38,'declaration totals')
    for r in binding['inputs']:
        expected=[f['id'] for f in functions if f['path']==r['repository_path']]
        check(owned['outputs'][r['publication_path']]['source_function_ids']==expected,'owned function mapping mismatch')
    check(contracts==readj('cpi-contracts.json') and len(contracts)==6,'CPI vectors differ')
    coverage=readj('coverage.json')
    check(coverage['revision']==REV and coverage['confirmed_new_defects']==0 and coverage['patches']==[],'review scope changed')
    check([f['id'] for f in functions]==[r['id'] for r in coverage['functions']],'missing/duplicate function review')
    for f,r in zip(functions,coverage['functions']):
        check(all(r[k]==v for k,v in f.items()),'review source-span drift')
        check(r['conclusion'] and r['unresolved'],'empty function conclusion')
        check(set(coverage['assessment_groups'][r['assessment_group']])==set(coverage['facets']),'review dimensions missing')
        if r['delegates_to']: check(r['delegates_to'] in {g['id'] for g in functions},'missing delegated function')
    check([d['id'] for d in declarations]==[d['id'] for d in coverage['declarations']],'missing declaration review')
    for d,r in zip(declarations,coverage['declarations']):
        check(all(r[k]==v for k,v in d.items()) and r['review'],'declaration review binding')
    contexts=coverage['contexts']; check(len(contexts)==15,'context count')
    expected_contexts=[]
    for d in declarations:
        raw=source[d['path']]; prefix=raw[:d['byte_start']].decode('latin1')
        # Only contiguous attributes/comments after the last Accounts derive, with no earlier struct body.
        start=prefix.rfind('#[derive(Accounts)]')
        if start>=0 and not re.search(r'\b(?:pub\s+)?struct\b',prefix[start:]): expected_contexts.append(d['name'])
    check(expected_contexts==[c['name'] for c in contexts],'Accounts declaration universe mismatch')
    for c in contexts:
        d=next(d for d in declarations if d['name']==c['name'] and d['path']==c['path'])
        raw=source[d['path']]; start=raw[:d['byte_start']].rfind(b'#[derive(Accounts)]')
        check(all(c[k]==v for k,v in span(raw,start,d['byte_end']).items()),'context span mismatch')
        check(c['fields']==fields_for(d,raw),'context field or attribute coverage mismatch')
    check(sum(len(c['fields']) for c in contexts)==231,'field count mismatch')
    check(inv['excluded']==coverage['excluded']==[{'name':'mayhem.initialize_mayhem_state','status':'excluded, absent from admitted candidate source','body_reviewed':False,'metadata_only':True}],'exclusion changed')
    check(not any(f['name']=='initialize_mayhem_state' for f in functions),'excluded body admitted')
    check(len(coverage['observations'])==6 and len(coverage['obligations'])==7,'unresolved rows lost')
    check(all(r['status']=='open' for r in coverage['obligations']),'obligation silently closed')
    print(json.dumps({'status':'PASS','revision':REV,'sealed_files_including_manifest':len(actual),
      'source_files':15,'build_inputs_equal_prior_and_accepted':14,'explicit_functions':61,'account_contexts':15,'context_fields':231,
      'declarations_including_contexts':38,'candidate_cpi_vectors':6,'unresolved_observations':6,'open_obligations':7,
      'frozen_git_rebound':bool(args.repo),'target_execution':False,'security_signoff':False},sort_keys=True))

if __name__=='__main__':
    try: main()
    except Exception as error:
        print('FAIL: '+str(error),file=sys.stderr); sys.exit(1)
