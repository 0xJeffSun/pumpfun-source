// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "b",
    0,
    {
      leaderboardTab: "pnl-leaderboard-tab",
      leaderboardPeriod: "pnl-leaderboard-period",
      leaderboardSort: "pnl-leaderboard-sort",
      leaderboardEarnersPeriod: "pnl-leaderboard-earners-period",
      squadsLeaderboardPeriod: "pnl-squads-leaderboard-period",
      squadsLeaderboardSort: "pnl-squads-leaderboard-sort",
      profilePortfolioPeriod: "profile-portfolio-period",
      profileCreatorRewardsPeriod: "profile-creator-rewards-period",
      profilePortfolioChartFold: "profile-portfolio-chart-fold",
    },
    "X",
    0,
    function (e, t) {
      try {
        let r = window.localStorage.getItem(e);
        return t.includes(r) ? r : null;
      } catch {
        return null;
      }
    },
    "F",
    0,
    function (e, t) {
      try {
        window.localStorage.setItem(e, t);
      } catch {}
    },
  ]);
};
