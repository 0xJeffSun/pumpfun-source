"""Exact source-only branch materializer. No network, compiler, VM or artifact reads."""
from pathlib import Path, PurePosixPath
import hashlib,json,re,sys
if not __debug__:raise RuntimeError('Use ordinary Python, not -O')
sys.dont_write_bytecode=True
HUNK=re.compile(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@')
TOP={'README.md','source-stages.json','direct_outer.patch','explicit_branches.patch','source_tools.py','test_source.py','manifest.json'}
METADATA='0765712d667624f50ca4ddc26adb621f8807dfd0c1534b6dd39df0c4c3d870c8'
def sha(data):
    return hashlib.sha256(data).hexdigest()

def relative(value):
    if not isinstance(value, str):
        raise ValueError('Unsafe source path')
    p = PurePosixPath(value)
    if not value or value=='.' or p.is_absolute() or '..' in p.parts or '\\' in value or str(p) != value:
        raise ValueError('Unsafe source path')
    return p

def read_under(root, name):
    relative(name)
    if any(p.is_symlink() for p in [Path(root), *Path(root).absolute().parents]):
        raise ValueError('Symlink input root is not accepted')
    root = Path(root).resolve()
    p = root / name
    if not p.resolve().is_relative_to(root):
        raise ValueError('Source path escapes root')
    if any(x.is_symlink() for x in [p, *list(p.parents)[:len(PurePosixPath(name).parts) - 1]]):
        raise ValueError('Symlink source input is not accepted')
    return p.read_bytes()

def inventory(root):
    root = Path(root)
    if any(p.is_symlink() for p in [root, *root.absolute().parents]):
        raise ValueError('Symlink source root is not accepted')
    result = {}
    for p in root.rglob('*'):
        if p.is_symlink():
            raise ValueError('Symlink source input is not accepted')
        if p.is_file():
            result[str(p.relative_to(root))] = sha(p.read_bytes())
        elif not p.is_dir():
            raise ValueError('Special source/packet file is not accepted')
    return result

def parse_patch(text):
    lines = text.splitlines(keepends=True)
    result = {}
    i = 0
    while i < len(lines):
        if not lines[i].startswith('--- a/') or i + 1 >= len(lines) or not lines[i + 1].startswith('+++ b/'):
            raise ValueError('Expected paired source headers')
        old = lines[i][6:].rstrip('\n')
        new = lines[i + 1][6:].rstrip('\n')
        relative(old)
        relative(new)
        if old != new or new in result:
            raise ValueError('Only distinct ordinary same-path source patches are accepted')
        i += 2
        hunks = []
        while i < len(lines) and lines[i].startswith('@@ '):
            m = HUNK.match(lines[i])
            if not m:
                raise ValueError('Malformed hunk')
            a, ac, b, bc = (int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1))
            i += 1
            body, ao, bo = [], 0, 0
            while ao < ac or bo < bc:
                if i >= len(lines) or lines[i][:1] not in [' ', '+', '-']:
                    raise ValueError('Truncated hunk')
                line = lines[i]
                ao += line[0] in ' -'
                bo += line[0] in ' +'
                if ao > ac or bo > bc:
                    raise ValueError('Hunk extent mismatch')
                body.append(line)
                i += 1
            hunks.append((a, ac, b, bc, body))
        if not hunks:
            raise ValueError('Source patch has no hunks')
        result[new] = hunks
    return result

def apply_file(data, hunks, reverse=False):
    lines = data.decode('utf8').splitlines(keepends=True)
    out, cursor = [], 0
    for a, ac, b, bc, body in hunks:
        start = (b if reverse else a)
        index = max(0, start - 1)
        if index < cursor or index > len(lines):
            raise ValueError('Invalid or overlapping source hunk')
        out.extend(lines[cursor:index])
        cursor = index
        for line in body:
            sign = line[0]
            if reverse:
                sign = {'+': '-', '-': '+', ' ': ' '}[sign]
            content = line[1:]
            if sign in ' -':
                if cursor >= len(lines) or lines[cursor] != content:
                    raise ValueError('Source hunk does not match')
                cursor += 1
            if sign in ' +':
                out.append(content)
    out.extend(lines[cursor:])
    return ''.join(out).encode()

def canonical(mapping):
    return sha(json.dumps(mapping,sort_keys=True,separators=(',',':')).encode())

def packet(package):
    names=inventory(package)
    if set(names)!=TOP:raise ValueError('Packet must contain exactly the seven reviewed text files')
    man=json.loads(read_under(package,'manifest.json'))
    if man['files']!={n:h for n,h in names.items()if n!='manifest.json'}:raise ValueError('Packet hashes differ')
    for n in names:
        data=read_under(package,n);data.decode('utf8')
        if b'\0'in data:raise ValueError('Not UTF-8 source text')
    data=read_under(package,'source-stages.json')
    if sha(data)!=METADATA:raise ValueError('Source stage binding differs')
    return json.loads(data)

def stages(package,parent):
    m=packet(package);expected=m['parent']['source_files']
    if inventory(parent)!=expected or len(expected)!=48:raise ValueError('Exact pinned48-file PR320 box parent required')
    out={'parent':{n:read_under(parent,n)for n in expected}}
    def visit(name):
        if name in out:return out[name]
        row=m['stages'][name];before=visit(row['parent']);data=read_under(package,row['patch'])
        if sha(data)!=row['patch_sha256']:raise ValueError('Source patch hash differs')
        hunks=parse_patch(data.decode());changed=set(row['changed_paths'])
        if set(hunks)!=changed:raise ValueError('Unexpected changed paths')
        after=dict(before)
        for n in changed:
            if n not in before:raise ValueError('Patch must address existing source')
            after[n]=apply_file(before[n],hunks[n])
            if apply_file(after[n],hunks[n],reverse=True)!=before[n]:raise ValueError('Patch not reversible')
        if {n for n in before if before[n]!=after[n]}!=changed:raise ValueError('Changed-path mismatch')
        if {n:sha(b)for n,b in after.items()}!=row['source_files']:raise ValueError('Reconstructed source stage mismatch')
        out[name]=after;return after
    for name in m['stages']:visit(name)
    return out

def materialize(package,parent,output,stage):
    if stage not in {'direct_outer','explicit_branches'}:raise ValueError('Unknown stage')
    data=stages(package,parent)[stage];output=Path(output)
    if output.exists()or output.is_symlink():raise ValueError('Output must not exist')
    if any(p.is_symlink()for p in output.absolute().parents):raise ValueError('Symlink output ancestor')
    if any(output.resolve().is_relative_to(Path(p).resolve())for p in [package,parent]):raise ValueError('Output must be outside packet and parent')
    output.mkdir(parents=True)
    for n,b in sorted(data.items()):
        relative(n);p=output/n;p.parent.mkdir(parents=True,exist_ok=True)
        with p.open('xb')as f:f.write(b)
    if inventory(output)!={n:sha(b)for n,b in data.items()}:raise ValueError('Written source mismatch')
    return {'source_stage':stage,'source_files':48,'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--parent',type=Path,required=True);p.add_argument('--output',type=Path);p.add_argument('--stage',choices=['direct_outer','explicit_branches'],default='explicit_branches');a=p.parse_args();here=Path(__file__).resolve().parent
    result={'source_stages_verified':list(stages(here,a.parent)),'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}
    if a.output:result.update(materialize(here,a.parent,a.output,a.stage))
    print(json.dumps(result,indent=2))
