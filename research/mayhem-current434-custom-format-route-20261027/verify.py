"""Recompute the conditional Custom formatter route from hash-bound inputs."""
from pathlib import Path
import gzip,hashlib,importlib.util,json

if not __debug__:raise RuntimeError('Assertions are required')
P=Path(__file__).resolve().parent;R=P.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()

def verify():
    paths=list(P.rglob('*'))
    assert not any(p.is_symlink()for p in paths)
    assert all(p.is_file()or p.is_dir()for p in paths)
    assert{p.relative_to(P).as_posix():sha(p)for p in paths if p.is_file()and p!=P/'manifest.json'}==json.loads((P/'manifest.json').read_text())
    for n,h in json.loads((P/'inputs.json').read_text()).items():assert sha(R/n)==h,n
    source=(R/'research/mayhem-current434-format-route-20261027/reader.py').read_text()
    expected=source.replace('elif op in (0x07, 0x0f, 0x67, 0x27):','elif op in (0x07, 0x0f, 0x67, 0x27, 0x57):').replace('''                else:
                    self.reg[d] = (self.reg[d] * imm) & MASK''','''                elif op == 0x27:
                    self.reg[d] = (self.reg[d] * imm) & MASK
                else:
                    self.reg[d] &= imm & MASK''')
    assert expected==(P/'unit_trace.py').read_text()
    s=importlib.util.spec_from_file_location('custom_dispatch_reader',P/'reader.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
    report=m.inspect();assert report==json.loads(gzip.decompress((P/'observations.json.gz').read_bytes()))
    return dict(original_sha256=report['original_sha256'],candidate_symbols_sha256=report['candidate_symbols_sha256'],
                conditional_indirect_sites=5,new_sites_beyond_unit_route=3,selected_vtable_bytes=32,
                payload_value_read=False,new_function_matches=0,new_builds=0,new_runtime_executions=0,
                generic_indirect_closure=False,whole_elf_equal=False)

if __name__=='__main__':print(json.dumps(verify(),indent=2))
