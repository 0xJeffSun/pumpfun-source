"""Bounded lexer for this pinned ASCII Rust syntax; no compiler or target execution."""
import hashlib
import re

def sha(data):
    return hashlib.sha256(data).hexdigest()

def mask(data):
    text = data.decode('latin1')
    # These pinned files contain no raw strings or nested block comments.
    assert not re.search(r'\br#*"', text), 'unsupported raw string'
    pattern = re.compile(r'//[^\n]*|/\*[\s\S]*?\*/|"(?:\\.|[^"\\])*"')
    def blank(m):
        return ''.join('\n' if c == '\n' else ' ' for c in m.group())
    return pattern.sub(blank, text)

def span(data, start, end):
    return {'byte_start': start, 'byte_end': end,
            'line_start': data[:start].count(b'\n') + 1,
            'line_end': data[:end].count(b'\n') + 1,
            'sha256': sha(data[start:end])}

def end_brace(text, start):
    opening = text.index('{', start)
    depth = 1
    for end in range(opening+1, len(text)):
        if text[end] == '{': depth += 1
        elif text[end] == '}': depth -= 1
        if depth == 0: return end+1
    raise ValueError('unclosed body')

def inventory(path, data):
    text = mask(data)
    functions = []
    for m in re.finditer(r'\bfn\s+(\w+)\s*(?:<|\()', text):
        end = end_brace(text, m.start())
        s = span(data, m.start(), end)
        functions.append({'id': f'{path}::{m[1]}@{s["line_start"]}',
                          'path': path, 'name': m[1], **s})
    declarations = []
    for m in re.finditer(r'\b(?:pub\s+)?(struct|enum)\s+(\w+)', text):
        tail = text[m.end():]
        # tuple and unit checked-program helper types have no brace body.
        brace = tail.find('{'); semi = tail.find(';')
        end = m.end()+semi+1 if semi >= 0 and (brace < 0 or semi < brace) else end_brace(text, m.start())
        s = span(data, m.start(), end)
        declarations.append({'id': f'{path}::{m[2]}@{s["line_start"]}', 'path': path,
                             'kind': m[1], 'name': m[2], **s})
    return {'functions': functions, 'declarations': declarations}

def cpi_contract(path, data):
    text = data.decode()
    matches = re.findall(r'let infos=\[(.*?)\];', text)
    if not matches: return None
    assert len(matches) == 1
    names = re.findall(r'a\.(\w+)\.to_account_info\(\)', matches[0])
    flags = re.search(r'let writable=\[(.*?)\];', text)[1].split(',')
    assert len(names) == len(flags)
    signer = int(re.search(r'AccountMeta::new\(\*info.key,i==(\d+)\)', text)[1])
    forwarding = re.search(r'if i>=(\d+)', text)
    tail = int(forwarding[1]) if forwarding else len(names)
    selector = re.search(r'let mut data=vec!\[(.*?)\]', text)[1]
    selector = bytes(int(v.strip(), 0) for v in selector.split(','))
    arguments = re.findall(r'data.extend_from_slice\(&([a-z_]+).to_le_bytes\(\)\)', text)
    return {'path':path, 'target_constant':'AMM_ID' if 'program_id:AMM_ID' in text else 'PUMP_ID',
            'selector_hex':selector.hex(), 'u64_arguments':arguments,
            'trailing_zero_byte':'data.push(0)' in text, 'signer_seed':'sol-vault',
            'accounts':[{'index':i,'name':n,'writable':f=='true' if i<tail else 'forwarded AccountInfo.is_writable',
                         'signer':i==signer if i<tail else 'forwarded AccountInfo.is_signer'}
                        for i,(n,f) in enumerate(zip(names,flags))],
            'remaining_accounts_forwarded':False,
            'equality_claim':'candidate source contract only; original target bodies/data not re-proved'}
