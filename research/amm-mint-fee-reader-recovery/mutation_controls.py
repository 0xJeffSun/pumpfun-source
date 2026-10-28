"""Exercise static-verifier rejection boundaries; print results without edits."""
from pathlib import Path
import argparse
import copy
import gzip
import importlib.util
import json
import struct
import subprocess
import sys

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('mint_mutation_analysis', HERE / 'analysis.py')
analysis = importlib.util.module_from_spec(spec)
spec.loader.exec_module(analysis)


def images_from(support=None):
    if support is not None:
        return {name: {kind: (support / label / filename).read_bytes()
                       for kind, filename in (('candidate', 'candidate.so'), ('symbols', 'unstripped.so'))}
                for name, label in (('parent', 'merged_parent'), ('proposal', 'proposal'), ('repeat', 'repeat'))}
    evidence = json.loads((HERE / 'evidence.json').read_text())
    return {name: {kind: gzip.decompress((HERE / evidence['builds'][name][kind]).read_bytes())
                   for kind in ('candidate', 'symbols')}
            for name in ('parent', 'proposal', 'repeat')}


def verify(images=None):
    images = images if images is not None else images_from()
    comparison = json.loads((HERE / 'comparison.json').read_text())
    assert analysis.recompute(images=images) == comparison
    references = {row['offset']: row for row in comparison['data_references']}
    controls = (
        ('unmasked_root_instruction', analysis.CANDIDATE + 4, None),
        ('pointed_transfer_fee_source', references[992]['candidate_pointer'], None),
        ('pointed_panic_filename', references[480]['candidate_filename_pointer'], None),
        ('panic_source_line', references[480]['candidate_pointer'] + 16, None),
        ('display_error_text', references[440]['candidate_pointer'], None),
        ('token_2022_id', references[24]['candidate_pointer'], None),
        ('enum_discriminant', references[248]['candidate_pointer'], None),
        ('vtable_method_pointer', references[296]['candidate_pointer'] + 24,
         struct.pack('<Q', references[296]['functions'][0]['candidate_target'] << 32)),
        ('masked_call_target', analysis.CANDIDATE + 48 + 4,
         struct.pack('<i', (analysis.CANDIDATE - (analysis.CANDIDATE + 48 + 8)) // 8)),
    )
    results = []
    for name, at, replacement in controls:
        changed = copy.deepcopy(images)
        for variant in ('proposal', 'repeat'):
            for kind in ('candidate', 'symbols'):
                raw = bytearray(changed[variant][kind])
                value = replacement if replacement is not None else bytes([raw[at] ^ 1])
                raw[at:at + len(value)] = value
                changed[variant][kind] = bytes(raw)
        try:
            analysis.recompute(images=changed)
        except (AssertionError, KeyError) as error:
            results.append(dict(name=name, file_offset=at,
                                mutation='replace_bytes' if replacement is not None else 'xor_byte_1',
                                replacement_hex=replacement.hex() if replacement is not None else None,
                                expected='reject', observed='reject', exception_type=type(error).__name__))
        else:
            raise AssertionError(name + ' corruption accepted')
    # Catch the actual optimized import's exception, rather than inferring its
    # type from the interpreter's exit status or text.
    optimized = subprocess.run([sys.executable, '-B', '-O', '-c',
        'import json,runpy,sys\n'
        'try: runpy.run_path(sys.argv[1], run_name="optimization_control")\n'
        'except BaseException as error:\n'
        ' print(json.dumps(dict(exception_type=type(error).__name__, message=str(error))))\n'
        'else: raise AssertionError("optimized verifier import accepted")',
        str(HERE / 'analysis.py')], capture_output=True, text=True, check=True)
    assert not optimized.stderr
    rejection = json.loads(optimized.stdout)
    assert rejection == dict(exception_type='SystemExit', message='Verification requires Python without -O')
    return dict(schema=1, baseline_comparison_equal=True,
                mutation_scope=dict(variants=['proposal', 'repeat'], images=['candidate', 'symbols'],
                                    rationale='Mutate all four images together so artifact equality cannot alone reject the corruption.'),
                mutations=results,
                optimization_control=dict(expected='reject', observed='reject', **rejection))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--raw-support', type=Path, help='Read the three retained raw build directories before packet sealing.')
    arguments = parser.parse_args()
    print(json.dumps(verify(images_from(arguments.raw_support)), indent=2))
