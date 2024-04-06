export function  truncateTo100Words (text: string)  {
    const words = text.split(/\s+/); 
    if (words.length > 100) {
      return words.slice(0, 100).join(" ") + "..."; 
    }
    return text;
  };