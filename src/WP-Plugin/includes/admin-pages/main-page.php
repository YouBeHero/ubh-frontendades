<?php



function main_admin_page_contents() {
    ?>

    <?php include "plugin-header.php";?>



<div class="wrap">
<h1>My Custom Plugin</h1>
<?php
echo "Absolut Path: " . ABSPATH . "<br>"; //absolut path
echo "Site Url: " . $_SERVER['SERVER_NAME'];
?>


<div class="container" style="margin-top: 150px;">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>

</div>

    <!-- Content Here--->

    <?php include "plugin-footer.php";?>

    <?php
}