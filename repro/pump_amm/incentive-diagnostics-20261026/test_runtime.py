#!/usr/bin/env python3
"""Exercise receipt rejection using actual corrected incentive execution evidence."""
import argparse
import base64
import copy
import hashlib
import json
from pathlib import Path
import tempfile
import probe
from solders.transaction import Transaction
from solders.instruction import Instruction,AccountMeta


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ('report','candidate','source','build-record'):
        parser.add_argument('--'+name,type=Path,required=True)
    args=parser.parse_args()
    actual=json.loads(args.report.read_bytes())
    check=lambda value,record=args.build_record:probe.validate(value,args.candidate,args.source,record)
    positive=check(actual)
    mutations=[]
    def add(name,fn):mutations.append((name,fn))
    numeric=next(i for i,row in enumerate(actual['cases']) if probe.expected(row['case'])[0] is not None and len(set(probe.expected(row['case'])[1]))>1)
    success=next(i for i,row in enumerate(actual['cases']) if probe.expected(row['case'])[0] is None)
    early=next(i for i,row in enumerate(actual['cases']) if probe.expected(row['case'])[0]==263)
    late=next(i for i,row in enumerate(actual['cases']) if probe.expected(row['case'])[0]==291)
    add('missing original effects',lambda r:r['cases'][0]['original'].pop('after'))
    add('shared missing account',lambda r:[r['cases'][0][s]['after'].pop(str(probe.harness.MINT)) for s in ('original','candidate')])
    add('shared incomplete account record',lambda r:[r['cases'][0][s]['after'][str(probe.harness.MINT)].pop('lamports') for s in ('original','candidate')])
    add('missing case',lambda r:r['cases'].pop())
    add('wrong source binding',lambda r:r.__setitem__('source_sha256','0'*64))
    add('missing dependency hash',lambda r:r['input_sha256'].pop('evidence/dependencies/spl_token/deployed.so'))
    def swap_numeric(r):
        logs=r['cases'][numeric]['candidate']['logs'];positions=[i for i,s in enumerate(logs) if s.startswith(('Program log: Left:','Program log: Right:'))]
        a,b=positions
        lv=logs[a].split(': ',2)[-1];rv=logs[b].split(': ',2)[-1]
        logs[a]='Program log: Left: '+rv;logs[b]='Program log: Right: '+lv
    add('swapped numeric operands',swap_numeric)
    def change_numeric(r):
        logs=r['cases'][numeric]['candidate']['logs'];at=next(i for i,s in enumerate(logs) if s.startswith('Program log: Left:'))
        logs[at]='Program log: Left: '+str(int(logs[at].rsplit(': ',1)[1])+1)
    add('wrong numeric amount',change_numeric)
    def signed_wrong_payload(r):
        tx=Transaction.from_bytes(base64.b64decode(r['cases'][0]['original']['transaction_base64']))
        ix=tx.message.instructions[0];data=bytearray(ix.data);data[8]^=1
        header=tx.message.header
        metas=[]
        for i in ix.accounts:
            writable=i<header.num_required_signatures-header.num_readonly_signed_accounts or header.num_required_signatures<=i<len(tx.message.account_keys)-header.num_readonly_unsigned_accounts
            metas.append(AccountMeta(tx.message.account_keys[i],i<header.num_required_signatures,writable))
        changed=Transaction.new_signed_with_payer([Instruction(tx.message.account_keys[ix.program_id_index],bytes(data),metas)],probe.harness.PAYER.pubkey(),[probe.harness.PAYER],tx.message.recent_blockhash)
        assert all(changed.verify_with_results())
        encoded=base64.b64encode(bytes(changed)).decode()
        for side in ('original','candidate'):r['cases'][0][side]['transaction_base64']=encoded
    add('validly signed shared wrong payload',signed_wrong_payload)
    def remove_debug(r):
        logs=r['cases'][success]['candidate']['logs'];before=len(logs)
        logs[:]=[s for s in logs if not s.startswith('Program log: GlobalVolumeAccumulator=')]
        assert len(logs)<before,'actual receipt has no success debug log'
    add('missing success debug',remove_debug)
    def swap_origin(r):
        logs=r['cases'][early]['original']['logs'];before=list(logs)
        logs[:]=[s.replace(probe.ORIGIN+':263.',probe.ORIGIN+':291.') for s in logs]
        assert logs!=before
    add('swapped original day-index origin',swap_origin)
    add('swapped early and late fixtures',lambda r:r['cases'].__setitem__(early,copy.deepcopy(r['cases'][late])))
    passed=[]
    for name,mutate in mutations:
        row=copy.deepcopy(actual);mutate(row)
        try:check(row)
        except (ValueError,KeyError,TypeError,AssertionError):passed.append(name);continue
        raise AssertionError('Accepted mutation: '+name)
    # Rewrite an actual build record and rebind its digest, so these tests reach
    # source-manifest validation instead of failing only the outer JSON binding.
    for name,mutate in [
        ('empty rebound source manifest',lambda b:(b.__setitem__('source_sha256',{}),b.__setitem__('source_after_sha256',{}))),
        ('wrong rebound compiled incentive source',lambda b:[mapping.__setitem__(next(k for k in mapping if k.endswith('/src/incentives.rs')),'0'*64) for mapping in (b['source_sha256'],b['source_after_sha256'])]),
    ]:
        row=copy.deepcopy(actual);build=copy.deepcopy(row['build_record']['record']);mutate(build)
        with tempfile.TemporaryDirectory(prefix='amm-incentive-receipt-test-') as directory:
            path=Path(directory)/'build-record.json';raw=(json.dumps(build,indent=2)+'\n').encode();path.write_bytes(raw)
            row['build_record']={'sha256':hashlib.sha256(raw).hexdigest(),'record':build}
            try:check(row,path)
            except (ValueError,KeyError,TypeError,AssertionError):passed.append(name);continue
            raise AssertionError('Accepted mutation: '+name)
    print(json.dumps({'positive':positive,'rejected_mutations':len(passed),'mutations':passed}))


if __name__=='__main__':main()
