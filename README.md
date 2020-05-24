## Setup
docker-compose up <br/>
gulp fetchGutenbergZip <br/>
## Convert files
node scripts/RDF/rdf-to-bulk.js resources/data/documents/RDF/ > resources/data/bulk_pg.ld <br/>
cd scripts/elasticsearch/ <br/>
yarn install <br/>
./bin bulk ../../resources/data/bulk_pg.ldj -i books -t book > ../../resources/data/bulk_result.json <br/>

yarn run tests <br/>
add 127.0.0.1 gutenberg.local to hosts file <br/>

## Simple UI
cd client/ <br/>
yarn install <br/>
yarn build <br/>
