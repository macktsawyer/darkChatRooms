"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/profileManagement/page",{

/***/ "(app-pages-browser)/./app/profileManagement/page.tsx":
/*!****************************************!*\
  !*** ./app/profileManagement/page.tsx ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProfileManagement)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ \"(app-pages-browser)/./node_modules/next-auth/react/index.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction ProfileManagement() {\n    var _session_user, _session_user1, _session_user2, _message_messageInfo;\n    _s();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isFailure, setIsFailure] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)();\n    console.log(session);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full h-auto\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n            className: \"flex flex-col lg:mt-[20%] lg:ml-[40%] mt-[70%]\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    className: \"text-indigo\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-teal\",\n                            children: \"Username: \"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n                            lineNumber: 21,\n                            columnNumber: 47\n                        }, this),\n                        session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.name\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n                    lineNumber: 21,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    className: \"text-indigo\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            className: \"text-teal\",\n                            children: \"Email: \"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n                            lineNumber: 22,\n                            columnNumber: 47\n                        }, this),\n                        session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.email\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                    className: \"chatInput w-8/12 h-12 p-2 bg-\".concat(session === null || session === void 0 ? void 0 : (_session_user2 = session.user) === null || _session_user2 === void 0 ? void 0 : _session_user2.defaultMessageColor, \" rounded-lg md:min-w-56 placeholder-white text-white\"),\n                    ref: inputRef,\n                    onChange: (e)=>{\n                        updateMessageText(e.target.value);\n                    },\n                    value: message === null || message === void 0 ? void 0 : (_message_messageInfo = message.messageInfo) === null || _message_messageInfo === void 0 ? void 0 : _message_messageInfo.messageText,\n                    placeholder: \"Type your message here\",\n                    maxLength: 255,\n                    required: true\n                }, void 0, false, {\n                    fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n                    lineNumber: 23,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n            lineNumber: 20,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\Programs\\\\Programming\\\\darkChatRooms\\\\src\\\\app\\\\profileManagement\\\\page.tsx\",\n        lineNumber: 19,\n        columnNumber: 9\n    }, this);\n}\n_s(ProfileManagement, \"VkjSRDCzTPaYejKTsP1DI0gSF4Q=\", false, function() {\n    return [\n        next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession\n    ];\n});\n_c = ProfileManagement;\nvar _c;\n$RefreshReg$(_c, \"ProfileManagement\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wcm9maWxlTWFuYWdlbWVudC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUUrRDtBQUdsQjtBQUk5QixTQUFTRztRQVdzRUMsZUFDSEEsZ0JBRTVCQSxnQkFHcENDOztJQWhCdkIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1EsV0FBV0MsYUFBYSxHQUFHVCwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNLLFNBQVNLLFdBQVcsR0FBR1YsK0NBQVFBLENBQUM7SUFDdkMsTUFBTVcsV0FBV1YsNkNBQU1BLENBQUM7SUFDeEIsTUFBTSxFQUFFVyxNQUFNUixPQUFPLEVBQUUsR0FBR0YsMkRBQVVBO0lBRXBDVyxRQUFRQyxHQUFHLENBQUNWO0lBQ1oscUJBQ0ksOERBQUNXO1FBQUlDLFdBQVU7a0JBQ1gsNEVBQUNDO1lBQUdELFdBQVU7OzhCQUNWLDhEQUFDRTtvQkFBR0YsV0FBVzs7c0NBQWUsOERBQUNHOzRCQUFLSCxXQUFXO3NDQUFhOzs7Ozs7d0JBQWtCWixvQkFBQUEsK0JBQUFBLGdCQUFBQSxRQUFTZ0IsSUFBSSxjQUFiaEIsb0NBQUFBLGNBQWVpQixJQUFJOzs7Ozs7OzhCQUNqRyw4REFBQ0g7b0JBQUdGLFdBQVc7O3NDQUFlLDhEQUFDRzs0QkFBS0gsV0FBVztzQ0FBYTs7Ozs7O3dCQUFlWixvQkFBQUEsK0JBQUFBLGlCQUFBQSxRQUFTZ0IsSUFBSSxjQUFiaEIscUNBQUFBLGVBQWVrQixLQUFLOzs7Ozs7OzhCQUMvRiw4REFBQ0M7b0JBQ0dQLFdBQVcsZ0NBQW1FLE9BQW5DWixvQkFBQUEsK0JBQUFBLGlCQUFBQSxRQUFTZ0IsSUFBSSxjQUFiaEIscUNBQUFBLGVBQWVvQixtQkFBbUIsRUFBQztvQkFDOUVDLEtBQUtkO29CQUNMZSxVQUFVLENBQUNDO3dCQUFRQyxrQkFBa0JELEVBQUVFLE1BQU0sQ0FBQ0MsS0FBSztvQkFBRTtvQkFDckRBLEtBQUssRUFBRXpCLG9CQUFBQSwrQkFBQUEsdUJBQUFBLFFBQVMwQixXQUFXLGNBQXBCMUIsMkNBQUFBLHFCQUFzQjJCLFdBQVc7b0JBQ3hDQyxhQUFZO29CQUNaQyxXQUFXO29CQUNYQyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7OztBQUs1QjtHQXpCd0JoQzs7UUFLTUQsdURBQVVBOzs7S0FMaEJDIiwic291cmNlcyI6WyJEOlxcUHJvZ3JhbXNcXFByb2dyYW1taW5nXFxkYXJrQ2hhdFJvb21zXFxzcmNcXGFwcFxccHJvZmlsZU1hbmFnZW1lbnRcXHBhZ2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcclxuXHJcbmltcG9ydCB7Q2hhbmdlRXZlbnQsIHVzZVN0YXRlLCBGb3JtRXZlbnQsIHVzZVJlZn0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyByZWdpc3RyYXRpb24gfSBmcm9tICcuLi90eXBlcy9yZWdpc3RyYXRpb24nO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xyXG5pbXBvcnQgeyB1c2VTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoL3JlYWN0JztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQcm9maWxlTWFuYWdlbWVudCAoKSB7XHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBbaXNGYWlsdXJlLCBzZXRJc0ZhaWx1cmVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gICAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IHNlc3Npb24gfSA9IHVzZVNlc3Npb24oKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhzZXNzaW9uKVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWF1dG9cIj5cclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6bXQtWzIwJV0gbGc6bWwtWzQwJV0gbXQtWzcwJV1cIj5cclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1widGV4dC1pbmRpZ29cIn0+PHNwYW4gY2xhc3NOYW1lPXtcInRleHQtdGVhbFwifT5Vc2VybmFtZTogPC9zcGFuPntzZXNzaW9uPy51c2VyPy5uYW1lfTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcInRleHQtaW5kaWdvXCJ9PjxzcGFuIGNsYXNzTmFtZT17XCJ0ZXh0LXRlYWxcIn0+RW1haWw6IDwvc3Bhbj57c2Vzc2lvbj8udXNlcj8uZW1haWx9PC9saT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGNoYXRJbnB1dCB3LTgvMTIgaC0xMiBwLTIgYmctJHtzZXNzaW9uPy51c2VyPy5kZWZhdWx0TWVzc2FnZUNvbG9yfSByb3VuZGVkLWxnIG1kOm1pbi13LTU2IHBsYWNlaG9sZGVyLXdoaXRlIHRleHQtd2hpdGVgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHVwZGF0ZU1lc3NhZ2VUZXh0KGUudGFyZ2V0LnZhbHVlKSB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXttZXNzYWdlPy5tZXNzYWdlSW5mbz8ubWVzc2FnZVRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUeXBlIHlvdXIgbWVzc2FnZSBoZXJlXCJcclxuICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezI1NX1cclxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVJlZiIsInVzZVNlc3Npb24iLCJQcm9maWxlTWFuYWdlbWVudCIsInNlc3Npb24iLCJtZXNzYWdlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJpc0ZhaWx1cmUiLCJzZXRJc0ZhaWx1cmUiLCJzZXRNZXNzYWdlIiwiaW5wdXRSZWYiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImRpdiIsImNsYXNzTmFtZSIsInVsIiwibGkiLCJzcGFuIiwidXNlciIsIm5hbWUiLCJlbWFpbCIsImlucHV0IiwiZGVmYXVsdE1lc3NhZ2VDb2xvciIsInJlZiIsIm9uQ2hhbmdlIiwiZSIsInVwZGF0ZU1lc3NhZ2VUZXh0IiwidGFyZ2V0IiwidmFsdWUiLCJtZXNzYWdlSW5mbyIsIm1lc3NhZ2VUZXh0IiwicGxhY2Vob2xkZXIiLCJtYXhMZW5ndGgiLCJyZXF1aXJlZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/profileManagement/page.tsx\n"));

/***/ })

});