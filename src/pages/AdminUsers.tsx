const AdminUsers = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <p className="text-muted-foreground">
          Painel admin removido junto com Supabase. Implante um backend próprio
          (ex.: Vercel + banco) para listar usuários.
        </p>
      </div>
    </div>
  );
};

export default AdminUsers;
