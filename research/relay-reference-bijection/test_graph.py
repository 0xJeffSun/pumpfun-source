"""Exercise graph discrimination on actual retained bytes and symmetric controls."""
from collections import Counter
import copy
import gzip
import importlib.util
import json
import os
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import tempfile
import unittest

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("relay_verify", HERE / "verify.py")
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)
g = v.load_graph()
REPO = Path(os.environ.get("RELAY_REFERENCE_REPO", HERE.parents[1]))


class ReferenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        v.check_files(REPO, g.read(HERE / "inputs.json")["files"])
        cls.p = g.parser(REPO)
        cls.original = cls.p.Elf((REPO / g.ORIGINAL).read_bytes())
        cls.candidate = cls.p.Elf(gzip.decompress((REPO / g.ARTIFACT /
                                                 "artifacts/complete492-candidate.so.gz").read_bytes()))
        cls.functions = {side: g.read(REPO / g.ARTIFACT /
            f"analysis/recovered/{side}-function-ledger.json.gz") for side in ("original", "candidate")}
        cls.result = g.derive(REPO)
        cls.nodes = cls.result["graphs"]["original"]["nodes"]
        cls.mapping = [r["candidate_index"] for r in cls.result["mapping"]]

    def modified(self, address, raw):
        section = self.candidate.containing(address)
        offset = section["offset"] + address - section["address"]
        data = bytearray(self.candidate.b)
        data[offset:offset + len(raw)] = raw
        return self.p.Elf(bytes(data))

    def rederive(self, elf):
        functions = []
        for f in self.functions["candidate"]:
            row = elf.function(f["start"], f["bytes"], f["names"])
            row["index"] = f["index"]
            functions.append(row)
        # These real mutations remain invisible to the normalized body multiset.
        self.assertEqual(Counter((f["bytes"], f["normalized_sha256"]) for f in functions),
            Counter((f["bytes"], f["normalized_sha256"]) for f in self.functions["candidate"]))
        return g.build_graph(elf, functions)

    def assert_graph_rejects(self, graph):
        with self.assertRaisesRegex(ValueError, "reference graph differs|mapped reference edge differs"):
            g.refine(self.nodes, graph["nodes"])

    def test_full_saved_certificate(self):
        self.assertEqual(v.verify(REPO), self.result["summary"])
        s = self.result["summary"]
        self.assertEqual((s["uniquely_mapped_windows"], s["raw_pairs"], s["moved_function_indices"]), (492, 317, 60))
        self.assertEqual(s["edge_counts"], {"call": 4320, "text-reference": 54})
        self.assertEqual(sum(s["fixed_reference_counts"].values()), 77)
        self.assertEqual(s["mapped_relocations"], 2327)
        self.assertEqual(s["indirect_call_instructions"], 89)
        self.assertFalse(s["indirect_targets_resolved"])
        self.assertFalse(s["whole_file_equal"])

    def test_names_and_indices_are_not_matching_keys(self):
        candidate = copy.deepcopy(self.result["graphs"]["candidate"]["nodes"])
        for n in candidate:
            n["names"] = ["uninformative_alias"]
            n["start"] = 0
            n["index"] = -1
            n["raw_sha256"] = "presentation-only"
        self.assertEqual(g.refine(self.nodes, candidate)[0], self.mapping)

    def test_permuted_node_storage(self):
        candidate = copy.deepcopy(self.result["graphs"]["candidate"]["nodes"])[::-1]
        for n in candidate:
            for kind in ("incoming", "outgoing"):
                n[kind] = [(label, 491 - j) for label, j in n[kind]]
        self.assertEqual(g.refine(self.nodes, candidate)[0], [491 - j for j in self.mapping])

    def test_symmetric_graph_is_not_arbitrarily_paired(self):
        nodes = [dict(base={"shape": 1}, incoming=[], outgoing=[]) for _ in range(2)]
        with self.assertRaisesRegex(ValueError, "ambiguous"):
            g.refine(nodes, copy.deepcopy(nodes))

    def test_class_multiplicity_mismatch(self):
        a = [dict(base={"shape": n}, incoming=[], outgoing=[]) for n in (1, 1, 2)]
        b = [dict(base={"shape": n}, incoming=[], outgoing=[]) for n in (1, 2, 2)]
        with self.assertRaisesRegex(ValueError, "reference graph differs"):
            g.refine(a, b)

    def test_wrong_mapping_rejected(self):
        wrong = self.mapping.copy()
        wrong[0], wrong[1] = wrong[1], wrong[0]
        with self.assertRaisesRegex(ValueError, "mapped node labels differ|mapped reference edge differs"):
            g.check_mapping(self.nodes, self.result["graphs"]["candidate"]["nodes"], wrong)

    def test_nonbijective_mapping_rejected(self):
        with self.assertRaisesRegex(ValueError, "not bijective"):
            g.check_mapping(self.nodes, self.result["graphs"]["candidate"]["nodes"], [0] * 492)

    def test_real_call_operand_mutation(self):
        call = next(f["direct_calls"][0] for f in self.functions["candidate"] if f["direct_calls"])
        target = next(f["start"] for f in self.functions["candidate"] if f["start"] != call["target"])
        elf = self.modified(call["pc"] + 4, struct.pack("<i", (target - call["pc"] - 8) // 8))
        self.assert_graph_rejects(self.rederive(elf))

    def test_real_relocated_text_reference_mutation(self):
        ref = next(r for f in self.functions["candidate"] for r in f["data_references"] if r["section"] == ".text")
        target = next(f["start"] for f in self.functions["candidate"] if f["start"] != ref["target"])
        elf = self.modified(ref["pc"] + 4, struct.pack("<I", target))
        self.assert_graph_rejects(self.rederive(elf))

    def test_real_code_pointer_mutation(self):
        root = next(r for r in self.result["graphs"]["candidate"]["root_witnesses"] if r["label"][0] == "data-code-pointer")
        section = self.candidate.by_name[root["label"][1]]
        target = next(f["start"] for f in self.functions["candidate"] if f["start"] != root["target_address"])
        elf = self.modified(section["address"] + root["label"][2], struct.pack("<Q", target << 32))
        self.assert_graph_rejects(self.rederive(elf))

    def test_stored_pointer_low_word_rejected(self):
        name, offset, _ = self.result["graphs"]["candidate"]["code_pointer_slots"][0]
        elf = self.modified(self.candidate.by_name[name]["address"] + offset, b"\x01\0\0\0")
        with self.assertRaisesRegex(ValueError, "stored pointer low word"):
            self.rederive(elf)

    def test_reference_to_lddw_continuation_rejected(self):
        ref = next(r for f in self.functions["candidate"] for r in f["data_references"] if r["section"] == ".text")
        continuation = next(f["start"] + at + 8 for f in self.functions["candidate"]
            for at in sorted(g.instruction_offsets(self.candidate.at(f["start"], f["bytes"])))
            if self.candidate.at(f["start"] + at, 1) == b"\x18")
        elf = self.modified(ref["pc"] + 4, struct.pack("<I", continuation))
        with self.assertRaisesRegex(ValueError, "continuation/noninstruction"):
            self.rederive(elf)

    def test_rodata_scalar_change_rejected(self):
        address = self.candidate.by_name[".rodata"]["address"]
        elf = self.modified(address, bytes([self.candidate.at(address, 1)[0] ^ 1]))
        graphs = dict(original=self.result["graphs"]["original"], candidate=self.rederive(elf))
        with self.assertRaisesRegex(ValueError, "non-code-pointer data differs: .rodata"):
            g.fixed_data(self.original, elf, graphs)

    def test_dynamic_symbol_attributes_are_labels(self):
        root = next(r for r in self.result["graphs"]["candidate"]["root_witnesses"] if r["label"][0] == "dynamic-symbol")
        data = bytearray(self.candidate.b)
        data[root["file_offset"] - 3] ^= 1  # st_other, not a normalized body byte.
        self.assert_graph_rejects(self.rederive(self.p.Elf(bytes(data))))

    def test_relocation_table_change_rejected(self):
        data = bytearray(self.candidate.b)
        r = next(r for a, r in self.candidate.relocations.items()
                 if self.candidate.containing(a)["name"] == ".text")
        data[r["record_offset"] + 8] ^= 1
        elf = self.p.Elf(bytes(data))
        with self.assertRaisesRegex(ValueError, "relocation-site correspondence differs"):
            g.relocation_correspondence(self.original, elf, self.functions, self.mapping)

    def test_minimal_relocated_cli(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            package = root / "research/relay-reference-bijection"
            package.mkdir(parents=True)
            for row in g.read(HERE / "manifest.json")["files"]:
                shutil.copyfile(HERE / row["path"], package / row["path"])
            shutil.copyfile(HERE / "manifest.json", package / "manifest.json")
            for row in g.read(HERE / "inputs.json")["files"]:
                path = root / row["path"]
                path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(REPO / row["path"], path)
            result = subprocess.run([sys.executable, "-I", str(package / "verify.py")],
                                    cwd=root, capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(json.loads(result.stdout), self.result["summary"])

    def test_changed_input_pin_rejected_before_import(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            path = root / "analyze.py"
            path.write_text("raise RuntimeError('must not import')", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "input bytes differ"):
                v.check_files(root, [dict(path="analyze.py", bytes=1, sha256="0" * 64)])

    def test_changed_certificate_rejected_after_reseal(self):
        with tempfile.TemporaryDirectory() as directory:
            package = Path(directory)
            manifest = g.read(HERE / "manifest.json")
            for row in manifest["files"]:
                shutil.copyfile(HERE / row["path"], package / row["path"])
            certificate = g.read(package / "certificate.json.gz")
            certificate["mapping"][0]["candidate_index"] = 491
            raw = gzip.compress(g.canonical(certificate).encode(), mtime=0)
            (package / "certificate.json.gz").write_bytes(raw)
            for row in manifest["files"]:
                if row["path"] == "certificate.json.gz":
                    row.update(bytes=len(raw), sha256=g.sha(raw))
            (package / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "regenerated certificate differs"):
                v.verify(REPO, package)


if __name__ == "__main__":
    unittest.main()
