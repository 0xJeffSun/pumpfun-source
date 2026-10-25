#!/usr/bin/env python3
"""Offline package integrity and static coverage verifier. No target execution."""
import argparse, hashlib, json, pathlib, sys
sys.dont_write_bytecode=True
from index_source import declarations, contexts, cpi_sites
ROOT=pathlib.Path(__file__).resolve().parent
REV='aa98fb45f3f756d008ccb9940bcfd9a6e986ef77'
def require(ok,msg):
    if not ok: raise ValueError(msg)
def sha(b):return hashlib.sha256(b).hexdigest()
def path(name):
    p=pathlib.PurePosixPath(name)
    require(not p.is_absolute() and '..' not in p.parts and str(p)==name,'unsafe path: '+name)
    return ROOT.joinpath(*p.parts)
def read(name):return path(name).read_bytes()
def load(name):return json.loads(read(name))
def check_rows(expected,actual,fields,label):
    require(len(expected)==len(actual),label+' row count')
    for e,a in zip(expected,actual):
        require(all(e[k]==a[k] for k in fields),label+' span mismatch '+str(e.get('name')))
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--repo',type=pathlib.Path);args=ap.parse_args()
    # Check exact file set before processing supplied metadata paths.
    entries=list(ROOT.rglob('*'))
    require(all(not p.is_symlink() for p in entries),'symlink rejected')
    found={p.relative_to(ROOT).as_posix() for p in entries if p.is_file()}
    manifest=load('manifest.json'); require(manifest['revision']==REV,'revision')
    mapping=manifest['files']; require(found==set(mapping)|{'manifest.json','SEAL.sha256'},'exact file allowlist')
    require(read('SEAL.sha256').decode()==sha(read('manifest.json'))+'  manifest.json\n','manifest seal')
    for n,record in mapping.items():
        b=read(n);require(len(b)==record['size'] and sha(b)==record['sha256'],'file hash: '+n)
    owned=load('ownedmap.json');require(set(owned['files'])==found and len(owned['files'])==len(found),'owned file map')
    require(owned['revision']==REV,'owned revision')
    inputs=load('inputs.json');require(inputs['revision']==REV,'input revision')
    records=inputs['inputs'];require(len(records)==42 and len({x['path'] for x in records})==42,'input inventory')
    source=load('inputs/repro/pump_fees/legacy-social-admission-v144/source-sha256.json')
    require(len(source)==26,'checkpoint denominator')
    require({x['path'] for x in records if x['role']=='accepted-source-input'}==set(source),'checkpoint coverage')
    allf=load('functions.json');allc=load('contexts.json');allp=load('cpi.json');files=load('files.json');groups=load('obligations.json')
    require(len(files)==len(records) and [x['path'] for x in files]==[x['path'] for x in records],'file ledger')
    expected_f=[];expected_c=[];expected_p=[]
    keys=['name','start_byte','end_byte','start_line','end_line','has_body','sha256']
    cpi_keys=['name','start_byte','end_byte','start_line','end_line','sha256','expression']
    for r,fr in zip(records,files):
        require(r['snapshot']=='inputs/'+r['path'],'snapshot mapping')
        b=read(r['snapshot']); require(len(b)==r['size'] and sha(b)==r['sha256'],'input hash')
        require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'Git blob identity')
        require(fr['size']==len(b) and fr['sha256']==sha(b) and fr['lines']==len(b.splitlines()),'file properties')
        if r['path'] in source:require(source[r['path']]==sha(b) and r['checkpoint_match'] is True,'checkpoint mismatch')
        if args.repo:
            # All paths came from the sealed explicit input inventory; never glob repo.
            rel=pathlib.PurePosixPath(r['path']);require(not rel.is_absolute() and '..' not in rel.parts,'unsafe repo path')
            external=args.repo.joinpath(*rel.parts)
            require(not external.is_symlink() and external.read_bytes()==b,'current input mismatch '+r['path'])
        fs=[];cs=[];ps=[]
        if r['path'] in source and r['path'].endswith('.rs'):
            fs=declarations(b);cs=contexts(b)
            if '/src/' in r['path']:ps=cpi_sites(b)
        for e in fs+cs:e.update(path=r['path'],id=f"{r['path']}:{e['start_line']}:{e['name']}")
        for e in ps:e['path']=r['path']
        expected_f+=fs;expected_c+=cs;expected_p+=ps
        require(fr['function_ids']==[e['id'] for e in fs] and fr['context_ids']==[e['id'] for e in cs],'file declaration coverage')
    check_rows(expected_f,allf,keys+['path','id'],'functions')
    check_rows(expected_c,allc,keys+['path','id'],'contexts')
    check_rows(expected_p,allp,cpi_keys+['path'],'CPI')
    require(len(allf)==74 and sum(x['has_body'] for x in allf)==72,'definition totals')
    require(sum('/src/' in x['path'] for x in allf)==64 and len(allc)==30 and len(allp)==43,'scope totals')
    handlers=[r for r in allf if r['path'].endswith('/src/lib.rs') and r['start_line']<297]
    require(len(handlers)==31,'handler coverage')
    for r in allf+allc:
        require(r['group'] in groups and bool(r['review']),'missing review')
        require(set(groups[r['group']])=={'authority','accounts','cpi','arithmetic','serialization','ordering','unresolved'},'dimension coverage')
    for c in allc:
        b=read('inputs/'+c['path']);require(c['declaration']==b[c['start_byte']:c['end_byte']].decode(),'context text')
    for r in allp:
        expected=[x['id'] for x in allf if x['path']==r['path'] and x['start_byte']<=r['start_byte']<x['end_byte']]
        require(r['function_ids']==expected and bool(expected),'CPI caller binding')
    require([x['id'] for x in load('observations.json')]==['F1','F2','F3','F4','F5'],'retained observations')
    # Independent width arithmetic only; no Rust program, VM or fixture executes.
    require(8+1+1+4+20+1+8+8+8+120==179,'Social width')
    require(8+1+1+4*32+2*8+64==218,'Donation width')
    require(8+32+5*8+128==208,'Buyback width')
    require(8+1+32+1+32+8+256==338,'Global width')
    require(8+1+1+1+32+32+1+4+10*(32+2)==420,'Sharing width')
    require([x+8 for x in (2504,4065,4089)]==[2512,4073,4097],'decoder threshold arithmetic')
    print(json.dumps({'status':'PASS','revision':REV,'manifest_sha256':sha(read('manifest.json')),'inputs':42,'checkpoint_source_matches':26,'in_program_definitions':64,'handlers':31,'contexts':30,'standalone_definitions':8,'external_declarations':2,'cpi_source_sites':43,'current_input_check':bool(args.repo),'semantic_security_certificate':False},sort_keys=True))
if __name__=='__main__':
    try:main()
    except Exception as e:
        print('FAIL: '+str(e),file=sys.stderr);sys.exit(1)
