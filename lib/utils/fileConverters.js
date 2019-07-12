"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var arrayBufferToStoreValue = exports.arrayBufferToStoreValue = function arrayBufferToStoreValue(arrayBuffer) {
  var view = new DataView(arrayBuffer);
  var value = [];
  for (var i = 0; i < arrayBuffer.byteLength; ++i) {
    value.push(view.getUint8(i));
  }
  return value;
};

var storeValueToArrayBuffer = exports.storeValueToArrayBuffer = function storeValueToArrayBuffer(value) {
  var arrayBuffer = new ArrayBuffer(value.length);
  var view = new DataView(arrayBuffer);
  for (var i = 0; i < value.length; ++i) {
    view.setUint8(i, value[i]);
  }
  return arrayBuffer;
};