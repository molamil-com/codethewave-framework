/**
 * Created by ts on 08/06/16.
 */


var keys = {};
var isCreated = false;

var el;
var create = function(){
    el = document.createElement('div');
    el.id = "SPFDebug";
    el.style.display = "none";
    el.style.position = "fixed";
    el.style.top = "0px";
    el.style.left = "0px";
    el.style.zIndex = 9999;
    el.style.padding = "10px";
    el.style.backgroundColor = "black";
    document.body.appendChild(el);
    isCreated = true;
}

module.exports = function(key, value, color){

    /*
    if (window.console && typeof window.console.log == "function")
        window.console.log(key+ " "+value);
    */

    if(!isCreated) create();
    color = color || "#d4d4d4"
    if(typeof(keys[key]) == 'undefined'){
        var r = document.createElement('p');
        r.style.color = color;
        r.style.fontSize = "8px";
        r.style.lineHeight = "8px";
        el.appendChild(r);
        keys[key] = r;
    }
    keys[key].innerHTML = "<a style='color:rgba(255,23,78,100)'>"+key+":</a> "+value;
};

