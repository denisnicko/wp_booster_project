/*  ----------------------------------------------------------------------------
 tagDiv live css compiler ( 2013 )
 - this script is used on our demo site to customize the theme live
 - not used on production sites
 */
var td_current_panel_stat = td_read_site_cookie('td_show_panel');
if (td_current_panel_stat == 'show' || td_current_panel_stat == null) {
    jQuery('.td-theme-settings-small').addClass('td-theme-settings-no-transition');
    jQuery('.td-theme-settings-small').removeClass('td-theme-settings-small');
}

/*  ----------------------------------------------------------------------------
 On load
 */
jQuery().ready(function() {

    //hide panel
    jQuery("#td-theme-set-hide").click(function(event){
        event.preventDefault();
        event.stopPropagation();
        //hide
        td_set_cookies_life(['td_show_panel', 'hide', 86400000]);//86400000 is the number of milliseconds in a day
        jQuery('#td-theme-settings').removeClass('td-theme-settings-no-transition');
        jQuery('#td-theme-settings').addClass('td-theme-settings-small');


        jQuery('.td-set-theme-style-link').removeClass('fadeInLeft');

    });

    //show panel
    jQuery("#td-theme-settings").click(function(){
        if (jQuery(this).hasClass('td-theme-settings-small')) {

            jQuery('.td-set-theme-style-link').addClass('animated_xlong fadeInLeft');

            //show full
            td_set_cookies_life(['td_show_panel', 'show', 86400000]);//86400000 is the number of milliseconds in a day
            jQuery('.td-theme-settings-small').removeClass('td-theme-settings-small');
        }
    });

}); //end on load