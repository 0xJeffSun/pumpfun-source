// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(352386);
  let r = t.createContext(null);
  function o(e, t) {
    if (e === t) return !0;
    if (!e || !t) return !1;
    if (Array.isArray(e)) {
      if (!Array.isArray(t) || e.length !== t.length) return !1;
      for (let r = 0; r < e.length; r++) if (!o(e[r], t[r])) return !1;
      return !0;
    }
    if (Array.isArray(t)) return !1;
    if ("object" == typeof e && "object" == typeof t) {
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let n of r) if (!t.hasOwnProperty(n) || !o(e[n], t[n])) return !1;
      return !0;
    }
    return !1;
  }
  function n(e) {
    return {
      longitude: e.center.lng,
      latitude: e.center.lat,
      zoom: e.zoom,
      pitch: e.pitch,
      bearing: e.bearing,
      padding: e.padding,
    };
  }
  function l(e, t) {
    let r = t.viewState || t,
      n = {};
    return (
      "longitude" in r &&
        "latitude" in r &&
        (r.longitude !== e.center.lng || r.latitude !== e.center.lat) &&
        (n.center = new e.center.constructor(r.longitude, r.latitude)),
      "zoom" in r && r.zoom !== e.zoom && (n.zoom = r.zoom),
      "bearing" in r && r.bearing !== e.bearing && (n.bearing = r.bearing),
      "pitch" in r && r.pitch !== e.pitch && (n.pitch = r.pitch),
      r.padding &&
        e.padding &&
        !o(r.padding, e.padding) &&
        (n.padding = r.padding),
      n
    );
  }
  let a = [
    "type",
    "source",
    "source-layer",
    "minzoom",
    "maxzoom",
    "filter",
    "layout",
  ];
  function i(e) {
    if (!e) return null;
    if ("string" == typeof e || ("toJS" in e && (e = e.toJS()), !e.layers))
      return e;
    let t = {};
    for (let r of e.layers) t[r.id] = r;
    let r = e.layers.map((e) => {
      let r = null;
      "interactive" in e && ((r = Object.assign({}, e)), delete r.interactive);
      let o = t[e.ref];
      if (o)
        for (let t of ((r = r || Object.assign({}, e)), delete r.ref, a))
          t in o && (r[t] = o[t]);
      return r || e;
    });
    return { ...e, layers: r };
  }
  let s = { version: 8, sources: {}, layers: [] },
    u = {
      minZoom: 0,
      maxZoom: 22,
      minPitch: 0,
      maxPitch: 85,
      maxBounds: [-180, -85.051129, 180, 85.051129],
      projection: "mercator",
      renderWorldCopies: !0,
    },
    c = {
      mousedown: "onMouseDown",
      mouseup: "onMouseUp",
      mouseover: "onMouseOver",
      mousemove: "onMouseMove",
      click: "onClick",
      dblclick: "onDblClick",
      mouseenter: "onMouseEnter",
      mouseleave: "onMouseLeave",
      mouseout: "onMouseOut",
      contextmenu: "onContextMenu",
      touchstart: "onTouchStart",
      touchend: "onTouchEnd",
      touchmove: "onTouchMove",
      touchcancel: "onTouchCancel",
    },
    d = {
      movestart: "onMoveStart",
      move: "onMove",
      moveend: "onMoveEnd",
      dragstart: "onDragStart",
      drag: "onDrag",
      dragend: "onDragEnd",
      zoomstart: "onZoomStart",
      zoom: "onZoom",
      zoomend: "onZoomEnd",
      rotatestart: "onRotateStart",
      rotate: "onRotate",
      rotateend: "onRotateEnd",
      pitchstart: "onPitchStart",
      pitch: "onPitch",
      pitchend: "onPitchEnd",
    },
    p = {
      wheel: "onWheel",
      boxzoomstart: "onBoxZoomStart",
      boxzoomend: "onBoxZoomEnd",
      boxzoomcancel: "onBoxZoomCancel",
      resize: "onResize",
      load: "onLoad",
      render: "onRender",
      idle: "onIdle",
      remove: "onRemove",
      data: "onData",
      styledata: "onStyleData",
      sourcedata: "onSourceData",
      error: "onError",
    },
    m = [
      "minZoom",
      "maxZoom",
      "minPitch",
      "maxPitch",
      "maxBounds",
      "projection",
      "renderWorldCopies",
    ],
    f = [
      "scrollZoom",
      "boxZoom",
      "dragRotate",
      "dragPan",
      "keyboard",
      "doubleClickZoom",
      "touchZoomRotate",
      "touchPitch",
    ];
  class h {
    constructor(e, t, r) {
      ((this._map = null),
        (this._internalUpdate = !1),
        (this._hoveredFeatures = null),
        (this._propsedCameraUpdate = null),
        (this._styleComponents = {}),
        (this._onEvent = (e) => {
          let t = this.props[p[e.type]];
          t ? t(e) : "error" === e.type && console.error(e.error);
        }),
        (this._onCameraEvent = (e) => {
          if (this._internalUpdate) return;
          e.viewState = this._propsedCameraUpdate || n(this._map.transform);
          let t = this.props[d[e.type]];
          t && t(e);
        }),
        (this._onCameraUpdate = (e) =>
          this._internalUpdate
            ? e
            : ((this._propsedCameraUpdate = n(e)), l(e, this.props))),
        (this._onPointerEvent = (e) => {
          ("mousemove" === e.type || "mouseout" === e.type) &&
            this._updateHover(e);
          let t = this.props[c[e.type]];
          t &&
            (this.props.interactiveLayerIds &&
              "mouseover" !== e.type &&
              "mouseout" !== e.type &&
              (e.features =
                this._hoveredFeatures || this._queryRenderedFeatures(e.point)),
            t(e),
            delete e.features);
        }),
        (this._MapClass = e),
        (this.props = t),
        this._initialize(r));
    }
    get map() {
      return this._map;
    }
    setProps(e) {
      let t = this.props;
      this.props = e;
      let r = this._updateSettings(e, t),
        o = this._updateSize(e),
        n = this._updateViewState(e);
      (this._updateStyle(e, t),
        this._updateStyleComponents(e),
        this._updateHandlers(e, t),
        (r || o || (n && !this._map.isMoving())) && this.redraw());
    }
    static reuse(e, t) {
      let r = h.savedMaps.pop();
      if (!r) return null;
      let o = r.map,
        n = o.getContainer();
      for (t.className = n.className; n.childNodes.length > 0; )
        t.appendChild(n.childNodes[0]);
      o._container = t;
      let l = o._resizeObserver;
      (l && (l.disconnect(), l.observe(t)),
        r.setProps({ ...e, styleDiffing: !1 }),
        o.resize());
      let { initialViewState: a } = e;
      return (
        a &&
          (a.bounds
            ? o.fitBounds(a.bounds, { ...a.fitBoundsOptions, duration: 0 })
            : r._updateViewState(a)),
        o.isStyleLoaded()
          ? o.fire("load")
          : o.once("style.load", () => o.fire("load")),
        o._update(),
        r
      );
    }
    _initialize(e) {
      let { props: t } = this,
        { mapStyle: r = s } = t,
        o = { ...t, ...t.initialViewState, container: e, style: i(r) },
        n = o.initialViewState || o.viewState || o;
      if (
        (Object.assign(o, {
          center: [n.longitude || 0, n.latitude || 0],
          zoom: n.zoom || 0,
          pitch: n.pitch || 0,
          bearing: n.bearing || 0,
        }),
        t.gl)
      ) {
        let e = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = () => (
          (HTMLCanvasElement.prototype.getContext = e),
          t.gl
        );
      }
      let l = new this._MapClass(o);
      for (let e in (n.padding && l.setPadding(n.padding),
      t.cursor && (l.getCanvas().style.cursor = t.cursor),
      (l.transformCameraUpdate = this._onCameraUpdate),
      l.on("style.load", () => {
        ((this._styleComponents = {
          light: l.getLight(),
          sky: l.getSky(),
          projection: l.getProjection?.(),
          terrain: l.getTerrain(),
        }),
          this._updateStyleComponents(this.props));
      }),
      l.on("sourcedata", () => {
        this._updateStyleComponents(this.props);
      }),
      c))
        l.on(e, this._onPointerEvent);
      for (let e in d) l.on(e, this._onCameraEvent);
      for (let e in p) l.on(e, this._onEvent);
      this._map = l;
    }
    recycle() {
      let e = this.map.getContainer().querySelector("[mapboxgl-children]");
      (e?.remove(), h.savedMaps.push(this));
    }
    destroy() {
      this._map.remove();
    }
    redraw() {
      let e = this._map;
      e.style &&
        (e._frame && (e._frame.cancel(), (e._frame = null)), e._render());
    }
    _updateSize(e) {
      let { viewState: t } = e;
      if (t) {
        let e = this._map;
        if (t.width !== e.transform.width || t.height !== e.transform.height)
          return (e.resize(), !0);
      }
      return !1;
    }
    _updateViewState(e) {
      let t = this._map,
        r = t.transform;
      if (!t.isMoving()) {
        let o = l(r, e);
        if (Object.keys(o).length > 0)
          return (
            (this._internalUpdate = !0),
            t.jumpTo(o),
            (this._internalUpdate = !1),
            !0
          );
      }
      return !1;
    }
    _updateSettings(e, t) {
      let r = this._map,
        n = !1;
      for (let l of m)
        if ((l in e || l in t) && !o(e[l], t[l])) {
          n = !0;
          let t = l in e ? e[l] : u[l],
            o = r[`set${l[0].toUpperCase()}${l.slice(1)}`];
          o?.call(r, t);
        }
      return n;
    }
    _updateStyle(e, t) {
      if (
        (e.cursor !== t.cursor &&
          (this._map.getCanvas().style.cursor = e.cursor || ""),
        e.mapStyle !== t.mapStyle)
      ) {
        let { mapStyle: t = s, styleDiffing: r = !0 } = e,
          o = { diff: r };
        ("localIdeographFontFamily" in e &&
          (o.localIdeographFontFamily = e.localIdeographFontFamily),
          this._map.setStyle(i(t), o));
      }
    }
    _updateStyleComponents({ light: e, projection: t, sky: r, terrain: n }) {
      let l = this._map,
        a = this._styleComponents;
      l.style?._loaded &&
        (e && !o(e, a.light) && ((a.light = e), l.setLight(e)),
        t &&
          !o(t, a.projection) &&
          t !== a.projection?.type &&
          ((a.projection = "string" == typeof t ? { type: t } : t),
          l.setProjection?.(a.projection)),
        r && !o(r, a.sky) && ((a.sky = r), l.setSky(r)),
        void 0 !== n &&
          !o(n, a.terrain) &&
          (!n || l.getSource(n.source)) &&
          ((a.terrain = n), l.setTerrain(n)));
    }
    _updateHandlers(e, t) {
      let r = this._map;
      for (let n of f) {
        let l = e[n] ?? !0;
        o(l, t[n] ?? !0) || (l ? r[n].enable(l) : r[n].disable());
      }
    }
    _queryRenderedFeatures(e) {
      let t = this._map,
        { interactiveLayerIds: r = [] } = this.props;
      try {
        return t.queryRenderedFeatures(e, {
          layers: r.filter(t.getLayer.bind(t)),
        });
      } catch {
        return [];
      }
    }
    _updateHover(e) {
      let { props: t } = this;
      if (
        t.interactiveLayerIds &&
        (t.onMouseMove || t.onMouseEnter || t.onMouseLeave)
      ) {
        let t = e.type,
          r = this._hoveredFeatures?.length > 0,
          o = this._queryRenderedFeatures(e.point),
          n = o.length > 0;
        (!n && r && ((e.type = "mouseleave"), this._onPointerEvent(e)),
          (this._hoveredFeatures = o),
          n && !r && ((e.type = "mouseenter"), this._onPointerEvent(e)),
          (e.type = t));
      } else this._hoveredFeatures = null;
    }
  }
  h.savedMaps = [];
  let g = [
      "setMaxBounds",
      "setMinZoom",
      "setMaxZoom",
      "setMinPitch",
      "setMaxPitch",
      "setRenderWorldCopies",
      "setProjection",
      "setStyle",
      "addSource",
      "removeSource",
      "addLayer",
      "removeLayer",
      "setLayerZoomRange",
      "setFilter",
      "setPaintProperty",
      "setLayoutProperty",
      "setLight",
      "setTerrain",
      "setFog",
      "remove",
    ],
    y = "u" > typeof document ? t.useLayoutEffect : t.useEffect,
    b = t.createContext(null),
    v = t.forwardRef(function (o, n) {
      let l = (0, t.useContext)(r),
        [a, i] = (0, t.useState)(null),
        s = (0, t.useRef)(),
        { current: u } = (0, t.useRef)({ mapLib: null, map: null });
      ((0, t.useEffect)(() => {
        let t,
          r = o.mapLib,
          n = !0;
        return (
          Promise.resolve(r || e.A(426141))
            .then((e) => {
              if (!n) return;
              if (!e) throw Error("Invalid mapLib");
              let r = "Map" in e ? e : e.default;
              if (!r.Map) throw Error("Invalid mapLib");
              (!(function (e, t) {
                let {
                  RTLTextPlugin: r,
                  maxParallelImageRequests: o,
                  workerCount: n,
                  workerUrl: l,
                } = t;
                if (
                  r &&
                  e.getRTLTextPluginStatus &&
                  "unavailable" === e.getRTLTextPluginStatus()
                ) {
                  let { pluginUrl: t, lazy: o = !0 } =
                    "string" == typeof r ? { pluginUrl: r } : r;
                  e.setRTLTextPlugin(
                    t,
                    (e) => {
                      e && console.error(e);
                    },
                    o,
                  );
                }
                (void 0 !== o && e.setMaxParallelImageRequests(o),
                  void 0 !== n && e.setWorkerCount(n),
                  void 0 !== l && e.setWorkerUrl(l));
              })(r, o),
                o.reuseMaps && (t = h.reuse(o, s.current)),
                t || (t = new h(r.Map, o, s.current)),
                (u.map = (function (e) {
                  if (!e) return null;
                  let t = e.map,
                    r = { getMap: () => t };
                  for (let e of (function (e) {
                    let t = new Set(),
                      r = e;
                    for (; r; ) {
                      for (let o of Object.getOwnPropertyNames(r))
                        "_" !== o[0] &&
                          "function" == typeof e[o] &&
                          "fire" !== o &&
                          "setEventedParent" !== o &&
                          t.add(o);
                      r = Object.getPrototypeOf(r);
                    }
                    return Array.from(t);
                  })(t))
                    e in r || g.includes(e) || (r[e] = t[e].bind(t));
                  return r;
                })(t)),
                (u.mapLib = r),
                i(t),
                l?.onMapMount(u.map, o.id));
            })
            .catch((e) => {
              let { onError: t } = o;
              t
                ? t({
                    type: "error",
                    target: null,
                    originalEvent: null,
                    error: e,
                  })
                : console.error(e);
            }),
          () => {
            ((n = !1),
              t &&
                (l?.onMapUnmount(o.id),
                o.reuseMaps ? t.recycle() : t.destroy()));
          }
        );
      }, []),
        y(() => {
          a && a.setProps(o);
        }),
        (0, t.useImperativeHandle)(n, () => u.map, [a]));
      let c = (0, t.useMemo)(
        () => ({
          position: "relative",
          width: "100%",
          height: "100%",
          ...o.style,
        }),
        [o.style],
      );
      return t.createElement(
        "div",
        { id: o.id, ref: s, style: c },
        a &&
          t.createElement(
            b.Provider,
            { value: u },
            t.createElement(
              "div",
              { "mapboxgl-children": "", style: { height: "100%" } },
              o.children,
            ),
          ),
      );
    });
  var x = e.i(231332);
  let _ =
    /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
  function w(e, t) {
    if (!e || !t) return;
    let r = e.style;
    for (let e in t) {
      let o = t[e];
      Number.isFinite(o) && !_.test(e) ? (r[e] = `${o}px`) : (r[e] = o);
    }
  }
  function C(e, t) {
    if (e === t) return null;
    let r = S(e),
      o = S(t),
      n = [];
    for (let e of o) r.has(e) || n.push(e);
    for (let e of r) o.has(e) || n.push(e);
    return 0 === n.length ? null : n;
  }
  function S(e) {
    return new Set(e ? e.trim().split(/\s+/) : []);
  }
  let L = (0, t.memo)(
    (0, t.forwardRef)((e, r) => {
      var o;
      let n,
        l,
        a,
        i,
        { map: s, mapLib: u } = (0, t.useContext)(b),
        c = (0, t.useRef)({ props: e }),
        d = (0, t.useMemo)(() => {
          let r = !1;
          t.Children.forEach(e.children, (e) => {
            e && (r = !0);
          });
          let o = { ...e, element: r ? document.createElement("div") : void 0 },
            n = new u.Marker(o);
          return (
            n.setLngLat([e.longitude, e.latitude]),
            n.getElement().addEventListener("click", (e) => {
              c.current.props.onClick?.({
                type: "click",
                target: n,
                originalEvent: e,
              });
            }),
            n.on("dragstart", (e) => {
              ((e.lngLat = d.getLngLat()), c.current.props.onDragStart?.(e));
            }),
            n.on("drag", (e) => {
              ((e.lngLat = d.getLngLat()), c.current.props.onDrag?.(e));
            }),
            n.on("dragend", (e) => {
              ((e.lngLat = d.getLngLat()), c.current.props.onDragEnd?.(e));
            }),
            n
          );
        }, []);
      (0, t.useEffect)(
        () => (
          d.addTo(s.getMap()),
          () => {
            d.remove();
          }
        ),
        [],
      );
      let {
        longitude: p,
        latitude: m,
        offset: f,
        style: h,
        draggable: g = !1,
        popup: y = null,
        rotation: v = 0,
        rotationAlignment: _ = "auto",
        pitchAlignment: S = "auto",
      } = e;
      ((0, t.useEffect)(() => {
        w(d.getElement(), h);
      }, [h]),
        (0, t.useImperativeHandle)(r, () => d, []));
      let L = c.current.props;
      ((d.getLngLat().lng !== p || d.getLngLat().lat !== m) &&
        d.setLngLat([p, m]),
        f &&
          ((o = d.getOffset()),
          (n = Array.isArray(o) ? o[0] : o ? o.x : 0),
          (l = Array.isArray(o) ? o[1] : o ? o.y : 0),
          (a = Array.isArray(f) ? f[0] : f ? f.x : 0),
          (i = Array.isArray(f) ? f[1] : f ? f.y : 0),
          n !== a || l !== i) &&
          d.setOffset(f),
        d.isDraggable() !== g && d.setDraggable(g),
        d.getRotation() !== v && d.setRotation(v),
        d.getRotationAlignment() !== _ && d.setRotationAlignment(_),
        d.getPitchAlignment() !== S && d.setPitchAlignment(S),
        d.getPopup() !== y && d.setPopup(y));
      let M = C(L.className, e.className);
      if (M) for (let e of M) d.toggleClassName(e);
      return (
        (c.current.props = e),
        (0, x.createPortal)(e.children, d.getElement())
      );
    }),
  );
  function M(e, r, o, n) {
    let l = (0, t.useContext)(b),
      a = (0, t.useMemo)(() => e(l), []);
    return (
      (0, t.useEffect)(() => {
        let e = "function" == typeof r && "function" == typeof o ? r : null,
          t = "function" == typeof o ? o : "function" == typeof r ? r : null,
          { map: i } = l;
        return (
          !i.hasControl(a) &&
            (i.addControl(a, (n || o || r)?.position), e && e(l)),
          () => {
            (t && t(l), i.hasControl(a) && i.removeControl(a));
          }
        );
      }, []),
      a
    );
  }
  function E(e, t) {
    if (!e) throw Error(t);
  }
  (e.s(["f", 0, L], 928011),
    (0, t.memo)(
      (0, t.forwardRef)((e, r) => {
        let { map: n, mapLib: l } = (0, t.useContext)(b),
          a = (0, t.useMemo)(() => document.createElement("div"), []),
          i = (0, t.useRef)({ props: e }),
          s = (0, t.useMemo)(() => {
            let t = { ...e },
              r = new l.Popup(t);
            return (
              r.setLngLat([e.longitude, e.latitude]),
              r.once("open", (e) => {
                i.current.props.onOpen?.(e);
              }),
              r
            );
          }, []);
        if (
          ((0, t.useEffect)(() => {
            let e = (e) => {
              i.current.props.onClose?.(e);
            };
            return (
              s.on("close", e),
              s.setDOMContent(a).addTo(n.getMap()),
              () => {
                (s.off("close", e), s.isOpen() && s.remove());
              }
            );
          }, []),
          (0, t.useEffect)(() => {
            w(s.getElement(), e.style);
          }, [e.style]),
          (0, t.useImperativeHandle)(r, () => s, []),
          s.isOpen())
        ) {
          let t = i.current.props;
          ((s.getLngLat().lng !== e.longitude ||
            s.getLngLat().lat !== e.latitude) &&
            s.setLngLat([e.longitude, e.latitude]),
            e.offset && !o(t.offset, e.offset) && s.setOffset(e.offset),
            (t.anchor !== e.anchor || t.maxWidth !== e.maxWidth) &&
              ((s.options.anchor = e.anchor), s.setMaxWidth(e.maxWidth)));
          let r = C(t.className, e.className);
          if (r) for (let e of r) s.toggleClassName(e);
          i.current.props = e;
        }
        return (0, x.createPortal)(e.children, a);
      }),
    ),
    (0, t.memo)(function (e) {
      let r = M(({ mapLib: t }) => new t.AttributionControl(e), {
        position: e.position,
      });
      return (
        (0, t.useEffect)(() => {
          w(r._container, e.style);
        }, [e.style]),
        null
      );
    }),
    (0, t.memo)(function (e) {
      let r = M(
        ({ mapLib: t }) =>
          new t.FullscreenControl({
            container: e.containerId && document.getElementById(e.containerId),
          }),
        { position: e.position },
      );
      return (
        (0, t.useEffect)(() => {
          w(r._controlContainer, e.style);
        }, [e.style]),
        null
      );
    }),
    (0, t.memo)(
      (0, t.forwardRef)(function (e, r) {
        let o = (0, t.useRef)({ props: e }),
          n = M(
            ({ mapLib: t }) => {
              let r = new t.GeolocateControl(e),
                n = r._setupUI;
              return (
                (r._setupUI = () => {
                  r._container.hasChildNodes() || n();
                }),
                r.on("geolocate", (e) => {
                  o.current.props.onGeolocate?.(e);
                }),
                r.on("error", (e) => {
                  o.current.props.onError?.(e);
                }),
                r.on("outofmaxbounds", (e) => {
                  o.current.props.onOutOfMaxBounds?.(e);
                }),
                r.on("trackuserlocationstart", (e) => {
                  o.current.props.onTrackUserLocationStart?.(e);
                }),
                r.on("trackuserlocationend", (e) => {
                  o.current.props.onTrackUserLocationEnd?.(e);
                }),
                r
              );
            },
            { position: e.position },
          );
        return (
          (o.current.props = e),
          (0, t.useImperativeHandle)(r, () => n, []),
          (0, t.useEffect)(() => {
            w(n._container, e.style);
          }, [e.style]),
          null
        );
      }),
    ),
    (0, t.memo)(function (e) {
      let r = M(({ mapLib: t }) => new t.NavigationControl(e), {
        position: e.position,
      });
      return (
        (0, t.useEffect)(() => {
          w(r._container, e.style);
        }, [e.style]),
        null
      );
    }),
    (0, t.memo)(function (e) {
      let r = M(({ mapLib: t }) => new t.ScaleControl(e), {
          position: e.position,
        }),
        o = (0, t.useRef)(e),
        n = o.current;
      o.current = e;
      let { style: l } = e;
      return (
        void 0 !== e.maxWidth &&
          e.maxWidth !== n.maxWidth &&
          (r.options.maxWidth = e.maxWidth),
        void 0 !== e.unit && e.unit !== n.unit && r.setUnit(e.unit),
        (0, t.useEffect)(() => {
          w(r._container, l);
        }, [l]),
        null
      );
    }),
    (0, t.memo)(function (e) {
      let r = M(({ mapLib: t }) => new t.TerrainControl(e), {
        position: e.position,
      });
      return (
        (0, t.useEffect)(() => {
          w(r._container, e.style);
        }, [e.style]),
        null
      );
    }),
    (0, t.memo)(function (e) {
      let r = M(({ mapLib: t }) => new t.LogoControl(e), {
        position: e.position,
      });
      return (
        (0, t.useEffect)(() => {
          w(r._container, e.style);
        }, [e.style]),
        null
      );
    }));
  let j = 0;
  e.s(
    [
      "f",
      0,
      function (e) {
        let r = (0, t.useContext)(b).map.getMap(),
          n = (0, t.useRef)(e),
          [, l] = (0, t.useState)(0),
          a = (0, t.useMemo)(() => e.id || `jsx-source-${j++}`, []);
        (0, t.useEffect)(() => {
          if (r) {
            let e = () => setTimeout(() => l((e) => e + 1), 0);
            return (
              r.on("styledata", e),
              e(),
              () => {
                if (
                  (r.off("styledata", e),
                  r.style && r.style._loaded && r.getSource(a))
                ) {
                  let e = r.getStyle()?.layers;
                  if (e) for (let t of e) t.source === a && r.removeLayer(t.id);
                  r.removeSource(a);
                }
              }
            );
          }
        }, [r]);
        let i = r && r.style && r.getSource(a);
        return (
          i
            ? !(function (e, t, r) {
                (E(t.id === r.id, "source id changed"),
                  E(t.type === r.type, "source type changed"));
                let n = "",
                  l = 0;
                for (let e in t)
                  "children" !== e &&
                    "id" !== e &&
                    !o(r[e], t[e]) &&
                    ((n = e), l++);
                if (!l) return;
                let a = t.type;
                if ("geojson" === a) e.setData(t.data);
                else if ("image" === a)
                  e.updateImage({ url: t.url, coordinates: t.coordinates });
                else
                  switch (n) {
                    case "coordinates":
                      e.setCoordinates?.(t.coordinates);
                      break;
                    case "url":
                      e.setUrl?.(t.url);
                      break;
                    case "tiles":
                      e.setTiles?.(t.tiles);
                      break;
                    default:
                      console.warn(`Unable to update <Source> prop: ${n}`);
                  }
              })(i, e, n.current)
            : (i = (function (e, t, r) {
                if (e.style && e.style._loaded) {
                  let o = { ...r };
                  return (
                    delete o.id,
                    delete o.children,
                    e.addSource(t, o),
                    e.getSource(t)
                  );
                }
                return null;
              })(r, a, e)),
          (n.current = e),
          (i &&
            t.Children.map(
              e.children,
              (e) => e && (0, t.cloneElement)(e, { source: a }),
            )) ||
            null
        );
      },
    ],
    891974,
  );
  let P = 0;
  (e.s(
    [
      "f",
      0,
      function (e) {
        let r = (0, t.useContext)(b).map.getMap(),
          n = (0, t.useRef)(e),
          [, l] = (0, t.useState)(0),
          a = (0, t.useMemo)(() => e.id || `jsx-layer-${P++}`, []);
        if (
          ((0, t.useEffect)(() => {
            if (r) {
              let e = () => l((e) => e + 1);
              return (
                r.on("styledata", e),
                e(),
                () => {
                  (r.off("styledata", e),
                    r.style &&
                      r.style._loaded &&
                      r.getLayer(a) &&
                      r.removeLayer(a));
                }
              );
            }
          }, [r]),
          r && r.style && r.getLayer(a))
        )
          try {
            !(function (e, t, r, n) {
              if (
                (E(r.id === n.id, "layer id changed"),
                E(r.type === n.type, "layer type changed"),
                "custom" === r.type || "custom" === n.type)
              )
                return;
              let {
                layout: l = {},
                paint: a = {},
                filter: i,
                minzoom: s,
                maxzoom: u,
                beforeId: c,
              } = r;
              if ((c !== n.beforeId && e.moveLayer(t, c), l !== n.layout)) {
                let r = n.layout || {};
                for (let n in l)
                  o(l[n], r[n]) || e.setLayoutProperty(t, n, l[n]);
                for (let o in r)
                  l.hasOwnProperty(o) || e.setLayoutProperty(t, o, void 0);
              }
              if (a !== n.paint) {
                let r = n.paint || {};
                for (let n in a)
                  o(a[n], r[n]) || e.setPaintProperty(t, n, a[n]);
                for (let o in r)
                  a.hasOwnProperty(o) || e.setPaintProperty(t, o, void 0);
              }
              (o(i, n.filter) || e.setFilter(t, i),
                (s !== n.minzoom || u !== n.maxzoom) &&
                  e.setLayerZoomRange(t, s, u));
            })(r, a, e, n.current);
          } catch (e) {
            console.warn(e);
          }
        else if (
          r.style &&
          r.style._loaded &&
          (!("source" in e) || r.getSource(e.source))
        ) {
          let t = { ...e, id: a };
          (delete t.beforeId, r.addLayer(t, e.beforeId));
        }
        return ((n.current = e), null);
      },
    ],
    297053,
  ),
    e.s([], 290568),
    e.s(["f", 0, v], 310430));
};
