<?php







function main_admin_page_contents() {

    ?>



    <?php include "plugin-header.php";?>



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

  <h1><strong>YouBeHero</strong> for business</h1>    
    
    <div class="row-fluid mb-5">
        <div class="row">
            
            <div class="col-12">

              <div class="row">

                <div class="col-12">

                  <iframe src="https://youbehero.com/gr/stats/eshop/aromaselena" width="100%" height="600"></iframe>

                  
                  <div class="d-none">
                    <div class="row">
                          
                          <div class="col-12 col-md mb-1">
                            <div class="row">
                              <div class="col-12">
                                <p class="smaller-1 mb-0">Ρύθμιση περιόδου</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                  <select class="custom-select">
                                    <option disabled="disabled">Διάλεξε περίοδο</option>
                                    <option value="today">Σήμερα</option>
                                    <option value="periodlastweek">Περασμένη βδομάδα</option>
                                    <option value="periodlastmonth" selected>Περασμένος μήνας</option>
                                    <option value="periodlastquarter">Περασμένο τρίμηνο</option>
                                    <option value="periodlastsixmonths">Περασμένο εξάμηνο</option>
                                    <option value="periodlastyear">Περασμένο έτος</option>
                                  </select>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 col-md mb-1 periodpicker">
                            <div class="row">
                              <div class="col-12">
                                <p class="smaller-1 mb-0">Από</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                  <div class="form-group dateYo">
                                      <input class="form-control" id="periodFrom" placeholder="Διάλεξε ημερομηνία" type="text">
                                  </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 col-md mb-1 periodpicker">
                            <div class="row">
                              <div class="col-12">
                                <p class="smaller-1 mb-0">Εως</p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12">
                                  <div class="form-group dateYo">
                                      <input class="form-control" id="periodTo" placeholder="Διάλεξε ημερομηνία" type="text">
                                  </div>
                              </div>
                            </div>
                          </div>


                          <div class="col-12 col-md">
                            <div class="row">
                              <div class="col-12">
                                <p class="smaller-1 font-weight-bold"></p>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-12 mt-2 mb-3">
                                  <a href="javascript:void(0);" onclick="getSelectedDates();" class="btn btn-success btn-block"><i aria-hidden="true" class="fas fa-search mr-1 smaller-1"></i>Αναζήτηση</a>
                              </div>
                            </div>
                          </div>
                       
                        </div>


                  <div class="row">

                  

                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <div class="card rounded shadow-sm" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                      <div class="card-body px-0 py-2">
                        <h5 class="card-title text-uppercase my-1 smaller-1">Συνολικες δωρεες
                        </h5>
                         <p class="bigger-4 font-weight-bold mb-0 card-text">
                         845€
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <div class="card rounded shadow-sm" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                      <div class="card-body px-0 py-2">
                        <h5 class="card-title text-uppercase my-1 smaller-1">Τζιρος επισκεπτων
                        </h5>
                        <p class="bigger-4 font-weight-bold mb-0 card-text">17.540€
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <div class="card rounded shadow-sm" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                      <div class="card-body px-0 py-2">
                        <h5 class="card-title text-uppercase my-1 smaller-1">Μεσος όρος αξιας καλαθιου
                        </h5>
                         <p class="bigger-4 font-weight-bold mb-0 card-text">44€
                        </p>
                      </div>
                    </div>
                  </div>


                  <div class="col-12 col-sm-6 col-lg-3 mb-3">
                    <div class="card rounded shadow-sm" data-toggle="tooltip" data-placement="top" title="Κάποια πληροφορία.">
                      <div class="card-body px-0 py-2">
                        <h5 class="card-title text-uppercase my-1 smaller-1">Παραγγελιες με δωρεα
                        </h5>
                        <p class="bigger-4 font-weight-bold mb-0 card-text">398
                        </p>
                      </div>
                    </div>
                  </div>


                  <div class="col-12 my-4">
                    <div class="row">
                          <div class="container-fluid">
                            <table class="table table-responsive-lg">
                            <thead>
                              <tr>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;">#</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;">ID</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;"  title="Transaction ID">Transaction ID</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Όνομα χρήστη">Όνομα χρήστη</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Κατάσταση">Κατάσταση</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Αξία καλαθιού">Αξία καλαθιού</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Δωρεά">Δωρεά</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Οργάνωση">Οργάνωση</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Ημερομηνία">Ημερομηνία</th>
                                <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Τελευταία ενημέρωση">Τελευταία ενημέρωση</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>27703</td>
                                <td>234</td>
                                <td>ΑΝΝΑ ΜΑΡΙΑ ΧΑΡΟΚΟΠΟΥ</td>
                                <td><a href="javascript:void(0);" data-toggle="modal" data-target="#changeDonation" title="Πάτησε εδώ για να αλλάξεις την κατάσταση αυτής της δωρεάς.">Αποδοσμένη</a></td>
                                <td>23,25€</td>
                                <td>3,25€</td>
                                <td><a href="https://youbehero.com/gr/cause/zeil" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Ζωοφιλική ένωση Ηλιούπολης</a></td>
                                <td>28/12/21 07:45</td>
                                <td>28/12/21 07:45</td>                              
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>27703</td>
                                <td>234</td>
                                <td>Μάρτιν Λούθερ Κινγκ</td>
                                <td><a href="javascript:void(0);" data-toggle="modal" data-target="#changeDonation" title="Πάτησε εδώ για να αλλάξεις την κατάσταση αυτής της δωρεάς.">Αποδοσμένη</a></td>
                                <td>23,25€</td>
                                <td>3,25€</td>
                                <td><a href="https://youbehero.com/gr/cause/frodida" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Σύλλογος Φροντίδα</a></td>
                                <td>28/12/21 07:45</td>
                                <td>28/12/21 07:45</td>                              
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>27703</td>
                                <td>234</td>
                                <td>Μαρτίνος Λούθηρος</td>
                                <td><a href="javascript:void(0);" class="text-danger" data-toggle="modal" data-target="#changeDonation" title="Πάτησε εδώ για να αλλάξεις την κατάσταση αυτής της δωρεάς.">Ακυρωμένη</a></td>
                                <td>23,25€</td>
                                <td>3,25€</td>
                                <td><a href="https://youbehero.com/gr/cause/pnoi-agapis" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Make-A-Wish</a></td>
                                <td>28/12/21 07:45</td>
                                <td>28/12/21 07:45</td>
                              </tr>
                              <tr>
                                <th scope="row">4</th>
                                <td>27703</td>
                                <td>234</td>
                                <td>Λεξ Λούθερ</td>
                                <td><a href="javascript:void(0);" data-toggle="modal" data-target="#changeDonation" title="Πάτησε εδώ για να αλλάξεις την κατάσταση αυτής της δωρεάς.">Αποδοσμένη</a></td>
                                <td>23,25€</td>
                                <td>3,25€</td>
                                <td><a href="https://youbehero.com/gr/cause/pnoi-agapis" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Πνοή Αγάπης</a></td>
                                <td>28/12/21 07:45</td>
                                <td>28/12/21 07:45</td>
                              </tr>
                              <tr>
                                <th scope="row">5</th>
                                <td>27703</td>
                                <td>234</td>
                                <td>Πέγκυ Ζήνα</td>
                                <td><a href="javascript:void(0);" data-toggle="modal" data-target="#changeDonation" title="Πάτησε εδώ για να αλλάξεις την κατάσταση αυτής της δωρεάς.">Αποδοσμένη</a></td>
                                <td>23,25€</td>
                                <td>3,25€</td>
                                <td><a href="https://youbehero.com/gr/cause/pnoi-agapis" target="_blank" title="Ανοίγει την σελίδα της οργάνωσης σε νέα καρτέλα.">Σκοπός Ζωής</a></td>
                                <td>28/12/21 07:45</td>
                                <td>28/12/21 07:45</td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                        </div>
                  </div>


                  <div class="col-12 mt-5">
                    <nav aria-label="Page navigation">
                      <ul class="pagination justify-content-center pagination-sm">
                        <li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
                      </ul>
                    </nav>
                  </div>  
              </div>
               

            </div>
            
          </div>


      </div>      
    </div>
  </div>



        <!-- Modal -->
        <div class="modal fade" id="changeDonation" tabindex="-1" aria-labelledby="changeDonationLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title bigger-1 font-weight-bold" id="changeDonationLabel">Μεταβολή κατάστασης δωρεάς</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              
                <div class="col-12 mb-4 px-0 border">

                  <table class="table table-responsive-lg">
                      <thead>
                        <tr>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Transaction ID">Transaction ID</th>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Όνομα χρήστη">Όνομα χρήστη</th>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Όνομα χρήστη">Κατάσταση</th>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Αξία καλαθιού">Αξία καλαθιού</th>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Δωρεά">Δωρεά</th>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Οργάνωση">Οργάνωση</th>
                          <th class="border-top-0 text-truncate" scope="col" style="max-width: 100px;" title="Ημερομηνία">Ημερομηνία</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>234</td>
                          <td>ΑΝΝΑ ΜΑΡΙΑ ΧΑΡΟΚΟΠΟΥ</td>
                          <td>Αποδοσμένη</td>
                          <td>23,25€</td>
                          <td>3,25€</td>
                          <td>Ζωοφιλική ένωση Ηλιούπολης</td>
                          <td>28/12/21 07:45</td>
                        </tr>
                        
                      </tbody>
                    </table>

                </div>

                <div class="col-12 px-0">
                  <p class="mb-0">Διάλεξε την κατάσταση της δωρεάς:</p>
                  <select class="custom-select mb-3">
                    <option disabled="disabled">Αλλαγή κατάστασης σε:</option>
                    <option value="1" selected="selected">Αποδοσμένη</option>
                    <option value="2">Ακυρωμένη</option>
                  </select>
                </div>  

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Άκυρο</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Αποθήκευση</button>
              </div>
            </div>
          </div>
        </div>



    </div>

</div>


    <!-- Content Here--->
    <?php include "plugin-footer.php";?>

    <?php

}