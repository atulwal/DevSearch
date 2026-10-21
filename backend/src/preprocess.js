const exceptions = new Set([
  "c#",
  "node.js",
  ".net",
  "c++",
  ".net-core",
  "asp.net",
  "f#",
  "vb.net",
]);

const peelRegex = /^[([{'" ]+|[)\]}'",;:!?.]+$/g;

function preprocess(text) {
  const tokens = text.toLowerCase().split(/\s+/);

  return tokens
    .map((token) => {
      const peeled = token.replace(peelRegex, "");

      if (exceptions.has(peeled)) {
        return peeled;
      }

      return peeled.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
    })
    .filter((token) => token.length > 0);
}

export { preprocess };
