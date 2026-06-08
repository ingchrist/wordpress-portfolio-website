FROM wordpress:latest

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Copy the Mint child theme into WordPress themes directory
COPY . /var/www/html/wp-content/themes/mint/

# Remove Dockerfile and render files from the theme folder (not needed there)
RUN rm -f /var/www/html/wp-content/themes/mint/Dockerfile \
           /var/www/html/wp-content/themes/mint/render.yaml \
           /var/www/html/wp-content/themes/mint/docker-entrypoint-custom.sh \
           /var/www/html/wp-content/themes/mint/.gitignore

# Copy custom entrypoint
COPY docker-entrypoint-custom.sh /usr/local/bin/docker-entrypoint-custom.sh
RUN chmod +x /usr/local/bin/docker-entrypoint-custom.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker-entrypoint-custom.sh"]
CMD ["apache2-foreground"]
