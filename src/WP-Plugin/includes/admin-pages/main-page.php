<?php







function main_admin_page_contents() {

    ?>



    <?php include "plugin-header.php";?>







<div class="wrap">

<h1>YouBeHero for business</h1>

  

    <div class="row-fluid bg-white sticky-top shadow-sm" style="z-index: 1040">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-12 py-2">
            <a href="https://youbehero.com/gr/user-dashboard/iceman" class="navbar-brand font-weight-bold text-dark mx-0 py-0" title="Αρχική σελίδα">
              <img class="headerlogo" alt="Λογότυπο YouBeHero" src="https://youbehero.com/img/various/ubh-4-business.svg">
            </a>

          </div>

          
        </div>
      </div>
    </div>

    
    <div class="row-fluid pt-4">
        <div class="container-fluid">
          <div class="row">
            
            <div class="col-12">

              <div class="row">

                <div class="col-12">    
                  <h1 class="bigger-2 font-weight-bold">Αρχική</h1>
                  <p>Καλησπέρα <strong>Σίσσυ</strong> 👋, καλώς ήρθες στο διαχειριστικό του YouBeHero για το κατάστημα «LIDO».</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3 mb-3">
                  <div class="card rounded-0" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                    <div class="card-body">
                      <h5 class="card-title text-uppercase font-weight-bold my-1 smaller-1">Συνολικες δωρεες
                      </h5>
                       <p class="bigger-4 font-weight-bold mb-0 card-text">
                       845€
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3 mb-3">
                  <div class="card rounded-0" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                    <div class="card-body">
                      <h5 class="card-title text-uppercase font-weight-bold my-1 smaller-1">Τζιρος επισκεπτων
                      </h5>
                      <p class="bigger-4 font-weight-bold mb-0 card-text">17.540€
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-3 mb-3">
                  <div class="card rounded-0" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                    <div class="card-body">
                      <h5 class="card-title text-uppercase font-weight-bold my-1 smaller-1">Μεσος όρος αξιας καλαθιου
                      </h5>
                       <p class="bigger-4 font-weight-bold mb-0 card-text">44€
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-12 col-sm-6 col-lg-3 mb-3">
                  <div class="card rounded-0" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                    <div class="card-body">
                      <h5 class="card-title text-uppercase font-weight-bold my-1 smaller-1">Παραγγελιες με δωρεα
                      </h5>
                      <p class="bigger-4 font-weight-bold mb-0 card-text">398
                      </p>
                    </div>
                  </div>
                </div>


                <div class="col-12 mb-4">
                  <div class="card rounded-0">
                    <div class="card-header bg-white">
                         <span class="font-weight-bold" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">Οι χρήστες προτίμησαν αυτές τις οργανώσεις</span>
                    </div>
                    <div class="card-body">

                      <div class="row">
                        <div class="container-fluid">
                          <table class="table table-responsive-md table-striped">
                          <thead>
                            <tr>
                              <th class="border-top-0" scope="col">#</th>
                              <th class="border-top-0" scope="col">Όνομα οργάνωσης</th>
                              <th class="border-top-0" scope="col">Δωρεές (σε αριθμό)</th>
                              <th class="border-top-0" scope="col">Δωρεές (σε ευρώ)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td><a href="https://youbehero.com/gr/cause/zeil" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Ζωοφιλική ένωση Ηλιούπολης</a></td>
                              <td>373</td>
                              <td>617.80€</td>
                              
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td><a href="https://youbehero.com/gr/cause/frodida" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Σύλλογος Φροντίδα</a></td>
                              <td>280</td>
                              <td>471.23€</td>
                              
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td><a href="https://youbehero.com/gr/cause/pnoi-agapis" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Πνοή Αγάπης</a></td>
                              <td>152</td>
                              <td>67.84€</td>

                            </tr>
                          </tbody>
                        </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>      
          </div>
        </div>
      </div>
    </div>




</div>


<?php
echo "Absolut Path: " . ABSPATH . "<br>"; //absolut path
echo "Site Url: " . $_SERVER['SERVER_NAME'];
?>




    <!-- Content Here--->



    <?php include "plugin-footer.php";?>



    <?php

}