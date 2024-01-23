// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import RtlLayout from "./components/RtlLayout";
import { ProgressBarStyle } from "./components/ProgressBar";
import NotistackProvider from "./components/NotistackProvider";
import ThemeColorPresets from "./components/ThemeColorPresets";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeColorPresets>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <Router />
              </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
        </ThemeColorPresets>
      </ThemeProvider>
    </>
  );
}

export default App;
