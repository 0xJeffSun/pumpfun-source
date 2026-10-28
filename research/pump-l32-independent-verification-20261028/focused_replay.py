#!/usr/bin/env python3
from pathlib import Path
import base64, gzip, hashlib, json, re, sys

if not __debug__:
    raise SystemExit('optimized Python disables assertion gates; rerun without -O')
sys.dont_write_bytecode = True
from solders.transaction import Transaction

P=Path(__file__).resolve().parent
ROOT=next(path for path in P.parents if (path/'evidence/original/pump/deployed.so').is_file())
R=P/'runtime/focused'
ORIGINAL='7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d'
HASHES={'A-baseline':'85e7a54ee09f1074275fa92da82cc2ed879371c395ef73c703745a1bd77c7ef1',
        'B-sweep':'6036360781d0c3d58c7f917ccf21d7be3c59eeb660085ade56d52b5402842a46',
        'C-cashback':'9c847056ba81b61425d5f9176735ce18d4f6e11ca77fa2059caa938fa658253e',
        'D-combined':'45c5af2485f6d8138b471cbd6b56e0bf59135dcefea15f055d6387b4f1ac0bca'}
SWEEP='Program log: Nothing to sweep for fee bucket {}'
CASH='Program log: No cashback to claim'
compute=re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
norm=lambda x:[line for line in x if not compute.fullmatch(line)]

def read(path):
    raw=Path(path).read_bytes()
    return json.loads(gzip.decompress(raw) if raw[:2]==b'\x1f\x8b' else raw)

def view(o):
    d={k:v for k,v in o.items() if k not in ('logs','transaction_base64','compute_units','compute_units_consumed','program_sha256','relevant_logs')}
    if 'metadata' in d:d['metadata']={k:v for k,v in d['metadata'].items() if k not in ('logs','compute_units_consumed')}
    return d

def case_sha(case):return hashlib.sha256(json.dumps(case,sort_keys=True,separators=(',',':')).encode()).hexdigest()
def tx_sha(value):return hashlib.sha256(base64.b64decode(value)).hexdigest()

def load(kind):return {v:read(R/f'{v}-{kind}.json.gz') for v in HASHES}

def mapped_input(path):
    marker='pumpfun-source-pump-l31-diagnostic-parity/'
    assert marker in path
    return ROOT/path.split(marker,1)[1]

def validate_receipts(kind):
    counts={}
    for variant,expected in HASHES.items():
        p=R/f'{variant}-{kind}.loader.json';d=read(p)
        assert {x['elf_sha256'] for x in d['loads']}=={ORIGINAL,expected}
        assert all(x['program_bytes']==36 and x['programdata_bytes']==10485760 and x['elf_prefix_unchanged'] and x['zero_allocation_tail'] for x in d['loads'])
        for path,digest in d['input_sha256'].items(): assert sha(mapped_input(path))==digest
        counts[variant]={'sha256':sha(p),'loads':len(d['loads'])}
    return counts

