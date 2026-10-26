#!/usr/bin/env python3
"""UNEXECUTED one-dispatch Linux Source15 measurement controller. No VM/promotion."""
from pathlib import Path, PurePosixPath
import argparse, base64, datetime, gzip, hashlib, http.client, json, os, platform, re, shlex
import shutil, signal, stat, subprocess, sys, tarfile, traceback, urllib.request, urllib.error

P = Path(__file__).resolve().parent
REVIEWED = '282c29aaf0be4136f8d62b17012b7510cca929855d224ea02a94c77598e19192'
SOURCE_COMMIT = '576889cbfb2e28d5b1c2f47f1488c0caa80b88b7'
INSTALL = 'repro/donation-relay/linux15-v148-one-shot-controller'
WORKFLOW = '.github/workflows/measure-relay13-linux-v148.yml'
ORIGINAL = 'evidence/dependencies/donation_relay/deployed.so'
ORIGINAL_SHA = '367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
SELECTED = 'repro/donation-relay/source-build-15-owned-arithmetic/runtime-plan/static-proof/source'
TARGET = 'sbf-solana-solana'
ANSI = re.compile(rb'\x1b\[[0-?]*[ -/]*[@-~]')
ERROR = re.compile(r'(?im)(?:\berror(?:\[E\d+\])?\s*:|\bLLVM\s+ERROR\s*:|\bbackend\s+Error\s*:|\bfatal\s+error\b|^\s*Error\b|\bstack\s+(?:offset|frame|limit)[^\n]*(?:exceed|overfl|too (?:large|big)|larger|limit|maximum)|\bexceed[^\n]*\bstack\b)')

def check(ok, why):
    if not ok:
        raise ValueError(why)

def now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()

def sha(data):
    return hashlib.sha256(data).hexdigest()

def digest(path):
    h = hashlib.sha256()
    with Path(path).open('rb') as f:
        for b in iter(lambda: f.read(1024 * 1024), b''):
            h.update(b)
    return h.hexdigest()

def load(path):
    return json.loads(Path(path).read_bytes())

def write(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, sort_keys=True, indent=2) + '\n')

def record_file(path):
    path = Path(path)
    s = path.lstat()
    r = dict(mode=stat.S_IMODE(s.st_mode))
    if path.is_symlink():
        r.update(type='symlink', target=os.readlink(path))
    elif path.is_file():
        r.update(type='file', bytes=s.st_size, sha256=digest(path))
    elif path.is_dir():
        r.update(type='directory')
    else:
        raise ValueError('unsupported filesystem type: ' + str(path))
    return r

def tree(path):
    path = Path(path)
    if not path.exists():
        return None
    return {p.relative_to(path).as_posix(): record_file(p) for p in sorted(path.rglob('*'))}

def manifest(root, expected):
    root = Path(root)
    check(digest(root / 'manifest.json') == expected, 'known manifest seal')
    check((root / 'manifest.sha256').read_text().split()[0] == expected, 'manifest sidecar')
    m = load(root / 'manifest.json')['files']
    actual = {p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file()
              and p.relative_to(root).as_posix() not in ['manifest.json', 'manifest.sha256']}
    check(set(m) == actual, 'complete sealed membership')
    for n, r in m.items():
        p = root / n
        check(not p.is_symlink() and p.is_file(), 'sealed regular file ' + n)
        check(p.stat().st_size == r['bytes'] and digest(p) == r['sha256'], 'sealed member ' + n)
    return m

def input_map(root):
    root = Path(root)
    members = [p for p in root.rglob('*') if p.is_file() and
               (p.suffix == '.rs' or p.name in ['Cargo.toml', 'Cargo.lock'])]
    check(not any(p.is_symlink() for p in members), 'source symlink')
    return {p.relative_to(root).as_posix(): digest(p) for p in sorted(members)}

def source_guard(repo, frozen):
    maps = {}
    for label, n in [('canonical', 'programs/donation-relay'), ('selected', SELECTED)]:
        maps[label] = input_map(repo / n)
        check(maps[label] == frozen, 'exact Source15 ' + label)
    return dict(hashes=maps, canonical_modes={n: record_file(repo / 'programs/donation-relay' / n)
                                           for n in frozen},
                selected_modes={n: record_file(repo / SELECTED / n) for n in frozen})

def inherited_home_environment(extra):
    check('HOME' in os.environ and Path(os.environ['HOME']).is_absolute(), 'existing absolute HOME required')
    check('HOME' not in extra and 'home' not in extra and 'CODEX_HOME' not in extra, 'system home variables cannot be overwritten')
    inherited = {k: v for k, v in os.environ.items() if k == 'HOME'}
    inherited.update(extra)
    check(inherited['HOME'] == os.environ['HOME'], 'HOME inheritance exact')
    return inherited

def reject_curl_configuration_environment(environment):
    proxies = {'http_proxy', 'https_proxy', 'all_proxy', 'no_proxy', 'HTTP_PROXY', 'HTTPS_PROXY',
               'ALL_PROXY', 'NO_PROXY', 'SSL_CERT_FILE', 'SSL_CERT_DIR'}
    blocked = sorted(k for k in environment if k.startswith('CURL_') or k in proxies)
    check(not blocked, 'unreviewed curl/configuration environment: ' + repr(blocked))

def canonical_regular(path, boundary):
    path, boundary = Path(path).absolute(), Path(boundary).absolute()
    check('..' not in path.parts and path.is_relative_to(boundary), 'noncanonical or escaping path')
    # Validate every ancestor before resolving or opening any member payload.
    for ancestor in reversed(path.parents):
        mode = ancestor.lstat().st_mode
        check(not stat.S_ISLNK(mode) and stat.S_ISDIR(mode), 'linked/special ancestor ' + str(ancestor))
    mode = path.lstat().st_mode
    check(not stat.S_ISLNK(mode) and stat.S_ISREG(mode), 'non-regular member ' + str(path))
    resolved = path.resolve(strict=True)
    check(resolved.is_relative_to(boundary.resolve(strict=True)), 'canonical member escape')
    return resolved

def regular_digest(path, boundary):
    path = canonical_regular(path, boundary)
    fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW)
    h = hashlib.sha256()
    with os.fdopen(fd, 'rb') as f:
        check(stat.S_ISREG(os.fstat(f.fileno()).st_mode), 'opened member is regular')
        for b in iter(lambda: f.read(1024 * 1024), b''):
            h.update(b)
    return h.hexdigest()

def reject_registry_links(registry, boundary):
    registry, boundary = Path(registry).absolute(), Path(boundary).absolute()
    check('..' not in registry.parts and registry.is_relative_to(boundary), 'registry root containment')
    for ancestor in list(reversed(registry.parents)) + [registry]:
        mode = ancestor.lstat().st_mode
        check(not stat.S_ISLNK(mode) and stat.S_ISDIR(mode), 'linked/special registry container ' + str(ancestor))
    for directory, dirs, files in os.walk(registry, followlinks=False):
        for name in dirs + files:
            path = Path(directory) / name
            mode = path.lstat().st_mode
            check(not stat.S_ISLNK(mode) and (stat.S_ISDIR(mode) or stat.S_ISREG(mode)),
                  'linked/special registry member ' + str(path))
    return True

