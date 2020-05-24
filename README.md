##Setup
docker-compose up
gulp fetchGutenbergZip
##Convert files
cd scripts/elasticsearch/
node scripts/RDF/rdf-to-bulk.js resources/data/documents/RDF/ > resources/data/bulk_pg.ld
yarn install
./bin bulk ../../resources/data/bulk_pg.ldj -i books -t book > ../../resources/data/bulk_result.json

yarn run tests
add 127.0.0.1 gutenberg.local to hosts file 

##Simple UI
cd client/
yarn install
yarn build 
