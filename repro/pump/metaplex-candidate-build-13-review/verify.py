#!/usr/bin/env python3
"""Portable saved-evidence verifier for the single rejected/no-improvement13 run."""
from pathlib import Path
import hashlib,json
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/dependencies/token_metadata/deployed.so').is_file())
from verify_receipts import verify as verify_receipts
from analyze_four import analyze as four
from mapped_analysis import analyze as mapped
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda n:json.loads((P/n).read_text())
def verify():
    manifest=J('manifest.json');actual={f.relative_to(P).as_posix() for f in P.rglob('*') if f.is_file() and f.name!='manifest.json' and '__pycache__' not in f.parts}
    assert actual==set(manifest)
    for n,h in manifest.items():assert H(P/n)==h,n
    for n,h in J('external-inputs.json').items():assert H(ROOT/n)==h,n
    run=J('hosted-run-final.json');assert run['id']==40190519595 and run['head_sha']=='8435d7e576ca38e36c486038d7f26868992e818a'
    assert run['status']=='completed' and run['conclusion']=='failure'
    jobs=J('hosted-jobs-final.json')['jobs'];job=next(x for x in jobs if x['id']==121160343804)
    assert job['status']=='completed' and job['conclusion']=='failure'
    assert next(s for s in job['steps'] if s['name']=='Preserve candidate source, logs, generated ELF and honest comparison')['conclusion']=='success'
    receipts=verify_receipts(P/'build13');assert receipts==J('source-build-verification.json')
    assert (P/'build13/token_metadata.so').read_bytes()==(ROOT/'repro/pump/metaplex-candidate-build-12-review/candidate12.so').read_bytes()
    inputs=J('expected-source-inputs.json');assert inputs==json.loads((ROOT/'repro/pump/metaplex-utilize-positive-guard-source-recovery/source-inputs.json').read_text())
    assert H(P/'utilize.proposed.rs')==inputs['patched']['programs/token-metadata/program/src/processor/uses/utilize.rs']
    f,b=four();assert f==J('four-artifact-result.json') and b==J('complete-body-decode.json')
    assert f['artifacts']['candidate13']['payload_different_bytes']==196601 and not f['whole_byte_identity']
    assert not f['candidate13_raw_text_equal'] and not f['candidate13_body_equal']
    result,bodies=mapped();assert result==J('mapped-result.json') and bodies==J('mapped-body-decode.json')
    changes=result['full_text_alignment'];assert len(changes['changed_original_instructions'])==len(changes['inserted_candidate_instructions'])==1
    changed=changes['changed_original_instructions'][0];assert changed['original']['file_offset']==238832
    assert changed['original']['raw']=='3d97070000000000' and changed['candidate13']['raw']=='2d79010000000000'
    inserted=changes['inserted_candidate_instructions'][0];assert inserted['file_offset']==238840 and inserted['raw']=='0500070000000000'
    data=result['data_and_relocation_alignment'];assert data['all_mapped_relocations_equal'] and data['relocation_count']==2749
    assert len(data['shifted_pointer_slots'])==132 and all(x['mapped_equal'] for x in data['shifted_pointer_slots'])
    assert len(data['remaining_coordinate_bytes'])==30 and data['coordinate_residual_unchanged_from11']
    assert data['entrypoint_mapping_equal'] and data['function_entries_mapping_equal']
    proof=J('guard-equivalence.json');assert H(P/'guard-equivalence.smt2')==proof['query_sha256']
    assert proof['all_u64_guard_and_subtraction_domain']==proof['branch_polarity_negation']=='unsat'
    return dict(verified=True,hosted_run=40190519595,source_build_completed=True,workflow_failure='whole-payload identity comparison',
                candidate13_raw_equals_rejected12=True,target_differing_payload_positions=196601,
                accepted11_residual_positions=1509,full_text_changed_instructions=1,extra_jump_instructions=1,
                all_mapped_relocations=2749,coordinate_residual_bytes=30,candidate13_accepted=False,
                whole_original_byte_identity=False,new_runtime_transactions=0)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
