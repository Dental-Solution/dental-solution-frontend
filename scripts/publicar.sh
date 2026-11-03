#!/bin/sh
# Prepara os arquivos estáticos e evita reutilizar estilos antigos em cache.
set -eu
cd "$(dirname "$0")/.."

rm -rf dist
mkdir -p dist/css dist/js
cp -R index.html paginas dist/
mkdir -p dist/img
cp -R img/web dist/img/
rm -f dist/img/web/home-preview.png

# A ordem é a mesma de css/estilo.css. Os originais permanecem separados.
cat css/base.css css/layout.css css/componentes.css \
    css/formularios.css css/conteudo.css css/responsivo.css > dist/css/estilo.css
hash=$(sha256sum dist/css/estilo.css | cut -c 1-12)
css="estilo.$hash.css"
mv dist/css/estilo.css "dist/css/$css"

for pagina in dist/index.html dist/paginas/*.html; do
    sed -E "s@css/estilo\.css(\?v=[a-zA-Z0-9-]+)?@css/$css@g" "$pagina" > "$pagina.tmp"
    mv "$pagina.tmp" "$pagina"
done

for origem in js/*.js; do
    nome=$(basename "$origem" .js)
    hash=$(sha256sum "$origem" | cut -c 1-12)
    arquivo="$nome.$hash.js"
    cp "$origem" "dist/js/$arquivo"
    for pagina in dist/index.html dist/paginas/*.html; do
        sed "s@js/$nome\.js@js/$arquivo@g" "$pagina" > "$pagina.tmp"
        mv "$pagina.tmp" "$pagina"
    done
done

printf 'Site preparado em dist/ com CSS e JavaScript versionados.\n'
