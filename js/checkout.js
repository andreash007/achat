(function ($) {
  var ChekedStatus;
  Drupal.behaviors.AchatCheckout = {
    attach: function (context, settings) {      
      var list, def, current;
      var addressbookList = ".customer_profile_billing > .panel-body > .form-item-customer-profile-billing-addressbook";
      
      $('.field-name-field-end-customer input').change(function () {
        def = $(addressbookList + ' select').val();

        if($(this).is(':checked')) {
          trigger: render_end_customers_addresses();
          current = $('.field-name-field-end-customer select').val();
          if(def != current) {
            ChekedStatus = true;
            $(addressbookList + ' select').val('none').trigger('change');         
          }
        }
        else {
          trigger: render_reseller_addresses();
          current = $('.field-name-field-end-customer select').val();
          if(def != current) {
            $(addressbookList + ' select').val('none').trigger( "change" );
            ChekedStatus = false;            
          }       
        }
      });
      
      // Trigger to generate addresses list after (page or ajax) load  
      
      // Create temp addressbook lists
      list = $(addressbookList + ' option:selected').text();
      if(list.indexOf('✉') != -1){
        $('.field-name-field-end-customer input').prop('checked', true);
        trigger: render_end_customers_addresses();
      }
      else if (list.indexOf('☑') != -1){
        trigger: render_reseller_addresses();
      }
      // ✚
      else if (ChekedStatus){
        $('.field-name-field-end-customer input').prop('checked', true);
        trigger: render_end_customers_addresses();
      }
      else {
         trigger: render_reseller_addresses();       
      }
      
      // Create temp address1 field
      var def_address1 = ".street-block > .form-item-customer-profile-billing-commerce-customer-address-und-0-thoroughfare";
      if ($('.field-name-field-end-customer input').is(':checked')) {
        prefix = '✉';
      }
      else {
        prefix = '☑';          
      }
      address1_val = $(def_address1 + ' input').val().replace(prefix, '');
      // Remove previous vershion if exist
      $('.address1').remove();
      // Clone to temp address1 field     
      $(def_address1).clone().appendTo('.name-block').wrap("<div class='address1'></div>");
      $('.address1 input').val(address1_val);
      
      // Set value from temp to def Address 1 field
      $('.address1 input').bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $(def_address1 + ' input').val(prefix + OptionValue);
      });

      // Helper function to create end customers addresses list
      function render_end_customers_addresses() {
        // Remove previous vershion if exist
        $('#end-customers-addresses').remove();
        // Remove reseller addresses select list
        $('#reseller-addresses').remove();

        // Generate End customers addresses select list
        $(addressbookList).clone().appendTo('.field-name-field-end-customer').wrap("<div id='end-customers-addresses' class='rendered-addresses'></div>").fadeIn('slow');
        $('#end-customers-addresses option').each(function() {
          list = $(this).text();
          if(list.indexOf('☑') != -1){
            $(this).remove();
          }
        });
        
        // Set reseller addresses value to default addresses select list
        $("#end-customers-addresses select").on('change', function() {
          OptionValue = $(this).val();
          $(addressbookList + ' select').val(OptionValue).trigger( "change" );
        });
      }
  
      // Helper function to create reseller addresses list  
      function render_reseller_addresses() {
        // Remove previous vershion if exist
        $('#reseller-addresses').remove();
        // Remove End customers addresses select list
        $('#end-customers-addresses').remove();  

        // Generate Reseller addresses select list
        $(addressbookList).clone().appendTo('.field-name-field-end-customer').wrap("<div id='reseller-addresses'></div>").fadeIn('slow');
        $('#reseller-addresses option').each(function() {
          list = $(this).text();
          if(list.indexOf('✉') != -1){
            $(this).remove();
          }
        });
        
        // Set End customers addresses value to default addresses select list
        $("#reseller-addresses select").on('change', function() {
          OptionValue = $(this).val();
          $(addressbookList + ' select').val(OptionValue).trigger( "change" );
        });
      }
    }
  };
}(jQuery));