def canonical_registry_source(source, registry, approved):
    source = canonical_regular(source, registry)
    namespace, stem, *parts = source.relative_to(Path(registry).resolve()).parts
    check(parts, 'registry member missing')
    rows = [r for r in approved if r['source_namespace'] == namespace and r['name'] + '-' + r['version'] == stem]
    check(len(rows) == 1, 'unapproved canonical namespace/package')
    member = '/'.join(parts)
    check(member in rows[0]['files'], 'unapproved exact registry member')
    actual = regular_digest(source, registry)
    check(actual == rows[0]['files'][member], 'approved registry member SHA')
    return dict(kind='authenticated_registry_member', namespace=namespace, package=stem,
                member=member, sha256=actual, canonical_path=str(source))

def stream_http_body(response, path, receipt):
    receipt['body_complete'] = False
    reader = getattr(response, 'read1', response.read)
    with Path(path).open('xb') as f:
        while True:
            try:
                block = reader(64 * 1024)
            except http.client.IncompleteRead as e:
                if e.partial:
                    f.write(e.partial)
                    f.flush()
                raise
            if not block:
                break
            f.write(block)
            f.flush()
    length = response.headers.get('Content-Length')
    if length is not None:
        check(Path(path).stat().st_size == int(length), 'incomplete metadata Content-Length')
    receipt['body_complete'] = True

def git_local_config_guard(repo):
    repo = Path(repo).absolute()
    gitdir = repo / '.git'
    mode = gitdir.lstat().st_mode
    check(not stat.S_ISLNK(mode) and stat.S_ISDIR(mode), 'Gitdir must be a real checkout directory')
    for rel in ['commondir', 'config.worktree', 'info/attributes', 'objects/info/alternates']:
        path = gitdir / rel
        check(not path.is_symlink() and not path.exists(), 'unreviewed Git indirection/local policy: ' + rel)
    config = gitdir / 'config'
    config_sha = regular_digest(config, repo)
    raw = config.read_bytes()
    try:
        text = raw.decode('utf-8')
    except UnicodeDecodeError:
        raise ValueError('non-UTF8 local Git config; SHA256=' + config_sha) from None
    # Deliberately narrow data-only syntax for the two actions/checkout repositories.
    # Unknown/executable settings and includes fail closed; never print raw values.
    allowed = {
        'core': {'repositoryformatversion', 'filemode', 'bare', 'logallrefupdates', 'ignorecase',
                 'precomposeunicode', 'symlinks', 'protecthfs', 'protectntfs', 'quotepath', 'autocrlf'},
        'remote': {'url', 'fetch', 'tagopt'}, 'branch': {'remote', 'merge'}, 'gc': {'auto'},
        'http': set(),  # actions/checkout may retain empty URL sections; all actual HTTP keys reject
    }
    section = None
    keys = []
    for line in text.splitlines():
        value = line.strip()
        if not value or value.startswith(('#', ';')):
            continue
        check(not value.endswith('\\'), 'continued Git config disallowed; SHA256=' + config_sha)
        header = re.fullmatch(r'\[([A-Za-z][A-Za-z0-9.-]*)(?:\s+"([^"\\]+)")?\]', value)
        if header:
            section = header.group(1).lower()
            check(section in allowed, 'unapproved Git config section ' + section + '; SHA256=' + config_sha)
            if section in ['remote', 'branch']:
                check(header.group(2) is not None, 'Git config subsection policy; SHA256=' + config_sha)
            elif section != 'http':
                check(header.group(2) is None, 'Git config subsection policy; SHA256=' + config_sha)
            if section == 'remote':
                check(header.group(2) == 'origin', 'unexpected remote subsection; SHA256=' + config_sha)
            continue
        match = re.fullmatch(r'([A-Za-z][A-Za-z0-9-]*)\s*=\s*(.*)', value)
        check(match is not None and section is not None, 'unrecognized Git config syntax; SHA256=' + config_sha)
        key, setting = match.group(1).lower(), match.group(2).strip()
        check(key in allowed[section], 'unapproved Git config key ' + section + '.' + key + '; SHA256=' + config_sha)
        if section == 'core':
            check(setting in (['0'] if key == 'repositoryformatversion' else
                              ['false'] if key == 'bare' else ['true', 'false', 'input'] if key == 'autocrlf' else
                              ['true', 'false']), 'nonliteral safe core setting; SHA256=' + config_sha)
        if section == 'gc':
            check(setting == '0', 'automatic Git GC setting disallowed; SHA256=' + config_sha)
        keys.append(section + '.' + key)
    exclude = gitdir / 'info/exclude'
    exclude_record = None
    if exclude.is_symlink() or exclude.exists():
        exclude_sha = regular_digest(exclude, repo)
        try:
            lines = exclude.read_bytes().decode('utf-8').splitlines()
        except UnicodeDecodeError:
            raise ValueError('non-UTF8 Git exclude; SHA256=' + exclude_sha) from None
        check(all(not x.strip() or x.lstrip().startswith('#') for x in lines),
              'non-comment local Git exclusion; SHA256=' + exclude_sha)
        exclude_record = dict(sha256=exclude_sha, comments_only=True)
    return dict(config_sha256=config_sha, config_bytes=len(raw), allowed_key_names=sorted(keys),
                raw_config_values_published=False, local_exclude=exclude_record,
                gitdir_indirection=False, includes_filters_or_executable_helpers=False)

def git_metadata_command(repo, operation, base_environment):
    check(operation in ['head', 'status'], 'fixed Git metadata operation')
    check(base_environment.get('HOME') == os.environ.get('HOME'), 'Git HOME must remain inherited')
    check(not any(k.startswith('GIT_') and k != 'GIT_OPTIONAL_LOCKS' for k in base_environment),
          'injected Git environment not permitted')
    proof = git_local_config_guard(repo)
    env = inherited_home_environment({k: v for k, v in base_environment.items()
                                      if k in ['PATH', 'LANG', 'LC_ALL']})
    env.update(GIT_OPTIONAL_LOCKS='0', GIT_CONFIG_NOSYSTEM='1', GIT_CONFIG_SYSTEM='/dev/null',
               GIT_CONFIG_GLOBAL='/dev/null', GIT_ATTR_NOSYSTEM='1', GIT_TERMINAL_PROMPT='0',
               GIT_NO_REPLACE_OBJECTS='1')
    argv = ['/usr/bin/git', '--no-pager', '--no-optional-locks',
            '-c', 'core.fsmonitor=false', '-c', 'core.hooksPath=/dev/null',
            '-c', 'core.attributesFile=/dev/null', '-c', 'core.excludesFile=/dev/null',
            '-c', 'core.untrackedCache=false',
            '-c', 'submodule.recurse=false', '-c', 'gc.auto=0',
            '-c', 'maintenance.auto=false', '-c', 'safe.directory=' + str(repo), '-C', str(repo)]
    argv += ['rev-parse', '--verify', 'HEAD'] if operation == 'head' else [
        'status', '--porcelain', '--untracked-files=all', '--ignore-submodules=all']
    return argv, env, proof

