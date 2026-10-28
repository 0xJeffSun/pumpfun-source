#!/usr/bin/env python3
"""Verify offline developer API contract bindings against the checked-in spec and captured evidence.

Contract-bound is not implementation, qualification, website origin binding or feature credit.
Every check raises ValueError so that `python -O` cannot disable it. No network access.
"""
import hashlib, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
METHODS = {'get', 'put', 'post', 'delete', 'patch', 'head', 'options'}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def read_json(root, path):
    return json.loads((root / path).read_text(encoding='utf-8'))


def utf16_slice(text, start, end):
    require(isinstance(start, int) and isinstance(end, int) and 0 <= start < end, f'Invalid range {start}..{end}')
    units = text.encode('utf-16-le')
    require(2 * end <= len(units), f'Range {start}..{end} exceeds source')
    return units[2 * start:2 * end].decode('utf-16-le', errors='strict')


def resolve_pointer(document, pointer):
    require(pointer.startswith('#/'), f'Unsupported JSON pointer {pointer}')
    node = document
    for token in pointer[2:].split('/'):
        token = token.replace('~1', '/').replace('~0', '~')
        if isinstance(node, list):
            require(token.isdigit() and int(token) < len(node), f'Unresolved JSON pointer {pointer}')
            node = node[int(token)]
        else:
            require(isinstance(node, dict) and token in node, f'Unresolved JSON pointer {pointer}')
            node = node[token]
    return node


def spec_operations(spec):
    return {f'{method.upper()} {path}': (path, method, op)
            for path, item in spec['paths'].items()
            for method, op in item.items() if method in METHODS}


def verify_contract(root, manifest_hashes, sources, operation, scope, contract):
    source = contract['source']
    require(source in manifest_hashes, f'{operation}: contract source is not a captured manifest object')
    raw = (root / source).read_bytes()
    actual = hashlib.sha256(raw).hexdigest()
    require(contract['sha256'] == manifest_hashes[source] == actual, f'{operation}: contract sha256 does not match manifest and file')
    text = sources.setdefault(source, raw.decode('utf-8'))
    literal = utf16_slice(text, contract['start'], contract['end'])
    pattern = r'"' + re.escape(operation) + r'":\(0,[A-Za-z_$][\w$]*\.publicRead\)\("' + re.escape(scope) + r'"'
    require(re.fullmatch(pattern, literal) is not None, f'{operation}: contract range does not hold its publicRead({scope}) literal')
    return text


def verify_call_sites(root, sources, occurrences, operation, sites):
    require(isinstance(sites, list), f'{operation}: clientCallSites must be a list')
    seen = set()
    for site in sites:
        key = (site['source'], site['start'], site['end'])
        require(key not in seen, f'{operation}: duplicate client call site')
        seen.add(key)
        require(key in occurrences.get(operation, set()), f'{operation}: call site is not an internal-operations occurrence')
        text = sources.setdefault(site['source'], (root / site['source']).read_text(encoding='utf-8'))
        require(utf16_slice(text, site['start'], site['end']) == f'"{operation}"', f'{operation}: call-site range does not hold the operation literal')


def require_unqualified(entry, status):
    operation = entry.get('operation')
    require(entry.get('status') == status, f'{operation}: status must be {status}')
    require(entry.get('implemented') is False, f'{operation}: bindings must not claim native implementation')
    require(entry.get('qualified') is False, f'{operation}: bindings must not claim compatibility qualification')


