const AdminAnalytics = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Dashboard de analytics desativado após remoção do Supabase. Suba um backend
          próprio e aponte o front para novas APIs se quiser reativar esta área.
        </p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
