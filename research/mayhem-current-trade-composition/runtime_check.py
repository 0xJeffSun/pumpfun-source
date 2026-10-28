"""Recheck frozen signed receipts without executing a target VM or compiler."""
if not __debug__:
    raise RuntimeError('Evidence assertions require ordinary Python')
from pathlib import Path
import gzip,hashlib,json,re,subprocess,sys,tarfile,tempfile
P=Path(__file__).resolve().parent
ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
MAY='MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'
def archive_files(path,expected):
    with tarfile.open(path,'r:xz') as archive:
        rows=archive.getmembers()
        assert all(x.isfile() and not Path(x.name).is_absolute() and '..' not in Path(x.name).parts for x in rows)
        files={x.name:archive.extractfile(x).read() for x in rows}
    assert len(files)==len(rows) and {n:sha(b) for n,b in files.items()}==expected
    return files

def verify():
    bindings=json.loads((P/'runtime/input-bindings.json').read_bytes())
    inputs=archive_files(P/'runtime/inputs.tar.xz',{n:r['sha256'] for n,r in bindings['inputs'].items()});assert len(inputs)==25
    assert inputs['evidence/original/mayhem/deployed.so']==(ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    records=archive_files(P/'runtime/records.tar.xz',json.loads((P/'runtime/record-files.json').read_bytes()));assert len(records)==42
    expected=json.loads((P/'runtime/summary.json').read_bytes())
    candidate=gzip.decompress((P/'builds/proposed/candidate.so.gz').read_bytes())
    assert expected['candidate_sha256']==sha(candidate) and expected['frozen_inputs_unchanged']
    programs={MAY:sha(inputs['evidence/original/mayhem/deployed.so'])};sizes={MAY:len(inputs['evidence/original/mayhem/deployed.so'])}
    for group,names in [('original',['pump','pump_fees']),('dependencies',['spl_token','spl_token_2022','associated_token'])]:
        for name in names:
            path='evidence/'+group+'/'+name;key=json.loads(inputs[path+'/capture.json'])['program'];image=inputs[path+'/deployed.so']
            programs[key]=sha(image);sizes[key]=len(image)
    assert len(programs)==6
    results=[]
    with tempfile.TemporaryDirectory(prefix='sell-price-offline-') as directory:
        temp=Path(directory)
        for name,b in inputs.items():
            dest=temp/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b)
        image=temp/'candidate.so';image.write_bytes(candidate)
        jobs=[('buy_v2',f) for f in ['native','token','token22']]+[('sell',f) for f in ['legacy','native','token','token22']]
        def raw_record(prefix,suffix):
            name=prefix+suffix
            return records[name]
        for kind,family in jobs:
            prefix=kind+'/'+family;report=json.loads(raw_record(prefix,'.json'));proof=json.loads(raw_record(prefix,'.verification.json'));observed=json.loads(raw_record(prefix,'.program-bindings.json'));execution=json.loads(raw_record(prefix,'.execution.json'))
            assert execution['returncode']==execution['independent_returncode']==0
            for key,suffix in [('receipt_sha256','.json'),('proof_sha256','.verification.json'),('observer_record_sha256','.program-bindings.json'),('stdout_sha256','.stdout'),('independent_stdout_sha256','.verification.stdout')]:assert execution[key]==sha(raw_record(prefix,suffix))
            for key,suffix in [('receipt_storage','.json'),('observer_record_storage','.program-bindings.json')]:
                storage=execution[key];decoded=raw_record(prefix,suffix)
                assert storage['raw_sha256']==sha(decoded) and storage['raw_bytes']==len(decoded)
                # Private compressed payload hashes are producer provenance;
                # this portable archive authenticates the exact raw records.
            count=613 if kind=='buy_v2' else 396 if family=='legacy' else 473
            assert report['candidate_sha256']==observed['candidate_sha256']==sha(candidate)
            assert report['case_count']==len(report['cases'])==count and not report['mismatches']
            assert observed['exit_code']==0 and observed['failure'] is None and observed['frozen_inputs_unchanged'] and observed['solders']=='0.27.1'
            assert observed['observer_sha256']==sha((P/'controllers'/('run_buy_v2_observed.py' if kind=='buy_v2' else 'run_sell_price_observed.py')).read_bytes())
            assert len(observed['records'])==2*count
            for index,pair in enumerate(report['cases']):
                assert not pair['different_fields']
                for side_index,side in enumerate(['original','candidate']):
                    row=observed['records'][2*index+side_index]
                    assert row['side']==side and row['family']==family and row['case']==pair['case']['name'] and row['signature']==pair[side]['signature']
                    assert row['config']['with_sigverify'] is True and row['config']['with_blockhash_check'] is True
                    assert row['before']==row['after'] and set(row['before'])==set(programs)
                    for key,state in row['before'].items():
                        wanted=sha(candidate) if side=='candidate' and key==MAY else programs[key]
                        size=len(candidate) if side=='candidate' and key==MAY else sizes[key]
                        assert state['sha256']==wanted and state['bytes']==size and state['executable'] is True
            receipt=temp/'receipt.json';output=temp/'verification.json';receipt.write_bytes(raw_record(prefix,'.json'))
            verifier='verify_mayhem_buy_v2.py' if kind=='buy_v2' else 'verify_mayhem_sell.py' if family=='legacy' else 'verify_mayhem_sell_v2.py'
            command=[sys.executable,'-I','-B',str(temp/'scripts'/verifier),'--candidate',str(image),'--receipts',str(receipt),'--output',str(output)]
            run=subprocess.run(command,capture_output=True,text=True);assert run.returncode==0,(family,run.stdout[-1000:],run.stderr[-1000:]);assert json.loads(output.read_bytes())==proof
            assert proof['verified_signed_transactions']==2*count and not proof['mismatches']
            compute=re.compile(r' consumed \d+ of \d+ compute units');strict=lambda rows:[x for x in rows if not compute.search(x)]
            noncompute=sum(strict(x['original']['metadata']['logs'])!=strict(x['candidate']['metadata']['logs']) for x in report['cases']);raw=sum(x['original']['metadata']['logs']!=x['candidate']['metadata']['logs'] for x in report['cases'])
            assert execution==next(x for x in expected['runs'] if x['family']==family and x['kind']==kind)
            assert execution['pairs']==count and execution['verified_signed_records']==2*count and execution['successes']==proof['successful_cases'] and execution['rejections']==proof['rejection_cases']
            assert execution['noncompute_log_differences']==noncompute and execution['raw_log_differences']==raw
            results.append(dict(kind=kind,family=family,pairs=count,verified_signed_records=2*count,successes=proof['successful_cases'],rejections=proof['rejection_cases'],noncompute_log_differences=noncompute,raw_log_differences=raw))
    assert expected['fresh_pairs']==3654 and expected['verified_signed_records']==7308
    return dict(fresh_pairs=3654,verified_signed_records=7308,runs=results,new_unique_cases=0,cpi_error_callback_coverage_claimed=False)
