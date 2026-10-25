from pathlib import Path
import json,hashlib,shutil
P=Path(__file__).resolve().parent;R=P.parents[1];H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text());g=J(P/'gate-before.json');B=P/'build-01';tools=g['tools']
for n,h in g['source'].items():assert H(R/n)==h,n
for n,h in g['helpers'].items():assert H(R/n)==h,n
for v in [*tools['compile_tools'].values(),tools['strip_tool'],tools['cli']]:assert H(Path(v['resolved_path']))==v['sha256']
cache=R/'work/fees-v2-caller-build/cargo-home';deps={str(f.relative_to(cache)):H(f)for n in ['registry/cache','registry/src']for f in(cache/n).rglob('*')if f.is_file()};assert deps==J(P/'dependency-before.json');(P/'dependency-after.json').write_text(json.dumps(deps,indent=2)+'\n')
a=J(B/'build-attempt.json');assert a['returncode']==0 and a['source_unchanged'];log=(B/'build.log').read_text();bad=[l for l in log.splitlines()if any(s in l.lower()for s in ['stack offset','stack frame','stack size','stack overflow','llvm error','error: function'])];assert not bad,bad
roots={s for v in J(B/'target/.rustc_info.json')['outputs'].values()for s in v.get('stdout','').splitlines()if s.startswith('/')and s.endswith('/rust')};assert len(roots)==1;compiler=Path(roots.pop())
for n,v in tools['compile_tools'].items():assert H(compiler.parent/n)==v['sha256']
strip=B/'sdk/dependencies/platform-tools/llvm/bin/llvm-objcopy';assert H(strip)==tools['strip_tool']['sha256']and(B/'sdk/dependencies/platform-tools-v1.52.md').is_file()
for n,h in tools['sdk_template_files'].items():assert H(B/'sdk'/n)==h,n
shutil.copy2(B/'artifacts/pump_fees_candidate.so',P/'candidate.so');shutil.copy2(B/'target/sbf-solana-solana/release/pump_fees_candidate.so',P/'symbols.so')
(P/'build-acceptance.json').write_text(json.dumps({'passed':True,'candidate_sha256':H(P/'candidate.so'),'symbols_sha256':H(P/'symbols.so'),'compiler':str(compiler),'compiler_v1_44_confirmed':True,'strip_v1_52_confirmed':True,'backend_stack_errors':bad,'source_helpers_tools_dependencies_unchanged':True},indent=2)+'\n');print((P/'build-acceptance.json').read_text())
