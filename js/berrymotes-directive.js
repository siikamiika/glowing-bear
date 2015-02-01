(function() {
'use strict';

var weechat = angular.module('weechat');

weechat.directive('berrymotes', ['$rootScope', function($rootScope) {
    return {
        priority: -1000,
        restrict: 'A',
        scope: {
            berrymotes: '&'
        },
        link: function(scope, element, attrs) {
            // ensure Bem is loaded and enabled
            if ( !window.Bem || !Bem.enabled || !Bem.map || !scope.berrymotes() )
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
