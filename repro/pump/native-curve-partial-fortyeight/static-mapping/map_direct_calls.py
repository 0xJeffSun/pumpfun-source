"""Read-only direct-call closure; no programs are executed or changed."""
import bisect, hashlib, json
import extract as x

entries = x.E.entries
edges = {a: [] for a in entries}
for site, target in x.E.calls.items():
    owner = entries[bisect.bisect_right(entries, site) - 1]
    edges[owner].append({'site': site, 'target': target})
def closure(root):
    seen, pending = set(), [root]
    while pending:
        at = pending.pop()
        if at in seen:
            continue
        seen.add(at)
        pending.extend(e['target'] for e in edges.get(at, []) if e['target'] in edges)
    return seen

roots = {
    'multi_hop_curve_swap': 0x567d8, 'buy_v3': 0x147ba0,
    'buy_exact_quote_in_v3': 0x1489f8, 'sell_v3': 0x14a8a8,
    'sell_v2': 0x144508, 'admin_set_incentives': 0x746a8,
    'claim_incentives': 0x75308, 'set_mayhem_virtual_params': 0x137fc0,
    'create_v2': 0x1e7c0,
}
reachable = closure(roots['multi_hop_curve_swap'])
rows = []
for start in sorted(reachable):
    end = next((a for a in entries if a > start), x.E.hi)
    rows.append({
        'start': start, 'end': end,
        'raw_sha256': hashlib.sha256(x.E.b[start:end]).hexdigest(),
        'direct_calls': edges[start],
        'indirect_call_sites': [a for a in range(start,end,8) if x.E.b[a] == 0x8d],
        'external_call_relocations': [dict(site=a, **r) for a,r in x.E.relocations.items()
                                      if start <= a < end and r['type'] == 10],
    })
out = {
    'scope': 'Only statically resolved direct internal calls. Indirect calls and CPI dispatch are excluded. Non-reachability here is not a complete absence proof.',
    'original': x.E.identity(), 'roots': roots, 'reachable_window_count': len(rows),
    'instruction_bodies_in_route_closure': {k: a in reachable for k,a in roots.items()},
    'shared_direct_closure_windows': {k: sorted(reachable & closure(a)) for k,a in roots.items() if k != 'multi_hop_curve_swap'},
    'windows': rows,
}
(x.P/'direct-call-graph.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({'reachable_window_count': len(rows), 'instruction_bodies_in_route_closure': out['instruction_bodies_in_route_closure']}, indent=2))
