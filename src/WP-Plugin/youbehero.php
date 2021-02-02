<?php
/**
 * Plugin Name:       YouBeHero - Donation tracker
 * Description:       YouBeHero - Donation tracker is a plugin that helps eshop's show social responsibility by sharing a percentage of the cart value with user's selected charity.
 * Version:           1.11
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
//=========================================
//Check if WooCommerce is active Start
//========================================
if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
    // Put your plugin code here
    //Main Admin Pages Registration
    include "includes/admin-pages/admin-page.php";
    // Front End CSS And Javascript
    include "includes/js-css-includes.php";
    // include testing banner
    include "dev-banner.php";
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
            $_SESSION['ybh-user-id'] = $ybh_user_id;
            $_SESSION['ybh-user-org-name'] = $ybh_user_org_name;
            $_SESSION['ybh-user-org-picture'] = 'https://www.youbehero.com' . $ybh_user_org_picture;
        } else {
            if (!isset($_SESSION['ybh'])) {
                $_SESSION['ybh'] =  'No Parameter was passed!';
            } else {
                $_SESSION['ybh'] =  'Still going bro!';
            }
        }
    }
    add_action('init', 'get_session_var');
    //==========================================
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
    //=====================================================    
    //
    //Front End Start
    //
    //=====================================================
   

        //===================================================================================
        //Checkout Page Bottom Banner Start
        //===================================================================================
        add_action('woocommerce_after_checkout_form', 'ybh_after_checkout', 10);
        function ybh_after_checkout()
        {
            echo "This is YouBeHeroo Banner Possition";
        };
        //Checkout Page Bottom Banner End==============================

        //===================================================================================
        //Checkout Page after checout info Start
        //===================================================================================
        add_action('woocommerce_checkout_after_order_review', 'ybh_after_submit', 10);
        function ybh_after_submit()
        {
            $total = WC()->cart->subtotal;
            $donation = 2.5;
            $ybhDonation = ($donation / 100) * $total;
            $ybhDonation = number_format($ybhDonation, 2);
            if (isset($_SESSION['ybh-user-id'])) { // Check if user comes from youbehero start

?>
                <div style="border: 1px solid #dbdbdb; padding: 10px; border-radius: 3px; margin-top: 15px; color: #000;">
                    <div class="row">
                        <div style="-webkit-box-flex: 0; -ms-flex: 0 0 16.66667%; flex: 0 0 16.66667%; max-width: 16.66667%; position: relative; width: 100%; padding-left: 15px;">
                            <img src="<?php echo $_SESSION['ybh-user-org-picture']; ?>" alt="Logo onoma organosis" style="max-width: 100%; height: auto; vertical-align: middle; border-style: none; padding-top: 4px;">
                        </div>
                        <div style="-webkit-box-flex: 0; -ms-flex: 0 0 83.33333%; flex: 0 0 83.33333%; max-width: 83.33333%; position: relative; width: 100%; padding-right: 15px; padding-left: 15px;">
                            <p style="font-size: 12px;">Χάρη σε αυτή την αγορά θα προσφέρεις <strong id="ybh-amound"><?php echo $ybhDonation; ?>€</strong> στο <strong id="ybh-organization">Δώσε Ζωή</strong> χωρίς κανένα κόστος!</p>
                            <p style="font-size: 10px;">Υποστηρίζεται από το <a href="https://youbehero.com" title="Ανοίγει την σελίδα YouBeHero σε νέα καρτέλα" target="_blank"><img class="img-fluid" src="https://www.youbehero.com/img/various/logo.svg" style="max-width: 60px;" /></a></p>
                        </div>
                    </div>
                </div>
            <?php
            } // Check if user comes from youbehero end
        };
        //Checkout Page after checout info End================================
        //===================================================================================
        //Cart Page after checout info Start
        //===================================================================================
        add_action('woocommerce_after_cart_totals', 'ybh_after_cart_submit', 10);
        function ybh_after_cart_submit()
        {
            $total = WC()->cart->subtotal;
            $donation = 2.5;
            $ybhDonation = ($donation / 100) * $total;
            $ybhDonation = number_format($ybhDonation, 2);
            if (isset($_SESSION['ybh-user-id'])) { // Check if user comes from youbehero start
            ?>
                <div style="border: 1px solid #dbdbdb; padding: 10px; border-radius: 3px; margin-top: 15px; color: #000;">
                    <div class="row">
                        <div style="-webkit-box-flex: 0; -ms-flex: 0 0 16.66667%; flex: 0 0 16.66667%; max-width: 16.66667%; position: relative; width: 100%; padding-left: 15px;">
                            <img src="<?php echo $_SESSION['ybh-user-org-picture']; ?>" alt="Logo onoma organosis" style="max-width: 100%; height: auto; vertical-align: middle; border-style: none; padding-top: 4px;">
                        </div>
                        <div style="-webkit-box-flex: 0; -ms-flex: 0 0 83.33333%; flex: 0 0 83.33333%; max-width: 83.33333%; position: relative; width: 100%; padding-right: 15px; padding-left: 15px;">
                            <p style="font-size: 12px;">Χάρη σε αυτή την αγορά θα προσφέρεις <strong id="ybh-amound"><?php echo $ybhDonation; ?>€</strong> στο <strong id="ybh-organization">Δώσε Ζωή</strong> χωρίς κανένα κόστος!</p>
                            <p style="font-size: 10px;">Υποστηρίζεται από το <a href="https://youbehero.com" title="Ανοίγει την σελίδα YouBeHero σε νέα καρτέλα" target="_blank"><img class="img-fluid" src="https://www.youbehero.com/img/various/logo.svg" style="max-width: 60px;" /></a></p>
                        </div>
                    </div>
                </div>
<?php
            } // Check if user comes from youbehero end
        };
        //Cart Page after checout info End================================
} //Check if WooCommerce is active End=======================
