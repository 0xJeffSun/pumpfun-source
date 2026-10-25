#!/usr/bin/env python3
"""Portable offline evidence review. Does not execute Rust, SBF or harnesses."""
from pathlib import Path
import difflib,gzip,hashlib,io,json,re,struct,subprocess,sys,tarfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def need(v,msg):
    if not v: raise ValueError(msg)
def read(n):
    q=P/n
    need(not q.is_symlink() and q.resolve().is_relative_to(P),'unsafe path '+n)
    return q.read_bytes()
def js(n):return json.loads(read(n))
m=js('manifest.json')
need(H(read('manifest.json'))==read('manifest.sha256').decode().split()[0],'manifest anchor')
for q in P.rglob('*'):need(not q.is_symlink(),'symlink')
need({str(q.relative_to(P)) for q in P.rglob('*') if q.is_file()}==set(m)|{'manifest.json','manifest.sha256'},'inventory')
for n,h in m.items():need(H(read(n))==h,'hash '+n)
need(H(read('composition/manifest.json'))==js('prior-seal.json')['manifest_sha256'],'prior seal')
for r in js('inputs.json'):
    b=read(r['path']);need(H(b)==r['sha256'] and len(b)==r['size'],'input')
for n in ['lib.rs','trade.rs']:
    need(read('inputs/accepted/'+n)==read('inputs/checkpoint/'+n)==read('composition/baseline/programs/pump/src/'+n),'accepted lineage '+n)
for r in js('review-source-ranges.json'):
    b=read(r['path']);a,z=r['bytes'];lo,hi=r['lines']
    need(H(b)==r['whole_sha256'] and len(b)==r['whole_size'],'whole source')
    need(b''.join(b.splitlines(True)[lo-1:hi])==b[a:z] and H(b[a:z])==r['sha256'],'range '+r['path'])
arc=read('inputs/anchor-lang-0.31.1.crate')
lock=read('composition/baseline/programs/pump/Cargo.lock').decode()
sec=lock.split('name = "anchor-lang"',1)[1].split('[[package]]',1)[0]
need('version = "0.31.1"' in sec and H(arc) in sec,'locked Anchor archive')
with tarfile.open(fileobj=io.BytesIO(arc),mode='r:gz') as t:
    for n in ['context.rs','lib.rs']:need(t.extractfile('anchor-lang-0.31.1/src/'+n).read()==read('inputs/anchor-'+n),'archive member')
