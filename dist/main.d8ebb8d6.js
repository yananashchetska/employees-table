// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/main.js":[function(require,module,exports) {
'use strict';

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var table = document.querySelector('table');
var tableHead = table.querySelector('THEAD');
var tableBody = table.querySelector('TBODY');
var notifications = [];
var index = 0;
var asc = false;
var sortTable = function sortTable(headerIndex) {
  var asc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var directionModifier = asc ? 1 : -1;
  var rows = _toConsumableArray(table.rows).slice(1, -1);
  var reg = /\$/;
  rows.sort(function (rowA, rowB) {
    var valueA = rowA.cells[headerIndex].textContent.trim();
    var valueB = rowB.cells[headerIndex].textContent.trim();
    if (reg.test(valueA)) {
      valueA = checkSalary(valueA);
      valueB = checkSalary(valueB);
    }
    return valueA > valueB ? 1 * directionModifier : -1 * directionModifier;
  });
  return rows;
};
tableHead.addEventListener('click', function (ev) {
  asc = !asc;
  var sortingIndex = Array.prototype.indexOf.call(ev.target.parentElement.children, ev.target);
  var sortedRows = sortTable(sortingIndex, asc);
  tableBody.innerHTML = '';
  sortedRows.forEach(function (row) {
    tableBody.appendChild(row);
  });
});
function checkSalary(salary) {
  return +salary.replace(/\D/g, '');
}

// selected functional:

tableBody.addEventListener('click', function (ev) {
  _toConsumableArray(table.rows).forEach(function (row) {
    row.classList.remove('active');
  });
  if (ev.target.tagName !== 'TD') {
    _toConsumableArray(table.rows).forEach(function (row) {
      row.classList.remove('active');
    });
  }
  ev.target.parentElement.classList.add('active');
});
document.addEventListener('click', function (ev) {
  if (ev.target.parentElement.tagName !== 'TR') {
    _toConsumableArray(tableBody.rows).forEach(function (row) {
      row.classList.remove('active');
    });
  }
});

// adding form:

// TODO: add a function to wrap inputs via labels;

var form = document.createElement('form');
form.classList.add('new-employee-form');
var nameField = document.createElement('input');
var positionField = document.createElement('input');
var ageInput = document.createElement('input');
var salaryInput = document.createElement('input');
var select = document.createElement('select');
var submitButton = document.createElement('button');
var body = document.body;
body.append(form);
function wrapField(form, input, labelText) {
  var label = document.createElement('label');
  input.classList.add('cell-input');
  input.dataset.qa = "".concat(labelText.toLowerCase());
  label.textContent = "".concat(labelText);
  if (labelText.toLowerCase() === 'age' || labelText.toLowerCase() === 'salary') {
    input.type = 'number';
  }
  label.appendChild(input);
  form.appendChild(label);
}
wrapField(form, nameField, 'Name');
wrapField(form, positionField, 'Position');
wrapField(form, select, 'Office');
wrapField(form, ageInput, 'Age');
wrapField(form, salaryInput, 'Salary');
form.appendChild(submitButton);
submitButton.textContent = 'Save to table';
function insertOption(selectionField, optionText) {
  var option = document.createElement('option');
  option.textContent = "".concat(optionText);
  selectionField.appendChild(option);
}
insertOption(select, 'Tokyo');
insertOption(select, 'Singapore');
insertOption(select, 'London');
insertOption(select, 'New York');
insertOption(select, 'Edinburgh');
insertOption(select, 'San Francisco');
submitButton.addEventListener('click', function (ev) {
  ev.preventDefault();
  var formElements = _toConsumableArray(form.elements).slice(0, -1);
  var values = [];
  formElements.forEach(function (element) {
    console.dir(element);
    if (element.value === '') {
      notify('error', "You should fill your ".concat(element.dataset.qa, " first!"));
    } else if (element.dataset.qa === 'name' && element.value.length < 4) {
      notify('error', 'Name should be longer than 4 digits!');
      return;
    } else if (element.dataset.qa === 'age' && !isAgeValid(element)) {
      notify('error', 'You should be 18 - 90 years old!');
      return;
    } else {
      values.push(element.value);
    }
  });
  if (values.length === 5) {
    insertRow(values);
    notify('succes', 'Your info was succesfully added to the table!');
  }
  form.reset();
});
function insertRow(valuesArray) {
  var row = tableBody.insertRow();
  valuesArray.forEach(function (value) {
    var cell = row.insertCell();
    if (!isNaN(value) && value.length > 3) {
      cell.textContent = formatSalary(value);
    } else {
      cell.textContent = value;
    }
  });
}
function formatSalary(salaryNumber) {
  var formattedNumber = Number(salaryNumber).toLocaleString('en-US');
  return "$".concat(formattedNumber);
}
function notify(result, message) {
  var notification = document.createElement('div');
  notification.dataset.qa = 'notification';
  notification.classList.add('notification');
  notification.classList.add("".concat(result));
  var title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = "".concat(result.charAt(0).toUpperCase() + result.slice(1));
  var description = document.createElement('p');
  description.textContent = "".concat(message);
  notification.appendChild(title);
  notification.appendChild(description);
  body.appendChild(notification);
  notifications.push(notification);
  notifications.forEach(function (notif, index) {
    notif.style.top = "".concat(10 + index * 110, "px");
  });
  setTimeout(function () {
    notification.remove(), notifications.shift();
  }, 3000);
}
function isAgeValid(element) {
  var age = +element.value;
  return age < 18 ? false : age > 90 ? false : true;
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63109" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map