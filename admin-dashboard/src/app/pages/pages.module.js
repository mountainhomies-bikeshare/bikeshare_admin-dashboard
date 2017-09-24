/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages', [
            'ui.router',

            'BlurAdmin.pages.track',
            'BlurAdmin.pages.bike-man',
            // 'BlurAdmin.pages.dashboard',
            // 'BlurAdmin.pages.ui',
            // 'BlurAdmin.pages.components',
            // 'BlurAdmin.pages.form',
            // 'BlurAdmin.pages.tables',
            // 'BlurAdmin.pages.charts',
            // 'BlurAdmin.pages.maps',
            // 'BlurAdmin.pages.profile',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider, $sceDelegateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://api.hypertrack.com/api/v1/**',
            'https://dashboard.hypertrack.com/**',
            "http://ec2-54-67-95-165.us-west-1.compute.amazonaws.com/**"
        ]);


        // baSidebarServiceProvider.addStaticItem({
        //     title: 'Pages',
        //     icon: 'ion-document',
        //     subMenu: [{
        //         title: 'Sign In',
        //         fixedHref: 'auth.html',
        //         blank: true
        //     }, {
        //         title: 'Sign Up',
        //         fixedHref: 'reg.html',
        //         blank: true
        //     }, {
        //         title: 'User Profile',
        //         stateRef: 'profile'
        //     }, {
        //         title: '404 Page',
        //         fixedHref: '404.html',
        //         blank: true
        //     }]
        // });
    }

})();