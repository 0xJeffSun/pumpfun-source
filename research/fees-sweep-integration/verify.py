"""Verify recovered Sweep source, original-relative pointers and native receipts."""
from pathlib import Path
from functools import lru_cache
from collections import Counter
import argparse, contextlib, difflib, gzip, hashlib, importlib.util, io, json, re, struct, sys
if not __debug__:
    raise RuntimeError('verification requires assertions; do not use Python -O')
sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
PARENT = ROOT / 'research/fees-extend-integration'
LABEL = 'sweep-qualified'
EXPECTED_RAW = 200  # Observed first qualified proof; repeat must be byte-identical.
FILES = ['programs/pump-fees/src/instructions/buyback/mod.rs', 'programs/pump-fees/src/state.rs']
BEFORE_SHA256 = {'programs/pump-fees/src/instructions/buyback/mod.rs': 'e72debbf966e057b912a4516f575b89c7735b83a6fb96ee0c45cdb48387b60e5', 'programs/pump-fees/src/state.rs': '4426a6aa75f6907f311a90cc0c55ade6965da883fa26e0e6e5c6101ba317abba'}
AFTER_SHA256 = {'programs/pump-fees/src/instructions/buyback/mod.rs': '464ffa8af7bbfacedaeeedbe06b9a9a71586fa362afdaa235503159c8d805c88', 'programs/pump-fees/src/state.rs': '369b4bf3069ddb9aad564e7cbeafeb6e29850af93004f978789090d5b98d164c'}
SOURCE_EDITS = {'programs/pump-fees/src/instructions/buyback/mod.rs': [{'start': 108, 'end': 110, 'before': '    require_gt!(8u8,index,FeeError::InvalidBuybackIndex);\n    let vault = &mut ctx.accounts.buyback_vault; let bump_value = ctx.bumps.buyback_vault;\n', 'after': '    let bump_value = ctx.bumps.buyback_vault; let destination = &mut ctx.accounts.destination; require_gt!(8u8,index,FeeError::InvalidBuybackIndex);\n    let vault = &mut ctx.accounts.buyback_vault;\n\n'}, {'start': 113, 'end': 115, 'before': '    let index_seed=[index];let bump=[bump_value];let seeds:&[&[u8]]=&[b"buyback-vault",&index_seed,&bump];\n    anchor_spl::token_interface::transfer_checked(CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(),anchor_spl::token_interface::TransferChecked{from:ctx.accounts.buyback_vault_ata.to_account_info(),mint:ctx.accounts.mint.to_account_info(),to:ctx.accounts.destination_ata.to_account_info(),authority:vault.to_account_info()},&[seeds]),token_amount,ctx.accounts.mint.decimals)?;\n', 'after': '    \n    anchor_spl::token_interface::transfer_checked(CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(),anchor_spl::token_interface::TransferChecked{from:ctx.accounts.buyback_vault_ata.to_account_info(),to:ctx.accounts.destination_ata.to_account_info(),authority:vault.to_account_info(),mint:ctx.accounts.mint.to_account_info()},&[&[b"buyback-vault",&[index],&[bump_value]]]),token_amount,ctx.accounts.mint.decimals)?;\n'}, {'start': 116, 'end': 119, 'before': '    ctx.accounts.destination.add_lamports(sol_amount)?;\n    vault.total_claimed=vault.total_claimed.checked_add(sol_amount).ok_or(FeeError::MathOverflow)?;\n    if ctx.accounts.mint.key()==anchor_spl::token::spl_token::native_mint::ID{vault.total_claimed_token1=vault.total_claimed_token1.checked_add(token_amount).ok_or(FeeError::MathOverflow)?;}else{vault.total_claimed_token2=vault.total_claimed_token2.checked_add(token_amount).ok_or(FeeError::MathOverflow)?;}\n', 'after': '    destination.add_lamports(sol_amount)?;\n    vault.add_total_claimed(sol_amount)?;\n    if ctx.accounts.mint.key()==anchor_spl::token::spl_token::native_mint::ID{vault.add_total_claimed_token1(token_amount)?;}else{vault.add_total_claimed_token2(token_amount)?;}\n'}], 'programs/pump-fees/src/state.rs': [{'start': 64, 'end': 65, 'before': '    pub fn claim(&mut self) -> Result<()> {\n', 'after': '    pub fn claim(&mut self) -> core::result::Result<(), crate::FeeError> {\n'}, {'start': 73, 'end': 74, 'before': '            return Err(crate::FeeError::ClaimRateLimitExceeded.into());\n', 'after': '            return Err(crate::FeeError::ClaimRateLimitExceeded);\n'}, {'start': 474, 'end': 474, 'before': '', 'after': '\nimpl BuybackVault {\n    pub(crate) fn add_total_claimed(&mut self, amount: u64) -> Result<()> { self.total_claimed = self.total_claimed.checked_add(amount).ok_or(crate::FeeError::MathOverflow)?; Ok(()) }\n    pub(crate) fn add_total_claimed_token1(&mut self, amount: u64) -> Result<()> { self.total_claimed_token1 = self.total_claimed_token1.checked_add(amount).ok_or(crate::FeeError::MathOverflow)?; Ok(()) }\n    pub(crate) fn add_total_claimed_token2(&mut self, amount: u64) -> Result<()> { self.total_claimed_token2 = self.total_claimed_token2.checked_add(amount).ok_or(crate::FeeError::MathOverflow)?; Ok(()) }\n}\n'}]}

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
    parent = module('sweep_recovery_parent', PARENT / 'verify.py')
    with contextlib.redirect_stdout(io.StringIO()): parent.verify()
    return parent, parent.source_inputs(), parent.parent_state()[2]

