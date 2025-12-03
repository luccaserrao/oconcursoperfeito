const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Área administrativa desativada</h1>
        <p className="text-muted-foreground">
          O backend do Supabase foi removido. Se precisar de uma nova área admin,
          configure uma API própria na Vercel ou outro provedor de auth.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
