import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.com/documents", async () => {
    
    const response = await fetch('/data.json');
    const data = await response.json();
    
    return HttpResponse.json(data);
  }),
];
