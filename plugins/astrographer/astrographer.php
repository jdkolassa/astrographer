<?php

/**
 * 
 * @package Astrographer
 */
/*
 Plugin Name: Astrographer

 Plugin URI: https://github.com/jdkolassa/astrographer

 Description: Imports the HYG database into Wordpress and displays the nearest stars to Earth in a filterable search. Works best with the Astrographeme theme. Requires CMB2 for metaboxes.

 Version: 1.0.0

 Author: Jeremy Kolassa

 Author URI: https://jdkolassa.net

 License: Creative Commons Attribution-ShareAlike 2.5 Generic (CC BY-SA 2.5) (https://creativecommons.org/licenses/by-sa/2.5/)

 Text Domain: astrographer
 */

 // !: Remember to use "astrog" to prefix all functions

 require_once __DIR__ . "./includes/custom_star_type.php"; // This will create the custom post type
 require_once __DIR__ . "./cmb2/init.php"; // main cmb2 file


 // TODO: Code to load in .csv database

 add_action('action_post_astrog_load_data', 'astrog_load_data');

 function astrog_load_data(){
     
     // ! Make sure to check if the file is present!
     $hyg = get_home_path() . 'wp-content/plugins/astrographer/assets/hygdata_demo_subset.csv'; // plugins\astrographer\assets\hygdata_v3.csv
     if(!file_exists($hyg)){
         wp_die('HYG data missing!');
     }
     // TODO: Later, add code to use the GitHub API to download the data if it's not present

        /**
         * * The CSV has many columns, the ones we need are:
         * ? Are CSV columns zero-indexed?
         * * ID = 0 (we'll use this just for the import)
         * * HIP = 1 (Hipparcos ID, we'll use this as the post ID)
         * * Proper = 6 (The "real" name of the star, as opposed to a catalog number) 
         * * Dist = 9 (Distance from Earth in parsecs; multiply by 3.262 to get lightyears)
         * * Spect = 15 (Spectral type, really important)
         * */ 
        if (($handle = fopen($hyg, "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 9999, ",")) !== FALSE) {
            set_time_limit(2400);
              $row_data = [
                    'post_title' => $data[6],
                    'post_type' => 'astrog_star',
                    'post_status' => 'publish',
                    'check' => $data[0],
                    'meta_input' => [
                      'hip' => $data[1],
                      'distance' => round((float)$data[9] * 3.262, 2),
                      'spect' => $data[15],
                    ],
                ];

                if($row_data['check'] == 0){
                    $row_data['check'] = 1;
                }
        
                if(empty($row_data['post_title'])){
                  if(empty($data[1]) && !empty($data[5])){
                    $row_data['post_title'] = $data[5];
                  } elseif (!empty($data[1])){
                    $row_data['post_title'] = "HIP " . $data[1];
                  } else {
                    $row_data['post_title'] = $data[4];
                  }
                }

                if(empty($row_data['meta_input']['hip'])){
                    $row_data['meta_input']['hip'] = null;
                }

                // Assign luminosity class and hue
                $spect = $row_data['meta_input']['spect'];

                switch($spect){
                    case preg_match('/O/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "blue";
                        break;
                    case preg_match('/B/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "blue white";
                        break;
                    case preg_match('/A/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "white";
                        break;
                    case preg_match('/F/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "yellow white";
                        break;
                    case preg_match('/G/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "yellow";
                        break;
                    case preg_match('/K/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "orange";
                        break;
                    case preg_match('/(M|m)/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "red";
                        break;
                    case preg_match('/D/', $spect):
                        $row_data['meta_input']['astrog_hue'] = "degenerate";
                        break;
                }

                switch($spect){
                    case preg_match('/I{3}/', $spect):
                        $row_data['meta_input']['astrog_lumos'] = "giant";
                        break;
                    case preg_match('/I{2}/', $spect):
                        $row_data['meta_input']['astrog_lumos'] = "bright";
                        break;
                    case preg_match('/I(?=V)/', $spect):
                        $row_data['meta_input']['astrog_lumos'] = "subgiant";
                        break;
                    case preg_match('/V/', $spect):
                        $row_data['meta_input']['astrog_lumos'] = "dwarf";
                        break;
                    case preg_match('/I{1}/', $spect):
                        $row_data['meta_input']['astrog_lumos'] = "supergiant";
                        break;
                    case preg_match('/0|Ia\+/', $spect):
                        $row_data['meta_input']['astrog_lumos'] =
                        "hypergiant";
                        break;
                    case preg_match('/^sd/', $spect):
                        $row_data['meta_input']['astrog_lumos'] =
                        "subdwarf";
                        break;
                    default:
                        $row_data['meta_input']['astrog_lumos'] = "dwarf";
                }
        
              $stars[] = $row_data;
            
            }
            fclose($handle);

             $readout2 = get_home_path() . 'wp-content/plugins/astrographer/assets/readout2.txt';
              file_put_contents($readout2, print_r($stars, true));

              foreach($stars as $star){
                $checkID = $star['check'];
                //$exists = (new WP_Query(['post_type' => 'astrog_star', 'p'=>$checkID]))->found_posts > 0;

                $exists = get_post(['p' => $checkID]);
    
                if(is_null($exists)){
                    $star['import_id'] = $star['check'];
                    unset($star['check']);
                    $insert = wp_insert_post($star, true);
                    if(is_wp_error($insert)){
                        echo $insert->get_error_message();
                    }
                } else {
                    $star['ID'] = $star['check'];
                    unset($star['check']);
                    $update = wp_update_post($star);
                    if(is_wp_error($update)) {
                        echo $update->get_error_message();
                    }
                }
                
            }
        }

}
        
        


 // TODO: Add function to create entry in menu

add_action( 'admin_menu', 'add_astrog_admin_page');

 function add_astrog_admin_page(){
     add_options_page('Astrographer', 'Astrographer', 'manage_options', 'astrographer/astrog-admin.php', 'astrog_admin_page');
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
        <?php } else { 
            $nonce = wp_create_nonce( "astrog_nonce" );
            $link = admin_url('admin-ajax.php?action=astrog_load_data');
            ?>
        <a id="dataloader" class="button button-primary" href="<?php echo $link ?>">Load data</a>
        <div id="report">

        </div>

        <?php }

 }

 add_action( 'admin_footer', 'astrog_ajax_call');
 function astrog_ajax_call(){ ?>

 <script type="text/javascript">
     jQuery("#dataloader").click(function(){
         var data = {
             action: "astrog_load_data",
         };

         jQuery.ajax({
             url: ajaxurl,
             type: "POST",
             data: data,
             success: function(response) {
                 console.log(response);
                 jQuery("#report").html('<p>Data has been loaded.</p>');
             },
             error: function(error){
                 console.log(error);
                 jQuery("#report").html('<p>Data loading error: ' + JSON.stringify(error) + '</p>');
             }
         });
     });
     </script>

 <?php }

 add_action('wp_ajax_astrog_load_data', 'astrog_load_data');

  // TODO: Create action function to run data load button

// Adding custom fields to rest
 
add_action( 'rest_api_init', 'astrog_star_register_fields');

function astrog_star_register_fields(){
   foreach (['spect', 'distance', 'astrog_lumos', 'astrog_hue'] as $field) {
       register_rest_field('astrog_star',
       $field,
       [
           'get_callback' => 'astrog_star_get_field',
           'update_callback' => null,
           'schema' => null,
       ]);
   }
}

/* 
 * Get the value of the meta fields
 * @param array $object Details of current post.
 * @param string $field_name Name of field.
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
*/

function astrog_star_get_field($object, $field_name, $request){
    return get_post_meta($object['id'], $field_name, true);
}