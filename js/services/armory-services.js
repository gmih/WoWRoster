(function(angular) {
    var app = angular.module('ArmoryServices', []);

    app.factory('ArmoryService', ['$http', function($http) {

        var data = {
            region: '',
            realm: '',
            guildName: ''
        };

        return {
            getRealms : function() {
                return $http.jsonp('https://' + this.getRegion().toLowerCase() + '.api.battle.net/wow/realm/status?locale=en_US&jsonp=JSON_CALLBACK&apikey=vggwc4ru9k5uq7hhz46dyga9st4pf6z6');
            },
            getCharacters : function() {
              return $http.jsonp('https://' + this.getRegion().toLowerCase() + '.api.battle.net/wow/guild/' + this.getRealm() + '/' + this.getGuildName() + '?fields=members&locale=en_US&jsonp=JSON_CALLBACK&apikey=vggwc4ru9k5uq7hhz46dyga9st4pf6z6');
            },
            asError : function(status, statusText) {
                return "Unable to fetch data from armory (Code " + status + ") : " + '\n' + statusText;
            },
            getRegion: function () {
                return data.region;
            },
            setRegion: function (region) {
                data.region = region;
            },
            getRealm: function () {
                return data.realm;
            },
            setRealm: function (realm) {
                data.realm = realm;
            },
            getGuildName: function () {
                return data.guildName;
            },
            setGuildName: function(guildName) {
                data.guildName = guildName;
            },
            saveInStorage : function() {
                if(typeof(Storage) !== "undefined") {
                    localStorage.setItem("wow-roster-region", data.region);
                    localStorage.setItem("wow-roster-realm", data.realm);
                    localStorage.setItem("wow-roster-guild-name", data.guildName);
                }
            }
        };
    }]);

})(angular);