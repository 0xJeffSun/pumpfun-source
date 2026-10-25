#!/usr/bin/env python3
"""Offline evidence-integrity checks only. Python 3.11+, no build or source execution."""
from pathlib import Path, PurePosixPath
import hashlib, json, tarfile, tomllib
ROOT=Path(__file__).resolve().parent

def read(p):
    q=PurePosixPath(p)
    assert not q.is_absolute() and '..' not in q.parts,p
    target=ROOT/p
    assert target.is_file() and not target.is_symlink(),p
    return target.read_bytes()
def sha(b):return hashlib.sha256(b).hexdigest()
def main():
    manifest={}
    for line in (ROOT/'SHA256SUMS').read_text().splitlines():
        digest,p=line.split('  ',1)
        assert p not in manifest and p!='SHA256SUMS'
        assert sha(read(p))==digest,p
        manifest[p]=digest
    actual={str(p.relative_to(ROOT)) for p in ROOT.rglob('*') if p.is_file()}
    assert actual==set(manifest)|{'SHA256SUMS'},(actual-set(manifest),set(manifest)-actual)
    records=json.loads(read('provenance.json')); rec={r['path']:r for r in records}
    assert len(rec)==len(records)
    lock=tomllib.loads(read('evidence/programs/mayhem/Cargo.lock').decode())
    pkgs={(p['name'],p['version']):p for p in lock['package']}
    archives={}
    for r in records:
        b=read(r['path']);assert sha(b)==r['sha256'] and len(b)==r['bytes'],r['path']
        if r.get('git_blob'):
            assert hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],r['path']
            assert r['checkpoint']=='517d77db988d8c63b6cf476f0be138c5a4f3128a'
        if 'lock_checksum' in r:
            assert sha(b)==r['lock_checksum']==pkgs[(r['crate'],r['version'])]['checksum']
            # Open only after exact checksum verification.
            archives[r['path']]=tarfile.open(ROOT/r['path'],mode='r:gz')
    for r in records:
        if 'member' in r:
            assert archives[r['archive']].extractfile(r['member']).read()==read(r['path']),r['path']
    for a in archives.values():a.close()
    result=json.loads(read('result.json')); spans=0
    def walk(v):
        nonlocal spans
        if isinstance(v,dict):
            if 'path' in v and 'byte_start' in v:
                b=read(v['path']);ls=b.splitlines(True);a=v['line_start'];z=v['line_end']
                assert 1<=a<=z<=len(ls)
                lo=sum(map(len,ls[:a-1]));hi=sum(map(len,ls[:z]));assert (lo,hi)==(v['byte_start'],v['byte_end_exclusive'])
                assert sha(b[lo:hi])==v['sha256'];assert v['path'] in rec;spans+=1
            for x in v.values():walk(x)
        elif isinstance(v,list):
            for x in v:walk(x)
    walk(result)
    old=json.loads(read('evidence/prior/result.json'))
    assert {h['handler']:h['context'] for h in result['handlers']}=={h['handler']:h['context'] for h in old['handlers']}
    assert {c['name']:[f['name'] for f in c['fields']] for c in result['contexts']}=={c['name']:[f['name'] for f in c['fields']] for c in old['contexts']}
    assert result['counts']=={'archives':11,'contexts':15,'fields':231,'handlers':24}
    assert len(archives)==11 and len(result['contexts'])==15 and len(result['handlers'])==24
    assert sum(len(c['fields']) for c in result['contexts'])==231
    for c in result['contexts']:
        assert c['duplicate_candidates']==[f['name'] for f in c['fields'] if f['duplicate_candidate']]
        for f in c['fields']:
            assert all(k in result['contracts'] for k in f['contracts'])
            s=f['source'];chunk=read(s['path'])[s['byte_start']:s['byte_end_exclusive']].decode()
            import re
            assert re.search(r'pub\s+'+re.escape(f['name'])+r'\s*:',chunk)
    previous={r['path']:r for r in json.loads(read('evidence/prior/provenance.json'))['files']}
    for r in records:
        if r.get('git_blob'):
            oldr=previous[r['original_path']]
            assert r['git_blob']==oldr['git_blob'] and r['sha256']==oldr['sha256']
        if r['path'].startswith('evidence/programs/mayhem/src/'):
            assert b'pub fn initialize_mayhem_state' not in read(r['path'])
    assert not result['source_changes'] and not result['builds'] and not result['runtime_probes'] and not result['macro_expansion_executed']
    print(json.dumps({'status':'PASS','manifest_files':len(manifest),'evidence_files':len(records),'checked_spans':spans,**result['counts'],'assurance':'Integrity/provenance and binding inventory only; no semantic execution or security certification'},sort_keys=True))
if __name__=='__main__':main()
