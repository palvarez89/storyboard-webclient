/*
 * Copyright (c) 2014 Hewlett-Packard Development Company, L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/**
 * Story detail &  manipulation controller.
 */
angular.module('sb.story').controller('StoryDeleteController',
    function ($log, $scope, $state, story, $modalInstance) {
        'use strict';

        $scope.story = story;

        // Set our progress flags and clear previous error conditions.
        $scope.isUpdating = true;
        $scope.error = {};

        $scope.remove = function () {
            $scope.story.$delete(
                function () {
                    $modalInstance.dismiss('success');
                    $state.go('sb.project.list');
                }
            );
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    });
