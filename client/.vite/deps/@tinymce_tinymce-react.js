import {
  require_prop_types
} from "./chunk-2WDQDCDP.js";
import {
  require_react
} from "./chunk-6GAV2S6I.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/Editor.js
var React = __toESM(require_react());

// node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/EditorPropTypes.js
var PropTypes = __toESM(require_prop_types());
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var eventPropTypes = {
  onActivate: PropTypes.func,
  onAddUndo: PropTypes.func,
  onBeforeAddUndo: PropTypes.func,
  onBeforeExecCommand: PropTypes.func,
  onBeforeGetContent: PropTypes.func,
  onBeforeRenderUI: PropTypes.func,
  onBeforeSetContent: PropTypes.func,
  onBeforePaste: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClearUndos: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onCommentChange: PropTypes.func,
  onCompositionEnd: PropTypes.func,
  onCompositionStart: PropTypes.func,
  onCompositionUpdate: PropTypes.func,
  onCopy: PropTypes.func,
  onCut: PropTypes.func,
  onDblclick: PropTypes.func,
  onDeactivate: PropTypes.func,
  onDirty: PropTypes.func,
  onDrag: PropTypes.func,
  onDragDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragGesture: PropTypes.func,
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onExecCommand: PropTypes.func,
  onFocus: PropTypes.func,
  onFocusIn: PropTypes.func,
  onFocusOut: PropTypes.func,
  onGetContent: PropTypes.func,
  onHide: PropTypes.func,
  onInit: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onLoadContent: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onNodeChange: PropTypes.func,
  onObjectResizeStart: PropTypes.func,
  onObjectResized: PropTypes.func,
  onObjectSelected: PropTypes.func,
  onPaste: PropTypes.func,
  onPostProcess: PropTypes.func,
  onPostRender: PropTypes.func,
  onPreProcess: PropTypes.func,
  onProgressState: PropTypes.func,
  onRedo: PropTypes.func,
  onRemove: PropTypes.func,
  onReset: PropTypes.func,
  onSaveContent: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onSetAttrib: PropTypes.func,
  onSetContent: PropTypes.func,
  onShow: PropTypes.func,
  onSubmit: PropTypes.func,
  onUndo: PropTypes.func,
  onVisualAid: PropTypes.func,
  onSkinLoadError: PropTypes.func,
  onThemeLoadError: PropTypes.func,
  onModelLoadError: PropTypes.func,
  onPluginLoadError: PropTypes.func,
  onIconsLoadError: PropTypes.func,
  onLanguageLoadError: PropTypes.func,
  onScriptsLoad: PropTypes.func,
  onScriptsLoadError: PropTypes.func
};
var EditorPropTypes = __assign({ apiKey: PropTypes.string, licenseKey: PropTypes.string, id: PropTypes.string, inline: PropTypes.bool, init: PropTypes.object, initialValue: PropTypes.string, onEditorChange: PropTypes.func, value: PropTypes.string, tagName: PropTypes.string, tabIndex: PropTypes.number, cloudChannel: PropTypes.string, plugins: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), toolbar: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), disabled: PropTypes.bool, readonly: PropTypes.bool, textareaName: PropTypes.string, tinymceScriptSrc: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    async: PropTypes.bool,
    defer: PropTypes.bool
  }))
]), rollback: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([false])]), scriptLoading: PropTypes.shape({
  async: PropTypes.bool,
  defer: PropTypes.bool,
  delay: PropTypes.number
}) }, eventPropTypes);

// node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE.js
var getTinymce = function(view) {
  var global = view;
  return global && global.tinymce ? global.tinymce : null;
};

