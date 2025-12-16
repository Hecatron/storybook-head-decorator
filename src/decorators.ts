/**
 * decorator used to remove a named style block from the top of the story iframe
 * @param id
 */
export const removeHeadStyle = (id: string = "custom") => (storyFn, context) => {
  const selector = 'style#' + id;
  document.head
    .querySelectorAll(selector)
    .forEach(el => el.remove());
  return storyFn(context); 
};

/**
 * decorator used to add a named style block with inline css to the top of the story iframe
 * @param css
 * @param id
 */
export const addHeadStyle = (css: string, id: string = "custom") => (storyFn, context) => {
  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = css;
  document.head.appendChild(style);  
  return storyFn(context); 
};


/**
 * decorator used to add or replace a named style block with inline css to the top of the story iframe
 * @param css
 * @param id
 */
export const replaceHeadStyle = (css: string, id: string = "custom") => (storyFn, context) => {
  // Remove any existing style tags in the head with the given id
  const selector = 'style#' + id;
  document.head
    .querySelectorAll(selector)
    .forEach(el => el.remove());
  // Add a replacement style in the head with the given id and css
  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = css;
  document.head.appendChild(style);  
  return storyFn(context); 
};
