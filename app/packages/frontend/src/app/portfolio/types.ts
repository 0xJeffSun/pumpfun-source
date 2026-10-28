export const MAINNET_GENESIS_HASH =
  "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d";
export const SPL_TOKEN_PROGRAM_ID =
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export const TOKEN_2022_PROGRAM_ID =
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";

export type TokenProgram = "spl-token" | "token-2022";

export type PortfolioTokenAccount = {
  tokenAccount: string;
  mint: string;
  owner: string;
  program: TokenProgram;
  programId: string;
  rawAmount: string;
  decimals: number;
  amount: string;
  state: "uninitialized" | "initialized" | "frozen";
  isNative: boolean;
  extensions: string[];
};

export type PortfolioMintHolding = {
  mint: string;
  program: TokenProgram;
  programId: string;
  rawAmount: string;
  decimals: number;
  amount: string;
  accountCount: number;
};

export type PortfolioProgramHoldings = {
  program: TokenProgram;
  programId: string;
  contextSlot: number;
  accounts: PortfolioTokenAccount[];
  mints: PortfolioMintHolding[];
};

export type PortfolioSuccess = {
  ok: true;
  address: string;
  cluster: "mainnet-beta";
  genesisHash: string;
  commitment: "confirmed";
  observedAt: string;
  endpointHost: string;
  sol: {
    lamports: string;
    amount: string;
    contextSlot: number;
  };
  splToken: PortfolioProgramHoldings;
  token2022: PortfolioProgramHoldings;
  snapshotAtomic: false;
};

export type PortfolioFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
    retryable: boolean;
  };
};

export type PortfolioResponse = PortfolioSuccess | PortfolioFailure;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTokenAccount(value: unknown): value is PortfolioTokenAccount {
  return (
    isRecord(value) &&
    typeof value.tokenAccount === "string" &&
    typeof value.mint === "string" &&
    typeof value.owner === "string" &&
    (value.program === "spl-token" || value.program === "token-2022") &&
    typeof value.programId === "string" &&
    typeof value.rawAmount === "string" &&
    Number.isInteger(value.decimals) &&
    typeof value.amount === "string" &&
    ["uninitialized", "initialized", "frozen"].includes(String(value.state)) &&
    typeof value.isNative === "boolean" &&
    Array.isArray(value.extensions) &&
    value.extensions.every((extension) => typeof extension === "string")
  );
}

function isMintHolding(value: unknown): value is PortfolioMintHolding {
  return (
    isRecord(value) &&
    typeof value.mint === "string" &&
    (value.program === "spl-token" || value.program === "token-2022") &&
    typeof value.programId === "string" &&
    typeof value.rawAmount === "string" &&
    Number.isInteger(value.decimals) &&
    typeof value.amount === "string" &&
    Number.isSafeInteger(value.accountCount) &&
    Number(value.accountCount) > 0
  );
}

function isProgramHoldings(value: unknown): value is PortfolioProgramHoldings {
  return (
    isRecord(value) &&
    (value.program === "spl-token" || value.program === "token-2022") &&
    typeof value.programId === "string" &&
    Number.isSafeInteger(value.contextSlot) &&
    Array.isArray(value.accounts) &&
    value.accounts.every(isTokenAccount) &&
    Array.isArray(value.mints) &&
    value.mints.every(isMintHolding)
  );
}

export function isPortfolioResponse(
  value: unknown,
): value is PortfolioResponse {
  if (!isRecord(value) || typeof value.ok !== "boolean") return false;
  if (value.ok === false) {
    return (
      isRecord(value.error) &&
      typeof value.error.code === "string" &&
      typeof value.error.message === "string" &&
      typeof value.error.retryable === "boolean"
    );
  }
  return (
    typeof value.address === "string" &&
    value.cluster === "mainnet-beta" &&
    value.genesisHash === MAINNET_GENESIS_HASH &&
    value.commitment === "confirmed" &&
    typeof value.observedAt === "string" &&
    Number.isFinite(Date.parse(value.observedAt)) &&
    typeof value.endpointHost === "string" &&
    isRecord(value.sol) &&
    typeof value.sol.lamports === "string" &&
    typeof value.sol.amount === "string" &&
    Number.isSafeInteger(value.sol.contextSlot) &&
    isProgramHoldings(value.splToken) &&
    isProgramHoldings(value.token2022) &&
    value.snapshotAtomic === false
  );
}
