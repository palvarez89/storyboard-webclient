/*
 * Copyright (c) 2013 Hewlett-Packard Development Company, L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/**
 * A story status label that automatically selects color and text based on
 * the bound-in story.
 */
angular.module('sb.util').directive('storyStatusLabel',
    function () {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'app/util/template/story_status_label.html',
            scope: {
                story: '='
            },
            controller: function ($scope) {

                /**
                 * Helper method to return the story status.
                 */
                function getStoryStatus() {
                    if (!$scope.story) {
                        return null;
                    } else {
                        return $scope.story.status;
                    }
                }

                /**
                 * Helper method to update the label style of the story.
                 */
                function updateStoryLabel() {
                    switch (getStoryStatus()) {
                        case 'invalid':
                            $scope.labelStyle = 'label-default';
                            break;
                        case 'active':
                            $scope.labelStyle = 'label-info';
                            break;
                        case 'merged':
                            $scope.labelStyle = 'label-success';
                            break;
                        default:
                            $scope.labelStyle = 'label-default';
                    }
                }

                function progressBarColor(key) {
                    switch (key) {
                        case 'invalid':
                            return "red";
                        default:
                            return "blue";
                    }
                }

                function calculateProgress(total, count) {
                    return (count*100)/total;
                }

                function calculatePercentage() {
                    if (!$scope.story) {
                        return null;
                    } else {
                        console.log($scope.story)
                        var total = 0;
                        var progress = []
                        for (var i = 0; i < $scope.story.task_statuses.length; i++) {
                            if ($scope.story.task_statuses[i].key != 'invalid') {
                                total += $scope.story.task_statuses[i].count
                            }
                        }
                        for (var i = 0; i < $scope.story.task_statuses.length; i++) {
                            progress.push({key: $scope.story.task_statuses[i].key,
                                           progress: calculateProgress(total, $scope.story.task_statuses[i].count),
                                           color: progressBarColor($scope.story.task_statuses[i].key),
                                          })
                        }
                        console.log(progress)
                        console.log(total)
                        return $scope.story.status;
                    }
               }


                var unwatch = $scope.$watch(getStoryStatus, updateStoryLabel);
                $scope.$on('$destroy', unwatch);
                calculatePercentage();
                updateStoryLabel();
            }
        };
    });
