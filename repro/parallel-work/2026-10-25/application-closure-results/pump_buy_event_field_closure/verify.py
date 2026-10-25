#!/usr/bin/env python3
"""Portable static evidence checker. No runtime, compilation, fixtures or network."""
from pathlib import Path
import hashlib, json, re, struct, difflib
P = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()
def check(ok, message):
    if not ok: raise ValueError(message)
def read(name): return (P/name).read_bytes()
def js(name): return json.loads(read(name))
def verify():
    manifest = js('manifest.json')
    check(H(read('manifest.json')) == read('manifest.sha256').decode().split()[0], 'manifest anchor')
    actual = {str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()}
    check(actual == set(manifest) | {'manifest.json','manifest.sha256'}, 'inventory')
    for name, digest in manifest.items(): check(H(read(name)) == digest, 'digest '+name)
    for m in js('prior-members.json'):
        check(H(read(m['file'])) == js(m['seal'])[m['member']], 'predecessor '+m['file'])
    ins = {}; assembly_count = 0
    elf = read('evidence/original.so')
    for item in js('inputs.json'):
        b = read(item['file'])
        check(H(b) == item.get('sha256',item.get('excerpt_sha256')), 'input '+item['file'])
        if 'size' in item: check(len(b)==item['size'], 'input size')
        if 'whole_copy' in item:
            whole = read(item['whole_copy'])
            check(H(whole)==item['whole_input_sha256'] and len(whole)==item['whole_input_size'], 'whole checkpoint')
            check(b==b''.join(whole[a:z] for a,z in item['consumed_bytes']), 'checkpoint slice')
            blob = hashlib.sha1(b'blob '+str(len(whole)).encode()+b'\0'+whole).hexdigest()
            check(blob==item['git_blob'], 'checkpoint git blob')
        for a,z in item['consumed_bytes']:
            check(0<=a<z<=item.get('whole_input_size',len(b)), 'consumed bounds')
        if 'elf_ranges' not in item: continue
        rows=[]
        for line in b.decode().splitlines():
            m=re.match(r'\s*([0-9a-f]+):\s+((?:[0-9a-f]{2} )+)',line)
            if not m: continue
            a=int(m[1],16); raw=bytes.fromhex(m[2]); rows.append((a,raw))
            check(elf[a:a+len(raw)]==raw,'ELF assembly '+hex(a))
            check(len(raw) in (8,16), 'instruction length')
            if a in ins: check(ins[a]==raw, 'overlap')
            ins[a]=raw
        check(rows and [[rows[0][0],rows[-1][0]+len(rows[-1][1])]]==item['elf_ranges'],'assembly interval')
        check(all(a+len(raw)==rows[i+1][0] for i,(a,raw) in enumerate(rows[:-1])),'assembly gap')
        assembly_count+=len(rows)
    def op(a): return struct.unpack('<BBhi',ins[a][:8])
    def expect(a,opcode,regs,offset,imm=0):
        check(op(a)==(opcode,regs,offset,imm),'instruction '+hex(a))
    def call(a,target):
        code,regs,off,imm=op(a)
        check((code,regs)==(0x85,0x10) and a+8+imm*8==target, 'signed call '+hex(a))
    def branch(a,target):
        code,regs,off,imm=op(a)
        check(code & 7 == 5 and code not in (0x85,0x95) and a+8+off*8==target, 'signed branch '+hex(a))
    for a,target in [(0x128930,0x147ba0),(0x148308,0x7fde8),(0x80180,0x89ec8),(0x1489d8,0x859b0),(0x859e8,0x1a0938),(0x86188,0x1624b0),(0x86360,0x1624b0),(0x840a0,0xa1bd8),(0x84138,0xa1bd8),(0x87658,0x81aa0),(0x876f0,0x163bf0),(0x87778,0x163bf0)]: call(a,target)
    branch(0x8a380,0x8a3a8); branch(0x8a398,0x8a3a8); branch(0x86890,0x86958)
    branch(0x81ab8,0x81bd0); branch(0x81c20,0x81f68)
    expect(0x8a378,0x71,0x11,0x436); expect(0x8a390,0x79,0x11,0x68)
    expect(0x85aa8,0x79,0x96,0x58)
    volume=[('total_unclaimed_tokens',0x28,0x85c60,0x85ff0,-0x608),('total_claimed_tokens',0x30,0x85c50,0x85fe0,-0x610),('current_sol_volume',0x38,0x85c40,0x85fd0,-0x618),('last_update_timestamp',0x40,0x85c30,0x85fc0,-0x620)]
    fields=js('fields.json'); trade={f['field']:f for f in fields['TradeEvent']['fields']}
    for name,off,load,store,spill in volume:
        expect(load,0x79,0x61,off); expect(load+8,0x7b,0x1a,spill)
        expect(store-8,0x79,0xa5,spill)
        expect(store,0x7b,0x5a,trade[name]['object_offset']-0x560)
        check('U+0x'+format(off,'x') in trade[name]['producer'],'volume description')
    expect(0x85dd0,0x79,0x71,0x78); expect(0x86130,0x7b,0x1a,-0x3d0)
    expect(0xa1cf8,0x79,0x20,0x70); expect(0xa1ff8,0x7b,0x32,0x70)
    expect(0x85dd8,0x71,0x72,0xa5); expect(0x86058,0x72,0x0a,-0x3bf)
    for a in [0x85f58,0x85f60,0x85f68,0x85f70,0x86060,0x86068,0x860c8,0x860d8]:
        code,regs,off,imm=op(a); check(code==0x7a and regs==0x0a and imm==0,'explicit zero '+hex(a))
    expect(0x860d0,0x7a,0x0a,-0x540,2)
    branch(0x86098,0x860a8); branch(0x860b8,0x860c8)
    expect(0x860a0,0xbf,0x03,0); expect(0x860c0,0xbf,0x54,0)
    expect(0x86958,0x72,0x01,0xa1,1)
    check(elf[0x1b6862:0x1b6865]==b'buy','name literal')
    expect(0x1489a8,0x7a,0x0a,-0xfd8,3)
    for name,event in fields.items():
        check(event['discriminator']==H(('event:'+name).encode())[:16], 'discriminator')
        off=8
        for f in event['fields']:
            check(f['wire_offset']==off,'wire offset '+f['field']); off+=f['wire_size']
        check(off==event['length'] and off+8==event['cpi_length'],'wire length')
    check([fields[n]['length'] for n in fields]==[390,144,232],'event sizes')
    check(len(trade)==36,'field count')
    for f in trade.values():
        code,regs,off,imm=op(f['producer_store_site'])
        check(code in (0x7b,0x7a,0x72,0x73) and regs&15==10 and off==f['object_offset']-0x560,'producer offset '+f['field'])
        code,regs,off,imm=op(f['load_site'])
        check((code==0x07 and off==0 and imm==f['object_offset']) if f['source_type']=='pubkey' else (code in (0x79,0x71) and off==f['object_offset']), 'serializer address/load '+f['field'])
    old=read('prior/proposed-trade.rs').decode(); start=old.index('pub fn buy(ctx:'); end=old.index('\npub fn buy_exact_quote',start)
    body=old[start:end].replace('if curve.creator_fee_bps>0{','if curve.creator_fee_bps>0 && (!normal || a.global.creator_fee_configurable){',1).replace('creator_fee_unclaimed:first_creator,','creator_fee_unclaimed:if normal{curve.creator_fee}else{first_creator},',1)
    new=old[:start]+body+old[end:]
    check(new.encode()==read('proposed/trade.rs'),'bounded source delta')
    diff=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='prior/proposed-trade.rs',tofile='proposed/trade.rs'))
    check(diff.encode()==read('minimal.diff'),'exact diff')
    print(json.dumps({'status':'pass','sealed_files':len(manifest),'assembly_rows':assembly_count,'event_lengths':[390,144,232],'verification':'static bytes, operands, field dataflow anchors and source delta; no execution equivalence claimed'},sort_keys=True))
if __name__=='__main__': verify()
