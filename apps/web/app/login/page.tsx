import { LoginForm } from './LoginForm';
import { AppWordmark } from '@/components/brand/app-wordmark';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="mb-4">
        <AppWordmark className="w-64 text-primary" />
      </div>

      <Card className="gap-3 p-4 md:p-8 md:min-w-80">
        <CardHeader className="p-0">
          <CardTitle className="text-3xl">Log In</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
