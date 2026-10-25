from pathlib import Path
import shutil
R=Path.cwd();W=Path(__file__).resolve().parent;P=R/'repro/pump_amm/accumulator-order-v144'
shutil.copytree(P/'static-tool',W/'static-tool');shutil.copytree(P/'static-reference',W/'static-reference')
shutil.copy2(P/'static_compare.py',W/'static_compare.py')
