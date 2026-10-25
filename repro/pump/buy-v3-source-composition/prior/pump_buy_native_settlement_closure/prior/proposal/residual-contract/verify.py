#!/usr/bin/env python3
"""Offline evidence verification only. No target/source execution or fixtures."""
import hashlib,json,pathlib,re,struct
P=pathlib.Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def read(n): return (P/n).read_bytes()
def check(ok,msg):
    if not ok: raise ValueError(msg)
def main():
    manifest=json.loads(read('manifest.json'))
    actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file()}
    check(actual==set(manifest)|{'manifest.json'},'inventory mismatch')
    for n,h in manifest.items(): check(sha(read(n))==h,'seal: '+n)
    prov=json.loads(read('provenance.json'))
    for r in prov:
        b=read(r['file']);check(sha(b)==r['sha256'],'slice '+r['file'])
        check(len(b)==r['byte_range'][1]-r['byte_range'][0],'slice size')
        if r['byte_range']==[0,r['full_size']]:
            check(sha(b)==r['full_sha256'],'whole sha')
            check(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'blob')
    elf=read('evidence/original.so'); check(elf[:6]==b'\x7fELF\x02\x01','ELF64 LE')
    shoff=struct.unpack_from('<Q',elf,40)[0]; sz,n=struct.unpack_from('<HH',elf,58)
    sections=[struct.unpack_from('<IIQQQQIIQQ',elf,shoff+i*sz) for i in range(n)]
    def at(a,k):
        for s in sections:
            if s[1]!=8 and s[3]<=a and a+k<=s[3]+s[5]:return elf[s[4]+a-s[3]:s[4]+a-s[3]+k]
        raise ValueError('unmapped address '+hex(a))
    instructions={}; count=0
    for p in P.rglob('*.asm'):
        for line in p.read_text().splitlines():
            m=re.match(r'\s*([0-9a-f]+): ((?:[0-9a-f]{2} )+)',line)
            if not m:continue
            a=int(m[1],16);b=bytes.fromhex(m[2]);check(at(a,len(b))==b,'instruction '+hex(a));instructions[a]=b;count+=1
    for e in json.loads(read('critical-edges.json')):
        a=int(e['pc'],16);v=instructions[a]
        if e['kind']=='call':check(v[:2]==b'\x85\x10','call opcode');d=struct.unpack_from('<i',v,4)[0]
        else:check(v[0]&7 in (5,6),'branch opcode');d=struct.unpack_from('<h',v,2)[0]
        check(a+8+8*d==int(e['target'],16),'edge '+hex(a))
    computed=[]
    for a,v in sorted(instructions.items()):
        if v[:2]==b'\x85\x10':
            d=struct.unpack_from('<i',v,4)[0]
            computed.append({'pc':hex(a),'target':None if d==-1 else hex(a+8+8*d),'kind':'import-placeholder' if d==-1 else 'direct'})
    check(computed==json.loads(read('call-edges.json')),'all edge ledger')
    check(at(0x1b7dd3,18)==b'Instruction: BuyV3','instruction identity literal')
    check(at(0x1b6862,3)==b'buy','event instruction string')
    for name,pc in [('CompleteEvent',0x86b90),('PostCompleteBuyEvent',0x163c98)]:
        v=instructions[pc]; disc=v[4:8]+v[12:16]
        check(disc==hashlib.sha256(('event:'+name).encode()).digest()[:8],name+' discriminator')
        check(list(disc)==json.loads(read('evidence/'+name+'-event.json'))['discriminator'],'IDL discriminator')
    for seal,member,copy in json.loads(read('prior-members.json')):
        check(json.loads(read(seal))[member]==sha(read(copy)),'prior seal '+copy)
    print(json.dumps({'status':'pass','files':len(manifest),'instruction_rows':count,'critical_edges':len(json.loads(read('critical-edges.json'))),'whole_original_sha256':sha(elf),'scope':'offline bytes, identity, edges and seals; no semantic or runtime proof'},indent=2))
if __name__=='__main__':main()
