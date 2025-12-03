const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border rounded-lg p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold">Reset de senha</h1>
        <p className="text-muted-foreground">
          Este fluxo não está disponível sem o backend de autenticação. Configure um novo
          provedor (ex.: Auth via Vercel/NextAuth/Clerk) se precisar resetar senhas.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
