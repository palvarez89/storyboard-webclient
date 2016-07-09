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
                        case 'review':
                            return "progress-bar-warning";
                        case 'inprogress':
                            return "progress-bar-info";
                        case 'invalid':
                            return "progress-bar-danger";
                        case 'merged':
                            return "progress-bar-success";
                        default:
                            return "hidden";
                    }
                }

                function calculateProgress(total, count) {
                    return (count*100)/total;
                }

                function countValidTasks(task_statuses) {
                    var total = 0;
                    for (var i = 0; i < task_statuses.length; i++) {
                        if (task_statuses[i].key != 'invalid') {
                            total += task_statuses[i].count;
                        }
                    }
                    return total;
                }
                function calculatePercentage() {
                    if (!$scope.story) {
                        return null;
                    }

                    var progress = [];
                    var total = countValidTasks($scope.story.task_statuses);
                    var story_status = getStoryStatus();

                    if (story_status == 'invalid' || story_status == 'merged') {
                         progress.push({key: story_status,
                                        progress: 100,
                                        color: progressBarColor(story_status)
                                       })
                    } else {
                    
                        console.log($scope.story)

                        for (var i = 0; i < $scope.story.task_statuses.length; i++) {
                            progress.push({key: $scope.story.task_statuses[i].key,
                                           progress: calculateProgress(total, $scope.story.task_statuses[i].count),
                                           color: progressBarColor($scope.story.task_statuses[i].key)
                                          })
                        }
                    }
                    console.log(progress)
                    console.log(total)
                    $scope.progress = progress;
                    
                }


                //var unwatch = $scope.$watch(getStoryStatus, pdateStoryLabel);
                //$scope.$on('$destroy', unwatch);
                calculatePercentage();
                updateStoryLabel();
            }
        };
    });
