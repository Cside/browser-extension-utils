#!/usr/bin/env bash
set -eu

function throw() {
  printf '\033[31m%s\033[m\n' "$1"
  exit 1;
}

if [[ ! -d ./public/_locales ]]; then
  throw "Not internationalized."
fi

current_locale=$(jq -r .default_locale <./dist/manifest.json)

cp -r ./public/_locales/* ./dist/_locales/

if [[ ${1:-} ]]; then
  next_locale=$1
  if [[ ! -d ./public/_locales/$next_locale ]]; then
    throw "Locale \"$next_locale\" is not found."
  fi

  perl -i -pe "s/(\"default_locale\": )\"[\w-]+\"/\$1\"${next_locale}\"/" ./dist/manifest.json

  for dir in ./dist/_locales/*; do
    if [[ $dir != "./dist/_locales/$next_locale" ]]; then
      rm -rf "$dir"
    fi
  done
  echo "Changed: $current_locale -> $next_locale"
else
  # reset
  orig_locale=$(jq -r .default_locale <./manifest.json)
  perl -i -pe "s/(\"default_locale\": )\"\w+\"/\$1\"${orig_locale}\"/" ./dist/manifest.json
  echo "Reset: $current_locale -> $orig_locale"
fi
