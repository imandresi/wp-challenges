import path from "path";
import {createRequire} from 'node:module';
import DependencyExtractionWebpackPlugin from "@wordpress/dependency-extraction-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const require = createRequire(import.meta.url);

export default {
    entry: {
        app: path.resolve(process.cwd(), "src/", "index.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(process.cwd(), "assets/plugins/contact-form-toolbar"),
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|svg)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                    limit: 150000,
                    name: "assets/images/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new DependencyExtractionWebpackPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
};