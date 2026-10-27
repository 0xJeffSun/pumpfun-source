#!/usr/bin/env python3
"""Recheck saved source/compiler evidence offline; execute no compiler or target."""
from pathlib import Path, PureWindowsPath
import hashlib
import importlib.util
import json
import re
import sys
import tempfile

sys.dont_write_bytecode = True
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('parser_context_helpers', HERE/'context_helpers.py')
q = importlib.util.module_from_spec(spec)
spec.loader.exec_module(q)
require, raw, read, identity, digest = q.require, q.raw, q.read, q.identity, q.digest
LABELS = ('public-full', 'public-sections', 'public-events', 'public-create-event',
          'parser-create', 'parser-create-gated', 'parser-events')
LIB, IDL = 'curve-accounts/src/lib.rs', 'curve-accounts/idls/pump.json'
GATE = '#[cfg(not(target_os = "solana"))]\n'
ENABLED_RAW = 'f8cc8fd6c8db36f87704023360290356dd4197347acfb4e3bfebe7f475051331'
GATED_RAW = 'd424098f47aab84e62aa5d4c407d4d15d544651ad4018b263c214b2a021c8934'
PARENT_STRIP = '03f1f70e6a33cb60a1a1fa7110cdecf03553ee30b1ff7b9a0e26905d0ba1c175'


def manifest_check(root):
    paths = list(root.rglob('*'))
    require(not any(p.is_symlink() for p in paths), 'packet manifest includes a symlink')
    require(all(p.is_dir() or p.is_file() for p in paths), 'packet manifest includes a special file')
    actual = {p.relative_to(root).as_posix():identity(p.read_bytes()) for p in paths
              if p.is_file() and p != root/'manifest.json'}
    require(actual == read(root/'manifest.json')['files'], 'packet manifest differs')


def git_blob(data):
    return hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()


def history_check(before, receipt, public, origin):
    needle = b'        /// Program utilities.\n        pub mod utils {'
    require(before.count(needle) == 1, 'historical module boundary differs')
    after = before.replace(needle, b'        /// Program utilities.\n        '+GATE.encode()+b'        pub mod utils {')
    require(receipt['revision'] == '624f3ae95c84f65c16567f997f29721fb9827406'
            and receipt['parent'] == 'c0077c2a7de64361f451735ac89118bc89f1c277'
            and receipt['earlier_source_revision'] == 'c1c9261ca4e2f9ce3232e4fd41e4f6ad8742fe3e', 'history revisions differ')
    require(git_blob(after) == receipt['files'][0]['sha'] == '4fb84b0879c07819886ba419fee5b6434436555d', 'historical gate blob differs')
    require(origin['revision'] == '639b87fb45c3adeffa6f7c4a1bf0cb85e392bf22'
            and origin['path'] == 'idl/pump.json' and len(public) == origin['bytes'] == 328788
            and git_blob(public) == origin['git_blob'] == 'bb79d04e5a4ef8b286d67511757c23a15672ef51', 'public IDL blob differs')


def render(before, names, gated):
    """Render only the retained gen_event quote templates; wrapper/imports are ours."""
    require(names and len(set(names)) == len(names)
            and all(re.fullmatch(r'[A-Za-z_][A-Za-z0-9_]*', n) for n in names), 'event names differ')
    block = before[before.index('fn gen_event('):before.index('fn gen_instruction(')]
    statement = block.split('        quote! {\n', 1)[1].split('        }\n    });', 1)[0]
    final = block.rsplit('    quote! {\n', 1)[1]
    require(final.endswith('    }\n}\n\n'), 'historical template boundary differs')
    final = final[:-len('    }\n}\n\n')]
    generated = final.replace('#(#variants,)*', ','.join(n+'('+n+')' for n in names)+',').replace(
        '#(#if_statements)*', ''.join(statement.replace('#name', n) for n in names))
    require('#name' not in generated and '#(' not in generated, 'unexpanded historical template')
    return ('\n'+(GATE if gated else '')+'pub mod legacy_event_utils {\nuse anchor_lang::prelude::*;\n'
            +'use super::cpi_interface::pump::events::*;\n'+generated+'}\n').encode()


