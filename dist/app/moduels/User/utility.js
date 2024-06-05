"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryParams = void 0;
// Custom function to parse query parameters
function parseQueryParams(url) {
    const query = {};
    const queryString = url.split('?')[1];
    if (queryString) {
        const pairs = queryString.split('&');
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            query[key] = decodeURIComponent(value.replace(/\+/g, '+'));
        });
    }
    return query;
}
exports.parseQueryParams = parseQueryParams;