def redacted_environment():
    # Complete key membership, credential values excluded from evidence.
    safe = {'PATH', 'LANG', 'LC_ALL', 'HOME', 'TMPDIR', 'RUNNER_TEMP', 'RUNNER_OS',
            'RUNNER_ARCH', 'RUNNER_NAME', 'ImageOS', 'ImageVersion', 'GITHUB_REPOSITORY',
            'GITHUB_REPOSITORY_ID', 'GITHUB_ACTOR', 'GITHUB_ACTOR_ID', 'GITHUB_EVENT_NAME',
            'GITHUB_REF', 'GITHUB_SHA', 'GITHUB_RUN_ID', 'GITHUB_RUN_ATTEMPT',
            'GITHUB_WORKFLOW_REF', 'GITHUB_WORKFLOW_SHA', 'GITHUB_WORKSPACE', 'CI'}
    return {k: v if k in safe else '<REDACTED>' for k, v in sorted(os.environ.items())}

def reject_overrides(source_repo, fresh):
    blocked = [k for k in os.environ if k in ['RUSTFLAGS', 'CARGO_ENCODED_RUSTFLAGS',
               'RUSTC_WRAPPER', 'RUSTC_WORKSPACE_WRAPPER', 'RUSTUP_TOOLCHAIN'] or
               k.startswith(('CARGO_PROFILE_', 'CARGO_TARGET_', 'CARGO_BUILD_'))]
    check(not blocked, 'inherited build overrides: ' + repr(blocked))
    check('HOME' in os.environ, 'HOME must be inherited')
    reject_curl_configuration_environment(os.environ)
    roots = set([Path(os.environ['HOME']), source_repo, source_repo / 'programs/donation-relay', source_repo / SELECTED, fresh, fresh / 'source', fresh / 'neutral'])
    for q in [source_repo, fresh]:
        roots.update(q.parents)
    found = []
    for r in roots:
        for n in ['.cargo/config', '.cargo/config.toml', 'rust-toolchain', 'rust-toolchain.toml']:
            if (r / n).is_symlink() or (r / n).exists() or (r / '.cargo').is_symlink():
                found.append(str(r / n))
    check(not found, 'ancestor/global toolchain or Cargo config: ' + repr(found))

class Attempt:
    def __init__(self, output):
        self.output = output
        self.pub = output / 'publication'
        self.pub.mkdir(parents=True)
        with (self.pub / 'attempt.started').open('xb') as f:
            f.write((now() + '\n').encode())
        self.exits = {}
        self.counts = dict(fetches=0, program_compiles=0, strips=0, adapter_runs=0,
                           workflow_dispatches=0, new_target_executions=0)
        self.gates = []

    def gate(self, name, fn):
        r = dict(name=name, start=now(), returncode=None)
        try:
            value = fn()
            r.update(returncode=0, value=value)
            return value
        except BaseException:
            r.update(returncode=1, traceback=traceback.format_exc())
            raise
        finally:
            r['end'] = now()
            self.gates.append(r)
            write(self.pub / 'gates' / (name + '.json'), r)

    def run(self, name, argv, cwd, env):
        dest = self.pub / 'commands'
        dest.mkdir(exist_ok=True)
        out, err = dest / (name + '.stdout'), dest / (name + '.stderr')
        r = dict(argv=[str(x) for x in argv], cwd=str(cwd), environment=env,
                 start=now(), process_started=False, returncode=None)
        child = None
        try:
            with out.open('xb') as o, err.open('xb') as e:
                child = subprocess.Popen(r['argv'], cwd=cwd, env=env, stdout=o, stderr=e, start_new_session=True)
                r['process_started'] = True
                r['returncode'] = child.wait()
        except BaseException:
            r['exception'] = traceback.format_exc()
            if child is not None:
                try:
                    if child.poll() is None:
                        os.killpg(child.pid, signal.SIGTERM)
                        try:
                            child.wait(timeout=30)
                        except subprocess.TimeoutExpired:
                            os.killpg(child.pid, signal.SIGKILL)
                            child.wait()
                    r['returncode'] = child.returncode
                except BaseException:
                    r['termination_exception'] = traceback.format_exc()
        finally:
            r['end'] = now()
            for label, path in [('stdout', out), ('stderr', err)]:
                if not path.exists():
                    path.write_bytes(b'')
                r[label] = dict(path=path.relative_to(self.pub).as_posix(),
                                bytes=path.stat().st_size, sha256=digest(path))
            r['diagnostics'] = diagnostics(out.read_bytes(), err.read_bytes())
            self.exits[name] = r['returncode']
            write(dest / (name + '.json'), r)
        check(r['returncode'] == 0 and 'exception' not in r, 'process ' + name + ' exit ' + str(r['returncode']))
        check(r['diagnostics']['error_diagnostics'] == 0, 'process diagnostics ' + name)
        return out.read_bytes(), err.read_bytes()

    def finish(self, result):
        result.update(counts=self.counts, counts_semantics='fetch/build/strip/adapter attempts; individual process_started and numeric exits are authoritative', process_exits=self.exits, end=now(),
                      selected=False, execution_suitable=False, runtime_cases=0,
                      canonical_changes=False, original_new_decoded_functions=0,
                      original_new_data_collections=0)
        write(self.pub / 'result.json', result)
        m = {p.relative_to(self.pub).as_posix(): dict(bytes=p.stat().st_size, sha256=digest(p))
             for p in sorted(self.pub.rglob('*')) if p.is_file() and
             p.relative_to(self.pub).as_posix() not in ['manifest.json', 'manifest.sha256']}
        write(self.pub / 'manifest.json', dict(files=m, status=result['status']))
        (self.pub / 'manifest.sha256').write_text(digest(self.pub / 'manifest.json') + '\n')
        print(json.dumps(dict(status=result['status'], returncode=result['returncode'],
                             manifest_sha256=digest(self.pub / 'manifest.json'), counts=self.counts)))

