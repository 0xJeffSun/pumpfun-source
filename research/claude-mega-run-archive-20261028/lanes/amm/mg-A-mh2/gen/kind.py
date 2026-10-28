# kind.py IN OUT [eqform] : convert is_curve_hop -> hop_kind returning Result<HopKind>; loop-2 uses match / == HopKind::Curve
import sys
s=open(sys.argv[1]).read().split('\n'); form=sys.argv[3] if len(sys.argv)>3 else 'eq'
assert all(x.strip()=='' for x in s[214:229])
s[216:222]=['/// Kind of venue a hop trades on.','#[derive(Clone, Copy, PartialEq, Eq)]','enum HopKind {','    Amm,','    Curve,','}']
assert s[231].startswith('fn is_curve_hop(')
s[229]='/// Classify a hop by its pool account owner: PumpSwap pools are AMM hops,'
s[231]='fn hop_kind(accounts: &[AccountInfo]) -> Result<HopKind> {'
s[234]=s[234].replace('Ok(false)','Ok(HopKind::Amm)'); s[236]=s[236].replace('Ok(true)','Ok(HopKind::Curve)')
t='\n'.join(s)
# loop 2
old_if='        if is_curve_hop(hop)? {'
assert t.count(old_if)==1
t=t.replace(old_if,'        match hop_kind(hop)? {\n            HopKind::Curve => {',1)
inner='&& is_curve_hop(&remaining[end.saturating_mul(5)..end.saturating_mul(5).saturating_add(5)])?'
assert t.count(inner)==1
if form=='eq': t=t.replace(inner,'&& hop_kind(&remaining[end.saturating_mul(5)..end.saturating_mul(5).saturating_add(5)])? == HopKind::Curve')
else: t=t.replace(inner,'&& matches!(hop_kind(&remaining[end.saturating_mul(5)..end.saturating_mul(5).saturating_add(5)])?, HopKind::Curve)')
old_else='            i = end;\n        } else {'
assert t.count(old_else)==1
t=t.replace(old_else,'            i = end;\n            }\n            HopKind::Amm => {',1)
# close: the AMM arm ends with '            i += 1;\n        }\n    }' -> add one more brace level
old_end='            i += 1;\n        }\n    }'
assert t.count(old_end)==1
t=t.replace(old_end,'            i += 1;\n            }\n        }\n    }',1)
s=t.split('\n')
# remove 3 blank lines from the 367..388 gap to keep line 389
i0=next(i for i,x in enumerate(s) if 'require_gte!(amount, min_amount_out' in x)
k=0
for j in range(i0-1,i0-25,-1):
    if s[j].strip()=='' and k<3: del s[j]; k+=1
open(sys.argv[2],'w').write('\n'.join(s))
print('ok; require_gte line', next(i for i,x in enumerate(s) if 'require_gte!(amount, min_amount_out' in x)+1)
