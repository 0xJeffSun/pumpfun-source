import BN from "bn.js";

import { netOfTransferFee, QuoteTransferFee } from "./transferFee";
import { WithdrawResult } from "./types";

export function withdraw(
  lpAmount: BN,
  slippage: number,
  baseReserve: BN,
  quoteReserve: BN,
  totalLpTokens: BN,
  /**
   * The quote mint's Token-2022 transfer fee (`LiquiditySolanaState.quoteTransferFee`): the
   * pool pays its share as it is, and `quote` / `minQuote` are what lands in the wallet.
   */
  quoteTransferFee?: QuoteTransferFee | null,
): WithdrawResult {
  if (lpAmount.isZero() || totalLpTokens.isZero()) {
    throw new Error("LP amount or total LP tokens cannot be zero.");
  }

  // Calculate the base and quote amounts
  const base = baseReserve.mul(lpAmount).div(totalLpTokens);
  const quote = netOfTransferFee(
    quoteTransferFee,
    quoteReserve.mul(lpAmount).div(totalLpTokens),
  );

  // Calculate the minimum amounts considering slippage
  const scaleFactor = new BN(1_000_000_000);
  const slippageFactor = new BN((1 - slippage / 100) * 1_000_000_000);
  const minBase = base.mul(slippageFactor).div(scaleFactor);
  const minQuote = quote.mul(slippageFactor).div(scaleFactor);

  return {
    base,
    quote,
    minBase,
    minQuote,
  };
}
