<?php

/**
 * Plugin Name:       YouBeHero
 * Description:       My Plugin
 * Version:           1.1
 * Requires at least: 5.0
 * Requires PHP:      5.6
 * Author:            YouBeHero
 * Author URI:        https://YouBeHero.eu/
 * License:           GPL v2 or later
 * Woo: //WooCommerce core looks for a Woo line in the plugin header comment, to ensure it can check for updates to your plugin, on WooCommerce.com.
 * WC requires at least: 2.2
 * WC tested up to: 2.3
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

//=========================================
//Check if WooCommerce is active Start
//========================================
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // Put your plugin code here

    /*
*==============================
*  Admin Pages
*==============================
*/

    //Main Admin Pages Registration
    include "includes/admin-pages/admin-page.php";


    /*
*==============================
*  Loaded CSS And Javascript
*==============================
*/

    // Front End CSS And Javascript
    include "includes/js-css-includes.php";




    //In plugin page displays a selection of settings that redirects to plugin settings page //Start//
    function youbehero_action_links($links)
    {
        $links = array_merge(array(
            '<a href="' . esc_url(admin_url('/admin.php?page=you-be-hero')) . '">' . __('Settings', 'textdomain') . '</a>'
        ), $links);
        return $links;
    }
    add_action('plugin_action_links_' . plugin_basename(__FILE__), 'youbehero_action_links');
    //In plugin page displays a selection of settings that redirects to plugin settings page //End//




    //In plugin page displays a link to youbehero page at the plugin info //Start//
    function youbehero_row_meta($links, $file)
    {
        if (plugin_basename(__FILE__) == $file) {
            $row_meta = array(
                'docs'    => '<a href="' . esc_url('https://youbehero.com/') . '" target="_blank" aria-label="' . esc_attr__('Plugin Additional Links', 'domain') . '" style="color:green;">' . esc_html__('Docs', 'domain') . '</a>'
            );

            return array_merge($links, $row_meta);
        }
        return (array) $links;
    }
    add_filter('plugin_row_meta', 'youbehero_row_meta', 10, 2);
    //In plugin page displays a link to youbehero page at the plugin info //End//


    //=======================================================================================================================================

    add_action('wp_enqueue_scripts', 'main_css');
    function main_css()
    {
        wp_enqueue_style("main-style", plugins_url('/css/main.css', __FILE__), true, '1.0.0', 'all');
    }
    add_action('wp_enqueue_scripts', 'main_js');
    function main_js()
    {
        wp_enqueue_script("main-sript", plugins_url('/js/main.js?v11', __FILE__), false, array('jquery'), '1');
    }

    //=======================================================================================================================================


    //======================================
    //Floating testing banner Start
    //=======================================
    function test_message()
    {
        //Get Parammeters from url with php start

        if ($_GET["ybh-user-id"]) {
            $ybh_id =  'YouBeHero User Id is ' . htmlspecialchars($_GET["ybh-user-id"]) . '!';
        } else {
            $ybh_id =  'No Parameter was passed!';
        }
        //Get Parammeters from url with php start

?>
        <style>
            .float-d {
                position: fixed;
                width: 300px;
                bottom: 100px;
                left: 20px;
                color: black;
                background-color: white;
                font-weight: 800;
                text-align: center;
                box-shadow: 2px 2px 3px #999;
                padding: 8px;
                z-index: 500;
                text-align: left;
            }
        </style>

        <div id="desctop-covid">
            <div class="float-d ">
                <h5 style="margin:0px; padding:0px;">This is a developers testing banner</h5>
                <br>
                <a style="color:green;" class="btn" href="https://dev.bolanis.eu/aromaselena/?ybh-user-id=2923">Click to get info from url link</a>
                <br>

                <?php
                echo "<br>";
                echo "<span style='color:red;'>Url info Call (jquery)</span>";
                echo "<br>";
                echo '<span id="urlcal" ></span>'; //Displays url data (controled by main.js file)
                echo '<br>';
                echo "<span style='color:red;'>Local Storage (jquery)</span>";
                echo "<br>";
                echo '<span id="localstrid" ></span>';
                echo "<br>";

                echo "<span style='color:red;'>Url info Call (php)</span>";
                echo "<br>";
                echo $ybh_id;
                echo "<br>";
                echo "<span style='color:red;'>Json Call</span> <span style='color:red; font-size:10px;'>(right now from temp file <a href='https://dev.bolanis.eu/zxasdata.json'>File</a>)</span>";
                echo "<br>";
                echo '<p id="apidata" ></p>';
                ?>

            </div>
        </div>

        <script>
            jQuery(document).ready(function($) {
                //fech('http://time.jsontest.com').then(res => console.log(res))

                //Get Parammeters from external source json format Start
                $.ajax({
                    type: 'GET',
                    async: false,
                    url: 'https://dev.bolanis.eu/zxasdata.json',
                    dataType: 'json',
                    success: function(data) {
                        //alert("TEST");
                        let text = `User ID: ${data.id}<br>
                    User Email: ${data.email}<br>
                    User Name: ${data.name}
                    User Organization: ${data.cause_name} <br>
                    <img style="width:80px;" src="${data.image_url}">`

                        $('#apidata').html(text);
                    },
                    error: function(x, e) {
                        //   alert('server error occoured');
                        if (x.status == 0) {
                            alert('0 error');
                        } else if (x.status == 404) {
                            alert('404 error');
                        } else if (x.status == 500) {
                            alert('500 error');
                        } else if (e == 'parsererror') {
                            alert('Error.nParsing JSON Request failed.');
                        } else if (e == 'timeout') {
                            alert('Time out.');
                        } else {
                            alert(x.responseText);
                        }
                    }
                });
                //Get Parammeters from external source json format end

                //Get Parammeters from url Start

                //Get Parammeters from url End


            });
        </script>
    <?php
    }

    add_action('wp_footer', 'test_message');
    //Floating testing banner End


    //===================================================================================

    //Checkout Page Bottom Banner Start
    add_action('woocommerce_after_checkout_form', 'ybh_after_checkout', 10);
    function ybh_after_checkout()
    {
        echo "This is YouBeHeroo Banner Possition";
    };
    //Checkout Page Bottom Banner End

    //===================================================================================

    //Checkout Page after checout info Start
    add_action('woocommerce_checkout_after_order_review', 'ybh_after_submit', 10);
    function ybh_after_submit()
    {
        global $woocommerce;
        $total = WC()->cart->total;
        $donation = 2.5;
        $ybhDonation = ($donation / 100) * $total;

    ?>
        <div style="width:100%;">
            <p id="ybh-userid">User Id : </p>
            <p id="ybh-amound">You will Donate: <?php echo $ybhDonation; ?> </p>
            <p id="ybh-organization">To the organization: % </p>
        </div>
    <?php
    };
        //Checkout Page after checout info End




} //Check if WooCommerce is active End