#!/bin/bash

# Directory to process; defaults to current directory if none is provided
DIRECTORY=${1:-.}

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "cwebp could not be found, please install it with 'brew install webp'"
    exit 1
fi

# Loop through all PNG files in the directory
for file in "$DIRECTORY"/*.png; do
    # Check if there are any PNG files
    if [[ ! -f "$file" ]]; then
        echo "No PNG files found in the directory."
        exit 1
    fi

    # Convert PNG to WebP, maintaining transparency
    output="${file%.png}.webp"
    cwebp -q 80 "$file" -o "$output"

    echo "Converted $file to $output"
done

echo "All PNG files have been converted to WebP."

