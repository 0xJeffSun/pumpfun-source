"""Recheck the composed parser experiment; execute no compiler, VM or archived script."""
if not __debug__:
    raise RuntimeError('Optimized Python disables integrity assertions')

from collections import Counter
from pathlib import Path
import argparse, gzip, hashlib, importlib.util, json, sys, tempfile
import restore

P = Path(__file__).resolve().parent
ROOT = P.parents[1]
PREFIXES = ('layout-root-parser-', 'qualified-parser-current-', 'parser-current-',
            'allocator-current-parser-', 'allocator-current-runtime/',
            'accounts-lane-initializer-cpi.py',
            'build_mixed_root.py', 'layout-lane-linux-target2-inputs.json')
sha = lambda b: hashlib.sha256(b).hexdigest()
read = lambda p: json.loads(p.read_bytes())
raw = lambda p: gzip.decompress(p.read_bytes()) if p.suffix == '.gz' else p.read_bytes()

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result

def helpers(root):
    for name, digest in read(P/'external-inputs.json').items():
        assert sha((root/name).read_bytes()) == digest, name
    parent = root/'research/mayhem-sizing-panic-recovery'
    sys.path.insert(0, str(parent))
    try:
        sizing = module('current_parser_sizing', parent/'verify.py')
    finally:
        sys.path.pop(0)
    return dict(
        sizing=sizing,
        reader=module('current_parser_reader', root/'research/mayhem-trade-origins-validator/reader.py'),
        progress=module('current_parser_progress', root/'research/mayhem-trade-origins-validator/progress.py'),
        translation=module('current_parser_translation', root/'research/mayhem-trade-origins-validator/translation.py'),
        trade=module('current_parser_trade', root/'research/mayhem-accounting-extend-recovery/verify.py'))

def frontier(root, work, api):
    reader = api['reader']
    original = reader.Elf(root/'evidence/original/mayhem/deployed.so')
    old_bytes = raw(root/'research/mayhem-sizing-panic-recovery/artifacts/recovered/symbols.so.gz')
    old_path = work/'parent-symbols.so'
    old_path.write_bytes(old_bytes)
    parent = reader.Elf(old_path)
    candidate_path = work/'layout-root-parser-qualified-01-build/symbols.so'
    candidate = reader.Elf(candidate_path)
    progress = api['progress'].compare(original.b, parent.b, candidate.b)
    assert (progress['matches'], progress['raw_matches'], progress['positive_direct_edges_after'],
            progress['positive_Source_records_after']) == (429,139,4289,446)
    assert progress['body_losses'] == progress['raw_losses'] == []
    rows = read(root/'research/mayhem-trade-origins-validator/audit.json')['rows']
    key = lambda w: (w['end']-w['start'], w['normalized_sha256'], json.dumps(w['normalization_pattern'],sort_keys=True))
    wanted = Counter(key(original.window(r['start'],r['end'])) for r in rows)
    def capacity(elf):
        spans = {(s['value'],s['size']) for s in elf.symbols
                 if s['info']&15 == 2 and s['size']>=8 and elf.lo<=s['value']<elf.hi}
        bodies = Counter(key(elf.window(start,start+size)) for start,size in spans)
        return sum((wanted & bodies).values())
    before, after = capacity(parent), capacity(candidate)
    assert (before,after) == (428,429)
    def raw_bodies(elf):
        result = {}
        for s in elf.symbols:
            if s['info']&15 == 2 and s['size']>=8 and elf.lo<=s['value']<elf.hi:
                digest = sha(elf.b[s['value']:s['value']+s['size']])
                result.setdefault(digest,set()).add(s['name'])
        return result
    old_raw, new_raw = raw_bodies(parent), raw_bodies(candidate)
    gains = []
    for row in rows:
        body = original.b[row['start']:row['end']]
        digest = sha(body)
        if digest in new_raw and digest not in old_raw:
            gains.append(dict(original_id=row['id'],original_start=row['start'],bytes=len(body),
                              candidate_symbols=sorted(new_raw[digest])))
    assert gains == read(P/'raw-gains.json')['gains'] and len(gains)==39
    assert sum(row['bytes'] for row in gains)==33968
    assert api['sizing'].inspect(candidate_path)
    assert api['sizing'].inherited(candidate_path)
    return dict(normalized=429, raw_local=139, unmatched=12, injective_before=before,
                injective_after=after, additional_raw_bodies=39, additional_raw_text_bytes=33968,
                positive_direct_calls=4289, Source_observations=446,
                whole_original_equal=original.b==candidate.b)

