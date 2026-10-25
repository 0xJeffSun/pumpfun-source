"""Proposed read-only evidence helpers; no transaction or VM is created here."""
from pathlib import Path
import base64,hashlib,json,re,struct,sys
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def logs_for_comparison(logs):
    out=[]
    for line in logs:
        if re.fullmatch(r'Program \S+ consumed \d+ of \d+ compute units',line):continue
        # Keep numeric errors, messages and compared values; only a compiler
        # source-coordinate prefix and compute consumption are nonsemantic here.
        line=re.sub(r'AnchorError thrown in [^\n]+?:\d+\.', 'AnchorError thrown in <source>.',line)
        out.append(line)
    return out

def decode_event(raw,idl,event_name,pubkey):
    types={x['name']:x['type']for x in idl['types']};at=8
    expected=bytes(next(x['discriminator']for x in idl['events']if x['name']==event_name));assert raw[:8]==expected
    def read(t):
        nonlocal at
        if isinstance(t,str):
            if t=='pubkey':b=raw[at:at+32];assert len(b)==32;at+=32;return str(pubkey.from_bytes(b))
            if t=='string':n=read('u32');b=raw[at:at+n];assert len(b)==n;at+=n;return b.decode()
            sizes={'bool':1,'u8':1,'u16':2,'u32':4,'u64':8,'i64':8,'u128':16,'i128':16};n=sizes[t];b=raw[at:at+n];assert len(b)==n;at+=n;value=int.from_bytes(b,'little',signed=t.startswith('i'))
            if t=='bool':assert value in [0,1];return bool(value)
            return value
        if 'defined'in t:return {f['name']:read(f['type'])for f in types[t['defined']['name']]['fields']}
        if 'vec'in t:return [read(t['vec'])for _ in range(read('u32'))]
        if 'array'in t:return [read(t['array'][0])for _ in range(t['array'][1])]
        raise AssertionError(t)
    result={f['name']:read(f['type'])for f in types[event_name]['fields']}
    return result,raw[at:]

def event_bytes(logs,idl,name):
    disc=bytes(next(x['discriminator']for x in idl['events']if x['name']==name))
    return [b for line in logs if line.startswith('Program data: ')for b in [base64.b64decode(line[len('Program data: '):])]if b[:8]==disc]

def compiled_binding(root,candidate,build_report,expected_map):
    assert build_report is not None,'Pass the actual new clean build report'
    report=json.loads(build_report.read_text());attempt_path=build_report.with_name('build-attempt.json');attempt=json.loads(attempt_path.read_text())
    assert attempt['returncode']==0 and attempt['source_unchanged']
    assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']
    expected=json.loads(expected_map.read_text());actual=report['source_sha256'];normalized={}
    prefixes=set()
    for path,digest in actual.items():
        marker='programs/pump/';i=path.index(marker);prefixes.add(path[:i]);normalized[path[i:]]=digest;assert sha(root/path)==digest,path
    assert len(prefixes)==1 and len(actual)==len(expected)==37 and normalized==expected
    assert report['comparison']['candidate_sha256']==sha(candidate)
    return {'report_sha256':sha(build_report),'attempt_sha256':sha(attempt_path),'actual_source_sha256':actual,'candidate_sha256':sha(candidate),'expected_source_map_sha256':sha(expected_map)}

def runtime_hashes():
    rows={str(Path(sys.executable).resolve()):sha(Path(sys.executable).resolve())}
    for name,module in sorted(sys.modules.items()):
        p=getattr(module,'__file__',None)
        if name.startswith('solders')and p and Path(p).is_file():rows[str(Path(p).resolve())]=sha(p)
    return rows
