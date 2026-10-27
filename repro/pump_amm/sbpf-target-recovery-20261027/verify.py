#!/usr/bin/env python3
"""Verify the isolated same-source SBF/SBPF comparison without compiling.

The default check also replays the three member comparisons against the retained
SDK archive. --skip-archive-member-replay omits only that expensive replay and
reports the omission explicitly; SDK and archive hashes are still checked.
"""
from pathlib import Path
import argparse, collections, hashlib, json, struct, sys, tarfile
W=Path(__file__).resolve().parent
ROOT=next(p for p in W.parents if (p/'evidence/original/pump_amm/deployed.so').exists())
sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf

def digest(path):
    h=hashlib.sha256()
    with Path(path).open('rb')as f:
        for chunk in iter(lambda:f.read(8*1024*1024),b''):h.update(chunk)
    return h.hexdigest()
def read(name):return json.loads((W/name).read_text())
def windows(original,candidate):
    index=collections.defaultdict(list)
    for f in candidate.funcs:
        a,n=f['start'],f['size']
        key=(n,hashlib.sha256(candidate.normalized[a:a+n]).digest(),json.dumps(candidate.pattern(a,n),sort_keys=True))
        index[key].append(f)
    entries=sorted(set(original.entries)|{original.lo});out={}
    for a,b in zip(entries,entries[1:]+[original.hi]):
        key=(b-a,hashlib.sha256(original.normalized[a:b]).digest(),json.dumps(original.pattern(a,b-a),sort_keys=True))
        matches=index[key]
        out[a]={'end':b,'matches':matches,'raw':any(original.b[a:b]==candidate.b[f['start']:f['start']+f['size']]for f in matches)}
    return out

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sdk',type=Path)
    parser.add_argument('--archive',type=Path)
    parser.add_argument('--skip-archive-member-replay',action='store_true')
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    manifest=read('manifest.json')
    for name,sha in manifest['files'].items():assert digest(W/name)==sha,('packet file changed',name)
    original=ROOT/'evidence/original/pump_amm/deployed.so'
    assert digest(original)==manifest['original_sha256']
    prime,strict=read('builds/prime-record.json'),read('builds/strict-record.json')
    for label,record in [('prime',prime),('strict',strict)]:
        assert digest(W/'builds/executed-build-adapter.py')==record['adapter_sha256']
        assert digest(W/'builds/base-build-cached.py')==record['base_builder_sha256']
        assert digest(W/'provenance/target-provenance.json')==record['target_provenance_sha256']
        assert digest(W/'provenance/sbpf-archive-provenance.json')==record['sbpf_archive_provenance_sha256']
        assert record['returncode']==0 and record['source_unchanged']
        assert record['source_sha256']==record['source_after_sha256']
        assert digest(W/f'builds/{label}.log')==record['build_log_sha256']
        assert record['command'][record['command'].index('--target')+1]=='sbpf-solana-solana'
        assert record['environment']['CARGO_BUILD_JOBS']=='2'
        assert record['environment']['CARGO_TARGET_SBPF_SOLANA_SOLANA_RUSTFLAGS']==' -Zremap-cwd-prefix='
        assert '--network=none' in record['command'] and '--pull=never' in record['command']
        assert '--cpus=2' in record['command'] and '--memory=4g' in record['command']
        assert digest(W/'artifacts/candidate.so')==record['comparison']['candidate_sha256']
        assert digest(W/'artifacts/unstripped.so')==record['unstripped_sha256']==record['archived_unstripped_sha256']
    assert prime['priming'] and not strict['priming']
    assert all(prime['dependency_cache_after'].get(k)==v for k,v in prime['dependency_cache_before'].items())
    assert strict['dependency_cache_before']==strict['dependency_cache_after']==prime['dependency_cache_after']
    assert 'Compiling pump-amm-recovered' in (W/'builds/strict.log').read_text()
    added=len(set(prime['dependency_cache_after'])-set(prime['dependency_cache_before']))
    assert added==252

    sources=read('provenance/source-copy-binding.json')
    for f in sources['files']:
        assert f['sha256']==f['copy_sha256']==digest(W/'source'/f['path'])
        assert f['mtime_ns_preserved']
    source_map=read('provenance/source-input-map.json');prefix=source_map['build_source_prefix']
    for name,sha in strict['source_sha256'].items():
        local=W/'source'/name[len(prefix):]if name.startswith(prefix)else W/source_map['extra_inputs'][name]
        assert digest(local)==sha,(name,local)
    assert prime['source_sha256']==strict['source_sha256']

    target=read('provenance/target-provenance.json')
    assert not target['target_spec_differences']
    assert all(x['returncode']==0 for x in target['commands'])
    assert 'sbpf-solana-solana' in target['commands'][1]['stdout'].splitlines()
    assert json.loads(target['commands'][2]['stdout'])==json.loads(target['commands'][3]['stdout'])
    sdk=args.sdk or Path(strict['archive_provenance']['sdk'])
    for old,sha in strict['tool_sha256'].items():assert digest(sdk/Path(old).relative_to(Path(strict['archive_provenance']['sdk'])))==sha
    for rel,sha in strict['target_rlib_sha256'].items():assert digest(sdk/rel)==sha
    archive_record=read('provenance/sbpf-archive-provenance.json')
    archive=args.archive or Path(archive_record['archive'])
    assert digest(archive)==archive_record['archive_sha256']=='6719b889d60677a8a2fcf4c82f68441a1afe0ab093edd2efe9f84a67a808b3e9'
    wanted={x['member'].removeprefix('./'):x for x in archive_record['members']}
    for rel,row in wanted.items():assert digest(sdk/rel)==row['sha256'] and row['local_bytes_equal']
    replayed=0
    if not args.skip_archive_member_replay:
        with tarfile.open(archive,'r|bz2')as tar:
            for member in tar:
                name=member.name.removeprefix('./')
                if name not in wanted:continue
                row=wanted[name];data=tar.extractfile(member).read()
                assert len(data)==row['bytes']and hashlib.sha256(data).hexdigest()==row['sha256']
                replayed+=1
                if replayed==len(wanted):break
        assert replayed==3

    o=Elf(original);baseline=Elf(W/'baseline/unstripped.so');candidate=Elf(W/'artifacts/unstripped.so')
    for rel,elf in [('baseline/candidate.so',baseline),('artifacts/candidate.so',candidate)]:
        stripped=Elf(W/rel)
        assert stripped.b[stripped.lo:stripped.hi]==elf.b[elf.lo:elf.hi]
        assert stripped.pattern(stripped.lo,stripped.hi-stripped.lo)==elf.pattern(elf.lo,elf.hi-elf.lo)
    before,after=windows(o,baseline),windows(o,candidate)
    assert before.keys()==after.keys()and len(before)==785
    old={a for a,r in before.items()if r['matches']};new={a for a,r in after.items()if r['matches']}
    gained=sorted(new-old);lost=sorted(old-new)
    assert len(old)==572 and len(new)==577
    assert sum(r['raw']for r in before.values())==115
    assert sum(r['raw']for r in after.values())==124
    assert gained==[0xa9b0,0xf8ca0,0x1016a8,0x10efd8,0x111b38]and not lost
    for at in gained:assert after[at]['end']-at==56 and after[at]['raw']
    expected=read('comparison.json')
    assert gained==expected['gained_original_windows'] and expected['lost_original_windows']==[]
    assert digest(W/'baseline/candidate.so')==expected['baseline_candidate_sha256']=='4e92463b170186f499a47be5424543af38aad88cc1a04db27de0aa35dae31d70'
    assert digest(W/'artifacts/candidate.so')==expected['candidate_sha256']=='5e91f702680c96b35f00feffd0ad98cbda7724867536273b3b3e2827c2775377'
    result={'status':'passed','manifest_sha256':digest(W/'manifest.json'),'verifier_sha256':digest(Path(__file__)),'executed_adapter_sha256':strict['adapter_sha256'],'candidate_sha256':expected['candidate_sha256'],'source_files':len(sources['files']),'source_identity':True,'prime_and_strict_identical':True,'immutable_existing_prime_dependencies':True,'new_prime_dependency_artifacts':added,'strict_dependencies_unchanged':True,'windows':785,'baseline_normalized':572,'candidate_normalized':577,'baseline_raw':115,'candidate_raw':124,'gained_windows':[hex(a)for a in gained],'lost_windows':[],'sdk_archive_hash_checked':True,'sdk_library_hashes_checked':True,'archive_member_replays':replayed,'archive_member_replay_skipped':args.skip_archive_member_replay,'runtime_tests_run':0,'whole_elf_equal':False}
    if args.output:args.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))

if __name__=='__main__':main()
