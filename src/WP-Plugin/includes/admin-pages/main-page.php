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

    

    <div class="row-fluid bg-white sticky-top shadow-sm" style="z-index: 1040">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-5 col-md">
            <a href="https://youbehero.com/gr/user-dashboard/iceman" class="navbar-brand font-weight-bold text-dark mx-0 py-0" title="Αρχική σελίδα">
              <img class="headerlogo" alt="Λογότυπο YouBeHero" src="/img/various/ubh-4-business.svg">
            </a>

          </div>

          <div class="col-7 col-md text-right pt-2 pt-md-0">
            
            <div class="btn-group d-md-inline-block py-2 border border-top-0 border-bottom-0 pl-3" role="group">

              <button id="userNameDropdown" type="button" class="btn btn-link rounded-0 px-1 px-md-2 smaller-1 mr-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Μενού ομάδας - Πάτησε εδώ για να δεις τις επιλογές.">Κατάσταση app: <span class="text-success">Ενεργή</span><i aria-hidden="true" class="ml-3 fas fa-chevron-down smaller-3"></i></button>

              <div class="dropdown-menu-right dropdown-menu py-0 dropdown-menu-right" aria-labelledby="userNameDropdown" x-placement="bottom-end" style="position: absolute; transform: translate3d(-360px, 40px, 0px); top: 0px; left: 0px; will-change: transform;">

                <div class="card-header py-1">
                  <p class="mb-0 text-truncate">
                    <small><strong>Αλλαγή κατάστασης app</strong></small>
                  </p>
                </div>

                <a href="https://youbehero.com/gr/team-dashboard" class="dropdown-item smaller-1 py-2 ml-3" title="Από εδώ μπορείς να δεις μια γενική εικόνα της ομάδας σου."><i class="fas fa-toggle-off mr-2"></i>Απενεργοποίηση app</a>

              </div>

            </div>

            <div class="btn-group d-md-inline-block py-2" role="group">

              <button id="userNameDropdown" class="btn btn-link rounded-0 px-1 px-md-2 smaller-1 mr-3" title="Μενού ομάδας - Πάτησε εδώ για να δεις τις επιλογές.">Υπόλοιπο 34.25€</button>

            </div>


            <div class="btn-group d-md-inline-block py-2 border border-top-0 border-bottom-0 border-right-0 pl-3" role="group">

              <button id="userNameDropdown" type="button" class="btn btn-link rounded-0 px-1 px-md-2 smaller-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Μενού χρήστη - Πάτησε εδώ για να δεις τις επιλογές.">LIDO<i aria-hidden="true" class="ml-3 fas fa-chevron-down smaller-3"></i></button>

              <div class="dropdown-menu-right dropdown-menu py-0 dropdown-menu-right" aria-labelledby="userNameDropdown">
                <div class="card-header py-1">
                  <p class="mb-0 text-truncate">
                    <small><strong>Κατάστημα LIDO</strong></small>
                  </p>
                </div>

                
                <a href="javascript:void(0);" class="dropdown-item smaller-1 py-2" title="Κάποια πληροφορία.">

                  <i aria-hidden="true" class="fas fa-share-alt mr-2">
                  </i>Σελίδα καταστήματος στο YouBeHero
                </a>

                <div class="dropdown-divider my-0"></div>

                <a href="javascript:void(0);" class="dropdown-item smaller-1 py-2" title="Κάποια πληροφορία.">
                  <i class="fas fa-cog mr-2" aria-hidden="true">
                  </i>Ρυθμίσεις χρήστη
                </a>

                <div class="dropdown-divider my-0">
                </div>

                <a href="javascript:void(0);" class="dropdown-item smaller-1 py-2" title="Κάποια πληροφορία.">
                  <i class="fas fa-power-off mr-2" aria-hidden="true">
                  </i>Αποσύνδεση
                </a>

               

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div class="row-fluid pt-4">
        <div class="container-fluid">
          <div class="row">
            
            <div class="col-12 col-lg-2 mb-3">
              
                <div class="col-12 px-0">

                  <p>Αρχική</p>
                  <p><a href="business-transactions-table.html" class="d-block" title="Κάποια πληροφορία.">Πίνακας συναλλαγών</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Συνδρομή</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Στοιχεία καταστήματος</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Προσαρμογή widget</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Στατιστικά</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Υποστήριξη</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Ρυθμίσεις</a></p>
                  <p><a href="javascript:void(0);" class="d-block" title="Κάποια πληροφορία." style="cursor: no-drop;">Βοήθεια</a></p>
                  
                </div>
              
            </div>

            <div class="col-12 col-lg-10">

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





<footer class="row-fluid footer bg-white border border-left-0 border-right-0 border-bottom-0 fixed-bottom">
  <div class="container-fluid">
    <div class="row">

      <div class="col-12 pt-3">
        <div class="row">
          
          <div class="col-12">
            <ul class="list-inline">
              <li class="list-inline-item">
                <span class="smaller-3 text-muted">
                  Το 
                  <strong>YouBeHero
                  </strong> διανείμεται με άδεια χρήσης 
                  <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener" class="text-muted">Creative Commons license (CC BY-NC-SA 4.0)
                  </a>
                </span>
              </li>
              <li class="list-inline-item">
                <a href="termsandconditions.html" class="smaller-3 text-muted">Όροι χρήσης
                </a>
              </li>
              <li class="list-inline-item d-none d-md-inline-block">
                <span class="text-muted">|
                </span>
              </li>
              <li class="list-inline-item">
                <a class="smaller-3 text-muted" href="faq.html">
                  <i class="far fa-question-circle mr-1" aria-hidden="true">
                  </i>Βοήθεια
                </a>
              </li>
            </ul>
        </div>
          
        </div>
      </div>
      
    </div>
  </div>
</footer>

<script src="../js/jquery.min.js" type="text/javascript">
</script>
<script src="../js/popper.min.js" type="text/javascript">
</script>
<script src="../js/bootstrap.min.js" type="text/javascript">
</script>
<script src="../js/moment.min.js" type="text/javascript">
</script>
<script src="../js/Chart.min.js" type="text/javascript">
</script>
<script src="../js/daterangepicker.js" type="text/javascript">
</script>
<script src="../js/myJS.js" type="text/javascript">
</script>


</div>



</div>



    <!-- Content Here--->



    <?php include "plugin-footer.php";?>



    <?php

}