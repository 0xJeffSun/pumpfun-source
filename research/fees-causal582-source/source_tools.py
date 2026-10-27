"""Self-contained exact source snapshot/patch verifier; no compiler, network or VM."""
if not __debug__:
    raise RuntimeError("Source verification requires ordinary Python, not -O")
from pathlib import Path, PurePosixPath
import hashlib,json,re,sys
sys.dont_write_bytecode=True
HUNK=re.compile(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@')
CHANGES={
 'programs/pump-fees/src/instructions/fee_sharing/crank_donation_fee_pda.rs',
 'programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs',
}
TOP={'README.md','manifest.json','source.patch','source-inputs.json','provenance.json','source_tools.py','test_source.py'}
BEFORE_MAP='dd5e7aa4694bf438b239090f43e78280a451b43cb5eeb719b7ee5d5d86341489'
AFTER_MAP='11a95bbed8d9e4de1226e74f010398f7c8acc559ec02a7806093ca9360100dd6'
METADATA='b9d1761cd2d9bd6562ccb57c61f49d398938c8ced40bb2d2caf3d47f0f74faea'
PROVENANCE='1363df41ce85c89a11947a87d294cfac15087cbc4773ff1847236211a2729f89'
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

def check_scope(before,after):
    if set(before)!=set(after) or len(before)!=48:
        raise ValueError('Both stages require the exact same 48 input paths')
    if {n for n in before if before[n]!=after[n]}!=CHANGES:
        raise ValueError('Only the two reviewed source files may change')
    for name in CHANGES:
        old,new=before[name],after[name]
        if b'unsafe' in old or b'unsafe' in new or len(old.splitlines())!=len(new.splitlines()):
            raise ValueError('Unsafe scope or physical line-count drift')
        changed=[i+1 for i,(a,b)in enumerate(zip(old.splitlines(),new.splitlines()))if a!=b]
        if '/crank_' in name:
            if changed!=[17] or b'let invoke_result: Result<()> = try {' not in new.splitlines()[16]:
                raise ValueError('Unexpected Crank region')
            if b'drop(a); drop(b); drop(c); invoke_result?;' not in new.splitlines()[16]:
                raise ValueError('Crank owner destruction order changed')
            if old.splitlines()[15]!=new.splitlines()[15] or old.splitlines()[29]!=new.splitlines()[29]:
                raise ValueError('Allocator/event source changed')
        else:
            if changed!=[199,204,213,214,215]:
                raise ValueError('Unexpected Donation source coordinates')
            lines=new.splitlines()
            if not lines[198].endswith(b'?; try {') or b'(config.mint, base_mint.key())'not in lines[203]:
                raise ValueError('Deserialize boundary or compared-key diagnostics changed')
            if b'if !(payer.key() == config.admin)'not in lines[212]:
                raise ValueError('Payer comparison operand order changed')
            if lines[214]!=b'        (config.admin, quote_mint) }' or b'drop(bytes)'in new:
                raise ValueError('Donation return place or Ref lifetime changed')

def stages(package):
    package=Path(package)
    all_files=inventory(package)
    metadata=read_under(package,'source-inputs.json')
    if sha(metadata)!=METADATA:raise ValueError('Source metadata changed')
    m=json.loads(metadata)
    if m['schema']!=1 or m['included_stage']!='after' or m['source_files_each']!=48 or m['unchanged_inputs']!=46:
        raise ValueError('Unexpected snapshot metadata')
    if canonical(m['before'])!=BEFORE_MAP or canonical(m['after'])!=AFTER_MAP:
        raise ValueError('Pinned complete source map mismatch')
    if m['before_map_sha256']!=BEFORE_MAP or m['after_map_sha256']!=AFTER_MAP:
        raise ValueError('Source-map identity declaration mismatch')
    if m['verification_scope']!={'source_materialization':True,'native_build':False,'runtime':False,'whole_binary_identity':False}:
        raise ValueError('Source verification cannot assert native/runtime/original identity')
    if set(m['changed_paths'])!=CHANGES or set(m['before'])!=set(m['after']):
        raise ValueError('Incorrect source-change paths')
    for mapping in (m['before'],m['after']):
        for name,digest in mapping.items():
            relative(name)
            if not re.fullmatch('[0-9a-f]{64}',digest):raise ValueError('Invalid source hash')
    allowed=TOP|{'source/'+n for n in m['after']}
    if set(all_files)!=allowed:raise ValueError('Unexpected packet membership')
    manifest=json.loads(read_under(package,'manifest.json'))
    if set(manifest)!=allowed-{'manifest.json'}:raise ValueError('Unexpected integrity membership')
    if {n:all_files[n]for n in manifest}!=manifest:raise ValueError('Packet integrity mismatch')
    after={n:read_under(package,'source/'+n)for n in m['after']}
    if {n:sha(b)for n,b in after.items()}!=m['after']:raise ValueError('Snapshot source mismatch')
    for data in after.values():
        data.decode('utf8')
        if b'\x00'in data:raise ValueError('Source snapshot must be UTF-8 text')
    patch=read_under(package,'source.patch')
    if sha(patch)!=m['patch_sha256']:raise ValueError('Source patch mismatch')
    hunks=parse_patch(patch.decode())
    if set(hunks)!=CHANGES:raise ValueError('Unexpected source patch paths')
    before=dict(after)
    for name in CHANGES:
        before[name]=apply_file(after[name],hunks[name],reverse=True)
        if apply_file(before[name],hunks[name])!=after[name]:raise ValueError('Patch does not round trip')
    if {n:sha(b)for n,b in before.items()}!=m['before']:raise ValueError('Reconstructed prerequisite mismatch')
    check_scope(before,after)
    provenance=read_under(package,'provenance.json')
    if sha(provenance)!=PROVENANCE:raise ValueError('Attribution/provenance changed')
    pr=json.loads(provenance);public=pr['public_extend_source_inputs']
    common=set(public)&set(m['before'])
    if len(public)!=46 or len(common)!=46 or len(set(m['before'])-set(public))!=2:
        raise ValueError('Public46/local48 prerequisite distinction changed')
    if sum(public[n]!=m['before'][n]for n in common)!=17:
        raise ValueError('Public/local source distinction drift')
    return m,before,after

def verify_public_provenance(package,root):
    provenance=json.loads(read_under(package,'provenance.json'))
    for record in provenance['public_source_resources']:
        data=read_under(root,record['path'])
        blob=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
        if blob!=record['git_blob_sha1'] or sha(data)!=record['sha256'] or len(data)!=record['bytes']:
            raise ValueError('Public source/text blob mismatch')
    return len(provenance['public_source_resources'])

def materialize(package,output,stage='after'):
    if stage not in ('before','after'):raise ValueError('Unknown source stage')
    m,before,after=stages(package)
    package,output=Path(package),Path(output)
    if output.exists() or output.is_symlink():raise ValueError('Output must not exist')
    if any(p.is_symlink()for p in output.absolute().parents):raise ValueError('Symlink output ancestor')
    if output.resolve().is_relative_to(package.resolve()):raise ValueError('Output must be outside packet')
    contents=after if stage=='after'else before
    output.mkdir(parents=True)
    for name,data in sorted(contents.items()):
        path=output/name;path.parent.mkdir(parents=True,exist_ok=True)
        with path.open('xb')as out:out.write(data)
    if inventory(output)!=m[stage]:raise ValueError('Written source differs from exact stage map')
    return {'source_files':48,'stage':stage,'exact_source_materialization_verified':True,
            'native_build_verified':False,'runtime_verified':False,'whole_binary_identity_verified':False}

if __name__=='__main__':
    import argparse
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--materialize',type=Path)
    parser.add_argument('--stage',choices=['before','after'],default='after')
    parser.add_argument('--public-root',type=Path)
    args=parser.parse_args();package=Path(__file__).resolve().parent
    stages(package)
    result={'source_snapshot_verified':True,'both_source_stages_reconstructible':True,
            'external_source_parent_required':False,'native_build_verified':False,
            'runtime_verified':False,'whole_binary_identity_verified':False}
    if args.public_root:result['public_source_blobs_verified']=verify_public_provenance(package,args.public_root)
    if args.materialize:result.update(materialize(package,args.materialize,args.stage))
    print(json.dumps(result,indent=2))

