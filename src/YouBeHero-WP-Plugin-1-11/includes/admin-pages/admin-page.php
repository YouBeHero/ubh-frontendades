


<?php





function main_admin_menu() {


    $base_54 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACVSURBVHgB7ZLRDYAgDERbF1EnkRHczBEcxRF0A93AESommsClVD6IP/oSEkqvl1Ig+hwcBiKyRknmViuydGgoIOSEYVJXUWGKGxYHZ9hESeZNK7J07z6Kr6vpoTsEDTeIe6XGQbyQ0dEgMXvYkd+781ODZrQMnehMfs2JXEMWSpcWA+WQaZpnFph253zgqut11tHPzQHWJ/6q54M6fgAAAABJRU5ErkJggg==";


  //add_menu_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', string $icon_url = '', int $position = null )


    add_menu_page(__( 'YouBeHero', 'youbehero' ), __( 'YouBeHero', 'youbehero' ),'manage_options',  'youbehero', 'main_admin_page_contents',$base_54, 25);


}





add_action( 'admin_menu', 'main_admin_menu' );











//Main Admin Page


include "main-page.php";