// node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/Utils.js
var isFunction = function(x) {
  return typeof x === "function";
};
var isEventProp = function(name) {
  return name in eventPropTypes;
};
var eventAttrToEventName = function(attrName) {
  return attrName.substr(2);
};
var configHandlers2 = function(handlerLookup, on, off, adapter, prevProps, props, boundHandlers) {
  var prevEventKeys = Object.keys(prevProps).filter(isEventProp);
  var currEventKeys = Object.keys(props).filter(isEventProp);
  var removedKeys = prevEventKeys.filter(function(key) {
    return props[key] === void 0;
  });
  var addedKeys = currEventKeys.filter(function(key) {
    return prevProps[key] === void 0;
  });
  removedKeys.forEach(function(key) {
    var eventName = eventAttrToEventName(key);
    var wrappedHandler = boundHandlers[eventName];
    off(eventName, wrappedHandler);
    delete boundHandlers[eventName];
  });
  addedKeys.forEach(function(key) {
    var wrappedHandler = adapter(handlerLookup, key);
    var eventName = eventAttrToEventName(key);
    boundHandlers[eventName] = wrappedHandler;
    on(eventName, wrappedHandler);
  });
};
var configHandlers = function(editor, prevProps, props, boundHandlers, lookup) {
  return configHandlers2(
    lookup,
    editor.on.bind(editor),
    editor.off.bind(editor),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    function(handlerLookup, key) {
      return function(e) {
        var _a;
        return (_a = handlerLookup(key)) === null || _a === void 0 ? void 0 : _a(e, editor);
      };
    },
    prevProps,
    props,
    boundHandlers
  );
};
var unique = 0;
var uuid = function(prefix) {
  var time = Date.now();
  var random = Math.floor(Math.random() * 1e9);
  unique++;
  return prefix + "_" + random + unique + String(time);
};
var isTextareaOrInput = function(element) {
  return element !== null && (element.tagName.toLowerCase() === "textarea" || element.tagName.toLowerCase() === "input");
};
var normalizePluginArray = function(plugins) {
  if (typeof plugins === "undefined" || plugins === "") {
    return [];
  }
  return Array.isArray(plugins) ? plugins : plugins.split(" ");
};
var mergePlugins = function(initPlugins, inputPlugins) {
  return normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
};
var isBeforeInputEventAvailable = function() {
  return window.InputEvent && typeof InputEvent.prototype.getTargetRanges === "function";
};
var isInDoc = function(elem) {
  if (!("isConnected" in Node.prototype)) {
    var current = elem;
    var parent_1 = elem.parentNode;
    while (parent_1 != null) {
      current = parent_1;
      parent_1 = current.parentNode;
    }
    return current === elem.ownerDocument;
  }
  return elem.isConnected;
};
var setMode = function(editor, mode) {
  if (editor !== void 0) {
    if (editor.mode != null && typeof editor.mode === "object" && typeof editor.mode.set === "function") {
      editor.mode.set(mode);
    } else {
      editor.setMode(mode);
    }
  }
};
var getTinymceOrError = function(view) {
  var tinymce = getTinymce(view);
  if (!tinymce) {
    throw new Error("tinymce should have been loaded into global scope");
  }
  return tinymce;
};
var isDisabledOptionSupported = function(editor) {
  return editor.options && editor.options.isRegistered("disabled");
};

