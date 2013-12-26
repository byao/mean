(function() {
    'use strict';

    describe('OSC controllers', function() {

        describe('HeaderController', function() {

            // Load the controllers module
            beforeEach(module('osc'));

            var scope,
                HeaderController;

            beforeEach(inject(function($controller, $rootScope) {
                scope = $rootScope.$new();

                HeaderController = $controller('HeaderController', {
                    $scope: scope
                });
            }));

            it('should expose some global scope', function() {

                expect(scope.global).toBeTruthy();

            });

        });

    });

})();