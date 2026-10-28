import hashlib, json, os, sys
root, manifest = sys.argv[1], sys.argv[2]
m = json.load(open(manifest))
bad = 0
for rel, h in m.items():
    p = os.path.join(root, rel)
    if not os.path.isfile(p):
        print("MISSING", rel); bad += 1; continue
    got = hashlib.sha256(open(p, 'rb').read()).hexdigest()
    if got != h:
        print("DIFF", rel, got[:12], "want", h[:12]); bad += 1
extra = []
for dp, dn, fn in os.walk(root):
    for f in fn:
        rel = os.path.relpath(os.path.join(dp, f), root)
        if rel not in m: extra.append(rel)
print(f"files={len(m)} bad={bad} extra={len(extra)}", extra[:10])
