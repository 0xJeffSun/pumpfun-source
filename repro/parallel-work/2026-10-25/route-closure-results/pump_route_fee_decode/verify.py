#!/usr/bin/env python3
"""Portable integrity/static-evidence checks only; no SBF/decoder execution."""
import hashlib,json,pathlib,re,struct
P=pathlib.Path(__file__).resolve().parent

def check(ok,reason):
    if not ok: raise ValueError(reason)
def sha(b): return hashlib.sha256(b).hexdigest()
def readj(p):return json.loads((P/p).read_text())
def gitblob(b):return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
manifest=readj('manifest-sha256.json')
# Nested predecessor manifests belong to the seal too.
actual={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p!=P/'manifest-sha256.json'}
check(actual==set(manifest),'exact file inventory')
check(not any(p.is_symlink() for p in P.rglob('*')),'symlinks forbidden')
for rel,h in manifest.items():check(sha((P/rel).read_bytes())==h,'SHA256 '+rel)
for x in readj('provenance.json'):
    b=(P/x['path']).read_bytes()
    if 'excerpt_start' in x:
        check(len(b)==x['excerpt_end']-x['excerpt_start'],'excerpt size')
        check(sha(b)==x['excerpt_sha256'],'excerpt hash')
    else:
        check(sha(b)==x['sha256'],'whole hash '+x['path'])
        check(gitblob(b)==x['git_blob'],'Git blob '+x['path'])
prior_count=0
for folder in (P/'inputs').iterdir():
    f=folder/'manifest-sha256.json'
    if not f.exists():continue
    seal=json.loads(f.read_text())
    for path in folder.rglob('*'):
        if not path.is_file() or path==f:continue
        rel=str(path.relative_to(folder));check(rel in seal,'predecessor membership '+str(path));check(sha(path.read_bytes())==seal[rel],'predecessor hash '+str(path));prior_count+=1
windows=readj('windows.json');W={x['name']:x for x in windows['windows']}
check(len(W)==len(windows['windows']),'unique windows')
inst_count=0
for name,w in W.items():
    b=(P/'bytes'/(name+'.bin')).read_bytes();check(len(b)==w['end']-w['start'],'range length '+name)
    pos=w['start']
    for line in (P/'asm'/(name+'.asm')).read_text().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )+)',line)
        check(m is not None,'assembly syntax');addr=int(m[1],16);raw=bytes.fromhex(m[2]);check(addr==pos,'contiguous assembly '+name);check(b[addr-w['start']:addr-w['start']+len(raw)]==raw,'assembly/raw '+name);pos+=len(raw);inst_count+=1
    check(pos==w['end'],'assembly end '+name)
def raw(name,site,n=8):
    w=W[name];check(w['start']<=site and site+n<=w['end'],'assertion bounds');return (P/'bytes'/(name+'.bin')).read_bytes()[site-w['start']:site-w['start']+n]
R=readj('results.json')
for e in R['admitted_calls']:
    site=int(e['site'],16);op,reg,off,imm=struct.unpack('<BBhi',raw(e['window'],site));check(op==0x85 and reg==0x10,'direct call opcode');check(site+8+imm*8==int(e['target'],16),'call target')
for x in readj('opcode-assertions.json'):
    expected=bytes.fromhex(x['hex']);check(raw(x['window'],int(x['site'],16),len(expected))==expected,'opcode assertion')
for d in readj('data-ranges.json'):
    b=(P/d['path']).read_bytes();check(len(b)==d['end']-d['start'] and b.hex()==d['hex'],'data range')
check(hashlib.sha256(b'account:FeeConfig').digest()[:8].hex()==R['discriminator_hex'],'FeeConfig discriminator identity')
check(R['wrapper']['first_vector']=={'capacity':0,'pointer':8,'length':16},'vector mapping metadata')
check(R['wire']['record_stride']==40 and R['selector']['minimum_length']==2512,'contract metadata')
print(json.dumps({'status':'PASS','sealed_files':len(manifest),'instruction_records_checked':inst_count,'admitted_edges_checked':len(R['admitted_calls']),'prior_members_checked':prior_count,'semantic_proof':False,'runtime_executed':False},sort_keys=True))
