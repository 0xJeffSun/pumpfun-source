#!/usr/bin/env python3
"""Offline integrity and review-reference verifier. No network, builds, VM, or signatures."""
import gzip,hashlib,json,pathlib,sys
ROOT=pathlib.Path(__file__).resolve().parent

def need(ok,msg):
    if not ok: raise ValueError(msg)
def read(p): return (ROOT/p).read_bytes()
def doc(p): return json.loads(read(p))
def sha(b): return hashlib.sha256(b).hexdigest()
def main():
    manifest={}
    for line in read('SHA256SUMS').decode().splitlines():
        digest,path=line.split('  ',1)
        need(path not in manifest,'duplicate manifest path')
        need(not pathlib.PurePosixPath(path).is_absolute() and '..' not in pathlib.PurePosixPath(path).parts,'unsafe path')
        manifest[path]=digest
    files={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.name!='SHA256SUMS'}
    need(files==set(manifest),'manifest file set differs')
    for p,h in manifest.items():
        need(not (ROOT/p).is_symlink(),'symlink prohibited')
        need(sha(read(p))==h,'SHA256 mismatch '+p)
    prov=doc('provenance.json');result=doc('result.json')
    need(prov['checkpoint']==result['checkpoint']=='517d77db988d8c63b6cf476f0be138c5a4f3128a','checkpoint')
    for x in prov['files']:
        b=read('evidence/'+x['path'])
        need(len(b)==x['bytes'] and sha(b)==x['sha256'],'input digest '+x['path'])
        need(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==x['git_blob'],'Git blob '+x['path'])
    need({'evidence/'+x['path'] for x in prov['files']}=={p for p in files if p.startswith('evidence/')},'unprovenanced evidence')
    spans=0
    def walk(v):
        nonlocal spans
        if isinstance(v,dict):
            if {'path','line_start','line_end','byte_start','byte_end_exclusive','sha256'} <= v.keys():
                b=read('evidence/'+v['path']); ls=b.splitlines(keepends=True)
                a=sum(map(len,ls[:v['line_start']-1]));z=sum(map(len,ls[:v['line_end']]))
                need(a==v['byte_start'] and z==v['byte_end_exclusive'] and a<z,'span offsets')
                need(sha(b[a:z])==v['sha256'],'span digest');spans+=1
            for x in v.values():walk(x)
        elif isinstance(v,list):
            for x in v:walk(x)
    walk(result)
    cov=doc('evidence/repro/parallel-work/2026-10-24/wave2-results/public_audit_coverage/coverage.json')
    hs={x['handler'] for x in cov['handlers'] if x['program']=='mayhem' and x['published_recovery_status']=='bounded_implementation'}
    need(len(result['handlers'])==24 and {x['handler'] for x in result['handlers']}==hs,'handler coverage')
    fields=set(cov['families'])
    for h in result['handlers']:
        need(set(h['review'])==fields and all(h['review'].values()),'handler family omissions')
        need(bool(h['unclosed']),'missing limitations')
    def ident(x):
        s=x.get('source',x);return (s['path'],s['line_start'],s['line_end'],x['name'])
    for key,sourcekey,count in [('functions','functions',61),('contexts','account_contexts',15)]:
        expected={ident(x) for x in cov[sourcekey] if x['path'].startswith('programs/mayhem/src/')}
        need(len(result[key])==count and {ident(x) for x in result[key]}==expected,'coverage '+key)
        need(all(x['conclusion'].strip() for x in result[key]),'empty review '+key)
    build=doc('evidence/repro/mayhem/twentyfour/build-comparison.json');summary=doc('evidence/repro/mayhem/twentyfour/summary.json')
    for field,obj in [('source_sha256',build),('main_source_sha256',summary)]:
        for p,h in obj[field].items():need(sha(read('evidence/'+p))==h,'saved source binding '+p)
    candidate=sha(read('evidence/repro/mayhem/twentyfour/mayhem_recovered.so'))
    need(candidate==result['candidate_sha256']==summary['candidate_sha256'],'candidate identity')
    need(summary['full_byte_equality'] is False,'incorrect original equality')
    obs=doc('saved_observations.json'); cache={}
    for o in obs:
        if o['path'] not in cache: cache[o['path']]=json.loads(gzip.decompress(read('evidence/'+o['path'])))
        j=cache[o['path']];need(j['candidate_sha256']==candidate,'receipt candidate')
        x=j
        for part in o['json_pointer'].strip('/').split('/'):x=x[int(part)] if isinstance(x,list) else x[part]
        need(x['case']==o['case'],'case identity')
        need(x['original']['error']==x['candidate']['error']==o['error'],'case error')
        need(set(o['compared_fields'])==set(x['original'])-{'logs'},'comparison projection')
        need(all(x['original'][k]==x['candidate'][k] for k in o['compared_fields']),'saved nonlog outputs differ')
    need(result['source_changes']==[] and result['full_program_security_signoff'] is False and result['runtime_probes'] is False and result['builds'] is False,'scope flag changed')
    return {'status':'PASS','checkpoint':result['checkpoint'],'manifest_files':len(files),'input_blobs':len(prov['files']),'source_spans':spans,'handlers':24,'functions':61,'contexts':15,'saved_cases_checked':len(obs),'candidate_sha256':candidate,'security_signoff':False,'scope':'Integrity, coverage references, saved source binding and selected nonlog saved outputs only; not semantic proof or runtime execution.'}
if __name__=='__main__':
    try:print(json.dumps(main(),indent=2))
    except Exception as exc:
        print(json.dumps({'status':'FAIL','error':str(exc)}));sys.exit(1)
