#!/usr/bin/env python3
"""Static interpretation of retained SDK scripts, logs, links and ELF sections."""
from pathlib import Path
import difflib
import hashlib
import json
import struct

ROOT = Path(__file__).resolve().parent


def sha(data):
    return hashlib.sha256(data).hexdigest()


def sections(path):
    data = path.read_bytes()
    assert data[:6] == b'\x7fELF\x02\x01'
    offset = struct.unpack_from('<Q', data, 40)[0]
    stride, count, names_index = struct.unpack_from('<HHH', data, 58)
    rows = [struct.unpack_from('<IIQQQQIIQQ', data, offset + i * stride) for i in range(count)]
    names = rows[names_index]
    strings = data[names[4]:names[4] + names[5]]
    out = {}
    for row in rows:
        name = strings[row[0]:].split(b'\0', 1)[0].decode()
        if name and row[1] != 8:
            body = data[row[4]:row[4] + row[5]]
            assert len(body) == row[5]
            out[name] = {'type': row[1], 'flags': row[2], 'address': row[3],
                         'file_offset': row[4], 'bytes': row[5], 'sha256': sha(body)}
    return {'bytes': len(data), 'sha256': sha(data), 'sections': out}


def analyze():
    observations = json.loads((ROOT / 'observations.json').read_text())
    for path, record in observations['inputs'].items():
        data = (ROOT / path).read_bytes()
        assert len(data) == record['bytes'] and sha(data) == record['sha256'], path
    strip_hash = sha((ROOT / 'observed-tools/v1.52/llvm/bin/llvm-objcopy').read_bytes())
    result = {'scope': 'Current retained evidence; no new build or tool execution', 'builds': [],
              'observed_v152_objcopy_sha256': strip_hash, 'historical_process_executable_hashes_available': False,
              'compiler_invocations': 0, 'runtime_probes': 0}
    official = (ROOT / 'official-sdk/scripts/install.sh').read_text()
    driver = (ROOT / 'driver/cargo-build-sbf-main.rs').read_text()
    helper = (ROOT / 'driver/build_partial_candidate.py').read_text()
    assert '&config.sbf_sdk.join("scripts").join("strip.sh")' in driver
    assert '"+solana"' in driver and '"build"' in driver
    assert 'criterion' not in driver.lower()
    assert "rustc=pathlib.Path.home()/'.cache/solana'/a.tools_version/'platform-tools/rust/bin/rustc'" in helper
    for row in observations['builds']:
        base = ROOT / 'builds' / row['name']
        report = json.loads((base / 'build-comparison.json').read_text())
        attempt = json.loads((base / 'build-attempt.json').read_text())
        installer = (base / 'sdk/scripts/install.sh').read_text()
        strip = (base / 'sdk/scripts/strip.sh').read_text()
        env = (base / 'sdk/env.sh').read_text()
        assert installer == official.replace('version=v1.43\n', 'version=v1.52\n')
        assert strip == (ROOT / 'official-sdk/scripts/strip.sh').read_text()
        assert env == (ROOT / 'official-sdk/env.sh').read_text()
        assert 'source "$sbf_sdk"/env.sh' in strip
        assert '"$sbf_sdk"/scripts/install.sh' in env
        assert '"$sbf_sdk"/dependencies/platform-tools/llvm/bin/llvm-objcopy --strip-all' in strip
        assert 'version=v1.52\n' in installer
        assert 'if [[ ! -e platform-tools-$version.md || ! -e platform-tools ]]; then' in installer
        assert 'rm -rf platform-tools*' in installer
        assert 'version=v2.3.2' in installer and 'version=v2.3.3' in installer
        assert all((base / 'markers' / n).read_bytes() == b'' for n in ['criterion-v2.3.2.md', 'platform-tools-v1.52.md'])
        platform = next(d for d in row['dependencies'] if d['name'] == 'platform-tools')
        assert platform['link'] == row['sdk_platform_link_after_capture']
        assert platform['resolved_path'].endswith('/.cache/solana/v1.52/platform-tools')
        assert row['rustup_alias']['resolved_path'].endswith('/.cache/solana/v1.52/platform-tools/rust')
        selected = report['selected_toolchain']
        assert attempt['selected_toolchain'] == selected
        command = attempt['command']
        assert command[command.index('--tools-version') + 1] == selected
        compiler_hash = sha((ROOT / 'observed-tools' / selected / 'rust/bin/rustc').read_bytes())
        assert compiler_hash == report['rustc_sha256']
        assert sha((base / 'sdk/scripts/install.sh').read_bytes()) == report['sdk_source_sha256']['scripts/install.sh']
        logs = (base / 'build.log').read_text().splitlines()
        finish = next(i for i, line in enumerate(logs) if 'Finished `release`' in line)
        install_trace = next(i for i, line in enumerate(logs) if '+ ./platform-tools/rust/bin/rustc --version' in line)
        relink = next(i for i, line in enumerate(logs) if '+ rustup toolchain link solana platform-tools/rust' in line)
        assert finish < install_trace < relink
        assert sha((base / 'build.log').read_bytes()) == report['build_log_sha256'] == attempt['build_log_sha256']
        stripped = sections(base / 'stripped.so')
        unstripped = sections(base / 'unstripped.so')
        assert stripped['sha256'] == report['comparison']['candidate_sha256']
        assert stripped['sections']['.text']['sha256'] == unstripped['sections']['.text']['sha256']
        shared = set(stripped['sections']) & set(unstripped['sections'])
        differing_payloads = sorted(n for n in shared if stripped['sections'][n]['sha256'] != unstripped['sections'][n]['sha256'])
        result['builds'].append({'name': row['name'], 'retained_build': row['retained_build'],
            'selected_compilation_toolchain': selected, 'selected_compiler_hash_currently_confirmed': compiler_hash,
            'postcompile_installer_default': 'v1.52', 'retained_final_platform_link': platform,
            'observed_objcopy_sha256': strip_hash, 'recorded_finished_line': finish + 1,
            'recorded_installer_trace_line': install_trace + 1, 'recorded_relink_line': relink + 1,
            'postprocessing_tool_selection': 'v1.52 strongly supported by retained script, log, marker and link chain; historical per-process executable hash was not recorded',
            'stripped': stripped, 'unstripped': unstripped,
            'shared_section_payload_differences': differing_payloads,
            'text_payload_identical_before_after_stripping': True})
    result['installer_diff'] = ''.join(difflib.unified_diff(official.splitlines(True), installer.splitlines(True), fromfile='official/install.sh', tofile='retained/install.sh'))
    result['criterion_role'] = 'Installer dependency setup only in this chain: Darwin v2.3.2 versus Linux v2.3.3; it occurs after Rust compilation and is neither invoked nor linked by the observed strip command or build driver.'
    result['limitation'] = 'Snapshot hashes and current link targets confirm retained bytes now. They are not a historical executable audit trail; no claim that v1.44 and v1.52 stripping produce identical whole ELFs follows.'
    return result


if __name__ == '__main__':
    print(json.dumps(analyze(), indent=2))
