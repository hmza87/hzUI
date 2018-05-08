/**
 * Created by HAMZA on 08/05/2018.
 */

var hz = {

    _module : function(elem, options){
        elem = this.__toJq(elem);
        options = $.extend({}, options, {});


        return this;
    },


    translation : function(elem, add, speed){
        elem = this.__toJq(elem);
        add = add !== undefined ? add : true;
        speed = speed !== undefined ? speed : '1x';

        elem.addClass('hz-transition-1x');

        return this;
    },

    flash : function(elem, options){
        options = $.extend({}, options, {

        });

        elem = this.__toJq(elem);

        elem.addClass('hz-flashing');

        return this;
    },




    //private helpers
    __toJq : function(obj){
        return (typeof elem == "string") ? $(elem) : elem;
    },





    //utils
    log     : console.log,


};