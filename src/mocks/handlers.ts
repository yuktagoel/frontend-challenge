import { http, HttpResponse } from "msw";

const DOCUMENTS_STORAGE_ID = "documents";

export const handlers = [
  http.get("https://api.com/documents", async () => {
    const storedData = localStorage.getItem(DOCUMENTS_STORAGE_ID);
    if (storedData) return HttpResponse.json(JSON.parse(storedData));

    const response = await fetch("/data.json");
    const data = await response.json();

    localStorage.setItem(DOCUMENTS_STORAGE_ID, JSON.stringify(data));
    return HttpResponse.json(data);
  }),

  http.post("https://api.com/documents", async ({request}) => {
    const newData = await request.json();
    localStorage.setItem(DOCUMENTS_STORAGE_ID, JSON.stringify(newData));
    
    return HttpResponse.json({
      message: "Data saved successfully",
      data: newData
    });
  }),
];
