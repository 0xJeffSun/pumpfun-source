#!/usr/bin/env python3
"""Static integrity/binding verification only. No runtime, builds or generated cases."""
import argparse,difflib,hashlib,json,pathlib,re,subprocess
P=pathlib.Path(__file__).resolve().parent
C='476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40'
def read(name): return json.loads((P/name).read_text())
def sha(data):return hashlib.sha256(data).hexdigest()
def blob(data):return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
def check(test,message):
    if not test:raise SystemExit('FAIL: '+message)
def entries(path):
    result=[]
    for line in path.read_text().splitlines():
        m=re.match(r'^\s*([0-9a-fA-F]+):\s+((?:[0-9a-fA-F]{2}[ \t]+)+)',line)
        if m:result.append([int(m[1],16),bytes.fromhex(m[2]).hex()])
    return result
args=argparse.ArgumentParser();args.add_argument('--repo',type=pathlib.Path);a=args.parse_args()
manifest=read('manifest-sha256.json')
files=set()
for p in P.rglob('*'):
    check(not p.is_symlink(),'symlink '+str(p))
    if p.is_file() and p != P/'manifest-sha256.json':files.add(p.relative_to(P).as_posix())
check(files==set(manifest),'exact inventory')
for path,digest in manifest.items():check(sha((P/path).read_bytes())==digest,'hash '+path)
provenance=read('provenance.json')
check(len({x['local'] for x in provenance})==len(provenance),'duplicate provenance')
for r in provenance:
    data=(P/r['local']).read_bytes();check(sha(data)==r['sha256'],'provenance '+r['local'])
    if r['origin']=='frozen_git':
        check(r['checkpoint']==C,'source checkpoint');check(blob(data)==r['git_blob'],'Git blob '+r['local'])
subset_count=0
for path in (P/'evidence').glob('*/manifest-sha256.json'):
    old=json.loads(path.read_text())
    if not isinstance(old,dict):continue
    for name,digest in old.items():
        target=path.parent/name
        if isinstance(digest,str) and target.is_file():
            check(sha(target.read_bytes())==digest,'old sealed member '+str(target));subset_count+=1
name='programs/pump/src/multi_hop_curve.rs'
old=(P/'frozen'/name).read_text();new=(P/'proposed'/name).read_text()
patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+name,tofile='b/'+name,n=3))
check((P/'source.patch').read_text()==patch,'exact minimal source diff')
for kind in ['frozen','proposed']:
    maps=read(kind+'-source-map.json')
    check({x['path'] for x in maps}=={p.relative_to(P).as_posix() for p in (P/kind).rglob('*') if p.is_file()},kind+' map inventory')
    for r in maps:
        raw=(P/r['path']).read_bytes();lines=raw.decode().splitlines()
        check(sha(raw)==r['sha256'] and blob(raw)==r['git_blob'] and len(lines)==r['line_count'],'source map '+r['path'])
        for span in r['spans']:
            check(1<=span['start']<=span['end']<=len(lines),'source span')
            check(lines[span['start']-1]==span['declaration'],'source declaration')
for row in read('evidence-to-change.json'):
    check(1<=row['line_start']<=row['line_end']<=len(new.splitlines())+1,'ledger span '+row['id'])
    for ev in row['evidence']:check((P/ev).is_file(),'ledger evidence '+ev)
byte_info=read('byte-bindings.json');encoded_count=0
for r in byte_info['asm']:
    check(entries(P/r['path'])==r['instructions'],'asm encoding list '+r['path'])
    encoded_count+=len(r['instructions'])
check({r['path'] for r in byte_info['asm']}=={p.relative_to(P).as_posix() for p in (P/'evidence').rglob('*.asm') if entries(p)},'asm inventory')
for label in ['quote_1','quote_2','quote_stable']:
    value=list((P/'evidence/pump_route_fee_decode/data'/ (label+'.bin')).read_bytes())
    check('const '+label.upper()+': Pubkey = Pubkey::new_from_array('+str(value)+');' in new,'selector constant '+label)
review=read('evidence/independent-review/review-disposition.json')
check(review['full_Git_objects_rebound']==36 and review['slices_rebound']==211,'review result')
# Optional independent membership/binding: only exact named frozen objects; no live source.
git_members=0
if a.repo:
    def git(*argv):return subprocess.check_output(['git','-C',str(a.repo),*argv])
    tree={}
    # One read-only tree query supplies commit membership, avoiding hundreds of subprocesses.
    for line in git('ls-tree','-r',C).decode().splitlines():
        meta,path=line.split('\t',1);tree[path]=meta.split()[2]
    for r in provenance:
        if r['origin']=='frozen_git':
            check(tree.get(r['source_path'])==r['git_blob'],'commit member '+r['source_path']);git_members+=1
    original=byte_info['original'];data=git('show',C+':'+original['path'])
    check(blob(data)==original['git_blob'] and sha(data)==original['sha256'],'full original object')
    for r in byte_info['asm']:
        for offset,hexbytes in r['instructions']:
            raw=bytes.fromhex(hexbytes);check(data[offset:offset+len(raw)]==raw,'original slice '+r['path']+' '+hex(offset))
print(json.dumps(dict(status='PASS',payload_files=len(files),predecessor_subset_members=subset_count,
    admitted_assembly_excerpts=len(byte_info['asm']),encoded_lines=encoded_count,
    frozen_git_members_rebound=git_members,full_original_rebound=bool(a.repo),
    source_patch_exact=True,rust_compiled=False,runtime_cases_created=0,runtime_cases_executed=0,
    semantics_proved=False,manifest_sha256=sha((P/'manifest-sha256.json').read_bytes())),indent=2))