def analyze():
    fees,cash=load('fee-sweeps'),load('cashback');affected=[];signed=set();occ=0
    for reports,count in ((fees,504),(cash,283)):
        assert all(x['case_count']==count and len(x['cases'])==count and not x['mismatches'] for x in reports.values())
        for variant,report in reports.items():
            if 'candidate_sha256' in report:assert report['candidate_sha256']==HASHES[variant]
            else:assert HASHES[variant] in report['provenance'].values()
        for i in range(count):
            base=reports['A-baseline']['cases'][i]
            for variant,report in reports.items():
                row=report['cases'][i];assert row['case']==base['case'];assert row['original']==base['original']
                assert view(row['candidate'])==view(row['original']),(variant,i)
                assert row['candidate']['transaction_base64']==row['original']['transaction_base64']
                value=row['candidate']['transaction_base64'];signed.add(value);occ+=1
    for value in signed:Transaction.from_bytes(base64.b64decode(value)).verify()
    fee_sets={v:set() for v in HASHES}
    for i,row in enumerate(fees['A-baseline']['cases']):
        op=row['case'].get('op');bucket=1 if op=='sweep_creator_fee' else 0 if op=='sweep_protocol_fee' else None
        originals=norm(row['original']['logs'])
        for variant,report in fees.items():
            logs=norm(report['cases'][i]['candidate']['logs'])
            if bucket is not None and SWEEP.format(bucket) in logs:fee_sets[variant].add(i)
        if bucket is not None and SWEEP.format(bucket) in originals:
            assert i not in fee_sets['A-baseline'] and i not in fee_sets['C-cashback']
            assert i in fee_sets['B-sweep'] and i in fee_sets['D-combined']
            removed=list(originals);removed.remove(SWEEP.format(bucket))
            assert norm(fees['A-baseline']['cases'][i]['candidate']['logs'])==removed
            assert norm(fees['C-cashback']['cases'][i]['candidate']['logs'])==removed
            assert norm(fees['B-sweep']['cases'][i]['candidate']['logs'])==originals
            assert norm(fees['D-combined']['cases'][i]['candidate']['logs'])==originals
            affected.append({'suite':'fee_sweeps','index':i,'bucket':bucket,'case':row['case'],'case_sha256':case_sha(row['case']),'transaction_sha256':tx_sha(row['candidate']['transaction_base64'])})
        else:
            assert all(norm(report['cases'][i]['candidate']['logs'])==originals for report in fees.values())
    assert {v:len(x) for v,x in fee_sets.items()}=={'A-baseline':0,'B-sweep':84,'C-cashback':0,'D-combined':84}
    cash_sets={v:set() for v in HASHES};original_cash=set()
    for i,row in enumerate(cash['A-baseline']['cases']):
        originals=norm(row['original']['logs'])
        if CASH in originals:original_cash.add(i)
        for variant,report in cash.items():
            logs=norm(report['cases'][i]['candidate']['logs'])
            if CASH in logs:cash_sets[variant].add(i)
        if i in original_cash-cash_sets['A-baseline']:
            assert i not in cash_sets['B-sweep'] and i in cash_sets['C-cashback'] and i in cash_sets['D-combined']
            removed=list(originals);removed.remove(CASH)
            assert norm(cash['A-baseline']['cases'][i]['candidate']['logs'])==removed
            assert norm(cash['B-sweep']['cases'][i]['candidate']['logs'])==removed
            assert norm(cash['C-cashback']['cases'][i]['candidate']['logs'])==originals
            assert norm(cash['D-combined']['cases'][i]['candidate']['logs'])==originals
            affected.append({'suite':'cashback','index':i,'case':row['case'],'case_sha256':case_sha(row['case']),'transaction_sha256':tx_sha(row['candidate']['transaction_base64'])})
        elif i in original_cash:
            assert all(i in values for values in cash_sets.values())
        else:
            baseline_logs=norm(cash['A-baseline']['cases'][i]['candidate']['logs'])
            assert all(norm(report['cases'][i]['candidate']['logs'])==baseline_logs for report in cash.values())
    assert len(original_cash)==34
    assert {v:len(x) for v,x in cash_sets.items()}=={'A-baseline':3,'B-sweep':3,'C-cashback':34,'D-combined':34}
    summary={'status':'passed','candidate_hashes':HASHES,'focused_cases_per_configuration':787,
      'configuration_count':4,'paired_case_executions':4*787,'transaction_occurrences_verified':occ,
      'distinct_signed_transactions_verified':len(signed),'fee_notice_counts':{v:len(x) for v,x in fee_sets.items()},
      'cashback_notice_counts':{v:len(x) for v,x in cash_sets.items()},'fee_affected':84,'fee_bucket_0':43,'fee_bucket_1':41,
      'cashback_v1_preserved':3,'cashback_v2_affected':31,'combined_corrected_notices':115,
      'structured_mismatches':0,'normalization':['compute-consumption lines excluded only'],
      'loader_receipts':{'fee_sweeps':validate_receipts('fee-sweeps'),'cashback':validate_receipts('cashback')}}
    return summary,affected

def main():
    summary,affected=analyze()
    assert summary==read(P/'runtime/focused-summary.json')
    assert affected==read(P/'runtime/affected-cases.json')
    print(json.dumps(summary,indent=2,sort_keys=True))

if __name__=='__main__':main()
