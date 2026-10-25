#!/usr/bin/env python3
"""Bounded offline review of retained committed files, never mutable main."""
from pathlib import Path
import ast, gzip, hashlib, importlib.util, json, tarfile, tempfile
from unittest import mock

ROOT=Path(__file__).resolve().parent
F=ROOT/'fixture'
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())

def leaf_diff(a,b,p=''):
    if isinstance(a,dict) and isinstance(b,dict):
        return sum((leaf_diff(a.get(k),b.get(k),p+'.'+k) for k in sorted(a.keys()|b.keys())),[])
    return [] if a==b else [{'path':p,'before':a,'after':b}]

def checks():
    bindings=J(ROOT/'fixture-git-bindings.json')
    actual={str(p.relative_to(F)):H(p.read_bytes()) for p in F.rglob('*') if p.is_file() and '__pycache__' not in p.parts}
    assert actual=={k:v['sha256'] for k,v in bindings['files'].items()}
    assert not any(p.is_symlink() for p in F.rglob('*'))
    old=J(ROOT/'before/repro/status.json');new=J(F/'repro/status.json')
    assert {k:v for k,v in old.items() if k!='pump_fees'}=={k:v for k,v in new.items() if k!='pump_fees'}
    changes=leaf_diff(old['pump_fees'],new['pump_fees'],'pump_fees')
    allowed={'pump_fees.'+s for s in ['validation_reports','signed_sequence_reports','authentic_historical_replays',
        'compared_value_assertions.report','authority_log_assertions.report','repeated_transfer_receipts.report',
        'serialization_error_assertions.report','public_runtime_receipt_copies']}
    actual_changed={x['path'] for x in changes}
    assert actual_changed==allowed,actual_changed
    fee=new['pump_fees'];base=F/'repro/pump_fees/initializer-inline-runtime';p=J(base/'provenance.json')
    assert H((F/p['archive']).read_bytes())==p['archive_sha256']
    rows={}
    with tarfile.open(F/p['archive']) as archive:
        seal=archive.extractfile('manifest-sha256.json').read()
        assert H(seal)==p['scratch_manifest_sha256'];sealed=json.loads(seal)
        for name,digest in p['receipts'].items():
            data=(base/name).read_bytes();member=archive.getmember(name)
            assert member.isfile() and data==archive.extractfile(member).read()
            assert H(data)==digest==sealed[name]
            report=json.loads(gzip.decompress(data))
            assert report['candidate_sha256']==p['candidate_sha256']==fee['candidate_sha256']
            assert report['original_sha256']==p['original_sha256']
            rows[name]={'bytes':len(data),'sha256':H(data),'case_count':report.get('case_count'),
                        'steps':len(report.get('steps',[]))}
    assert len(rows)==10
    nine={'repro/pump_fees/initializer-inline-runtime/'+n for n in rows if n!='donation-sequence.json.gz'}
    assert len(fee['validation_reports'])==9 and set(fee['validation_reports'])==nine
    assert sum(rows[Path(n).name]['case_count'] for n in nine)==fee['validated_cases']==17441
    assert fee['signed_sequence_reports']==['repro/pump_fees/initializer-inline-runtime/donation-sequence.json.gz']
    assert rows['donation-sequence.json.gz']['steps']==10
    history=fee['authentic_historical_replays']
    assert len(history)==1 and history[0]['report']=='repro/pump_fees/initializer-inline-runtime/initializer-history.json.gz' and history[0]['count']==2
    assert history[0]['transactions']==old['pump_fees']['authentic_historical_replays'][0]['transactions']
    assert (ROOT/'before/scripts/verify_recovered_builds.py').read_bytes()==(F/'scripts/verify_recovered_builds.py').read_bytes()
    oldflow=(ROOT/'before/.github/workflows/verify.yml').read_text();newflow=(F/'.github/workflows/verify.yml').read_text()
    line='              python repro/pump_fees/initializer-inline-runtime/verify.py\n'
    assert newflow.count(line)==1 and newflow.replace(line,'')==oldflow
    assert newflow.index(line)<newflow.index('              python scripts/verify_recovered_builds.py')
    # Only the output-retention function (and module docstring) changes.
    def funcs(path):return {n.name:ast.dump(n,include_attributes=False) for n in ast.parse(path.read_text()).body if isinstance(n,(ast.FunctionDef,ast.ClassDef))}
    a=funcs(ROOT/'before/scripts/core_linux_v144_build.py');b=funcs(F/'scripts/core_linux_v144_build.py')
    assert set(a)==set(b);assert [n for n in a if a[n]!=b[n]]==['retain_generated_outputs']
    assert (ROOT/'before/scripts/test_core_linux_pipeline.py').read_bytes()==(F/'scripts/test_core_linux_pipeline.py').read_bytes()
    observations=[]
    for label,folder in [('before',ROOT/'before'),('reviewed',F)]:
        spec=importlib.util.spec_from_file_location('retention_'+label,folder/'scripts/core_linux_v144_build.py')
        helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)
        with tempfile.TemporaryDirectory(prefix='owned-retention-observation-') as tmp:
            t=Path(tmp);attempt=helper.Attempt(t/'attempt');attempt.state['build_attempts']=1
            benign=t/'synthetic';benign.mkdir();(benign/'object.bin').write_bytes(b'ordinary synthetic data')
            (attempt.output/'target').symlink_to(benign,target_is_directory=True)
            observed=[]
            def stopped(path):
                observed.append(str(Path(path).relative_to(t)));raise RuntimeError('observer stops before file read')
            with mock.patch.object(helper,'digest',side_effect=stopped):
                try:helper.retain_generated_outputs(attempt)
                except RuntimeError as error:assert str(error)=='observer stops before file read'
            assert observed==['attempt/target/object.bin']
            observations.append({'revision':label,'digest_requested_before_symlink_rejection':observed,'file_contents_read':False})
    fixed_bindings=J(ROOT/'fixed-bindings.json')
    for path,row in fixed_bindings.items():assert H((ROOT/'fixed'/path).read_bytes())==row['sha256']
    fixed_funcs=funcs(ROOT/'fixed/scripts/core_linux_v144_build.py')
    assert set(b)==set(fixed_funcs) and [n for n in b if b[n]!=fixed_funcs[n]]==['retain_generated_outputs']
    spec=importlib.util.spec_from_file_location('retention_fixed',ROOT/'fixed/scripts/core_linux_v144_build.py')
    helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)
    with tempfile.TemporaryDirectory(prefix='owned-retention-correction-') as tmp:
        t=Path(tmp);attempt=helper.Attempt(t/'attempt');attempt.state['build_attempts']=1
        benign=t/'synthetic';benign.mkdir();(benign/'object.bin').write_bytes(b'ordinary synthetic data')
        (attempt.output/'target').symlink_to(benign,target_is_directory=True)
        observed=[]
        def no_digest(path):observed.append(str(path));raise AssertionError('unexpected digest before rejection')
        with mock.patch.object(helper,'digest',side_effect=no_digest):
            try:helper.retain_generated_outputs(attempt)
            except ValueError as error:assert 'not a symlink' in str(error)
            else:raise AssertionError('root symlink accepted')
        assert observed==[] and not (attempt.evidence/'target-files.json').exists()
    fixed_observation={'root_symlink_rejected_before_inventory':True,'digest_calls':0,'file_contents_read':False,
                       'helper_sha256':fixed_bindings['scripts/core_linux_v144_build.py']['sha256'],
                       'test_sha256':fixed_bindings['scripts/test_core_linux_v144_retention.py']['sha256']}
    return {'reviewed_revision':bindings['revision'],'fixture_files':len(actual),'receipt_copies':rows,
            'source_inputs':22,'validation_receipts':17441,'donation_steps':10,'authentic_history_count':2,
            'generic_verifier_byte_identical':True,'other_program_status_unchanged':True,'status_changes':changes,
            'workflow_addition_only':True,'helper_changed_functions':['retain_generated_outputs'],
            'preexisting_root_symlink_inventory_observations':observations,
            'root_owned_correction':fixed_observation,'remaining_findings':[],
            'new_builds':0,'new_runtime_replays':0,'network_requests':0}

if __name__=='__main__':print(json.dumps(checks(),indent=2,sort_keys=True))
