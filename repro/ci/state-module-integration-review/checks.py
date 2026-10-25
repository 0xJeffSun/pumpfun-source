#!/usr/bin/env python3
"""Independent static integration checks using frozen review inputs only."""
from pathlib import Path
import collections,gzip,hashlib,io,json,re,struct,tarfile
ROOT=Path(__file__).resolve().parent;R=ROOT/'inputs';P=R/'repro/pump_fees/state-module-v144'
H=lambda b:hashlib.sha256(b).hexdigest();J=lambda p:json.loads(p.read_text())
def tarbytes(data):
    with tarfile.open(fileobj=io.BytesIO(data)) as t:return {m.name:t.extractfile(m).read() for m in t if m.isfile()}

def check():
    checked=J(ROOT/'checked-inputs.json')
    assert {str(p.relative_to(R)):H(p.read_bytes()) for p in R.rglob('*') if p.is_file() and '__pycache__' not in p.parts}=={n:v['sha256'] for n,v in checked.items()}
    s=J(R/'repro/status.json');base=J(ROOT/'baseline-status.json');fee=s['pump_fees'];prop=J(P/'status-proposal.json')
    assert {k:v for k,v in s.items() if k!='pump_fees'}=={k:v for k,v in base.items() if k!='pump_fees'}
    assert [k for k in fee if fee[k]!=prop.get(k)]==['coverage_limitations']
    assert len(fee['coverage_limitations'])==len(prop['coverage_limitations'])
    assert [i for i,(a,b) in enumerate(zip(fee['coverage_limitations'],prop['coverage_limitations'])) if a!=b]==[1]
    assert 'initialize_fee_config' in fee['coverage_limitations'][1] and 'do not establish initialize_fee_program_global history' in fee['coverage_limitations'][1]
    assert len(fee['implemented_handlers'])==31 and fee['implemented_handlers']==base['pump_fees']['implemented_handlers']
    artifact='repro/pump_fees/state-module-v144/pump_fees_candidate.so';candidate=(R/artifact).read_bytes();original=(R/'evidence/original/pump_fees/deployed.so').read_bytes()
    digest=H(candidate);assert digest==fee['candidate_sha256']=='d5b8f885942ee0d54519e4330941b5e034cfcdcf271eb286d0b4cc81165bee13' and len(candidate)==768024
    archive=tarbytes((P/'scratch-handoff.tar.gz').read_bytes());old=tarbytes(archive['baseline-source-snapshot.tar.gz']);new=tarbytes((P/'source-snapshot.tar.gz').read_bytes())
    assert len(old)==22 and len(new)==23
    locations={'BuybackVault':'buyback','SocialFeePda':'social','DonationFeePda':'donation','FeeProgramGlobal':'types'}
    declarations={}
    expected=dict(old)
    for name,mod in locations.items():
        path='programs/pump-fees/src/'+mod+'.rs';pattern=rb'#\[account\]\npub struct '+name.encode()+rb'\s*\{[^}]*\}'
        matches=list(re.finditer(pattern,old[path]));assert len(matches)==1
        declaration=matches[0].group();declarations[name]=declaration
        expected[path]=old[path].replace(declaration,('pub use crate::state::'+name+';').encode())
    expected['programs/pump-fees/src/lib.rs']=old['programs/pump-fees/src/lib.rs'].replace(b'mod types;\n',b'mod types;\nmod state;\n')
    expected['programs/pump-fees/src/state.rs']=b'use anchor_lang::prelude::*;\n\n'+b'\n\n'.join(declarations.values())+b'\n'
    expected['programs/pump-fees/README.md']=new['programs/pump-fees/README.md']
    assert new==expected
    assert new['Cargo.lock']==old['Cargo.lock'] and new['programs/pump-fees/src/contexts.rs']==old['programs/pump-fees/src/contexts.rs']
    identity=J(P/'main-scratch-identity.json');assert candidate==archive['pump_fees_candidate.so'] and identity['whole_file_equal'] and not identity['main_runtime_replayed']
    assert identity['main_source_sha256']=={n:H(v)for n,v in new.items()}
    assert [n for n in identity['main_source_sha256'] if identity['main_source_sha256'][n]!=identity['scratch_source_sha256'][n]]==['programs/pump-fees/README.md']
    rows=J(P/'candidate-codecs.json')['full_codecs'];assert len(rows)==5
    line_rows=[];targets=set();call_count=0
    for row in rows:
        c,o,n=row['candidate_start'],row['original_start'],row['bytes']
        assert H(candidate[c:c+n])==row['candidate_raw_sha256'] and H(original[o:o+n])==row['original_raw_sha256']
        assert row['original_entry_bounded'] and row['relocation_pattern_equal'] and not row['raw_equal'] and not row['normalized_equal']
        moved=row['type']!='SharingConfig'
        assert row['different_slots']==([528] if moved else [528,536])
        assert row['literal_spans'][0]['equal']==moved and row['literal_spans'][1]['equal']
        if moved:
            assert row['literal_spans'][0]['candidate_utf8']=='programs/pump-fees/src/state.rs'
            line_rows.append({'type':row['type'],'candidate_line':struct.unpack_from('<I',candidate,c+532)[0],'original_line':struct.unpack_from('<I',original,o+532)[0]})
        for lit in row['literal_spans']:
            start=lit['candidate_start'];length=lit['candidate_bytes']
            assert candidate[start:start+length].hex()==lit['candidate_hex']
        for call in row['calls']:
            call_count+=1;targets.add((call['candidate_start'],call['original_start'],call['bytes']))
            off=call['call_offset'];ci=struct.unpack_from('<i',candidate,c+off+4)[0];oi=struct.unpack_from('<i',original,o+off+4)[0]
            assert ci==call['candidate_signed_call_operand'] and oi==call['original_signed_call_operand']
            assert c+off+8+ci*8==call['candidate_start'] and o+off+8+oi*8==call['original_start']
            assert call['normalized_equal'] and call['relocation_pattern_equal'] and call['original_entry_bounded']
    assert call_count==35 and len(targets)==11
    assert sum(r['bytes']for r in rows)==3672 and sum(r['bytes']for r in rows if r['type']!='SharingConfig')==2928
    gate=J(P/'retained-static-gate.json');assert gate['all_retained_gates_passed'] and len(gate['bodies'])==10
    assert sum(map(len,gate['direct_calls'].values()))==26 and sum(map(len,gate['literals'].values()))==5
    runtime=J(P/'runtime-verification-result.json')
    assert (runtime['comparison_receipts'],runtime['donation_steps'],runtime['encoded_transaction_fields'],runtime['verified_signatures_in_encoded_fields'],runtime['mismatches'])==(17441,10,8644,17204,0)
    assert runtime['repeat_input_comparisons']==69 and runtime['new_unique_cases']==0
    for name in [Path(n).name for n in fee['validation_reports']+fee['signed_sequence_reports']]:
        data=(P/name).read_bytes();assert data==archive[name]
        report=json.loads(gzip.decompress(data));assert report['candidate_sha256']==digest and report['original_sha256']==H(original) and not report['mismatches']
    assert len(fee['validation_reports'])==9 and len(set(fee['validation_reports']))==9
    assert sum(json.loads(gzip.decompress((R/n).read_bytes()))['case_count']for n in fee['validation_reports'])==17441
    comp=J(R/'repro/completion.json');oldcomp=J(ROOT/'baseline-completion.json');instructions=comp['instructions']
    assert len(instructions)==len({(r['program'],r['instruction'])for r in instructions})==150
    assert dict(collections.Counter(r['program']for r in instructions))=={'pump':56,'pump_amm':38,'pump_fees':31,'mayhem':25}
    assert dict(collections.Counter(r['status']for r in instructions))==comp['counts']==oldcomp['counts']=={'bounded_implementation':140,'partial':5,'unrecovered':5}
    oldrows={(r['program'],r['instruction']):r for r in oldcomp['instructions']}
    for row in instructions:
        assert row['candidate_artifact']==s[row['program']]['candidate_artifact'] and not row['full_byte_equality']
        prior=oldrows[(row['program'],row['instruction'])]
        if row['program']=='pump_fees':assert {k:v for k,v in row.items()if k!='candidate_artifact'}=={k:v for k,v in prior.items()if k!='candidate_artifact'}
        else:assert row==prior
    validation=comp['current_validation'];assert validation['core_differential_comparisons']==sum(x['differential_comparisons']for x in validation['programs'].values())==53735
    assert validation['programs']['pump_amm']['candidate_sha256']=='5a68db39372121c6406727bced3087aa9caf63f14a999ac68206c9b5b3401216'
    for name,row in validation['programs'].items():
        assert row['candidate_artifact']==s[name]['candidate_artifact']
        if 'candidate_sha256' in s[name]:assert row['candidate_sha256']==s[name]['candidate_sha256']
        if name!='pump_fees':assert row==oldcomp['current_validation']['programs'][name]
    oldflow=(ROOT/'baseline-workflow.yml').read_text();newflow=(R/'.github/workflows/verify.yml').read_text()
    assert newflow==oldflow.replace('repro/pump_fees/initializer-inline-v144','repro/pump_fees/state-module-v144')
    assert newflow.count('--candidate '+artifact)==10
    before=(ROOT/'baseline-binding-dispatcher.py').read_text();after=(R/'scripts/verify_current_bindings.py').read_text()
    assert after==before.replace('repro/pump_fees/initializer-inline-v144/pump_fees_candidate.so',artifact)
    return {'candidate_sha256':digest,'candidate_bytes':len(candidate),'source_inputs':23,'byte_preserved_moved_accounts':list(locations),
        'whole_main_scratch_identity':True,'codec_windows':5,'codec_bytes':3672,'moved_codec_bytes':2928,'codec_calls':35,'codec_unique_direct_targets':11,
        'natural_line_differences':line_rows,'retained_bodies':10,'retained_calls':26,'retained_literals':5,'comparison_receipts':17441,'donation_steps':10,
        'complete_instruction_rows':150,'handler_counts':comp['counts'],'all_program_receipt_total':53735,'fees_runtime_commands_retargeted':10,
        'other_program_status_unchanged':True,'status_proposal_only_wording_delta':'Explicit initialize_fee_config historical-message scope',
        'new_builds':0,'new_runtime_replays':0,'findings':[]}

if __name__=='__main__':print(json.dumps(check(),indent=2,sort_keys=True))