def authority_guard(args, auth):
    check(args.authority_sha256 == digest(args.authority), 'authority bytes')
    check(auth['schema'] == 'RELAY15_ONE_DISPATCH_NONCE_AUTHORITY_V1', 'authority schema')
    fields = {'schema', 'root_reviewed_execution_authorized', 'candidate_ledger_adapter_reviewed', 'measurement_nonce', 'source_commit', 'control_commit', 'controller_manifest_sha256', 'controller_sha256', 'workflow_sha256', 'workflow_path', 'workflow_ref', 'repository', 'repository_id', 'actor', 'actor_id', 'ref', 'event_name', 'adapter_packet_sha256', 'original_numeric_only_admission_sha256', 'limits'}
    check(set(auth) == fields, 'exact authority field membership')
    check(os.environ.get('GITHUB_ACTIONS') == 'true' and os.environ.get('GITHUB_SERVER_URL') == 'https://github.com' and os.environ.get('GITHUB_API_URL') == 'https://api.github.com', 'GitHub server context')
    check(auth['root_reviewed_execution_authorized'] is True and
          auth['candidate_ledger_adapter_reviewed'] is True, 'explicit root execution authority')
    check(auth['measurement_nonce'] == args.measurement_nonce and
          re.fullmatch(r'[0-9a-f]{64}', args.measurement_nonce), 'root nonce format/equality')
    check(auth['source_commit'] == args.source_commit == SOURCE_COMMIT, 'frozen source commit')
    check(P == (args.control_repo / INSTALL).resolve(), 'installed reviewed controller root')
    check(args.control_repo != args.source_repo and not args.output.is_relative_to(args.control_repo) and not args.output.is_relative_to(args.source_repo), 'separate checkouts and output')
    check(re.fullmatch('[0-9a-f]{40}', auth['control_commit']) is not None, 'exact controller commit')
    check(auth['controller_manifest_sha256'] == args.controller_manifest_sha256,
          'controller seal authority')
    check(auth['adapter_packet_sha256'] == REVIEWED and
          auth['original_numeric_only_admission_sha256'] == digest(P / 'reviewed282c/ROOT-ADMISSION.json'),
          'original numeric admission / adapter authority')
    check(auth['limits'] == dict(dispatches=1, fetches=1, program_compiles=1, strips=1,
                                adapter_runs=1, runtime_executions=0, reruns=0), 'one-shot limits')
    required = {'GITHUB_REPOSITORY': 'repository', 'GITHUB_REPOSITORY_ID': 'repository_id',
                'GITHUB_ACTOR': 'actor', 'GITHUB_ACTOR_ID': 'actor_id', 'GITHUB_REF': 'ref',
                'GITHUB_SHA': 'control_commit', 'GITHUB_WORKFLOW_SHA': 'control_commit',
                'GITHUB_WORKFLOW_REF': 'workflow_ref'}
    for key, field in required.items():
        check(isinstance(auth[field], str) and auth[field] and
              os.environ.get(key) == auth[field], 'GitHub context ' + key)
    check(auth['event_name'] == os.environ.get('GITHUB_EVENT_NAME') == 'workflow_dispatch', 'manual event')
    check(auth['workflow_path'] == WORKFLOW, 'reused workflow filename')
    check(auth['workflow_ref'] == auth['repository'] + '/' + WORKFLOW + '@' + auth['ref'], 'workflow ref')
    check(os.environ.get('GITHUB_RUN_ATTEMPT') == '1', 'no rerun')
    check(os.environ.get('GITHUB_TRIGGERING_ACTOR') == auth['actor'], 'initial dispatch actor')
    run_id = os.environ.get('GITHUB_RUN_ID', '')
    check(re.fullmatch(r'[1-9][0-9]*', run_id) is not None, 'actual server positive run ID')
    # The authority deliberately has no invented future run ID. Root later verifies the observed binding.
    check('run_id' not in auth, 'future run ID must not be supplied')
    event_path = Path(os.environ['GITHUB_EVENT_PATH'])
    event = load(event_path)
    check(event['repository']['full_name'] == auth['repository'] and str(event['repository']['id']) == auth['repository_id'], 'server event repository')
    check(event['sender']['login'] == auth['actor'] and str(event['sender']['id']) == auth['actor_id'], 'server event actor')
    for field, expected in [('source_commit', args.source_commit), ('measurement_nonce', args.measurement_nonce), ('authority_sha256', args.authority_sha256), ('controller_manifest_sha256', args.controller_manifest_sha256)]:
        check(event['inputs'][field] == expected, 'server input ' + field)
    check(base64.b64decode(event['inputs']['authority_base64'], validate=True) == args.authority.read_bytes(), 'server exact authority input')
    check(auth['controller_sha256'] == digest(P / 'controller.py'), 'exact controller bytes')
    check(auth['workflow_sha256'] == digest(args.control_repo / WORKFLOW) == digest(P / 'workflow.proposed.yml'),
          'exact reviewed workflow bytes')
    check(os.environ.get('RUNNER_OS') == 'Linux' and os.environ.get('RUNNER_ARCH') == 'X64', 'runner context')
    osrel = Path('/etc/os-release').read_text()
    check('ID=ubuntu\n' in osrel and 'VERSION_ID="24.04"' in osrel, 'Ubuntu24.04')
    check(platform.system() == 'Linux' and platform.machine() == 'x86_64', 'native x86_64')
    return dict(schema='RELAY15_OBSERVED_RUN_BINDING_V1', authority_sha256=args.authority_sha256,
                measurement_nonce=args.measurement_nonce, github_run_id=int(run_id), github_run_attempt=1,
                context={key: os.environ[key] for key in required}, event_name='workflow_dispatch',
                observed_before_acquisition=True, time=now(), event_payload_sha256=digest(event_path),
                root_independent_server_confirmation_required=True,
                cross_runner_nonce_uniqueness='root single-dispatch authority; local marker does not prove global uniqueness')

def safe_extract(archive, destination):
    destination.mkdir()
    with tarfile.open(archive, 'r:bz2') as t:
        members = t.getmembers()
        names = set()
        for m in members:
            n = PurePosixPath(m.name)
            check(not n.is_absolute() and '..' not in n.parts and str(n) not in ['', '.'], 'unsafe tar name')
            check(str(n) not in names, 'duplicate tar member')
            names.add(str(n))
            check(m.isfile() or m.isdir() or m.issym() or m.islnk(), 'tar device/special type')
            if m.issym() or m.islnk():
                target = n.parent / m.linkname if m.issym() else PurePosixPath(m.linkname)
                check(not target.is_absolute(), 'absolute tar link')
                depth = 0
                for x in target.parts:
                    depth += -1 if x == '..' else (0 if x == '.' else 1)
                    check(depth >= 0, 'escaping tar link')
        # No extracted parent may be a link; resolve paths after each prior extraction.
        for m in members:
            dest = destination / m.name
            check(dest.resolve().is_relative_to(destination.resolve()), 'tar resolved destination')
            check(not any(x.is_symlink() for x in dest.parents if x != destination.parent), 'tar link parent')
            t.extract(m, destination, set_attrs=True, numeric_owner=False, filter='data')
    return len(members)