def check_builds(root, work):
    parent = root/'research/mayhem-sizing-panic-recovery'
    source_module = module('current_parser_sources', parent/'source.py')
    before = source_module.archived(parent/'source.tar.gz')
    reference = root/'research/mayhem-allocator-parser-provenance'
    lib, idl = 'curve-accounts/src/lib.rs', 'curve-accounts/idls/pump.json'
    old_lib = raw(reference/'reference/sources'/ (lib+'.gz'))
    assert before[lib] == old_lib+b'\npub use anchor_spl::token_interface;\n'
    assert before[idl] == raw(reference/'reference/sources'/(idl+'.gz'))
    sources = {}
    for role, control in [('enabled','parser-create'),('gated','parser-create-gated')]:
        directory = work/('allocator-current-parser-'+role)/'programs/mayhem'
        actual = {p.relative_to(directory).as_posix():p.read_bytes() for p in directory.rglob('*') if p.is_file()}
        expected = dict(before)
        parser = raw(reference/'direct'/control/'source'/(lib+'.gz'))
        assert parser.startswith(old_lib)
        expected[lib] += parser[len(old_lib):]
        expected[idl] = raw(reference/'direct'/control/'source'/(idl+'.gz'))
        assert actual == expected and len(actual)==67
        sources[role] = {name:sha(data) for name,data in actual.items()}
    tools = {Path(n).name:h for n,h in read(parent/'builds/control/launch.json')['checked_tools'].items()}
    tools['llvm-objcopy'] = tools['llvm-objcopy-v152']
    target = read(work/'layout-lane-linux-target2-inputs.json')
    assert target['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
    outputs = {}
    for label, role in [('qualified-01','enabled'),('qualified-repeat-01','enabled'),
                        ('qualified-gated-01','gated'),('unqualified-01','enabled')]:
        folder = work/('layout-root-parser-'+label+'-build')
        launch, result = read(folder/'launch.json'), read(folder/'result.json')
        assert launch['source_inputs']==sources[role] and launch['target_inputs']==target
        assert launch['controller_sha256']==sha((work/'build_mixed_root.py').read_bytes())
        assert {Path(n).name for n in launch['checked_tools']} == {'rustc','rustdoc','cargo','llvm-objcopy','clang','llvm-ar'}
        assert all(h==tools[Path(n).name] for n,h in launch['checked_tools'].items())
        assert all(x in launch['command'] for x in ['--locked','--offline','sbpf-solana-solana'])
        assert launch['environment_overrides']['CARGO_NET_OFFLINE']=='true'
        assert result['returncode']==0 and all(result[k] for k in ['source_unchanged','tools_unchanged','target_libraries_unchanged'])
        assert result['stderr_sha256']==sha((folder/'stderr').read_bytes())
        assert (folder/'stderr').read_bytes().count(b'--crate-name mayhem_recovered ')==1
        images = {name:(folder/(name+'.so')).read_bytes() for name in ['candidate','symbols']}
        assert all(result[name+'_sha256']==sha(data) for name,data in images.items())
        outputs[label] = images
    assert outputs['qualified-01']==outputs['qualified-repeat-01']
    assert outputs['qualified-gated-01']['candidate']==raw(parent/'artifacts/recovered/candidate.so.gz')
    reader = module('current_parser_control_reader', root/'research/mayhem-trade-origins-validator/reader.py')
    before_path, after_path = work/'parent-symbols.so', work/'gated-symbols.so'
    before_path.write_bytes(raw(parent/'artifacts/recovered/symbols.so.gz'))
    after_path.write_bytes(outputs['qualified-gated-01']['symbols'])
    before, after = reader.Elf(before_path), reader.Elf(after_path)
    changed = [s['name'] for s in before.sections
               if before.b[s['offset']:s['offset']+s['size']] !=
                  after.b[after.sec[s['name']]['offset']:after.sec[s['name']]['offset']+after.sec[s['name']]['size']]]
    assert set(changed)=={'.symtab','.strtab'} and before.b!=after.b
    assert sha(outputs['qualified-01']['candidate'])=='ed5b4020ca2659b427739a384bc7c014e2b192f81cce60d7d9b770d4978f0232'
    return outputs

def check_runtime(root, work, api, candidate):
    original = (root/'evidence/original/mayhem/deployed.so').read_bytes()
    count = 0
    for name in api['trade'].EXPECTED:
        report = json.loads(raw(work/'allocator-current-runtime'/(name+'.json.gz')))
        result = api['trade'].check_trade_receipts(name,report,candidate,root)
        count += result['cases']
        for row in report['cases']:
            api['sizing'].attest(row['original'],sha(original))
            api['sizing'].attest(row['candidate'],sha(candidate))
            assert api['sizing'].logs(row['original'])==api['sizing'].logs(row['candidate'])
    assert count==6636
    return dict(trade_comparisons=count,signed_trade_records=count*2,exact_noncompute_logs=count)

def check_initializer(root, work, candidate):
    from solders.transaction import Transaction
    import base64
    fields = ['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64']
    signed = 0
    for suffix, count in [('reject',53),('cpi',16)]:
        report = json.loads(raw(work/('parser-current-initializer-'+suffix+'.json.gz')))
        assert report['candidate_sha256']==sha(candidate)
        assert report['original_sha256']==sha((root/'evidence/original/mayhem/deployed.so').read_bytes())
        assert report['case_count']==len(report['cases'])==count and report['mismatches']==[]
        if suffix=='reject':
            assert report['compared_fields']==fields
            assert report['runner_sha256']==sha((root/'research/mayhem-initializer-validation/validation_matrix.py').read_bytes())
            assert report['harness_sha256']==sha((root/'repro/behavioral-recovery/scripts/mayhem_initialize_state_differential.py').read_bytes())
            assert len({r['case']['name'] for r in report['cases']})==53
        else:
            assert report['runner_sha256']==sha((work/'accounts-lane-initializer-cpi.py').read_bytes())
            assert report['harness_sha256']==sha((root/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py').read_bytes())
            assert report['original_pump_sha256']==sha((root/'evidence/original/pump/deployed.so').read_bytes())
            assert len({r['case']['case'] for r in report['cases']})==16
            assert sum(r['original']['error'] is None for r in report['cases'])==10
        for row in report['cases']:
            a,b = row['original'],row['candidate']
            compared = fields if suffix=='reject' else ['before','after','error','events','inner','return']
            assert all(a[k]==b[k] for k in compared) and row['differences']==[]
            if suffix=='reject':
                assert a['error'] is not None and b['error'] is not None
                transactions = [a['signed_transaction_base64'],b['signed_transaction_base64']]
            else:
                assert row['original_signed_transactions']==row['candidate_signed_transactions']
                transactions = row['original_signed_transactions']+row['candidate_signed_transactions']
            for encoded in transactions:
                assert all(Transaction.from_bytes(base64.b64decode(encoded)).verify_with_results())
                signed += 1
    assert signed==168
    return dict(initializer_comparisons=69,initializer_signed_records=signed,successful_initializer_cases=10)

def verify(root=ROOT, runtime=True):
    api = helpers(root)
    with tempfile.TemporaryDirectory(prefix='mayhem-control-check-') as td:
        work = Path(td)/'work'
        archive = restore.verify_or_restore(work,PREFIXES)
        outputs = check_builds(root,work)
        progress = frontier(root,work,api)
        translation = [api['translation'].compare(
            work/('layout-root-parser-unqualified-01-build/'+name+'.so'),
            work/('layout-root-parser-qualified-01-build/'+name+'.so'),
            work/'parser-current-unqualified.map',work/'qualified-parser-current-01/qualified.map',name+'.so')
            for name in ['candidate','symbols']]
        assert all(x['result']['entire_file_accounted_for'] and x['result']['function_sections']==447 for x in translation)
        result = dict(archive_files=archive['files'],source_files=67,**progress,
                      native_repeat_equal=True,gated_stripped_equal_parent=True,
                      whole_file_permutation=True,runtime_verified=runtime,
                      original_source_authenticated=False,selected_checkpoint_promoted=False)
        if runtime:
            result.update(check_runtime(root,work,api,outputs['qualified-01']['candidate']))
            result.update(check_initializer(root,work,outputs['qualified-01']['candidate']))
        return result

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository-root',type=Path,default=ROOT)
    parser.add_argument('--skip-runtime',action='store_true')
    args = parser.parse_args()
    print(json.dumps(verify(args.repository_root.resolve(),not args.skip_runtime),indent=2))
