
function Express() {
    // localStorage methods
    this.storage = {
  setItemAsync: function (key, data, returning = true) {
    return new Promise(function (resolved, rejected) {
      data = typeof data === "object" ? JSON.stringify(data) : data;
      try {
        localStorage.setItem(key, data);
        var item;
        if (returning === true) {
          item = localStorage.getItem(key);
          return resolved(item)
        } else {
          return resolved();
        }
      } catch(error) {
        return rejected(error)
      }
    })
  },
  getItemAsync: function (key) {
    return new Promise(function (resolved, rejected) {
      if (localStorage.getItem(key) === null) {
        return rejected(new Error("not found item"));
      } else {
        let item = localStorage.getItem(key);
        return resolved(item);
      }
    })
  },
  setItem: function (key, data) {
        data = typeof data === "object" ? JSON.stringify(data) : data;
        localStorage.setItem(key, data);
  },
  getItem: function (key) {
    return localStorage.getItem(key);    
  }
}



// function for making a promises


    this.redirect = function (url) {
        location.replace(url);
    };
    var route;
    // global variables
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;

    // function to check if the obkect is empty
    Object.prototype.isEmpty = function () {
        if (Object.keys(this).length === 0) {
            return true;
        } else {
            return false;
        }
    }
    this.removeComponent = function (componentName) {
        let component = this.getComponent(componentName);
        let componentIndex = DomComponents.indexOf(component.name);
        DomComponents.splice(componentIndex, 1);
        component.self.removeThis();
    }
    Element.prototype.removeThis = function () {
        if (this.parentNode.hasChildNodes(this)) {
            this.parentNode.removeChild(this);
        }
    }
    Element.prototype.insertAfter = function (element) {
        if (typeof element === "string") {
            this.insertAdjacentHTML("afterend", element);
        } else if (typeof element === "object") {
            this.parentNode.insertBefore(element, this.nextSibling);
        }
    }
    // array of dom components
    this.DomComponents = [];
    const DomComponents = this.DomComponents;
    //global variable
    var express = this;

    //functions to get the current params of location
    var params = {};
    window.location.search.substring(1).split('&').forEach(function(pair) {
        pair = pair.split('=');
        if (pair[1] !== undefined) {
            var key = decodeURIComponent(pair[0]),
                val = decodeURIComponent(pair[1]),
                val = val ? val.replace(/\++/g,' ').trim() : '';

            if (key.length === 0) {
                return;
            }
            if (params[key] === undefined) {
                params[key] = val;
            }
            else {
                if ("function" !== typeof params[key].push) {
                    params[key] = [params[key]];
                }
                params[key].push(val);
            }
        }
    });
    window.location.params = params;
    // end functions to get the current params of location

    //function to get a component from dom components array
    this.getComponent = function (name) {
        var components = [];
        DomComponents.forEach(function (component) {
            if (component.name === name) {
                components.push(component)
            }else {
                return component
            }
        });
        if (components.length === 1) {
            return components[0];
        } else if (components.length > 1) {
            return components[0];
        }
    }
    //end function to get a component from dom components array

    //function to refresh a component
    this.refreshComponent = function (component) {
        express.filterContent(component.parent)
        this.renderComponent(component.cb, component.parent, component.options, component.finish);
    };
    //end function to refresh a component


    //functions of dome events

    /*function to make an events of the dom with on event*/
    Object.prototype.event = function (event, cb, option) {
           if (this.length > 1) {
                this.forEach(function (el, i) {
                    return el.addEventListener(`${event}`, cb, option ? option : true);
                });
            } else if (this.length === 1) {
                 this.addEventListener(`${event}`, cb, option ? option : true);
            } else {
                if (typeof cb === "function") {
                    this.addEventListener(`${event}`, cb, option ? option : true);
                }
            }
    };
    /*function to make an events of the dom with on event*/

    /*function to make toggle click of a specific element, it returns a two callback the first one for the first click and the second callback for the second click*/

    Object.prototype.toggleClick = function (cb1, cb2) {
        var clicked = 0;
        if (cb1 && cb2) {
        if (this.length > 1) {
            this.forEach(function (el, i) {
                el.addEventListener("click", function (event) {
                    clicked++;
                    if (clicked === 1) {
                        return cb1(event);
                    } else if (clicked === 2) {
                        cb2(event);
                        return clicked = 0;
                    }
                });
            });
        } else if (this.length === 1) {
            this.addEventListener("click", function (event) {
                clicked++;
                if (clicked === 1) {
                    return cb1(event);
                } else if (clicked === 2) {
                    cb2(event);
                    return clicked = 0;
                }
            });
        }  else {
                if (typeof cb === "function") {
                    this.addEventListener(`${event}`, cb, option ? option : true);
                }
            }
    }
    };
    //end toggle click function

    /*function to make toggle hover of a specific element, it returns a two callback the first one for the first hover and the second callback for the second hover*/

    Object.prototype.toggleHover = function (cb1, cb2) {
        if (this.length > 1) {
            this.forEach(function (el, i) {
                el.addEventListener("mouseenter", function (event) {
                    return cb1(event);
                });
                el.addEventListener("mouseleave", function (event) {
                    return cb2(event);
                });
            });
        } else  if (this.length === 1) {
            this.addEventListener("mouseenter", function (event) {
                return cb1(event);
            });
            this.addEventListener("mouseleave", function (event) {
                return cb2(event);
            });
        }  else {
                if (typeof cb === "function") {
                    this.addEventListener(`${event}`, cb, option ? option : true);
                }
            }
    };
    //end toggle hover function

    //end functions of dom events

    // animation functions

    // slidedown function

    Element.prototype.slideDown = function (time, display, cb) {
        var element = this;
        window.onload = function () {
            makeSliding(element)
        }
        function makeSliding(element) {
            if (element) {
                var displayStatus = getComputedStyle(element, null).getPropertyValue("display") || element.style.display;
                if (typeof display === "function") {
                    cb = display;
                }
                if (displayStatus === "none" || displayStatus === "") {
                    element.style.display = display && typeof display === "string" ? display : "block";
                    var originalHeight = getComputedStyle(element).getPropertyValue("height") || element.style.height || element.offsetHeight;
                    var splitHeight = parseInt(originalHeight);
                    var typeHeight = originalHeight.split(splitHeight)[1];


                    var currentHeight = 0;
                    if (originalHeight.match(/px/gi)) {
                        element.style.height = currentHeight + "px";
                    } else if (originalHeight.match(/%/gi)) {
                        element.style.height = currentHeight + "%";
                    }
                    currentTime = splitHeight / (time / 10);
                    var animate = function () {
                        currentHeight += currentTime;
                        if (originalHeight.match(/px/gi)) {
                            element.style.height = currentHeight + "px";
                        } else if (originalHeight.match(/%/gi)) {
                            element.style.height = currentHeight / 10 + "%";
                        } else if (originalHeight.match(/auto/gi)) {
                            element.style.height = currentHeight + "auto";
                        }
                        if (element.style.height === originalHeight) {
                            cancelAnimationFrame(animate);
                            element.style.height = originalHeight;
                        } else {
                            (requestAnimationFrame && requestAnimationFrame(animate));
                        }
                    };
                    animate();
                }
                if (cb) {
                    setTimeout(function () {
                        return cb(element);
                    }, time);
                }
            }
        }
        if (document.readyState === "complete") {
            makeSliding(element)
        }
    };

    //end slide down function

    // slideup function

    Element.prototype.slidingUp = function (time, cb) {
        var element = this;
        if (element) {
            var originalHeight = getComputedStyle(element).getPropertyValue("height") || element.style.height;
            var displayStatus = getComputedStyle(element).getPropertyValue("display") || element.style.display;
            var splitHeight = parseInt(originalHeight);
            var typeHeight = originalHeight.split(splitHeight)[1];
            var currentHeight = Number.parseInt(originalHeight);
            if (displayStatus !== "none") {
                currentTime = splitHeight / (time / 10);
                var animate = function () {
                    currentHeight -= currentTime;
                    element.style.height = currentHeight + typeHeight;
                    if (currentHeight <= 0) {
                        cancelAnimationFrame(animate);
                        element.style.display = "none";
                        element.style.height = originalHeight;
                    } else {
                        requestAnimationFrame(animate);
                    }
                };
                requestAnimationFrame(animate);
            }

            if (cb) {
                setTimeout(function () {
                    return cb(element);
                }, time);
            }
        }
    };

    //end slide up function

    // function for fade toggle


    Element.prototype.fadeToggle = function (duration, displayTo, cb) {
        var element = this;
        if (!displayTo || typeof displayTo === "function") {
            displayTo = "block";
        }
        if (typeof displayTo === "function") {
            cb = displayTo;
        }
        if (getComputedStyle(element).getPropertyValue("display") === "" || getComputedStyle(element).getPropertyValue("display") !== "none") {
            element.fadeOut(duration, cb);
        }
        if (element.style.opacity < 1) {
            element.fadeIn(duration, displayTo, cb)
        } else if (element.style.opacity > 0) {
            element.fadeOut(duration, cb);
        }

    }
    // end function for fade toggle

    // function for slideToggle

    Element.prototype.slideToggle = function (duration, displayTo, cb) {
        var element = this;
        if (!displayTo || typeof displayTo === "function") {
            displayTo = "block";
        }
        if (typeof displayTo === "function") {
            cb = displayTo;
        }
        if (getComputedStyle(element).getPropertyValue("display") === "" || getComputedStyle(element).getPropertyValue("display") !== "none") {
            element.slidingUp(duration, cb);
        }
        if (element.style.opacity < 1) {
            element.slideDown(duration, displayTo, cb)
        } else if (element.style.opacity > 0) {
            element.slidingUp(duration, cb);
        }

    }
    // end function for slideToggle

    // fade in function
    Element.prototype.fadeIn = function (duration, display, cb) {
        if (typeof display === "function") {
            cb = display;
        }
        var element = this;
        element.style.opacity = 0;
        var last = +new Date();
        var animate = function() {
            element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
            last = +new Date();
            element.style.display = display && typeof display === "string" ? display : "block";
            if (+element.style.opacity < 1) {
                (requestAnimationFrame && requestAnimationFrame(animate))
            } else {
                window.cancelAnimationFrame(animate);
                element.style.opacity = 1;
            }
        };
        animate();
        if (cb) {
            setTimeout(function () {
                return cb(element)
            }, duration)
        }
    };

    // fade out function
    Element.prototype.fadeOut = function (duration, cb) {
        var element = this;
        element.style.opacity = 1;
        var last = +new Date();
        var animate = function() {
            element.style.opacity = +element.style.opacity - (new Date() - last) / duration;
            last = +new Date();
            if (+element.style.opacity < 0) {
                window.cancelAnimationFrame(animate);
                element.style.display = "none";
                element.style.opacity = 0;
            } else {
                (requestAnimationFrame && requestAnimationFrame(animate))
            }
        };
        animate();
        if (cb) {
            setTimeout(function () {
                return cb(element);
            }, duration)
        }
    };
    // end fade out function

    // animating function
    Element.prototype.animating = function (boxRotationKeyframes, boxRotationTiming, cb) {
        this.animate(boxRotationKeyframes, boxRotationTiming);
        if (cb && typeof cb === "function") {
            setTimeout(cb, boxRotationTiming.duration);
        }
    };
    // end animating function
    // function to remove a script
    this.removeScript = function (path, parent) {
        parent = typeof parent === "string" ? document.querySelector(parent) : parent;
        let script = parent.querySelector("script");
        if (script) {
            script.removeThis()
        }
    }
    //function to require a javascript file
    this.require = function (path, parent) {
        var script = document.createElement("script");
        script.src = path;
        if (typeof parent === "string") {
            document.querySelector(parent).appendChild(script);
        } else if (typeof parent === "object") {
            if (Array.isArray(parent)) {
                parent.forEach(function (par) {
                    return par.appendChild(script);
                });
            } else {
                parent.appendChild(script);
            }
        }
    };
    //end function to require a javascript file

    // function to render a component and show it in the dom

    this.render = function (status, path, parent, name, cb) {
        parent = typeof parent === "object" ? parent : document.querySelector(parent);
        var script = document.createElement("script");
        script.src = path;
        if (name) {
            script.setAttribute("name", name);
        }
        if (status === true) {
            if (parent.innerHTML === "") {
                parent.appendChild(script);
                script.addEventListener("load", function () {
                    if (cb) {
                        return cb();
                    }
                });
            } else {
                parent.appendChild(script);
                script.addEventListener("load", function () {
                    if (cb) {
                        return cb();
                    }
                });
            }
        } else {
            parent.appendChild(script);
            script.addEventListener("load", function () {
                if (cb) {
                    return cb();
                }
            });
        }
    };

    // end function to render a component and show it in the dom

    // function to filter the parent of component

    this.filterContent =  function (element, options, cb) {
        var parentElement = typeof element === "string" ? document.querySelector(element) : element;
        if (typeof options === "function") {
            cb = options;
        }
        if (options && typeof options !== "function") {
            if (options.beforeRender) {
                if (parentElement.innerHTML === "") {
                    options.beforeRender.execute(parentElement);
                }
                setTimeout(function () {
                    parentElement.innerHTML = "";
                    return cb(parentElement);
                }, options.beforeRender.duration ? options.beforeRender.duration : 500);
            }
             else if (options.element) {
                var cont = parentElement.querySelector(options.element);
                if (cont) {
                    if (options.fadeOut) {
                        cont.fadeOut(options.fadeOut, function () {
                            setTimeout(function () {
                                parentElement.innerHTML = "";
                                return cb(parentElement);
                            }, options.fadeOut + 100);
                        });
                    }
                    if (options.slidingUp) {
                        cont.slidingUp(options.slidingUp);
                        setTimeout(function () {
                            parentElement.innerHTML = "";
                            return cb(parentElement);
                        }, options.slidingUp + 100);
                    }
                    if (options.animate) {
                        cont.animating(options.animate.animations, options.animate.options);
                        setTimeout(function () {
                            parentElement.innerHTML = "";
                            return cb(parentElement);
                        }, options.animate.options.duration + 100);
                    }
                }
                if (!cont) {
                    parentElement.innerHTML = "";
                    return cb(parentElement);
                }
            } else {
                parentElement.innerHTML = "";
                return cb(parentElement);
            }
        } else {
            return parentElement.innerHTML = "";
        }
    };

    // function to filter the parent of component

    //function to loop array inside the component

    this.loopComponent = function (data, cb) {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        if (Array.isArray(data)) {

            return data.map(function (item, i) {
                return cb(item, i);
            }).join("");
        } else if (typeof data === "object") {
            return Object.keys(data).map(function (item, i) {
                return cb(data[item], data[i]);
            }).join("");
        }
    };

    //end function to loop array inside the component

    // function to render a new component
    this.renderComponent = function (cb, parent, options, finish) {
        var container = document.createElement("div");
        var animations;
        var allData;
        var self = this;
        var da = Date.now();
        function writeIt(data) {
            // typeof parent === "string" ? document.querySelector(parent).innerHTML = "" : parent.innerHTML = "";
            var newElement = cb(data);
            container.innerHTML = newElement;
            if (options && options.scripts) {
                options.scripts.forEach(function (src) {
                    if (src.match(/.js$/)) {
                        var script = document.createElement("script");
                        script.src = src;
                        container.firstElementChild.appendChild(script);

                        // } else i
                        // }
                    }
                });
            }
            if (options && options.style) {
                var style = options.style;
                Object.keys(style).forEach(function (el) {
                    if (el === "component") {
                        var cssElement = container.firstElementChild;
                        Object.keys(style[el]).forEach(function (objStyle) {
                            cssElement.style[objStyle] = style[el][objStyle];
                        });
                    } else {
                        var cssElements = container.firstElementChild.querySelectorAll(el);
                        cssElements.forEach(function (cssElement) {
                            Object.keys(style[el]).forEach(function (objStyle) {
                                cssElement.style[objStyle] = style[el][objStyle];
                            });
                        });
                    }
                })
            }
            function Elements() {
                this.element = container.firstElementChild.cloneNode(true);
            }
            var elements = new Elements();
            var element = elements.element;
            if (options && typeof options === "object") {
                if (options.slideDown) {
                    function makeSlideIn() {
                        if (!options.slideDown.cb) {
                            element.slideDown(options.slideDown.duration);
                        } else if (options.slideDown.cb) {
                            element.slideDown(options.slideDown.duration, options.slideDown.cb());
                        }
                    }
                    loadCssFile().then(function () {
                        makeSlideIn();
                    }).catch(function () {
                        makeSlideIn()
                    })
                }
                if (options.fadeIn) {
                    if (!options.fadeIn.cb) {
                        element.fadeIn(options.fadeIn.duration);
                    } else if (options.fadeIn.cb) {
                        element.fadeIn(options.fadeIn.duration, options.fadeIn.cb());
                    }
                }
                if (options.animate) {
                    element.animating(options.animate.animations, options.animate.options, options.animate.callback ? options.animate.callback : null);
                }
                if (options.methods && typeof options.methods === "object") {
                    Object.keys(options.methods).forEach(function (el) {
                        if (el === "component") {
                            element = elements.element;
                            var methodsEvents = options.methods[el];
                            Object.keys(methodsEvents).forEach(function (event) {
                                var EventHappen = methodsEvents[event];
                                Object.keys(EventHappen).forEach(function (ev) {
                                    element.event(`${ev}`, EventHappen[ev]);
                                });
                            });
                        } else {
                            var element = elements.element.querySelector(el);
                            var methodsEvents = options.methods[el];
                            Object.keys(methodsEvents).forEach(function (event) {
                                var EventHappen = methodsEvents[event];
                                Object.keys(EventHappen).forEach(function (ev) {
                                    element.event(`${ev}`, EventHappen[ev]);
                                });
                            });
                        }
                    });
                }
            }
            var component = {};
            component.finish = finish
            component.data = data;
            component.options = options
            component.parent = typeof parent === "string" ? document.querySelector(parent) : parent;
            component.stringDom = cb(data);
            component.cb = cb
            component.self = elements.element;
            component.name = options && options.name ? options.name : "defaultComponent";
            component.id = Math.random().toString(36).substr(2, 9);

            DomComponents.push(component);
            component.update = function () {
                parent = typeof parent === "string" ? document.querySelector(parent) : parent;
                parent.innerHTML = "";
                return writeIt(component.data)
            }
            //function to check about the scripts
            function checkScripts(resolve, rejected) {
                if (options && options.scripts && options.scripts.length > 0) {
                    options.scripts.forEach(function (src) {
                        if (src.match(/.css$/)) {
                            var style = document.createElement("link");
                            style.rel = "stylesheet";
                            style.href = src;
                            style.as = "style"
                            document.head.appendChild(style)
                            if (document.head.hasChildNodes(style)) {
                                return resolve(style)

                            } else {
                                return resolve(style)
                            }

                        } else {
                            return rejected();
                        }
                    })
                } else {
                    return rejected();
                }
            }
            //function to load css files with promises
            function loadCssFile() {
                return new Promise(function (resolve, rejected) {
                    checkScripts(resolve, rejected);
                });
            }
            // function to auto working for manipulating easy component events
            (function () {
                var controllerElements = elements.element.querySelectorAll("[event]");
                if (controllerElements.length > 0) {
                    controllerElements.forEach(function (controller) {
                        var eventType = controller.getAttribute("eventType");
                        var eventType2 = controller.getAttribute("eventType2");
                        let compArr = [];
                        controller.getAttribute("targetElement") === "component"  ? compArr.push(elements.element) : compArr = [];;
                        var targetElements = controller.getAttribute("targetElement") === "component"  ? compArr : elements.element.querySelectorAll(controller.getAttribute("targetElement"));
                        controller.event(`${eventType}`, function (e) {
                            targetElements.forEach(function (targetElement) {
                                var responseType = targetElement.getAttribute("responseType");
                                if (responseType === "animating") {
                                    var animationFrom = targetElement.getAttribute("animationFrom");
                                    var animationTo = targetElement.getAttribute("animationTo");
                                    var animationOptions =
                                        targetElement.getAttribute("animationOptions");
                                    var ObjOptions = {};
                                    var animationOptionsArr = animationOptions.split(",");
                                    animationOptionsArr.forEach(function (option) {
                                        var splitedOption = option.split(":");
                                        ObjOptions[splitedOption[0]] = splitedOption[1];
                                    });
                                    if (ObjOptions.duration) {
                                        ObjOptions.duration = Number.parseInt(ObjOptions.duration)
                                    }
                                    var fromArray = animationFrom.split(",");
                                    var toArray = animationTo.split(",");
                                    var ObjectFrom = {};
                                    var ObjectTo = {};
                                    fromArray.forEach(function (fromAn, i) {
                                        var splitedFrom = fromAn.split(":");
                                        var splitedTo = toArray[i].split(":");
                                        ObjectFrom[splitedFrom[0]] = splitedFrom[1];
                                        ObjectTo[splitedTo[0]] = splitedTo[1];
                                    });
                                    targetElement.animating([ObjectFrom, ObjectTo], ObjOptions)
                                } else if (responseType === "display") {
                                    var display1 = targetElement.getAttribute("display1");
                                    targetElement.style.display = display1;
                                } else {
                                    var responseDuration = targetElement.getAttribute("duration");
                                    targetElement[responseType](Number.parseInt(responseDuration))
                                }
                                //        function to response2 event
                                function responseTwo(targetElement) {
                                    var responseType2 = targetElement.getAttribute("responseType2");
                                    if (responseType2) {
                                        if (responseType2 === "animating") {
                                            var animationFrom2 = targetElement.getAttribute("animationFrom2");
                                            var animationTo2 = targetElement.getAttribute("animationTo2");
                                            var animationOptions2 =
                                                targetElement.getAttribute("animationOptions2");
                                            var ObjOptions2 = {};
                                            var animationOptionsArr2 = animationOptions.split(",");
                                            animationOptionsArr2.forEach(function (option) {
                                                var splitedOption2 = option.split(":");
                                                ObjOptions2[splitedOption2[0]] = splitedOption2[1];
                                            });
                                            if (ObjOptions2.duration) {
                                                ObjOptions2.duration = Number.parseInt(ObjOptions2.duration)
                                            }
                                            var fromArray2 = animationFrom2.split(",");
                                            var toArray2 = animationTo.split(",");
                                            var ObjectFrom2 = {};
                                            var ObjectTo2 = {};
                                            fromArray2.forEach(function (fromAn, i) {
                                                var splitedFrom2 = fromAn.split(":");
                                                var splitedTo2 = toArray2[i].split(":");
                                                ObjectFrom2[splitedFrom2[0]] = splitedFrom2[1];
                                                ObjectTo2[splitedTo2[0]] = splitedTo2[1];
                                            });
                                            targetElement.animating([ObjectFrom2, ObjectTo2], ObjOptions2)
                                        } else if (responseType2 === "display") {
                                            var display2 = targetElement.getAttribute("display2");
                                            targetElement.style.display = display2
                                        } else {
                                            var responseDuration2 = targetElement.getAttribute("duration");
                                            targetElement[responseType2](Number.parseInt(responseDuration2))
                                        }
                                    }
                                }
                                // responseTwo(targetElement)
                                if (eventType2) {
                                    controller.event(`${eventType2}`, function () {
                                        responseTwo(targetElement);
                                    });
                                }
                            });
                        })
                    });
                }
            })();
            // end function to auto working for manipulating easy component events

            if (finish) {
                //function to access on the elements inside component with its expName attribute
                (function () {
                    var allElements = component.self.querySelectorAll("*");
                    var elem = elements.element.querySelectorAll(`[expName]`);
                    allElements.forEach(function (el, i) {
                        // component[el.getAttribute("expName")] = el;
                        if (el.getAttribute("expName")) {
                            if (el.getAttribute("expName") === el.getAttribute("expName")) {
                                var arr = [];
                                elem.forEach(function (it, x) {
                                    if (it.getAttribute("expName") === el.getAttribute("expName")) {
                                        var attr = el.getAttribute("expName");
                                        arr.push(it);
                                        if (arr.length === 1) {
                                            component[attr] = arr[0];
                                        } else if (arr.length > 1) {
                                            component[attr] = arr;
                                        }
                                    }
                                })
                            }
                        }
                    });
                })();
                //function to append elements to element
                component.append = function (elem, content) {
                    if (typeof content === "object") {
                        return elem.appendChild(content);
                    }
                    if (typeof content === "string") ;
                    return elem.insertAdjacentHTML("beforeend", content);
                };
                if (typeof parent === "string") {
                    loadCssFile().then(function (style) {
                        setTimeout(function () {
                            document.querySelector(parent).appendChild(elements.element);
                            if (document.querySelector(parent).hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                            }
                            return finish(component)
                        }, 30);
                    }).catch(function () {
                        document.querySelector(parent).appendChild(elements.element);
                        return finish(component);
                    });
                } else if (typeof parent === "object") {
                    loadCssFile().then(function (style) {
                        setTimeout(function () {
                            parent.appendChild(elements.element)
                            if (parent.hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                            }
                            return finish(component);
                        }, 30)
                    }).catch(function () {
                        parent.appendChild(elements.element)
                        return finish(component)
                    });
                }
            } else {
                if (typeof parent === "string") {
                    loadCssFile().then(function (style) {
                        setTimeout(function () {
                            document.querySelector(parent).appendChild(elements.element);
                            if (document.querySelector(parent).hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                            }
                        }, 30);
                    }).catch(function () {
                        return document.querySelector(parent).appendChild(elements.element);
                    });
                } else if (typeof parent === "object") {
                    loadCssFile().then(function () {
                        setTimeout(function () {
                            parent.appendChild(elements.element)
                            if (parent.hasChildNodes(elements.element)) {
                                elements.element.insertBefore(style, elements.element.children[0])
                            }
                        }, 30)
                    }).catch(function () {
                        return parent.appendChild(elements.element)
                    });

                }
            }
        }
        if (options && options.get) {
            if (options.get.fetch === true) {
                self.http.get(true, options.get, function (err, response) {
                    var ajax = {};
                    if (err) {
                        ajax.error = err;
                    }
                    if (response) {
                        ajax.data = response.data;
                    }
                    if (options.get.callback) {
                        options.get.callback(err, response);
                    }
                    if (options.data) {
                        allData = options.data;
                    } else {
                        allData = {};
                    }
                    allData.ajax = ajax;
                    writeIt(allData);
                });
            } else {
                function getPromise() {
                    return new Promise(function (resolve, reject) {
                        self.http.get(options.get.fetch, {
                            url: options.get.url,
                            onProgress: function (xhttp) {
                                da = Date.now();
                                if (options.get.onProgress) {
                                    options.get.onProgress(xhttp);
                                }
                            },
                            onStart: function (xhttp) {
                                if (options.get.onStart) {
                                    options.get.onStart(xhttp);
                                }
                            }
                        }, function (err, data) {
                            ajax = {};
                            if (err) {
                                ajax.error = err;
                                resolve(ajax);
                            }
                            if (data) {
                                ajax.data = data;
                                resolve(ajax);
                            }
                            if (options.get.callback) {
                                return options.get.callback(err, data);
                            }
                        });
                    });
                }
                getPromise().then(function (resolve) {
                    if (options && options.data) {
                        allData = options.data;
                    }
                    allData.ajax = resolve;
                    writeIt(allData);
                });
            }
        } else {
            if (options && options.data) {
                allData = options.data;
                writeIt(allData);
            } else {
                writeIt()
            }
        }
        // setTimeout(function () {

    };
    // end function to render a new component

    // function to use to start the application
    this.intiApplication = function () {
        var headerApp = document.createElement("header-app");
        var contentPages = document.createElement("content-app");
        var sideBar = document.createElement("side-app");
        var footerApp = document.createElement("footer-app");
        document.body.insertBefore(headerApp, document.querySelector("script"));
        document.body.insertBefore(contentPages, document.querySelector("script"));
        document.body.insertBefore(sideBar, document.querySelector("script"));
        document.body.insertBefore(footerApp, document.querySelector("script"));
    };
    // end function to use to start the application

    // function to load static component to still showing it in all pages as you want

    this.loadStaticComponents =  function (cb) {
        return cb();
    };

    // end function to load static component to still showing it in all pages as you want

    // function to parse the data

    this.parseData = function (data, cb) {
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        if (Array.isArray(data)) {
            data.map(function (item, i) {
                return cb(item, i);
            });
        }
        if (typeof data === "object") {
            Object.keys(data).map(function (item, i) {
                return cb(data[item], data[i]);
            });
        }
    };

    // end function to parse the data

    // request object of routing
    function Request() {
        var req = this;
        this.url = location;
    }
    // end request object of routing

    // response object of routing
    function Response () {
        this.render = function (status, path, parent, name, cb) {
            express.render(status, path, parent, name, cb);
        };
        this.renderComponent = function (cb, parent, style, scripts) {
            express.renderComponent(cb, parent, style, scripts);
        };
        this.filterContent = function (element, options, cb) {
            express.filterContent(element, options, cb);
        };
        this.redirect = function (url) {
            location.replace(url);
        };
    }
    // end request object of routing

    // router module

    express.routersObject = [];
    function Router() {
        var selfe = this;
        selfe.routers = [];
        var cbOb = {};
        this.get = function (path, title, cb) {
            if (typeof title === "function") {
                cb = title;
            }
            selfe.routers.push(path);
            var pathname = location.href;
            pathname = pathname.split(location.origin)[1]
            var clicked = 0;
            document.addEventListener("click", function (e) {
                var routerBtns = document.querySelectorAll("[router]");
                routerBtns.forEach(function (routerBtn) {
                    var objectInfo = {path: routerBtn.getAttribute("router"), title: title, cb: cb};
                    express.routersObject.push(objectInfo);
                    if (e.target === routerBtn) {
                        if (e.detail === 1) {
                            e.preventDefault();
                            var routerVal = e.target.getAttribute("router");
                            if (path.split("#")[0].split("=")[0] === routerVal.split("#")[0].split("=")[0]) {
                                history.pushState({
                                    url: routerVal,
                                    title: title,
                                    callback: cb.toString()
                                }, title, routerVal);
                                // }
                                document.querySelector("title").innerHTML = title;
                                var params = {};
                                window.location.search.substring(1).split('&').forEach(function (pair) {
                                    pair = pair.split('=');
                                    if (pair[1] !== undefined) {
                                        var key = decodeURIComponent(pair[0]),
                                            val = decodeURIComponent(pair[1]),
                                            val = val ? val.replace(/\++/g, ' ').trim() : '';

                                        if (key.length === 0) {
                                            return;
                                        }
                                        if (params[key] === undefined) {
                                            params[key] = val;
                                        }
                                        else {
                                            if ("function" !== typeof params[key].push) {
                                                params[key] = [params[key]];
                                            }
                                            params[key].push(val);
                                        }
                                    }
                                });
                                Request.prototype.params = params;
                                window.location.params = params;
                                cb(new Request(), new Response());
                            }
                        } else {
                            return null;
                        }
                    }
                });
            });
            if (path.split("#")[0].split("=")[0] === pathname.split("#")[0].split("=")[0]) {
                var params = {};
                window.location.search.substring(1).split('&').forEach(function(pair) {
                    pair = pair.split('=');
                    if (pair[1] !== undefined) {
                        var key = decodeURIComponent(pair[0]),
                            val = decodeURIComponent(pair[1]),
                            val = val ? val.replace(/\++/g,' ').trim() : '';

                        if (key.length === 0) {
                            return;
                        }
                        if (params[key] === undefined) {
                            params[key] = val;
                        }
                        else {
                            if ("function" !== typeof params[key].push) {
                                params[key] = [params[key]];
                            }
                            params[key].push(val);
                        }
                    }
                });
                //function to push the current url when the document loads to the history
                var historyArr = [];
                var observer = new MutationObserver(function (mutation) {
                    var elements = document.querySelectorAll("[router]")
                    elements.forEach(function (element) {
                        var routerVal = element.getAttribute("router");
                        if (routerVal.split("=")[0] === path.split("=")[0]) {
                            historyArr.push(routerVal);
                        }
                    });
                })
                observer.observe(document.body, {subtree: true, childlist: true, attributes: true})
                setTimeout(function () {
                    var elements = document.querySelectorAll("[router]")
                    history.pushState({
                        url: historyArr[0],
                        title: title,
                        callback: cb.toString()
                    }, title, historyArr[0]);
                    var objectInfo = {path: historyArr[0], title: title, cb: cb};
                    express.routersObject.push(objectInfo);
                }, 500)
                //end function to push the current url when the document loads to the history
                Request.prototype.params = params;
                document.querySelector("title").innerHTML = title;
                if (cb) {
                    cb(new Request(), new Response());
                    return route = null;
                }
            }
        };
        this.errorPage = function (cb) {
            var errorArr = [];
            var pathname = location.href.split(location.origin)[1].split("=")[0];
            if (selfe.routers.indexOf(pathname) !== -1) {
                return null;
            } else {
                return cb();
            }
        };
        this.post = function (path, cb) {
            document.addEventListener("submit", function (e) {
                if (e.target.getAttribute("clientPosting") === "true") {
                    e.preventDefault();
                    var body = {};
                    body.form = e.target;
                    body.action = body.form.action;
                    var inputs  = body.form.querySelectorAll("input");
                    var textarea  = body.form.querySelectorAll("textarea");
                    inputs.forEach(function (input, i) {
                        var name = input.getAttribute("name");
                        if (textarea.length > 0) {
                            var textareaName = textarea[i].getAttribute("name");
                        }
                        body[name] = input;
                        body[textareaName] = textarea[i];
                    });
                    // add validation to the form
                    body.checkEmpty = function (element, cb) {
                        elementVal = typeof element === "object" ? element.value : typeof element === "string" ? element : "";
                        if (elementVal === "") {
                            if (!cb) {
                                return true;
                            }
                            if (cb) {
                                var empty = true;
                                return cb(empty)
                            }
                        } else {
                            if (cb) {
                                var empty = false;
                                return cb(empty);
                            } else {
                                return false;
                            }
                        }
                    }
                    body.checkEmail = function (element, cb) {
                        var elementVal = typeof element === "object" ? element.value : typeof element === "string" ? element : "";
                        var regEx = new RegExp("@", "gi");
                        if (elementVal !== "") {
                            if (cb) {
                                var test = regEx.test(elementVal);
                                return cb(test);
                            } else {
                                return regEx.test(elementVal);
                            }
                        }
                    }
                    // function to check if it is number
                    body.checkIsNumber = function (element, cb) {
                        var elementVal = typeof element === "object" ? element.value : typeof element === "string" ? element : "";
                        if (elementVal !== "") {
                            var testNumber = Number.isInteger(Number(elementVal));
                            if (cb) {
                                return cb(testNumber);
                            } else {
                                return testNumber;
                            }
                        }
                    }

                    // function to check if contains a number
                    body.checkContainsNumber = function (element, count, cb) {
                        var elementVal = typeof element === "object" ? element.value : typeof element === "string" ? element : "";
                        if (typeof count === "function" && !cb) {
                            cb = count;
                        }
                        count = typeof count === "number" ? count : 1;
                        var numArr = [];
                        if (elementVal !== "") {
                            Array.from(elementVal).forEach(function (letter) {
                                if (Number.isInteger(Number(letter))) {
                                    numArr.push(letter);
                                }
                            });
                            if (numArr.length === count) {
                                let result = true;
                                if (cb) {
                                    return cb(result);
                                } else {
                                    return result;
                                }
                            } else {
                                let result = false;
                                if (cb) {
                                    return cb(result);
                                } else {
                                    return result;
                                }
                            }
                        }
                    }
                    var act = new RegExp(location.origin, "gi");
                    act = act.exec(body.action);
                    body.action = body.action.replace(act, "");
                    if (body.action === path) {
                        Request.prototype.body = body;
                        return cb(new Request(), new Response());
                    }
                }
            });
        };
        this.initialRouter = function (cb) {

            window.onload = function () {
                return cb();
            }
        }
    }

    // end router module

    // using the router module for routing process
    this.Router = new Router();
    //end using the router module for routing process

    // http module and ajax
    function Ajax() {
        var xhr = new XMLHttpRequest();
        this.get = function (fetchFunc, options, cb) {
            if (fetchFunc === true) {
                var err,
                    response = {};
                fetch(options.url, {
                    method: options.method ? options.method : "get",
                    mode: options.mode ? options.mode : "",
                    headers: options.headers ? options.headers : {}
                }).then(function (res) {
                    response.res = res;
                    return res.json();
                }).then(function (data) {
                    response.data = data
                    return cb(err, response);
                }).catch(function (error) {
                    err = error;
                    return cb(err, response);
                });
            } else {
                xhr.open("get", options.url, options.async ? options.async: true);
                if (options.type) {
                    this.responseType = options.type;
                }
                if (options.headers) {
                    Object.keys(options.headers).forEach(function (index) {
                        xhr.setRequestHeader(index, options.headers[index]);
                    });
                }
                xhr.setRequestHeader("ajax", "express");
                xhr.onreadystatechange = function () {
                    if (this.readyState === 0) {
                        if (options.beforStart) {
                            options.beforStart();
                        }
                    }
                    if (this.readyState === 1) {
                        if (options.onStart) {
                            options.onStart(xhr);
                        }
                    }
                    if (this.readyState === 3) {
                        if (options.onProgress) {
                            options.onProgress(xhr);
                        }
                    }
                    var err;
                    var data;
                    if (this.readyState === 4) {
                        if (this.status === 404 || this.status === 403 || this.status === 500) {
                            err = {status: this.status};
                        }
                        if (this.readyState === 4 && this.status === 200) {
                            data = {response: this.response, responseText: this.responseText, responseUrl: this.responseURL, responseXML: this.responseXML, responseType: this.responseType};
                        }
                        return cb(err, data);
                    }
                };
                xhr.send();
            }
        }
        this.post = function (options, cb) {
            var err;
            var data;
            var formData = new FormData();
            if (options.url) {
                xhr.open("post", options.url, options.async ? options.async : true);
                if (options.headers) {
                    Object.keys(options.headers).forEach(function (index) {
                        xhr.setRequestHeader(index, options.headers[index]);
                    });
                }
                if (options.fullAjax) {
                    return fullAjax(this);
                }
                if (options.data) {
                    if (options.upload) {
                        var file;
                        file = options.upload.file;
                        Array.from(file).forEach(function (fil) {
                            formData.append(options.upload.fileName, fil);
                        });
                        if (options.upload.onload) {
                            xhr.upload.onload = function (e) {
                                return options.upload.onload(e);
                            }
                        }
                        if (options.upload.onprogress) {
                            xhr.upload.onprogress = function (e) {
                                return options.upload.onprogress(e);
                            }
                        }
                        if (options.upload.onerror) {
                            xhr.upload.onerror = function (e) {
                                return options.upload.onerror(e);
                            }
                        }
                    }
                    if (typeof options.data === "object") {
                        Object.keys(options.data).forEach(function (item) {
                            formData.append(item, options.data[item]);
                        });
                        options.data = formData;
                    } else if (typeof options.data === "string") {
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    }
                    xhr.setRequestHeader("ajax", "express");
                    if (options.onabort) {
                        xhr.onabort = function (e) {

                            return options.onabort(e);
                        };
                    }
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 0) {
                            if (options.beforStart) {
                                options.beforStart();
                            }
                        }
                        if (this.readyState === 1) {
                            if (options.onStart) {
                                options.onStart();
                            }
                        }
                        if (this.readyState === 3) {
                            if (options.onProgress) {
                                options.onProgress();
                            }
                        }

                        if (this.status === 404 || this.status === 403 || this.status === 500) {
                            err = {status: this.status};
                        }
                        if (this.readyState === 4 && this.status === 200) {
                            data = {response: this.response, responseText: this.responseText, responseUrl: this.responseURL, responseXML: this.responseXML, responseType: this.responseType};
                        }
                        if (cb) {
                            return cb(err, data);
                        }
                    };
                    xhr.send(options.data);
                } else {
                    err = new Error("bad request");
                    return console.error("cannot send empty data");
                }
            } else {
                err = new Error("bad request");
                return console.error("cannot send empty url");
            }
        }
    }
    // end http module and ajax
    // using the http module and ajax
    this.http = new Ajax();
    // end using the http module and ajax
    // function to maek popstate
    window.addEventListener("popstate", function (event) {
        var link;
        var pathname = location.href;
        patname = pathname.split(location.original)[1];
        express.routersObject.forEach(function (info) {
          if (event.state !== null) {
                if (info.path === event.state.url && info.title === event.state.title && info.cb == event.state.callback) {
                    link = info;
                }
            }
        });

        var params = {};
        window.location.search.substring(1).split('&').forEach(function (pair) {
            pair = pair.split('=');
            if (pair[1] !== undefined) {
                var key = decodeURIComponent(pair[0]),
                    val = decodeURIComponent(pair[1]),
                    val = val ? val.replace(/\++/g, ' ').trim() : '';

                if (key.length === 0) {
                    return;
                }
                if (params[key] === undefined) {
                    params[key] = val;
                }
                else {
                    if ("function" !== typeof params[key].push) {
                        params[key] = [params[key]];
                    }
                    params[key].push(val);
                }
            }
        });
        window.location.params = params;
        Request.prototype.params = params;
        if (event.state !== null) {
            if (event.state.title) {
                document.querySelector("title").innerHTML = event.state.title;
            }
            if (link.cb && typeof link.cb === "function") {
                link.cb(new Request(), new Response());
            }
        }
    });
    // end function to make popstate


}

