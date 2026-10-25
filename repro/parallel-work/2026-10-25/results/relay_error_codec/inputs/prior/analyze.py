#!/usr/bin/env python3
"""Static byte decoder and assertion ledger only. Never executes SBF or Rust."""
import hashlib, json, struct
from pathlib import Path
ROOT = Path(__file__).resolve().parent

def sha(b): return hashlib.sha256(b).hexdigest()
def derive():
    b = (ROOT/'inputs/deployed.so').read_bytes()
    assert sha(b) == '367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
    prior = json.loads((ROOT/'inputs/prior-codecs.json').read_text())
    idl = json.loads((ROOT/'inputs/idl.json').read_text())
    windows = json.loads((ROOT/'inputs/prior-windows.json').read_text())
    def ins(pc):
        op, regs, off, imm = struct.unpack_from('<BBhi', b, pc)
        n = 16 if op == 0x18 else 8
        r = dict(pc=pc, raw=b[pc:pc+n].hex(), opcode=op, dst=regs&15, src=regs>>4, offset=off, immediate=imm)
        if n == 16: r['u64'] = (imm & 0xffffffff) | (struct.unpack_from('<I',b,pc+12)[0]<<32)
        if op == 0x85 and r['src'] == 1: r['call_target'] = pc+8+imm*8
        if op & 7 == 5 and op not in (0x85,0x95): r['branch_target'] = pc+8+off*8
        return r
    def decode(a,z):
        out=[]
        while a<z:
            q=ins(a);out.append(q);a+=len(bytes.fromhex(q['raw']))
        assert a==z
        return out
    claims=[]
    def check(pc, **expected):
        q=ins(pc)
        for k,v in expected.items(): assert q[k]==v,(pc,k,q[k],v)
        claims.append(dict(pc=pc,expected=expected,raw=q['raw']))
    specs = [
        # name, lower-bound checks (subtract pc, branch pc, amount,width), state branch, error entry, state path, result tag offset
        ('DebouncerV1',[(506424,506432,10,32),(506704,506712,42,32),(506760,506768,74,8)],506392,506448,507208,73),
        ('DistributionV1',[(508680,508688,10,32),(508960,508968,42,32),(509024,509032,74,16),(509040,509048,90,8)],508648,508704,509568,89),
        ('EpochTrackerV1',[(511040,511048,10,32),(511320,511328,42,32),(511376,511384,74,16)],511008,511064,511856,81),
        ('SwapReceiptV1',[(514840,514856,8,33),(514912,514920,41,8)],None,514936,None,0),
    ]
    rows=[]; ranges=[]
    for name,bounds,statepc,err,statepath,tagoff in specs:
        old=next(x for x in prior['accounts'] if x['name']==name)
        fact=old['binary'];a,z=fact['wrapper'];u,v=fact['body']
        wrapper=decode(a,z);body=decode(u,v)
        assert sha(b[a:z])==fact['wrapper_sha256'] and sha(b[u:v])==fact['body_sha256']
        discriminator=next(x['discriminator'] for x in idl['accounts'] if x['name']==name)
        check(a+16,opcode=0xa5,immediate=8)
        check(fact['discriminator_pc'],opcode=0x18,u64=int.from_bytes(bytes(discriminator),'little'))
        check(fact['success_call_pc'],opcode=0x85,call_target=u)
        check(u+24,opcode=0xa5,immediate=8,branch_target=v-32)
        check(v-8,opcode=0x85,call_target=730592)
        for sub,branch,amount,width in bounds:
            check(sub,opcode=0x07,immediate=-amount)
            check(branch,opcode=0xa5,immediate=width,branch_target=err)
        if statepc:
            check(u+32,opcode=0x15,immediate=8,branch_target=err)
            check(u+40,opcode=0x15,immediate=9,branch_target=err)
            check(u+72,opcode=0x71,offset=9)
            check(statepc,opcode=0x15,immediate=0)
            check(statepc+8,opcode=0x55,immediate=1,branch_target=statepath)
            check(statepath+160,opcode=0x85,call_target=712408)
            check(statepath+168,opcode=0xb7,immediate=20)
            check(statepath+184,opcode=0x85,call_target=30840)
            check(statepath+192,opcode=0x05,branch_target=err+24)
        else:
            check(514848,opcode=0x15,immediate=0,branch_target=err)
        check(err,opcode=0x18,u64=772768)
        check(err+16,opcode=0x85,call_target=705216)
        codepc = err+56 if statepc else err+48
        check(codepc,opcode=0xb7,immediate=3003)
        check(codepc+8,opcode=0x85,call_target=665312)
        # Complete caller-side error paths, including unresolved indirect cleanup.
        shortentry=ins(a+16)['branch_target']
        check(shortentry+16,opcode=0xb7,immediate=3001)
        check(shortentry+24,opcode=0x85,call_target=665312)
        mismatch=next(q for q in wrapper if q['opcode']==0x62 and q['immediate']==3002)
        check(mismatch['pc'],opcode=0x62,immediate=3002)
        ranges += [(name+'_checked',a,z),(name+'_body',u,v)]
        rows.append(dict(name=name,discriminator=discriminator,minimum_bytes=old['fixed_encoded_size'],fields=old['fields'],wrapper=[a,z],body=[u,v],wrapper_sha256=sha(b[a:z]),body_sha256=sha(b[u:v]),lower_bounds=[list(x) for x in bounds],state_branches=[statepc,statepc+8] if statepc else [],state_error_entry=statepath,short_body_entry=err,short_discriminator_entry=shortentry,mismatch_code_store=mismatch['pc'],result_error_tag_offset=tagoff,result_error_tag=2 if statepc else 1,body_direct_calls=[q for q in body if 'call_target' in q],body_indirect_calls=[q for q in body if q['opcode']==0x8d]))
    # Actual numeric error builder: allocation, field stores and return object.
    for pc,e in [(665624,dict(opcode=0xb7,immediate=160)),(665632,dict(opcode=0xb7,immediate=8)),(665640,dict(opcode=0x85,call_target=566472)),(665680,dict(opcode=0x7a,dst=0,offset=0,immediate=2)),(665784,dict(opcode=0x63,dst=0,src=7,offset=152)),(665792,dict(opcode=0x72,dst=0,offset=80,immediate=2)),(665800,dict(opcode=0x7b,dst=6,src=0,offset=8)),(665808,dict(opcode=0x7a,dst=6,offset=0,immediate=0))]: check(pc,**e)
    for start in [30840,31632,566472,652392,662256,665312,665904,705216,707248,712224,712256,712408,730592]:
        w=next(w for w in windows if w['start']==start)
        assert sha(b[start:w['end']])==w['sha256']
        ranges.append(('helper_'+str(start),start,w['end']))
    raw=[]
    for label,a,z in ranges:
        raw.append(dict(label=label,range=[a,z],sha256=sha(b[a:z]),instructions=decode(a,z)))
    # Do not interpret unrelocated pointer tables as final runtime pointers.
    data=[]
    for a,z,role in [(754648,754652,'mismatch numeric constant'),(757597,757832,'four state paths plus whitelist path'),(772768,772792,'short-input helper descriptor'),(773288,773312,'invalid-state formatting descriptor'),(773776,773896,'body panic diagnostic descriptors')]:
        data.append(dict(range=[a,z],role=role,sha256=sha(b[a:z]),raw=b[a:z].hex()))
    assert int.from_bytes(b[754648:754652],'little')==3002
    return dict(schema=1,range_convention='decimal half-open ELF offsets; not recovered source boundaries',binary_sha256=sha(b),accounts=rows,assertions=claims,data=data,complete_windows=raw)

if __name__=='__main__':
    evidence=derive()
    (ROOT/'static-evidence.json').write_text(json.dumps(evidence,indent=2)+'\n')
    lines=[]
    for w in evidence['complete_windows']:
        lines.append(f"\n{w['label']} {w['range']} sha256={w['sha256']}")
        for q in w['instructions']:
            tail=' '.join(f'{k}={q[k]}' for k in ['u64','call_target','branch_target'] if k in q)
            lines.append(f"{q['pc']}: {q['raw']} op={q['opcode']:02x} dst={q['dst']} src={q['src']} off={q['offset']} imm={q['immediate']} {tail}")
    (ROOT/'complete-windows.txt').write_text('\n'.join(lines)+'\n')
