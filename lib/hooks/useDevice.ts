import React from "react";
function useDevice() {
  const [isValidBrowser, setValidBrowser] = React.useState(true);

  React.useEffect(() => {
    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // some code..
      setValidBrowser(true);
    } else {
      setValidBrowser(false);
    }
  }, []);

  return isValidBrowser;
}

export { useDevice };
