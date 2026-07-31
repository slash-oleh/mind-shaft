#!/usr/bin/env bash
set -euo pipefail

HINT="${1:-data}"
EXT="${2:-tmp}"

mktemp -t "${HINT}.XXXXXX.${EXT}"
