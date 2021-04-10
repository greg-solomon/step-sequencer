import React from "react";
import { Context } from "./Context";

interface AnalyzerState {
  analyzer: AnalyserNode;
}
const AnalyzerContext = React.createContext<AnalyzerState>(null);

const AnalyzerProvider: React.FC = ({ children }) => {
  const [analyzer, setAnalyzer] = React.useState<AnalyserNode>(null);
  const { audioCtx } = React.useContext(Context);
  React.useEffect(() => {
    if (!analyzer && audioCtx) {
      const analyzerInstance = audioCtx.createAnalyser();
      setAnalyzer(analyzerInstance);
    }
  }, [analyzer, audioCtx]);
  return (
    <AnalyzerContext.Provider value={{ analyzer }}>
      {children}
    </AnalyzerContext.Provider>
  );
};

const useAnalyzer = () => React.useContext(AnalyzerContext);
export { AnalyzerContext, AnalyzerProvider, useAnalyzer };