def idl_variants(small, public):
    encode = lambda d: (json.dumps(d, indent=2, ensure_ascii=False)+'\n').encode()
    full = json.loads(public)
    return {'public-full':public,
            'public-sections':encode(dict(small, **{k:full[k] for k in ('accounts','events','errors','types')})),
            'public-events':encode(dict(small, events=full['events'], types=full['types'])),
            'public-create-event':encode(dict(small, events=[e for e in full['events'] if e['name']=='CreateEvent'],
                                             types=[t for t in full['types'] if t['name']=='CreateEvent']))}


def object_for(label):
    paths = list((HERE/'direct'/label).glob('*.rlib.gz'))
    require(len(paths) == 1, 'direct archive count differs')
    return q.objects(raw(paths[0]))


def source_check(parent, after, bodies):
    require(set(parent) == set(after) and len(parent) == 66, 'source cohort differs')
    require(all(after[n] == ident for n, ident in parent.items() if n not in (LIB, IDL)), 'source scope differs')
    for n, b in bodies.items():
        require(after[n] == identity(b), 'changed source bytes differ')


def section_changes(a, b):
    aa, bb = q.sections(a), q.sections(b)
    require(set(aa) == set(bb), 'ELF section cohort differs')
    return [n for n in aa if aa[n]['data'] != bb[n]['data']]


def output_check(data, stripped, reference, strip_reference, positive):
    require(digest(data) == (ENABLED_RAW if positive else GATED_RAW) and len(data) == (867760 if positive else 867744), 'raw ELF differs')
    require(data != reference and section_changes(reference,data) == ['.symtab','.strtab'], 'raw comparison scope differs')
    require(stripped == strip_reference, 'stripped comparison differs')


