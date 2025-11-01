// Optional: pnpm hooks file
// This file can be used to customize package installation if needed

function readPackage(pkg, context) {
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};

