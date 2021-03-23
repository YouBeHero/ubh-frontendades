<?php
  //======================================
    //Floating testing banner Start
    //=======================================
    function test_message()
    {
?>
        <style>
            .float-d {
                position: fixed;
                width: 300px;
                bottom: 200px;
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
               
        
        <div >
        
            <div class="float-d">
                <h5 style="margin:0px; padding:0px;">This is a developers testing banner</h5>
                <br>
                <a style="color:green;" class="btn" href="https://go.youbehero.com/gr/shop/2176">Click to get info from url link</a>
                <br>
                <?php
                echo  $_SESSION['ybh'];
                echo "<br>";
                echo "<span style='color:red;'>UserID </span>";
                echo "<br>";
                echo '<span id="urlcal" >'. $_SESSION['ybh-user-id'] .'</span>'; //Displays url data (controled by main.js file)
                echo '<br>';
                echo "<span style='color:red;'>User Name</span>";
                echo "<br>";
                echo '<span id="localstrid" >'.$_SESSION['ybh-user-org-name'].'</span>';
                echo "<br>";
                echo "<span style='color:red;'>Org Pic </span>";
                echo "<br>";
                echo '<img src="'. $_SESSION['ybh-user-org-picture'] .'" style="width:40px;"> ';
                echo "<br>";
                echo 'Commision = '. $_SESSION['ybh_shop_commission'];
                echo "<br>";
                echo 'Check the transaction tests <a href=" https://youbehero.com/gr/test/transactions">Here</a>'              
                ?>
            </div>
        </div>   
        
    <?php     
    }
    add_action('wp_footer', 'test_message');
    //Floating testing banner End
