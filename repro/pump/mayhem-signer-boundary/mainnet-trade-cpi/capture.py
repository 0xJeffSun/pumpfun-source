"""Capture one finalized, already-landed Mayhem transaction via read-only RPC."""

import argparse
import base64
import hashlib
import json
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from solders.transaction import VersionedTransaction


ROOT = Path(__file__).resolve().parents[4]
FOLDER = Path(__file__).resolve().parent
RPC = "https://api.mainnet-beta.solana.com"
SAMPLES = {
    "sell": ("5wBT7WH1XgFAb2MbSncUvGTm78jf6YW6fjUyU4mem2RPPnJuFiVxiCXrg6LYrdqtUnFB9Y5kZAZ663a9zmD3jXAK", 461148987),
    "buy": ("4hWg83HU7wW1SaLPJeurFmQQnGXzyHwKeBoFHJMJ8Jfp4uea6UFkuo1sHKutfADKrervkBeov9F7bjxK1qF4eH5o", 461149497),
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("sample", choices=SAMPLES)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    signature, expected_slot = SAMPLES[args.sample]
    output = args.output or FOLDER / f"{args.sample}-transaction.json"
    request = {"jsonrpc": "2.0", "id": 1, "method": "getTransaction",
               "params": [signature, {"encoding": "base64", "commitment": "finalized",
                                       "maxSupportedTransactionVersion": 0}]}
    body = json.dumps(request).encode()
    with urllib.request.urlopen(urllib.request.Request(
        RPC, data=body, headers={"Content-Type": "application/json"}), timeout=20
    ) as response:
        reply = json.load(response)
    assert "error" not in reply, reply.get("error")
    result = reply["result"]
    assert result and result["slot"] == expected_slot and result["meta"]["err"] is None
    raw = base64.b64decode(result["transaction"][0], validate=True)
    tx = VersionedTransaction.from_bytes(raw)
    assert str(tx.signatures[0]) == signature
    assert all(tx.verify_with_results())
    report = {
        "scope": "Read-only finalized getTransaction capture of one already-landed Mayhem transaction. This does not sign, simulate or broadcast any transaction and does not prove other Mayhem routes.",
        "sample": args.sample,
        "queried_at_utc": datetime.now(timezone.utc).isoformat(),
        "rpc_endpoint": RPC,
        "request": request,
        "transaction_sha256": hashlib.sha256(raw).hexdigest(),
        "response": result,
    }
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"sample": args.sample, "signature": signature, "slot": result["slot"],
                      "transaction_sha256": report["transaction_sha256"],
                      "signatures_verified": len(tx.signatures)}))


if __name__ == "__main__":
    main()
