"""Fail-closed tests for the exact-artifact and signed-receipt claims."""
from pathlib import Path
import base64, gzip, hashlib, json, os, shutil, subprocess, sys, tempfile

HERE = Path(__file__).resolve().parent


def seal(packet):
    manifest = {str(p.relative_to(packet)).replace('\\', '/'): hashlib.sha256(p.read_bytes()).hexdigest()
                for p in sorted(packet.rglob('*')) if p.is_file() and p != packet/'manifest.json'}
    (packet/'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')


def run(packet, success):
    result = subprocess.run([sys.executable, '-B', str(HERE/'verify.py'), '--packet', str(packet)],
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    assert (result.returncode == 0) == success, result.stdout + result.stderr


run(HERE, True)
with tempfile.TemporaryDirectory(prefix='metaplex-proof-') as temporary:
    packet = Path(temporary)/'packet'
    shutil.copytree(HERE, packet)
    # A nested manifest must never bypass the inventory check.
    extra = packet/'unexpected/manifest.json'
    extra.parent.mkdir(); extra.write_text('{}\n')
    run(packet, False)
    extra.unlink(); extra.parent.rmdir()
    # Re-sealing a corrupted binary must not turn a false byte claim into a pass.
    candidate = packet/'candidate.so'
    original = candidate.read_bytes()
    damaged = bytearray(original); damaged[236632] ^= 1
    candidate.write_bytes(damaged); seal(packet); run(packet, False)
    candidate.write_bytes(original); seal(packet)
    # A correctly hashed receipt still has to refer to the selected artifact.
    receipt = packet/'runtime/edition-validation.json.gz'
    saved = receipt.read_bytes()
    data = json.loads(gzip.decompress(saved)); data['candidate_sha256'] = '0'*64
    receipt.write_bytes(gzip.compress(json.dumps(data).encode(), mtime=0)); seal(packet); run(packet, False)
    receipt.write_bytes(saved); seal(packet)
    # Corrupt BOTH sides equally: equality alone cannot substitute for signature verification.
    data = json.loads(gzip.decompress(saved))
    for side in ['original', 'candidate']:
        tx = bytearray(base64.b64decode(data['cases'][0][side]['transaction_base64']))
        tx[1] ^= 1
        data['cases'][0][side]['transaction_base64'] = base64.b64encode(tx).decode()
    receipt.write_bytes(gzip.compress(json.dumps(data).encode(), mtime=0)); seal(packet); run(packet, False)
    receipt.write_bytes(saved); seal(packet)
    run(packet, True)
    alias = packet/'unlisted-broken-link'
    alias.symlink_to(packet/'missing-target')
    run(packet, False)
    alias.unlink()
    if hasattr(os, 'mkfifo'):
        fifo = packet/'unlisted-fifo'
        os.mkfifo(fifo)
        run(packet, False)
        fifo.unlink()
    optimized = subprocess.run([sys.executable, '-O', '-B', str(HERE/'verify.py'), '--packet', str(packet)], capture_output=True, text=True)
    assert optimized.returncode != 0 and 'verification requires assertions' in optimized.stderr
print('PASS: exact packet; nested inventory, binary, artifact binding and signed-transaction tampering rejected')
