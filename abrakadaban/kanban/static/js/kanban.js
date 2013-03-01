var KanBanModule = angular.module('KanBan', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{&');
        $interpolateProvider.endSymbol('&}');
    }
);
KanBanModule.value('test', '123');

