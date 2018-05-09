/**
 * Created by HAMZA on 08/05/2018.
 */

var hz = {

    _module : function(elem, options){
        elem = this.__toJq(elem);
        options = $.extend({}, options, {});


        return this;
    },


    transition : function(elem, add, speed){
        elem = this.__toJq(elem);
        add = add !== undefined ? add : true;
        speed = speed !== undefined ? speed : '1x';

        if(add){
            elem.addClass('hz-transition-' + speed);
        }else{
            elem.removeClass('hz-transition-' + speed);
        }

        return this;
    },

    flash : function(elem, options){
        var ctx = this;
        elem = this.__toJq(elem);
        options = $.extend({}, options, {

        });



        return this;
    },

    style : (function(){
        var tag = $('[data-hz="hzaddons"]');

        if(tag.length == 0) {
            tag = $('<style data-hz="hzaddons"></style>').appendTo('head');
        }



        return {
            stylesheet : tag,
            createClass: function(className, props){
                var txt = '.' + className + ':{#}';
                var ps = '';
                $.each(props, function(p, v){
                    ps += p + ': ' + v + ';';
                })

                tag.append(txt.replace('#', ps));

                return this;
            },

            getClass : function(className){
                var inner = hz.trim(tag.html());
                inner = hz.replace(inner, /\r?\n|\r|\t|\s\s/);
                var i = inner.indexOf(className);
                var parsed = undefined;
                if(i >= 0){
                    var start = inner.indexOf('{', i);
                    var end = inner.indexOf('}', start);
                    var str = inner.substr(i);
                    str = str.substr(0, (end - i) + 1);
                    parsed = hz._parseClass(str);

                }

                return parsed;

            },



            createAnimation : function(className, animationName, steps){
                var txt = '@keyframes ' + animationName + '{#}';
                var st = '';
                $.each(steps, function(s, props){
                    var step = '';
                    if(typeof s == 'number'){
                        step = s + '% {';
                    }else{
                        step = s + '{';
                    }
                    $.each(props, function(prop, val){
                        step += prop + ':' + val + ';';
                    })
                    step += '}';
                    st += step;
                });



            }


        }
    })(),




    //private helpers
    __toJq : function(obj){
        if(typeof obj !== 'object' || !(obj.hasOwnProperty('length'))){
            obj = $(obj);
        }
        return obj;
    },
    _parseClass : function(text){
        var selector = text.substr(0, text.indexOf('{'));
        selector = hz.trim(selector);
        var str_props = text.substr(text.indexOf('{'));
        str_props = str_props.replace('{', '').replace('}', '');
        str_props = hz.trim(str_props);

        var arr_props = str_props.split(';');
        var props = {};
        $.each(arr_props, function(i, line){
            var propName = hz.trim(line.split(':')[0] || '' );
            var propValue = hz.trim(line.split(':')[1] || '' );//.replace('{').replace('}');
            props[propName] = propValue;
        })

        return {
            selector : selector,
            props : props
        };
    },





    //utils
    log     : console.log,
    trim    : function(text){
        return text == null ?
            "" :
            ( text + "" ).replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g , "" );
    },
    replace : function(string, needle, text){
        text = text || '';
        if(typeof needle == 'object'){
            while (string.match(needle) != null && string.match(needle).length > 0){
                string = string.replace(needle, text);
            }
        }else{
            while (string.indexOf(needle) >= 0){
                string = string.replace(needle, text);
            }
        }

        return string;


    },


};