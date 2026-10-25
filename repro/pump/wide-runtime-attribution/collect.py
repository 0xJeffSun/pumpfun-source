from pathlib import Path
import hashlib,json,shutil,subprocess
R=Path.cwd();W=R/'work/pump-wide-runtime-attribution';H=lambda b:hashlib.sha256(b).hexdigest();rows=[]
def copy(src,dest,kind):
 b=(R/src).read_bytes();p=W/'inputs'/dest;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);rows.append({'source':src,'saved':str(Path('inputs')/dest),'sha256':H(b),'bytes':len(b),'scope':kind})
base='repro/pump/tokenkeg-two-curve-fortyeight/'
for name in ['candidate.so','unstripped.so','manifest-sha256.json','source-snapshot.tar.gz','source-harness-sha256.json','build-comparison.json','build-attempt.json','build.log.gz','dependency-provenance.json','toolchain-phases.json','cargo-rustc-info.json','elf_reader.py']:
 copy(base+name,'accepted-pump/'+name,'public tracked accepted 5c package')
copy('evidence/original/pump/deployed.so','original-pump.so','public captured original')
for source,dest in [('repro/pump_amm/compiler-v144/toolchain-input-hashes.json','retained-toolchain-hashes.json'),('repro/pump_fees/compiler-family/v144-toolchain-provenance.json','retained-distribution-provenance.json'),('repro/pump_fees/compiler-family/v144-release-metadata.json','retained-release-metadata.json'),('repro/pump_fees/linux-v144-sysroot-provenance/archive-evidence.json','retained-linux-selected-members.json')]:copy(source,dest,'public tracked selected-tool provenance; no new source/cache inspection')
base='repro/parallel-work/2026-10-25/invariant-results/pump_nested_pricing/'
for name in ['manifest-sha256.json','REPORT.md','windows.json','provenance.json','inputs/wide-div-wrapper.asm','inputs/wide-div-core.asm','inputs/wide-shr.asm','inputs/wide-mul.asm','inputs/wide-shl.asm']:
 copy(base+name,'prior-pricing/'+name,'explicit parent-approved pending static package')
base='repro/parallel-work/2026-10-25/followup-results/pump_route_arithmetic/'
for name in ['manifest-sha256.json','REPORT.md','provenance.json','result.json']:copy(base+name,'prior-route/'+name,'explicit parent-approved pending static package')
tracked=subprocess.check_output(['git','ls-files','-z']).decode().split('\0');relevant=[p for p in tracked if any(x in p.lower()for x in ['compiler_builtins','compiler-builtins','specialized_div_rem','int/mul.rs','int/shift.rs'])];(W/'tracked-source-path-search.json').write_text(json.dumps({'head':subprocess.check_output(['git','rev-parse','HEAD']).decode().strip(),'path_terms':['compiler_builtins','compiler-builtins','specialized_div_rem','int/mul.rs','int/shift.rs'],'matching_tracked_paths':relevant,'scope':'Bounded path inventory only; absence is not proof that no historical source existed.'},indent=2)+'\n')
for row in rows:
 if row['scope'].startswith('public'):assert row['source']in tracked
(W/'input-provenance.json').write_text(json.dumps({'files':rows,'network_reads':0,'cache_reads':0,'source_builds':0,'runtime_probes':0,'selected_source_scope':'Only public tracked files and two explicitly approved pending static reports; no selected sysroot source bytes added.'},indent=2)+'\n')
print(len(rows),'inputs')
