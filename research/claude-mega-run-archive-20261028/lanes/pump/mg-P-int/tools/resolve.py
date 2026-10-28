"""resolve(text_with_markers, [choice...]) -> text. choice: 'o' ours, 't' theirs, 'ot', 'to', or literal text (prefix '=')."""
def resolve(text, choices):
    L = text.split('\n'); out = []; i = 0; k = 0
    while i < len(L):
        if L[i].startswith('<<<<<<< '):
            j = i + 1; o = []
            while not L[j].startswith('======='): o.append(L[j]); j += 1
            j += 1; t = []
            while not L[j].startswith('>>>>>>> '): t.append(L[j]); j += 1
            c = choices[k]; k += 1
            if c.startswith('='): out += c[1:].split('\n')
            else: out += sum(({'o': o, 't': t}[x] for x in c), [])
            i = j + 1; continue
        out.append(L[i]); i += 1
    assert k == len(choices), (k, len(choices))
    return '\n'.join(out)
