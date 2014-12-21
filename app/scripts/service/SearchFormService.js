(function(){
    "use strict";

    var productService;
    var location;
    var today = new Date();
    var DEFAULTS = {
        product : "",
        category : "",
        maxCloseDate : today.getMonth() +'/'+ today.getDate() + '/' +today.getFullYear(),
        numOfBids : 4,
        lowPrice : 0,
        highPrice : 500
    };

    function init() {
        this.product = DEFAULTS.product;
        this.category = DEFAULTS.category;
        this.maxCloseDate = DEFAULTS.maxCloseDate;
        this.numOfBids = DEFAULTS.numOfBids;
        this.lowPrice = DEFAULTS.lowPrice;
        this.highPrice = DEFAULTS.highPrice;
    }

    var SearchFormService = function($location, ProductService){
        productService = ProductService;
        location = $location;

        init.call(this);
    };
    SearchFormService.prototype = {

        getParamsByModel: function () {
            var locationObj = {};
            for (var param in this) {
                var paramType = typeof (this[param]);
                if ((paramType == 'string' || paramType == 'number') && this[param] && this[param] != DEFAULTS[param]) {
                    locationObj[param] = this[param];
                }
            }
            return locationObj;
        },
        submitBtn : function(){
            var locationObj = this.getParamsByModel();
            if (location.path() != "/search") {
                location.search(locationObj).path("/search");
            } else {
                location.search(locationObj);
                productService.find(locationObj);
            }




        },

        applyLocationParams : function(params){
            if (location.$$path == "/search" && params) {
                //reset all service val
                init.call(this);
                //set by params
                for (var param in params) {
                    if (DEFAULTS[param] != 'undefined') {
                        if (typeof DEFAULTS[param] == 'number') {
                            this[param] = parseFloat(params[param]);
                        } else if (typeof DEFAULTS[param] == 'string') {
                            this[param] = params[param];
                        }

                    }
                }
                var locationObj = this.getParamsByModel();
                productService.find(locationObj);
            }

        }
    }

    angular.module('auction').service('SearchFormService',['$location', 'ProductService', SearchFormService]);


}());
