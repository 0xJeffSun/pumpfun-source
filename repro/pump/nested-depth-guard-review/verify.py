"""Portable static/source/saved-signature verification; no build or program execution."""
from pathlib import Path
import argparse,bisect,difflib,hashlib,json,re,struct,sys,tarfile,tomllib
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
from elf_reader import Elf
from verify_receipts import run as saved_receipts
sha=lambda b:hashlib.sha256(b).hexdigest()
def obj(n):return json.loads((P/n).read_text())
def check(c,m):
    if not c:raise AssertionError(m)
def manifest(root):
    j=json.loads((root/'manifest-sha256.json').read_text());actual=[]
    for p in root.rglob('*'):
        check(not p.is_symlink(),'symlink')
        if p.is_file()and p!=root/'manifest-sha256.json':
            check(not p.name.endswith('-keypair.json'),'excluded generated keypair')
            actual.append(p.relative_to(root).as_posix())
    check(set(actual)==set(j),'manifest file set')
    for n,h in j.items():check(sha((root/n).read_bytes())==h,'manifest '+n)
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);a=ap.parse_args()
    manifest(P);manifest(P/'retained-focused-01')
    before=obj('before-source-map.json');after=obj('proposed-source-map.json');check(len(before)==len(after)==37,'source count')
    n='programs/pump/src/nested_create.rs';old=(P/'before-source'/n).read_text();new=(P/'proposed'/n).read_text()
    oldline='    require!(depth <= g.max_curve_depth.min(5), PumpError::CurveDepthExceeded);'
    newline='    require_gte!(g.max_curve_depth.min(5), depth, PumpError::CurveDepthExceeded);'
    check(old.count(oldline)==1 and new==old.replace(oldline,newline),'exact one-line correction')
    check({k for k in before if before[k]!=after[k]}=={n},'source change set')
    for k,h in before.items():check(sha((P/'before-source'/k).read_bytes())==h,'before source '+k)
    check(sha(new.encode())==after[n],'after source hash')
    patch=''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+n,tofile='b/'+n))
    check(patch==(P/'depth-guard.patch').read_text(),'exact patch')
    report=obj('prior-build/build-01/build-comparison.json');attempt=obj('prior-build/build-01/build-attempt.json')
    check(attempt['returncode']==0 and attempt['source_unchanged'],'retained clean build')
    check(report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256'],'retained build source before/after')
    check({k[k.index('programs/pump/'):]:h for k,h in report['source_sha256'].items()}==before,'compiled before source')
    o=Elf(P/'inputs/original.so');c=Elf(P/'inputs/failed-symbols.so')
    check(sha(o.b)=='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d','original identity')
    candidate=sha((P/'inputs/failed-candidate.so').read_bytes());check(candidate=='3c5feecfc6a009c4215169aef1d1e550abd613c48ff395e9d0d210ee5cfcf957','failed candidate identity')
    check(report['comparison']['candidate_sha256']==candidate,'compiled candidate')
    phases=obj('prior-build/toolchain-phases.json')
    check(phases['candidate']['sha256']==candidate and phases['compiled_unstripped']['sha256']==sha(c.b),'separate compile/strip artifacts')
    idl=obj('inputs/pump.json');types={t['name']:t['type']for t in idl['types']}
    check(next(f['type']for f in types['Global']['fields']if f['name']=='max_curve_depth')=='u8','Global cap type')
    check(next(f['type']for f in types['BondingCurve']['fields']if f['name']=='depth')=='u8','curve depth type')
    windows=obj('windows.json')
    for w in windows:
        start,end=w['start'],w['end'];check(o.entries[bisect.bisect_right(o.entries,start)]==end,'complete original function boundary')
        check(o.b[start:end]==(P/w['bin']).read_bytes()and sha(o.b[start:end])==w['sha256'],'original full body')
        check(sha(o.normalized[start:end])==w['normalized_sha256'],'normalized body')
        check(o.callsites(start,end-start)==w['actual_calls']and o.pattern(start,end-start)==w['relocations'],'actual direct calls/data references')
        at=start;raw=b''
        for line in (P/w['asm']).read_text().splitlines():
            m=re.match(r'\s*([0-9a-f]+):\s*((?:[0-9a-f]{2} ){7,15}[0-9a-f]{2})\s',line);check(m is not None,'assembly syntax');b=bytes.fromhex(m[2]);check(int(m[1],16)==at,'assembly continuity');at+=len(b);raw+=b
        check(at==end and raw==o.b[start:end],'assembly rebound')
        matches=[f for f in c.funcs if f['size']==end-start and c.normalized[f['start']:f['start']+f['size']]==o.normalized[start:end]]
        check(matches==w['complete_candidate_normalized_matches'],'symbol located full-body matches')
    calls={0x60b08:0x157380,0x60b98:0x15de88,0x60bd0:0x157380,0x60c60:0x15de88,0x60cb8:0x1ace18,0x60d80:0x19bb30,0x60e78:0x19bb30,0x60eb0:0x878,0x187e8:0x60a80}
    check(all(o.calls[k]==v for k,v in calls.items()),'actual depth call graph')
    check([k for k,v in o.calls.items()if v==0x60a80]==[0x187e8],'complete direct depth caller set')
    ins=lambda p:struct.unpack_from('<BBhi',o.b,p)
    expected={0x60a88:(0x71,0x27,0x98,0),0x60a90:(0x07,0x07,0,1),0x60aa0:(0x57,0x01,0,255),0x60aa8:(0x5d,0x71,32,0),0x60ab0:(0x71,0x38,0x430,0),0x60ab8:(0xa5,8,1,5),0x60ac0:(0xb7,8,0,5),0x60ad8:(0xad,0x18,1,0),0x60e30:(0x62,0x0a,-128,6105),0x60d38:(0x62,0x0a,-128,6024),0x60e40:(0x62,0x0a,-256,62),0x60ea0:(0xbf,0x84,0,0),0x60ea8:(0xbf,0x75,0,0),0x878:(0xbf,0x59,0,0),0x880:(0xbf,0x47,0,0),0x970:(0x57,1,0,255),0xb28:(0x57,1,0,255),0x19bba8:(0x7a,6,0,0)}
    for k,v in expected.items():check(ins(k)==v,'operand fact '+hex(k))
    # Enumerate the actual unsigned domain mathematically; not program execution.
    for cap in range(256):
        actual=cap if cap<5 else 5
        for depth in range(1,256):check((actual<depth)==(not (depth<=min(cap,5))),'same guard domain')
    check(struct.unpack_from('<I',o.b,0x1b5ec4)[0]==105 and struct.unpack_from('<I',o.b,0x1b5efc)[0]==24,'original enum literals')
    check(o.b[0x1b6ed6:0x1b6ed6+31]==b'programs/pump/src/pump_quote.rs','original error source coordinate')
    for row in obj('literals.json'):
        check(o.b[row['address']:row['address']+row['bytes']].hex()==row['hex'],'literal '+row['name'])
    for desc,ptr,length in [(0x1be6c0,0x1b9c83,106),(0x1bed78,0x1ba6ef,6),(0x1bed88,0x1ba6f5,7)]:
        check(struct.unpack_from('<QQ',o.b,desc)==(ptr<<32,length),'consumed error/log descriptor')
    lock=tomllib.loads((P/'before-source/programs/pump/Cargo.lock').read_text())
    for d in obj('dependencies.json'):
        crate=d['name']+'-'+d['version'];p=P/'inputs/dependencies'/(crate+'.crate');check(sha(p.read_bytes())==d['archive_sha256'],'locked archive')
        check(next(x for x in lock['package']if x['name']==d['name']and x['version']==d['version'])['checksum']==d['archive_sha256'],'lock checksum')
        with tarfile.open(p)as t:
            for name in d['files']:check(t.extractfile(crate+'/'+name).read()==(P/'inputs/dependencies'/crate/name).read_bytes(),'public archive source')
    macro=(P/'inputs/dependencies/anchor-lang-0.31.1/src/lib.rs').read_text().split('macro_rules! require_gte {')[1].split('\n}\n',1)[0]
    check('if $value1 < $value2' in macro and 'error!($error_code).with_values(($value1, $value2))' in macro,'locked macro operand order')
    result=saved_receipts()
    j=json.loads(__import__('gzip').decompress((P/'retained-focused-01/focused-01.json.gz').read_bytes()))
    check(j['provenance']['compiled_candidate_binding']['actual_source_sha256']==report['source_sha256'],'fresh receipt actual source binding')
    check(j['provenance']['compiled_candidate_binding']['report_sha256']==sha((P/'prior-build/build-01/build-comparison.json').read_bytes()),'receipt report binding')
    if a.repo:
        for k,v in obj('original-input-identities.json').items():check(sha((a.repo/k).read_bytes())==v['sha256'],'repository evidence rebound')
        for k,h in report['source_sha256'].items():check(sha((a.repo/k).read_bytes())==h,'unchanged failed-build source')
    print(json.dumps({'status':'PASS','source_change_files':1,'full_original_windows':len(windows),'repository_rebound':bool(a.repo),'preserved_runtime':result,'correction_builds':0,'correction_transactions':0},sort_keys=True))
if __name__=='__main__':main()
