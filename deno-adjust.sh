#!/bin/sh
#
## @file deno-adjust.sh
## @brief Adjusts `@onegen/optional` to work with Deno/direct TS (orig. for Node)
## @author onegen (https://github.com/onegentig)
## @date 2024-09-12
##

mkdir -p dist-deno

find src -name "*.ts" | while read FILE; do
     dist="dist-deno/$(echo "$FILE" | sed "s|src/||")"
     mkdir -p "$(dirname "$dist")"

     awk '{
          if ($0 ~ /import .* from/) {
               gsub(/\.js/, ".ts");
               if ($0 !~ /\.ts\"/) {
                    gsub(/\"$/, ".ts\"");
               }
          }
          print
     }' "$FILE" > "$dist"
     echo "$FILE -> $dist"
done

echo "Finished!"