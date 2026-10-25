#!/usr/bin/env python3
"""Static package verification only. No Rust/SBF execution, builds or fixtures."""
import argparse, difflib, hashlib, json, pathlib, re, subprocess
P = pathlib.Path(__file__).resolve().parent
C = '476ecf0d31a8dae66dc6e2fb0a97f19d4f163e40'
def sha(b): return hashlib.sha256(b).hexdigest()
def blob(b): return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def read(n): return (P/n).read_bytes()
def obj(n): return json.loads(read(n))
def check(condition, message):
    if not condition: raise SystemExit('FAIL: '+message)
def instructions(n):
    result=[]
    for line in read(n).decode().splitlines():
        m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} ){7,15}[0-9a-f]{2})\s',line)
        if m: result.append((int(m[1],16),bytes.fromhex(m[2])))
    return result

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo',type=pathlib.Path)
    args=parser.parse_args()
    manifest=obj('manifest-sha256.json')
    actual=set()
    for f in P.rglob('*'):
        check(not f.is_symlink(),'symlink forbidden: '+str(f))
        if f.is_file() and f != P/'manifest-sha256.json': actual.add(f.relative_to(P).as_posix())
    check(actual==set(manifest),'exact manifest file set')
    for name,digest in manifest.items():
        check(not pathlib.PurePosixPath(name).is_absolute() and '..' not in pathlib.PurePosixPath(name).parts,'unsafe path')
        check(sha(read(name))==digest,'sha256 '+name)
    old=read('frozen/programs/pump/src/create_v2.rs').decode()
    new=read('proposed/programs/pump/src/create_v2.rs').decode()
    nested=read('proposed/programs/pump/src/nested_create.rs').decode()
    expected=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/create_v2.rs',tofile='b/programs/pump/src/create_v2.rs',n=3))
    expected+=''.join(difflib.unified_diff([],nested.splitlines(True),fromfile='/dev/null',tofile='b/programs/pump/src/nested_create.rs',n=3))
    check(read('source.patch').decode()==expected,'exact minimal unified patch')
    def context(s):return s[s.index('#[event_cpi]'):s.index('pub fn execute')]
    check(context(old)==context(new),'fixed context unchanged')
    def initialization(s):return s[s.index(' let fee='):s.index('\nconst CONTROL_DISCRIMINATOR:') if '\nconst CONTROL_DISCRIMINATOR:' in s else len(s)].strip()
    check(initialization(old)==initialization(new),'existing ordinary runtime/extension code unchanged')
    check(new.index('nested_create::walk')<new.index('require!(mint.owner==program.key'),'selection before owner')
    for file in ['frozen-source-map.json','proposed-source-map.json']:
        for row in obj(file):
            data=read(row['copy']);check(sha(data)==row['sha256'],'source-map hash')
            check(len(data.decode().splitlines())==row['lines'],'source-map lines')
            for region in row.get('regions',[])+row.get('functions',[]):
                check(1<=region['start']<=region['end']<=row['lines'],'source-map bounds')
    windows=obj('byte-source-map.json')
    for row in windows:
        data=read(row['binary']);check(len(data)==row['end']-row['start'],'window length')
        check(sha(data)==row['sha256'],'window sha')
        parts=[(a,b) for a,b in instructions(row['asm']) if row['start']<=a<row['end']]
        at=row['start'];combined=b''
        for a,b in parts:
            check(a==at,'assembly continuity');combined+=b;at+=len(b)
        check(at==row['end'] and combined==data,'assembly and bytes '+row['asm'])
    for row in obj('imports.json'):check(sha(read(row['output']))==row['sha256'],'import bytes')
    for row in obj('provenance.json'):
        if row.get('output') and not row.get('extraction'):
            data=read(row['output']);check(sha(data)==row['sha256'] and blob(data)==row['git_blob'],'full copied Git blob')
    for row in obj('literals.json'):
        check(read(row['output']).hex()==row['hex'] and sha(read(row['output']))==row['sha256'],'literal bytes')
    rebound=False
    if args.repo:
        def git(path):return subprocess.check_output(['git','-C',str(args.repo),'show',C+':'+path])
        originals={}
        for row in obj('provenance.json')+obj('current-artifact-identities.json'):
            data=git(row['path'])
            check(len(data)==row['size'] and sha(data)==row['sha256'] and blob(data)==row['git_blob'],'frozen full object '+row['path'])
            if row.get('output'):
                if row.get('extraction')=='PumpError and Global declarations only':
                    s=data.decode();pieces=[]
                    for name in ['pub enum PumpError','pub struct Global']:
                        a=s.index(name);b=s.index('\n}',a)+2;pieces.append(s[a:b])
                    check(read(row['output'])==('\n\n'.join(pieces)+'\n').encode(),'declaration extraction')
                else:check(read(row['output'])==data,'frozen copy')
            if row['path'] in ['evidence/original/pump/deployed.so','research/imported-lab/analysis/pump_fun/pump.asm']:
                originals[row['path']]=data
        binary=originals['evidence/original/pump/deployed.so'];assembly=originals['research/imported-lab/analysis/pump_fun/pump.asm'].decode().splitlines()
        for row in windows:
            check(binary[row['start']:row['end']]==read(row['binary']),'original window')
            lo,hi=row['source_lines'];source=assembly[lo-1:hi]
            check(int(source[0].split(':')[0].strip(),16)==row['start'],'upstream first source line')
            check(source[-1].strip() in read(row['asm']).decode(),'upstream last source line')
        for row in obj('literals.json'):check(binary[row['start']:row['end']]==read(row['output']),'original literal')
        rebound=True
    print(json.dumps(dict(status='PASS',files=len(actual),assembly_windows=len(windows),frozen_repo_rebound=rebound,
        checks=['exact manifest','patch equality','source maps','unchanged fixed context and initialization','bounded assembly bytes','copied Git blobs'],
        runtime_cases=0,builds=0,semantic_proof=False,promotion_approved=False),indent=2))
if __name__=='__main__': main()
