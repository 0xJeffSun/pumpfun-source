"""Validate compiler arguments actually forwarded by the retained host wrapper."""
from collections import defaultdict


def require(ok, message):
    if not ok:
        raise ValueError(message)


def compile_rows(rows, mode, incomplete=False):
    require(len(rows) == len({r.get('record_id', str(r['pid'])) for r in rows}), 'duplicate wrapper record')
    compiled, removed = {}, 0
    for row in rows:
        require(row['mode'] == mode, 'wrapper mode differs')
        before, after = row['before'], row['after']
        changed = before != after
        if changed:
            require(mode == 'omit-sysvar-no' and row['removed'] == 1
                    and before.count('-Zshare-generics=no') == 1, 'unexpected wrapper edit')
            require('--crate-name' in before and before[before.index('--crate-name') + 1] ==
                    'solana_instructions_sysvar', 'wrapper edited wrong crate')
            expected = list(before); expected.remove('-Zshare-generics=no')
            require(after == expected, 'wrapper edited additional arguments')
        else:
            require(row['removed'] == 0, 'wrapper removal receipt differs')
        removed += row['removed']
        if '--crate-name' not in before or not any(a in ('--emit=dep-info,metadata,link', '--emit=dep-info,link') for a in before):
            continue
        name = before[before.index('--crate-name') + 1]
        if name == '___':
            continue
        target = before[before.index('--target') + 1] if '--target' in before else 'host'
        metadata = [a.removeprefix('metadata=') for a in before if a.startswith('metadata=')]
        require(len(metadata) == 1, 'wrapper metadata cohort differs')
        key = (name, target, metadata[0])
        require(key not in compiled, 'duplicate compiler invocation')
        compiled[key] = row
    if incomplete:
        require(len(compiled) < 163, 'expected retained incomplete trace')
    else:
        require(len(compiled) == 163 and sum(k[1] == 'sbpf-solana-solana' for k in compiled) == 85,
                'wrapper compilation cohort differs')
    require(removed == (0 if mode == 'passthrough' else 1), 'wrapper did not remove exactly one flag')
    return compiled


def normalized(value, root):
    return value.replace('\\', '/').replace(root.replace('\\', '/'), '<build>')