def transform_source(name, original):
    assert name in FILES
    assert sha(original) == BEFORE_SHA256[name], 'unexpected parent Sweep source'
    lines = original.decode().splitlines(True)
    result = []
    cursor = 0
    for edit in SOURCE_EDITS[name]:
        assert cursor <= edit['start'] <= edit['end'] <= len(lines)
        assert ''.join(lines[edit['start']:edit['end']]) == edit['before'], 'unexpected source edit'
        result.extend(lines[cursor:edit['start']])
        result.append(edit['after'])
        cursor = edit['end']
    result.extend(lines[cursor:])
    changed = ''.join(result).encode()
    assert sha(changed) == AFTER_SHA256[name], 'unexpected recovered Sweep source'
    return changed


def source_inputs():
    _, old, _ = parent_state()
    expected = dict(old)
    for name in FILES: expected[name] = transform_source(name, old[name])
    assert {str(p.relative_to(HERE / 'overrides')) for p in (HERE / 'overrides').rglob('*') if p.is_file()} == set(FILES)
    patch = []
    for name in FILES:
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


def check_stripped_layout(symbols, stripped):
    """Require objcopy stripping to preserve the complete loadable ELF layout."""
    headers = [struct.unpack_from('<HHIQQQIHHHHHH', image, 16)
               for image in (symbols, stripped)]
    # e_shoff, e_shnum and e_shstrndx legitimately change when debug sections
    # and the full symbol table are removed; all other ELF header fields stay.
    retained = (0, 1, 2, 3, 4, 6, 7, 8, 9, 10)
    assert symbols[:16] == stripped[:16] and all(
        headers[0][i] == headers[1][i] for i in retained
    ), 'stripped ELF header differs'
    programs = [image[h[4]:h[4] + h[8] * h[9]]
                for image, h in zip((symbols, stripped), headers)]
    assert programs[0] == programs[1], 'stripped program headers differ'

    def allocated(image, header):
        rows = [struct.unpack_from('<IIQQQQIIQQ', image, header[5] + i * header[10])
                for i in range(header[11])]
        strings = rows[header[12]]
        names = image[strings[4]:strings[4] + strings[5]]
        section_names = [names[row[0]:].split(b'\0', 1)[0].decode() for row in rows]
        def linked(index):
            assert 0 <= index < len(rows), 'invalid stripped section link'
            return section_names[index] if index else None
        result = {}
        for name, row in zip(section_names, rows):
            if not row[2] & 2:
                continue
            assert name not in result, 'duplicate allocated section name'
            # sh_link always identifies a section. sh_info identifies a section
            # for relocation sections or when SHF_INFO_LINK is present.
            info = linked(row[7]) if row[1] in (4, 9) or row[2] & 0x40 else row[7]
            result[name] = (row[1], row[2], row[3], row[4], row[5],
                            linked(row[6]), info, row[8], row[9])
        return result
    assert allocated(symbols, headers[0]) == allocated(stripped, headers[1]), \
        'stripped allocated section metadata differs'


