const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin,
} = require("customize-cra")

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#4E2F8C",
      "@font-family": "'Open Sans', sans-serif",
      "@layout-sider-background": "#2d3953",
    },
  }),
  addBabelPlugin([
    "babel-plugin-root-import",
    {
      rootPathSuffix: "src",
      rootPathPrefix: "~",
    },
  ]),
)
