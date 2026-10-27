"""Counterfactual machine-call test: matching provider elsewhere is insufficient."""
from pathlib import Path
import base64, copy, gzip, json, shutil, struct, tempfile
from analyze import derive
from verify import ROOT, HERE, GAIN, closure_delta, check_initializer


def rejected(function):
    try:
        function()
    except (AssertionError, ValueError):
        return
    raise AssertionError('negative control was accepted')


def main():
    reports=json.loads(gzip.decompress((HERE/'analysis.json.gz').read_bytes()))
    baseline,composed=reports['baseline'],reports['composed-linked']
    closure_delta(baseline,composed)
    data=bytearray(gzip.decompress((HERE/'builds/composed-linked/symbols.so.gz').read_bytes()))
    row=next(r for r in composed['rows'] if r['id']=='O0210')
    for address in row['direct_closed_counterparts']:
        pc=address+528
        assert data[pc:pc+2]==bytes([0x85,0x10])
        # Change only the masked relative call operand. Every O0209 provider
        # body remains present; every normalized original body still matches.
        struct.pack_into('<i',data,pc+4,(address-(pc+8))//8)
    with tempfile.TemporaryDirectory() as td:
        path=Path(td)/'wrong-provider.so';path.write_bytes(data)
        mutated=derive(ROOT,path)
    assert mutated['normalized_windows']==composed['normalized_windows']==432
    assert mutated['direct_closed_windows']==414
    a,b=[{r['id'] for r in x['rows'] if r['direct_closed_counterparts']} for x in [composed,mutated]]
    assert sorted(a-b)==GAIN
    assert next(r for r in mutated['rows'] if r['id']=='O0209')['direct_closed_counterparts']
    rejected(lambda:closure_delta(baseline,mutated))
    forged=copy.deepcopy(composed);forged['legacy_buy']['bytes']=13680
    rejected(lambda:closure_delta(baseline,forged))
    forged=copy.deepcopy(composed);next(r for r in forged['rows'] if r['id']=='O0209')['direct_closed_counterparts']=[]
    rejected(lambda:closure_delta(baseline,forged))
    forged=copy.deepcopy(composed);forged['direct_closed_windows']=432
    rejected(lambda:closure_delta(baseline,forged))
    candidate=gzip.decompress((HERE/'builds/composed-linked/candidate.so.gz').read_bytes())
    with tempfile.TemporaryDirectory() as td:
        packet=Path(td);(packet/'controllers').mkdir()
        shutil.copyfile(HERE/'controllers/initializer_replay.py',packet/'controllers/initializer_replay.py')
        shutil.copytree(HERE/'runtime/initializer',packet/'runtime/initializer')
        path=packet/'runtime/initializer/rejections.json.gz';saved=path.read_bytes()
        report=json.loads(gzip.decompress(saved));row=report['cases'][0]
        raw=bytearray(base64.b64decode(row['original_executions'][0]['signed_transaction_base64']))
        raw[1]^=1
        encoded=base64.b64encode(raw).decode()
        for side in ['original','candidate']:
            row[side]['signed_transaction_base64']=encoded
            row[side+'_executions'][0]['signed_transaction_base64']=encoded
        path.write_bytes(gzip.compress(json.dumps(report).encode(),mtime=0))
        rejected(lambda:check_initializer(packet,candidate))
        report=json.loads(gzip.decompress(saved))
        report['cases'][0]['candidate_executions'][0]['program_accounts']['MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e']['sha256']='0'*64
        path.write_bytes(gzip.compress(json.dumps(report).encode(),mtime=0))
        rejected(lambda:check_initializer(packet,candidate))
    print(json.dumps(dict(negative_controls=6,normalized_body_count_unchanged=432,
        wrong_actual_provider_loses=GAIN,correct_provider_still_present=True)))


if __name__=='__main__':main()
