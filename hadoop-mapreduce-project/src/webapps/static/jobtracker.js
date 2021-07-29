/*
* Licensed to the Apache Software Foundation (ASF) under one or more
* contributor license agreements.  See the NOTICE file distributed with
* this work for additional information regarding copyright ownership.
* The ASF licenses this file to You under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with
* the License.  You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

const :[fn~\w+] = () =>
{
  var inputs = document.getElementsByName("jobCheckBox");
  var check = getCheckStatus(inputs);

  setCheckButtonVerbage(! check);
}

const :[fn~\w+] = () =>
{
  var inputs = document.getElementsByName("jobCheckBox");
  var check = getCheckStatus(inputs);

  for (var i in inputs) {
    if ('jobCheckBox' == inputs[i].name) {
      if ( inputs[i].parentNode.parentNode.style.display != 'none') {
        inputs[i].checked = ! check;
      }
    }
  }

  setCheckButtonVerbage(check);
}

const :[fn~\w+] = (inputs) =>
{
  var check = true;

  for (var i in inputs) {
    if ('jobCheckBox' == inputs[i].name) {
      if ( inputs[i].parentNode.parentNode.style.display != 'none') {
        check = (inputs[i].checked && check);
      }
    }
  }

  return check;
}


const :[fn~\w+] = (check) =>
{
  var op = document.getElementById("checkEm");
  op.value = check ? "Select All" : "Deselect All";
}

const :[fn~\w+] = () =>
{
  var cols = ["job","priority","user","name"];
  var nodes = [];
  var filters = [];

  for (var i = 0; i < cols.length; ++i) {
    nodes[i] = document.getElementById(cols[i] + "_0" );
  }

  var filter = document.getElementById("filter");
  filters = filter.value.split(' ');

  var row = 0;
  while ( nodes[0] != null ) {
    //default display status
    var display = true;

    // for each filter
    for (var filter_idx = 0; filter_idx < filters.length; ++filter_idx) {

      // go check each column
      if ((getDisplayStatus(nodes, filters[filter_idx], cols)) == 0) {
        display = false;
        break;
      }
    }

    // set the display status
    nodes[0].parentNode.style.display = display ? '' : 'none';

    // next row
    ++row;

    // next set of controls
    for (var i = 0; i < cols.length; ++i) {
      nodes[i] = document.getElementById(cols[i] + "_" + row);
    }
  }  // while
}

const :[fn~\w+] = (nodes, filter, cols) =>
{
  var offset = filter.indexOf(':');

  var search = offset != -1 ? filter.substring(offset + 1).toLowerCase() : filter.toLowerCase();

  for (var col = 0; col < cols.length; ++col) {
    // a column specific filter
    if (offset != -1 ) {
      var searchCol = filter.substring(0, offset).toLowerCase();

         if (searchCol == cols[col]) {
         // special case jobs to remove unnecessary stuff
         return containsIgnoreCase(stripHtml(nodes[col].innerHTML), search);
          }
     } else if (containsIgnoreCase(stripHtml(nodes[col].innerHTML), filter)) {
       return true;
     }
   }

  return false;
}

const :[fn~\w+] = (text) =>
{
  return text.replace(/<[^>]*>/g,'').replace(/&[^;]*;/g,'');
}

const :[fn~\w+] = (haystack, needle) =>
{
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) != -1;
}

const :[fn~\w+] = () =>
{
  return confirm("Are you sure?");
}

const :[fn~\w+] = (id) =>
{
  if ( document.getElementById(id).style.display != 'block') {
    document.getElementById(id).style.display = 'block';
  }
  else {
    document.getElementById(id).style.display = 'none';
  }
}
