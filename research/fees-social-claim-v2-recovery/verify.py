"""Verify reconstructed Social claim-v2 code, original-relative pointers and native receipts."""
from pathlib import Path
from functools import lru_cache
from collections import Counter
import argparse, contextlib, difflib, gzip, hashlib, importlib.util, io, json, re, struct, sys
if not __debug__:
    raise RuntimeError('verification requires assertions; do not use Python -O')
sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT / 'research/fees-program-id-references'
LABEL = 'social-claim-v2-qualified'
FILES = ['programs/pump-fees/src/social.rs', 'programs/pump-fees/src/instructions/fee_sharing/mod.rs']

def read(path):
    return path.read_bytes() if path.is_file() else gzip.decompress(path.with_name(path.name + '.gz').read_bytes())
def load(path): return json.loads(read(path))
def sha(data): return hashlib.sha256(data).hexdigest()
def module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    value = importlib.util.module_from_spec(spec); spec.loader.exec_module(value)
    return value

@lru_cache(maxsize=1)
def parent_state():
    parent = module('social_recovery_parent', PARENT / 'verify.py')
    with contextlib.redirect_stdout(io.StringIO()): parent.verify()
    return parent, parent.sources(), parent.vendor_sources()

def source_inputs():
    _, old, _ = parent_state()
    expected = dict(old)
    name = FILES[0]; text = old[name].decode()
    for a, b, count in [('&ctx.accounts.quote_mint.key(),', 'ctx.accounts.quote_mint.key(),', 2),
                        ('&ctx.accounts.quote_token_program.key(),', 'ctx.accounts.quote_token_program.key(),', 2)]:
        assert text.count(a) == count; text = text.replace(a, b)
    a = 'let platform=state.platform;let user_id=state.user_id.as_bytes().to_vec();'
    b = 'let bump=state.bump;let user_id=state.user_id.as_bytes().to_vec();let platform=state.platform;'
    assert text.count(a) == 1; text = text.replace(a, b)
    a = 'user_id.as_slice(),&[platform],&[state.bump]'
    assert text.count(a) == 1; text = text.replace(a, 'user_id.as_slice(),&[platform],&[bump]')
    split = text.index(' pub fn claim(ctx:')
    first, rest = text[:split], text[split:]
    a = 'emit!(event);emit_cpi!(event);Ok(Some(event))\n'
    assert first.count(a) == 1
    expected[name] = (first.replace(a, 'emit!(event);emit_cpi!(event);return Ok(Some(event));\n') + rest).encode()
    name = FILES[1]; text = old[name].decode()
    for a, b in [('    mint: &Pubkey,', '    mint_value: Pubkey,'),
                 ('    token_program: &Pubkey,', '    token_program_value: Pubkey,'),
                 (') -> Result<()> {\n    let expected = anchor_spl::associated_token::get_associated_token_address_with_program_id(',
                  ') -> Result<()> { let mint=&mint_value; let token_program=&token_program_value;\n    let expected = anchor_spl::associated_token::get_associated_token_address_with_program_id(')]:
        assert text.count(a) == 1; text = text.replace(a, b)
    expected[name] = text.encode()
    assert {str(p.relative_to(HERE / 'overrides')) for p in (HERE / 'overrides').rglob('*') if p.is_file()} == set(FILES)
    patch = []
    for name in sorted(FILES):
        assert expected[name].count(b'\n') == old[name].count(b'\n')
        assert read(HERE / 'overrides' / name) == expected[name]
        patch.extend(difflib.unified_diff(old[name].decode().splitlines(True), expected[name].decode().splitlines(True), fromfile='parent/' + name, tofile='recovered/' + name))
    assert ''.join(patch).encode() == read(HERE / 'source.patch')
    assert {name: sha(data) for name, data in expected.items()} == load(HERE / 'source-inputs.json')
    assert len(expected) == 46
    return expected

