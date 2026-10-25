"""Assemble the reviewable scratch harness without changing the executed recipe bodies."""
from pathlib import Path
import ast
root=Path(__file__).resolve().parent
parts=[]
for name in ['probe.py','probe_routes.py','probe_curve.py','probe_mixed.py','probe_two_curves.py','probe_three_amm.py','probe_validation.py','compare_broad.py']:
 text=(root/name).read_text();nodes=ast.parse(text).body;lines=text.splitlines(keepends=True);kept=[]
 for n in nodes:
  if isinstance(n,ast.ImportFrom)and(n.module or '').startswith('probe'):continue
  if isinstance(n,ast.If)and'__name__' in ast.unparse(n.test)and name!='compare_broad.py':continue
  kept.extend(lines[n.lineno-1:n.end_lineno]);kept.append('\n')
 parts.append(''.join(kept))
s=''.join(parts).replace("ca=h.vm.get_account(CURVE);print('CURVE',bytes(ca.data).hex())", "ca=h.vm.get_account(CURVE)")
s=s.replace("candidate=pathlib.Path(sys.argv[1]).resolve();out=pathlib.Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=False);rows=[]", "parser=argparse.ArgumentParser();parser.add_argument('--candidate',type=pathlib.Path,required=True);parser.add_argument('--output',type=pathlib.Path,required=True);args=parser.parse_args();candidate=(_CALLER_CWD/args.candidate).resolve();output=(_CALLER_CWD/args.output).resolve();output.parent.mkdir(parents=True,exist_ok=True);rows=[]")
s=s.replace("(out/'report.json').write_text(","output.write_text(")
s=s.replace("ROOT=pathlib.Path(__file__).resolve().parents[2]", "_CALLER_CWD=pathlib.Path.cwd()\nROOT=pathlib.Path(__file__).resolve().parents[2]")
s=s.replace("print(label,diff,original['error'],recovered['error'],flush=True)", "None")
(root/'pump_amm_multi_hop_differential.py').write_text(s)
ast.parse(s)
