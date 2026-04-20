import Index from "./pages/Index";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  // Using a placeholder Client ID as requested in the plan
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_PLACEHOLDER";

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Index />
      <Toaster position="top-right" richColors />
    </GoogleOAuthProvider>
  )
}

export default App
