#!/usr/bin/env python3
"""UNEXECUTED proposal: 20 fixed normally signed donation creation comparisons.

This draft has only been AST parsed. Execution requires separate authorization,
a clean approved source build, and complete build/tool provenance. It does not
run or modify the existing historical-message or baseline suites.
"""
import argparse
import base64
import hashlib
import json
from pathlib import Path
import sys

HERE = Path(__file__).resolve().parent
PACKAGE = HERE.parent
ORIGINAL_SHA = '4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e'

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', type=Path, required=True)
    parser.add_argument('--source-root', type=Path, required=True)
    parser.add_argument('--candidate', type=Path, required=True)
    parser.add_argument('--candidate-sha256', required=True)
    parser.add_argument('--build-record', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    repo = args.repo.resolve(); candidate = args.candidate.resolve()
    original = repo / 'evidence/original/pump_fees/deployed.so'
    assert sha(original) == ORIGINAL_SHA
    assert sha(candidate) == args.candidate_sha256
    approved = json.loads((PACKAGE/'corrected-source-sha256.json').read_text())
    assert len(approved) == 26
    observed = {p:sha(args.source_root/p) for p in approved}
    assert observed == approved, 'Source differs from the explicitly pinned reviewed proposal'
    build_record = json.loads(args.build_record.read_text())
    # The separately reviewed build record must bind candidate/tool phases and
    # all 26 inputs. Preserve it verbatim; this runner is not a build verifier.
    assert build_record, 'An empty build record is not provenance'
    for rel in ['scripts/fees_admin_differential.py','evidence/upstream/pump_fees.json']:
        mappings = [json.loads((PACKAGE/'inputs'/n).read_text()) for n in
                    ['accepted-published-harness-sha256.json','accepted-runtime-inputs.json']]
        expected = next(m[rel] for m in mappings if rel in m)
        assert sha(repo/rel) == expected
    sys.path.insert(1, str(repo/'scripts'))
    import fees_donation_create_differential as create
    from solders.clock import Clock
    from solders.litesvm import LiteSVM
    from solders.pubkey import Pubkey
    from solders.transaction_metadata import FailedTransactionMetadata
    from assertions import check_expected, comparable

    roles = {name:getattr(create,name) for name in ['PROGRAM','GLOBAL','EVENT','MINT','CONFIG','POOL','CURVE','SHARING','DONATION']}
    roles.update({name:getattr(create,name).pubkey() for name in ['AUTH','OTHER','PAYER']})
    roles.update(WSOL=create.QUOTE, ZERO=Pubkey.default(), NON_NATIVE=Pubkey.from_bytes(bytes([64])*32))
    encoded_roles = {name:{'str':str(key),'hex':bytes(key).hex()} for name,key in roles.items()}
    encoded_roles['DONATION_BUMP'] = create.DONATION_BUMP

    def resolve(value):
        if isinstance(value,str) and value.startswith('$'): return bytes(roles[value[1:]]).hex()
        if isinstance(value,dict): return {k:resolve(v) for k,v in value.items()}
        if isinstance(value,list): return [resolve(v) for v in value]
        return value

    def snapshot(vm,tx):
        result = {}
        for key in sorted(set(roles.values()) | set(tx.message.account_keys),key=str):
            a = vm.get_account(key)
            result[str(key)] = None if a is None else dict(lamports=a.lamports,owner=str(a.owner),
                executable=a.executable,rent_epoch=a.rent_epoch,data_length=len(a.data),
                data_sha256=hashlib.sha256(a.data).hexdigest(),
                data_base64=None if a.executable else base64.b64encode(a.data).decode())
        return result

    class Recorder:
        def __init__(self,vm): self.vm=vm; self.rows=[]
        def __getattr__(self,name): return getattr(self.vm,name)
        def send_transaction(self,tx):
            checks=tx.verify_with_results(); assert len(checks)==2 and all(checks)
            assert set(tx.message.account_keys[:2]) == {create.PAYER.pubkey(),create.AUTH.pubkey()}
            before=snapshot(self.vm,tx)
            result=self.vm.send_transaction(tx)
            failed=isinstance(result,FailedTransactionMetadata)
            meta=result.meta() if failed else result; md=json.loads(meta.to_json())
            self.rows.append(dict(transaction_base64=base64.b64encode(bytes(tx)).decode(),
                signature_verification=list(checks),message_account_keys=[str(k) for k in tx.message.account_keys],before=before,after=snapshot(self.vm,tx),
                error=str(result.err()) if failed else None,logs=meta.logs(),
                events=[s for s in meta.logs() if s.startswith('Program data:')],
                inner_instructions=md['inner_instructions'],return_data=md['return_data']))
            return result

    class FocusedFixture(create.Fixture):
        def __init__(self,binary):
            # Do not call the inherited constructor's disabled-history setting.
            # One case per VM, default history enabled, ordinary signatures.
            vm=LiteSVM().with_sigverify(True).with_blockhash_check(True)
            vm.add_program_from_file(create.PROGRAM,binary)
            vm.set_clock(Clock(1000,0,0,0,1700000000))
            self.vm=Recorder(vm)

    def execute(binary,case):
        fixture=FocusedFixture(binary)
        fixture.run({'name':case['name'],**resolve(case['fixture'])})
        assert len(fixture.vm.rows)==1
        return fixture.vm.rows[0]

    cases=json.loads((PACKAGE/'cases.json').read_text()); assert len(cases)==20
    rows=[]
    for case in cases:
        left=execute(original,case); right=execute(candidate,case)
        a=comparable(left,str(create.PROGRAM)); b=comparable(right,str(create.PROGRAM))
        mismatches=[k for k in a if a[k]!=b[k]]
        expected_failures={side:check_expected(value,case,encoded_roles)
                           for side,value in [('original',left),('candidate',right)]}
        rows.append(dict(case=case,original=left,candidate=right,mismatches=mismatches,
            expected_failures=expected_failures,raw_logs_equal=left['logs']==right['logs'],
            match=not mismatches and not any(expected_failures.values())))
    failures=[r['case']['id'] for r in rows if not r['match']]
    report=dict(scope='20 fixed ordinary-signed synthetic donation cases; no byte/source identity or completeness claim',
        original_sha256=sha(original),candidate_sha256=sha(candidate),source_sha256=observed,
        build_record_sha256=sha(args.build_record),build_record=build_record,
        harness_sha256={p.name:sha(p) for p in HERE.glob('*.py')},case_manifest_sha256=sha(PACKAGE/'cases.json'),
        roles=encoded_roles,runtime={'signature_verification':True,'blockhash_check':True,'history':'default enabled; fresh VM per case'},
        case_count=20,transaction_count=40,signature_count=80,cases=rows,mismatches=failures)
    assert {p:sha(args.source_root/p) for p in approved}==observed
    assert sha(original)==ORIGINAL_SHA and sha(candidate)==args.candidate_sha256
    args.output.parent.mkdir(parents=True,exist_ok=True)
    args.output.write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'case_count':20,'mismatches':failures}))
    if failures: raise SystemExit(1)

if __name__=='__main__': main()
