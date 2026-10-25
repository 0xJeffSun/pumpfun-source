# Two genuine Mayhem → Pump trade CPIs

Finalized public history contains a Mayhem `buy` at slot **461149497** and `sell` at slot **461148987**. Each saved [buy](buy-transaction.json) or [sell](sell-transaction.json) `getTransaction` response contains the raw signed v0 transaction, account-table loaded keys, inner instructions and pre/post balances. The [verifier](verify.py) checks the [package manifest](manifest-sha256.json), both Ed25519 transaction signatures, maps the Pump instruction discriminators and IDL account order, derives Mayhem's `[b"sol-vault"]` PDA, and checks the watched token and lamport deltas. The [analysis receipt](analysis.json) binds the raw capture hashes and decoded values.

Pump's `user` is Mayhem's `sol-vault` PDA in both inner trades. It is **not** an outer signer; the successful Pump CPI is evidence that Mayhem supplies the PDA's signer privilege inside its call. The buy moves **24,270,754,925,984** raw base units from the curve vault to the user token account and **5,593,429 lamports** from `sol-vault` to the curve. The sell moves **37,126,759,720,294** raw base units back and **104,769,063 lamports** to `sol-vault`. Those watched deltas equal the Pump instruction arguments on these two transactions. The fee payer separately pays the network transaction fees.

Run read-only verification with the repository's pinned `solders` dependency:

```sh
python3 repro/pump/mayhem-signer-boundary/mainnet-trade-cpi/verify.py
```

Optional [capture](capture.py) refreshes only these already-landed finalized transactions using `getTransaction`; it never signs, simulates or broadcasts:

```sh
python3 repro/pump/mayhem-signer-boundary/mainnet-trade-cpi/capture.py buy
python3 repro/pump/mayhem-signer-boundary/mainnet-trade-cpi/capture.py sell
python3 repro/pump/mayhem-signer-boundary/mainnet-trade-cpi/verify.py --write
```

Neither transaction calls Pump `set_mayhem_virtual_params`. These are real **trade** CPI routes and strengthen the Mayhem signer-boundary context, but they do not establish a positive route for the separate virtual-params handler, general Mayhem trade behavior, a fund-safety finding, or byte-identical source. The raw public RPC responses are observations of historical execution, not a new live transaction.
