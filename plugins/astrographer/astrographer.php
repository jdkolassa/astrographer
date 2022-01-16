<?php

/**
 * 
 * @package Astrographer
 */
/*
 Plugin Name: Astrographer

 Plugin URI: https://jdkolassa.net

 Description: Imports the HYG database into Wordpress and displays the nearest stars to Earth in a filterable search. Works best with the Astrographeme theme. Requires CMB2 for metaboxes.

 Version: 1.0.0

 Author: Jeremy Kolassa

 Author URI: https://jdkolassa.net

 License: MIT

 Text Domain: astrographer
 */

 // !: Remember to use "astrog" to prefix all functions

 include_once("/includes/custom_star_type.php"); // This will create the custom post type
 include_once("/cmb2/init.php"); // main cmb2 file


 // TODO: Code to load in .csv database

 function astrog_load_data(){
     // TODO: Make sure to check if the file is present!
     $hyg = '/assets/hygdata_v3.csv';
     if(!file_exists($hyg)){
         // ? Should I have the program go and download the file from the GitHub repo, or 
         // ? would it better to just have it emit an error?

         $url = 'https://raw.githubusercontent.com/astronexus/HYG-Database/master/hygdata_v3.csv';

        // Start a cURL session
         $ch = curl_init();

        // Set where to get, where to put the download, and also to follow redirects
         $choptions = [
             CURLOPT_URL => $url,
             CURLOPT_FOLLOWLOCATION => true,
             CURLOPT_FILE => $hyg,
         ];

         curl_setopt_array($ch, $choptions);

         // Perform the cURL
         curl_exec($ch);

         // Close the cURL session - what are we, animals?
         curl_close($ch);
     }

        // Open the CSV file, but make sure not to write anything to it
        $csv = fopen($hyg, 'r');

        /**
         * * The CSV has many columns, the ones we need are:
         * ! Remember to start from O, not 1!
         * * ID = 0 (we'll use this just for the import)
         * * HIP = 1 (Hipparcos ID, we'll use this as the post ID)
         * * Proper = 6 (The "real" name of the star, as opposed to a catalog number) 
         * * Dist = 9 (Distance from Earth in parsecs; multiply by 3.262 to get lightyears)
         * * Spect = 15 (Spectral type, really important)
         * */ 
        $import = [];
        if($csv){
            while(($row = fgetcsv($csv, 0, ',', '\'', '\\')) !== FALSE){
                $import = [
                    'id' => $row[0],
                    'hip' => $row[1],
                    'name' => $row[6],
                    'distance' => $row[9],
                    'spect' => $row[15],
                ];
                // If the star doesn't have a proper name, we'll use the Hipparcos number instead
                if($import['name'] == ''){
                    $import['name'] = 'HIP ' . $import['hip'];
                }
                // Our star, Sol, has an ID of 0, but we can't use that in Wordpress
                // The HYG database goes up to 119615, so I'm setting a stupid high number to avoid conflicts
                if($import['id'] == '0'){
                    $import['id'] = '999999';
                }

                // TODO: Code to import data into the WP databases and create the posts
                // Put the importing options into a single array so I don't copy myself

                $postoptions = [
                    'ID' => $import['id'],
                    'post_title' => $import['name'],
                    'post_type' => 'astrog_star',
                    'meta_input' => [
                        'hip' => $import['hip'],
                        'distance' => (int)$import['distance'] * 3.262, // Converting parsecs to lightyears
                        'spectral_type' => $import['spect'],
                    ],
                ];

                // Check to make sure the star doesn't already exist on our site
                if(!get_post($import['id'])) {
                    wp_insert_post($postoptions);
                } else {
                    wp_update_post($postoptions, true, true);
                }

                // I'm always paranoid the array won't refresh on the next loop
                $import = [];

            };

            exit('HYG data loaded');

        } else {
            exit("Unable to open CSV file");
        }
 }

 // TODO: Create admin page with button to load data
 function astrog_admin_page(){
    ?>
        <h1><?php esc_html_e('Astrographer', 'astrog'); ?></h1>
        <p>Here you can load the HYG data into the Wordpress database. Pressing the button below will start the process, but it will take some time to do it's work.</p>
        <br>
        <?php
        if(!current_user_can("manage_options")) { ?>
            <p>You have insufficient permissions to access this feature.</p>
        <?php } else { ?>
        <form action="<?php echo admin_url( 'admin-post.php'); ?>">
            <input type="hidden" name="action" value="astrog_load_data">
            <button>Load Data</button>
        </form>

        <?php }


 }

  // TODO: Create action function to run data load button

  add_action('action_post_astrog_load_data', 'astrog_load_data');
 
