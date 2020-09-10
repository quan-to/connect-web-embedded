(function () {
  if (typeof globalThis === "object") return;
  // @ts-ignore
  Object.prototype.__defineGetter__("__alloc__", function () {
    return this;
  });
  // @ts-ignore
  __alloc__.globalThis = __alloc__;
  // @ts-ignore
  delete Object.prototype.__alloc__;
})();
