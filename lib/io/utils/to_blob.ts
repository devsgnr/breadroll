/**
 * This function converts the text from either a csv or tsv
 * string and converts it to a Blob with appropriate MIME type and
 * return the blob object
 * @param { string } data
 * @param { string } mime_type
 * @returns { Blob }
 */
const to_blob = (data: string, mime_type: string): Blob => {
  const blob = new Blob([data], { type: mime_type });
  return blob;
};

export default to_blob;
