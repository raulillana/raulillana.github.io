#!/bin/bash

# Create directory if it doesn't exist
mkdir -p res/imgs

# Function to extract domain from URL
get_domain() {
    url=$1
    # Remove protocol and www. prefix, then get domain
    domain=$(echo "$url" | sed -E 's|^https?://||' | sed -E 's|^www\.||' | cut -d'/' -f1)
    echo "$domain"
}

# Count total lines in CSV (excluding header)
total_lines=$(tail -n +2 res/projects.csv | wc -l)
current=0

# Read CSV file line by line, skip header
tail -n +2 res/projects.csv | while IFS=, read -r tech type url || [ -n "$tech" ]; do
    # Clean the URL (remove quotes and trailing slashes if present)
    url=$(echo "$url" | tr -d '"' | sed 's|/$||')
    
    # Get domain for filename
    domain=$(get_domain "$url")
    filename="res/imgs/${domain}.png"
    
    # Increment counter
    ((current++))
    
    #echo "[$current/$total_lines] Downloading screenshot for $domain..."
    
    # Use thum.io for screenshots
    curl -s "https://image.thum.io/get/width/500/height/300/png/${url}" -o "$filename"
    
    # Check if download was successful
    if [ -f "$filename" ] && [ -s "$filename" ]; then
        echo "[$current/$total_lines] Successfully downloaded $domain"
    else
        echo "\n → Failed to download $domain\n\n"
    fi
    
    # Add small delay to respect rate limits
    sleep 1
done

echo "---------------------------"
echo "All screenshots downloaded!"
