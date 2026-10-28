"""Verify saved composition, actual direct-call targets, and fresh signed receipts."""
from pathlib import Path
import argparse, base64, difflib, gzip, hashlib, json, lzma, re, tarfile, tempfile, tomllib
from analyze import derive, module
from check_ir import derive_ir

if not __debug__:
    raise RuntimeError('verification requires assertions')
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sha = lambda b: hashlib.sha256(b).hexdigest()
def load(path):
    if not path.exists() and path.suffix=='.gz':
        path=path.with_suffix('.xz')
    raw=path.read_bytes()
    return json.loads(gzip.decompress(raw) if path.suffix=='.gz' else lzma.decompress(raw) if path.suffix=='.xz' else raw)
GAIN = ['O0207','O0208','O0210','O0214','O0215','O0217','O0219','O0222']
MAY = 'MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e'


def closure_delta(before, after):
    a, b = [{r['id']: r for r in report['rows']} for report in (before, after)]
    for field in ['normalized_counterparts', 'raw_counterparts', 'direct_closed_counterparts']:
        assert all(not row[field] or b[n][field] for n,row in a.items()), ('lost support',field)
    gain = sorted(n for n,row in b.items() if row['direct_closed_counterparts'] and not a[n]['direct_closed_counterparts'])
    assert gain == GAIN, ('closure gain',gain)
    assert before['legacy_buy'] == after['legacy_buy'] and after['legacy_buy']['bytes'] == 13784
    for report in (before, after):
        assert report['normalized_windows'] == 432
    assert (before['direct_closed_windows'],after['direct_closed_windows']) == (414,422)
    assert (before['raw_windows'],after['raw_windows']) == (84,85)
    # The actual target at O0210+528 must be O0209's retained counterpart.
    for call in b['O0210']['calls']:
        if call['candidate'] not in b['O0210']['direct_closed_counterparts']:
            continue
        target = next(t for t in call['targets'] if t['offset'] == 528)
        assert target['original_target'] == 539680 and target['target_closed']
        assert target['candidate_target'] in b['O0209']['direct_closed_counterparts']
    return gain


