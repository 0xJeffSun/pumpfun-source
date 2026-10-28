import {
  getEpochFee,
  getTransferFeeConfig,
  TOKEN_2022_PROGRAM_ID,
  unpackMint,
} from "@solana/spl-token";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import BN from "bn.js";

/**
 * The Token-2022 transfer fee a quote mint charges in the current epoch (its
 * `TransferFeeConfig` entry in force; pump-programs-monorepo #65). Token-2022
 * withholds it from the receiver of every transfer, so the programs gross up
 * what must land on a curve or in a pool vault and send everything else as it
 * is: a buyer pays the curve amount plus the fee, a seller receives the curve
 * amount less it. The schedule's fees stay basis points of the curve amounts.
 */
export interface QuoteTransferFee {
  /** Basis points of every transfer, at most 10,000. */
  basisPoints: number;
  /** The most one transfer is charged, in the quote's base units. */
  maximumFee: BN;
}

const ONE_IN_BASIS_POINTS = 10_000;

/**
 * What Token-2022 withholds when `amount` is sent (`TransferFee::calculate_fee`):
 * the basis points of the amount rounded up, capped at `maximumFee`. Zero
 * without a fee.
 */
export function transferFeeWithheld(
  fee: QuoteTransferFee | null | undefined,
  amount: BN,
): BN {
  if (!fee || fee.basisPoints === 0 || amount.isZero()) {
    return new BN(0);
  }
  const raw = amount
    .muln(fee.basisPoints)
    .addn(ONE_IN_BASIS_POINTS - 1)
    .divn(ONE_IN_BASIS_POINTS);
  return BN.min(raw, fee.maximumFee);
}

/** What lands when `amount` is sent. */
export function transferFeeNetOf(
  fee: QuoteTransferFee | null | undefined,
  amount: BN,
): BN {
  return amount.sub(transferFeeWithheld(fee, amount));
}

/**
 * The amount to send so that at least `net` lands
 * (`TransferFee::calculate_pre_fee_amount`): `net` without a fee, else the
 * smallest amount up to the fee's rounding (one unit over at most while the
 * cap does not bind).
 */
export function transferFeeGrossFor(
  fee: QuoteTransferFee | null | undefined,
  net: BN,
): BN {
  if (!fee || fee.basisPoints === 0 || net.isZero()) {
    return net;
  }
  if (fee.basisPoints === ONE_IN_BASIS_POINTS) {
    return net.add(fee.maximumFee);
  }
  const denominator = ONE_IN_BASIS_POINTS - fee.basisPoints;
  const raw = net
    .muln(ONE_IN_BASIS_POINTS)
    .addn(denominator - 1)
    .divn(denominator);
  return raw.sub(net).gte(fee.maximumFee) ? net.add(fee.maximumFee) : raw;
}

/**
 * The transfer fee `quoteMint` charges in `epoch`, as the trades read it from
 * the mint: `null` for an SPL Token mint (every SOL curve) or a Token-2022
 * mint without `TransferFeeConfig`. `epoch` is the current epoch
 * (`Connection.getEpochInfo().epoch`); the issuer may schedule a new rate up
 * to two epochs ahead, which applies from its epoch on.
 *
 * @throws when the mint is malformed (`create_v2` refuses such a quote).
 */
export function quoteTransferFeeOf(
  quoteMint: PublicKey,
  mintAccountInfo: AccountInfo<Buffer>,
  epoch: number | bigint,
): QuoteTransferFee | null {
  if (!mintAccountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)) {
    return null;
  }
  const config = getTransferFeeConfig(
    unpackMint(quoteMint, mintAccountInfo, TOKEN_2022_PROGRAM_ID),
  );
  if (!config) {
    return null;
  }
  const fee = getEpochFee(config, BigInt(epoch));
  return {
    basisPoints: fee.transferFeeBasisPoints,
    maximumFee: new BN(fee.maximumFee.toString()),
  };
}
