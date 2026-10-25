#!/usr/bin/env python3
"""Offline static artifact verification. Never executes a target or proposed source."""
from pathlib import Path
import hashlib,json,re,struct,difflib
P=Path(__file__).resolve().parent

def digest(b):return hashlib.sha256(b).hexdigest()
def check(ok,label):
    if not ok:raise SystemExit('FAIL: '+label)
def read(name):
    q=P/name
    check(not q.is_symlink() and q.resolve().is_relative_to(P), 'safe member '+name)
    return q.read_bytes()
def obj(name):return json.loads(read(name))

manifest=obj('manifest.json')
check(digest(read('manifest.json'))==read('manifest.sha256').decode().split()[0],'detached manifest digest')
actual={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()}
check(actual==set(manifest)|{'manifest.json','manifest.sha256'},'exact inventory')
for name,h in manifest.items():check(digest(read(name))==h,'member '+name)
for name in ['prior/native-contract/manifest-sha256.json','prior/proposal/manifest.json','prior/proposal/residual-contract/manifest.json']:
    parent=str(Path(name).parent)
    for f,h in obj(name).items():check(digest(read(parent+'/'+f))==h,'preserved seal '+parent+'/'+f)

inputs=obj('inputs.json')
for r in inputs:
    data=read(r['file']);s,e=r['byte_range']
    check(digest(data)==r['sha256'],'input digest '+r['file'])
    check(len(data)==e-s,'input slice size '+r['file'])
    if s==0 and e==r['full_size']:check(digest(data)==r['full_sha256'],'whole input '+r['file'])
elf=read('evidence/original.so')
check(elf[:6]==b'\x7fELF\x02\x01','ELF64 little endian')
# Check executable virtual/file mapping rather than assuming text label offsets.
shoff=struct.unpack_from('<Q',elf,40)[0];shsize,shnum=struct.unpack_from('<HH',elf,58)
sections=[struct.unpack_from('<IIQQQQIIQQ',elf,shoff+i*shsize) for i in range(shnum)]
def offset(va,n):
    matches=[s[4]+va-s[3] for s in sections if s[2]&4 and s[3]<=va and va+n<=s[3]+s[5]]
    check(len(matches)==1,'unique executable VA '+hex(va));return matches[0]
def code(va,n):
    o=offset(va,n);return elf[o:o+n]
asm_count=0
for r in inputs:
    if not r.get('va'):continue
    lo,hi=r['va'];end=lo
    for line in read(r['file']).decode().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} )*[0-9a-f]{2})\s',line)
        if not m:continue
        va=int(m[1],16);b=bytes.fromhex(m[2]);check(va==end,'continuous window '+r['file'])
        check(code(va,len(b))==b,'assembly bytes '+hex(va));end=va+len(b);asm_count+=1
    check(end==hi,'window end '+r['file'])
for r in obj('consumed-ranges.json')['windows']:
    lo,hi=r['virtual_range'];s,e=r['elf_file_range']
    check(offset(lo,hi-lo)==s and e-s==hi-lo,'range mapping '+r['file'])
    check(digest(elf[s:e])==r['sha256'],'binary range '+r['file'])
for edge in obj('caller-callee-ledger.json'):
    pc=int(edge['pc'],16);b=code(pc,8)
    check(b.hex()==edge['bytes'],'edge bytes '+edge['pc'])
    call=edge['kind']=='call'
    check((b[0]==0x85 and b[1]==0x10) if call else (b[0]&7==5 and b[0]!=0x95),'edge opcode '+edge['pc'])
    delta=struct.unpack_from('<i' if call else '<h',b,4 if call else 2)[0]
    check(pc+8+8*delta==int(edge['target'],16),'signed target '+edge['pc'])
# Independent semantic-critical anchors, beyond hashing a caller-authored ledger.
for pc,target in {0x83fa0:0x84468,0x84218:0x84628,0x97950:0x97990,0x8dfa8:0x8e438,0x965d8:0x96888,0x84770:0x84830}.items():
    check(pc+8+8*struct.unpack_from('<h',code(pc,8),2)[0]==target,'critical branch '+hex(pc))
for pc,expected in {0x966c8:'7b92000000000000',0x966e0:'7b21000000000000',0x96798:'7b62000000000000',0x967b0:'7b21000000000000',0x969e8:'9500000000000000'}.items():
    check(code(pc,8).hex()==expected,'store/release/exit '+hex(pc))
for pc,value in [(0x96610,0x8000000000000017),(0x967c0,0x8000000000000017),(0x1a2c30,0x800000000000000b),(0x1a2c88,0x800000000000001a)]:
    b=code(pc,16);v=struct.unpack_from('<I',b,4)[0]|struct.unpack_from('<I',b,12)[0]<<32
    check(b[0]==0x18 and v==value,'raw error/success sentinel '+hex(pc))
# No call to a System adapter in the direct mutation helper.
calls=[]
for pc in range(0x965b8,0x969f0,8):
    b=code(pc,8)
    if b[:2]==b'\x85\x10':calls.append(pc+8+8*struct.unpack_from('<i',b,4)[0])
check(set(calls)=={0x1a29f0,0x1a2c30,0x19bbb8},'direct helper callee set')

ledger=obj('source-ledger.json');old=read(ledger['baseline']);new=read('proposed/programs/pump/src/trade.rs');frag=read('native_fragment.rs')
check(digest(old)==ledger['baseline_sha256'],'proposal baseline')
s,e=ledger['changed_bytes_old'];ns,ne=ledger['changed_bytes_new']
check(ns==s and new==old[:s]+frag+old[e:] and new[s:ne]==frag,'only named native fragment replaced')
for (lo,hi),(a,b) in zip(ledger['consumed_lines_inclusive'],ledger['consumed_byte_ranges']):
    check(b''.join(old.splitlines(True)[lo-1:hi])==old[a:b],'source consumption')
diff=''.join(difflib.unified_diff(old.decode().splitlines(True),new.decode().splitlines(True),fromfile=ledger['baseline'],tofile='proposed/programs/pump/src/trade.rs'))
check(read('minimal.diff').decode()==diff,'exact diff')
t=frag.decode();check(t.count('system_program::transfer(')==1,'one System CPI in replacement')
ordered=['let native_input=add(curve_payment,combined_buyback)?','if native_input!=0','system_program::transfer(','let native_recipient=','if combined_buyback!=0','let remaining=','try_borrow_mut_lamports()?=remaining','let credited=','try_borrow_mut_lamports()?=credited']
pos=[t.index(x) for x in ordered];check(pos==sorted(pos),'source gate/debit/re-read/credit order')
check('from:a.user.to_account_info(),to:a.bonding_curve.to_account_info()' in t,'System identities')
check('native_curve.lamports().checked_sub(combined_buyback)' in t and 'native_recipient.lamports().checked_add(combined_buyback)' in t,'actual lamport arithmetic')
print(json.dumps({'status':'pass','publication_members':len(manifest),'original_instruction_rows':asm_count,'decoded_edges':len(obj('caller-callee-ledger.json')),'scope':'static artifacts only; no target execution or equivalence claim'},sort_keys=True))
