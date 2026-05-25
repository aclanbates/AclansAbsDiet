#!/bin/bash

cd "$(dirname "$0")" || exit 1

PORT=8001
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

IP="$(ifconfig en0 2>/dev/null | awk '/inet / {print $2; exit}')"
if [ -z "$IP" ]; then
  IP="$(ifconfig en1 2>/dev/null | awk '/inet / {print $2; exit}')"
fi

STAMP="$(date +%s)"
MAC_URL="http://127.0.0.1:${PORT}/index.html?v=${STAMP}"

clear
echo "MY Diet Weekly App"
echo "==================="
echo
echo "Server folder:"
echo "$(pwd)"
echo
echo "Mac URL:"
echo "$MAC_URL"
echo
if [ -n "$IP" ]; then
  PHONE_URL="http://${IP}:${PORT}/index.html?v=${STAMP}"
  echo "iPhone URL, same Wi-Fi:"
  echo "$PHONE_URL"
  echo
else
  echo "Could not detect Wi-Fi IP. Make sure Wi-Fi is connected."
  echo
fi
echo "Keep this Terminal window open while using the app."
echo "Press Control-C in this window when you want to stop the app."
echo

open "$MAC_URL" >/dev/null 2>&1
python3 -m http.server "$PORT" --bind 0.0.0.0
