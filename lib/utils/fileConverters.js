"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeValueToArrayBuffer = exports.arrayBufferToStoreValue = void 0;

var arrayBufferToStoreValue = function arrayBufferToStoreValue(arrayBuffer) {
  var view = new DataView(arrayBuffer);
  var value = [];

  for (var i = 0; i < arrayBuffer.byteLength; ++i) {
    value.push(view.getUint8(i));
  }

  return value;
};

exports.arrayBufferToStoreValue = arrayBufferToStoreValue;

var storeValueToArrayBuffer = function storeValueToArrayBuffer(value) {
  var arrayBuffer = new ArrayBuffer(value.length);
  var view = new DataView(arrayBuffer);

  for (var i = 0; i < value.length; ++i) {
    view.setUint8(i, value[i]);
  }

  return arrayBuffer;
};

exports.storeValueToArrayBuffer = storeValueToArrayBuffer;