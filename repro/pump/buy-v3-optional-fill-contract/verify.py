#!/usr/bin/env python3
"""Offline standalone verification; no external dependencies or target execution."""
import sys
sys.dont_write_bytecode=True
from pathlib import Path
import hashlib,json,re,struct
P=Path(__file__).resolve().parent
from analyze import analyze
from elf_reader import ELF
H=lambda b:hashlib.sha256(b).hexdigest()
def verify():
    seal=(P/'manifest.sha256').read_text().split()
    assert seal==[H((P/'manifest.json').read_bytes()),'manifest.json'],'manifest seal'
    m=json.loads((P/'manifest.json').read_text())
    assert not any(x.is_symlink() for x in P.rglob('*')),'symlink'
    files={str(x.relative_to(P)) for x in P.rglob('*') if x.is_file()}
    assert files==set(m)|{'manifest.json','manifest.sha256'},'exact file allowlist'
    for rel,record in m.items():
        b=(P/rel).read_bytes()
        assert len(b)==record['size'] and H(b)==record['sha256'],rel
    own=json.loads((P/'owned-map.json').read_text())
    assert set(own['files'])==files and own['main_changes']==[]
    assert all(x['main_destination'] is None for x in own['files'].values())
    for x in json.loads((P/'input-bindings.json').read_text()):
        b=(P/x['path']).read_bytes();assert len(b)==x['size'] and H(b)==x['sha256']
    for prefix in ['parser-review','finalized','composition','review']:
        assert H((P/f'evidence/{prefix}-manifest.json').read_bytes())==(P/f'evidence/{prefix}-manifest.sha256').read_text().split()[0]
    prior=json.loads((P/'evidence/parser-review-manifest.json').read_text())
    for rel in ['evidence/original.so','evidence/current.so','evidence/v3_configured_fee.json.gz','evidence/regressions.json','evidence/1286c8.asm','evidence/147ba0.asm','source/current-wrapper.rs','source/current-buy.rs','source/proposed-buy.rs','source-applicability.json']:
        b=(P/rel).read_bytes();assert len(b)==prior[rel]['size'] and H(b)==prior[rel]['sha256']
    a=analyze();assert a==json.loads((P/'analysis.json').read_text()),'recomputed analysis'
    assert a['original']['sha256']=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
    assert a['current']['sha256']=='731003570927c206353555d9743d70229234e7e3fa167a5915fa146f3007fc93'
    assert not a['whole_file_equal']
    p=a['preservation'];assert p['count']==117 and p['successes']==105
    assert p['original_sha256']==a['original']['sha256'] and p['candidate_sha256']==a['current']['sha256']
    assert all(r['match'] and r['original_error']==r['candidate_error'] for r in p['rows'])
    e=ELF(P/'evidence/original.so');n=0
    for path in (P/'evidence').glob('*.asm'):
        for line in path.read_text().splitlines():
            match=re.match(r'^\s*([0-9a-f]+):\s*((?:[0-9a-f]{2}\s+){7,15}[0-9a-f]{2})\s',line)
            if not match:continue
            b=bytes.fromhex(match[2]);assert e.at(int(match[1],16),len(b))==b;(n:=n+1)
    assert n>500
    calls={0x128930:0x147ba0,0x147c08:0x3cd50,0x147c50:0x7e0b0,0x147e30:0x1b3678,0x147d48:0x157380,0x147e98:0x157380,0x147dd8:0x15de88,0x147f28:0x15de88,0x148048:0x19bb30,0x1481b0:0x19bb30,0x148078:0x340,0x1481e8:0x11b0,0x1480b8:0x7f010,0x148270:0xa0070,0x148418:0x82128,0x148480:0x82af8,0x408:0x1b31b0,0x5a8:0x1b30c0,0x1278:0x1b31b0,0x1418:0x1b31b0}
    for pc,target in calls.items():
        b=e.at(pc,8);assert b[:2]==b'\x85\x10' and pc+8+8*struct.unpack('<i',b[4:])[0]==target
        assert not any(pc<=r['offset']<pc+8 for r in e.reloc)
    # Exact opcode, operands, immediate, and taken destinations of all merge branches.
    edges={0x147ce0:(0x15,1,0,0x147e10),0x147cf0:(0x15,6,0,0x147d08),0x147cf8:(0xad,0x78,0,0x147d08),0x147d08:(0x15,8,0,0x147e78),0x147d18:(0xad,0x87,0,0x147d28),0x147d20:(0x05,0,0,0x148098),0x147e38:(0xbd,0x78,0,0x147ce8),0x147e50:(0x55,0,0,0x147e60),0x147e58:(0x05,0,0,0x147ce8),0x147e70:(0x05,0,0,0x147d00),0x1483a8:(0x15,2,0,0x148538)}
    for pc,(opcode,reg,immediate,target) in edges.items():
        op,r,off,imm=struct.unpack('<BBhi',e.at(pc,8));assert (op,r,imm,pc+8+8*off)==(opcode,reg,immediate,target),hex(pc)
    exact={0x128780:'7b5a38fe00000000',0x128928:'79a538fe00000000',0x147ba0:'bf56000000000000',0x147c80:'7917580000000000',0x147cd8:'7111a20000000000',0x147ce8:'b701000000000000',0x147d00:'bf78000000000000',0x147e10:'0702000088020000',0x147e28:'b703000020000000',0x147e60:'bf81000000000000',0x147e68:'1f71000000000000',0x148000:'620af0ff84170000',0x148010:'620a70ff21030000',0x148168:'620af0ff85170000',0x148178:'620a70ff22030000',0x148098:'bf18000000000000',0x148478:'bf85000000000000'}
    for pc,b in exact.items():assert e.at(pc,8).hex()==b,hex(pc)
    assert e.at(0x1b723b,29)==b'programs/pump/src/trade_v3.rs'
    assert e.at(0x1b5e34,4)==struct.pack('<I',20) and e.at(0x1b5f40,4)==struct.pack('<I',21)
    rs=[r for r in e.reloc if r['offset']==0x1b3690]
    assert len(rs)==1 and rs[0]['type']==10 and rs[0]['symbol']['name']=='sol_memcmp_'
    assert [x['text'] for x in a['error_messages']]==['Buy zero amount','Not enough tokens to buy']
    return dict(status='PASS',owned_files=len(files),assembly_instructions_checked=n,call_targets_checked=len(calls),merge_edges_checked=len(edges),buy_rows=117,successes=105,new_runtime_cases=0,compiled=False,target_executed=False,main_changes=[],limit='Integrity and static byte contracts only; no complete source, ABI, diagnostic-origin or binary equality certification')
if __name__=='__main__':print(json.dumps(verify(),indent=2))
