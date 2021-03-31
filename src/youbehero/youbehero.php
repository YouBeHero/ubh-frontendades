<?php
/**
 * Plugin Name:       YouBeHero - Donation tracker
 * Description:       YouBeHero - Donation tracker is a plugin that helps eshop's show social responsibility by sharing a percentage of the cart value with user's selected charity.
 * Version:           1.11
 * Text Domain:       youbehero
 * Domain Path:       /language
 * Requires at least: 5.0
 * Requires PHP:      5.6
 * Author:            YouBeHero
 * Author URI:        https://youbehero.com/
 * License:           GPL v2 or later
 * Woo: //WooCommerce core looks for a Woo line in the plugin header comment, to ensure it can check for updates to your plugin, on WooCommerce.com.
 * WC requires at least: 2.2
 * WC tested up to: 2.3
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
//Load's the custom Language Files
function my_plugin_init() {
    load_plugin_textdomain( 'youbehero', false, '/youbehero/language' );
  }
add_action('init', 'my_plugin_init');
//=========================================
//Check if WooCommerce is active Start
//========================================
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // Put your plugin code here
    //Main Admin Pages Registration
    //include "includes/admin-pages/admin-page.php";
    // include testing banner
    include "dev-banner.php";
    //Plugin Options
    function ubh_register_settings() {
        add_option( 'ubh-iframe-url', '');
        register_setting( 'ubh_options_group', 'ubh-iframe-url', 'ubh_callback' );
     }
     add_action( 'admin_init', 'ubh_register_settings' );
    //Sessions
    function session_init_ed()
    {
        if (!session_id()) {
            session_start();
        }
    }
    add_action('init', 'session_init_ed');
    function get_session_var()
    {
        //Get Parammeters from url with php start
        if (isset($_GET["ubhTr"])) {
            $_SESSION['ybh'] = 'We Got It';
            $ybh_user_id = htmlspecialchars($_GET["ubhTr"]);
            $ybh_user_org_name = htmlspecialchars($_GET["cause_name"]);
            $ybh_user_org_picture = htmlspecialchars($_GET["cause_logo_url"]);
            $ybh_shop_commission = htmlspecialchars($_GET["commission_percentage"]);
            $_SESSION['ybh-user-id'] = $ybh_user_id;
            $_SESSION['ybh-user-org-name'] = $ybh_user_org_name;
            $_SESSION['ybh-user-org-picture'] = 'https://www.youbehero.com' . $ybh_user_org_picture;
            $_SESSION['ybh_shop_commission'] = $ybh_shop_commission;
        } 
    }
    add_action('init', 'get_session_var');
    //In plugin page displays a selection of settings that redirects to plugin settings page //Start//
    function youbehero_action_links($links)
    {
        $links = array_merge(array(
            '<a href="' . esc_url(admin_url('/admin.php?page=youbehero')) . '">' . __('Επιλογές', 'youbehero') . '</a>'
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
    //Front End Start       
    //===================================================================================
    //Checkout and Cart Page after checkout info Start
    //===================================================================================
    add_action('woocommerce_after_cart_table', 'ybh_after_submit', 10); //Cart Page
    add_action('woocommerce_checkout_after_order_review', 'ybh_after_submit', 10); //Checkout Page
    add_action('woocommerce_email_footer', 'email_notification', 10); //Appear at Email Footer
    function ybh_after_submit()
    {   global $woocommerce;
        $total = $woocommerce->cart->subtotal_ex_tax;
        $donation = $_SESSION['ybh_shop_commission']; //edo kanonika prepei na bei kati tetoio $_SESSION['ybh-eshop-donation-amount']
        $ybhDonation = ($donation / 100) * $total;
        $ybhDonation = number_format($ybhDonation, 2);
        if (isset($_SESSION['ybh-user-id'])) { // Check if user comes from youbehero start
        ?>
            <div style="border: 1px solid #dbdbdb; padding: 10px; border-radius: 3px; margin-top: 15px; margin-bottom: 15px; color: #000;">
                <div class="row">
                    <div style="-webkit-box-flex: 0; -ms-flex: 0 0 16.66667%; flex: 0 0 16.66667%; max-width: 16.66667%; position: relative; width: 100%; padding-left: 15px;">
                        <img src="<?php echo $_SESSION['ybh-user-org-picture']; ?>" alt="<?php echo $_SESSION['ybh-user-org-name']; ?> logo" style="max-width: 100%; height: auto; vertical-align: middle; border-style: none; padding-top: 4px;">
                    </div>
                    <div style="-webkit-box-flex: 0; -ms-flex: 0 0 83.33333%; flex: 0 0 83.33333%; max-width: 83.33333%; position: relative; width: 100%; padding-right: 15px; padding-left: 15px;">              
                        <p style="font-size: 12px;"><?php  _e( 'Ολοκλήρωσε την αγορά σου και μαζί θα προσφέρουμε', 'youbehero' ); ?><strong id="ybh-amount"><?php echo " " . $ybhDonation; ?>€ </strong><?php  _e( 'στην οργάνωση ', 'youbehero' ); ?> <strong id="ybh-organization"><?php echo $_SESSION['ybh-user-org-name']; ?></strong> <?php  _e( 'χωρίς κανένα κόστος για εσένα!', 'youbehero' ); ?>  </p>
                        <p style="font-size: 10px;"><?php  _e( 'Υποστηρίζεται από το ', 'youbehero' ); ?><a href="https://youbehero.com" title="<?php   _e( 'Ανοίγει την σελίδα YouBeHero σε νέα καρτέλα ', 'youbehero' ); ?>" target="_blank"><img class="img-fluid" src="https://www.youbehero.com/img/various/logo.svg" style="max-width: 60px;" /></a></p>
                    </div> 
                </div>
            </div>
            <?php
            } // Check if user comes from youbehero end
        };
    function email_notification()
    {   global $woocommerce;
        $total = $woocommerce->cart->subtotal_ex_tax;
        $donation = $_SESSION['ybh_shop_commission']; //edo kanonika prepei na bei kati tetoio $_SESSION['ybh-eshop-donation-amount']
        $ybhDonation = ($donation / 100) * $total;
        $ybhDonation = number_format($ybhDonation, 2);
        if (isset($_SESSION['ybh-user-id'])) { // Check if user comes from youbehero start
        ?>
            <div style="border: 1px solid #dbdbdb; padding: 10px; border-radius: 3px; margin-top: 15px; margin-bottom: 15px; color: #000;">
                <div class="row">
                    <div style="-webkit-box-flex: 0; -ms-flex: 0 0 83.33333%; flex: 0 0 83.33333%; max-width: 83.33333%; position: relative; width: 100%; padding-right: 15px; padding-left: 15px;">              
                        <p style="font-size: 12px;"><?php  _e( 'Μαζί θα προσφέρουμε', 'youbehero' ); ?><strong id="ybh-amount"><?php echo " " . $ybhDonation; ?>€ </strong><?php  _e( 'στην οργάνωση ', 'youbehero' ); ?> <strong id="ybh-organization"><?php echo $_SESSION['ybh-user-org-name']; ?></strong> <?php echo __( ' χωρίς κανένα κόστος για εσένα!', 'youbehero' ); ?>  </p>
                        <p style="font-size: 10px;"><?php  _e( 'Υποστηρίζεται από το ', 'youbehero' ) . " "; ?><a href="https://youbehero.com" title="<?php  _e( 'Ανοίγει την σελίδα YouBeHero σε νέα καρτέλα ', 'youbehero' ); ?>" target="_blank">YouBeHero</a></p>
                    </div> 
                </div>
            </div>
            <?php
            } // Check if user comes from youbehero end
        };
        //Checkout Page after checout info End================================
        //===================================================================================
        /*
         * Do something after WooCommerce set an order status as completed
         */
        add_action('woocommerce_thankyou', 'ybh_successful_checkout', 1);
        function ybh_successful_checkout($order_id) {            
            $order = wc_get_order( $order_id ); 
            if (isset($_SESSION['ybh-user-id'])) { // Check if user comes from youbehero start
            $total_without_tax = $order->total - $order->total_tax;              
        echo '<img src="https://youbehero.com/gr/test/trackTransaction?ubhTr='. $_SESSION["ybh-user-id"] . '&sale_amount='.  $total_without_tax .'&transaction_id='.  $order->id .'"/>';
            ?>             
            <?php   
            } // Check if user comes from youbehero end
        };
        //Cart Page after checout info End================================
} //Check if WooCommerce is active End=======================
function main_admin_menu() {
    $base_54 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACVSURBVHgB7ZLRDYAgDERbF1EnkRHczBEcxRF0A93AESommsClVD6IP/oSEkqvl1Ig+hwcBiKyRknmViuydGgoIOSEYVJXUWGKGxYHZ9hESeZNK7J07z6Kr6vpoTsEDTeIe6XGQbyQ0dEgMXvYkd+781ODZrQMnehMfs2JXEMWSpcWA+WQaZpnFph253zgqut11tHPzQHWJ/6q54M6fgAAAABJRU5ErkJggg==";
  //add_menu_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', string $icon_url = '', int $position = null )
    add_menu_page(__( 'YouBeHero', 'youbehero' ), __( 'YouBeHero', 'youbehero' ),'manage_options',  'youbehero', 'ubh_admin_page_contents',$base_54, 25);
}
add_action( 'admin_menu', 'main_admin_menu' );
//Main Admin Page
function ubh_admin_page_contents() {  ?>
  <?php //===================================== HTML Starting ===================================================  ?>
  <!doctype html>
  <html lang="en">
  <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
      <script>
          (function($) {
          })( jQuery );
      </script>
  </head>
  <body>
  <?php //===================================== Main Page Starting ===================================================  ?>
  <style>
  .bigger-1 {
    font-size: 1rem !important;
  }
  .bigger-2 {
    font-size: 1.1rem !important;
  }
  .bigger-3 {
    font-size: 1.2rem !important;
  }
  .bigger-4 {
    font-size: 1.3rem !important;
  }
  .bigger-5 {
    font-size: 1.5rem !important;
  }
  .smaller-1 {
    font-size: .9rem !important;
  }
  .smaller-2 {
    font-size: .8rem !important;
  }
  .smaller-3 {
    font-size: .8rem !important;
  }
  .smaller-4 {
    font-size: .8rem !important;
  }
  .smaller-5 {
    font-size: .8rem !important;
  }
  @include media-breakpoint-up(md) {
    body {
      font-size: 1rem !important;
    }
    .bigger-1 {
      font-size: 1.1rem !important;
    }
    .bigger-2 {
      font-size: 1.2rem !important;
    }
    .bigger-3 {
      font-size: 1.3rem !important;
    }
    .bigger-4 {
      font-size: 1.4rem !important;
    }
    .bigger-5 {
      font-size: 1.5rem !important;
    }
    .smaller-1 {
      font-size: .9rem !important;
    }
    .smaller-2 {
      font-size: .8rem !important;
    }
    .smaller-3 {
      font-size: .8rem !important;
    }
    .smaller-4 {
      font-size: .8rem !important;
    }
    .smaller-5 {
      font-size: .8rem !important;
    }
  }
  @include media-breakpoint-up(lg) {
    .bigger-1 {
    font-size: 1.2rem !important;
    }
    .bigger-2 {
      font-size: 1.4rem !important;
    }
    .bigger-3 {
      font-size: 1.6rem !important;
    }
    .bigger-4 {
      font-size: 1.8rem !important;
    }
    .bigger-5 {
      font-size: 2rem !important;
    }
    .smaller-1 {
      font-size: .9rem !important;
    }
    .smaller-2 {
      font-size: .8rem !important;
    }
    .smaller-3 {
      font-size: .7rem !important;
    }
    .smaller-4 {
      font-size: .5rem !important;
    }
    .smaller-5 {
      font-size: .5rem !important;
    }
  }
  </style>
  <div class="wrap">  
    <h1><strong>YouBeHero </strong><?php echo __('για την επιχείρηση' , 'youbehero' ); ?>
      <button type="button" class="btn btn-sm btn-outline-primary mb-1 ml-2" data-toggle="modal" data-target="#shopURL">
          <?php _e('Διαμόρφωση Πίνακα', 'youbehero' ); ?>
      </button>   
      </h1>     
      <!-- Button trigger modal -->
      
        <!-- Modal -->
        <div class="modal fade" id="shopURL" tabindex="-1" role="dialog" aria-labelledby="shopURLLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
            <form method="post" action="options.php">
              <div class="modal-header">
                <h5 class="modal-title" id="shopURLLabel"><?php  _e('Διαμόρφωση Πίνακα' , 'youbehero' ); ?></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    <?php settings_fields( 'ubh_options_group' ); ?>
                    <?php do_settings_sections( 'ubh_options_group' ); ?>
                    <div class="col-12 mb-3">
                      <input type="text" class="w-100" name="ubh-iframe-url" placeholder="Tο URL που έχετε από το YouBeHero" value="<?php echo get_option('ubh-iframe-url'); ?>" />
                    </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"><?php  _e('Κλείσιμο','youbehero' ); ?></button>
                <?php submit_button(); ?>
              </div>
              </form>
            </div>
          </div>
        </div>
      <div class="row-fluid mb-5">
          <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12">
                      <iframe src="<?php echo get_option('ubh-iframe-url'); ?>" width="100%" height="800"></iframe>
                  </div>
              </div>      
            </div>
          </div>          
      </div>
  </div>
  <?php//=================================Footer==========================?>

  <?php //===================================== Main Page Ending ===================================================  ?>
  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  <script>
    $('#shopURL').on('shown.bs.modal', function (e) {
      $('#shopURL p.submit').addClass('py-0 my-0');
      $('#shopURL input#submit').removeClass('button button-primary').addClass('btn btn-primary');
    });
  </script>
  </body>
  </html>
  <?php //===================================== HTML Ending ===================================================  ?>
      <?php
}