b=read('inputs/v3_configured_fee.json.gz');u=gzip.decompress(b);r=js('receipt-range.json')
need(r['compressed_bytes']==[0,len(b)] and r['decoded_bytes']==[0,len(u)] and r['compressed_sha256']==H(b) and r['decoded_sha256']==H(u),'receipt ranges')
x=json.loads(u);need(x['mismatches']==[] and x['case_count']==372,'retained suite')
rows=[]
for i,row in enumerate(x['cases']):
    if row['case']['operation']!='buy_v3':continue
    a=row['original']['accounts']['CVSqJN3Png6dESqXwNAFokfFtnPe31k1aArdZ4BYdU4a']
    rows.append(dict(index=i,case=row['case'],original_error=row['original']['error'],match=row['match'],base_mint_owner=a['owner'],base_mint_size=len(a.get('data_hex') or '')//2))
need(rows==js('regressions.json') and len(rows)==117,'classifications')
success=[r for r in rows if r['original_error'] is None]
need(len(success)==105 and all(r['match'] and r['base_mint_owner']=='TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' for r in rows),'regression witness')
need([sum(bool(f(r)) for r in success) for f in [lambda r:not r['case'].get('token_quote'),lambda r:r['case'].get('token_quote') and not r['case'].get('quote2022'),lambda r:r['case'].get('quote2022'),lambda r:81 in r['case'].get('flags',[]),lambda r:124 in r['case'].get('flags',[])]]==[37,37,31,36,36],'subsets')
old=read('inputs/accepted/trade.rs').decode();com=read('composition/proposed/programs/pump/src/trade.rs').decode()
a=old.index('pub fn buy(');b=old.index('pub fn buy_exact_quote(',a)
c=com.index('pub fn buy(');d=com.index('pub fn buy_exact_quote(',c)
expected=com[:c]+old[a:b]+com[c:d].replace('pub fn buy(','pub fn buy_ordinary_candidate(',1)+com[d:]
need(read('source/trade.rs').decode()==expected,'verbatim accepted body and renamed candidate')
need(old[:a]==com[:c] and com[d:].startswith(old[b:]),'other handlers preserved')
need(read('source/lib.rs')==read('inputs/accepted/lib.rs'),'accepted wrapper')
patch=''
for n in ['lib.rs','trade.rs']:
    patch+=''.join(difflib.unified_diff(read('composition/proposed/programs/pump/src/'+n).decode().splitlines(True),read('source/'+n).decode().splitlines(True),fromfile='a/programs/pump/src/'+n,tofile='b/programs/pump/src/'+n))
need(patch==read('containment.patch').decode(),'exact patch')
frag=read('source/dispatch_fragment.rs').decode()
need('use anchor_lang::Bumps;' in frag,'explicit Bumps import')
for body,context in [('buy','SellV3'),('buy_ordinary_candidate','BuyV3')]:
    need(context+'::try_accounts' in frag and body+'(Context::new(program_id, &mut a, remaining, bumps)' in frag,'real parser and body')
need(frag.count('a.exit(program_id)')==2,'one selected exit per branch')
selector=frag.split('pub fn choose_buy_lane',1)[1]
need('try_accounts' not in selector and '.exit(' not in selector and 'CpiContext' not in selector and 'try_borrow_mut' not in selector,'readonly selector')
need('raw[1].owner != &legacy' in selector and 'curve.is_mayhem_mode' in selector,'preserved domains')
elf=read('composition/prior/pump_buy_fee_selection_closure/evidence/original.so')
need(H(elf)==x['original_sha256'],'same original')
shoff=struct.unpack_from('<Q',elf,40)[0];sz,num=struct.unpack_from('<HH',elf,58)
sections=[struct.unpack_from('<IIQQQQIIQQ',elf,shoff+i*sz) for i in range(num)]
def code(pc,n=8):
    hits=[s[4]+pc-s[3] for s in sections if s[2]&4 and s[3]<=pc and pc+n<=s[3]+s[5]]
    need(len(hits)==1,'executable range '+hex(pc));return elf[hits[0]:hits[0]+n]
count=0
for w in js('review-windows.json'):
    b=read(w['path']);need(w['file_bytes']==[0,len(b)] and H(b)==w['file_sha256'],'assembly range')
    rows=[]
    for line in b.decode().splitlines():
        r=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+)+)',line)
        if r:
            pc=int(r[1],16);raw=bytes.fromhex(r[2]);need(raw==code(pc,len(raw)),'original opcode '+hex(pc));rows.append((pc,raw));count+=1
    need([[pc,pc+len(raw)] for pc,raw in rows]==w['instruction_ranges'],'instruction ranges')
    need(H(b''.join(raw for pc,raw in rows))==w['instruction_bytes_sha256'],'window byte hash')
for pc,target in {0x128808:0x102578,0x128930:0x147ba0,0x128978:0x107b38,0x147c08:0x3cd50,0x3cf48:0x3d250,0x3d318:0xa2188,0x3d4c8:0x1a0a20,0x3d598:0x1a0ae8,0x3dc50:0x19e090,0x105300:0x1a7ff0}.items():
    op,reg,off,imm=struct.unpack('<BBhi',code(pc));need((op,reg)==(0x85,0x10) and pc+8+8*imm==target,'signed call '+hex(pc))
for pc,target in {0x3cf70:0x3d230,0x128940:0x128950}.items():
    op,reg,off,imm=struct.unpack('<BBhi',code(pc));need(op&7==5 and pc+8+8*off==target,'signed branch '+hex(pc))
proc=subprocess.run([sys.executable,'-B',str(P/'composition/verify.py')],cwd=P/'composition',capture_output=True,text=True)
need(proc.returncode==0,'inherited static verifier: '+proc.stdout+proc.stderr)
print(json.dumps({'status':'PASS','scope':'static review only; not compiled or executed','retained_buy_v3_rows':117,'successful_cases_excluded_by_overlay':105,'reviewed_instruction_rows':count,'prior_static_verifier':'PASS','containment_patch':'exact; accepted body preserved','ordinary_dispatch':'fragment not wired','manifest_sha256':H(read('manifest.json'))},indent=2))
