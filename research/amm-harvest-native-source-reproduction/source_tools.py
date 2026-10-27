"""Exact AMM source-only transformer. No network, subprocess, compiler or VM."""
if not __debug__: raise RuntimeError("Assertions require normal Python")
from pathlib import Path, PurePosixPath
import hashlib,json,re
HUNK=re.compile(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@')
def sha(data):
    return hashlib.sha256(data).hexdigest()

def relative(value):
    if not isinstance(value, str):
        raise ValueError('Unsafe source path')
    p = PurePosixPath(value)
    if not value or p.is_absolute() or '..' in p.parts or '\\' in value or str(p) != value:
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


ALLOWED={'README.md','manifest.json','source-inputs.json','helper.patch','wrapper.patch','source_tools.py','test_scope.py','compare.py','test_compare.py'}
METADATA_PIN='dec30516649e1de13b7a4f0e8c47b3381bee0ebc6f072e7f517546a9be1d3563'

def verify(package):
    package=Path(package)
    if any(p.is_symlink() for p in [package,*package.absolute().parents]) or any(p.is_symlink() for p in package.rglob('*')):
        raise ValueError('Symlink packet entry is not accepted')
    actual={str(p.relative_to(package)) for p in package.rglob('*') if p.is_file()}
    if actual!=ALLOWED:raise ValueError('Unexpected packet membership')
    seal=json.loads(read_under(package,'manifest.json'))
    if set(seal)!=ALLOWED-{'manifest.json'}:raise ValueError('Unexpected integrity membership')
    for name,digest in seal.items():
        if sha(read_under(package,name))!=digest:raise ValueError('Packet integrity mismatch')
    m=json.loads(read_under(package,'source-inputs.json'))
    if sha(json.dumps(m,sort_keys=True,separators=(',',':')).encode())!=METADATA_PIN:
        raise ValueError('Exact source/provenance metadata mismatch')
    if not m['external_exact_workspace_parent_required'] or m['parent_materialization_provided']:
        raise ValueError('Exact external parent is required')
    for key in ['native_build_verified','runtime_verified','whole_binary_identity_verified']:
        if m[key] is not False:raise ValueError('Source-only default cannot attest native/runtime results')
    before=m['before']; parsed={}
    for stage,v in m['stages'].items():
        after=v['files']
        if len(before)!=49 or len(after)!=49 or before.keys()!=after.keys():raise ValueError('Exact 49-file source set required')
        for mapping in [before,after]:
            for name,digest in mapping.items():
                relative(name)
                if not re.fullmatch('[0-9a-f]{64}',digest):raise ValueError('Invalid source hash')
        delta={k for k in before if before[k]!=after[k]}
        if delta!=set(v['changed_paths']):raise ValueError('Unchanged-source drift')
        patch=read_under(package,v['patch'])
        if sha(patch)!=v['patch_sha256']:raise ValueError('Patch hash mismatch')
        hunks=parse_patch(patch.decode('utf8'))
        if set(hunks)!=delta:raise ValueError('Unexpected patch paths')
        parsed[stage]=hunks
        before=after
    return m,parsed

def transformed(package,parent,stage):
    m,parsed=verify(package)
    if stage not in m['stages']:raise ValueError('Unknown source stage')
    if inventory(parent)!=m['before']:raise ValueError('Exact 49-file public workspace parent required')
    contents={k:read_under(parent,k) for k in m['before']}
    for name,v in m['stages'].items():
        for key,hunks in parsed[name].items():
            old=contents[key];new=apply_file(old,hunks)
            if apply_file(new,hunks,reverse=True)!=old:raise ValueError('Patch does not reverse exactly')
            if key.endswith('/boost_burn.rs') and len(new.splitlines())!=len(old.splitlines()):
                raise ValueError('Boost physical line count drift')
            if key.endswith('/utils/token.rs') and not new.startswith(old):
                raise ValueError('Existing token utility coordinates drift')
            contents[key]=new
        if {k:sha(v) for k,v in contents.items()}!=v['files']:raise ValueError('Output source map mismatch')
        if name==stage:break
    return contents

def materialize(package,parent,output,stage='helper'):
    parent,output=Path(parent),Path(output)
    if output.exists() or output.is_symlink():raise ValueError('Output must not exist')
    if any(p.is_symlink()for p in output.absolute().parents):raise ValueError('Symlink output ancestor')
    if output.resolve().is_relative_to(parent.resolve()):raise ValueError('Output must be outside parent')
    data=transformed(package,parent,stage)
    output.mkdir(parents=True)
    for key,value in sorted(data.items()):
        p=output/key;p.parent.mkdir(parents=True,exist_ok=True)
        with p.open('xb') as f:f.write(value)
    if inventory(output)!={k:sha(v) for k,v in data.items()}:raise ValueError('Written source differs')
    return {'source_stage':stage,'exact_source_materialization_verified':True,'source_inputs':49,'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--parent',type=Path);p.add_argument('--materialize',type=Path);p.add_argument('--stage',default='helper');a=p.parse_args()
    if bool(a.parent)!=bool(a.materialize):p.error('--parent and --materialize must be supplied together')
    package=Path(__file__).resolve().parent
    if a.parent:r=materialize(package,a.parent,a.materialize,a.stage)
    else:
        verify(package);r={'packet_integrity_verified':True,'external_exact_49_file_parent_required':True,'exact_source_materialization_verified':False,'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}
    print(json.dumps(r,indent=2))