// node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/ScriptLoader2.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var injectScriptTag = function(doc, item, handler) {
  var _a, _b;
  var scriptTag = doc.createElement("script");
  scriptTag.referrerPolicy = "origin";
  scriptTag.type = "application/javascript";
  scriptTag.id = item.id;
  scriptTag.src = item.src;
  scriptTag.async = (_a = item.async) !== null && _a !== void 0 ? _a : false;
  scriptTag.defer = (_b = item.defer) !== null && _b !== void 0 ? _b : false;
  var loadHandler = function() {
    scriptTag.removeEventListener("load", loadHandler);
    scriptTag.removeEventListener("error", errorHandler);
    handler(item.src);
  };
  var errorHandler = function(err) {
    scriptTag.removeEventListener("load", loadHandler);
    scriptTag.removeEventListener("error", errorHandler);
    handler(item.src, err);
  };
  scriptTag.addEventListener("load", loadHandler);
  scriptTag.addEventListener("error", errorHandler);
  if (doc.head) {
    doc.head.appendChild(scriptTag);
  }
};
var createDocumentScriptLoader = function(doc) {
  var lookup = {};
  var scriptLoadOrErrorHandler = function(src, err) {
    var item = lookup[src];
    item.done = true;
    item.error = err;
    for (var _i = 0, _a = item.handlers; _i < _a.length; _i++) {
      var h = _a[_i];
      h(src, err);
    }
    item.handlers = [];
  };
  var loadScripts = function(items, success, failure) {
    var failureOrLog = function(err) {
      return failure !== void 0 ? failure(err) : console.error(err);
    };
    if (items.length === 0) {
      failureOrLog(new Error("At least one script must be provided"));
      return;
    }
    var successCount = 0;
    var failed = false;
    var loaded = function(_src, err) {
      if (failed) {
        return;
      }
      if (err) {
        failed = true;
        failureOrLog(err);
      } else if (++successCount === items.length) {
        success();
      }
    };
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
      var item = items_1[_i];
      var existing = lookup[item.src];
      if (existing) {
        if (existing.done) {
          loaded(item.src, existing.error);
        } else {
          existing.handlers.push(loaded);
        }
      } else {
        var id = uuid("tiny-");
        lookup[item.src] = {
          id,
          src: item.src,
          done: false,
          error: null,
          handlers: [loaded]
        };
        injectScriptTag(doc, __assign2({ id }, item), scriptLoadOrErrorHandler);
      }
    }
  };
  var deleteScripts = function() {
    var _a;
    for (var _i = 0, _b = Object.values(lookup); _i < _b.length; _i++) {
      var item = _b[_i];
      var scriptTag = doc.getElementById(item.id);
      if (scriptTag != null && scriptTag.tagName === "SCRIPT") {
        (_a = scriptTag.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(scriptTag);
      }
    }
    lookup = {};
  };
  var getDocument = function() {
    return doc;
  };
  return {
    loadScripts,
    deleteScripts,
    getDocument
  };
};
var createScriptLoader = function() {
  var cache = [];
  var getDocumentScriptLoader = function(doc) {
    var loader = cache.find(function(l) {
      return l.getDocument() === doc;
    });
    if (loader === void 0) {
      loader = createDocumentScriptLoader(doc);
      cache.push(loader);
    }
    return loader;
  };
  var loadList = function(doc, items, delay, success, failure) {
    var doLoad = function() {
      return getDocumentScriptLoader(doc).loadScripts(items, success, failure);
    };
    if (delay > 0) {
      setTimeout(doLoad, delay);
    } else {
      doLoad();
    }
  };
  var reinitialize = function() {
    for (var loader = cache.pop(); loader != null; loader = cache.pop()) {
      loader.deleteScripts();
    }
  };
  return {
    loadList,
    reinitialize
  };
};
var ScriptLoader = createScriptLoader();

