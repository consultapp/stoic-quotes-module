<?php
/*
Plugin Name: Stoic Quotes Plugin
Author: Dmitry Egorov
Author URI: https://consultapp.ru
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_shortcode( 'stoic_quotes_module_shortcode', 'stoic_quotes_module_func' );
function stoic_quotes_module_func(){
	return file_get_contents(plugin_dir_path( __FILE__ ).'/template.html');
}

add_action( 'wp_enqueue_scripts', 'stoic_quotes_module_scripts' );
function stoic_quotes_module_scripts() {
	wp_enqueue_style( 'style-name', '/wp-content/plugins/stoic-quotes-wp-plugin/dist/css/stoic.css' );
}