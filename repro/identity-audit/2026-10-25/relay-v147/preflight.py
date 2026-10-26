"""Official target capability and primary-source bindings before one source build."""
from pathlib import Path
import hashlib,json,re,struct,subprocess
P=Path(__file__).resolve().parent;T=P/'platform-tools';H=lambda b:hashlib.sha256(b).hexdigest();records=[];specs={}
for name in ['sbf-solana-solana','sbpf-solana-solana']:
 cmd=[str(T/'rust/bin/rustc'),'-Z','unstable-options','--print','target-spec-json','--target',name];r=subprocess.run(cmd,capture_output=True,text=True);records.append(dict(command=cmd,returncode=r.returncode,stdout=r.stdout,stderr=r.stderr));r.check_returncode();spec=json.loads(r.stdout);specs[name]=spec;(P/(name+'-target-spec.json')).write_text(json.dumps(spec,indent=2)+'\n')
assert specs['sbf-solana-solana']==specs['sbpf-solana-solana'];spec=specs['sbf-solana-solana'];assert spec.get('cpu','generic')=='generic'and spec['features']=='+store-imm,+jmp-ext'
base=(P/'primary-source/rust-compiler_rustc_target_src_spec_base_sbf_base.rs').read_text();prior=(P.parents[1]/'repro/identity-audit/2026-10-25/compiler-v1461/v1.46.1-rust-compiler_rustc_target_src_spec_base_sbf_base.rs').read_text();pattern=r'const V0_LINKER_SCRIPT: &str = r"(.*?)";';v0=re.search(pattern,base,re.S).group(1);assert v0==re.search(pattern,prior,re.S).group(1)
for name in ['sbf_solana_solana','sbpf_solana_solana']:assert 'sbf_target("v0")'in(P/('primary-source/rust-compiler_rustc_target_src_spec_targets_'+name+'.rs')).read_text()
libs={}
for name in specs:
 folder=T/'rust/lib/rustlib'/name/'lib';libs[name]={f.name:H(f.read_bytes())for f in folder.iterdir()if f.is_file()}
# Distinct alias-named sysroot artifacts are retained as distribution inputs.
# Select legacy sbf, as in original driver recipe; do not equate these bytes.
probe=P/'old-target-probe.rs';probe.write_text('#![no_std]\npub fn probe() -> u64 { 1 }\n');cmd=[str(T/'rust/bin/rustc'),'--crate-type=lib','--target=sbf-solana-solana',str(probe),'-o',str(P/'old-target-probe.rlib')];r=subprocess.run(cmd,capture_output=True,text=True);records.append(dict(command=cmd,returncode=r.returncode,stdout=r.stdout,stderr=r.stderr,scope='Minimal legacy-name sysroot capability, not frozen program build'));r.check_returncode()
ll=P/'header-probe.ll';ll.write_text('define i64 @probe(i64 %x) {\n %y = add i64 %x, 1\n ret i64 %y\n}\n');cmd=[str(T/'llvm/bin/llc'),'-march=sbf','-mcpu=generic','-filetype=obj',str(ll),'-o',str(P/'v147-generic.o')];r=subprocess.run(cmd,capture_output=True,text=True);records.append(dict(command=cmd,returncode=r.returncode,stdout=r.stdout,stderr=r.stderr));r.check_returncode();b=(P/'v147-generic.o').read_bytes();assert(struct.unpack_from('<H',b,18)[0],struct.unpack_from('<I',b,48)[0])==(263,0)
version=subprocess.check_output([str(T/'rust/bin/rustc'),'--version','--verbose'],text=True)
out=dict(stock_generic_target='sbf-solana-solana',legacy_target_works=True,alias_specs_raw_equal=True,alias_sysroot_file_maps_equal=libs['sbf-solana-solana']==libs['sbpf-solana-solana'],alias_sysroot_files=libs['sbf-solana-solana'],V0_linker_script_equal_v1461=True,V0_linker_script_sha256=H(v0.encode()),stock_features='+store-imm,+jmp-ext',features_overridden=False,header_machine=263,header_flags=0,rustc_version=version,commands=records,source_data_compatibility='All6fullUnicodearrays1449BmatchRelay, authenticstablequicksortpathpresent, LLVMsingleR0returnremains; codebodylengthsunmeasureduntilonecontrolledbuild',program_builds=0,selected_invocation='Directofficialcargo/rustc with legacygenericV0target (supported); no targetnameadaptationneeded, no globalrustupalias')
(P/'target-preflight.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps({k:v for k,v in out.items()if k not in ['commands','alias_sysroot_files']},indent=2))
