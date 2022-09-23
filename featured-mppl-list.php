<?php

/*
  Plugin Name: Featured MPPL List Block
  Version: 1.1.0
  Author: Chris Amling
  Author URI: https://christopheramling.com
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function get_list_data($list_name_full)
{

  $database = get_database_name($list_name_full);
  $list = get_list_name($list_name_full);
  // create curl resource
  $ch = curl_init();

  // set url
  curl_setopt($ch, CURLOPT_URL, 'https://mppl.org/list_system/api.php/'.$database."/".rawurlencode($list));

  //return the transfer as a string
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  // $output contains the output string
  $output = curl_exec($ch);

  // close curl resource to free up system resources
  curl_close($ch);   
  $json_output = json_decode($output);


  return $json_output;

}

function get_database_name($list_name)
{
    return strtok($list_name, '/');
}

function get_list_name($list_name)
{
return substr($list_name, strpos($list_name, "/") + 1);  
}


class featuredMpplList {
  function __construct() {
    add_action('init', [$this, 'onInit']);
  }

  function onInit() {
    wp_register_script('featuredMpplListScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-i18n', 'wp-editor'));
    wp_register_style('featuredMpplListStyle', plugin_dir_url(__FILE__) . 'build/index.css');

    register_block_type('ourplugin/featured-mppl-list', array(
      'render_callback' => [$this, 'renderCallback'],
      'editor_script' => 'featuredMpplListScript',
      'editor_style' => 'featuredMpplListStyle'
    ));
  }


  function renderCallback($attributes) {
    if($attributes['listId'])
    {

      wp_enqueue_style('featuredMpplListStyle');


      $contentBlock = '';
      $contentBlock .= '<div ' . get_block_wrapper_attributes() . '>';
        $contentBlock .= '<h1 class="list_title">' . get_list_name($attributes["listId"]) . '</h1>';
        $contentBlock .= '<div class="list_container">';
      
      $list_api_data = get_list_data($attributes['listId']);

      $temp = 0; 

      if(isset($attributes['backgroundColor']))
      {
        $backgroundColor = $attributes['backgroundColor'];
      }
      else{
        $backgroundColor = "inherit";
      }
      
      if(isset($attributes['columns']))
      {
        $columns = $attributes['columns'];
      }
      else
      {
        $columns = 4;
      }

      if(isset($attributes['displayCount']) && $attributes['displayCount'] > 0)
      {
        $displayCount = $attributes['displayCount'];
      }
      else
      {
        $displayCount = count($list_api_data);
      }

      for ($i=0; $i < $displayCount; $i++) 
      { 
          if($i % $columns == 0){
 
            $contentBlock .= "<div class='row'>";
            $temp = $i;
          }

          $contentBlock .= "<div class='list_item' style='background-color:".$backgroundColor."'>";
            $contentBlock .= "<img src=".$list_api_data[$i]->item_image."/>";
            $contentBlock .= "<a href='".$list_api_data[$i]->item_link."'>";
            $contentBlock .= "<h2>".$list_api_data[$i]->item_title."</h2>";
            $contentBlock .= "</a>";
            $contentBlock .= "<p>".$list_api_data[$i]->item_author."</p>";
            $contentBlock .= "<p>".$list_api_data[$i]->item_description."</p>";
            $contentBlock .= "<p class='hidden'>".$list_api_data[$i]->item_isbn."</p>";
            $contentBlock .= "<p class='hidden'>".$list_api_data[$i]->item_category."</p>";
            $contentBlock .= "<p class='hidden'>".$list_api_data[$i]->item_bib."</p>";
          $contentBlock .= "</div> ";
          
          if($i == $temp + $attributes['columns'] - 1)
          { 
            $contentBlock .= "</div>";
          }
      }
     
      $contentBlock .= '</div>';
      $contentBlock .= '</div>';

      return $contentBlock;

    }
    else{
      return null;
    }
   
   
  }

}

$featuredMpplList = new featuredMpplList();