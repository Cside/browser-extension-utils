#!/usr/bin/env bash

vi ./package.json
version="v$(node -p -e 'require("./package.json").version')"

set +x
git tag "$version"
git push --tags
gh release create "$version" --generate-notes --title "$version"
