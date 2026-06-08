#!/bin/bash
set -e

# Run the original WordPress entrypoint in background to set up wp-config.php
# then run our setup, then hand off to CMD

# Call original entrypoint logic to generate wp-config.php
source /usr/local/bin/docker-entrypoint.sh &
ORIGINAL_PID=$!

# Wait for wp-config.php to be created
echo "Waiting for WordPress configuration..."
for i in $(seq 1 30); do
    if [ -f /var/www/html/wp-config.php ]; then
        echo "wp-config.php found."
        break
    fi
    sleep 2
done

# Kill background process; we'll launch Apache via CMD as usual
kill $ORIGINAL_PID 2>/dev/null || true

# Now re-exec the original entrypoint properly to handle Apache
exec docker-entrypoint.sh "$@"
