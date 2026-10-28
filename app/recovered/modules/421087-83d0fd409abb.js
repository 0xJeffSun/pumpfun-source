// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "t",
    0,
    "To pick up a column, press Enter or Space on its drag handle. While dragging, use the left and right arrow keys to move it, press Enter or Space again to drop, or Escape to cancel. Columns can also be moved, opened as a side panel, or removed from each column's menu.",
    "E",
    0,
    ({ title: e, position: t, total: a }) =>
      `Added ${e} column at position ${t} of ${a}.`,
    "s",
    0,
    ({ title: e }) => `Removed ${e} column.`,
    "k",
    0,
    ({ title: e, side: t }) => `Moved ${e} to the ${t} side panel.`,
    "o",
    0,
    ({ title: e }) =>
      `Dragging cancelled. ${e} returned to its original position.`,
    "R",
    0,
    ({ title: e, position: t, total: a }) =>
      `${e} dropped at position ${t} of ${a}.`,
    "J",
    0,
    ({ title: e, position: t, total: a }) =>
      `${e} moved to position ${t} of ${a}.`,
    "b",
    0,
    ({ title: e, position: t, total: a }) =>
      `Picked up ${e}, column ${t} of ${a}.`,
  ]);
};
