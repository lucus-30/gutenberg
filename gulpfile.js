const { src, dest, watch, series, parallel } = require("gulp")
const fs = require("fs")
const path = require("path")
const download = require("gulp-download")
const unzip = require("gulp-unzip")
const untar = require("gulp-untar")
const flatten = require("gulp-flatten")

const paths = {
  documents: "./resources/documents",
}

async function fetchGutenbergZip() {
  return download(
    "https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip",
  )
    .pipe(unzip())
    .pipe(untar())
    .pipe(flatten())
    .pipe(dest(paths.documents + "/RDF"))
}

exports.fetchGutenbergZip = fetchGutenbergZip
