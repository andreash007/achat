(function ($) {
  Drupal.behaviors.AchatGlobal = {
    attach: function (context, settings) {
      // Global Brands      
      $("#edit-field-ap-brand #edit-field-ap-brand-und-0-tid-select-1").bind("change", function() {
        OptionValue = $(this).find("option:selected").text();
        console.log(OptionValue.indexOf("<"));
        if (OptionValue.indexOf("<") == '-1' && OptionValue.indexOf("- ") == '-1') {
          $('#edit-field-brands-und').val(OptionValue);         
        }
      });
    }
  };
}(jQuery));