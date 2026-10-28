# Preparation history

The first packaging invocation found that its runtime destination directory had
not been created and stopped before copying inputs. A separately invoked offline
check then stopped on the missing manifest. Neither invocation compiled or ran a
target; no failed run is represented as a passing check. The directory was
created before packaging again. Both original diagnostics are retained below.

```
FileNotFoundError: runtime/input-bindings.json (destination directory absent)
FileNotFoundError: manifest.json (packet not yet sealed)
```
