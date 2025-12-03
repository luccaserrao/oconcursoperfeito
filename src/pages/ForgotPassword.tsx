const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Recuperar senha</h1>
        <p className="text-muted-foreground">
          Fluxo de senha desativado após remoção do Supabase. Implemente um novo provedor
          de autenticação se precisar deste recurso.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