def verify():
    check_manifest()
    assert load(HERE / 'parent.json') == {'path': str(PARENT.relative_to(ROOT)), 'manifest_sha256': sha(read(PARENT / 'manifest.json'))}
    for name, digest in load(HERE / 'external-inputs.json').items(): assert sha(read(ROOT / name)) == digest
    parent, _, vendor = parent_state()
    sources = source_inputs()
    comparison = module('sweep_recovery_comparison', HERE / 'comparison.py')
    w = module('sweep_recovery_windows', ROOT / 'research/fees-composed-frontier188/window_map.py')
    w.m.elf_layout = lru_cache(maxsize=8)(w.m.elf_layout)
    w.m.relocations = lru_cache(maxsize=8)(w.m.relocations)
    comparison.w = w
    p2 = module('sweep_recovery_sections', ROOT / 'research/fees-common-quote-data-order/verify.py')
    before = read(PARENT / 'builds/candidate/symbols.so')
    candidate = read(HERE / 'builds/candidate/symbols.so')
    stripped = read(HERE / 'builds/candidate/candidate.so')
    original = read(ROOT / 'evidence/original/pump_fees/deployed.so')
    assert candidate == read(HERE / 'builds/repeat/symbols.so')
    assert stripped == read(HERE / 'builds/repeat/candidate.so')
    assert original != stripped and original[:w.m.elf_layout(original)['elf_extent']] != stripped
    assert w.m.elf_layout(stripped)['elf_extent'] == len(stripped)
    assert struct.unpack_from('<H', candidate, 56)[0] == struct.unpack_from('<H', stripped, 56)[0] == 4
    check_stripped_layout(candidate, stripped)
    proof = comparison.check(original, before, candidate)
    assert proof == load(HERE / 'comparison.json')
    assert proof['normalized_matches'] == 583 and not proof['raw_lost']
    assert EXPECTED_RAW is not None, 'qualified raw count awaits completed proof'
    assert proof['raw_matches'] == EXPECTED_RAW
    assert proof['gained_original'] == [120816]
    assert proof['counts']['original_data_fields'] == 379
    location = module('sweep_recovery_locations', ROOT / 'research/fees-sharing-slice-recovery/verify.py')
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
            if name == '.text' and a['address'] == 120816:
                assert (a['size'], b['size']) == (6984, 6960)
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
        assert 'CARGO_TARGET_DIR=/work/parallel-admin-fast-target' in command
        assert command[command.index('--target') + 1] == 'sbpf-solana-solana'
        assert command[command.index('--manifest-path') + 1] == '/work/next650/' + label + '/programs/pump-fees/Cargo.toml'
        assert 'linker=/work/next650/' + label + '/linker.sh' in command
        assert log.count(b'--crate-name pump_fees_candidate ') == 1 and b'Finished `release`' in log
        wrapper = read(PARENT / 'builds/candidate/linker.sh').decode().replace('next649', 'next650').replace('extend-qualified', label)
        assert wrapper.encode() == read(folder / 'linker.sh')
    prior = module('sweep_recovery_runtime', ROOT / 'research/fees-qualified-linker-layout/verify.py')
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
