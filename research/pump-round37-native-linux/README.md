# Native Linux builds of unchanged Pump Round37

The official Linux v1.44 SDK compiles the exact **56 maintained Round37 source
inputs** to **749/1,035 normalized windows** with `sbpf-solana-solana`. All 744
previous normalized matches survive. The five gains are complete, raw-identical
56-byte TypeId bodies, covering 280 additional original text bytes. Their prior
library recovery and reference analysis are credited to
[PR307](https://github.com/lalalune/pumpfun-source/pull/307) and
[PR321](https://github.com/lalalune/pumpfun-source/pull/321), which used older
Pump artifacts. This packet establishes the result on unchanged Round37.

| Artifact / target | Normalized | Raw |
| --- | ---: | ---: |
| Published Round37 | 744 | 175 |
| Native Linux, SBF control | 744 | 121 |
| Native Linux, SBPF | 749 | 131 |
| Independent SBPF root repeat | 749 | 131 |

The new native builds use SDK default section order. Their lower raw count
remains explicit; this does not replace the selected 744/175 checkpoint or its
source-specific data-order recipe. Matched original text is 924,472/1,792,208
bytes. Whole ELF identity remains false. No new VM execution is claimed.

The SBF and SBPF controls use the same unmodified Linux compiler, SDK and
maintained source, changing the normal Cargo target selection. The library
choice also changes specialization hashes, function ordering and call addresses;
the five gains do not mean only five complete compiler bodies differ between
the two native ELFs. Both builds have 960 actual function extents. A second
actual SBPF root compilation reproduces **both complete outputs**:

- Stripped: `b46dc735d6abe155ecb1eaa120894e450c04240d4ed23d530717579eec283842`
- Symbols: `f5f70a89c15b864c94e2539db72b8abc78eed91c66f27d60a10c2238037075b1`

Each launch records all SDK file hashes before compilation, and each result
checks them again. The official archive's checksum and streamed member binding
authenticate those exact inputs. SDK bytes, target libraries and compiler flags
are not patched. The standard physical-source wrapper is byte-identical to the
archived Round37 wrapper. An initial wrapper permission failure is retained:
it ran no root compiler. The working executions use an executable copy of that
same wrapper on the memory filesystem. Normal Cargo dependencies are reused;
each successful profile records exactly one actual main-crate invocation.

`primary.tar.xz` contains the exact maintained inputs. `source.tar.xz` retains
the actual workspace after the archived builder's standard Cargo manifest split.
No contract source, program namespace, generated API or source coordinates change.
Actual producers, commands, environments, SDK input maps, logs and both outputs
are retained. This archive is evidence of the recorded builds, not a generic
SDK installer. Linux target-library agreement is not historical build-host proof.

```sh
python3 -B research/pump-round37-native-linux/verify.py --counter-control
```

The standard-library-only verifier recomputes every original body hash and the
complete inventory with the **unchanged Round37 normalization**. It checks
candidate function multiplicities injectively. Four original TypeId bodies have
identical bytes; four separate candidate extents supply their four matches.
The corruption control changes one actual constant in one candidate extent:
membership counting still reports 749, while the required injective count drops
to 748. No extra scalar, register, branch, stack or pointer mask is introduced.

The five bodies' presence and multiplicities are established here; their complete
current-program indirect/data-reference closure and runtime behavior are separate
obligations. Original binaries are read-only comparison inputs and never compiler
or linker inputs. All selected artifacts, frozen scripts/workflows and progress
ledgers remain unchanged. The remaining 286 normalized windows and whole-file
identity stay open in this native research recipe.
