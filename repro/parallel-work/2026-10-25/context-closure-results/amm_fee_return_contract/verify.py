#!/usr/bin/env python3
"""Offline integrity/identity verification, not execution or a semantic proof."""
from pathlib import Path
import hashlib, io, json, re, tarfile
ROOT=Path(__file__).resolve().parent

def require(ok, msg):
    if not ok: raise ValueError(msg)
def digest(b): return hashlib.sha256(b).hexdigest()
def read(rel):
    p=Path(rel)
    require(not p.is_absolute() and '..' not in p.parts, 'unsafe path')
    return (ROOT/p).read_bytes()
def obj(rel): return json.loads(read(rel))
def main():
    manifest=obj('manifest-sha256.json')
    all_paths=list(ROOT.rglob('*'))
    require(not any(p.is_symlink() for p in all_paths),'symlink present')
    actual={p.relative_to(ROOT).as_posix() for p in all_paths if p.is_file()}
    require(actual==set(manifest)|{'manifest-sha256.json'},'exact file set mismatch')
    for p,h in manifest.items():require(digest(read(p))==h,'seal mismatch: '+p)
    records=obj('provenance.json')
    for r in records:
        b=read(r['path'])
        require(len(b)==r['size'] and digest(b)==r['sha256'],'input hash mismatch')
        if 'git_blob' in r:
            require(r['commit']=='4d3c19e3c58427f3604caede144b3322fa56d2b5','checkpoint mismatch')
            require(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'Git blob mismatch')
        else:
            with tarfile.open(fileobj=io.BytesIO(read(r['archive']))) as t:
                require(t.extractfile(r['member']).read()==b,'archive member mismatch')
    for lock in ['inputs/Cargo.lock','inputs/programs/pump-amm/Cargo.lock']:
        blocks=read(lock).decode().split('[[package]]')
        for name,version in [('anchor-syn','0.31.2'),('anchor-lang','0.31.1')]:
            block=next(b for b in blocks if re.search(r'^name = "'+name+r'"$',b,re.M))
            require('version = "'+version+'"' in block,'dependency version mismatch')
            checksum=re.search(r'^checksum = "([0-9a-f]+)"$',block,re.M).group(1)
            require(digest(read('inputs/archives/'+name+'-'+version+'.crate'))==checksum,'archive lock mismatch')
    result=obj('results.json')
    for s in result['spans']:
        b=read(s['path']);lines=b.splitlines(keepends=True)
        a=sum(map(len,lines[:s['line_start']-1]));z=sum(map(len,lines[:s['line_end']]))
        require((a,z)==(s['byte_start'],s['byte_end']),'span coordinates mismatch')
        require(digest(b[a:z])==s['sha256'],'span hash mismatch')
    for s in result['prior_subset_seals']:
        require(digest(read(s['path']))==obj(s['seal'])[s['key']],'prior subset seal mismatch')
    idl=obj('inputs/evidence/upstream/pump_fees.json')
    ix=next(i for i in idl['instructions'] if i['name']=='get_fees_with_quote_mint')
    require(ix==result['instruction'],'IDL extraction mismatch')
    require(ix['discriminator']==list(hashlib.sha256(b'global:get_fees_with_quote_mint').digest()[:8]),'discriminator mismatch')
    require(idl['address']==result['fixed_target'],'IDL target mismatch')
    for f in ['legacy_buy.rs','legacy_sell.rs']:
        text=read('inputs/programs/pump-amm/src/'+f).decode()
        require('vec![154, 237, 138, 92, 162, 2, 162, 187, canonical as u8]' in text,'caller discriminator mismatch')
        require('program_id: trade::FEE_OWNER' in text,'caller target mismatch')
    print(json.dumps({'status':'PASS','sealed_files':len(manifest),'provenance_records':len(records),'checked_spans':len(result['spans']),'prior_subset_files':len(result['prior_subset_seals']),'runtime_executed':False,'semantic_proof_automated':False},sort_keys=True))
if __name__=='__main__':main()
