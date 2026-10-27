"""Recheck saved signed records using frozen checkers; no target or VM execution."""
from pathlib import Path
import base64,gzip,hashlib,importlib.util,io,json,re,subprocess,sys,tarfile,tempfile
from solders.transaction import Transaction
P=Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
load=lambda p:json.loads(p.read_bytes())

def unpack_bytes(path,inventory):
    expected=load(inventory);files={}
    with tarfile.open(path,'r:xz')as t:
        for m in t:
            assert m.isfile()and m.name in expected and m.name not in files
            assert not Path(m.name).is_absolute()and '..'not in Path(m.name).parts
            raw=t.extractfile(m).read();assert sha(raw)==expected[m.name];files[m.name]=raw
    assert files.keys()==expected.keys()
    return files

def check():
    from importlib.metadata import version
    assert version('solders')=='0.27.1'
    source=unpack_bytes(P/'runtime/inputs.tar.xz',P/'runtime/inputs.json')
    receipts=unpack_bytes(P/'runtime/trades.tar.xz',P/'runtime/trades-files.json')
    original=source['evidence/original/mayhem/deployed.so']
    candidate=gzip.decompress((P/'builds/composed/candidate.so.gz').read_bytes())
    assert sha(candidate)=='9d6b9032858aae91b63c95b496f9819501de0e0069edc323f3e609d734f445b8'
    summary=json.loads(receipts['summary.json']);assert len(summary)==6
    trades=[]
    with tempfile.TemporaryDirectory(prefix='native432-receipts-')as directory:
        root=Path(directory)
        for n,b in source.items():
            p=root/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b)
        target=root/'candidate.so';target.write_bytes(candidate)
        for row in summary:
            name=row['name'];raw=receipts[name+'.json'];report=json.loads(raw)
            assert sha(raw)==row['receipt_sha256']
            assert report['candidate_sha256']==sha(candidate)and report['original_sha256']==sha(original)
            assert report['case_count']==len(report['cases'])==row['cases']and not report['mismatches']
            for n,digest in report['harness_sha256'].items():assert sha(source[n])==digest,n
            receipt=root/(name+'.json');receipt.write_bytes(raw);output=root/(name+'-checked.json')
            command=[sys.executable,'-I','-B',str(root/'scripts/verify_mayhem_pump_swap.py'),'--candidate',str(target),'--receipts',str(receipt),'--output',str(output)]
            run=subprocess.run(command,cwd=root,capture_output=True)
            assert run.returncode==0,(name,run.stdout[-2000:],run.stderr[-2000:])
            checked=load(output);assert checked==row['independent']==json.loads(receipts[name+'-independent.json'])
            trades.append(dict(name=name,cases=report['case_count'],signed_records=checked['verified_signed_transactions']))
    assert sum(r['cases']for r in trades)==2496 and sum(r['signed_records']for r in trades)==4992
    compute=re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
    mayhem='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
    pump=json.loads(source['evidence/upstream/pump.json'])['address'];pump_bytes=source['evidence/original/pump/deployed.so']
    initializer=[]
    for kind,count in [('rejections',53),('pump-cpi',16)]:
        report=json.loads(gzip.decompress((P/'runtime'/(kind+'.json.gz')).read_bytes()))
        assert report['candidate_sha256']==sha(candidate)and report['original_sha256']==sha(original)
        assert report['runner_sha256']==sha((P/'controllers/initializer_replay.py').read_bytes())
        for n,digest in report['harness_sha256'].items():assert sha(source[n])==digest
        assert report['case_count']==len(report['cases'])==count and not report['mismatches']
        assert [r['case']for r in report['cases']]==load(P/'runtime'/('initializer-'+kind+'-cases.json'))
        fields=(['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64']if kind=='rejections'else['before','after','error','events','inner','return'])
        assert report['compared_fields']==fields
        records,successes,raw_logs=0,0,0
        for row in report['cases']:
            assert not row['differences']and all(row['original'][f]==row['candidate'][f]for f in fields)
            a,b=[row[s]['logs']for s in ['original','candidate']];raw_logs+=a!=b
            assert [x for x in a if not compute.fullmatch(x)]==[x for x in b if not compute.fullmatch(x)]
            successes+=row['original']['error']is None
            a,b=[row[s+'_executions']for s in ['original','candidate']]
            n=1 if kind=='rejections'or not row['case'].get('init_global_params',True)else 2
            assert len(a)==len(b)==n
            assert [x['signed_transaction_base64']for x in a]==[x['signed_transaction_base64']for x in b]
            for side,binary in [('original',original),('candidate',candidate)]:
                for execution in row[side+'_executions']:
                    tx=Transaction.from_bytes(base64.b64decode(execution['signed_transaction_base64'],validate=True))
                    assert all(tx.verify_with_results())
                    assert execution['program_accounts'][mayhem]==dict(sha256=sha(binary),bytes=len(binary),executable=True)
                    if kind=='pump-cpi':assert execution['program_accounts'][pump]==dict(sha256=sha(pump_bytes),bytes=len(pump_bytes),executable=True)
                    records+=1
        assert successes==(0 if kind=='rejections'else 10)
        initializer.append(dict(kind=kind,cases=count,signed_records=records,successes=successes,raw_log_differences=raw_logs))
    assert sum(r['signed_records']for r in initializer)==168
    return dict(trades=trades,initializer=initializer,scope='Fresh finite matrices on the composed artifact only. Rechecking signatures adds no cases. No raw trade-log/CU identity or exhaustive behavior claim.')

if __name__=='__main__':print(json.dumps(check(),sort_keys=True))
