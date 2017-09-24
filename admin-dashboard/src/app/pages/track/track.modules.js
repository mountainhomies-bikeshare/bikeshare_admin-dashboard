(function() {
    'use strict';

    angular.module('BlurAdmin.pages.track', [])
        .config(routeConfig)
        .controller('TrackCtrl', TrackCtrl);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('track', {
            url: '/track',
            templateUrl: 'app/pages/track/track.html',
            title: 'Tracking',
            controller: 'TrackCtrl',
            sidebarMeta: {
                icon: 'ion-ios-location-outline',
                order: 800,
            },
        });
    }

    /** @ngInject */
    function TrackCtrl($window, $sce, $http, $scope) {
        // function initialize() {
        //     console.log($window.ht);
        //     var baseUrl = 'https://api.hypertrack.com/api/v1';
        //     var uid = "5de30c89-eabb-4329-9247-0fdf012b5379";
        //     $http({
        //     	method: 'GET',
        //     	url: `${baseUrl}/actions/?user_id=${uid}`,
        //     	// url: `${baseUrl}/users/`,
        //     	headers: {
        //     		'Authorization': 'token sk_0eeeb6548add587a5338ced6eaf6fab2b9df5364',
        //     		'Content-Type': 'application/json' 
        //     	}
        //     })
        //     .then((resp)=>{
        //     	console.log(resp);
        //     });

        //     // var actionId = "44873124-1464-4798-8ee5-51316bc0264a";
        //     var shortCode = "aghm3Za";
        //     var pk = 'pk_54f2e023cd179babf0400dd029cbfff1463d4730';
        //     var trackOptions = {
        //         mapId: 'map',
        //         onReady: function(trackAction) {
        //         	console.log('onReady');
        //             console.log(trackAction);
        //             trackAction.resetBounds(); 

        //         },
        //         onActionReady: function(action) {
        //         	console.log('onActionReady');
        //             console.log(action);
        //             $scope.apply();
        //         }
        //     };


        //     var track = $window.ht.trackShortCode(shortCode, pk, trackOptions);
        //     console.log(track);

        //     // var map = track.map; //google map object
        //     // track.resetBounds(); //to reset bounds to bring all map items in view
        //     // var action = track.action; //get action object in sync.
        // }
        //widgets
        $scope.widgetUrl = $sce.trustAsResourceUrl(
            "https://dashboard.hypertrack.com/map/users?ordering=-last_heartbeat_at&key=sk_0eeeb6548add587a5338ced6eaf6fab2b9df5364");

    }
})();