def acquire(a, label, pin, expected_sha, root):
    dest = a.pub / 'acquisition'
    dest.mkdir(exist_ok=True)
    url = 'https://api.github.com/repos/anza-xyz/platform-tools/releases/tags/' + pin['tag']
    response = dict(url=url, start=now(), status=None, exception=None, body_complete=False)
    body_path = dest / (label + '-metadata.body')
    try:
        try:
            reply = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'frozen-relay15-controller'}), timeout=60)
        except urllib.error.HTTPError as error:
            reply = error
            response['HTTPError'] = traceback.format_exc()
        with reply as r:
            response.update(status=r.status, headers=list(r.headers.items()), final_url=r.url)
            stream_http_body(r, body_path, response)
        check(response['status'] == 200, 'metadata HTTP status')
    except BaseException:
        response['exception'] = traceback.format_exc()
        raise
    finally:
        if not body_path.exists():
            body_path.write_bytes(b'')
        response.update(end=now(), body_sha256=digest(body_path), body_bytes=body_path.stat().st_size)
        write(dest / (label + '-metadata.json'), response)
    check(response['body_complete'] is True, 'complete metadata body required before parsing')
    body = body_path.read_bytes()
    check(response['status'] == 200, 'metadata HTTP status')
    release = json.loads(body)
    check(release['id'] == pin['release_id'] and release['tag_name'] == pin['tag'], 'official release')
    matches = [x for x in release['assets'] if x['id'] == pin['id']]
    check(len(matches) == 1, 'unique exact release asset')
    asset = matches[0]
    download = 'https://github.com/anza-xyz/platform-tools/releases/download/' + pin['tag'] + '/' + pin['name']
    for k in ['name', 'size', 'digest']:
        check(asset.get(k) == pin.get(k), 'asset metadata ' + k)
    check(asset['browser_download_url'] == download, 'exact official download URL')
    archive = root / (label + '.tar.bz2')
    reject_curl_configuration_environment(os.environ)
    env = inherited_home_environment({'PATH': '/usr/bin:/bin', 'LANG': 'C.UTF-8', 'LC_ALL': 'C.UTF-8'})
    try:
        a.run(label + '-download', ['/usr/bin/curl', '-q', '--fail', '--location', '--retry', '0',
              '--dump-header', str(dest / (label + '-download.headers')), '--output', str(archive), download], root, env)
    finally:
        observed = dict(expected_sha256=expected_sha, expected_bytes=pin['size'], exists=archive.exists())
        if archive.exists():
            observed.update(bytes=archive.stat().st_size, sha256=digest(archive))
            observed['authenticated'] = observed['bytes'] == pin['size'] and observed['sha256'] == expected_sha
            if not observed['authenticated']:
                parts = []
                with archive.open('rb') as f:
                    for i in range(1000000):
                        chunk = f.read(64 * 1024 * 1024)
                        if not chunk:
                            break
                        part = dest / (label + '-failed-archive.part%04d' % i)
                        part.write_bytes(chunk)
                        parts.append(dict(path=part.relative_to(a.pub).as_posix(), bytes=len(chunk), sha256=sha(chunk)))
                observed['failed_archive_lossless_parts'] = parts
        write(dest / (label + '-archive-observed.json'), observed)
    check(observed.get('authenticated') is True, 'archive full authentication')
    count = safe_extract(archive, root / (label + '-tools'))
    write(dest / (label + '-archive.json'), dict(bytes=archive.stat().st_size, sha256=expected_sha,
          publisher_digest_verified=pin.get('digest') is not None, extracted_members=count,
          archive_omitted_from_upload=True, complete_tree_fingerprint_retained=True))

def tool_guard(root, parent):
    compiler = root / 'compiler-tools'
    strip = root / 'strip-tools'
    tools = load(parent / 'seed/retained/Linux13/download/extracted/compiler-tools.json')
    check(len(tools) == 61, 'compiler61')
    for name, r in tools.items():
        p = compiler / name
        check(p.is_file() and p.stat().st_size == r['bytes'] and digest(p) == r['sha256'], 'compiler member ' + name)
        check(p.resolve() == (compiler / r['archive_member']).resolve(), 'compiler archive member mapping ' + name)
    r = load(parent / 'seed/retained/Linux13/download/extracted/strip-tools.json')
    p = strip / r['path']
    check(p.is_file() and p.stat().st_size == r['bytes'] and digest(p) == r['sha256'], 'strip binary')
    cap = load(parent / 'seed/retained/Linux13/download/extracted/capability.json')
    lib = compiler / 'rust/lib/rustlib/sbf-solana-solana/lib'
    actual = {p.name: digest(p) for p in lib.iterdir() if p.is_file()}
    check(len(actual) == 25 and actual == cap['legacy_sysroot_files'] and len(list(lib.iterdir())) == 25,
          'complete legacy25 membership')
    return dict(compiler_tree=tree(compiler), strip_tree=tree(strip), legacy25=actual)

def registry_guard(root, parent, source):
    import tomllib
    approved = load(parent / 'seed/retained/registry232-approved-map.json')
    check(len(approved) == 232 and sum(len(r['files']) for r in approved) == 7607, 'pinned registry counts')
    lock = tomllib.loads((source / 'Cargo.lock').read_text())['package']
    lockmap = {(r['name'], r['version']): r['checksum'] for r in lock if r.get('source', '').startswith('registry+')}
    check(lockmap == {(r['name'], r['version']): r['archive_sha256'] for r in approved}, 'exact locked232')
    check(all(r.get('source') in [None, 'registry+https://github.com/rust-lang/crates.io-index'] for r in lock), 'lock source')
    cargo = root / 'cargo-home'
    reject_registry_links(cargo / 'registry', root)
    cache, src = cargo / 'registry/cache', cargo / 'registry/src'
    namespaces = {r['source_namespace'] for r in approved}
    check(len(namespaces) == 1, 'single approved namespace')
    ns = next(iter(namespaces))
    check({p.name for p in cache.iterdir()} == {ns} and {p.name for p in src.iterdir()} == {ns}, 'registry namespace')
    check({p.name for p in (cache / ns).iterdir()} == {r['name'] + '-' + r['version'] + '.crate' for r in approved}, 'archive complete membership')
    check({p.name for p in (src / ns).iterdir()} == {r['name'] + '-' + r['version'] for r in approved}, 'source complete membership')
    rows = []
    for r in approved:
        stem = r['name'] + '-' + r['version']
        archive, extracted = cache / ns / (stem + '.crate'), src / ns / stem
        check(regular_digest(archive, cargo / 'registry') == r['archive_sha256'], 'crate checksum ' + stem)
        expected = dict(r['files'], **r['cargo_generated_markers'])
        actual = {p.relative_to(extracted).as_posix(): regular_digest(p, cargo / 'registry') for p in extracted.rglob('*') if stat.S_ISREG(p.lstat().st_mode)}
        check(actual == expected, 'exact source members/markers ' + stem)
        seen = {}
        with tarfile.open(archive, 'r:gz') as t:
            for member in t.getmembers():
                n = PurePosixPath(member.name)
                check(not n.is_absolute() and '..' not in n.parts and n.parts[0] == stem, 'crate archive path')
                check(member.isdir() or member.isfile(), 'crate special entry')
                if member.isfile():
                    rel = PurePosixPath(*n.parts[1:]).as_posix()
                    check(rel not in seen, 'duplicate crate member')
                    seen[rel] = sha(t.extractfile(member).read())
        check(seen == r['files'], 'archive/extracted complete equality ' + stem)
        rows.append(dict(name=r['name'], version=r['version'], archive_sha256=r['archive_sha256'], source_members=len(seen)))
    return dict(packages=rows, archives=232, source_members=7607, full_tree=tree(cargo / 'registry'))

