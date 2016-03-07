<?php
/**
 * Override or insert variables for the page templates.
 */
function achat_preprocess_html (&$vars) {
  /* Add Font Awesome */
  drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css', array('group' => CSS_THEME, 'type' => 'external'));
  drupal_add_css('http://localhost/developers/achat/css/style.css', array('group' => CSS_THEME, 'type' => 'external'));
  switch (arg(0)) {
  case 'checkout':
   // drupal_add_js(drupal_get_path('theme', 'achat') .'/js/checkout.js', 'file');
    break;
  case 'user':
    drupal_add_js(drupal_get_path('theme', 'achat') .'/js/user.js', 'file');
    break;
  case 'node':
    if(arg(2) == 'edit') {
      drupal_add_js(drupal_get_path('theme', 'achat') .'/js/node-edit.js', 'file');
    }
    break;
  }
}

/**
 * Provide a bootstrap multilevel menu
 */
// French
function achat_menu_link__menu_main_menu_fr(&$variables) {
  $output = _bootstrap_multilevel_menu($variables);
  return $output;
}
// English
function achat_menu_link__menu_main_menu_en(&$variables) {
  $output = _bootstrap_multilevel_menu($variables);
  return $output;
}
// Spanish
function achat_menu_link__menu_main_menu_es(&$variables) {
  $output = _bootstrap_multilevel_menu($variables);
  return $output;
}
// German
function achat_menu_link__menu_main_menu_de(&$variables) {
  $output = _bootstrap_multilevel_menu($variables);
  return $output;
}
// Italian
function achat_menu_link__menu_main_menu_it(&$variables) {
  $output = _bootstrap_multilevel_menu($variables);
  return $output;
}

/**
 * Overrides theme_menu_tree().
 * Formatting links to bootstrap styles
 */
// French
function achat_menu_tree__menu_main_menu_fr(&$variables) {
  $output = _bootstrap_link_formatter($variables);
  return $output;
}
// English
function achat_menu_tree__menu_main_menu_en(&$variables) {
  $output = _bootstrap_link_formatter($variables);
  return $output;
}
// Spanish
function achat_menu_tree__menu_main_menu_es(&$variables) {
  $output = _bootstrap_link_formatter($variables);
  return $output;
}
// German
function achat_menu_tree__menu_main_menu_de(&$variables) {
  $output = _bootstrap_link_formatter($variables);
  return $output;
}
// Italian
function achat_menu_tree__menu_main_menu_it(&$variables) {
  $output = _bootstrap_link_formatter($variables);
  return $output;
}

/* Helper function for formatting links to bootstrap styles */
function _bootstrap_link_formatter(&$variables){
  $output =
  '<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse" aria-expanded="false">
					<span class="sr-only"> </span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>

			<div class="collapse navbar-collapse" id="bs-navbar-collapse">
				<ul class="nav navbar-nav">'. $variables['tree'].'</ul>
			</div>
		</div>
	</nav>';
  return $output;
}

// Helper function to provide a bootstrap multilevel menu
// See for details http://www.drupalgeeks.com/drupal-blog/how-render-bootstrap-sub-menus
function _bootstrap_multilevel_menu($variables) {
  $element = $variables['element'];
  $sub_menu = '';
  
  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    } elseif ((!empty($element['#original_link']['depth'])) && $element['#original_link']['depth'] > 1) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      $element['#attributes']['class'][] = 'dropdown-submenu';
      $element['#localized_options']['html'] = TRUE;
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
    } else {
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      $element['#title'] .= ' <span class="caret"></span>';
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
    }
  }
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }
  $element['#attributes']['class'][] = 'mlid-'.$variables['element']['#original_link']['mlid'];
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}

/**
 * Themes an empty shopping cart block's contents.
 */
function achat_commerce_cart_empty_block() {
  return '<div class="cart-empty-block">' . t('Cart') . '</div>';
}