def verify(root=ROOT, bindings=None, coverage=None):
    spec = read_json(root, 'contracts/developer.openapi.json')
    inventory = read_json(root, 'contracts/internal-operations.json')
    manifest = read_json(root, 'evidence/web/manifest.json')
    bindings = read_json(root, 'contracts/developer-bindings.json') if bindings is None else bindings
    coverage = read_json(root, 'contracts/coverage.json') if coverage is None else coverage
    manifest_hashes = {r['path']: r['sha256'] for r in manifest['records'] if r.get('status') == 200}
    occurrences = {}
    for o in inventory['occurrences']:
        occurrences.setdefault(o['operation'], set()).add((o['source'], o['start'], o['end']))
    operations = spec_operations(spec)
    sources = {}

    require(bindings.get('schemaVersion') == 1, 'Unsupported bindings schema')
    require(bindings.get('specVersion') == spec['info']['version'], 'Bindings were made against a different spec version')
    scopes = bindings.get('boundScopes')
    require(isinstance(scopes, list) and scopes and len(set(scopes)) == len(scopes), 'boundScopes must be a non-empty unique list')
    known_scopes = {op.get('x-api-scope') for _, _, op in operations.values()}
    require(set(scopes) <= known_scopes, 'boundScopes contains a scope absent from the spec')

    seen = set()
    contract_sources = set()
    for entry in bindings['bindings']:
        operation = entry['operation']
        require(operation not in seen, f'{operation}: duplicate binding')
        seen.add(operation)
        require(operation in operations, f'{operation}: not a documented developer operation')
        path, method, op = operations[operation]
        scope = op['x-api-scope']
        require(entry['scope'] == scope, f'{operation}: scope {entry["scope"]} differs from spec {scope}')
        require(scope in scopes, f'{operation}: scope {scope} is not declared in boundScopes')
        require(entry['operationId'] == op['operationId'], f'{operation}: operationId differs from spec')
        spec_ref = entry['evidence']['spec']
        require(spec_ref.startswith('contracts/developer.openapi.json#'), f'{operation}: spec evidence must point into the checked-in spec')
        require(resolve_pointer(spec, '#' + spec_ref.split('#', 1)[1]) is op, f'{operation}: spec pointer resolves to a different operation')
        origin = entry['origin']
        require(origin['declared'] == resolve_pointer(spec, '#' + origin['declaredBy'].split('#', 1)[1])['url'], f'{operation}: declared origin differs from spec')
        require(origin['websiteCallOrigin'] == 'unresolved', f'{operation}: website call origin is not bound by this evidence')
        require(origin['declaredBy'].startswith('contracts/developer.openapi.json#'), f'{operation}: origin evidence must point into the checked-in spec')
        auth = entry['auth']
        require(auth['declared'] in resolve_pointer(spec, '#/components/securitySchemes'), f'{operation}: auth scheme absent from spec')
        require(any(auth['declared'] in requirement for requirement in op.get('security', spec.get('security', []))), f'{operation}: operation does not require the declared auth')
        contract = entry['evidence']['contract']
        text = verify_contract(root, manifest_hashes, sources, operation, scope, contract)
        contract_sources.add(contract['source'])
        keyed = re.search(r'KEYED_ROUTE_CODES=\[([^\]]*)\]', text)
        require(keyed is not None, f'{operation}: captured contract lacks KEYED_ROUTE_CODES')
        keyed_codes = sorted(code.strip('"') for code in keyed.group(1).split(','))
        require(auth['keyedErrorCodesMatchCapturedContract'] is True and sorted(op['x-error-codes']) == keyed_codes, f'{operation}: keyed error codes differ from captured contract')
        verify_call_sites(root, sources, occurrences, operation, entry['evidence']['clientCallSites'])
        require_unqualified(entry, 'contract-bound')

    for scope in scopes:
        expected = {k for k, (_, _, op) in operations.items() if op['x-api-scope'] == scope}
        missing = sorted(expected - seen)
        require(not missing, f'Scope {scope} is missing bindings: {missing}')

    observed_seen = set()
    for entry in bindings.get('observedNotDeclared', []):
        operation = entry['operation']
        require(operation not in operations and entry.get('declaredInSpec') is False, f'{operation}: observed-not-declared operation is in the spec')
        require(operation not in observed_seen, f'{operation}: duplicate observed operation')
        observed_seen.add(operation)
        require(entry['scope'] in scopes, f'{operation}: observed scope is not bound')
        require(entry.get('countedInDeveloperDenominator') is False, f'{operation}: undeclared operations stay outside the documented denominator')
        verify_contract(root, manifest_hashes, sources, operation, entry['scope'], entry['evidence']['contract'])
        contract_sources.add(entry['evidence']['contract']['source'])
        verify_call_sites(root, sources, occurrences, operation, entry['evidence']['clientCallSites'])
        require_unqualified(entry, 'observed-not-declared')

    pattern = re.compile(r'"((?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS) [^"]+)":\(0,[A-Za-z_$][\w$]*\.publicRead\)\("([a-z.]+)"')
    for source in contract_sources:
        for literal in pattern.finditer(sources[source]):
            operation, scope = literal.groups()
            if scope in scopes and operation not in operations:
                require(operation in observed_seen, f'{operation}: captured publicRead({scope}) route is neither bound nor recorded as undeclared')

    api = coverage['developerApi']
    require(api.get('bindings') == 'developer-bindings.json', 'coverage.json developerApi.bindings must point to developer-bindings.json')
    require(api.get('contractBound') == len(seen), 'coverage.json contractBound differs from the bindings ledger')
    require(api.get('documentedOperations') == len(operations), 'coverage.json documentedOperations differs from the spec')
    return len(seen), len(operations), len(observed_seen)


def main():
    bound, documented, observed = verify()
    print(f'Developer API contract bindings verified: {bound}/{documented} documented operations contract-bound, '
          f'{observed} captured publicRead route(s) recorded as not declared; 0 implemented, 0 qualified')


if __name__ == '__main__':
    try:
        main()
    except ValueError as error:
        print(f'Binding verification failed: {error}', file=sys.stderr)
        sys.exit(1)