def diagnostics(stdout, stderr):
    rows = []
    for name, raw in [('stdout', stdout), ('stderr', stderr)]:
        clean = ANSI.sub(b'', raw).decode('utf-8', 'replace')
        for i, line in enumerate(clean.splitlines()):
            if ERROR.search(line):
                rows.append(dict(stream=name, line=i + 1, text=line))
    return dict(matches=rows, error_diagnostics=len(rows), both_complete_streams_checked=True,
                raw_streams_authoritative=True)

def verbose_units(stdout, stderr, root, approved):
    text = ANSI.sub(b'', stdout + b'\n' + stderr).decode('utf-8', 'strict')
    units, root_commands = [], []
    compiler = str(root / 'compiler-tools/rust/bin/rustc')
    registry = root / 'cargo-home/registry/src'
    allowed = {r['name'] + '-' + r['version'] for r in approved}
    for line in text.splitlines():
        m = re.match(r'^\s*Running `(.+)`\s*$', line)
        if not m:
            continue
        words = shlex.split(m[1])
        assignments = {}
        while words and re.fullmatch(r'[A-Za-z_][A-Za-z_0-9]*=.*', words[0], re.S):
            k, v = words.pop(0).split('=', 1)
            assignments[k] = v
        check(words, 'empty Running command')
        exe = Path(words[0])
        check(exe.is_absolute(), 'invocation executable absolute')
        if str(exe) == compiler:
            kind = 'rustc'
            check('--crate-name' in words, 'rustc crate name')
            crate = words[words.index('--crate-name') + 1]
            options = [words[i + 1] for i, x in enumerate(words[:-1]) if x == '-C']
            check(not any(x.startswith(('target-cpu', 'target-feature', 'lto')) for x in options), 'unexpected unit codegen override')
            check(not any(x.startswith('--remap-path-prefix') for x in words), 'unexpected unit path remap')
            if '--target' in words:
                check(words[words.index('--target') + 1] == TARGET and words.count('-Zremap-cwd-prefix=') == 1, 'stock target unit')
            source_args = [Path(x) for x in words[1:] if x.endswith('.rs')]
            check(len(source_args) == 1, 'exact rustc source argument')
            s = source_args[0]
            if not s.is_absolute():
                # Cargo executes root units relative to the source manifest directory.
                check(crate == 'donation_relay_source_proposal', 'relative registry source')
                s = root / 'source' / s
            check('..' not in s.parts, 'noncanonical rustc source path')
            if s.is_relative_to(registry) or s.resolve().is_relative_to(registry.resolve()):
                source_scope = canonical_registry_source(s, registry, approved)
            else:
                canonical = s.resolve(strict=True)
                if canonical.is_relative_to((root / 'source').resolve()):
                    canonical_regular(s, root / 'source')
                    source_scope = dict(kind='frozen_source', canonical_path=str(canonical))
                else:
                    canonical_regular(s, root / 'target')
                    source_scope = dict(kind='generated_target_source', canonical_path=str(canonical),
                                        authenticated_registry_member=False)
            if crate == 'donation_relay_source_proposal':
                root_commands.append(words)
        else:
            kind = 'build-script'
            check(exe.resolve().is_relative_to((root / 'target').resolve()) and
                  exe.name.startswith('build-script-'), 'unexpected non-rustc Running executable')
        unit = dict(kind=kind, raw_line=line, argv=words, environment_assignments=assignments)
        if kind == 'rustc':
            unit['source_scope'] = source_scope
        units.append(unit)
    check(units and len(root_commands) == 1, 'exact one root compilation')
    cmd = root_commands[0]
    check(cmd[cmd.index('--target') + 1] == TARGET, 'root target')
    codegen = [cmd[i + 1] for i, x in enumerate(cmd[:-1]) if x == '-C']
    for option in ['opt-level=3', 'panic=abort', 'codegen-units=1', 'overflow-checks=on']:
        check(option in codegen, 'root release flag ' + option)
    check(not any(x.startswith(('lto', 'target-cpu', 'target-feature')) for x in codegen), 'no extra root codegen')
    check(cmd.count('-Zremap-cwd-prefix=') == 1 and not any(x.startswith('--remap-path-prefix') for x in cmd), 'exact remap literal')
    check('--cfg' not in cmd or all(not cmd[i + 1].startswith('feature=') for i, x in enumerate(cmd[:-1]) if x == '--cfg'), 'no root features')
    return dict(units=units, root_commands=root_commands, unit_count=len(units),
                registry_source_coverage='invoked source roots; opened member coverage not asserted',
                full_target_inventory_retained=True)

def target_archive(root, pub):
    target = root / 'target'
    if not target.exists():
        return dict(target_created=False)
    inventory = tree(target)
    write(pub / 'target-tree.json', inventory)
    # Deterministic archive of EVERY generated entry, not just final artifacts. Tar preserves link/mode.
    archive = root / 'target-complete.tar.gz'
    with archive.open('wb') as raw:
        with gzip.GzipFile(filename='', fileobj=raw, mode='wb', mtime=0) as gz:
            with tarfile.open(fileobj=gz, mode='w|') as t:
                for p in sorted(target.rglob('*')):
                    info = t.gettarinfo(str(p), p.relative_to(target).as_posix())
                    info.uid = info.gid = info.mtime = 0
                    info.uname = info.gname = ''
                    with p.open('rb') if info.isfile() else open(os.devnull, 'rb') as f:
                        t.addfile(info, f if info.isfile() else None)
    parts = []
    with archive.open('rb') as f:
        for i in range(1000000):
            b = f.read(64 * 1024 * 1024)
            if not b:
                break
            p = pub / 'target-payloads' / ('target.tar.gz.part%04d' % i)
            p.parent.mkdir(exist_ok=True)
            p.write_bytes(b)
            parts.append(dict(path=p.relative_to(pub).as_posix(), bytes=len(b), sha256=sha(b)))
    return dict(target_created=True, files=len(inventory), archive_bytes=archive.stat().st_size,
                archive_sha256=digest(archive), lossless_parts=parts,
                replay='concatenate exact ordered parts then gzip/tar; all entries retained',
                host_loader_closure_proven=False)

