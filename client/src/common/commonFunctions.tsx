export const textFromHTML = (html: string) => {
  if (html) {
    const textOnly = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
    return textOnly.length > 50 ? `${textOnly.slice(0, 50)}...` : textOnly;
  } else {
    return "";
  }
};
