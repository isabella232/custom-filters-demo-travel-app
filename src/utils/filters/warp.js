/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 define(["mobileui/utils/filter",
         "mobileui/utils/base64",
         "third-party/text!mobileui/utils/filters/shaders/warp.vert",
         "third-party/text!mobileui/utils/filters/shaders/warp.frag"], function(Filter, base64, vert, frag) {

    var header;
    function initHeader() {
        if (header)
            return;
        header = "custom(url(" + base64.url(vert) + ") mix(url(" + base64.url(frag) + ") multiply source-atop)";
    }

    return Filter.registerCustomFilter("warp", "shadow x y",
        function(fn) {
            initHeader();
            return header + ", " +
             "30 2, x " + fn._x.toFixed(6) + ", y " + fn._y.toFixed(6) + ", " +
             "transform perspective(1000), stretch 0.1, touchSize 2)";
    });

});