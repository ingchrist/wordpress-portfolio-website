<?php
/**
 * Enqueue styles and scripts for Mint child theme
 */

function mint_enqueue_styles() {

    // Parent theme styles
    wp_enqueue_style(
        'hello-biz-parent',
        get_template_directory_uri() . '/style.css'
    );

    // Child theme main stylesheet
    wp_enqueue_style(
        'mint-style',
        get_stylesheet_directory_uri() . '/style.css',
        ['hello-biz-parent']
    );

    // Custom stylesheet (loads after Elementor and other styles)
    $custom_css = get_stylesheet_directory() . '/assets/css/custom-styles.css';
    if ( file_exists( $custom_css ) ) {
        wp_enqueue_style(
            'mint-custom',
            get_stylesheet_directory_uri() . '/assets/css/custom-styles.css',
            [],
            filemtime( $custom_css )
        );
    }
}
add_action( 'elementor/frontend/after_enqueue_styles', 'mint_enqueue_styles' );


/**
 * Enqueue custom JavaScript (properly localized)
 */
function mint_enqueue_custom_scripts() {
    $custom_js = get_stylesheet_directory() . '/assets/js/mint-js.js';

    if ( file_exists( $custom_js ) ) {
        wp_enqueue_script(
            'mint-custom-js',
            get_stylesheet_directory_uri() . '/assets/js/mint-js.js',
            ['jquery'],
            filemtime( $custom_js ),
            true // Load in footer
        );

        // ✅ Localize AFTER enqueuing the script
        wp_localize_script( 'mint-custom-js', 'mintData', array(
            'siteUrl' => trailingslashit( get_site_url() ),
        ));
    }
}
add_action( 'wp_enqueue_scripts', 'mint_enqueue_custom_scripts' );


/**
 * Shortcode: [year] → outputs current year
 */
function mint_current_year_shortcode() {
    return date( 'Y' );
}
add_shortcode( 'year', 'mint_current_year_shortcode' );
