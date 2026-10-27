# Relay ProgramData allocation provenance

The captured830,448-byte program payload is explained exactly by retained
finalized-RPC transaction evidence. It is not an830,448-byte compiler ELF with
an unexplained footer.

| Slot | Successful loader instruction | Payload capacity afterward |
| ---: | --- | ---: |
| 401117852 | DeployWithMaxDataLen546,944 | 546,944 |
| 403116664 | ExtendProgram33,504 | 580,448 |
| 415393334 | ExtendProgram100,000 | 680,448 |
| 415393372 | ExtendProgram100,000 | 780,448 |
| 415393402 | ExtendProgram40,000 | 820,448 |
| 415393486 | ExtendProgram10,000 | 830,448 |

The last successful upgrade is slot415422992, matching the captured ProgramData
metadata. The later transaction at417994985 changes authority to the authority
in the capture and does not resize or upgrade the program. The full retained
history contains13 successful transactions: one initial deployment, five
extensions, six upgrades and one authority change. The33,504-byte extension
transaction also initializes a separate buffer; that initialization is decoded
but excluded from the ProgramData capacity sum.

The full ProgramData account is830,493 bytes:45 bytes of loader metadata plus
the830,448-byte payload saved unchanged by `scripts/capture.py`. Its meaningful
ELF extent ends at818,280, leaving12,168 captured zero bytes. The history explains
the account capacity that preserves this space. It does not turn those bytes
into an ELF section or justify appending zeros to a compiler artifact.

## Evidence and reproduction

The public endpoint `https://api.mainnet-beta.solana.com` returned13 signatures
for the captured ProgramData address, below the requested100-row limit. All13
transaction responses were subsequently retrieved. Four initial calls returned
429 errors; separate retained retry responses supply those four records. No
transaction, account or deployment was submitted or modified.

The verifier decodes loader instructions directly from base58 bytes, validates
program/ProgramData account positions, checks successful transaction metadata,
binds request signatures and slots, and reconstructs capacity. It also checks
captured account hashes, deployment slot, authority, payload equality, ELF
extent and zero tail. The loader enum source is retained with its registry
checksum as schema evidence.

```sh
python3 -I -B repro/donation-relay/allocation-provenance/verify.py
```

These are retained public RPC observations requested at finalized commitment,
not a cryptographic chain inclusion proof or a guarantee of the provider's
complete archival history. The observations start with the initial deployment
and account exactly for the captured size. All transaction signatures and raw
instruction bytes are retained in `report.json` and `rpc/`.

This closes the unexplained-capacity question. Reconstructing the four donation
bodies, authentic function placement, complete Rust ELF bytes and any eventual
loader-backed payload reproduction remain open. No runtime execution or
byte-identical Rust build is claimed by this packet.

The retained `solana-loader-v3-interface`3.0.0 schema/archive is from the
[Agave project](https://github.com/anza-xyz/agave), published under Apache-2.0.
Its separate [license text](LICENSE-APACHE) applies to those third-party files.
