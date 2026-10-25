#!/usr/bin/env python3
"""Static byte reader; never builds, loads, simulates or executes a target."""
from pathlib import Path
import hashlib, json, struct
from elf_reader import Elf
ROOT = Path(__file__).resolve().parent
H = lambda b: hashlib.sha256(b).hexdigest()

def instructions(e, start, end):
    out = []
    p = start
    while p < end:
        op, regs, off, imm = struct.unpack_from('<BBhi', e.b, p)
        n = 16 if op == 24 else 8
        row = dict(pc=p, opcode=op, dst=regs & 15, src=regs >> 4,
                   offset_signed=off, immediate_signed=imm, raw_hex=e.b[p:p+n].hex(), size=n)
        if p in e.relocations: row['relocation'] = e.relocations[p]
        if p in e.calls:
            row['target'] = p + 8 + 8 * imm
            assert row['target'] == e.calls[p]
        if op & 7 in (5, 6) and op not in (0x85, 0x8d, 0x95):
            row['branch'] = p + 8 + 8 * off
        if op == 24: row['value_u64'] = (imm & 0xffffffff) | (struct.unpack_from('<I', e.b, p+12)[0] << 32)
        out.append(row)
        p += n
    assert p == end
    return out

def run():
    o, c, s = [Elf(ROOT/'inputs'/n) for n in ('original.so','candidate.so','symbols.so')]
    assert H(o.b) == '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'
    assert H(c.b) == '8ff12f9c580baa51631a1802d5dc0a936e837f5de4fc1b88b71fd57bd2a7450b'
    assert H(s.b) == 'ec8578aa62c31fd1eb093e01b4441d5a9b7a54ef08357960e7954e4df90a187b'
    assert c.b[c.lo:c.hi] == s.b[s.lo:s.hi]
    catalog = json.loads((ROOT/'inputs/selected-catalog.json').read_text())
    windows = {}
    for side, e in [('original',o),('candidate',c)]:
        windows[side] = []
        for r in catalog[side+'_rows']:
            a,b = r['start'],r['end']
            assert H(e.b[a:b]) == r['raw_sha256']
            assert H(e.normalized[a:b]) == r['normalized_sha256']
            names = r.get('names',[])
            if side == 'candidate':
                actual = {f['name'] for f in s.funcs if f['start'] == a and f['size'] == b-a}
                assert set(names) <= actual
            windows[side].append(dict(start=a,end=b,raw_sha256=H(e.b[a:b]),
                normalized_sha256=H(e.normalized[a:b]),names=names,
                instructions=instructions(e,a,b)))
    ins = {r['pc']:r for r in instructions(o,231576,234096)}
    def check(pc, **fields):
        for k,v in fields.items(): assert ins[pc][k] == v, (pc,k,v,ins[pc])
    check(231600,opcode=0x71,src=4,offset_signed=72)
    check(231608,branch=231648,immediate_signed=0)
    check(231648,branch=233048,immediate_signed=0)
    check(231784,target=752280); check(232048,target=752280)
    check(232056,opcode=7,dst=8,immediate_signed=-1)
    check(232072,opcode=0x27,immediate_signed=48)
    check(232160,opcode=0x79,src=9,offset_signed=0)
    check(232272,target=796464); check(232296,branch=232408)
    check(232304,opcode=0x79,src=9,offset_signed=24)
    check(232336,target=796464); check(232360,branch=233568)
    check(232728,immediate_signed=2006); check(232984,target=709768)
    check(233440,immediate_signed=6013); check(233592,target=732088)
    check(233640,branch=233656); check(233664,opcode=0xa5,immediate_signed=287,branch=233680)
    check(233776,target=709368); check(233816,opcode=0x79,offset_signed=279)
    check(233824,branch=233680,immediate_signed=0); check(233968,immediate_signed=6033)
    check(234072,opcode=7,immediate_signed=-1); check(234080,opcode=0x7b,dst=6,offset_signed=0)
    # Every CFG edge remains inside the inferred complete window. No indirect calls.
    assert all(231576 <= r['branch'] < 234096 for r in ins.values() if 'branch' in r)
    assert not any(r['opcode']==0x8d for r in ins.values())
    exits = [r['pc'] for r in ins.values() if r['opcode']==0x95]
    assert exits == [233560]
    pairs=[]
    rows={r['start']:r for r in catalog['original_rows']}
    for r in rows.values():
        for m in r['candidate_matches']:
            a,b,x,y=r['start'],r['end'],m['candidate_start'],m['candidate_end']
            assert o.normalized[a:b] == c.normalized[x:y]
            pairs.append(dict(original=[a,b],candidate=[x,y],raw_equal=o.b[a:b]==c.b[x:y],
                normalized_equal=True,names=m['candidate_names'],
                limitation='Immediate body match; not recursive call/data or historical-source closure.'))
    calls=[dict(pc=p,target=t) for p,t in o.calls.items() if 231576<=p<234096]
    assert len(calls)==17 and len({v['target'] for v in calls})==12
    # Literal descriptors and program IDs used by the two derivations.
    data=[]
    for a,n,label in [(803585,14,'authority_seed'),(802316,4,'pool_seed'),
                      (806605,32,'pump_program'),(806716,32,'amm_program'),
                      (800576,32,'legacy_quote'),(804029,54,'source_path'),
                      (802404,4,'ConstraintSeeds_variant'),(802452,4,'NotEnoughRemainingAccounts_variant'),
                      (802484,4,'PoolCreatorFeesNotSwept_variant')]:
        data.append(dict(address=a,bytes=n,label=label,raw_hex=o.b[a:a+n].hex(),sha256=H(o.b[a:a+n])))
    assert o.b[803585:803599]==b'pool-authority' and o.b[802316:802320]==b'pool'
    assert [struct.unpack_from('<I',o.b,p)[0] for p in (802404,802452,802484)] == [2006,13,33]
    def base58(raw):
        alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
        v=int.from_bytes(raw,'big'); out=''
        while v:
            v,r=divmod(v,58); out=alphabet[r]+out
        return '1'*(len(raw)-len(raw.lstrip(b'\0')))+out
    assert base58(o.b[806605:806637])=='6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'
    assert base58(o.b[806716:806748])=='pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'
    assert base58(o.b[800576:800608])=='So11111111111111111111111111111111111111112'
    for pc,value in [(231712,32),(231720,14),(231760,2),(231944,32),(231952,32),
                     (231960,32),(231968,2),(231976,4),(231984,0),(232024,5)]:
        check(pc,immediate_signed=value)
    # Deserialize wire byte48 (the IDL complete bool) into in-memory byte72.
    de={r['pc']:r for r in instructions(o,538040,539488)}
    assert de[538712]['offset_signed']==48 and de[538960]['offset_signed']==-152
    assert de[539392]['offset_signed']==-152 and de[539400]['offset_signed']==72
    idl=json.loads((ROOT/'inputs/source/programs/pump-fees/idls/pump.json').read_text())
    curve=next(t for t in idl['types'] if t['name']=='BondingCurve')
    assert curve['type']['fields'][5]=={'name':'complete','type':'bool'}
    # Call-site ABI and replacement of Context.remaining_accounts (not allocation).
    caller={r['pc']:r for r in instructions(o,193400,199072)}
    assert caller[195040]['target']==231576
    for pc,off in [(194856,24),(194864,16),(194872,192),(194968,-4096),(194992,-4088),(195368,24),(195376,16)]:
        assert caller[pc]['offset_signed']==off
    assert caller[195008]['immediate_signed']==656
    assert caller[195056]['branch']==195352
    return dict(input_sha256={'original':H(o.b),'candidate':H(c.b),'symbols':H(s.b)},
        whole_file_equal=o.b==c.b,windows=windows,callee_body_pairs=pairs,direct_calls=calls,
        literals=data,exits=exits,scope='Complete preprocessing window, legacy caller, decoder witness and immediate callee bodies only',
        source_status='uncompiled separate-file hypothesis; exact historical spelling and recursive data closure unresolved',
        builds=0,target_executions=0,new_fixtures=0)

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');a=p.parse_args()
    data=(json.dumps(run(),indent=2,sort_keys=True)+'\n').encode()
    f=ROOT/'static-evidence.json'
    if a.check: assert f.read_bytes()==data
    else: f.write_bytes(data)
    print('PASS: complete static window, exact caller/decoder witnesses and immediate callee-body comparisons')