def check_initializer(packet, candidate):
    from solders.transaction import Transaction
    helper = module('initializer_cases', ROOT/'research/mayhem-quotes-current-recovery-20261027/runtime_check.py')
    canonical = {'rejections':helper.cases(ROOT/'research/mayhem-initializer-validation/validation_matrix.py'),
        'pump-cpi':[c for c in helper.cases(ROOT/'research/mayhem-initializer-validation/harness/pump_create_mayhem_differential.py') if c['case']!='zero-creator-is-rejected']}
    original = (ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    pump = (ROOT/'evidence/original/pump/deployed.so').read_bytes()
    compute = re.compile(r'^Program \S+ consumed \d+ of \d+ compute units$')
    summary = []
    for kind,cases in canonical.items():
        report = load(packet/f'runtime/initializer/{kind}.json.gz')
        assert report['candidate_sha256']==sha(candidate) and report['original_sha256']==sha(original)
        assert report['runner_sha256']==sha((packet/'controllers/initializer_replay.py').read_bytes())
        assert report['schema']=='initializer-source-origins-runtime-v1' and report['kind']==kind
        assert report['case_count']==len(cases) and [r['case'] for r in report['cases']]==cases and not report['mismatches']
        for n,digest in report['harness_sha256'].items():assert sha((ROOT/n).read_bytes())==digest
        fields = ['error','anchor_errors','before','after','events','inner','return','signed_transaction_base64'] if kind=='rejections' else ['before','after','error','events','inner','return']
        assert report['compared_fields']==fields
        signed = successes = raw_logs = 0
        for row in report['cases']:
            assert not row['differences'] and all(row['original'][f]==row['candidate'][f] for f in fields)
            logs = [row[side]['logs'] for side in ['original','candidate']]
            assert [l for l in logs[0] if not compute.fullmatch(l)]==[l for l in logs[1] if not compute.fullmatch(l)]
            raw_logs += logs[0]!=logs[1]
            successes += row['original']['error'] is None
            count = 1 if kind=='rejections' or not row['case'].get('init_global_params',True) else 2
            a,b = [row[s+'_executions'] for s in ['original','candidate']]
            assert len(a)==len(b)==count
            assert [x['signed_transaction_base64'] for x in a]==[x['signed_transaction_base64'] for x in b]
            if kind=='rejections':assert a[0]['signed_transaction_base64']==row['original']['signed_transaction_base64']
            for side,binary in [('original',original),('candidate',candidate)]:
                for execution in row[side+'_executions']:
                    tx = Transaction.from_bytes(base64.b64decode(execution['signed_transaction_base64'],validate=True))
                    assert all(tx.verify_with_results())
                    assert execution['program_accounts'][MAY]==dict(sha256=sha(binary),bytes=len(binary),executable=True)
                    if kind=='pump-cpi':assert execution['program_accounts']['6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P']==dict(sha256=sha(pump),bytes=len(pump),executable=True)
                    signed += 1
        assert successes==(0 if kind=='rejections' else 10)
        summary.append(dict(kind=kind,cases=len(cases),signed_records=signed,successes=successes,raw_log_differences=raw_logs))
    assert sum(r['signed_records'] for r in summary)==168
    return summary


def verify(packet=HERE, static_only=False):
    actual = {p.relative_to(packet).as_posix():sha(p.read_bytes()) for p in packet.rglob('*') if p.is_file() and p.name!='manifest.json' and '__pycache__' not in p.parts}
    assert actual==load(packet/'manifest.json'), 'packet manifest'
    for n,digest in load(packet/'references.json').items():assert sha((ROOT/n).read_bytes())==digest, ('external input',n)
    assert derive_ir(ROOT,packet)==load(packet/'ir/report.json')
    with tarfile.open(ROOT/'research/mayhem-amm-handler-shape-controls-20261027/base-source.tar.gz') as tar:
        source = {}
        for m in tar:
            assert m.isfile() and not Path(m.name).is_absolute() and '..' not in Path(m.name).parts and m.name not in source
            source[m.name]=tar.extractfile(m).read()
    before = {n:sha(b) for n,b in source.items()}
    assert before==load(packet/'baseline-source-inputs.json')==load(ROOT/'research/mayhem-quotes-current-recovery-20261027/source-inputs.json') and len(before)==67
    audit=load(packet/'post-build-input-audit.json')
    locked={p['name']+'-'+p['version']:p['checksum'] for p in tomllib.loads(source['Cargo.lock'].decode())['package'] if p.get('source','').startswith('registry+')}
    assert audit['registry']==locked and len(locked)==214
    assert audit['target_libraries']==load(ROOT/'research/mayhem-native-current432-composition/sdk/target-library-check.json')['files']
    assert audit['sdk']['archive_sha256']=='fcc41631c7f77561bf5412218bf297501dccf0305ea280f338f0ace2aab9f31e'
    tools=load(packet/'tools.json')
    assert all(tools[n]==digest for n,digest in audit['sdk']['tools'].items())
    changed = sorted(p.relative_to(packet/'overrides').as_posix() for p in (packet/'overrides').rglob('*') if p.is_file())
    assert changed==['curve-accounts/idls/pump.json','curve-accounts/src/interface_definition.rs']
    patch=[]
    for n in changed:
        new=(packet/'overrides'/n).read_bytes()
        patch.extend(difflib.unified_diff(source[n].decode().splitlines(True),new.decode().splitlines(True),fromfile='a/'+n,tofile='b/'+n))
        source[n]=new
    assert ''.join(patch)==(packet/'source.patch').read_text()
    after = {n:sha(b) for n,b in source.items()}
    assert after==load(packet/'composed-source-inputs.json')
    reports, images = {}, {}
    reader = module('allocator_elf', ROOT/'research/mayhem-quotes-current-recovery-20261027/reader.py')
    with tempfile.TemporaryDirectory() as td:
        for label in ['baseline','composed-linked','repeat-linked']:
            build = packet/'builds'/label
            launch,result,artifacts = [load(build/(n+'.json')) for n in ['launch','result','artifacts']]
            assert result['returncode']==0 and artifacts['source_unchanged'] and artifacts['checked_tools_unchanged']
            assert launch['source_inputs']==(before if label=='baseline' else after)
            symbols,candidate = [gzip.decompress((build/(n+'.so.gz')).read_bytes()) for n in ['symbols','candidate']]
            assert sha(symbols)==artifacts['symbols_sha256'] and sha(candidate)==artifacts['candidate_sha256']
            path = Path(td)/(label+'.so');path.write_bytes(symbols)
            reports[label]=derive(ROOT,path)
            stripped = Path(td)/(label+'-stripped.so');stripped.write_bytes(candidate)
            a,b = reader.Elf(path),reader.Elf(stripped)
            for section in a.sections:
                if section['flags']&2 and section['type']!=8:
                    t=b.sec[section['name']]
                    assert (section['address'],section['size'])==(t['address'],t['size'])
                    assert a.b[section['offset']:section['offset']+section['size']]==b.b[t['offset']:t['offset']+t['size']]
            images[label]=(symbols,candidate)
        before_path,after_path=[Path(td)/(label+'.so') for label in ['baseline','composed-linked']]
        prefix=ROOT/'research/mayhem-initializer-current-recovery-20261027'
        preservation=module('allocator_progress',prefix/'progress.py').compare((ROOT/'evidence/original/mayhem/deployed.so').read_bytes(),images['baseline'][0],images['composed-linked'][0])
        preservation['scope']='Preserve native baseline bodies, raw matches, positive direct edges and Source profiles; quote and initializer typed references checked separately.'
        assert not any(preservation[n] for n in ['body_losses','raw_losses','positive_direct_edge_losses','positive_Source_record_losses','observed_Source_profile_losses'])
        typed=dict(preservation=preservation)
        for key,file in [('buy','typed_data_reader.py'),('sell','sell_typed_reader.py')]:
            value=module('allocator_'+key,ROOT/'research/mayhem-buy-retained-recovery'/file).inspect(after_path)
            assert value['whole_body_normalized_equal'] and value['direct_callee_multiset_equal'] and value['typed_data_multiset_equal']
            assert value['original_data']==value['candidate_data'] and len(value['original_data'])==10
            typed[key]=value
        typed['initializer']=module('allocator_initializer',ROOT/'research/mayhem-quotes-current-recovery-20261027/initializer_analysis.py').inspect(ROOT,ROOT/'research/mayhem-quotes-current-recovery-20261027',before_path,after_path)
        assert typed['initializer']['snapshot']['complete_normalized_equal']
        assert typed==load(packet/'preservation.json')
    assert reports==load(packet/'analysis.json.gz') and images['composed-linked']==images['repeat-linked']
    reproduced=load(packet/'fresh-reproduction/summary.json')
    assert reproduced['controller_sha256']==sha((packet/'reproduce.py').read_bytes())
    for label,original_label in [('baseline','baseline'),('composed','composed-linked'),('repeat','repeat-linked')]:
        d=packet/'fresh-reproduction'/label
        launch,result,artifacts=[load(d/(n+'.json')) for n in ['launch','result','artifacts']]
        assert result['returncode']==0 and artifacts['source_unchanged'] and artifacts['checked_tools_unchanged']
        assert launch['source_inputs']==(before if label=='baseline' else after)
        for index,name in enumerate(['symbols','candidate']):
            binary=gzip.decompress((d/(name+'.so.gz')).read_bytes())
            assert binary==images[original_label][index] and sha(binary)==artifacts[name+'_sha256']
    gain=closure_delta(reports['baseline'],reports['composed-linked'])
    candidate=images['composed-linked'][1]
    assert candidate!=(ROOT/'evidence/original/mayhem/deployed.so').read_bytes()
    result=dict(normalized_windows=432,native_raw_windows=85,direct_closed_windows=422,new_direct_closed_windows=gain,new_normalized_windows=0,legacy_buy_bytes=13784,repeat_identical=True,whole_elf_equal=False)
    if static_only:return result
    trades=module('allocator_trade_receipts', ROOT/'research/mayhem-accounting-extend-recovery/verify.py')
    verified=[]
    original_hash=sha((ROOT/'evidence/original/mayhem/deployed.so').read_bytes())
    candidate_hash=sha(candidate)
    for name,count in trades.EXPECTED.items():
        report=load(packet/f'runtime/{name}.json.gz')
        checked=trades.check_trade_receipts(name,report,candidate,ROOT)
        assert checked['exact_noncompute_logs']==count
        for row in report['cases']:
            for side,digest in [('original',original_hash),('candidate',candidate_hash)]:
                for phase in ['before','after']:
                    account=row[side][phase][MAY]
                    assert account['data_sha256']==digest and account['executable']
        verified.append(checked)
    result.update(trades=verified,initializer=check_initializer(packet,candidate))
    assert sum(r['cases'] for r in verified)==6636
    assert result==load(packet/'summary.json'), 'saved summary'
    return result


if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--static-only',action='store_true');args=ap.parse_args()
    print(json.dumps(verify(static_only=args.static_only),indent=2))
