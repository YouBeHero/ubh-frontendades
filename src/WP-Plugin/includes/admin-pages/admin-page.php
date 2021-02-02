
<?php

function main_admin_menu() {
    
  //add_menu_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', string $icon_url = '', int $position = null )
    add_menu_page(__( 'YouBeHero', 'you-be-hero' ), __( 'YouBeHero', 'you-be-hero' ),'manage_options',  'you-be-hero', 'main_admin_page_contents','dashicons-schedule', 1);
}

add_action( 'admin_menu', 'main_admin_menu' );



//Main Admin Page
include "main-page.php";