def measure(parent):
    root = parent.HERE / 'wrapper-control'
    raw, read, digest, identity = parent.raw, parent.read, parent.digest, parent.identity
    source = raw(root / 'wrapper-v1.rs')
    compile_launch, compile_result = read(root / 'compile-launch.json.gz'), read(root / 'compile-result.json.gz')
    provider_launch = read(parent.HERE / 'builds/alloc-provider/launch.json.gz')
    require(compile_launch['source_sha256'] == digest(source) and compile_result['returncode'] == 0, 'wrapper source/build differs')
    require(compile_launch['compiler_sha256'] == provider_launch['checked_executables'][compile_launch['command'][0]], 'wrapper compiler differs')
    require(digest(raw(root / 'wrapper.exe.gz')) == compile_result['wrapper_sha256'], 'host wrapper differs')
    report = dict(builds={}, cargo_reported_crate_compilations=815, host_wrapper_compilations=3,
                  complete_traces=3, retained_incomplete_traces=2,
                  target_executions=0, explicit_no_flag_required_for_control_elf=False,
                  metadata_only_cause_proven=False, historical_flags_proven=False)
    baseline = None
    for label in ('passthrough', 'omit', 'omit-repeat', 'portable-omit', 'portable-fixed'):
        folder = root / 'builds' / label
        launch, result = read(folder / 'launch.json.gz'), read(folder / 'result.json.gz')
        require(result['status'] == 'SUCCEEDED' and result['returncode'] == 0 and result['source_unchanged']
                and result['root_invocations'] == 1 and result['target_executions'] == 0, 'wrapper full build incomplete')
        require(launch['target_directory_initially_absent'] and launch['source_inputs'] == provider_launch['source_inputs']
                and launch['checked_executables'] == provider_launch['checked_executables'], 'wrapper full build inputs differ')
        for name, pin in {**result['outputs'], **result['logs']}.items():
            require(identity(raw(folder / (name + '.gz'))) == pin, 'wrapper build output/log differs')
        for name in ('symbols.so', 'candidate-v154-strip.so'):
            require(raw(folder / (name + '.gz')) == raw(parent.HERE / 'builds/alloc-provider' / (name + '.gz')), 'whole ELF differs under wrapper')
        mode = 'passthrough' if label == 'passthrough' else 'omit-sysvar-no'
        require(launch['environment_overrides']['MAYHEM_SHARING_MODE'] == mode, 'launched mode differs')
        incomplete = label in ('omit', 'portable-omit')
        records = read(folder / 'records.json.gz'); compiled = compile_rows(records, mode, incomplete)
        require(all(r['compiler'] == launch['environment_overrides']['RUSTC'] for r in records), 'forwarded compiler differs')
        cargo = parent.actual_invocations(raw(folder / 'stderr.log.gz').decode(), 'alloc-provider')
        metadata = defaultdict(list)
        for name, target, value in compiled:
            if target == 'sbpf-solana-solana':
                metadata[name].append(value)
        observed_metadata = {n: sorted(values) for n, values in metadata.items()}
        if incomplete:
            from collections import Counter
            require(all(not Counter(values) - Counter(cargo['metadata'][n]) for n, values in observed_metadata.items()),
                    'incomplete trace has different Cargo metadata')
        else:
            require(observed_metadata == cargo['metadata'], 'wrapper and Cargo metadata differ')
        build_root = launch['environment_overrides']['CARGO_TARGET_DIR'].replace('\\', '/').rsplit('/', 1)[0]
        arguments = {key: ([normalized(a, build_root) for a in row['before']], normalized(row['cwd'], build_root))
                     for key, row in compiled.items()}
        if baseline is None:
            baseline = arguments
        require(all(k in baseline and a == baseline[k] for k, a in arguments.items()), 'Cargo compiler identities/arguments differ between wrapper controls')
        if not incomplete:
            require(arguments.keys() == baseline.keys(), 'complete trace omits compiler arguments')
        archives = list(folder.glob('libsolana_instructions_sysvar-*.rlib.gz'))
        require(len(archives) == 1, 'ambiguous wrapper dependency archive')
        direct_mode = 'replay' if label == 'passthrough' else 'toggle'
        expected_archive = parent.HERE / 'direct/alloc-provider' / direct_mode / 'emit' / archives[0].name
        archive, direct_archive = raw(archives[0]), raw(expected_archive)
        members, direct_members = parent.archive_members(archive), parent.archive_members(direct_archive)
        objects = {n: digest(b) for n, b in members.items() if n.endswith('.o')}
        require(len(objects) == 1 and objects == {n: digest(b) for n, b in direct_members.items() if n.endswith('.o')},
                'wrapper dependency code differs from fixed-metadata direct replay')
        wrapper_hash = compile_result['wrapper_sha256']
        if label.startswith('portable-'):
            portable = read(folder / 'wrapper-compile-result.json.gz')
            portable_source = raw(root / ('wrapper.rs' if label == 'portable-fixed' else 'wrapper-v1.rs'))
            require(portable == launch['wrapper_build'] and portable['returncode'] == 0
                    and portable['source_sha256'] == digest(portable_source), 'portable wrapper compile differs')
            require(portable['compiler_sha256'] == compile_launch['compiler_sha256'], 'portable host compiler differs')
            wrapper_hash = portable['wrapper_sha256']
            require(digest(raw(folder / 'wrapper.exe.gz')) == wrapper_hash, 'portable wrapper differs')
        report['builds'][label] = dict(cargo_reported_compilations=163, target=85, host=78,
            observed_crate_compilations=len(compiled), accepted_as_full_trace=not incomplete,
            observations=len(records), auxiliary_invocations=len(records) - len(compiled),
            missing_crate_observations=163 - len(compiled),
            auxiliary_compile_probes=sum('--emit=llvm-ir' in r['before'] for r in records),
            observed_flags_removed=sum(r['removed'] for r in records), observed_cargo_arguments_equal_after_build_root_relocation=True,
            raw_elf_equal=True, stripped_elf_equal=True, direct_comparison=direct_mode,
            dependency_code_objects=objects, dependency_archive_equal=archive == direct_archive,
            dependency_metadata_equal=members['lib.rmeta'] == direct_members['lib.rmeta'],
            dependency_archive_sha256=digest(archive),
            wrapper_sha256=wrapper_hash, raw_elf_sha256=result['outputs']['symbols.so']['sha256'])
    return report
