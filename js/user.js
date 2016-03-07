(function ($) {
  Drupal.behaviors.AchatProfile = {
    attach: function (context, settings) {
      // User profile
      $("#user-profile-form a[href='#undefined']").click(function(){
        $("#tabs ul.tabs--secondary li").removeClass( "active" );
      });
      
      // User Address Book
      // Country
      var OptionValue = $("#edit-field-countries-und").val(); // On load
      $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-country').val(OptionValue);
      
      $("#edit-field-countries-und").bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-country').val(OptionValue);
      });
      
      // Company      
      $("#edit-field-reseller-und").bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-organisation-name').val(OptionValue);
      });
      
      // Full name
      // Name      
      $("#edit-field-first-name-und-0-value").bind("change load paste keyup", function() {
        var lastname = $("#edit-field-last-name-und-0-value").val();
        var name = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-name-line').val(name + ' ' + lastname);
      });
       // Last Name     
      $("#edit-field-last-name-und-0-value").bind("change load paste keyup", function() {
        lastname = $(this).val();
        name = $("#edit-field-first-name-und-0-value").val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-name-line').val(name + ' ' + lastname);
      });
      
      // Address 1
      $("#edit-field-address-1-und-0-value").bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-thoroughfare').val(OptionValue);
      });
      
      // Address 2
      $("#edit-field-address-2-und-0-value").bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-premise').val(OptionValue);
      });
      
      // City
      $("#edit-field-city-und-0-value").bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-locality').val(OptionValue);
      });

      //Postal code      
      $("#edit-field-postal-code-und-0-value").bind("change load paste keyup", function() {
        OptionValue = $(this).val();
        $('#edit-field-billing-register-und-profiles-0-commerce-customer-address-und-0-postal-code').val(OptionValue);
      });
      
      //Set is Global on user register/edit page
      $('.page-user-register .field-name-field-global input').prop('checked', true);
      $('.page-user-edit .field-name-field-global input').prop('checked', true);
    }
  };
}(jQuery));