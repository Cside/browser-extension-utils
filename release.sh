#!/usr/bin/env bash

# TODO: package.json#version を書き換え忘れるというミスを犯した
# package.json#version か tag のどっちかは自動化した方がいいかもしれない...
vi ./package.json
version="v$(node -p -e 'require("./package.json").version')"

set +x
git tag "$version"
git push --tags
gh release create "$version" --generate-notes --title "$version"

open "https://github.com/Cside/browser-extension-utils/releases/tag/$version"
