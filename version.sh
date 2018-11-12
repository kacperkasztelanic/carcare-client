#!/bin/bash

cat <<End-of-message
{
  "versionHash": "$(git rev-parse HEAD)",
  "versionDate": "$(git log --pretty='format:%cd' --date=iso8601 -1)",
  "tags": "$(git describe HEAD --tags)"
}
End-of-message