// node_modules/@tinymce/tinymce-react/lib/es2015/main/ts/components/Editor.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign3 = function() {
  __assign3 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign3.apply(this, arguments);
};
var changeEvents = "change keyup compositionend setcontent CommentChange";
var Editor = (
  /** @class */
  function(_super) {
    __extends(Editor2, _super);
    function Editor2(props) {
      var _a, _b, _c;
      var _this = _super.call(this, props) || this;
      _this.rollbackTimer = void 0;
      _this.valueCursor = void 0;
      _this.rollbackChange = function() {
        var editor = _this.editor;
        var value = _this.props.value;
        if (editor && value && value !== _this.currentContent) {
          editor.undoManager.ignore(function() {
            editor.setContent(value);
            if (_this.valueCursor && (!_this.inline || editor.hasFocus())) {
              try {
                editor.selection.moveToBookmark(_this.valueCursor);
              } catch (_e) {
              }
            }
          });
        }
        _this.rollbackTimer = void 0;
      };
      _this.handleBeforeInput = function(_evt) {
        if (_this.props.value !== void 0 && _this.props.value === _this.currentContent && _this.editor) {
          if (!_this.inline || _this.editor.hasFocus()) {
            try {
              _this.valueCursor = _this.editor.selection.getBookmark(3);
            } catch (_e) {
            }
          }
        }
      };
      _this.handleBeforeInputSpecial = function(evt) {
        if (evt.key === "Enter" || evt.key === "Backspace" || evt.key === "Delete") {
          _this.handleBeforeInput(evt);
        }
      };
      _this.handleEditorChange = function(_evt) {
        var editor = _this.editor;
        if (editor && editor.initialized) {
          var newContent = editor.getContent();
          if (_this.props.value !== void 0 && _this.props.value !== newContent && _this.props.rollback !== false) {
            if (!_this.rollbackTimer) {
              _this.rollbackTimer = window.setTimeout(_this.rollbackChange, typeof _this.props.rollback === "number" ? _this.props.rollback : 200);
            }
          }
          if (newContent !== _this.currentContent) {
            _this.currentContent = newContent;
            if (isFunction(_this.props.onEditorChange)) {
              _this.props.onEditorChange(newContent, editor);
            }
          }
        }
      };
      _this.handleEditorChangeSpecial = function(evt) {
        if (evt.key === "Backspace" || evt.key === "Delete") {
          _this.handleEditorChange(evt);
        }
      };
      _this.initialise = function(attempts) {
        var _a2, _b2, _c2;
        if (attempts === void 0) {
          attempts = 0;
        }
        var target = _this.elementRef.current;
        if (!target) {
          return;
        }
        if (!isInDoc(target)) {
          if (attempts === 0) {
            setTimeout(function() {
              return _this.initialise(1);
            }, 1);
          } else if (attempts < 100) {
            setTimeout(function() {
              return _this.initialise(attempts + 1);
            }, 100);
          } else {
            throw new Error("tinymce can only be initialised when in a document");
          }
          return;
        }
        var tinymce = getTinymceOrError(_this.view);
        var finalInit = __assign3(__assign3(__assign3(__assign3({}, _this.props.init), { selector: void 0, target, disabled: _this.props.disabled, readonly: _this.props.readonly, inline: _this.inline, plugins: mergePlugins((_a2 = _this.props.init) === null || _a2 === void 0 ? void 0 : _a2.plugins, _this.props.plugins), toolbar: (_b2 = _this.props.toolbar) !== null && _b2 !== void 0 ? _b2 : (_c2 = _this.props.init) === null || _c2 === void 0 ? void 0 : _c2.toolbar }), _this.props.licenseKey ? { license_key: _this.props.licenseKey } : {}), { setup: function(editor) {
          _this.editor = editor;
          _this.bindHandlers({});
          if (_this.inline && !isTextareaOrInput(target)) {
            editor.once("PostRender", function(_evt) {
              editor.setContent(_this.getInitialValue(), { no_events: true });
            });
          }
          if (_this.props.init && isFunction(_this.props.init.setup)) {
            _this.props.init.setup(editor);
          }
          if (_this.props.disabled) {
            if (isDisabledOptionSupported(_this.editor)) {
              _this.editor.options.set("disabled", _this.props.disabled);
            } else {
              _this.editor.mode.set("readonly");
            }
          }
        }, init_instance_callback: function(editor) {
          var _a3;
          var initialValue = _this.getInitialValue();
          _this.currentContent = (_a3 = _this.currentContent) !== null && _a3 !== void 0 ? _a3 : editor.getContent();
          if (_this.currentContent !== initialValue) {
            _this.currentContent = initialValue;
            editor.setContent(initialValue);
            editor.undoManager.clear();
            editor.undoManager.add();
            editor.setDirty(false);
          }
          if (_this.props.init && isFunction(_this.props.init.init_instance_callback)) {
            _this.props.init.init_instance_callback(editor);
          }
        } });
        if (!_this.inline) {
          target.style.visibility = "";
        }
        if (isTextareaOrInput(target)) {
          target.value = _this.getInitialValue();
        }
        tinymce.init(finalInit);
      };
      _this.id = _this.props.id || uuid("tiny-react");
      _this.elementRef = React.createRef();
      _this.inline = (_c = (_a = _this.props.inline) !== null && _a !== void 0 ? _a : (_b = _this.props.init) === null || _b === void 0 ? void 0 : _b.inline) !== null && _c !== void 0 ? _c : false;
      _this.boundHandlers = {};
      return _this;
    }
    Object.defineProperty(Editor2.prototype, "view", {
      get: function() {
        var _a, _b;
        return (_b = (_a = this.elementRef.current) === null || _a === void 0 ? void 0 : _a.ownerDocument.defaultView) !== null && _b !== void 0 ? _b : window;
      },
      enumerable: false,
      configurable: true
    });
    Editor2.prototype.componentDidUpdate = function(prevProps) {
      var _this = this;
      var _a, _b;
      if (this.rollbackTimer) {
        clearTimeout(this.rollbackTimer);
        this.rollbackTimer = void 0;
      }
      if (this.editor) {
        this.bindHandlers(prevProps);
        if (this.editor.initialized) {
          this.currentContent = (_a = this.currentContent) !== null && _a !== void 0 ? _a : this.editor.getContent();
          if (typeof this.props.initialValue === "string" && this.props.initialValue !== prevProps.initialValue) {
            this.editor.setContent(this.props.initialValue);
            this.editor.undoManager.clear();
            this.editor.undoManager.add();
            this.editor.setDirty(false);
          } else if (typeof this.props.value === "string" && this.props.value !== this.currentContent) {
            var localEditor_1 = this.editor;
            localEditor_1.undoManager.transact(function() {
              var cursor;
              if (!_this.inline || localEditor_1.hasFocus()) {
                try {
                  cursor = localEditor_1.selection.getBookmark(3);
                } catch (_e) {
                }
              }
              var valueCursor = _this.valueCursor;
              localEditor_1.setContent(_this.props.value);
              if (!_this.inline || localEditor_1.hasFocus()) {
                for (var _i = 0, _a2 = [cursor, valueCursor]; _i < _a2.length; _i++) {
                  var bookmark = _a2[_i];
                  if (bookmark) {
                    try {
                      localEditor_1.selection.moveToBookmark(bookmark);
                      _this.valueCursor = bookmark;
                      break;
                    } catch (_e) {
                    }
                  }
                }
              }
            });
          }
          if (this.props.readonly !== prevProps.readonly) {
            var readonly = (_b = this.props.readonly) !== null && _b !== void 0 ? _b : false;
            setMode(this.editor, readonly ? "readonly" : "design");
          }
          if (this.props.disabled !== prevProps.disabled) {
            if (isDisabledOptionSupported(this.editor)) {
              this.editor.options.set("disabled", this.props.disabled);
            } else {
              setMode(this.editor, this.props.disabled ? "readonly" : "design");
            }
          }
        }
      }
    };
    Editor2.prototype.componentDidMount = function() {
      var _this = this;
      var _a, _b, _c, _d, _f;
      if (getTinymce(this.view) !== null) {
        this.initialise();
      } else if (Array.isArray(this.props.tinymceScriptSrc) && this.props.tinymceScriptSrc.length === 0) {
        (_b = (_a = this.props).onScriptsLoadError) === null || _b === void 0 ? void 0 : _b.call(_a, new Error("No `tinymce` global is present but the `tinymceScriptSrc` prop was an empty array."));
      } else if ((_c = this.elementRef.current) === null || _c === void 0 ? void 0 : _c.ownerDocument) {
        var successHandler = function() {
          var _a2, _b2;
          (_b2 = (_a2 = _this.props).onScriptsLoad) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
          _this.initialise();
        };
        var errorHandler = function(err) {
          var _a2, _b2;
          (_b2 = (_a2 = _this.props).onScriptsLoadError) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, err);
        };
        ScriptLoader.loadList(this.elementRef.current.ownerDocument, this.getScriptSources(), (_f = (_d = this.props.scriptLoading) === null || _d === void 0 ? void 0 : _d.delay) !== null && _f !== void 0 ? _f : 0, successHandler, errorHandler);
      }
    };
    Editor2.prototype.componentWillUnmount = function() {
      var _this = this;
      var editor = this.editor;
      if (editor) {
        editor.off(changeEvents, this.handleEditorChange);
        editor.off(this.beforeInputEvent(), this.handleBeforeInput);
        editor.off("keypress", this.handleEditorChangeSpecial);
        editor.off("keydown", this.handleBeforeInputSpecial);
        editor.off("NewBlock", this.handleEditorChange);
        Object.keys(this.boundHandlers).forEach(function(eventName) {
          editor.off(eventName, _this.boundHandlers[eventName]);
        });
        this.boundHandlers = {};
        editor.remove();
        this.editor = void 0;
      }
    };
    Editor2.prototype.render = function() {
      return this.inline ? this.renderInline() : this.renderIframe();
    };
    Editor2.prototype.beforeInputEvent = function() {
      return isBeforeInputEventAvailable() ? "beforeinput SelectionChange" : "SelectionChange";
    };
    Editor2.prototype.renderInline = function() {
      var _a = this.props.tagName, tagName = _a === void 0 ? "div" : _a;
      return React.createElement(tagName, {
        ref: this.elementRef,
        id: this.id,
        tabIndex: this.props.tabIndex
      });
    };
    Editor2.prototype.renderIframe = function() {
      return React.createElement("textarea", {
        ref: this.elementRef,
        style: { visibility: "hidden" },
        name: this.props.textareaName,
        id: this.id,
        tabIndex: this.props.tabIndex
      });
    };
    Editor2.prototype.getScriptSources = function() {
      var _a, _b;
      var async = (_a = this.props.scriptLoading) === null || _a === void 0 ? void 0 : _a.async;
      var defer = (_b = this.props.scriptLoading) === null || _b === void 0 ? void 0 : _b.defer;
      if (this.props.tinymceScriptSrc !== void 0) {
        if (typeof this.props.tinymceScriptSrc === "string") {
          return [{ src: this.props.tinymceScriptSrc, async, defer }];
        }
        return this.props.tinymceScriptSrc.map(function(item) {
          if (typeof item === "string") {
            return { src: item, async, defer };
          } else {
            return item;
          }
        });
      }
      var channel = this.props.cloudChannel;
      var apiKey = this.props.apiKey ? this.props.apiKey : "no-api-key";
      var cloudTinyJs = "https://cdn.tiny.cloud/1/".concat(apiKey, "/tinymce/").concat(channel, "/tinymce.min.js");
      return [{ src: cloudTinyJs, async, defer }];
    };
    Editor2.prototype.getInitialValue = function() {
      if (typeof this.props.initialValue === "string") {
        return this.props.initialValue;
      } else if (typeof this.props.value === "string") {
        return this.props.value;
      } else {
        return "";
      }
    };
    Editor2.prototype.bindHandlers = function(prevProps) {
      var _this = this;
      if (this.editor !== void 0) {
        configHandlers(this.editor, prevProps, this.props, this.boundHandlers, function(key) {
          return _this.props[key];
        });
        var isValueControlled = function(p) {
          return p.onEditorChange !== void 0 || p.value !== void 0;
        };
        var wasControlled = isValueControlled(prevProps);
        var nowControlled = isValueControlled(this.props);
        if (!wasControlled && nowControlled) {
          this.editor.on(changeEvents, this.handleEditorChange);
          this.editor.on(this.beforeInputEvent(), this.handleBeforeInput);
          this.editor.on("keydown", this.handleBeforeInputSpecial);
          this.editor.on("keyup", this.handleEditorChangeSpecial);
          this.editor.on("NewBlock", this.handleEditorChange);
        } else if (wasControlled && !nowControlled) {
          this.editor.off(changeEvents, this.handleEditorChange);
          this.editor.off(this.beforeInputEvent(), this.handleBeforeInput);
          this.editor.off("keydown", this.handleBeforeInputSpecial);
          this.editor.off("keyup", this.handleEditorChangeSpecial);
          this.editor.off("NewBlock", this.handleEditorChange);
        }
      }
    };
    Editor2.propTypes = EditorPropTypes;
    Editor2.defaultProps = {
      cloudChannel: "7"
    };
    return Editor2;
  }(React.Component)
);
export {
  Editor
};
//# sourceMappingURL=@tinymce_tinymce-react.js.map
