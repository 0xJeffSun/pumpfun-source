// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.Message = void 0),
    (t.Message = class {
      equals(e) {
        return this.getType().runtime.util.equals(this.getType(), this, e);
      }
      clone() {
        return this.getType().runtime.util.clone(this);
      }
      fromBinary(e, n) {
        let t = this.getType().runtime.bin,
          r = t.makeReadOptions(n);
        return (t.readMessage(this, r.readerFactory(e), e.byteLength, r), this);
      }
      fromJson(e, n) {
        let t = this.getType(),
          r = t.runtime.json,
          o = r.makeReadOptions(n);
        return (r.readMessage(t, e, o, this), this);
      }
      fromJsonString(e, n) {
        let t;
        try {
          t = JSON.parse(e);
        } catch (e) {
          throw Error(
            `cannot decode ${this.getType().typeName} from JSON: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
        return this.fromJson(t, n);
      }
      toBinary(e) {
        let n = this.getType().runtime.bin,
          t = n.makeWriteOptions(e),
          r = t.writerFactory();
        return (n.writeMessage(this, r, t), r.finish());
      }
      toJson(e) {
        let n = this.getType().runtime.json,
          t = n.makeWriteOptions(e);
        return n.writeMessage(this, t);
      }
      toJsonString(e) {
        var n;
        return JSON.stringify(
          this.toJson(e),
          null,
          null != (n = null == e ? void 0 : e.prettySpaces) ? n : 0,
        );
      }
      toJSON() {
        return this.toJson({ emitDefaultValues: !0 });
      }
      getType() {
        return Object.getPrototypeOf(this).constructor;
      }
    }));
};
