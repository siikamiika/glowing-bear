(function() {
'use strict';

var weechat = angular.module('weechat');

weechat.directive('berrymotes', ['$rootScope', function($rootScope) {
    return {
        priority: -1000,
        link: function(scope, element, attrs) {
            // ensure Bem is loaded and enabled
            if ( !window.Bem || !Bem.enabled || !Bem.map || attrs.berrymotes !== 'true' )
                return;

            // ensure scope is valid
            if ( !scope.part || !scope.part.attrs || !scope.part.text )
                return;

            // ensure this is an emotable message
            if ( scope.part.attrs.name !== null || !Bem.emoteRegex.test(scope.part.text) )
                return;

            // emote after DOM is done
            var el = element[0];
            setTimeout(function(){
                var node = el.firstChild.firstChild;
                while ( node ){
                    if ( node.nodeType === 3 )
                        Bem.applyEmotesToTextNode(node);
                    node = node.nextSibling;
                }
            }, 0);
        }
    };
}]);
})();
