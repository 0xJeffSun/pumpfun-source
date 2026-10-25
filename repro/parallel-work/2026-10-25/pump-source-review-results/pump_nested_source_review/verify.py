#!/usr/bin/env python3
"""Portable static evidence verification; never builds or runs target code."""
from pathlib import Path
import argparse,difflib,hashlib,json,re,struct,subprocess
P=Path(__file__).resolve().parent
C='476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40'
def require(c,m):
    if not c:raise SystemExit('FAIL: '+m)
def data(n):return (P/n).read_bytes()
def obj(n):return json.loads(data(n))
def sha(b):return hashlib.sha256(b).hexdigest()
def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--repo');a=ap.parse_args()
    manifest=obj('manifest-sha256.json')
    actual=set()
    for p in P.rglob('*'):
        require(not p.is_symlink(),'symlink')
        if p.is_file() and p.name!='manifest-sha256.json':actual.add(p.relative_to(P).as_posix())
        elif p.is_file() and p!=P/'manifest-sha256.json':actual.add(p.relative_to(P).as_posix())
    require(actual==set(manifest),'file set')
    for n,h in manifest.items():
        require(not Path(n).is_absolute() and '..' not in Path(n).parts,'unsafe path')
        require(sha(data(n))==h,'hash '+n)
    for r in obj('inputs.json'):
        require(len(data(r['copy']))==r['size'] and sha(data(r['copy']))==r['sha256'],'input '+r['copy'])
    old=data('inputs/checkpoint/programs/pump/src/create_v2.rs').decode()
    new=data('inputs/hypothesis/proposed/programs/pump/src/create_v2.rs').decode()
    nested=data('inputs/hypothesis/proposed/programs/pump/src/nested_create.rs').decode()
    patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/create_v2.rs',tofile='b/programs/pump/src/create_v2.rs'))
    patch+=''.join(difflib.unified_diff([],nested.splitlines(True),fromfile='/dev/null',tofile='b/programs/pump/src/nested_create.rs'))
    require(patch==data('inputs/hypothesis/source.patch').decode(),'proposal patch')
    require(old[old.index('#[event_cpi]'):old.index('pub fn execute')]==new[new.index('#[event_cpi]'):new.index('pub fn execute')],'context preservation')
    require(old[old.index(' let fee='):old.index('\nconst CONTROL_DISCRIMINATOR:')].strip()==new[new.index(' let fee='):].strip(),'ordinary suffix preservation')
    require(new.index('nested_create::walk')<new.index('require!(mint.owner==program.key'),'selection ordering')
    curve=data('inputs/checkpoint/programs/pump/src/trade_types.rs').decode().split('impl anchor_lang::Discriminator')[0]
    fields=set(re.findall(r'pub (\w+):',curve))
    initializer=nested.split('let mut curve = BondingCurve {')[1].split('};')[0]
    require(fields==set(re.findall(r'\b(\w+):(?!:)',initializer)),'complete typed initializer')
    require([int(x) for x in re.findall(r'if length >= (\d+)',nested)]==[73,74,75,107,116,117,133,158],'decoder thresholds')
    require('pub(super) fn walk' in nested and 'pub(super) fn control_entry' in nested,'visibility')
    rows=obj('windows.json');instructions={}
    for r in rows:
        at=r['start'];raw=b''
        for line in data(r['asm']).decode().splitlines():
            m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} ){7,15}[0-9a-f]{2})\s',line)
            require(m is not None,'assembly syntax')
            address=int(m[1],16);b=bytes.fromhex(m[2]);require(address==at,'continuity')
            require(len(b) in (8,16),'instruction length');instructions[address]=b;at+=len(b);raw+=b
        require(at==r['end'] and raw==data(r['binary']),'assembly bytes')
    for site,target in [(0x18730,0x19ec8),(0x187e8,0x60a80),(0x18f00,0x19ec8),(0x19048,0x60ee0),(0x63978,0x61348),(0x639d8,0x62aa0),(0x63a48,0x617e8),(0x66110,0x65238),(0x65d78,0x64888),(0x65dd0,0x64888),(0x65e18,0x645f8)]:
        b=instructions[site];require(b[:2]==b'\x85\x10','call opcode');require(site+8+8*struct.unpack('<i',b[4:8])[0]==target,'relative target')
    rebound=False
    if a.repo:
        originals={}
        for r in obj('originals.json'):
            b=subprocess.check_output(['git','-C',a.repo,'show',C+':'+r['path']]);require(len(b)==r['size'] and sha(b)==r['sha256'],'original '+r['path']);originals[r['path']]=b
        elf=originals['evidence/original/pump/deployed.so'];asm=originals['research/imported-lab/analysis/pump_fun/pump.asm'].splitlines(True)
        for r in rows:
            require(elf[r['start']:r['end']]==data(r['binary']),'ELF rebound')
            lo,hi=r['source_lines'];require(b''.join(asm[lo-1:hi])==data(r['asm']),'assembly rebound')
        for r in obj('inputs.json'):
            if r['origin'].startswith(C+':') and r['copy'].startswith('inputs/checkpoint/'):
                require(subprocess.check_output(['git','-C',a.repo,'show',r['origin']])==data(r['copy']),'checkpoint source')
        rebound=True
    print(json.dumps(dict(status='PASS',files=len(actual),windows=len(rows),relative_calls=11,checkpoint_rebound=rebound,builds=0,target_executions=0,semantic_proof=False)))
if __name__=='__main__':main()
