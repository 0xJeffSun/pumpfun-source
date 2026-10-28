// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Set(["heic", "heix", "hevc", "hevx", "mif1", "msf1"]),
    i = (e, t, i) =>
      Array.from(e.slice(t, i), (e) => String.fromCharCode(e)).join(""),
    r = async (e) => {
      if (!e) return null;
      let r = new Uint8Array(await e.slice(0, 12).arrayBuffer()),
        a = r
          .slice(0, 4)
          .reduce((e, t) => e + t.toString(16).padStart(2, "0"), "");
      if (r.length >= 12 && "ftyp" === i(r, 4, 8)) {
        let e = i(r, 8, 12).toLowerCase();
        if (t.has(e)) return "image/heic";
        if ("avif" === e || "avis" === e) return "image/avif";
      }
      return a.startsWith("ffd8")
        ? "image/jpeg"
        : a.startsWith("ffd9")
          ? "image/jpg"
          : a.startsWith("8950")
            ? "image/png"
            : a.startsWith("5249")
              ? "image/webp"
              : a.startsWith("4749")
                ? "image/gif"
                : a.startsWith("3c3f")
                  ? "image/svg+xml"
                  : a.startsWith("0000")
                    ? "video/mp4"
                    : a.startsWith("1a45")
                      ? "video/webm"
                      : a.startsWith("5249")
                        ? "video/avi"
                        : a.startsWith("66747970")
                          ? "video/mp4"
                          : a.startsWith("1a45")
                            ? "video/mkv"
                            : null;
    },
    a = async (e, t = 3) => (
      console.log("Starting generateVideoThumbnails"),
      new Promise((i, r) => {
        let a = document.createElement("video");
        a.preload = "metadata";
        let n = URL.createObjectURL(e);
        a.src = n;
        let s = [],
          l = 0,
          o = [];
        ((a.onloadedmetadata = () => {
          console.log("Video metadata loaded, duration:", a.duration);
          let e = a.duration;
          (console.log(
            "Time points calculated:",
            (o = Array.from({ length: t }, (i, r) => (e / (t + 1)) * (r + 1))),
          ),
            (a.currentTime = o[0]));
        }),
          (a.onseeked = () => {
            let e = document.createElement("canvas");
            ((e.width = a.videoWidth), (e.height = a.videoHeight));
            let t = e.getContext("2d");
            t
              ? (t.drawImage(a, 0, 0, e.width, e.height),
                s.push(e.toDataURL("image/jpeg", 0.8)),
                ++l < o.length
                  ? (a.currentTime = o[l])
                  : (URL.revokeObjectURL(n), i(s)))
              : (URL.revokeObjectURL(n),
                r(Error("Failed to get canvas context")));
          }),
          (a.onerror = (e) => {
            (console.error("Error loading video:", e),
              URL.revokeObjectURL(n),
              r(Error("Error loading video")));
          }));
      })
    );
  async function n(
    e,
    { suggestedBaseName: t = "coin-image", assertResponse: i } = {},
  ) {
    let a = await fetch(e, { mode: "cors" });
    if (!a.ok) throw Error(`Failed to fetch image (${a.status})`);
    i?.(a);
    let s = await a.blob(),
      l = s.type?.split(";")[0]?.trim(),
      o = new File([s], `${t}.bin`, { type: l || "application/octet-stream" }),
      c = (await r(o)) ?? l;
    if (!c?.startsWith("image/"))
      throw Error("URL did not resolve to an image");
    let m = c.split("/")[1]?.split("+")[0] || "png";
    return new File([s], `${t}.${"jpeg" === m ? "jpg" : m}`, { type: c });
  }
  e.s(["W", 0, (e) => new Blob([e]).size, "x", 0, r, "O", 0, n, "b", 0, a]);
};
