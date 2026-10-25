#!/usr/bin/env python3
"""Offline integrity/applicability checks only. No build, program execution or network."""
import hashlib, json, pathlib, re, sys, tarfile
P=pathlib.Path(__file__).resolve().parent

def check(condition,message):
    if not condition: raise ValueError(message)
def sha(b): return hashlib.sha256(b).hexdigest()
def read(p):
    q=P/p
    check(not q.is_symlink() and q.resolve().is_relative_to(P) if hasattr(q.resolve(),'is_relative_to') else not q.is_symlink() and str(q.resolve()).startswith(str(P)+'/'),'unsafe path '+p)
    return q.read_bytes()
def blob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def verify_span(s):
    b=read(s['path']);a=s['byte_start'];z=s['byte_end_exclusive']
    check(0<=a<=z<=len(b),'range '+s['path']);check(sha(b[a:z])==s['sha256'],'span hash '+s['path'])
    check(s['line_start']==b[:a].count(b'\n')+1,'start line '+s['path'])
    check(s['line_end']==b[:z].count(b'\n')+int(not b[:z].endswith(b'\n')),'end line '+s['path'])
def walk_spans(v):
    if isinstance(v,dict):
        if all(k in v for k in ['path','byte_start','byte_end_exclusive','line_start','line_end','sha256']):yield v
        else:
            for k,x in v.items():
                if k!='prior_source':yield from walk_spans(x)
    elif isinstance(v,list):
        for x in v:yield from walk_spans(x)
def main():
    manifest=json.loads(read('manifest-sha256.json'))
    actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and f.name!='manifest-sha256.json'}
    # Nested historical manifests are sealed too.
    actual={str(f.relative_to(P)) for f in P.rglob('*') if f.is_file() and str(f.relative_to(P))!='manifest-sha256.json'}
    check(actual==set(manifest),'sealed file set mismatch')
    for p,h in manifest.items():check(sha(read(p))==h,'file hash '+p)
    provenance=json.loads(read('provenance.json'))
    for x in provenance['inputs']:
        b=read(x['path']);check(len(b)==x['bytes'] and sha(b)==x['sha256'] and blob(b)==x['git_blob'],'input identity '+x['path'])
        for s in x['consumed_ranges']:verify_span(s)
    for a in provenance['archives']:
        b=read(a['path']);check(sha(b)==a['sha256'],'archive hash')
        for lock in ['inputs/programs/pump-amm/Cargo.lock','inputs/Cargo.lock']:
            blocks=read(lock).decode().split('[[package]]')
            match=[v for v in blocks if 'name = "'+a['crate_name']+'"' in v and 'version = "'+a['version']+'"' in v]
            check(len(match)==1 and 'checksum = "'+a['sha256']+'"' in match[0],'lock binding '+lock+' '+a['crate_name'])
        with tarfile.open(P/a['path'],'r:gz') as t:
            for m in a['members']:check(t.extractfile(m['member']).read()==read(m['path']),'archive member '+m['member'])
    result=json.loads(read('result.json'))
    for s in walk_spans(result):verify_span(s)
    base='inputs/repro/parallel-work/2026-10-25/results/audit_amm/'
    prior=json.loads(read(base+'result.json'))
    check(len(result['functions'])==117 and len(result['contexts'])==30 and len(result['handlers'])==38,'row counts')
    check({x['prior_id'] for x in result['functions'] if 'prior_id' in x}=={x['id'] for x in prior['functions']},'prior function retention')
    check({x['name'] for x in result['contexts']}=={x['name'] for x in prior['contexts']}|{'CreateConfig'},'context retention')
    check({x['handler'] for x in result['handlers']}=={x['handler'] for x in prior['handlers']},'handler retention')
    for x in result['functions']:
        if 'prior_source' in x:
            s=x['prior_source'];b=read(base+s['path'])[s['byte_start']:s['byte_end_exclusive']];check(sha(b)==s['sha256'],'prior span')
            if x['disposition']=='byte_identical_body_rebound':check(s['sha256']==x['source']['sha256'],'rebound function')
    old_context={x['name']:x for x in prior['contexts']}
    for x in result['contexts']:
        if x['name'] in old_context:check(x['source']['sha256']==old_context[x['name']]['source']['sha256'],'rebound context')
    actual_fns=sum(len(re.findall(rb'\bfn\s+\w+\s*(?:<|\()',f.read_bytes())) for f in (P/'inputs/programs/pump-amm/src').rglob('*.rs'))
    check(actual_fns==117,'declaration enumeration')
    bindings=json.loads(read('inputs/repro/pump_amm/update-event-borrow-v144/current-main-bindings.json'))
    check(len(bindings['compiled_source'])==22,'compiled manifest size')
    for p,h in bindings['compiled_source'].items():check(sha(read('inputs/'+p))==h,'current compiled source binding '+p)
    for p in provenance['inherited_subset_seals']:
        seal=json.loads(read(p));root=pathlib.PurePosixPath(p).parent
        for rel,h in seal.items():
            path=str(root/rel)
            if path in manifest:check(sha(read(path))==h,'inherited subset '+path)
    fields=result['global_config_wire_fields'];off=8
    for f in fields:
        check(f['byte_start']==off,'field offset');off=f['byte_end_exclusive']
    check(off==949 and len(fields)==18,'wire extent')
    check({x['id'] for x in result['observations']}=={'F%02d'%i for i in range(1,10)},'observations')
    check(result['security_signoff'] is False and result['completion_counts_changed'] is False and result['new_target_execution'] is False,'scope')
    print(json.dumps({'status':'PASS','files':len(manifest),'inputs':len(provenance['inputs']),'functions':117,'contexts':30,'handler_rows':38,'security_signoff':False,'verification':'integrity and explicit source rebindings only'},sort_keys=True))
if __name__=='__main__':
    try:main()
    except Exception as e:
        print('FAIL: '+str(e),file=sys.stderr);sys.exit(1)
