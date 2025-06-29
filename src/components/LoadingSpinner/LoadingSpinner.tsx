export const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div className="spinner" />
    <style>{`
      .spinner {
        border: 4px solid rgba(0,0,0,0.1);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border-left-color: #317EFB;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
