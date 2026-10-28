// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  t.exports = function (e) {
    return (
      !!e &&
      "string" != typeof e &&
      (e instanceof Array ||
        Array.isArray(e) ||
        (e.length >= 0 &&
          (e.splice instanceof Function ||
            (Object.getOwnPropertyDescriptor(e, e.length - 1) &&
              "String" !== e.constructor.name))))
    );
  };
};