def execute(args, a):
    parent = P / 'reviewed282c'
    manifest(P, args.controller_manifest_sha256)
    manifest(parent, REVIEWED)
    auth = load(args.authority)
    binding = authority_guard(args, auth)
    a.counts['workflow_dispatches'] = 1
    shutil.copyfile(os.environ['GITHUB_EVENT_PATH'], a.pub / 'server-event.original.json')
    shutil.copytree(P, a.pub / 'controller-package')
    write(a.pub / 'authority.json', auth)
    shutil.copyfile(args.authority, a.pub / 'authority.original.json')
    write(a.pub / 'observed-run-binding.json', binding)
    # No acquisition, probe or subprocess occurred before the server-assigned run binding above.
    root = args.output / 'fresh'
    root.mkdir()
    for n in ['tmp', 'neutral', 'cargo-home', 'rustup']:
        (root / n).mkdir()
    plain = inherited_home_environment(dict(PATH='/usr/bin:/bin', LANG='C.UTF-8', LC_ALL='C.UTF-8', GIT_OPTIONAL_LOCKS='0'))
    write(a.pub / 'initial-environment.json', redacted_environment())
    a.gate('environment-preflight', lambda: reject_overrides(args.source_repo, root))
    checkout_states = {}
    for label, repo, expected in [('source', args.source_repo, SOURCE_COMMIT), ('control', args.control_repo, auth['control_commit'])]:
        argv, git_env, config_proof = git_metadata_command(repo, 'head', plain)
        write(a.pub / (label + '-Git-config-before.json'), config_proof)
        out, _ = a.run(label + '-git-head', argv, root, git_env)
        check(out.decode().strip() == expected, 'checkout commit ' + label)
        argv, git_env, status_config_proof = git_metadata_command(repo, 'status', plain)
        check(status_config_proof == config_proof, 'local Git config unchanged before status')
        out, _ = a.run(label + '-git-status', argv, root, git_env)
        check(not out, 'dirty checkout ' + label)
        checkout_states[label] = dict(head=expected, index_sha256=digest(repo / '.git/index'), Git_config=config_proof)
    write(a.pub / 'checkout-before.json', checkout_states)
    plan = load(parent / 'seed/PLAN.NOT_EXECUTABLE.json')
    frozen = plan['frozen_source']
    before = a.gate('source-before', lambda: source_guard(args.source_repo, frozen))
    shutil.copytree(parent / 'source15', root / 'source')
    check(input_map(root / 'source') == frozen, 'fresh Source15 exact')
    shutil.copytree(root / 'source', a.pub / 'actual-build-source')
    original = args.source_repo / ORIGINAL
    check(original.stat().st_size == 830448 and digest(original) == ORIGINAL_SHA, 'original hash-only guard')
    write(a.pub / 'original-hash-only.json', dict(bytes=830448, sha256=ORIGINAL_SHA,
          further_access='only reviewed282c numeric-only adapter after all build gates'))
    a.run('uname', ['/usr/bin/uname', '-a'], root, plain)
    a.run('libc-version', ['/usr/bin/getconf', 'GNU_LIBC_VERSION'], root, plain)
    loaded = {}
    for line in Path('/proc/self/maps').read_text().splitlines():
        path = line.split()[-1]
        if path.startswith('/') and Path(path).is_file():
            loaded[path] = record_file(path)
    write(a.pub / 'host.json', dict(os_release=Path('/etc/os-release').read_text(),
          loaded_controller_libraries=loaded, python_executable=record_file(sys.executable),
          python_version=sys.version, runner_environment={k: os.environ.get(k) for k in
          ['ImageOS', 'ImageVersion', 'RUNNER_OS', 'RUNNER_ARCH', 'RUNNER_NAME']},
          host_full_identity_proven=False, tool_process_transitive_loader_identity_proven=False))
    a.gate('compiler-acquisition', lambda: acquire(a, 'compiler', plan['compiler_asset'], plan['compiler_asset']['measured_sha256'], root))
    a.gate('strip-acquisition', lambda: acquire(a, 'strip', plan['strip_asset'], plan['strip_asset']['digest'].split(':')[1], root))
    tools_before = a.gate('tools-before', lambda: tool_guard(root, parent))
    write(a.pub / 'tool-trees-before.json', tools_before)
    env = inherited_home_environment({k: v.replace('{fresh_work}', str(root)) for k, v in plan['environment_template'].items()})
    env.update(TMPDIR=str(root / 'tmp'))
    write(a.pub / 'effective-build-environment.json', env)
    compiler = root / 'compiler-tools/rust/bin'
    cap = load(parent / 'seed/retained/Linux13/download/extracted/capability.json')
    probes = [('cargo-version', [compiler / 'cargo', '--version', '--verbose']),
              ('compiler-version', [compiler / 'rustc', '--version', '--verbose']),
              ('strip-version', [root / 'strip-tools/llvm/bin/llvm-objcopy', '--version']),
              ('target-cfg', [compiler / 'rustc', '--print', 'cfg', '--target', TARGET]),
              ('target-libdir', [compiler / 'rustc', '--print', 'target-libdir', '--target', TARGET]),
              ('target-spec', [compiler / 'rustc', '-Z', 'unstable-options', '--print', 'target-spec-json', '--target', TARGET])]
    for name, argv in probes:
        out, err = a.run(name, argv, root / 'neutral', env)
        check(not diagnostics(out, err)['error_diagnostics'], 'probe diagnostics ' + name)
        if name == 'target-cfg':
            check(out.decode() == cap['cfg'], 'stock cfg')
        if name == 'target-spec':
            check(json.loads(out) == cap['spec'], 'stock spec')
        if name == 'target-libdir':
            check(Path(out.decode().strip()).resolve() == (root / 'compiler-tools/rust/lib/rustlib' / TARGET / 'lib').resolve(), 'legacy libdir')
    env['CARGO_NET_OFFLINE'] = 'false'
    a.counts['fetches'] += 1
    a.run('cargo-fetch', [compiler / 'cargo', 'fetch', '--manifest-path', root / 'source/Cargo.toml', '--locked'], root / 'neutral', env)
    reg_before = a.gate('registry-before', lambda: registry_guard(root, parent, root / 'source'))
    write(a.pub / 'registry-before.json', reg_before)
    check(input_map(root / 'source') == frozen, 'fetch source unchanged')
    check(not (root / 'target').exists(), 'fresh target before one compile')
    env['CARGO_NET_OFFLINE'] = 'true'
    a.counts['program_compiles'] += 1
    build_failure = None
    streams = None
    try:
        streams = a.run('program-build', [compiler / 'cargo', 'build', '--manifest-path', root / 'source/Cargo.toml',
                        '--release', '--target', TARGET, '--locked', '--offline', '--verbose'], root / 'neutral', env)
    except BaseException:
        build_failure = traceback.format_exc()
        streams = ((a.pub / 'commands/program-build.stdout').read_bytes(), (a.pub / 'commands/program-build.stderr').read_bytes())
    # Independent after gates run even when Cargo failed; failures accumulate and never trigger a retry.
    after_failures = []
    def after(name, fn):
        try:
            return a.gate(name, fn)
        except BaseException:
            after_failures.append(dict(name=name, traceback=traceback.format_exc()))
    def equal(name, actual, expected):
        write(a.pub / (name + '.json'), actual)
        check(actual == expected, name + ' before/after equality')
        return dict(equal=True)
    def checkout_after():
        observed = {}
        for label, repo in [('source', args.source_repo), ('control', args.control_repo)]:
            argv, git_env, config_proof = git_metadata_command(repo, 'head', plain)
            head, _ = a.run(label + '-git-head-after', argv, root, git_env)
            argv, git_env, status_config_proof = git_metadata_command(repo, 'status', plain)
            check(status_config_proof == config_proof, 'local Git config unchanged after build')
            status_out, _ = a.run(label + '-git-status-after', argv, root, git_env)
            check(not status_out, 'checkout remains clean ' + label)
            observed[label] = dict(head=head.decode().strip(), index_sha256=digest(repo / '.git/index'), Git_config=config_proof)
        return equal('checkout-after', observed, checkout_states)
    after('checkout-after', checkout_after)
    after('source-after', lambda: equal('source-after-observed', source_guard(args.source_repo, frozen), before))
    after('fresh-source-after', lambda: check(input_map(root / 'source') == frozen, 'fresh source unchanged'))
    after('tools-after', lambda: equal('tool-trees-after', tool_guard(root, parent), tools_before))
    after('registry-after', lambda: equal('registry-after', registry_guard(root, parent, root / 'source'), reg_before))
    diag = diagnostics(*streams)
    write(a.pub / 'backend-diagnostics.json', diag)
    after('backend-errors', lambda: check(diag['error_diagnostics'] == 0, 'compiler backend/error diagnostics'))
    after('verbose-units', lambda: write(a.pub / 'invoked-unit-graph.json', verbose_units(*streams, root,
          load(parent / 'seed/retained/registry232-approved-map.json'))))
    write(a.pub / 'build-after-failures.json', dict(build_failure=build_failure, after_failures=after_failures))
    check(build_failure is None and not after_failures, 'build or after-attestation failed; no strip/static')
    compiled = root / 'target' / TARGET / 'release/donation_relay_source_proposal.so'
    check(compiled.is_file() and not compiled.is_symlink(), 'actual compiler artifact')
    shutil.copyfile(compiled, a.pub / 'unstripped.so')
    a.counts['strips'] += 1
    a.run('strip', [root / 'strip-tools/llvm/bin/llvm-objcopy', '--strip-all', a.pub / 'unstripped.so', a.pub / 'candidate.so'], root / 'neutral', env)
    a.gate('tools-after-strip', lambda: equal('tool-trees-after-strip', tool_guard(root, parent), tools_before))
    a.counts['adapter_runs'] += 1
    a.run('candidate-static-adapter', [sys.executable, '-B', parent / 'candidate_ledger.UNRUN.py',
          '--candidate', a.pub / 'candidate.so', '--unstripped', a.pub / 'unstripped.so',
          '--original', original, '--authority', args.authority, '--expected-authority-sha256', args.authority_sha256,
          '--output', a.pub / 'static-measurement'], root / 'neutral', plain)
    manifest(a.pub / 'static-measurement', digest(a.pub / 'static-measurement/manifest.json'))
    summary = load(a.pub / 'static-measurement/comparison-summary.json')
    check(summary['original_inferred_windows'] == 492 and summary['original_sha256'] == ORIGINAL_SHA and summary['candidate_sha256'] == digest(a.pub / 'candidate.so') and summary['new_original_decoded_functions'] == 0 and summary['new_original_data_collections'] == 0 and summary['selected'] is False and summary['execution_suitable'] is False, 'actual adapter output identity and scope')
    return dict(status='UNSELECTED_STATIC_MEASUREMENT', returncode=0, summary=summary,
                source_os_compiler_causal_isolation=False)

