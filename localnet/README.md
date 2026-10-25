# Surfpool local network

The project launcher uses **Surfpool 1.0.0** and Python 3's standard library.
Surfpool is already installed on the development machine at
`~/.local/bin/surfpool`. On another machine, follow the
[official installation instructions](https://www.surfpool.run/) and install the
same version. The launcher rejects other versions until compatibility is reviewed.

From the repository root:

```sh
python3 localnet/surfpool.py
```

- Local RPC: `http://127.0.0.1:18999`
- Local WebSocket: `ws://127.0.0.1:19000`
- Studio: `http://127.0.0.1:18488`
- Stop: Ctrl-C in the launch terminal.

Use `--port` and `--studio-port` to select alternate ports. The WebSocket port is
the RPC port plus one. Occupied ports fail before starting another server.
For clients, pass the local RPC explicitly; no global Solana configuration or
wallet settings are changed. The process runs with `--offline`, `--no-deploy` and
an in-memory database, so a new invocation starts a fresh local network.

## Loaded programs and validation

The launcher verifies the saved capture hashes, then loads the original Pump,
Pump AMM, Pump Fees and Mayhem ELFs at their captured program addresses. It removes
only verified zero allocation padding after each ELF's section table. It reads
back every program and checks exact ELF bytes, owner and executable status.

```sh
python3 localnet/surfpool.py --check
```

This smoke check starts Surfpool, loads and verifies the four programs, and stops
its own process. It passed locally on Surfpool 1.0.0. Runtime logs and a fresh
verification report are written under ignored `work/surfpool/`.

These are **original captured programs**, not rebuilt candidates. This mode uses
the legacy BPF loader for local execution; it does not reproduce upgradeable-loader
ProgramData metadata or upgrade-authority behavior. It does not hydrate all user,
pool, token or dependency accounts and is not a complete historical chain snapshot.
Tests must install their own account fixtures and dependencies before exercising
instructions. Startup/readback success alone does not prove transaction behavior,
security or byte-identical source reconstruction.

The existing signed execution harnesses under
[`research/imported-lab/scripts/`](../research/imported-lab/scripts/) remain the
reference for isolated fixture-based transaction checks; their saved evidence and
scope are under [`research/validation/`](../research/validation/).

[Surfpool documentation](https://www.surfpool.run/llms.txt) describes the local
network model; `surfpool start --help` lists the flags supported by the pinned CLI.
