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

        <script>
            console.log('<?php echo $_SESSION["ybh"]; ?>');
            console.log('UserID <?php echo $_SESSION["ybh-user-id"]; ?>');
            console.log('Nonprofit <?php echo $_SESSION["ybh-user-org-name"]; ?>');
            console.log('Nonprofit logo <?php echo $_SESSION["ybh-user-org-picture"]; ?>');
            console.log('Commision <?php echo $_SESSION["ybh_shop_commission"]; ?>');
        </script>
               
    
    <?php     
    }
    add_action('wp_footer', 'test_message');
    //Floating testing banner End
