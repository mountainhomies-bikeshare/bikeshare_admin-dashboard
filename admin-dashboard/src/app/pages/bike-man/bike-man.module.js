(function() {
    'use strict';

    angular.module('BlurAdmin.pages.bike-man', [])
        .config(routeConfig)
        .controller('BikesCtrl', BikesCtrl)
        .controller('AddBikeCtrl', AddBikeCtrl)
        .controller('BarChartCtrl', BarChartCtrl)
        .service('BikeCRUD', BikeCRUD);

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
    function BikeCRUD($http, $sce) {
        var g_id = "b63bcb40-d03c-4360-b221-8f21db413dfd";
        var baseUrl = "https://api.hypertrack.com/api/v1";
        var serverUrl = "http://ec2-54-67-95-165.us-west-1.compute.amazonaws.com:5000";


        var _headers = {
            'Authorization': 'token sk_0eeeb6548add587a5338ced6eaf6fab2b9df5364',
            'Content-Type': 'application/json'
        };

        var bikes = [{
                id: 1,
                name: 'Giant 101',
                is_on_loan: true,
                deadline: new Date(2017, 10, 1),
                price: 1,
                ht_id: '84ee7591-7a82-457f-9a32-3ff9ed5d7f35',
                group_id: g_id
            },
            {
                id: 2,
                name: 'Super Speedy',
                is_on_loan: false,
                deadline: new Date(2017, 9, 29),
                price: 5,
            },
        ];

        var svs = {
            baseUrl: baseUrl,
            serverUrl: serverUrl,
            add: addBike,
            getBikesList: getBikesList,
            removebike: removebike,
            ht_id: "4a920974-1144-424f-a207-5722666fbcf1",
            getMiles: getMiles
        };

        function getMiles(id){
            return $http.get(
                "http://api.hypertrack.com/api/v1/users/"+id+"/placeline/"
                ).then(function(resp){
                    return resp.data[0].distance;
                });
        }

        function removebike(index) {
            //TODO
        }

        // return the newly created bike
        function addBike(bike) {
            var id = bikes.length + 1;
            bike.id = id;

            //TODO: Query the Hypertrack for ids
            var payload = {
                name: bike.name,
                group_id: g_id,
                lookup_id: bike.id
            };

            return $http.post(
                'https://api.hypertrack.com/api/v1/users/',
                payload, { headers: _headers });
        }

        function getBikesList() {
            return $http.get(serverUrl + '/v1/list_all_bikes');
            // return $http.get(`${baseUrl}/users/?group_id=${g_id}`, {headers: _headers });
        }

        return svs;
    }

    /** @ngInject */
    function BikesCtrl($scope, $filter, $uibModal, BikeCRUD, $http) {

        /*==================================
        =            Data Block            =
        ==================================*/

        $scope.bikes = [];

        BikeCRUD.getBikesList()
            .then(function(resp) {
                console.log(resp);

                $scope.bikes = resp.data;
                console.log(resp.data);
                angular.forEach($scope.bikes, function(bike, index) {
                    bike.id = parseInt(bike.id);
                    bike.price = parseInt(bike.price);
                    bike.name = bike.description;
                });
            });

        // $scope.bikes = BikeCRUD.getBikesList();


        $scope.statuses = [
            { value: 0, text: 'Idle' },
            { value: 1, text: 'In-Use' },
        ];

        /*=====  End of Data Block  ======*/


        /*=================================
        =            Functions            =
        =================================*/
        //For adding a bike 
        $scope.addBike = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                // component: 'bikeModal',
                templateUrl: 'app/pages/bike-man/add-bike.html',
                controller: 'AddBikeCtrl',
            });

            var rawBike = {};

            modalInstance.result
                .then(function(res) {
                    rawBike = res;
                    return BikeCRUD.add(res);
                })
                .then(function(resp) {
                    var bike = resp.data;
                    bike.ht_id = bike.id;
                    angular.merge(bike, rawBike);
                    $scope.bikes.push(bike);
                    return bike;
                })
                .then(function(bike) {
                    var db_bike = angular.merge({}, bike);
                    db_bike.deadline = db_bike.deadline.toISOString();
                    db_bike.price = db_bike.price + "";
                    db_bike.id = db_bike.id + "";
                    db_bike.account_id = bike.group_id;
                    db_bike.description = bike.name;


                    console.log(db_bike);
                    $http.post(BikeCRUD.serverUrl + "/v1/register_bike", db_bike)
                        .then(function(resp) {
                            console.log(resp);
                        });
                });

        };

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
            if (bike.is_on_loan !== undefined) {
                selected = $filter('filter')($scope.statuses, { value: bike.is_on_loan });
            }
            return selected.length ? selected[0].text : 'Not set';
        };


        $scope.removebike = function(index) {
            BikeCRUD.removeBike(index);
        };

        $scope.getUrl = function(bike) {
            var base = "https://dashboard.hypertrack.com/widget/map/users;";
            // var id = "84ee7591-7a82-457f-9a32-3ff9ed5d7f35";
            var id = bike.ht_id;
            var date = "";
            var url = base + 'id=' + id + ';day=2017-09-24?&ordering=-last_heartbeat_at' + '&key=sk_0eeeb6548add587a5338ced6eaf6fab2b9df5364';
            console.log(url);
            return url;
        };

        /*=====  End of Functions  ======*/
    }


    /** @ngInject */
    function BarChartCtrl($scope, baConfig, $element, layoutPaths) {
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');
        var barChart = AmCharts.makeChart(id, {
            type: 'serial',
            theme: 'blur',
            color: layoutColors.defaultText,
            dataProvider: [{
                    week: 'Aug 23',
                    money: 20,
                    color: layoutColors.info
                },
                {
                    week: 'Sept 2',
                    money: 22,
                    color: layoutColors.success
                },
                {
                 week: 'Sept 9',
                    money: 11,
                    color: layoutColors.warning
                },
                {
                    week: 'Sept 16',
                    money: 14,
                    color: layoutColors.primaryLight
                }
            ],
            valueAxes: [{
                axisAlpha: 0,
                position: 'left',
                title: 'Rent Collected',
                gridAlpha: 0.5,
                gridColor: layoutColors.border,
            }],
            startDuration: 1,
            graphs: [{
                balloonText: '<b>[[category]]: [[value]]</b>',
                fillColorsField: 'color',
                fillAlphas: 0.7,
                lineAlpha: 0.2,
                type: 'column',
                valueField: 'money'
            }],
            chartCursor: {
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false
            },
            categoryField: 'week',
            categoryAxis: {
                gridPosition: 'start',
                labelRotation: 45,
                gridAlpha: 0.5,
                gridColor: layoutColors.border,
            },
            export: {
                enabled: true
            },
            creditsPosition: 'top-right',
            pathToImages: layoutPaths.images.amChart
        });
    }

    /** @ngInject */
    function AddBikeCtrl($scope, $uibModalInstance) {
        /*----------  For Date Picker  ----------*/
        $scope.format = 'dd-MMMM-yyyy';
        $scope.options = {
            showWeeks: false
        };
        $scope.opened = false;
        $scope.openDatePicker = function() { $scope.opened = true; };


        /*----------  Modal Control  ----------*/
        $scope.ok = function() {
            $scope.bike.place = $scope.place;
            console.log($scope.bike);
            $uibModalInstance.close($scope.bike);
        };

        $scope.cancel = function() { $uibModalInstance.dismiss('cancel'); };
    }
})();