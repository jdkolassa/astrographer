const webpack_1 = require("webpack");

export const webpack = ({ config, target }) => {
  if (target !== "server") {
    config.devtool = "eval-cheap-source-map";
    config.plugins.push(new webpack_1.IgnorePlugin(/fs/, /stellar-classification-parser/));
  }
  
};