// Helper function to parse and format text like markdown

// [word] - italic
// **word**- bold
// _word_ - italic
// __word__ - bold
// /n - next line
export const formatText = (text) => {
    if (!text) return null;
  
    const regex = /(\*\*.*?\*\*|__.*?__|\[.*?\]|_.*?_|\n)/g;
    const parts = text.split(regex);
  
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <b key={index}>{part.slice(2, -2)}</b>;
      }
      if (part.startsWith("__") && part.endsWith("__")) {
        return <b key={index}>{part.slice(2, -2)}</b>;
      }
      if (part.startsWith("[") && part.endsWith("]")) {
        return <i key={index}>{part.slice(1, -1)}</i>;
      }
      if (part.startsWith("_") && part.endsWith("_")) {
        return <i key={index}>{part.slice(1, -1)}</i>;
      }
      if (part === "\n") {
        return <br key={index} />;
      }
      return part;
    });
  };