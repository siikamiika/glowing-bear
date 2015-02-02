(function() {
'use strict';

var weechat = angular.module('weechat');

weechat.directive('plugin', ['$rootScope', function($rootScope) {
    /*
     * Plugin directive
     * Shows additional plugin content
     */
    return {
        templateUrl: 'directives/plugin.html',

        scope: {
            plugin: '=data'
        },

        controller: ['$scope', function($scope) {

            $scope.displayedContent = "";

            // Auto-display embedded content only if it isn't NSFW, or if NSFW is set to show by default
            $scope.plugin.visible = $rootScope.auto_display_embedded_content && (!$scope.plugin.nsfw || $rootScope.auto_display_nsfw_content);

            // user-accessible hash key that is a valid CSS class name
            $scope.plugin.className = "embed_" + $scope.plugin.$$hashKey.replace(':','_');

            $scope.plugin.getElement = function() {
                return document.querySelector("." + $scope.plugin.className);
            };

            $scope.hideContent = function() {
                $scope.plugin.visible = false;
            };

            $scope.showContent = function(automated) {
                /*
                 * Shows the plugin content.
                 * displayedContent is bound to the DOM.
                 * Actual plugin content is only fetched when
                 * content is shown.
                 */

                var embed = $scope.plugin.getElement();

                // If the plugin is asynchronous / lazy, execute it now and let it insert itself
                // TODO store the result between channel switches
                if ($scope.plugin.content instanceof Function){
                    // Don't rerun if the result is already there
                    if (embed.innerHTML === "") {
                        $scope.plugin.content();
                    }
                } else {
                    $scope.displayedContent = $scope.plugin.content;
                }
                $scope.plugin.visible = true;

                // Scroll embed content into view
                var scroll;
                if (automated) {
                    var wasBottom = $rootScope.bufferBottom;
                    scroll = function() {
                        $rootScope.updateBufferBottom(wasBottom);
                    };
                } else {
                    scroll = function() {
                        if (embed && embed.scrollIntoViewIfNeeded !== undefined) {
                            embed.scrollIntoViewIfNeeded();
                            $rootScope.updateBufferBottom();
                        }
                    };
                }
                setTimeout(scroll, 500);
            };

            if ($scope.plugin.visible) {
                $scope.showContent(true);
            }
        }]
    };
}]);
})();
