import test from "node:test";
import assert from "node:assert";
import { preprocess } from "./preprocess.js";

test("empty string case", () => {
  const result = preprocess("");

  assert.deepStrictEqual(result, []);
});

test("empty string case 2", () => {
  const result = preprocess("    ");

  assert.deepStrictEqual(result, []);
});

test("lowercases and splits text into tokens", () => {
  const result = preprocess("Hi there");

  assert.deepStrictEqual(result, ["hi", "there"]);
});

test("removes punctuation at token boundaries", () => {
  const result = preprocess("Hi there! (hello)");

  assert.deepStrictEqual(result, ["hi", "there", "hello"]);
});

test("preserves programming language terms", () => {
  const result = preprocess("C# c++ .net node.js");

  assert.deepStrictEqual(result, ["c#", "c++", ".net", "node.js"]);
});

test("preserves special terms wrapped in punctuation", () => {
  const result = preprocess("(c++) .net. f#, [node.js]");

  assert.deepStrictEqual(result, ["c++", ".net", "f#", "node.js"]);
});