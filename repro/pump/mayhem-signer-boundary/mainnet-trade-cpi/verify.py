"""Verify two finalized Mayhem-to-Pump trade CPIs from saved RPC responses."""

import argparse
import base64
import hashlib
import json
from pathlib import Path

from solders.pubkey import Pubkey
from solders.transaction import VersionedTransaction


ROOT = Path(__file__).resolve().parents[4]
FOLDER = Path(__file__).resolve().parent
IDL = ROOT / "evidence/upstream/pump.json"
OUT = FOLDER / "analysis.json"
MAYHEM = "MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e"
PUMP = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"
ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
EXPECTED = {
    "buy": ("4hWg83HU7wW1SaLPJeurFmQQnGXzyHwKeBoFHJMJ8Jfp4uea6UFkuo1sHKutfADKrervkBeov9F7bjxK1qF4eH5o", 461149497),
    "sell": ("5wBT7WH1XgFAb2MbSncUvGTm78jf6YW6fjUyU4mem2RPPnJuFiVxiCXrg6LYrdqtUnFB9Y5kZAZ663a9zmD3jXAK", 461148987),
}


def sha(raw):
    return hashlib.sha256(raw).hexdigest()


def b58decode(value):
    number = 0
    for char in value:
        number = number * 58 + ALPHABET.index(char)
    raw = number.to_bytes((number.bit_length() + 7) // 8, "big")
    return b"\0" * (len(value) - len(value.lstrip("1"))) + raw


def token_amount(meta, index, key):
    rows = [row for row in meta[key] if row["accountIndex"] == index]
    assert len(rows) == 1, (index, key)
    return int(rows[0]["uiTokenAmount"]["amount"])


def analyze_one(name, instruction):
    path = FOLDER / f"{name}-transaction.json"
    saved_raw = path.read_bytes()
    capture = json.loads(saved_raw)
    signature, slot = EXPECTED[name]
    assert capture["sample"] == name
    assert capture["request"]["method"] == "getTransaction"
    assert capture["request"]["params"][0] == signature
    assert capture["request"]["params"][1]["commitment"] == "finalized"
    response = capture["response"]
    assert response["slot"] == slot and response["meta"]["err"] is None
    tx_raw = base64.b64decode(response["transaction"][0], validate=True)
    assert sha(tx_raw) == capture["transaction_sha256"]
    tx = VersionedTransaction.from_bytes(tx_raw)
    signatures = list(tx.verify_with_results())
    assert signatures and all(signatures)
    assert str(tx.signatures[0]) == signature
    loaded = response["meta"]["loadedAddresses"]
    keys = [str(key) for key in tx.message.account_keys] + loaded["writable"] + loaded["readonly"]
    assert len(keys) == len(response["meta"]["preBalances"]) == len(response["meta"]["postBalances"])
    vault = str(Pubkey.find_program_address([b"sol-vault"], Pubkey.from_string(MAYHEM))[0])
    assert vault in keys
    outer_signers = keys[:tx.message.header.num_required_signatures]
    assert vault not in outer_signers
    outer = tx.message.instructions
    assert len(outer) == 3
    assert keys[outer[2].program_id_index] == MAYHEM
    assert bytes(outer[2].data[:8]) == bytes(instruction["discriminator"])
    assert keys.index(vault) in outer[2].accounts

    pump_calls = []
    for group in response["meta"]["innerInstructions"]:
        for inner in group["instructions"]:
            if keys[inner["programIdIndex"]] == PUMP:
                pump_calls.append((group["index"], inner, b58decode(inner["data"])))
    assert len(pump_calls) == 2
    trade_calls = [row for row in pump_calls
                   if row[2][:8] == bytes(instruction["discriminator"])]
    assert len(trade_calls) == 1
    outer_index, trade, data = trade_calls[0]
    assert outer_index == 2 and trade.get("stackHeight") == 2
    assert len(data) == (25 if name == "buy" else 24)
    assert len(trade["accounts"]) == len(instruction["accounts"]) + 2
    accounts = {definition["name"]: keys[index]
                for definition, index in zip(instruction["accounts"], trade["accounts"])}
    assert accounts["user"] == vault
    assert accounts["fee_config"] == "8Wf5TiAheLUqBrKXeYg2JtAFFMWtKdG2BSFgqUcPVwTt"
    amount = int.from_bytes(data[8:16], "little")
    sol_limit = int.from_bytes(data[16:24], "little")
    user_token_index = keys.index(accounts["associated_user"])
    curve_token_index = keys.index(accounts["associated_bonding_curve"])
    user_token_delta = token_amount(response["meta"], user_token_index, "postTokenBalances") - \
        token_amount(response["meta"], user_token_index, "preTokenBalances")
    curve_token_delta = token_amount(response["meta"], curve_token_index, "postTokenBalances") - \
        token_amount(response["meta"], curve_token_index, "preTokenBalances")
    vault_index = keys.index(vault)
    curve_index = keys.index(accounts["bonding_curve"])
    vault_lamport_delta = response["meta"]["postBalances"][vault_index] - \
        response["meta"]["preBalances"][vault_index]
    curve_lamport_delta = response["meta"]["postBalances"][curve_index] - \
        response["meta"]["preBalances"][curve_index]
    assert user_token_delta == (-amount if name == "sell" else amount)
    assert curve_token_delta == -user_token_delta
    assert vault_lamport_delta == (sol_limit if name == "sell" else -sol_limit)
    assert curve_lamport_delta == -vault_lamport_delta
    assert not any(raw[:8] == bytes([61, 169, 188, 191, 153, 149, 42, 97])
                   for _, _, raw in pump_calls)  # set_mayhem_virtual_params
    return {
        "signature": signature,
        "slot": slot,
        "capture_sha256": sha(saved_raw),
        "signed_transaction_sha256": sha(tx_raw),
        "verified_outer_signatures": len(signatures),
        "outer_program": MAYHEM,
        "outer_instruction": name,
        "pump_trade_instruction": name,
        "pump_trade_data_hex": data.hex(),
        "pump_trade_accounts": accounts,
        "pump_extra_accounts": [keys[index] for index in trade["accounts"][len(instruction["accounts"]):]],
        "sol_vault_pda": vault,
        "sol_vault_is_outer_signer": False,
        "amount_raw_base": amount,
        "sol_limit_lamports": sol_limit,
        "user_token_delta": user_token_delta,
        "curve_token_delta": curve_token_delta,
        "sol_vault_lamport_delta": vault_lamport_delta,
        "curve_lamport_delta": curve_lamport_delta,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="write the deterministic analysis receipt")
    args = parser.parse_args()
    manifest = json.loads((FOLDER / "manifest-sha256.json").read_text())
    actual = {path.name: sha(path.read_bytes()) for path in FOLDER.iterdir()
              if path.is_file() and path.name != "manifest-sha256.json"}
    assert manifest == actual
    idl_raw = IDL.read_bytes()
    instructions = {row["name"]: row for row in json.loads(idl_raw)["instructions"]}
    result = {
        "scope": "Two already-landed finalized Mayhem buy/sell transactions with valid outer signatures and genuine Pump CPIs. Public RPC history proves only these routes, not set_mayhem_virtual_params reachability, a general fund-safety conclusion, or source/ELF identity.",
        "pump_idl_sha256": sha(idl_raw),
        "mayhem_program": MAYHEM,
        "pump_program": PUMP,
        "samples": {name: analyze_one(name, instructions[name]) for name in EXPECTED},
    }
    if args.write:
        OUT.write_text(json.dumps(result, indent=2) + "\n")
    else:
        assert result == json.loads(OUT.read_text())
    print(json.dumps({name: {key: sample[key] for key in (
        "slot", "pump_trade_instruction", "verified_outer_signatures",
        "amount_raw_base", "sol_vault_lamport_delta")}
        for name, sample in result["samples"].items()}))


if __name__ == "__main__":
    main()
