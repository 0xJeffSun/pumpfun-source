#!/usr/bin/env python3
"""Portable sealed-evidence verification only. Never runs program code or transactions."""
from pathlib import Path
import hashlib,json,re,struct
ROOT=Path(__file__).resolve().parent

def digest(data):return hashlib.sha256(data).hexdigest()
def read(path):return (ROOT/path).read_bytes()
def obj(path):return json.loads(read(path))
def check(condition,message):
    if not condition:raise ValueError(message)

def main():
    manifest=obj('manifest-sha256.json')
    files={p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file()}
    check(files==set(manifest)|{'manifest-sha256.json'},'sealed file set mismatch')
    for path,h in manifest.items():check(digest(read(path))==h,'SHA256 '+path)
    p=obj('provenance.json');r=obj('result.json')
    for entry in p['inputs']:
        b=read(entry['path'])
        check(len(b)==entry['size'] and digest(b)==entry['sha256'],'input '+entry['path'])
        check(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==entry['git_blob'],'Git blob '+entry['path'])
    prior=obj('prior/manifest-sha256.json')
    check(digest(read('prior/manifest-sha256.json'))==p['reviewed_packages'][0]['manifest_sha256'],'prior seal')
    for path in ['REPORT.md','result.json','provenance.json','original-ranges.json']:
        check(digest(read('prior/'+path))==prior[path],'prior file '+path)
    windows={w['name']:w for w in p['windows']};count=0;edges=0
    for w in windows.values():
        b=read('bytes/'+w['name']+'.bin');s=w['start'];e=w['end']
        check(len(b)==e-s and digest(b)==w['sha256'],'window '+w['name'])
        addresses=set(w['addresses']);observed=[];calls=[]
        for line in read('asm/'+w['name']+'.asm').decode().splitlines():
            m=re.match(r'^([0-9a-f]+): ((?:[0-9a-f]{2} )*[0-9a-f]{2})  ',line)
            check(m is not None,'ASM format');a=int(m[1],16);raw=bytes.fromhex(m[2]);observed.append(a)
            check(b[a-s:a-s+len(raw)]==raw,'ASM bytes '+hex(a));count+=1
            op,rs,off,imm=struct.unpack('<BBhi',raw[:8]);n=a+(16 if op==0x18 else 8)
            check(len(raw)==n-a,'instruction width '+hex(a))
            if op==0x85 and rs==0x10:
                t=a+8+imm*8;calls.append({'site':a,'target':t});edges+=1
                check(f'direct target {t:#x}' in line,'call '+hex(a))
            branch=op&7 in (5,6) and op not in (0x85,0x95,0x8d)
            if branch:
                t=a+8+off*8
                check(f'branch {t:#x}' in line,'branch '+hex(a))
            # Exact closure applies to inferred helper CFGs, not deliberately sliced caller windows.
            if w['name'] not in ('route_arithmetic','route_buy_commit','curve_body'):
                if branch:check(t in addresses,'CFG branch '+hex(a))
                if op not in (0x95,0x05):check(n in addresses,'CFG fallthrough '+hex(a))
        check(observed==w['addresses'],'address set '+w['name'])
        check(calls==w['calls'],'call edge list '+w['name'])
    for assertion in r['assertions']:
        w=windows[assertion['window']];offset=assertion['address']-w['start']
        actual=list(struct.unpack('<BBhi',read('bytes/'+w['name']+'.bin')[offset:offset+8]))
        check(actual==assertion['instruction'],'semantic anchor '+hex(assertion['address']))
    for d in p['data_ranges']:
        check(len(read(d['path']))==d['end']-d['start'] and digest(read(d['path']))==d['sha256'],'data '+d['path'])
        for site in d['reference_sites']:
            w=next(w for w in windows.values() if w['start']<=site<w['end']);b=read('bytes/'+w['name']+'.bin');o=site-w['start']
            check(b[o]==0x18,'data reference opcode')
            v=struct.unpack('<I',b[o+4:o+8])[0]|(struct.unpack('<I',b[o+12:o+16])[0]<<32)
            check(v==d['start'],'data reference address')
    print(json.dumps({'status':'PASS','sealed_files':len(manifest),'instruction_records_checked':count,'direct_call_records_checked':edges,'semantic_anchors_checked':len(r['assertions']),'whole_git_inputs_checked':len(p['inputs']),'program_execution':False,'semantic_closure':False,'manifest_sha256':digest(read('manifest-sha256.json'))},sort_keys=True))
if __name__=='__main__':main()
