import { NextFunction, Request, Response } from "express";


// Custom function to parse query parameters
export function parseQueryParams(url: string) {
        const query: { [key: string]: string } = {};
        const queryString = url.split('?')[1];
        if (queryString) {
          const pairs = queryString.split('&');
          pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            query[key] = decodeURIComponent(value.replace(/\+/g,'+'));
          });
        }
        return query;
      }
      

    