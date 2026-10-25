"""All-u64 local guard/result equivalence; no claim of matching generated SBF."""
from pathlib import Path
import hashlib,json
import z3
P=Path(__file__).resolve().parent
n,remaining,total=z3.BitVecs('n remaining total',64)
initial=z3.Or(n==0,z3.UGT(n,total))
checked_sub_fails=z3.ULT(remaining,n)
old_error=z3.Or(initial,checked_sub_fails)
new_error=z3.Or(initial,z3.Not(z3.UGE(remaining,n)))
target_error=z3.Or(initial,z3.Not(z3.UGE(remaining,n)))
# Both success values use the same mathematical difference; unsigned subtraction
# cannot underflow in the success domain remaining >= n.
solver=z3.Solver()
solver.add(z3.Or(old_error!=new_error,old_error!=target_error,
    z3.And(z3.Not(new_error),z3.ULT(remaining,n))))
query=solver.to_smt2();(P/'guard-equivalence.smt2').write_text(query)
result=str(solver.check());assert result=='unsat'
# Exact negation of original branch at238832; false edge passes through insertedJA.
branch_solver=z3.Solver();branch_solver.add(z3.UGE(remaining,n)!=z3.Not(z3.UGT(n,remaining)))
branch_result=str(branch_solver.check());assert branch_result=='unsat'
(P/'guard-equivalence.json').write_text(json.dumps(dict(scope='All 64-bit unsigned number_of_uses/remaining/total; identical earlier validation and metadata/error conversion assumed from bound source. This proves local guards and success-subtraction domain, not generated code or full instruction semantics.',solver='Z3 '+z3.get_version_string(),query_sha256=hashlib.sha256(query.encode()).hexdigest(),all_u64_guard_and_subtraction_domain=result,branch_polarity_negation=branch_result,source_unchanged=True,no_runtime_transactions=True),indent=2)+'\n')
print(result,branch_result)
