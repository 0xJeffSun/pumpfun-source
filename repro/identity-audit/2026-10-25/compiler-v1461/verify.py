#!/usr/bin/env python3
"""Read-only saved full-helper comparison; no compiler, VM or network is required."""
from pathlib import Path
import hashlib,json,struct,sys
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
from elf_reader import Elf
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def obj(p):return json.loads(p.read_text())
def verify():
    manifest=obj(P/'manifest.json')
    actual={f.relative_to(P).as_posix() for f in P.rglob('*') if f.is_file() and f.name!='manifest.json' and '__pycache__' not in f.parts}
    assert actual==set(manifest)
    for name,digest in manifest.items():assert H(P/name)==digest,name
    for name,digest in obj(P/'external-inputs.json').items():assert H(ROOT/name)==digest,name
    attempt=obj(P/'v1461-build-01/build-attempt.json');report=obj(P/'v1461-build-01/build-comparison.json')
    source={str(f.relative_to(P/'crate')):H(f) for f in (P/'crate').rglob('*') if f.is_file()}
    assert source==obj(P/'frozen-source.json')==attempt['source_sha256']==attempt['source_after_sha256']==report['source_sha256']
    prior=obj(ROOT/'repro/pump_fees/compiler-family/v146-build-01/build-comparison.json')
    assert source=={k.split('v143-crate/',1)[1]:v for k,v in prior['source_sha256'].items()}
    assert attempt['returncode']==0 and attempt['source_unchanged']
    assert attempt['sdk_source_sha256']==prior['sdk_source_sha256']==obj(P/'baseline-sdk-current.json')
    assert H(P/'v1461-build-01/build.log')==attempt['build_log_sha256']==report['build_log_sha256']
    assert report['selected_toolchain']=='v1.46.1'
    assert 'sbpf-solana-solana' in attempt['command']
    assert attempt['environment']['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS']=='-Zremap-cwd-prefix='
    assert obj(P/'old-target-setup.json')['returncode']!=0
    assert "can't find crate for `core`" in obj(P/'old-target-setup.json')['stderr']
    raw=(P/'v1461-generic.o').read_bytes();assert (struct.unpack_from('<H',raw,18)[0],struct.unpack_from('<I',raw,48)[0])==(263,0)
    for row in obj(P/'source-records.json'):
        if (P/row['file']).exists():assert H(P/row['file'])==row['sha256']
    asset=obj(P/'asset-verification.json');assert asset['official_digest']=='sha256:'+asset['sha256']
    release=obj(P/'v1.46.1-release.json');row=next(r for r in release['assets'] if r['id']==asset['asset_id']);assert row['digest']==asset['official_digest'] and row['size']==asset['bytes']
    orig=Elf(ROOT/'evidence/original/pump_fees/deployed.so')
    saved=obj(P/'linked-helper-matches.json');summary={}
    for name,build in saved['builds'].items():
        folder=P/name if name=='v1461-build-01' else ROOT/'repro/pump_fees/compiler-family'/name
        candidate=Elf(folder/'pump_fees_candidate.so');symbols=Elf(folder/'unstripped.so')
        assert H(folder/'pump_fees_candidate.so')==build['candidate']['sha256']
        assert candidate.b[candidate.lo:candidate.hi]==symbols.b[symbols.lo:symbols.hi]
        for f in build['functions']:
            at,size=f['candidate_start'],f['bytes'];body=candidate.b[at:at+size];needle=candidate.normalized[at:at+size]
            assert hashlib.sha256(body).hexdigest()==f['raw_sha256']
            hits=[];position=orig.lo
            while (found:=orig.normalized.find(needle,position,orig.hi))>=0:
                position=found+1
                if found%8 or orig.pattern(found,size)!=candidate.pattern(at,size):continue
                hits.append(found)
            assert hits==[m['original_start'] for m in f['matches']],(name,f['names'])
            for match in f['matches']:
                start=match['original_start'];end=next((x for x in orig.entries if x>start),None)
                assert (start in orig.entries)==match['inferred_function_entry'] and end==match['next_inferred_entry']
                assert (end==start+size)==match['next_entry_equals_window_end']
                assert (orig.b[start:start+size]==body)==match['raw_byte_equality']
                for call in match['mapped_helper_call_checks']:assert (call['mapped_original_target']==call['actual_original_target'])==call['agrees']
        mapping={f['candidate_start']:f['matches'][0]['original_start'] for f in build['functions']
                 if len(f['matches'])==1 and f['matches'][0]['inferred_function_entry']}
        for f in build['functions']:
            assert candidate.pattern(f['candidate_start'],f['bytes'])==f['relocations']
            assert candidate.callsites(f['candidate_start'],f['bytes'])==f['internal_calls']
            for match in f['matches']:
                calls={c['offset']:c['target'] for c in orig.callsites(match['original_start'],f['bytes'])}
                checks=[dict(offset=c['offset'],candidate_target=c['target'],mapped_original_target=mapping[c['target']],actual_original_target=calls.get(c['offset']),agrees=mapping[c['target']]==calls.get(c['offset'])) for c in f['internal_calls'] if c['target'] in mapping]
                assert checks==match['mapped_helper_call_checks']
                assert all(c['agrees'] for c in checks)==match['mapped_helper_calls_consistent']
        counts=build['summary'];summary[name]=counts
        bounded=sum(any(m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['mapped_helper_calls_consistent'] for m in f['matches']) for f in build['functions'])
        exact=sum(any(m['inferred_function_entry'] and m['next_entry_equals_window_end'] and m['raw_byte_equality'] for m in f['matches']) for f in build['functions'])
        assert counts['candidate_functions']==len(build['functions']) and counts['entry_bounded_call_consistent_matches']==bounded and counts['entry_bounded_raw_exact_matches']==exact
    selected=obj(P/'selected-helper-results.json')
    for name in ['v146-build-01','v1461-build-01']:
        fs=selected[name]['helpers'];assert fs['core_fmt_write']['bytes']==1160 and not fs['core_fmt_write']['matches']
        assert fs['integer_entry']['bytes']==72 and not fs['integer_entry']['matches']
        assert fs['integer_inner']['differing_multiply_instruction_offsets']==[328,336]
        assert fs['unicode_is_printable']['bytes']==752 and not fs['unicode_is_printable']['matches']
        assert fs['panic_fmt']['matches'] and fs['panic_bounds_check']['matches']
    fs=selected['v144-build-01']['helpers'];assert fs['core_fmt_write']['bytes']==1056 and fs['core_fmt_write']['matches'][0]['raw_byte_equality']
    assert fs['integer_entry']['bytes']==352 and fs['integer_entry']['matches'][0]['raw_byte_equality']
    assert summary['v1461-build-01']==summary['v146-build-01']
    assert H(P/'v1461-build-01/pump_fees_candidate.so')==report['comparison']['candidate_sha256']
    assert not report['comparison']['full_byte_equality']
    return dict(verified=True,frozen_source_inputs=len(source),offline_build_returncode=0,legacy_target_setup_failure_only=True,
        compatible_target='sbpf-solana-solana (generic v0)',v1461_matches_v146_helper_summary=True,
        v1461_helpers=summary['v1461-build-01'],v144_still_strongest_measured_stock_candidate=True,
        unique_original_compiler_established=False,whole_original_byte_equality=False,runtime_transactions=0)
if __name__=='__main__':print(json.dumps(verify(),indent=2))
