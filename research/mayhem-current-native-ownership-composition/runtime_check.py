"""Replay the frozen saved-receipt verifier; no VM, compiler, Git or network."""
from pathlib import Path
import gzip,hashlib,json,re,subprocess,sys,tarfile,tempfile
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
load=lambda p:json.loads(p.read_bytes())
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'

def archive(path,inventory):
    expected=load(inventory);files={}
    with tarfile.open(path,'r:xz')as t:
        for m in t:
            assert m.isfile()and m.name in expected and m.name not in files
            assert not Path(m.name).is_absolute()and '..'not in Path(m.name).parts
            raw=t.extractfile(m).read();assert sha(raw)==expected[m.name];files[m.name]=raw
    assert files.keys()==expected.keys()
    return files

def check_programs(row,original,candidate):
    for side,digest in [('original',original),('candidate',candidate)]:
        for phase in ['before','after']:
            account=row[side][phase][MAY]
            assert account['executable']and account['data_sha256']==digest

def check():
    from importlib.metadata import version
    assert version('solders')=='0.27.1'
    inputs=archive(P/'runtime/inputs.tar.xz',P/'runtime/inputs.json')
    records=archive(P/'runtime/records.tar.xz',P/'runtime/records-files.json')
    assert len(records)==6 and len(inputs)==7
    report=json.loads(records['buy.json']);summary=json.loads(records['summary.json'])
    candidate=gzip.decompress((P/'builds/composed/candidate.so.gz').read_bytes())
    original=inputs['evidence/original/mayhem/deployed.so']
    assert sha(candidate)==report['candidate_sha256']==summary['candidate_sha256']=='78e3ccb13f531b0724bf1f60c82744092c8dcbdeb2162c0755dc88ecc0186932'
    assert report['original_sha256']==sha(original)=='a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb'
    assert report['case_count']==len(report['cases'])==summary['cases']==486
    assert sha(records['buy.json'])==summary['receipt_sha256']and not report['mismatches']and not report['normalized_log_differences']
    for n,digest in report['harness_sha256'].items():assert sha(inputs[n])==digest
    for n,digest in json.loads(records['commands.json'])['input_hashes'].items():assert sha(inputs[n])==digest
    cases=json.loads(inputs['repro/mayhem/twenty/buy-cases.json'])['cases']
    assert [r['case']for r in report['cases']]==cases
    compute=re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
    raw_logs=0
    for row in report['cases']:
        check_programs(row,sha(original),sha(candidate))
        a,b=[row[s]['metadata']['logs']for s in ['original','candidate']]
        assert [s for s in a if not compute.fullmatch(s)]==[s for s in b if not compute.fullmatch(s)]
        raw_logs+=a!=b
    with tempfile.TemporaryDirectory(prefix='native-ownership-receipts-')as directory:
        root=Path(directory)
        for n,raw in inputs.items():
            p=root/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
        target=root/'candidate.so';target.write_bytes(candidate);receipt=root/'buy.json';receipt.write_bytes(records['buy.json']);output=root/'checked.json'
        command=[sys.executable,'-I','-B',str(root/'scripts/verify_mayhem_buy.py'),'--candidate',str(target),'--receipts',str(receipt),'--output',str(output)]
        run=subprocess.run(command,cwd=root,capture_output=True)
        assert run.returncode==0,(run.stdout[-2000:],run.stderr[-2000:])
        checked=load(output)
        assert checked==json.loads(records['buy-independent.json'])==summary['independent']
    assert checked['verified_signed_transactions']==972 and checked['successful_cases']==187 and checked['rejection_cases']==299
    return dict(cases=486,successes=187,rejections=299,verified_signed_records=972,raw_log_differences=raw_logs,noncompute_log_differences=0,
        scope='Fresh Legacy Buy corpus on the composed current-source artifact only. No fresh AMM/initializer/Burn/sweep or actual CPI-error-callback execution claim.')

if __name__=='__main__':print(json.dumps(check(),sort_keys=True))
