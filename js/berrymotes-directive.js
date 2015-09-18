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
            if ( !scope.berrymotes() || !window.Bem || !Bem.enabled || !Bem.map )
                return;

            // emote after DOM is done
            var el = element[0];
            setTimeout(function(){
                var wasBottom = $rootScope.bufferBottom;
                setTimeout(function(){
                    $rootScope.updateBufferBottom(wasBottom);
                }, 500);

                for ( var node = el.firstChild; node; node = node.nextSibling ){
                    // text node
                    if ( node.nodeType === 3 )
                        Bem.applyEmotesToTextNode(node);
                }
            }, 0);
        }
    };
}]);
})();