def main():
    p = argparse.ArgumentParser()
    for n in ['control-repo', 'source-repo', 'output', 'authority']:
        p.add_argument('--' + n, type=Path, required=True)
    for n in ['authority-sha256', 'measurement-nonce', 'controller-manifest-sha256', 'source-commit']:
        p.add_argument('--' + n, required=True)
    args = p.parse_args()
    args.control_repo = args.control_repo.resolve()
    args.source_repo = args.source_repo.resolve()
    args.output = args.output.resolve()
    args.authority = args.authority.resolve()
    check(not args.output.exists(), 'fresh attempt output only')
    check(args.output.is_relative_to(Path(os.environ['RUNNER_TEMP']).resolve()), 'output confined to runner temp')
    args.output.mkdir()
    a = Attempt(args.output)
    def interrupted(signum, frame):
        raise InterruptedError('controller signal / 1800-second active deadline: ' + str(signum))
    for sig in [signal.SIGTERM, signal.SIGINT, signal.SIGALRM]:
        signal.signal(sig, interrupted)
    signal.alarm(1800)
    result = dict(status='FAILED_PRESERVED', returncode=1, start=now())
    try:
        result.update(execute(args, a))
    except BaseException:
        result['failure'] = traceback.format_exc()
        (a.pub / 'failure.txt').write_text(result['failure'])
    finally:
        signal.alarm(0)
        root = args.output / 'fresh'
        retention_complete = False
        try:
            write(a.pub / 'full-target-retention.json', target_archive(root, a.pub))
            retention_complete = True
        except BaseException:
            result.update(status='FAILED_PRESERVED', returncode=1, retention_failure=traceback.format_exc())
        # Final immutable input checks also run independently on setup/build/strip/adapter failures.
        for label, repo in [('source', args.source_repo), ('control', args.control_repo)]:
            try:
                frozen = load(P / 'reviewed282c/seed/PLAN.NOT_EXECUTABLE.json')['frozen_source']
                observed = source_guard(repo, frozen) if label == 'source' else manifest(P, args.controller_manifest_sha256)
                write(a.pub / ('final-' + label + '-input-guard.json'), dict(returncode=0, observed=observed))
            except BaseException:
                result.update(status='FAILED_PRESERVED', returncode=1)
                write(a.pub / ('final-' + label + '-input-guard.json'), dict(returncode=1, traceback=traceback.format_exc()))
        # Complete source/tool/cache maps on every failure path, even partial acquisition/fetch.
        for label, name in [('compiler', 'compiler-tools'), ('strip', 'strip-tools'),
                            ('registry', 'cargo-home/registry'), ('source', 'source')]:
            try:
                write(a.pub / ('final-' + label + '-tree.json'), tree(root / name))
            except BaseException:
                result.update(status='FAILED_PRESERVED', returncode=1)
                write(a.pub / ('final-' + label + '-tree-error.json'), dict(traceback=traceback.format_exc()))
        write(a.pub / 'upload-omissions.json', dict(omitted=['fresh/compiler-tools', 'fresh/strip-tools',
              'fresh/compiler.tar.bz2', 'fresh/strip.tar.bz2', 'fresh/cargo-home', 'fresh/rustup', 'fresh/tmp'],
              credentials_values_retained=False, complete_tool_and_registry_hash_maps_retained=True,
              all_generated_target_entries_retained=retention_complete, hard_kill_or_host_disk_failure_can_prevent_complete_retention=True, complete_host_or_uploader_identity_proven=False))
        a.finish(result)
    return result['returncode']

if __name__ == '__main__':
    raise SystemExit(main())
