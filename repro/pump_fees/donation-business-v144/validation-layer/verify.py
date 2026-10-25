#!/usr/bin/env python3
"""Verify immutable validation/source layers using static and saved data only."""
from pathlib import Path,PurePosixPath
import argparse,ast,gzip,hashlib,json,subprocess,sys,tarfile,tempfile
sys.dont_write_bytecode=True
HERE=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())

def unpack(archive,directory,expected_seal):
    entries={}
    with tarfile.open(archive) as tar:
        for member in tar:
            name=PurePosixPath(member.name)
            assert member.isfile() and not name.is_absolute() and '..' not in name.parts and member.name not in entries
            entries[member.name]=tar.extractfile(member).read()
    assert H(entries['manifest-sha256.json'])==expected_seal
    assert {name:H(data) for name,data in entries.items() if name!='manifest-sha256.json'}==json.loads(entries['manifest-sha256.json'])
    for name,data in entries.items():
        path=directory/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(data)
    return entries

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path);p.add_argument('--candidate',type=Path);p.add_argument('--source-root',type=Path);a=p.parse_args()
    manifest=J(HERE/'manifest-sha256.json')
    assert {f.relative_to(HERE).as_posix():H(f.read_bytes()) for f in HERE.rglob('*') if f.is_file() and f.name!='manifest-sha256.json'}==manifest
    transition=J(HERE/'source-transition.json')
    for path in HERE.rglob('*.py'):ast.parse(path.read_text(),filename=str(path))
    with tempfile.TemporaryDirectory(prefix='donation-a99d-verification-') as temp:
        oldroot=Path(temp)/'old';correctionroot=Path(temp)/'correction'
        old=unpack(HERE/'proposal-5e2a.tar.gz',oldroot,'814e07d14da28a2a96526849609015324f34123f5aaaaa1795efd6f15ce860b0')
        correction=unpack(HERE/'diagnostic-correction-a99d.tar.gz',correctionroot,'ab97ecf0bd43b3ef296e7aca9b8e223950b0716064e7ddbedf856c527c61f610')
        command=[sys.executable,'-B',str(oldroot/'verify.py')]
        if a.repo:command+=['--repo',str(a.repo.resolve())]
        checked=subprocess.run(command,text=True,capture_output=True);assert checked.returncode==0,checked.stderr
        static=subprocess.run([sys.executable,'-B',str(correctionroot/'verify.py')],text=True,capture_output=True);assert static.returncode==0,static.stderr
        invariant=['cases.json','assertion-contract.json','baseline-command-inventory.json','baseline-jobs.json']+[f'harness/{name}' for name in transition['unchanged_harness_sha256']]
        for name in invariant:assert (HERE/name).read_bytes()==old[name],name
        for name in ['accepted-source-sha256.json','accepted-source-snapshot.tar.gz','accepted-published-harness-sha256.json','accepted-runtime-inputs.json']:
            assert (HERE/'inputs'/name).read_bytes()==old['inputs/'+name],name
        before=json.loads(old['corrected-source-sha256.json']);after=J(HERE/'corrected-source-sha256.json');target='programs/pump-fees/src/donation.rs'
        assert len(before)==len(after)==26 and [name for name in before if before[name]!=after[name]]==[target]
        assert after==json.loads(correction['proposed-source-sha256.json'])
        source=old['inputs/corrected-donation.rs'].decode()
        replacements=json.loads(correction['replacements.json'])
        assert replacements==transition['source_replacements'] and len(replacements)==3
        for previous,new in replacements:assert source.count(previous)==1;source=source.replace(previous,new)
        assert source.encode()==correction['donation.rs']==(HERE/'inputs/corrected-donation.rs').read_bytes()
        assert H(source.encode())==after[target]==transition['to_donation_sha256']=='a99db3b6156a3009e805ea24ca087d1bea1eb28b90be076dda024f30ac0a14b9'
        assert before[target]==transition['from_donation_sha256']=='5e2af176c8c5f627602fb276d240aa48958d9dd45758fec553e9173e56df32c8'
        assert H((HERE/'cases.json').read_bytes())==transition['unchanged_case_sha256']
        assert H((HERE/'assertion-contract.json').read_bytes())==transition['unchanged_assertion_contract_sha256']
        for name,digest in transition['unchanged_harness_sha256'].items():assert H((HERE/'harness'/name).read_bytes())==digest
        old_result=json.loads(checked.stdout)
    binding=J(HERE/'build02-bindings.json')
    assert binding['source_sha256']==after==J(HERE/'build02/source-sha256.json')
    assert binding['candidate_sha256']==transition['candidate_build02_sha256']=='fc1088f3e25738267a49aaa2b5189f1ab77c487f1023d45fede11e14e5a086b2'
    comparison=J(HERE/'build02/build-comparison.json')
    assert comparison==binding['build_comparison']
    prefix=binding['source_root']+'/'
    assert all(name.startswith(prefix) for name in comparison['source_sha256'])
    assert {name[len(prefix):]:digest for name,digest in comparison['source_sha256'].items()}==after
    assert comparison['comparison']['candidate_sha256']==binding['candidate_sha256'] and comparison['comparison']['candidate_bytes']==binding['candidate_bytes']==770744
    assert comparison['comparison']['full_byte_equality'] is False
    assert J(HERE/'build02/build-result.json')['source_after']==after and J(HERE/'build02/build-result.json')['source_unchanged']
    assert J(HERE/'build02/tool-phase-provenance.json')==binding['tool_phase_provenance']
    for name,record in binding['record_files'].items():assert H((HERE/name).read_bytes())==record['sha256']
    if a.candidate:assert H(a.candidate.read_bytes())==binding['candidate_sha256'] and a.candidate.stat().st_size==binding['candidate_bytes']
    if a.source_root:
        for name,digest in after.items():assert H((a.source_root/name).read_bytes())==digest,name
    assert 'solders' not in sys.modules
    print(json.dumps({'verified_layer_payloads':len(manifest),'old_proposal_payloads':old_result['verified_payload_files'],'source_inputs':26,'exact_source_expression_changes':3,'unchanged_focused_cases':20,'focused_executed_cases':0,'retained_diagnostic_gaps_from_8f':11,'old_and_correction_static_verifiers_passed':True,'no_vm_or_signer_imports':True},sort_keys=True))

if __name__=='__main__':main()
