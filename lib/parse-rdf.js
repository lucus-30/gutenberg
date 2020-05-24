"use strict"

const cheerio = require("cheerio")

// publisher (value will always be Gutenberg)

module.exports = rdf => {
  const $ = cheerio.load(rdf)

  const book = {}

  book.id = +$("pgterms\\:ebook").attr("rdf:about").replace("ebooks/", "")
  book.title = $("dcterms\\:title").text()
  book.authors = $("pgterms\\:agent pgterms\\:name")
    .toArray()
    .map(elem => $(elem).text())
  book.publication_date = $("dcterms\\:issued").text()
  book.language = $("dcterms\\:language").find("rdf\\:value").text()
  book.rights = $("dcterms\\:rights").text()
  book.publisher = $("dcterms\\:publisher").text()
  book.subjects = $('[rdf\\:resource$="/LCSH"]')
    .parent()
    .find("rdf\\:value")
    .toArray()
    .map(elem => $(elem).text())

  return book
}
