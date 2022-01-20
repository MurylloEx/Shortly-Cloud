export function validateUrl(link = "") {
  const reg = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gim
  );
  const isValid = reg.test(link);

  return isValid;
}

export function findText(text = "") {
  const reg = new RegExp(/(\/)\w{5}/gim);
  const rex = reg.exec(text) ?? "";

  return rex[0];
}

export function findTheShortCodeInAUrl(url = "") {
  return findText(url).substr(-5);
}
