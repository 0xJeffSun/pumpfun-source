"""Exact source-only transformer. No network, subprocess, compiler or VM."""
from pathlib import Path, PurePosixPath
import hashlib,json,re
HUNK=re.compile(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@')
ADDED='programs/pump-fees/src/instructions/fee_sharing/crank_donation_fee_pda.rs'
CHANGES={ADDED,'programs/pump-fees/src/lib.rs','programs/pump-fees/src/donation.rs'}
ALLOWED={'README.md','manifest.json','source.patch','source-inputs.json','source_tools.py','test_scope.py','compare.py','test_compare.py','source/crank_donation_fee_pda.rs'}
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
        if not (p.is_file() or p.is_dir()):
            raise ValueError('Special source input is not accepted')
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

def verify(package):
    package=Path(package)
    if any(p.is_symlink()for p in [package,*package.absolute().parents]) or any(p.is_symlink()for p in package.rglob('*')):
        raise ValueError('Symlink packet entry is not accepted')
    paths=list(package.rglob('*'))
    if not all(p.is_file() or p.is_dir() for p in paths):
        raise ValueError('Special packet entry is not accepted')
    actual={str(p.relative_to(package))for p in paths if p.is_file()}
    if actual!=ALLOWED:raise ValueError('Unexpected packet membership')
    seal=json.loads(read_under(package,'manifest.json'))
    if set(seal)!=ALLOWED-{'manifest.json'}:raise ValueError('Unexpected integrity membership')
    for name,digest in seal.items():
        if sha(read_under(package,name))!=digest:raise ValueError('Packet integrity mismatch')
    m=json.loads(read_under(package,'source-inputs.json'))
    if m['schema']!=1 or m['public_parent_materialization_provided'] is not False:
        raise ValueError('This packet requires an external exact scientific parent')
    if m['parent_kind']!='exact caller-supplied scientific source; no public materialization provided':
        raise ValueError('Parent provenance cannot be fabricated')
    for k in ['runtime_verified','native_build_verified','whole_binary_identity_verified']:
        if m[k] is not False:raise ValueError('Source verification cannot attest build/runtime/identity')
    allowed_map={'schema','parent_kind','public_parent_materialization_provided','before','after','changes','new_source_path','new_source_file','patch_sha256','runtime_verified','native_build_verified','whole_binary_identity_verified'}
    if set(m)!=allowed_map:raise ValueError('Unexpected source metadata')
    for name,digest in [('before','536e84f209deb0d42249e0ec986ed669c7718c40b19d841803390cf1291911d9'),('after','6013ecbb7f97876b9735470c38e639a6ac5a5db3269ba8da3f62bd6f04ca2152')]:
        if sha(json.dumps(m[name],sort_keys=True,separators=(',',':')).encode())!=digest:
            raise ValueError('Pinned complete source map mismatch')
    if len(m['before'])!=47 or len(m['after'])!=48 or set(m['changes'])!=CHANGES:
        raise ValueError('Unexpected source map')
    for mapping in [m['before'],m['after']]:
        for name,digest in mapping.items():
            relative(name)
            if not re.fullmatch('[0-9a-f]{64}',digest):raise ValueError('Invalid source hash')
    delta={k for k in m['before'].keys()|m['after'].keys()if m['before'].get(k)!=m['after'].get(k)}
    if delta!=CHANGES or m['after'].keys()-m['before'].keys()!={ADDED}:
        raise ValueError('Unexpected unchanged-source drift')
    if m['new_source_path']!=ADDED or m['new_source_file']!='source/crank_donation_fee_pda.rs':
        raise ValueError('Unexpected included source')
    body=read_under(package,m['new_source_file'])
    if sha(body)!=m['after'][ADDED] or sha(body)!='b8c834db90ba419b50c05ac65bcec049ce5f5ee2fbf114749aed8858aaa0a384':
        raise ValueError('Safe source identity mismatch')
    patch=read_under(package,'source.patch')
    if sha(patch)!=m['patch_sha256']:raise ValueError('Patch hash mismatch')
    hunks=parse_patch(patch.decode())
    if set(hunks)!=CHANGES:raise ValueError('Unexpected patch paths')
    if apply_file(b'',hunks[ADDED])!=body or apply_file(body,hunks[ADDED],reverse=True)!=b'':
        raise ValueError('Added source patch does not round trip')
    if body.count(b'#[inline(always)]')!=1 or b'unsafe' in body or b'exchange_malloc' in body:
        raise ValueError('Unexpected compiler-guidance/allocator scope')
    return m,hunks

def materialize(package,parent,output):
    m,hunks=verify(package);parent,output=Path(parent),Path(output)
    if output.exists() or output.is_symlink():raise ValueError('Output must not exist')
    if any(p.is_symlink()for p in output.absolute().parents):raise ValueError('Symlink output ancestor')
    if output.resolve().is_relative_to(parent.resolve()):raise ValueError('Output must be outside parent')
    if inventory(parent)!=m['before']:raise ValueError('Exact 47-file external parent required')
    contents={k:read_under(parent,k)for k in m['before']}
    for k in sorted(CHANGES):
        old=contents.get(k,b'');new=apply_file(old,hunks[k])
        if apply_file(new,hunks[k],reverse=True)!=old:raise ValueError('Source patch is not reversible')
        contents[k]=new
    if {k:sha(v)for k,v in contents.items()}!=m['after']:raise ValueError('Exact 48-file output mismatch')
    for k in ['programs/pump-fees/src/lib.rs','programs/pump-fees/src/donation.rs']:
        if len(contents[k].splitlines())!=len(read_under(parent,k).splitlines()):raise ValueError('Physical line drift')
    key='programs/pump-fees/src/donation.rs';marker=b'pub fn create(ctx:'
    if contents[key].split(marker,1)[1]!=read_under(parent,key).split(marker,1)[1]:raise ValueError('Subsequent donor source changed')
    if contents['programs/pump-fees/src/lib.rs'].count(b'include!("instructions/fee_sharing/crank_donation_fee_pda.rs")')!=1:
        raise ValueError('Expected actual root include')
    output.mkdir(parents=True)
    for name,data in sorted(contents.items()):
        p=output/name;p.parent.mkdir(parents=True,exist_ok=True)
        with p.open('xb')as f:f.write(data)
    if inventory(output)!=m['after']:raise ValueError('Written source mismatch')
    return {'exact_source_materialization_verified':True,'source_files':48,'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}

if __name__=='__main__':
    import argparse
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--parent',type=Path);p.add_argument('--materialize',type=Path);a=p.parse_args()
    if bool(a.parent)!=bool(a.materialize):p.error('--parent and --materialize must be supplied together')
    package=Path(__file__).resolve().parent
    if a.parent:r=materialize(package,a.parent,a.materialize)
    else:
        verify(package);r={'packet_integrity_verified':True,'exact_source_materialization_verified':False,'external_47_source_parent_required':True,'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}
    print(json.dumps(r,indent=2))
