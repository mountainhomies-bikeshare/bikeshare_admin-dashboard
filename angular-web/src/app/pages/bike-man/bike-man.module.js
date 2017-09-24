(function() {
    'use strict';

    angular.module('BlurAdmin.pages.bike-man', [])
        .config(routeConfig)
        .controller('BikesCtrl', BikesCtrl);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('bike', {
            url: '/bike',
            templateUrl: 'app/pages/bike-man/bikes.html',
            title: 'Bikes Management',
            controller: 'BikesCtrl',
            sidebarMeta: {
                icon: 'ion-ios-location-outline',
                order: 800,
            },
        });
    }

    /** @ngInject */
    function BikesCtrl($scope, $filter) {

        /*==================================
        =            Data Block            =
        ==================================*/

        $scope.bikes = [{
                id: 1,
                name: 'Giant 101',
                status: "In-Use",
                deadline: new Date(2017, 10, 1),
                price: 1,
            },
            {
                id: 2,
                name: 'Super Speedy',
                status: "Idle",
                deadline: new Date(2017, 9, 29),
                price: 5,
            },
        ];


        $scope.statuses = [
            { value: 1, text: 'Idle' },
            { value: 2, text: 'In-Use' },
        ];

        /*=====  End of Data Block  ======*/




        //For Deadline picker 
        $scope.opened = {};

        $scope.open = function($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        };


        //For Status 

        $scope.showStatus = function(bike) {
            var selected = [];
            if (bike.status) {
                selected = $filter('filter')($scope.statuses, { value: bike.status });
            }
            return selected.length ? selected[0].text : 'Not set';
        };


    }
})();