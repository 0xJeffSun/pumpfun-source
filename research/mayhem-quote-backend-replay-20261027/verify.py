from pathlib import Path
import gzip,hashlib,importlib.util,json,sys
if not __debug__:raise RuntimeError('verification requires assertions')
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;ROOT=P.parents[1]
sha=lambda b:hashlib.sha256(b).hexdigest()
def raw(p):
 b=p.read_bytes();return gzip.decompress(b) if p.suffix=='.gz' else b
def load(p):return json.loads(raw(p))
def verify():
 paths=list(P.rglob('*'));assert not any(p.is_symlink() for p in paths);assert all(p.is_dir()or p.is_file() for p in paths)
 assert {str(p.relative_to(P)):sha(p.read_bytes()) for p in paths if p.is_file()and p!=P/'manifest.json'}==load(P/'manifest.json')
 for n,h in load(P/'external-inputs.json').items():assert sha((ROOT/n).read_bytes())==h
 receipt=load(P/'reference/ir-receipt.json');assert sha(raw(P/'input.ll.gz'))==receipt['source_ir_sha256']=='56449431f996e14dd9a59490476ebcbc862bf971bdc1f0c4a2f1242dd4642811'
 assert sha(raw(P/'reference/sell_quote.ll'))==receipt['extracted_sha256']
 assert sha(raw(P/'reference/result.json'))==receipt['build_result_sha256']
 r=load(P/'reference/result.json');assert r['returncode']==0 and r['source_unchanged']and r['tools_unchanged']and r['target_libraries_unchanged']
 assert sha(raw(P/'reference/rustc-symbols.so.gz'))==r['symbols_sha256']=='81a60b7e49bd33383ef9baa10d4f5dc3a062701405c932f612b903a06bbbaa0f'
 assert load(P/'reference/launch.json')['source_inputs']==load(P/'reference/source-inputs.json') and len(load(P/'reference/source-inputs.json'))==67
 assert sha(raw(P/'outputs/v152.o.gz'))=='1a4a78ffa6c8ad2a638a1c53d95930bc1a4d38fb1db9a3cdb3c86a1de47a42aa'
 assert sha(raw(P/'outputs/v154.o.gz'))=='a5c7e4ad2b39179a033f5652e043123cf028959ccbe0af59e458b68a07503b4e'
 tools=load(P/'tool-records.json');assert set(tools)=={'144','152','154'}
 for role,row in tools.items():
  assert row['metadata_recorded_after_execution']is True and row['command'][1:3]==['-O3','-filetype=obj']
  assert row['returncode']==(1 if role=='144'else 0)
  assert ('LLVM version 18.1.7-rust-dev' if role=='144'else 'LLVM version 20.1.7-rust-dev')in row['version']
 assert tools['152']['sha256']!=tools['154']['sha256']
 assert 'initializes' in raw(P/'outputs/v144.stderr').decode() and not (P/'outputs/v144.o.gz').exists()
 s=importlib.util.spec_from_file_location('backend_comparison',P/'compare.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);result=m.compare(ROOT,P);assert result==load(P/'comparison.json')
 assert [(r['bytes'],r['same_position_slots'],r['aligned_slots'])for r in result]==[(1288,2,67),(1120,124,125),(1120,124,125)]
 assert result[1]['diagnostic_sha256']==result[2]['diagnostic_sha256'] and not any(r['original_diagnostic_equal']for r in result)
 return {'same_IR':True,'backend_reference_equal':True,'original_function_equal':False,'whole_elf_equal':False,'new_matched_windows':0,'cases_executed':0,'measurements':result}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