def verify(check_manifest=True):
    if check_manifest:
        manifest_check(HERE)
    require(read(HERE/'direct-builds.json') == list(LABELS), 'direct cohort differs')
    provenance = read(HERE/'provenance.json')
    require(identity(raw(HERE/'context_helpers.py')) == provenance['helper'], 'helper provenance differs')
    before = raw(HERE/'provenance/anchor-utils-before-gate.rs')
    public = raw(HERE/'provenance/public-pump.json')
    history_check(before, read(HERE/'provenance/anchor-gate-change.json'), public, read(HERE/'provenance/public-idl-origin.json'))
    require(raw(HERE/'exploration/public-pump-tool-newline.json.gz') == public+b'\n', 'failed newline evidence differs')
    vendor = HERE/'provenance/anchor-1.0.0'
    parser_path = 'src/declare_program/mods/parsers.rs'
    current_parser = raw(vendor/parser_path)
    require(digest(current_parser) == read(vendor/'.cargo-checksum.json')['files'][parser_path], 'vendor parser checksum differs')
    vendor_row = next(r for r in read(HERE/'controller-enabled/vendor-inputs.json')['packages'] if r['directory']=='anchor-attribute-program-1.0.0')
    require(digest(raw(vendor/'.cargo-checksum.json')) == vendor_row['checksum_file_sha256'], 'vendor checksum binding differs')
    require(read(vendor/'.cargo_vcs_info.json')['git']['sha1'] == '25be6d502ec6957d34d436bc2a6170040fc64153'
            and (GATE+'        pub mod parsers {').encode() in current_parser, 'current parser gate differs')
    parent = {r['path']:{k:r[k] for k in ('bytes','sha256')} for r in read(HERE/'reference/source-inputs.json')['source_files']}
    parent_lib = raw(HERE/('reference/sources/'+LIB+'.gz'))
    small = read(HERE/('reference/sources/'+IDL+'.gz'))
    require(identity(parent_lib) == parent[LIB], 'parent source differs')
    variants = idl_variants(small, public)
    baseline = q.text_sections(q.objects(raw(HERE/'reference/curve_accounts.rlib.gz')))
    token = q.text_sections(q.objects(raw(HERE/'reference/spl_token_2022_interface.rlib.gz')))
    token_finish = next(b for n,b in token.items() if 'finish_grow' in n)
    report = dict(direct={}, full_builds={}, target_executions=0, historical_source_proven=False,
                  whole_original_equal=False, composed_with_provider_sharing=False)
    expected_extra = dict(zip(LABELS, (201,59,33,2,5,2,64)))
    canonical_args, canonical_env = None, None
    for label in LABELS:
        folder = HERE/'direct'/label
        launch, result = read(folder/'launch.json.gz'), read(folder/'result.json.gz')
        require(result['returncode'] == 0 and launch['target_executions'] == 0, 'direct compilation failed')
        for n, ident in result['outputs'].items():
            require(identity(raw(folder/(n+'.gz'))) == ident, 'direct output differs')
        args = list(launch['command']); args[args.index('--out-dir')+1] = '<OUTPUT>'
        env = dict(launch['environment'])
        for n, suffix in [('CARGO_MANIFEST_DIR','source/curve-accounts'), ('CARGO_MANIFEST_PATH','source/curve-accounts/Cargo.toml')]:
            require(PureWindowsPath(env.pop(n)).as_posix().endswith('/'+label+'/'+suffix), 'direct manifest environment differs')
        require(PureWindowsPath(launch['cwd']).as_posix().endswith('/'+label+'/source'), 'direct cwd differs')
        if canonical_args is None:
            canonical_args, canonical_env = args, env
        require((args, env) == (canonical_args, canonical_env), 'direct compiler context differs')
        idl_label = label if label.startswith('public-') else ('public-events' if label=='parser-events' else 'public-create-event')
        idl = variants[idl_label]
        addition = render(before.decode(), [e['name'] for e in json.loads(idl)['events']], label=='parser-create-gated') if label.startswith('parser-') else b''
        bodies = {IDL:idl, LIB:parent_lib+addition}
        after = read(folder/'source-after.json')
        source_check(parent, after, bodies)
        for n,b in bodies.items():
            require(raw(folder/('source/'+n+'.gz')) == b, 'rendered source differs')
        if addition:
            require(raw(folder/'generated.rs.gz') == addition and launch['source_files'] == {n:r['sha256'] for n,r in after.items()}, 'pre-run source differs')
        else:
            require(launch['idl'] == identity(idl), 'pre-run IDL differs')
        obj = object_for(label); sections = q.text_sections(obj)
        missing = [n for n in baseline if n not in sections]
        changed = [n for n in baseline if n in sections and sections[n] != baseline[n]]
        positive = label in ('parser-create','parser-events')
        require(changed == ([q.FINISH] if positive else []) and len(missing) == (8 if label=='public-full' else 0), 'existing executable sections differ')
        added = sorted(set(sections)-set(baseline))
        require(len(added) == expected_extra[label], 'new executable section count differs')
        require(sections[q.FINISH] == (token_finish if positive else baseline[q.FINISH]), 'allocator helper differs')
        require(len(sections[q.FINISH]) == (328 if positive else 312), 'allocator helper size differs')
        report['direct'][label] = dict(object=identity(obj), helper=identity(sections[q.FINISH]), changed=changed, missing=missing, added=added)
    mappings = {(a,n):b for a,b,n in (line.split('\t') for line in raw(HERE/'controller-enabled/metadata-map.tsv').decode().splitlines())}
    paths = [tuple(line.split('\t')) for line in raw(HERE/'controller-enabled/path-map.tsv').decode().splitlines()]
    controllers = {}
    for mode, label in [('enabled','parser-create'), ('gated','parser-create-gated')]:
        c = HERE/('controller-'+mode)
        rows = read(c/'source-inputs.json')['source_files']
        current = {r['path']:{k:r[k] for k in ('bytes','sha256')} for r in rows}
        for r in rows:
            require(identity(raw(c/('sources/'+r['path']+'.gz'))) == current[r['path']], 'controller source differs')
        require(current == read(HERE/'direct'/label/'source-after.json'), 'controller/direct source mismatch')
        controllers[mode] = {n:r['sha256'] for n,r in current.items()}
    with tempfile.TemporaryDirectory() as directory:
        td = Path(directory)
        refs = {}
        for n in ('original','parent','zeroed'):
            data = raw(HERE/('reference/'+n+'.so.gz')); (td/(n+'.so')).write_bytes(data); refs[n] = q.layer.Elf(td/(n+'.so'))
        require(digest(refs['original'].b) == q.v.ORIGINAL and digest(refs['parent'].b) == '80b6250391f76ad918f521095f8e63ba6b5e92eb9481998a9c91e3959dff2408'
                and digest(refs['zeroed'].b) == q.RAW, 'reference raw ELF differs')
        require(digest(raw(HERE/'reference/parent-strip.so.gz')) == PARENT_STRIP and digest(raw(HERE/'reference/zeroed-strip.so.gz')) == q.STRIPPED, 'reference stripped ELF differs')
        originals = {r['id']:refs['original'].window(r['start'],r['end']) for r in read(HERE/'reference/prior-inventory.json.gz')['original_rows']}
        require(len(originals) == 441, 'original inventory count differs')
        parent_map = q.map_sections(raw(HERE/'reference/parent.map.gz'),664384)
        for label in ('full-parser-gated','full-parser-01','full-parser-02'):
            mode = 'gated' if label.endswith('gated') else 'enabled'; positive = mode=='enabled'
            folder = HERE/'builds'/label
            launch, result = read(folder/'launch.json.gz'), read(folder/'result.json.gz')
            require(result['status'] == 'SUCCEEDED' and result['source_unchanged'] and result['target_executions'] == 0
                    and launch['source_inputs'] == controllers[mode] and launch['target_directory_initially_absent'], 'full build scope differs')
            records = read(folder/'records.json.gz')
            compiled, counts = q.v.check_records(records,'published-with-paths-relative',mappings,paths)
            q.v.cargo_binding(raw(folder/'stderr.log.gz').decode(), compiled, launch['environment_overrides']['RUSTC_WRAPPER'], launch['environment_overrides']['RUSTC'])
            for n,ident in result['logs'].items():
                require(identity(raw(folder/(n+'.gz'))) == ident, 'build log differs')
            curve = raw(folder/'curve_accounts.rlib.gz')
            require(q.objects(curve) == object_for('parser-create' if positive else 'parser-create-gated'), 'full/direct curve object differs')
            inputs = read(folder/'link-input-identities.json.gz')
            linked = [r for r in inputs if PureWindowsPath(r['path']).name.startswith('libcurve_accounts-')]
            require(len(linked)==1 and {k:linked[0][k] for k in ('bytes','sha256')}==identity(curve), 'linked curve input differs')
            data, stripped = raw(folder/'symbols.so.gz'), raw(folder/'candidate-v154-strip.so.gz')
            require(identity(data) == result['outputs']['symbols.so'] and identity(stripped) == result['outputs']['candidate-v154-strip.so'], 'output receipt differs')
            ref = refs['zeroed' if positive else 'parent']
            strip_ref = raw(HERE/('reference/'+('zeroed' if positive else 'parent')+'-strip.so.gz'))
            output_check(data, stripped, ref.b, strip_ref, positive)
            require(result['strip']['returncode'] == 0 and '--strip-all' in result['strip']['command'], 'strip invocation differs')
            (td/'candidate.so').write_bytes(data); elf = q.layer.Elf(td/'candidate.so')
            cm = q.map_sections(raw(folder/'link/link.map.gz'),664400 if positive else 664384)
            require([(r[2],r[3]) for r in parent_map] == [(r[2],r[3]) for r in cm]
                    and not any('legacy_event_utils' in r[3] for r in cm), 'linked provider cohort differs')
            changed = [a[3] for a,b in zip(parent_map,cm) if q.v.shape(refs['parent'].window(a[0],a[0]+a[1])) != q.v.shape(elf.window(b[0],b[0]+b[1]))]
            require(changed == ([q.FINISH] if positive else []), 'linked normalized shapes differ')
            inv = q.inventory(elf, originals)
            require((inv['normalized'],inv['raw_local'],inv['injective']) == ((428,139,428) if positive else (428,100,427)), 'inventory differs')
            if positive:
                require(inv['matches']['O0209'] == inv['matches']['O0237'] == [486896,547024], 'helper correspondence differs')
                reserve = q.v.functions(elf)[(487224,487864)]
                edge = [x for x in reserve['direct'] if x['offset']==528]
                require(487224 in inv['matches']['O0210'] and len(edge)==1 and edge[0]['target']==486896, 'reserve edge differs')
            report['full_builds'][label] = dict(raw=identity(data), stripped=identity(stripped), reference_raw_equal=False,
                                               reference_stripped_equal=True, changed_section_payloads=['.symtab','.strtab'],
                                               normalized=inv['normalized'], raw_local=inv['raw_local'], injective=inv['injective'],
                                               unmatched=[n for n,a in inv['matches'].items() if not a], counts=counts)
    return report


if __name__ == '__main__':
    print(json.dumps(verify(),indent=2))
