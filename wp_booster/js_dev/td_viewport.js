/**
 * Created by tagdiv on 13.05.2015.
 */


"use strict";


var td_viewport = {


    /**
     * - keep the current interval index
     * - it should be a positive value
     */
    _view_port_interval_index: -1,


    /**
     * - it keeps the interval index
     * - it should be a crescendo positive values
     */
    _interval_list: [],


    /**
     *
     */
    init: function init() {
        if ((typeof window.td_viewport_interval_list !== undefined) && (window.td_viewport_interval_list.constructor === Array)) {
            this.set_interval_list(window.td_viewport_interval_list);
            td_viewport.detect_changes();
        }
    },


    /**
     * - setter of the _view_port_interval_index
     * - it should be used by outsiders libraries
     * @param value
     */
    set_view_port_interval_index : function set_view_port_interval_index(value) {
        this._view_port_interval_index = value;
    },


    /**
     * - getter of the _view_port_interval_index
     * - it should be used by outsiders libraries
     * @returns {*}
     */
    get_view_port_interval_index : function get_view_port_interval_index() {
        return this._view_port_interval_index;
    },


    /**
     * - setter of the _interval_list
      - it should be used by outsiders libraries
     * @param value
     */
    set_interval_list : function set_interval_list(value) {
        this._interval_list = value;
    },


    /**
     * - getter of the _interval_list
     * - it should be used by outsiders libraries
     * @param value
     * @returns {*}
     */
    get_interval_list : function get_interval_list() {
        return this._interval_list;
    },


    /**
     * detect viewport changes
     * @returns {boolean} True when viewport has changed
     */
    detect_changes: function detect_changes() {
        var result = false;

        var real_view_port_width = 0;
        var local_view_port_interval_index = 0;

        if (td_detect.is_safari === true) {
            real_view_port_width = this._safari_view_port_width.get_real_width();
        } else {
            real_view_port_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }

        for (var i = 0; i < td_viewport._interval_list.length; i++) {

            if (real_view_port_width <= td_viewport._interval_list[i]) {

                if (local_view_port_interval_index != td_viewport._view_port_interval_index) {
                    td_viewport._view_port_interval_index = local_view_port_interval_index;
                    result = true;

                    td_viewport.log('changing viewport ' + td_viewport._view_port_interval_index + ' ~ ' + real_view_port_width);
                }

                break;
            }
            local_view_port_interval_index++;
        }

        if ((result == false) && (local_view_port_interval_index != td_viewport._view_port_interval_index)) {
            td_viewport._view_port_interval_index = local_view_port_interval_index;
            result = true;

            td_viewport.log('changing viewport ' + td_viewport._view_port_interval_index + ' ~ ' + real_view_port_width);
        }

        return result;
    },


    /**
     * get the real view port width on safari
     * @type {{div_added: boolean, div_jquery_object: string, get_real_width: Function}}
     */
    _safari_view_port_width : {
        div_added : false,
        div_jquery_object : '',

        get_real_width : function get_real_widht () {
            if (this.div_added === false) {
                // we don't have a div present
                this.div_jquery_object = jQuery('<div>')
                    .css({

                        "height": "1px",
                        "position": "absolute",
                        "top": "-1",
                        "left": "0",
                        "right": "0",
                        "visibility": "hidden",
                        "z-index": "-1"

                    });
                this.div_jquery_object.appendTo('body');
                this.div_added = true;
            }
            return this.div_jquery_object.width();
        }
    },



    log: function log(msg) {
        //console.log(msg);
    }
};

td_viewport.init();