def check_manifest():
    paths = list(HERE.rglob('*'))
    assert not any(p.is_symlink() for p in paths), 'packet includes a symlink'
    assert all(p.is_dir() or p.is_file() for p in paths), 'packet includes a special file'
    actual = {p.relative_to(HERE).as_posix(): sha(p.read_bytes())
              for p in paths if p.is_file() and p != HERE / 'manifest.json'}
    assert actual == load(HERE / 'manifest.json')

def verify():
    check_manifest()
    assert load(HERE / 'parent.json') == {'path': str(PARENT.relative_to(ROOT)), 'manifest_sha256': sha(read(PARENT / 'manifest.json'))}
    for name, digest in load(HERE / 'external-inputs.json').items(): assert sha(read(ROOT / name)) == digest
    parent, _, vendor = parent_state()
    sources = source_inputs()
    comparison = module('social_recovery_comparison', HERE / 'comparison.py')
    w = module('social_recovery_windows', ROOT / 'research/fees-composed-frontier188/window_map.py')
    w.m.elf_layout = lru_cache(maxsize=8)(w.m.elf_layout)
    w.m.relocations = lru_cache(maxsize=8)(w.m.relocations)
    comparison.w = w
    p2 = module('social_recovery_sections', ROOT / 'research/fees-common-quote-data-order/verify.py')
    before = read(PARENT / 'builds/candidate/symbols.so')
    candidate = read(HERE / 'builds/candidate/symbols.so')
    stripped = read(HERE / 'builds/candidate/candidate.so')
    original = read(ROOT / 'evidence/original/pump_fees/deployed.so')
    assert candidate == read(HERE / 'builds/repeat/symbols.so')
    assert stripped == read(HERE / 'builds/repeat/candidate.so')
    assert original != stripped and original[:w.m.elf_layout(original)['elf_extent']] != stripped
    assert w.m.elf_layout(stripped)['elf_extent'] == len(stripped)
    assert struct.unpack_from('<H', candidate, 56)[0] == struct.unpack_from('<H', stripped, 56)[0] == 4
    proof = comparison.check(original, before, candidate)
    assert proof == load(HERE / 'comparison.json')
    assert proof['normalized_matches'] == 579 and proof['raw_matches'] == 198 and not proof['raw_lost']
    assert proof['counts']['original_matched_calls'] == 4333
    assert proof['counts']['original_matched_code_pointers'] == 62
    assert proof['counts']['original_matched_data_pointers'] == 2012
    assert proof['counts']['original_data_fields'] == 379
    location = module('social_recovery_locations', ROOT / 'research/fees-sharing-slice-recovery/verify.py')
    source_counts = []
    for image in [original, candidate]:
        found = Counter()
        for address, kind in w.m.relocations(image):
            if kind & 0xffffffff != 8: continue
            try: found[location.location(w, image, address)] += 1
            except (AssertionError, ValueError, StopIteration, struct.error, UnicodeDecodeError): pass
        source_counts.append(found)
    assert source_counts[0] == source_counts[1] and sum(source_counts[0].values()) == 105
    for section in w.m.elf_layout(candidate)['sections']:
        if section['flags'] & 2 and section['type'] != 8:
            assert w.m.section_data(candidate, section['name']) == w.m.section_data(stripped, section['name'])

    layout = read(HERE / 'layout/ordered.ld').decode()
    clean = lambda s: re.sub(r'\S+\("[^"\n]+"\)', '@INPUT_SECTION@', s)
    assert clean(layout) == clean(read(PARENT / 'layout/ordered.ld').decode())
    old_map = read(PARENT / 'builds/candidate/link.map').decode()
    new_map = read(HERE / 'builds/candidate/link.map').decode()
    total = 0
    for name in ['.text', '.rodata', '.data.rel.ro']:
        rows = p2.input_sections(new_map, name)
        prior_rows = p2.input_sections(old_map, name)
        assert len(rows) == len(prior_rows)
        body = re.search(r'  ' + re.escape(name) + r' : \{(.*?)\n  \}', layout, re.S).group(1)
        assert re.findall(r'(\S+)\("([^"\n]+)"\)', body) == [('*' if r['owner'] == '<internal>' else p2.owner(r['owner']), r['section']) for r in rows]
        for a, b in zip(prior_rows, rows):
            if name == '.text' and a['address'] == 137096:
                assert (a['size'], b['size']) == (10608, 10664)
            else: assert a['size'] == b['size']
        total += len(rows)
    assert total == 1474
    for role, suffix in [('candidate', ''), ('repeat', '-repeat')]:
        label = LABEL + suffix; folder = HERE / 'builds' / role
        launch, result = load(folder / 'launch.json'), load(folder / 'result.json')
        log = read(folder / 'build.log'); command = launch['command']
        assert result['exit_code'] == 0 and result['source_unchanged'] is True and result['vendor_unchanged'] is True
        assert result['candidate_sha256'] == sha(stripped) and result['symbols_sha256'] == sha(candidate) and result['log_sha256'] == sha(log)
        assert launch['inputs'] == {**{n: sha(b) for n, b in sources.items()}, 'ordered.ld': sha(layout.encode()), 'linker.sh': sha(read(folder / 'linker.sh'))}
        assert launch['vendor_inputs'] == {n: sha(b) for n, b in vendor.items()}
        assert command[:2] == ['podman', 'exec'] and '--locked' in command and '--offline' in command
        assert 'RUSTC=/work/sdk/rust/bin/rustc' in command
        assert command[command.index('--target') + 1] == 'sbpf-solana-solana'
        assert command[command.index('--manifest-path') + 1] == '/work/next644/' + label + '/programs/pump-fees/Cargo.toml'
        assert 'linker=/work/next644/' + label + '/linker.sh' in command
        assert log.count(b'--crate-name pump_fees_candidate ') == 1 and b'Finished `release`' in log
        wrapper = read(PARENT / 'builds/candidate/linker.sh').decode().replace('next641', 'next644').replace('id578-program-ids-qualified', label)
        assert wrapper.encode() == read(folder / 'linker.sh')
    prior = module('social_recovery_runtime', ROOT / 'research/fees-qualified-linker-layout/verify.py')
    runtime = load(HERE / 'runtime.json')
    prior.check_runtime(runtime, parent.load(PARENT / 'runtime.json'), sha(original), sha(stripped))
    execution = load(HERE / 'runtime-execution.json')
    assert execution['jobs'] == 4 and execution['candidate_sha256'] == sha(stripped)
    assert execution['canonical_runner_sha256'] == sha(read(ROOT / 'scripts/fees_validate_all.py'))
    assert len(execution['suites']) == 18 and runtime['case_count'] == 17331
    for receipt in execution['suites'].values():
        assert receipt['exit_code'] == 0
        assert receipt['script_sha256'] == sha(read(ROOT / 'scripts' / Path(receipt['command'][2]).name))
    return {**proof, 'candidate_sha256': sha(stripped), 'symbols_sha256': sha(candidate), 'runtime_cases': 17331, 'runtime_suites': 18}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--materialize', type=Path)
    args = parser.parse_args()
    result = verify()
    if args.materialize:
        assert not args.materialize.exists()
        _, _, vendor = parent_state()
        files = {**source_inputs(), 'ordered.ld': read(HERE / 'layout/ordered.ld'), 'linker.sh': read(HERE / 'builds/candidate/linker.sh')}
        files.update({'vendor/' + n: b for n, b in vendor.items()})
        for name, data in files.items():
            dest = args.materialize / name; dest.parent.mkdir(parents=True, exist_ok=True); dest.write_bytes(data)
        (args.materialize / 'linker.sh').chmod(0o755)
    print(json.dumps(result, indent=2))
