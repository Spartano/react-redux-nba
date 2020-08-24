// converts an object into a query string
// ex: {authorId : 'a/b'} -> &

//add urlencoder
export default function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
}
