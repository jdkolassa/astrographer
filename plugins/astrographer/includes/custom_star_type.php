<?php

// Create a custom post type for our stars
// ! Use "star_post_type" to avoid confusion with star spectral types

function astrog_create_star_post_type() {
    register_post_type('astrog_star',
        [
            'labels' => [
                'name' => __('Stars', 'textdomain'),
                'singular_name' => __('Star', 'textdomain'),
            ],
            'public' => true,
            'has_archive' => false,
            'rewrite' => ['slug' => 'stars'],
        ]
        );
}

add_action('init', 'astrog_create_star_post_type');

// Let's create the metaboxes with cmb2

require_once __DIR__ . '/cmb2/init.php';
add_action( 'cmb2_admin_init', 'cmb2_star_metaboxes' );

function cmb2_star_metaboxes(){

    // Init the metabox itself

    $cmb = new_cmb2_box([
        'id' => 'starbox',
        'title' => __('Astrographer Metabox', 'cmb2'),
        'object_types' => ['astrog_star'],
        'context' => 'normal',
        'priority' => 'high',
        'show_name' => 'true' // show field names

    ]);

    // Let's quickly create some text fields

    $textfields = [
        'name',
        'spectral_type',
        'distance',
    ];

    foreach($textfields as $field) {
        $cmb->add_field([
            'name' => ucfirst(str_replace("_", " ", $field)),
            'id' => 'astrog_' . $field,
            'type' => 'text',
        ]);
    }

    // CMB2 does not have a boolean field type, and I don't see an extension that adds it, so I'll use a simple radio field instead
    // ! Planets are only in the Solar System. All other similar objects are specifically exoplanets.
    // ! Astronomers get annoyed if you conflate the two.
    // TODO: Stretch goal: create planet post type and get more details

    $cmb->add_field([
        'name' => 'Exoplanets',
        'desc' => 'Does this star have exoplanets?',
        'id' => 'astrog_exoplanets',
        'type' => 'radio_inline',
        'options' => [
            'no' => __("None detected", "cmb2"), // We say none detected because we don't know if there actually are no exoplanets
            'yes' => __("Yes", "cmb2"),
        ],
        'default' => 'no',
    ]);
}