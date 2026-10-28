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

ROOT_FILES={'README.md','PROVENANCE.md','manifest.json','source-inputs.json','harvest.patch',
            'source_tools.py','test_scope.py','workspace_recipe_v2.py','standalone-Cargo.toml'}
METADATA_PIN='24ae89d7b9fa6e0d181503c51917259761fbf634d4072fe14ca92f2cddead2ee'
def verify(package):
    package=Path(package)
    m=json.loads(read_under(package,'source-inputs.json'))
    if sha(json.dumps(m,sort_keys=True,separators=(',',':')).encode())!=METADATA_PIN:
        raise ValueError('Exact source/provenance metadata mismatch')
    before,after=m['base_workspace'],m['composed_workspace']
    if len(before)!=52 or len(after)!=52 or before.keys()!=after.keys():
        raise ValueError('Exact52-source input set required')
    for mapping in [before,after,m['canonical_files_sha256']]:
        for name,digest in mapping.items():
            relative(name)
            if not re.fullmatch('[0-9a-f]{64}',digest):raise ValueError('Invalid source hash')
    allowed=ROOT_FILES|{'base/'+name for name in before}
    actual=inventory(package)
    if set(actual)!=allowed:raise ValueError('Unexpected packet membership')
    manifest=json.loads(read_under(package,'manifest.json'))
    if set(manifest)!=allowed-{'manifest.json'}:raise ValueError('Unexpected integrity membership')
    if {k:v for k,v in actual.items() if k!='manifest.json'}!=manifest:raise ValueError('Packet integrity mismatch')
    if inventory(package/'base')!=before:raise ValueError('Bundled base source drift')
    if not m['bundled_exact_parent']:raise ValueError('Self-contained parent required')
    for key in ['default_native_build_verified','default_runtime_verified','default_whole_binary_identity_verified']:
        if m[key] is not False:raise ValueError('Source-only verification cannot attest native/runtime identity')
    if sha(read_under(package,'workspace_recipe_v2.py'))!=m['workspace_recipe_sha256']:
        raise ValueError('Public recipe changed')
    source={name:read_under(package/'base',name) for name in before}
    canonical=dict(source)
    canonical['programs/pump-amm/Cargo.lock']=canonical.pop('Cargo.lock')
    del canonical['Cargo.toml']
    canonical['programs/pump-amm/Cargo.toml']=read_under(package,'standalone-Cargo.toml')
    if {name:sha(value) for name,value in canonical.items()}!=m['canonical_files_sha256']:
        raise ValueError('Canonical public source binding differs')
    git={name:hashlib.sha1(b'blob '+str(len(value)).encode()+b'\0'+value).hexdigest() for name,value in canonical.items()}
    if git!=m['canonical_blob_sha1']:raise ValueError('Public Git blob binding differs')
    ns={'__name__':'pinned_public_recipe','__file__':str(package/'workspace_recipe_v2.py')}
    exec(compile(read_under(package,'workspace_recipe_v2.py'),str(package/'workspace_recipe_v2.py'),'exec'),ns)
    crate,workspace=ns['transform_manifest'](canonical['programs/pump-amm/Cargo.toml'])
    if crate!=source['programs/pump-amm/Cargo.toml'] or workspace!=source['Cargo.toml']:
        raise ValueError('Public workspace recipe does not reproduce bundled manifests')
    patch=read_under(package,'harvest.patch')
    if sha(patch)!=m['patch_sha256']:raise ValueError('Patch hash differs')
    parsed=parse_patch(patch.decode('utf8'))
    changed={name for name in before if before[name]!=after[name]}
    if changed!=set(m['changed_paths']) or set(parsed)!=changed:raise ValueError('Patch scope drift')
    return m,parsed

def transformed(package,stage='harvest'):
    m,parsed=verify(package)
    if stage not in ('base','harvest'):raise ValueError('Unknown source stage')
    contents={name:read_under(Path(package)/'base',name) for name in m['base_workspace']}
    if stage=='base':return contents
    for name,hunks in parsed.items():
        old=contents[name];new=apply_file(old,hunks)
        if apply_file(new,hunks,reverse=True)!=old:raise ValueError('Patch does not reverse exactly')
        if name.endswith('/boost_burn.rs') and len(new.splitlines())!=len(old.splitlines()):
            raise ValueError('Boost physical source coordinates drift')
        if name.endswith('/utils/token.rs') and not new.startswith(old):
            raise ValueError('Existing token utility source coordinates drift')
        contents[name]=new
    if {name:sha(value) for name,value in contents.items()}!=m['composed_workspace']:
        raise ValueError('Composed source map mismatch')
    return contents

def materialize(package,output,stage='harvest'):
    package,output=Path(package),Path(output)
    if output.exists() or output.is_symlink():raise ValueError('Output must not exist')
    if any(p.is_symlink() for p in output.absolute().parents):raise ValueError('Symlink output ancestor')
    if output.resolve().is_relative_to(package.resolve()):raise ValueError('Output must be outside packet')
    contents=transformed(package,stage)
    output.mkdir(parents=True)
    for name,data in sorted(contents.items()):
        path=output/name;path.parent.mkdir(parents=True,exist_ok=True)
        with path.open('xb') as f:f.write(data)
    if inventory(output)!={k:sha(v) for k,v in contents.items()}:raise ValueError('Written source differs')
    return {'source_stage':stage,'exact_source_materialization_verified':True,'source_inputs':52,
            'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--materialize',type=Path);p.add_argument('--stage',choices=['base','harvest'],default='harvest')
    a=p.parse_args();package=Path(__file__).resolve().parent
    if a.materialize:report=materialize(package,a.materialize,a.stage)
    else:
        transformed(package)
        report={'packet_integrity_verified':True,'bundled_exact52_input_parent_verified':True,
                'canonical_public51_inputs_verified':True,'source_patch_forward_reverse_verified':True,
                'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}
    print(json.dumps(report,indent=2))

